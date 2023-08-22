<template>
    <div class="mx-16 mb-8">
        <card>
            <div v-if="loading">
                loading...
            </div>
            <div v-else>
                <RouterLink to="/admin/services/create">
                    <v-button class="mb-4">
                        {{ translations.TCreateService }}
                    </v-button>
                </RouterLink>
    
                <table class="table">
                    <thead>
                        <tr>
                            <th class="text-left">
                                {{ translations.TServiceFormName }}
                            </th>
                            <th class="text-center">
                                {{ translations.TServiceFormGoal }}
                            </th>
                            <th class="text-center">
                                {{ translations.TServiceFormShortDescription }}
                            </th>
                            <th class="text-center">
                                {{ translations.TServiceFormDuration }}
                            </th>
                            <th class="text-center">
                                {{ translations.TServiceFormPrice }}
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
                            <td class="text-center">{{ service.price + CurrencySuffix }}</td>
                            <td class="text-center">
                                <div class="d-flex">
                                    <RouterLink :to="'/admin/services/' + service.id">
                                        <v-button
                                            class="mr-2"
                                            isUpdate
                                            :title="translations.TUpdateService"
                                        >
                                            <fai icon="fa-solid fa-edit" />
                                        </v-button>
                                    </RouterLink>
        
                                    <v-button
                                        isDelete
                                        @click="openDeleteModal(service.id)"
                                        :title="translations.TDeleteService"
                                    >
                                        <fai icon="fa-solid fa-trash" />
                                    </v-button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </card>
    </div>

    <ConfirmDialog
        v-model="isDeleteModalOpen"
        @update:modelValue="isDeleteModalOpen = $event"
        @onConfirm="destroy(serviceIdToDelete)"
        :title="translations.TServiceDeletion"
        :text="translations.TAreYouSureYouWantToDelete"
    >
    </ConfirmDialog>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useServicesStore } from '@/stores/services.store';
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import * as translations from '@/constants/ServicesTranslations';
import { CurrencySuffix } from '@/constants/global';
const servicesStore = useServicesStore();

const services = computed(() => servicesStore.services);
const loading = computed(() => servicesStore.loading);

const serviceIdToDelete = ref(0);
const isDeleteModalOpen = ref(false);

const openDeleteModal = (id: number) => {
    isDeleteModalOpen.value = true;
    serviceIdToDelete.value = id;
};

watch(loading, (val: boolean) => {
    if (val === true) {
        isDeleteModalOpen.value = false;
    }
});

servicesStore.getAll();

const destroy = async (id: number) => {
    await servicesStore.destroy(id);

    serviceIdToDelete.value = 0;

    await servicesStore.getAll();
};
</script>