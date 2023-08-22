<template>
    <div class="wide-wrapper">
        <card class="my-8 overflow-x-auto">
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
                    </tr>
                </thead>
    
                <tbody>
                    <tr
                        v-for="service in ergos"
                        :key="service.id"
                    >
                        <td>{{ service.name }}</td>
                        <td>{{ service.goal }}</td>
                        <td>{{ service.shortDescription }}</td>
                        <td class="text-center">{{ service.duration }}</td>
                        <td class="text-center">{{ service.price + CurrencySuffix }}</td>
                    </tr>
                </tbody>
            </table>
        </card>
    </div>
</template>

<script lang="ts" setup>
import * as translations from '@/constants/ServicesTranslations';
import { CurrencySuffix } from '@/constants/global';
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore();

// const ergos = servicesStore.ergos
const ergos = servicesStore.massages;
</script>