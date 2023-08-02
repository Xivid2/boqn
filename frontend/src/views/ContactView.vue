<template>
    <div class="wrapper">
        <card class="py-8">
            <div class="contact-links-container">
                <LinkWithIcon
                    src="https://maps.google.com/?q=гр. Казанлък, ул. Хината 14"
                    icon="fa-solid fa-house"
                    text="гр. Казанлък, ул. Хината 14"
                    target="_blank"
                />
    
                <LinkWithIcon
                    src="tel:+359887107087"
                    icon="fa-solid fa-phone"
                    text="0887107087"
                />
    
                <LinkWithIcon
                    src="mailto: boris.marinov99@gmail.com"
                    icon="fa-solid fa-mail-bulk"
                    text="boris.marinov99@gmail.com"
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
                        src="https://maps.google.com/maps?width=800&amp;height=400&amp;hl=en&amp;q=България, гр. Казанлък, ул. Хината 14&amp;t=p&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                </div>
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
import LinkWithIcon from '@/components/LinkWithIcon.vue';
</script>

<style scoped lang="scss">
.contact-links-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;

    @media (max-width: 767px) {
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