import { defineStore } from 'pinia';
import { $error } from '@/services/notify.service';
import { StaffService } from '@/services/staff.service';
import { type Staff } from '@/interfaces/staff.interface';

interface StaffState {
    loading: boolean;
    error: string;
    staff: Staff[];
}

export const useStaffStore = (options = {}) => {
    const staffService = new StaffService();

    return defineStore('staff', {
        state: (): StaffState => ({
            loading: false,
            error: '',
            staff: [],
        }),
        actions: {
            async getAll() {
                this.staff = [];

                try {
                    const { data } = await staffService.getAll();

                    this.staff = data;
                } catch (error) {
                    const err = error.response?.data?.message || "Възникна проблем при зареждането на работниците";

                    $error(err);

                    this.error = err;
                } finally {
                    this.loading = false;
                }
            }
        }
    })();
}