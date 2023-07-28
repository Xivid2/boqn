<template>
    <div class="mx-16 mb-8">
        <card>
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
                    </tr>
                </tbody>
            </table>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useHttp } from '@/plugins/api';
import { type Service, ServicesService } from '@/services/services.service';
const service = new ServicesService(useHttp);
import { $error } from '@/services/notify.service';

const services = ref(ref<Service[]>([]));

const getAll = async () => {
    const { data, error } = await service.getAll();

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    services.value = data;
};

getAll();
</script>