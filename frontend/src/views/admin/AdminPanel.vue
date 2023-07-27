<template>
    <div class="wrapper">
        <card>
            <v-button
                block
                class="mt-2"
            >
                <router-link to="/admin/prices">
                    Ценоразпис
                </router-link>
            </v-button>

            <v-button
                block
                class="mt-8"
            >
                <router-link to="/admin/appointments">
                    Записани часове
                </router-link>
            </v-button>
        
            <v-button
                block
                class="mt-8"
            >
                <router-link to="/admin/users">
                    Потребители
                </router-link>
            </v-button>
        </card>
    </div>
</template>