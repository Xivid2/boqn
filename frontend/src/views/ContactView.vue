<template>
    <div class="wrapper">
        <card>
            <!-- <v-row class="mt-8"> -->
                <!-- <v-col cols="4" class="text-center"> -->
                    <LinkWithIcon
                        src="https://maps.google.com/?q=гр. Казанлък, ул. Хината 14"
                        icon="fa-solid fa-house"
                        text="гр. Казанлък, ул. Хината 14"
                        target="_blank"
                    />
                <!-- </v-col> -->

                <!-- <v-col cols="4" class="text-center"> -->
                    <LinkWithIcon
                        src="tel:+359887107087"
                        icon="fa-solid fa-phone"
                        text="0887107087"
                    />
                <!-- </v-col> -->

                <!-- <v-col cols="4" class="text-center"> -->
                    <LinkWithIcon
                        src="mailto: boris.marinov99@gmail.com"
                        icon="fa-solid fa-mail-bulk"
                        text="boris.marinov99@gmail.com"
                    />
                <!-- </v-col> -->
            <!-- </v-row> -->

            <!-- <v-row> -->
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
            <!-- </v-row> -->
        </card>
    </div>
</template>

<script lang="ts" setup>
import LinkWithIcon from '@/components/LinkWithIcon.vue';
</script>

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