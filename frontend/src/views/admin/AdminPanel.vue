<template>
    <div class="wrapper">
        <card>
            <div class="tight-wrapper">
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
            </div>
        </card>
    </div>
</template>

<script lang="ts" setup>
import * as translations from '@/constants/AdminPanelTranslations';
</script>