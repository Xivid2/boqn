<template>
    <v-carousel :show-arrows="false" cycle>
        <RouterLink
            v-for="(item, i) in carouselData"
            :key="i"
            :to="item.route"
            class="cursor-pointer"
        >
            <v-carousel-item
                :src="item.imgSrc"
                cover
            >
            </v-carousel-item>
        </RouterLink>
    </v-carousel>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const carouselData = ref([
    {
        route: '/services/massages',
        imgSrc: 'https://williscollege.com/wp-content/uploads/2022/12/Willis-Blog-Photo-Template-1920x1080-8.png'
    },
    {
        route: '/services/ergo',
        imgSrc: 'https://www.thriasiocyprus.com/images/header_ergotherapy.jpg'
    },
    {
        route: '/services/logo',
        imgSrc: 'https://previews.123rf.com/images/levstudio/levstudio2008/levstudio200800049/154102497-speech-therapy-massage-of-the-girl-s-tongue-a-speech-therapist-makes-a-tongue-massage-to-a-child.jpg'
    },
]);
</script>