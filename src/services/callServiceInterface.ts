
import type { Call, CallStatus } from '../types/callTypes';

export interface ICallService {

    getCalls(): Promise<Call[]>;

    getCallById(id: string): Promise<Call | null>;

    createCall(callData: Omit<Call, 'id' | 'timestamp'>): Promise<Call>;

    updateCallStatus(id: string, status: CallStatus): Promise<Call>;

    deleteCall(id: string): Promise<boolean>;

    subscribeToCallsUpdates(callback: (calls: Call[]) => void): () => void;
}
