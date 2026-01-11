import { CallStatus } from '../types/callTypes';

export const STATUS_COLORS: Record<CallStatus, string> = {
    [CallStatus.PENDING]: 'bg-[#DADADA]',
    [CallStatus.ACCEPTED]: 'bg-[#E3F2FD]',
    [CallStatus.COMPLETED]: 'bg-[#C8E6C9]',
    [CallStatus.CANCELLED]: 'bg-[#FFCDD2]',
};


export const STATUS_LABELS: Record<CallStatus, string> = {
    [CallStatus.PENDING]: 'Bekleniyor',
    [CallStatus.ACCEPTED]: 'İlgileniliyor',
    [CallStatus.COMPLETED]: 'Tamamlandı',
    [CallStatus.CANCELLED]: 'İptal Edildi',
};


export const STATUS_PRIORITY: Record<CallStatus, number> = {
    [CallStatus.PENDING]: 0,
    [CallStatus.ACCEPTED]: 1,
    [CallStatus.COMPLETED]: 2,
    [CallStatus.CANCELLED]: 3
};

export const getStatusColor = (status: CallStatus | string): string => {
    return STATUS_COLORS[status as CallStatus] || 'bg-white';
};

export const getStatusLabel = (status: CallStatus | string): string => {
    return STATUS_LABELS[status as CallStatus] || status;
};
