<template>
    <div class="wrapper">
        <card class="py-8">
            <div class="contact-links-container">
                <LinkWithIcon
                    :src="'https://maps.google.com/?q=' + translations.ContactAddress"
                    icon="fa-solid fa-house"
                    :text="translations.ContactAddress"
                    target="_blank"
                />
    
                <LinkWithIcon
                    :src="'tel:' + translations.ContactPhoneFull"
                    icon="fa-solid fa-phone"
                    :text="translations.ContactPhone"
                />
    
                <LinkWithIcon
                    :src="'mailto: ' + translations.ContactEmail"
                    icon="fa-solid fa-mail-bulk"
                    :text="translations.ContactEmail"
                />
            </div>

            <div class="mapouter mt-12">
                <div class="gmap_canvas">
                    <iframe
                        class="gmap_iframe"
                        width="100%"
                        frameborder="0"
                        scrolling="no"
                        marginheight="0"
                        marginwidth="0"
                        :src="'https://maps.google.com/maps?width=800&amp;height=400&amp;hl=en&amp;q=' + translations.ContactAddress + '&amp;t=p&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'">
                    </iframe>
                </div>
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
import * as translations from '@/constants/global';
import LinkWithIcon from '@/components/LinkWithIcon.vue';
</script>

<style scoped lang="scss">
.contact-links-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    @media only screen and (max-width: 767px) {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(3, 1fr);
    }
}

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