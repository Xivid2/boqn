import { defineStore } from 'pinia';
import { type Staff, StaffService } from '@/services/staff.service';

interface StaffState {
    staff: Staff[];
}

export const useStaffStore = (options = {}) => {
    const http = options.useHttp || null;
    const $error = options.$error || null;

    return defineStore('staff', {
        state: (): StaffState => ({
            staff: [],
        }),
        actions: {
            resetStaff() {
                this.staff = [];
            },
            setStaff(staff: Staff[]) {
                this.staff = staff;
            },
            async getAll() {
                const staffService = new StaffService(http);

                const { data, error } = await staffService.getAll();

                if (error) {
                    this.resetStaff();

                    return $error(error.response?.data?.message || "Something went wrong");
                }

                this.setStaff(data);
            }
        }
    })();
}