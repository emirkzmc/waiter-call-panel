import type { CallStatus } from '../../types/callTypes';
import { getStatusLabel, getStatusColor } from '../../constants/callStatusConstants';

interface StatusBadgeProps {
    status: CallStatus;
    className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
    const colorClass = getStatusColor(status);
    const label = getStatusLabel(status);

    return (
        <span
            className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${colorClass} ${className}`}
        >
            {label}
        </span>
    );
}
