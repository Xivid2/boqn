<template>
    <div class="mx-16 mb-8">
        <card>
            <v-button class="mb-4">
                <router-link to="/admin/services/create">
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
                            Кратко описание
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
                        v-for="service in services"
                        :key="service.id"
                    >
                        <td>{{ service.name }}</td>
                        <td>{{ service.goal }}</td>
                        <td>{{ service.shortDescription }}</td>
                        <td class="text-center">{{ service.duration }}</td>
                        <td class="text-center">{{ service.price + 'лв.' }}</td>
                        <td class="text-center">
                            <v-button
                                isDelete
                                @click="openDeleteModal(service.id)"
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
        @onConfirm="destroy(serviceIdToDelete)"
        title="Изтриване на услуга"
        text="Сигурни ли сте че искате да изтриете тази услуга?"
    >
    </ConfirmDialog>
</template>

<script lang="ts" setup>
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { ref } from 'vue';
import { useHttp } from '@/plugins/api';
import { type Service, ServicesService } from '@/services/services.service';
const service = new ServicesService(useHttp);
import { $error, $success } from '@/services/notify.service';

const services = ref(ref<Service[]>([]));

const serviceIdToDelete = ref(0);
const isDeleteModalOpen = ref(false);

const openDeleteModal = (id: number) => {
    isDeleteModalOpen.value = true;
    serviceIdToDelete.value = id;
};

const destroy = async (id: number) => {
    const { error } = await service.destroy(id);

    isDeleteModalOpen.value = false;

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    $success("Изпешно изтриване");

    serviceIdToDelete.value = 0;

    await getAll();
};

const getAll = async () => {
    const { data, error } = await service.getAll();

    if (error) {
        $error(error.response?.data?.message || "Something went wrong");
    }

    services.value = data;
};

getAll();
</script>