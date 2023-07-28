<template>
    <div class="mx-16 mb-8">
        <card>
            <table>
                <thead>
                    <tr>
                        <th class="text-left">
                            Име
                        </th>
                        <th class="text-center">
                            Цел
                        </th>
                        <th class="text-center">
                            Описание
                        </th>
                        <th class="text-center">
                            Времетраене
                        </th>
                        <th class="text-center">
                            Цена
                        </th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr
                        v-for="massage in massages"
                        :key="massage.id"
                    >
                        <td>{{ massage.name }}</td>
                        <td>{{ massage.goal }}</td>
                        <td>{{ massage.description }}</td>
                        <td class="text-center">{{ massage.duration }}</td>
                        <td class="text-center">{{ massage.price + 'лв.' }}</td>
                    </tr>
                </tbody>
            </table>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useHttp } from '@/plugins/api';
import { type Massage, MassageService } from '@/services/massage.service';
const massage = new MassageService(useHttp);
import { $error } from '@/services/notify.service';

const massages = ref(ref<Massage[]>([]));

const getAll = async () => {
    const { data, error } = await massage.getAll();

    if (error) {
        return $error(error.response?.data?.message || "Something went wrong");
    }

    massages.value = data;
};

getAll();
</script>