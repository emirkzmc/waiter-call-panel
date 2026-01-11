import { useState, useEffect } from 'react';
import type { Table } from '../types/tableTypes';
import type { ITableService } from '../services/tableServiceInterface';
import { firebaseTableService } from '../services/firebaseTableService';

export function useTables(service: ITableService = firebaseTableService) {
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        const unsubscribe = service.subscribeToTablesUpdates((updatedTables) => {
            setTables(updatedTables);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [service]);

    return { tables, loading };
}
