<template>
    <div class="d-flex align-center justify-center">
        <v-sheet width="400" class="mx-auto mt-16">
            <h1 class="block text-center">
                Register
            </h1>

            <v-form @submit.prevent="register" ref="form">
                <v-text-field
                    variant="underlined"
                    v-model="firstName"
                    label="First name"
                    :rules="[
                        v => !!v || 'First name is required',
                        v => (v && v.length >= 3) || 'First name must have 3+ characters',
                        v => (v && v.length <= 50) || 'First name must have less than 50 characters'
                    ]"
                ></v-text-field>

                <v-text-field
                    variant="underlined"
                    v-model="lastName"
                    label="Last name"
                    :rules="[
                        v => !!v || 'Last name is required',
                        v => (v && v.length >= 3) || 'Last name must have 3+ characters',
                        v => (v && v.length <= 50) || 'Last name must have less than 50 characters'
                    ]"
                ></v-text-field>

                <v-text-field
                    variant="underlined"
                    v-model="email"
                    label="Email"
                    :rules="[
                        v => !!v || 'Email is required',
                        v => (v && v.length >= 3) || 'Email must have 3+ characters',
                        v => (v && v.length <= 50) || 'Email must have less than 255 characters',
                        v => /.+@.+/.test(v) || 'E-mail must be valid' 
                    ]"
                ></v-text-field>

                <v-text-field
                    variant="underlined"
                    type="password"
                    v-model="password"
                    label="password"
                    :rules="[
                        v => !!v || 'Password is required',
                        v => (v && v.length >= 8) || 'Password must have 8+ characters',
                        v => (v && v.length <= 50) || 'Password must have less than 50 characters'
                    ]"
                ></v-text-field>

                <v-text-field
                    variant="underlined"
                    type="password"
                    v-model="confirmPassword"
                    label="confirm password"
                    :rules="[
                        v => v === password || 'Passwords do not match'
                    ]"
                ></v-text-field>

                <v-btn
                    type="submit"
                    variant="outlined"
                    color="primary"
                    block class="mt-2"
                >
                    Sign in
                </v-btn>
            </v-form>
        </v-sheet>
    </div>
</template>

<script lang="ts" setup>
    import { ref } from "vue";
    import { useRouter } from 'vue-router'
    import AuthService from "../services/auth.service";
    import { useHttp } from '../plugins/api';
    import { useNotification } from "@kyvg/vue3-notification";

    const form = ref(null);

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const { notify}  = useNotification();

    const auth = new AuthService(useHttp);
    const router = useRouter();

    const register = async () => {
        const { valid: isValid } = await form.value.validate();

        if (!isValid) return;

        const { data, error } = await auth.register({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
        });

        if (error) {
            return notify({
                type: "error",
                text: error,
            });
        }

        notify({
            type: "success",
            text: "You registered successfully!",
        });

        router.push('/login');
    };
</script>