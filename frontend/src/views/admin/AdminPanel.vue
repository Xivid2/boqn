<template>
    <div class="d-flex align-center justify-center">
        <v-sheet
            width="500"
            class="mx-auto mt-16 py-12 px-16"
            :elevation="20"
        >
            <v-button
                block
                class="mt-2"
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
        </v-sheet>
    </div>
</template>