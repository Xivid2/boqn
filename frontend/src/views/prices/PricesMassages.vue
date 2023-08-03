<template>
    <div class="wide-wrapper">
        <card class="my-8 overflow-x-auto">
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
                        v-for="service in massages"
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
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore();

const massages = servicesStore.massages;
</script>