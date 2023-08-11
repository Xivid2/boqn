<template>
    <div class="gallery-container">
        <div v-for="n in 28" :key="n">
            <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                cover
                @click="handleImgClick(n)"
            />
        </div>
    </div>

    <Teleport to="body">
        <v-dialog v-model="isModalOpen">
            <v-carousel
                v-model="chosenImgNumber"
                class="carousel"
                cycle
                hide-delimiters
                show-arrows="hover"
            >
                <v-carousel-item
                    v-for="n in 28"
                    :key="n"
                    :src="`https://picsum.photos/500/300?image=${chosenImgNumber * 5 + 10}`"
                ></v-carousel-item>
            </v-carousel>
        </v-dialog>
    </Teleport>

</template>

<script lang="ts" setup>
import { ref } from "vue";

const isModalOpen = ref(false);
const chosenImgNumber = ref(0);

const handleImgClick = (n: number) => {
    const windowWidth = window.innerWidth;
    const breakpoint = 834;

    if (windowWidth < breakpoint) return;

    isModalOpen.value = true;
    chosenImgNumber.value = n;
}
</script>

<style scoped>
.gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 1rem;
}
</style>