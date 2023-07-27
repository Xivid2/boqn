<template>
    <div class="input-container">
        <label class="input-label">
            <input
                :type="type"
                class="input"
                :value="modelValue"
                @input="emit('update:modelValue', $event.target.value)"
                @blur="onBlur"
                @focus="onFocus"
            />
    
            <span class="input-text">{{ text }}</span>
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

    touchAndHandle();
};
</script>