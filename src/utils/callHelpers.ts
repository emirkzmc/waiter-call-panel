import type { Call, CallStatus } from '../types/callTypes';
import { STATUS_PRIORITY } from '../constants/callStatusConstants';



export function formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Şimdi';
    if (diffMins < 60) return `${diffMins} dakika önce`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} saat önce`;

    return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}


export function getElapsedMinutes(timestamp: number): number {
    const now = Date.now();
    return Math.floor((now - timestamp) / 60000);
}


export function isCallOverdue(call: Call): boolean {
    if (call.status !== 'pending') return false;
    return getElapsedMinutes(call.timestamp) > 10;
}


export function sortCalls(calls: Call[]): Call[] {
    return [...calls].sort((a, b) => {
        const priorityA = STATUS_PRIORITY[a.status];
        const priorityB = STATUS_PRIORITY[b.status];

        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }

        return parseInt(a.table, 10) - parseInt(b.table, 10);
    });
}



export function filterCallsByStatus(calls: Call[], status: CallStatus): Call[] {
    return calls.filter(call => call.status === status);
}


export function getActiveCalls(calls: Call[]): Call[] {
    return calls.filter(call => call.status === 'pending' || call.status === 'accepted');
}


export function getCallsCountByStatus(calls: Call[]): Record<CallStatus, number> {
    return calls.reduce((acc, call) => {
        acc[call.status] = (acc[call.status] || 0) + 1;
        return acc;
    }, {} as Record<CallStatus, number>);
}
