<template>
    <div class="wide-wrapper my-8">
        <card
            v-for="(service, index) in logos"
            :key="index"
            class="service-card mb-4 px-8 py-8"
        >
            <div class="service">
                <h3>{{ service.name }}</h3>

                <div class="service__content">
                    <div class="service__content__image">
                        <img :src="service.imgSrc" />
                    </div>

                    <p class="service__content__text">
                        {{ service.description }}
                    </p>
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