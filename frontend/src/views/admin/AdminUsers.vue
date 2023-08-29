<template>
    <div class="mx-16 mb-16">
        <card>
            <h1 class="block text-center mb-8">
                {{ translations.TAdminPanelUsers }}
            </h1>

            <table class="table">
                <thead>
                    <tr>
                        <th class="text-left">
                            {{ translations.TAdminPanelUserNames }}
                        </th>
                        <th class="text-left">
                            {{ translations.TAdminPanelUserEmail }}
                        </th>
                        <th class="text-center">
                            {{ translations.TAdminPanelUserType }}
                        </th>
                        <th class="text-center"></th>
                    </tr>
                </thead>
        
                <tbody>
                    <tr
                        v-for="user in users"
                        :key="user.id"
                    >
                        <td>{{ user.firstName + " " + user.lastName }}</td>
                        <td>{{ user.email }}</td>
                        <td class="text-center">{{ user.role.name }}</td>
                        <td class="text-center">
                            <div class="d-flex justify-end">
                                <v-button
                                    isDelete
                                    @click="openDeleteModal(user.id)"
                                    :title="translations.TDelete"
                                >
                                    <fai icon="fa-solid fa-trash" class="fa-l" />
                                </v-button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        
            <Pagination
                v-if="paginationInfo.pages > 1"
                v-model="paginationInfo.page"
                @update:model-value="updatePage"
                :totalPages="paginationInfo.pages"
                class="mb-2 mt-10"
            >
            </Pagination>
        </card>
    </div>

    <ConfirmDialog
        v-model="isDeleteModalOpen"
        @update:modelValue="isDeleteModalOpen = $event"
        @onConfirm="destroy(userIdToDelete)"
        :title="translations.TAdminPanelUserDeletion"
        :text="translations.TAdminPanelUserDeletionConfirmation"
    >
    </ConfirmDialog>
</template>

<script lang="ts" setup>
import * as translations from '@/constants/AdminPanelTranslations';
import Pagination from "@/components/Pagination.vue"
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { ref, watch, computed } from 'vue';
import { PaginationLimit } from '@/constants/global';
import { useUsersStore } from '@/stores/users.store';
const usersStore = useUsersStore();

const updatePage = (page: number) => {
    paginationInfo.value.page = page;
}

const users = computed(() => usersStore.users);
const paginationInfo = ref({
    page: 1,
    pages: 1,
});

watch(paginationInfo.value, async () => {
    await getAll();
});

const userIdToDelete = ref(0);
const isDeleteModalOpen = ref(false);

const openDeleteModal = (id: number) => {
    isDeleteModalOpen.value = true;
    userIdToDelete.value = id;
};

const destroy = async (id: number) => {
    await usersStore.destroy(id);

    isDeleteModalOpen.value = false;

    userIdToDelete.value = 0;

    await getAll();
};

const getAll = async () => {
    await usersStore.getAll({
        page: paginationInfo.value.page,
        limit: PaginationLimit,
    });

    paginationInfo.value.pages = usersStore.pages;
};

getAll();
</script>