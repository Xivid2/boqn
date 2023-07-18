<template>
    <div class="d-flex align-center justify-center">
        <v-sheet width="1200" class="mx-auto mt-16">
            <h1 class="block text-center">
                Контакти
            </h1>

            <v-row class="mt-8">
                <v-col cols="4" class="text-center">
                    <p class="mb-2">
                        <fai icon="fa-solid fa-house" class="fa-xl" />
                    </p>

                    <a
                        href="https://maps.google.com/?q=гр. Казанлък, ул. Хината 14"
                        target="_blank"
                        class="ml-2"
                    >
                        гр. Казанлък, ул. Хината 14
                    </a>
                </v-col>

                <v-col cols="4" class="text-center">
                    <p class="mb-2">
                        <fai icon="fa-solid fa-phone" class="fa-xl" />
                    </p>

                    <a href="tel:0887107087">
                        0887107087
                    </a>
                </v-col>

                <v-col cols="4" class="text-center">
                    <p class="mb-2">
                        <fai icon="fa-solid fa-mail-bulk" class="fa-xl" />
                    </p>

                    <a href="mailto: boris.marinov99@gmail.com">boris.marinov99@gmail.com</a>
                </v-col>
            </v-row>

            <div class="mapouter mt-12">
                <div class="gmap_canvas">
                    <iframe
                        class="gmap_iframe"
                        width="100%"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        src="https://maps.google.com/maps?width=800&amp;height=400&amp;hl=en&amp;q=България, гр. Казанлък, ул. Хината 14&amp;t=p&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                </div>
            </div>
        </v-sheet>
    </div>
</template>

<style scoped>
.mapouter {
    position:relative;
    text-align: right;
    width:100%;
    height:400px;
}
.gmap_canvas {
    overflow: hidden;
    background: none !important;
    width: 100%;
    height: 400px;
}
.gmap_iframe {
    height: 400px !important;
}
</style>