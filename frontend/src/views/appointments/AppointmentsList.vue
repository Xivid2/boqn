<template>
    <div class="mx-16 mb-16">
        <card>
            <h1 class="block text-center mb-8">
                {{ appointmentsTranslations.TAppointments }}
            </h1>

            <table class="table">
                <thead>
                    <tr>
                        <th class="text-left">
                            {{ servicesTranslations.TServiceType }}
                        </th>
                        <th class="text-left">
                            {{ servicesTranslations.TService }}
                        </th>
                        <th class="text-center">
                            {{ appointmentsTranslations.TAppointmentHour }}
                        </th>
                        <th class="text-right"></th>
                    </tr>
                </thead>
        
                <tbody>
                    <tr
                        v-for="appointment in appointments"
                        :key="appointment.id"
                    >
                        <td>{{ getServiceTypeTranslation(appointment.service.type) }}</td>
                        <td>{{ appointment.service.name }}</td>
                        <td class="text-center">{{ formatDate(appointment.date) }}</td>
                        <td class="text-right">
                            <div class="d-flex justify-end">
                                <v-button
                                    v-if="dayjs().isBefore(appointment.date)"
                                    isDelete
                                    @click="openDeleteModal(appointment.id)"
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
        @onConfirm="destroy(idToDelete)"
        :title="appointmentsTranslations.TAppointmentsAppointmentDelete"
        :text="appointmentsTranslations.TAppointmentsAppointmentDeletionConfirmation"
    >
    </ConfirmDialog>
</template>

<script lang="ts" setup>
import * as translations from '@/constants/AdminPanelTranslations';
import * as servicesTranslations from '@/constants/ServicesTranslations';
import * as appointmentsTranslations from '@/constants/AppointmentsTranslations';
import Pagination from "@/components/Pagination.vue"
import ConfirmDialog from '@/components/ConfirmDialog.vue';
import { ref, watch, computed } from 'vue';
import { PaginationLimit } from '@/constants/global';
import { useAppointmentsStore } from '@/stores/appointments.store';
const appointmentsStore = useAppointmentsStore();
import { useAuthStore } from '@/stores/auth.store';
import { ServiceType } from '@/enums/service-type.enum';
import * as dayjs from 'dayjs';
const authStore = useAuthStore();

const appointments = computed(() => appointmentsStore.userAppointments);

const paginationInfo = ref({
    page: 1,
    pages: 1,
});

const getServiceTypeTranslation = (type: string) => {
    switch (type) {
        case ServiceType.MASSAGE: return servicesTranslations.TServiceTypeMassage;

        case ServiceType.ERGO: return servicesTranslations.TServiceTypeErgo;

        case ServiceType.LOGO: return servicesTranslations.TServiceTypeLogo;
    }
};

const formatDate = (date: Date) => {
    return dayjs(date).format('YYYY-MM-DD HH:mm');
};

const updatePage = (page: number) => {
    paginationInfo.value.page = page;
};

watch(paginationInfo.value, async () => {
    await getAll();
});

const idToDelete = ref(0);
const isDeleteModalOpen = ref(false);

const openDeleteModal = (id: number) => {
    isDeleteModalOpen.value = true;
    idToDelete.value = id;
};

const destroy = async (id: number) => {
    await appointmentsStore.destroyOwn(authStore.user.id, id);

    isDeleteModalOpen.value = false;

    idToDelete.value = 0;

    await getAll();
};

const getAll = async () => {
    await appointmentsStore.getUserAppointments(authStore.user.id, {
        page: paginationInfo.value.page,
        limit: PaginationLimit,
    });

    paginationInfo.value.pages = appointmentsStore.pages;
};

getAll();
</script>