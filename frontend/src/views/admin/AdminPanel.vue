<template>
    <div class="wrapper">
        <card>
            <RouterLink to="/admin/services">
                <v-button block class="mt-2">
                    {{ translations.TAdminPanelServices }}
                </v-button>
            </RouterLink>

            <RouterLink to="/admin/appointments">
                <v-button block class="mt-8">
                    {{ translations.TAdminPanelAppointments }}
                </v-button>
            </RouterLink>

            <RouterLink to="/admin/users">
                <v-button block class="mt-8">
                    {{ translations.TAdminPanelUsers }}
                </v-button>
            </RouterLink>
        </card>
    </div>
</template>

<script lang="ts" setup>
import * as translations from '@/constants/AdminPanelTranslations';
</script>