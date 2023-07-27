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
                        <td class="text-center">{{ massage.price }}</td>
                    </tr>
                </tbody>
            </table>
        </card>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useHttp } from '@/plugins/api';
import MassageService from '@/services/massage.service';
const massage = new MassageService(useHttp);
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification();

const massages = ref([]);

const getAll = async () => {
    const { data, error } = await massage.getAll();

    if (error) {
        return notify({
            type: "error",
            text: error.response?.data?.message || "Something went wrong"
        });
    }

    massages.value = data;
};

getAll();
</script>