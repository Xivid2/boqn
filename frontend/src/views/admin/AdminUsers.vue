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
                            <v-button
                                isDelete
                                @click="openDeleteModal(user.id)"
                                :title="translations.TDelete"
                            >
                                <fai icon="fa-solid fa-trash" class="fa-l" />
                            </v-button>
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
import { ref, watch } from 'vue';
import { useHttp } from '@/plugins/api';
import UserService from '@/services/user.service';
const user = new UserService(useHttp);
import { $error, $success } from "@/services/notify.service";
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
        return $error(error.response?.data?.message || "Something went wrong");
    }

    $success("Изпешно изтриване");

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