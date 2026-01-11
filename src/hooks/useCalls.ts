import { useState, useEffect } from 'react';
import type { Call } from '../types/callTypes';
import type { ICallService } from '../services/callServiceInterface';
import { firebaseCallService } from '../services/firebaseCallService';

export function useCalls(service: ICallService = firebaseCallService) {
    const [calls, setCalls] = useState<Call[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const unsubscribe = service.subscribeToCallsUpdates((updatedCalls) => {
            setCalls(updatedCalls);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [service]);

    return { calls, loading };
}
