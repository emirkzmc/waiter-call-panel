export const CallStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
} as const;

export type CallStatus = typeof CallStatus[keyof typeof CallStatus];

export const CallType = {
    WAITER_CALL: 'Garson Çağır',
    ORDER: 'Sipariş Ver',
    CHECK_REQUEST: 'Hesap İste'
} as const;

export type CallType = typeof CallType[keyof typeof CallType];

export interface Call {
    id: string;
    table: string;
    type: string;
    status: CallStatus;
    timestamp: number;
    completedAt?: number; 
}
