<template>
    <v-row>
        <v-col
            v-for="n in 9"
            :key="n"
            class="d-flex child-flex"
            cols="4"
        >
            <v-img
                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                aspect-ratio="1"
                cover
                class="bg-grey-lighten-2 cursor-pointer"
                @click="handleImgClick(n)"
            >
                <template v-slot:placeholder>
                    <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                    >
                        <v-progress-circular
                            indeterminate
                            color="grey-lighten-5"
                        ></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-col>
    </v-row>

    <Teleport to="body">
        <div v-if="isModalOpen" class="modal">
            <div class="container">
                <v-carousel v-model="chosenImgNumber" class="carousel">
                    <v-carousel-item
                        v-for="n in 9"
                        :key="n"
                        :src="`https://picsum.photos/500/300?image=${chosenImgNumber * 5 + 10}`"
                        cover
                    ></v-carousel-item>
                </v-carousel>

                <button @click="isModalOpen = false">X</button>
            </div>
        </div>
    </Teleport>

</template>

<script lang="ts" setup>
import { ref } from "vue";

const isModalOpen = ref(false);
const chosenImgNumber = ref(0);

const handleImgClick = (n: number) => {
    isModalOpen.value = true;
    chosenImgNumber.value = n;
}

</script>

<style scoped>
.carousel {
    position: aboslute;
    top: 100%;
    left: 100%;
    transform: translate(-72.5%, -25%);
}
.container {
    position: relative;
    width: 1200px;
    height: 400px;
}
.modal {
    background-color: black;
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
}

.modal button {
    background-color: white;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: fixed;
    bottom: 88%;
    left: 95%;
}
</style>