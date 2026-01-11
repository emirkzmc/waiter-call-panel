import type { Table } from '../types/tableTypes';

export interface ITableService {
 
    subscribeToTablesUpdates(callback: (tables: Table[]) => void): () => void;

    addTable(tableNumber: number): Promise<void>;

    removeTable(tableId: string): Promise<void>;

    getTables(): Promise<Table[]>;
}
