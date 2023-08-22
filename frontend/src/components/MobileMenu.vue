<template>
    <transition name="slide-fade">
        <nav id="mobile-menu" class="menu" v-if="isMenuOpen">
            <div class="mobile-menu__tools">
                <div class="mobile-menu__tools__user">
                    <a @click="handleProfileClick"> 
                        <fai icon="fa-solid fa-user" class="fa-xl" />
                    </a>
                </div>
    
                <div class="mobile-menu__tools__connections">
                    <a :src="'tel:' + ContactPhoneFull">
                        <fai icon="fa-solid fa-phone" class="fa-xl" />
                    </a>
        
                    <a
                        :href="'https://maps.google.com/?q=' + ContactAddress"
                        target="_blank"
                    >
                        <fai icon="fa-solid fa-location-pin" class="fa-xl" />
                    </a>
                </div>
            </div>
    
            <div class="mobile-menu__navigation my-8">
                <div class="mobile-menu__links-container">
                    <RouterLink @click="handleClose" class="mobile-menu__link" to="/">{{ menuTranslations.TMobileMenuHome }}</RouterLink>
                    <RouterLink @click="handleClose" class="mobile-menu__link" to="/about">{{ menuTranslations.TMobileMenuAbout }}</RouterLink>
                    <RouterLink @click="handleClose" class="mobile-menu__link" to="/services">{{ menuTranslations.TMobileMenuServices }}</RouterLink>
                    <RouterLink @click="handleClose" class="mobile-menu__link" to="/prices">{{ menuTranslations.TMobileMenuPrices }}</RouterLink>
                    <RouterLink @click="handleClose" class="mobile-menu__link" to="/appointment">{{ menuTranslations.TMobileMenuCreateAppointment }}</RouterLink>
                    <RouterLink @click="handleClose" class="mobile-menu__link" to="/gallery">{{ menuTranslations.TMobileMenuGallery }}</RouterLink>
                    <RouterLink @click="handleClose" class="mobile-menu__link" to="/contact">{{ menuTranslations.TMobileMenuContacts }}</RouterLink>
                </div>
    
                <div class="mobile-menu__close-button" @click="handleClose">
                    <fai icon="fa-solid fa-circle-arrow-left" />
                </div>
            </div>
        </nav>
    </transition>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ContactPhoneFull, ContactAddress } from '@/constants/global';
import * as menuTranslations from '@/constants/MobileMenuTranslations';
import { useAuthStore } from '@/stores/auth.store';
import { useMenuStore } from '@/stores/menu.store';
const authStore = useAuthStore();
const menuStore = useMenuStore();
const router = useRouter();

const handleProfileClick = async () => {
    handleClose();

    if (authStore.isAuthenticated) {
        router.push('/profile');
    } else {
        router.push('/login');
    }
};

const isMenuOpen = computed(() => {
    return menuStore.isOpen;
});

const handleClose = () => {
    menuStore.close();
}

const handleOutsideClick = (e) => {
    let target = e.target,
    parent = target,
    outmost = e.currentTarget;
    let shouldClose = true;

    while (parent) {
        if (parent.parentElement === outmost) {
            break;
        }

        if (parent.id === 'mobile-menu') {
            shouldClose = false;
            break;
        }
        parent = parent.parentElement;
    }

    if (shouldClose) {
        handleClose();
    }
};

watch(isMenuOpen, (val) => {
    if (val === true) {
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClick);
            window.addEventListener("resize", handleResizeEvent);
        }, 1);
    } else {
        document.removeEventListener('click', handleOutsideClick);
        window.removeEventListener("resize", handleResizeEvent);
    }
});

const handleResizeEvent = (e) => {
    const width = window.innerWidth;

    if (width >= 1024) {
        handleClose();
    }
}
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all .5s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(-100%);
    opacity: 0;
}
</style>