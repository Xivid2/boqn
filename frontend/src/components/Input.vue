<template>
    <div class="mb-8">
        <label class="input-wrapper" v-if="type === 'textarea'">
            <textarea
                :value="modelValue"
                @input="emit('update:modelValue', $event.target.value)"
                @blur="onBlur"
                @focus="onFocus"
                class="textarea"
                v-bind="$attrs"
            ></textarea>

            <div
                class="textarea-placeholder"
                :class="{ active: isFocused || modelValue }"
            >
                <span>{{ text }}</span>
            </div>
        </label>

        <label class="input-wrapper" v-else-if="type === 'select'">
            <select
                @change="emit('update:modelValue', $event.target.value)"
                @blur="onBlur"
                @focus="onFocus"
                :value="modelValue"
                class="input select mb-1"
                v-bind="$attrs"
            >
                <slot></slot>
            </select>

            <div
                class="input-placeholder"
                :class="{ active: isFocused || modelValue }"
            >
                <span>{{ text }}</span>
            </div>
        </label>

        <label class="input-wrapper" v-else>
            <input
                :type="type"
                :value="modelValue"
                @input="emit('update:modelValue', $event.target.value)"
                @blur="onBlur"
                @focus="onFocus"
                class="input mb-1"
                v-bind="$attrs"
            />

            <div
                class="input-placeholder"
                :class="{ active: isFocused || modelValue }"
            >
                <span>{{ text }}</span>
            </div>
        </label>

        <div v-if="models && models.$invalid">
            <p v-for="error in errors" class="input-error">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    models: {
        type: Object,
        required: false,
    },
    text: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
        default: "text"
    }
});

const modelValue = computed(() => props.modelValue);
const text = computed(() => props.text);
const type = computed(() => props.type);
const models = computed(() => props.models);

const errors = ref([]);
const isFocused = ref(false);

const touchAndHandle = () => {
    errors.value = [];
    models.value.$touch();

    if (models.value.$errors.length) {
        models.value.$errors.forEach(err => {
            errors.value.push(err.$message);
        });
    }
}

watch(models.value, (val) => {
    if (isFocused.value === true) return;

    if (val.$errors) {
        touchAndHandle();
    } else {
        errors.value = [];
    }
});

const onFocus = () => {
    if (!models.value) return;

    isFocused.value = true;

    errors.value = [];

    models.value.$reset();
}

const onBlur = () => {
    if (!models.value) return;

    isFocused.value = false;

    touchAndHandle();
};
</script>