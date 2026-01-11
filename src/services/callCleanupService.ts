import { getDatabase, ref, get, remove } from 'firebase/database';
import { app } from '../config/firebaseConfig';
import { CallStatus } from '../types/callTypes';
import type { Call } from '../types/callTypes';

export class CallCleanupService {
    private db;
    private callsRef;

    constructor() {
        this.db = getDatabase(app);
        this.callsRef = ref(this.db, 'calls');
    }

    async cleanupOldCalls(): Promise<number> {
        try {
            const snapshot = await get(this.callsRef);
            if (!snapshot.exists()) {
                console.log('No calls found in database');
                return 0;
            }

            const calls = snapshot.val() as Record<string, Call>;
            const now = Date.now();
            const twelveHoursInMs = 12 * 60 * 60 * 1000;
            let deletedCount = 0;

            const deletePromises = Object.entries(calls).map(async ([id, call]) => {
                const shouldDelete = (
                    (call.status === CallStatus.COMPLETED || call.status === CallStatus.CANCELLED) &&
                    call.completedAt &&
                    (now - call.completedAt) > twelveHoursInMs
                );

                if (shouldDelete) {
                    try {
                        const callRef = ref(this.db, `calls/${id}`);
                        await remove(callRef);
                        deletedCount++;
                        console.log(`Deleted old call: ${id} (${call.status}, ${Math.floor((now - call.completedAt!) / 3600000)} hours old)`);
                    } catch (error: unknown) {
                        const firebaseError = error as { code?: string };
                        if (firebaseError.code === 'PERMISSION_DENIED') {
                            console.error('Permission denied. Check Firebase security rules.');
                        } else {
                            console.error(`Error deleting call ${id}:`, error);
                        }
                    }
                }
            });

            await Promise.all(deletePromises);

            if (deletedCount > 0) {
                console.log(`✅ Cleanup completed: ${deletedCount} old call(s) deleted`);
            } else {
                console.log('No old calls to clean up');
            }

            return deletedCount;
        } catch (error: unknown) {
            const firebaseError = error as { code?: string };
            if (firebaseError.code === 'PERMISSION_DENIED') {
                console.error('Auto-cleanup failed: Firebase permission denied. Please configure database security rules.');
            } else {
                console.error('Error during cleanup:', error);
            }
            return 0;
        }
    }

    async manualCleanup(): Promise<void> {
        console.log('🧹 Manual cleanup triggered...');
        await this.cleanupOldCalls();
    }
}

export const callCleanupService = new CallCleanupService();
