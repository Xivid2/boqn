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
                            Описание
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
                        v-for="massage in services"
                        :key="massage.id"
                    >
                        <td>{{ massage.name }}</td>
                        <td>{{ massage.goal }}</td>
                        <td>{{ massage.description }}</td>
                        <td class="text-center">{{ massage.duration }}</td>
                        <td class="text-center">{{ massage.price + 'лв.' }}</td>
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