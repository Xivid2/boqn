<template>
    <div class="mx-16 my-8">
        <card
            v-for="(service, index) in logos"
            :key="index"
            class="mb-4"
        >
            <div class="service">
                <img
                    :src="service.imgSrc"
                    class="service-img"
                    :class="{
                        'order-last': index % 2 === 0,
                        'ml-12': index % 2 === 0,
                        'mr-12': index % 2 !== 0,
                    }"
                />

                <div class="service-content order-1">
                    <h3>{{ service.name }}</h3>
                    <p>{{ service.description }}</p>
                </div>
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { useServicesStore } from '@/stores/services.store';
const servicesStore = useServicesStore();

// TODO: Once this is complete in DB, add it
// const logos = servicesStore.logos;
const logos = servicesStore.massages;
</script>