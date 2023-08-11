import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        opened: false,
    }),
    getters: {
        isOpen(): boolean {
            return this.opened;
        },
    },
    actions: {
        close() {
            this.opened = false;
        },
        open() {
            this.opened = true;
        },
        toggle() {
            this.opened = !this.opened;
        }
    },
});