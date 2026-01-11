
import type { ICallService } from './callServiceInterface';
import type { Call } from '../types/callTypes';
import { CallStatus } from '../types/callTypes';

export class MockCallService implements ICallService {
    private calls: Call[] = [];
    private listeners: ((calls: Call[]) => void)[] = [];
    private storageKey = 'nook_calls';

    constructor() {
        this.loadFromStorage();
        if (this.calls.length === 0) {
            this.initializeMockData();
        }
    }

    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.calls = JSON.parse(stored);
            }
        } catch (error) {
            console.error('Error loading calls from storage:', error);
        }
    }

    private saveToStorage(): void {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.calls));
        } catch (error) {
            console.error('Error saving calls to storage:', error);
        }
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener([...this.calls]));
    }

    private initializeMockData(): void {
        const mockCalls: Call[] = [
            {
                id: '1',
                table: '1',
                type: 'Hesap İste',
                status: CallStatus.PENDING,
                timestamp: Date.now() - 60000
            },
            {
                id: '2',
                table: '3',
                type: 'Garson Çağır',
                status: CallStatus.PENDING,
                timestamp: Date.now() - 120000
            },
            {
                id: '3',
                table: '5',
                type: 'Sipariş Ver',
                status: CallStatus.ACCEPTED,
                timestamp: Date.now() - 180000
            }
        ];
        this.calls = mockCalls;
        this.saveToStorage();
    }

    async getCalls(): Promise<Call[]> {
        return Promise.resolve([...this.calls]);
    }

    async getCallById(id: string): Promise<Call | null> {
        const call = this.calls.find(c => c.id === id);
        return Promise.resolve(call || null);
    }

    async createCall(callData: Omit<Call, 'id' | 'timestamp'>): Promise<Call> {
        const newCall: Call = {
            ...callData,
            id: Date.now().toString(),
            timestamp: Date.now()
        };

        this.calls.unshift(newCall); 
        this.saveToStorage();
        this.notifyListeners();

        return Promise.resolve(newCall);
    }

    async updateCallStatus(id: string, status: CallStatus): Promise<Call> {
        const callIndex = this.calls.findIndex(c => c.id === id);

        if (callIndex === -1) {
            throw new Error(`Call with id ${id} not found`);
        }

        this.calls[callIndex] = {
            ...this.calls[callIndex],
            status
        };

        this.saveToStorage();
        this.notifyListeners();

        return Promise.resolve(this.calls[callIndex]);
    }

    async deleteCall(id: string): Promise<boolean> {
        const initialLength = this.calls.length;
        this.calls = this.calls.filter(c => c.id !== id);

        if (this.calls.length < initialLength) {
            this.saveToStorage();
            this.notifyListeners();
            return Promise.resolve(true);
        }

        return Promise.resolve(false);
    }

    subscribeToCallsUpdates(callback: (calls: Call[]) => void): () => void {
        this.listeners.push(callback);

        callback([...this.calls]);

        return () => {
            this.listeners = this.listeners.filter(listener => listener !== callback);
        };
    }
}

export const mockCallService = new MockCallService();
