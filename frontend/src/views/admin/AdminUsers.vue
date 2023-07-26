<template>
    <div class="d-flex align-center justify-center">
        <v-sheet
            class="mx-auto mt-16 mb-16 py-12 px-16"
            :elevation="20"
        >
            <h1 class="block text-center">
                Потребители
            </h1>

            <v-table
                fixed-header
            >
                <thead>
                    <tr>
                        <th class="text-left">
                            Имена
                        </th>
                        <th class="text-left">
                            Имейл
                        </th>
                        <th class="text-left">
                            Тип
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in users"
                        :key="user.id"
                    >
                        <td>{{ user.firstName + " " + user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.role.name }}</td>
                        <td>
                            <v-button
                                round
                                @click="openDeleteModal(user.id)"
                                title="Изтрий"
                            >
                                <fai icon="fa-solid fa-trash" class="fa-l" />
                            </v-button>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <Pagination
                v-if="paginationInfo.pages > 1"
                v-model="paginationInfo.page"
                @update:model-value="updatePage"
                :totalPages="paginationInfo.pages"
                class="mb-2 mt-10"
            >
            </Pagination>
        </v-sheet>
    </div>

    <ConfirmDialog
        v-model="isDeleteModalOpen"
        @update:modelValue="isDeleteModalOpen = $event"
        @onConfirm="destroy(userIdToDelete)"
        title="Изтриване на потребител"
        text="Сигурни ли сте че искате да изтриете този потребител?"
    >
    </ConfirmDialog>
</template>

<script lang="ts" setup>
import Pagination from "@/components/Pagination.vue"
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { ref, watch } from 'vue';
import { useHttp } from '@/plugins/api';
import UserService from '@/services/user.service';
const user = new UserService(useHttp);
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification();
const limit = 10;

const updatePage = (page: number) => {
    paginationInfo.value.page = page;
}

const users = ref([]);
const paginationInfo = ref({
    page: 1,
    pages: 1,
});

watch(paginationInfo.value, async () => {
    await getAll();
})

const userIdToDelete = ref(0);
const isDeleteModalOpen = ref(false);

const openDeleteModal = (id: number) => {
    isDeleteModalOpen.value = true;
    userIdToDelete.value = id;
};

const destroy = async (id: number) => {
    const { error } = await user.destroy(id);

    isDeleteModalOpen.value = false;

    if (error) {
        return notify({
            type: "error",
            text: error.response?.data?.message || "Something went wrong"
        });
    }

    notify({
        type: "success",
        text: "Изпешно изтриване"
    });

    userIdToDelete.value = 0;

    await getAll();
};

const getAll = async () => {
    const { data, error } = await user.getAll({
        page: paginationInfo.value.page,
        limit,
    });

    if (error) {
        return notify({
            type: "error",
            text: error.response?.data?.message || "Something went wrong"
        });
    }

    paginationInfo.value.pages = data.pages;
    users.value = data.users;
};

getAll();
</script>