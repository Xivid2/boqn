<template>
    <div class="wrapper">
        <card>
            <form @submit.prevent="dadar">
                <AdminPricesForm :data="createData" />
            </form>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { type CreateMassageDto } from '@/services/massage.service';
import AdminPricesForm from './AdminPricesForm.vue';

const genInitialData = () => {
    return {
        name: '',
        goal: '',
        description: '',
        duration: 0,
        price: 0,
    };
};

const createData = ref(ref<CreateMassageDto>(genInitialData()));

watch(createData, (val) => {
    console.log('val', val)
})

const dadar = (da: any) => {
    console.log('dadar', da);
}
</script>