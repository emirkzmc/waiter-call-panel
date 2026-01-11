import { getDatabase, ref, onValue, set, update, remove, get, push } from 'firebase/database';
import { app } from '../config/firebaseConfig';
import type { ICallService } from './callServiceInterface';
import type { Call } from '../types/callTypes';
import { CallStatus } from '../types/callTypes';

export class FirebaseCallService implements ICallService {
    private db;
    private callsRef;

    constructor() {
        this.db = getDatabase(app);
        this.callsRef = ref(this.db, 'calls');
    }

    async getCalls(): Promise<Call[]> {
        try {
            const snapshot = await get(this.callsRef);
            if (!snapshot.exists()) {
                return [];
            }

            const callsData = snapshot.val() as Record<string, Omit<Call, 'id'>>;
            return Object.entries(callsData).map(([id, data]) => ({
                id,
                ...data
            }));
        } catch (error) {
            console.error('Error getting calls:', error);
            throw error;
        }
    }

    async getCallById(id: string): Promise<Call | null> {
        try {
            const callRef = ref(this.db, `calls/${id}`);
            const snapshot = await get(callRef);

            if (!snapshot.exists()) {
                return null;
            }

            return {
                id,
                ...(snapshot.val() as Omit<Call, 'id'>)
            };
        } catch (error) {
            console.error(`Error getting call ${id}:`, error);
            throw error;
        }
    }

    async createCall(callData: Omit<Call, 'id' | 'timestamp'>): Promise<Call> {
        try {
            const newCallRef = push(this.callsRef);
            const newCall: Omit<Call, 'id'> = {
                ...callData,
                timestamp: Date.now()
            };

            await set(newCallRef, newCall);

            return {
                id: newCallRef.key!,
                ...newCall
            };
        } catch (error) {
            console.error('Error creating call:', error);
            throw error;
        }
    }

    async updateCallStatus(id: string, status: CallStatus): Promise<Call> {
        try {
            const callRef = ref(this.db, `calls/${id}`);
            const snapshot = await get(callRef);

            if (!snapshot.exists()) {
                throw new Error(`Call with id ${id} not found`);
            }

            const updates: Partial<Call> = { status };
            if (status === CallStatus.COMPLETED || status === CallStatus.CANCELLED) {
                updates.completedAt = Date.now();
            }

            await update(callRef, updates);

            return {
                id,
                ...(snapshot.val() as Omit<Call, 'id'>),
                ...updates
            } as Call;
        } catch (error) {
            console.error(`Error updating call ${id}:`, error);
            throw error;
        }
    }

    async deleteCall(id: string): Promise<boolean> {
        try {
            const callRef = ref(this.db, `calls/${id}`);
            await remove(callRef);
            return true;
        } catch (error) {
            console.error(`Error deleting call ${id}:`, error);
            return false;
        }
    }

    subscribeToCallsUpdates(callback: (calls: Call[]) => void): () => void {
        const unsubscribe = onValue(
            this.callsRef,
            (snapshot) => {
                if (!snapshot.exists()) {
                    callback([]);
                    return;
                }

                const callsData = snapshot.val() as Record<string, Omit<Call, 'id'>>;
                const calls: Call[] = Object.entries(callsData).map(([id, data]) => ({
                    id,
                    ...data
                }));

                callback(calls);
            },
            (error) => {
                console.error('Error subscribing to calls:', error);
            }
        );

        return unsubscribe;
    }
}

export const firebaseCallService = new FirebaseCallService();
