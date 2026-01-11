import { useCallback } from 'react';
import type { CallStatus } from '../types/callTypes';
import type { ICallService } from '../services/callServiceInterface';
import { firebaseCallService } from '../services/firebaseCallService';


export function useCallActions(service: ICallService = firebaseCallService) {
    const updateStatus = useCallback(
        async (id: string, status: CallStatus) => {
            try {
                await service.updateCallStatus(id, status);
            } catch (error) {
                console.error('Error updating call status:', error);
                throw error;
            }
        },
        [service]
    );

    const deleteCall = useCallback(
        async (id: string) => {
            try {
                await service.deleteCall(id);
            } catch (error) {
                console.error('Error deleting call:', error);
                throw error;
            }
        },
        [service]
    );

    const createCall = useCallback(
        async (callData: { table: string; type: string; status: CallStatus }) => {
            try {
                return await service.createCall(callData);
            } catch (error) {
                console.error('Error creating call:', error);
                throw error;
            }
        },
        [service]
    );

    return {
        updateStatus,
        deleteCall,
        createCall,
    };
}
