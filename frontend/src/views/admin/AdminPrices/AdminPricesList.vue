<template>
    <div class="mx-16 mb-8">
        <card>
            <v-button class="mb-4">
                <router-link to="/admin/prices/create">
                    Създай
                </router-link>
            </v-button>

            <table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Име
                        </th>
                        <th class="text-center">
                            Цел
                        </th>
                        <th class="text-center">
                            Описание
                        </th>
                        <th class="text-center">
                            Времетраене
                        </th>
                        <th class="text-center">
                            Цена
                        </th>
                        <th class="text-center"></th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr
                        v-for="massage in massages"
                        :key="massage.id"
                    >
                        <td>{{ massage.name }}</td>
                        <td>{{ massage.goal }}</td>
                        <td>{{ massage.description }}</td>
                        <td class="text-center">{{ massage.duration }}</td>
                        <td class="text-center">{{ massage.price + 'лв.' }}</td>
                        <td class="text-center">
                            <v-button
                                isDelete
                                @click="openDeleteModal(massage.id)"
                                title="Изтрий"
                            >
                                <fai icon="fa-solid fa-trash" class="fa-l" />
                            </v-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </card>
    </div>

    <ConfirmDialog
        v-model="isDeleteModalOpen"
        @update:modelValue="isDeleteModalOpen = $event"
        @onConfirm="destroy(massageIdToDelete)"
        title="Изтриване на потребител"
        text="Сигурни ли сте че искате да изтриете този потребител?"
    >
    </ConfirmDialog>
</template>

<script lang="ts" setup>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { ref } from 'vue';
import { useHttp } from '@/plugins/api';
import { type Massage, MassageService } from '@/services/massage.service';
const massage = new MassageService(useHttp);
import { $error, $success } from '@/services/notify.service';

const massages = ref(ref<Massage[]>([]));

const massageIdToDelete = ref(0);
const isDeleteModalOpen = ref(false);

const openDeleteModal = (id: number) => {
    isDeleteModalOpen.value = true;
    massageIdToDelete.value = id;
};

const destroy = async (id: number) => {
    const { error } = await massage.destroy(id);

    isDeleteModalOpen.value = false;

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    $success("Изпешно изтриване");

    massageIdToDelete.value = 0;

    await getAll();
};

const getAll = async () => {
    const { data, error } = await massage.getAll();

    if (error) {
        $error(error.response?.data?.message || "Something went wrong");
    }

    massages.value = data;
};

getAll();
</script>