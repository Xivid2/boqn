<template>
    <div class="wrapper">
        <card>
            <RouterLink to="/admin/services">
                <v-button block class="mt-2">
                    Услуги
                </v-button>
            </RouterLink>

            <RouterLink to="/admin/appointments">
                <v-button block class="mt-8">
                    Записани часове
                </v-button>
            </RouterLink>

            <RouterLink to="/admin/users">
                <v-button block class="mt-8">
                    Потребители
                </v-button>
            </RouterLink>
        </card>
    </div>
</template>