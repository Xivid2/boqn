import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

export const $error = (text: string) => {
    notify({
        type: "error",
        text,
    });
};

export const $success = (text: string) => {
    notify({
        type: "success",
        text,
    });
};