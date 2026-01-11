import { useState } from 'react';
import type { ITableService } from '../services/tableServiceInterface';
import { firebaseTableService } from '../services/firebaseTableService';

export function useTableActions(service: ITableService = firebaseTableService) {
    const [isProcessing, setIsProcessing] = useState(false);

    const addTable = async (tableNumber: number): Promise<void> => {
        setIsProcessing(true);
        try {
            await service.addTable(tableNumber);
        } catch (error) {
            console.error('Error in addTable hook:', error);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    const removeTable = async (tableId: string): Promise<void> => {
        setIsProcessing(true);
        try {
            await service.removeTable(tableId);
        } catch (error) {
            console.error('Error in removeTable hook:', error);
            throw error;
        } finally {
            setIsProcessing(false);
        }
    };

    return { addTable, removeTable, isProcessing };
}
