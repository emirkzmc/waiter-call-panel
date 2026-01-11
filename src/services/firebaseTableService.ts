import { getDatabase, ref, onValue, set, update, get, push, query, orderByChild } from 'firebase/database';
import { app } from '../config/firebaseConfig';
import type { ITableService } from './tableServiceInterface';
import type { Table } from '../types/tableTypes';

export class FirebaseTableService implements ITableService {
    private db = getDatabase(app);
    private tablesRef = ref(this.db, 'tables');

    subscribeToTablesUpdates(callback: (tables: Table[]) => void): () => void {
        const tablesQuery = query(this.tablesRef, orderByChild('tableNumber'));

        const unsubscribe = onValue(
            tablesQuery,
            (snapshot) => {
                const tablesData = snapshot.val() as Record<string, Omit<Table, 'id'>> | null;
                const tables: Table[] = [];

                if (tablesData) {
                    Object.keys(tablesData).forEach((key) => {
                        const table = tablesData[key];
                        if (table.isActive) {
                            tables.push({
                                id: key,
                                tableNumber: table.tableNumber,
                                isActive: table.isActive,
                                createdAt: table.createdAt,
                            });
                        }
                    });

                    tables.sort((a, b) => a.tableNumber - b.tableNumber);
                }

                callback(tables);
            },
            (error) => {
                console.error('Error subscribing to tables:', error);
                callback([]);
            }
        );

        return () => unsubscribe();
    }

    async addTable(tableNumber: number): Promise<void> {
        try {
            const snapshot = await get(this.tablesRef);
            const existingTables = snapshot.val() as Record<string, Omit<Table, 'id'>> | null;

            if (existingTables) {
                const duplicate = Object.values(existingTables).find(
                    (table) => table.tableNumber === tableNumber && table.isActive
                );

                if (duplicate) {
                    throw new Error(`Masa ${tableNumber} zaten mevcut`);
                }
            }

            const newTableRef = push(this.tablesRef);
            const newTable: Omit<Table, 'id'> = {
                tableNumber,
                isActive: true,
                createdAt: Date.now(),
            };

            await set(newTableRef, newTable);
        } catch (error) {
            console.error('Error adding table:', error);
            throw error;
        }
    }

    async removeTable(tableId: string): Promise<void> {
        try {
            const tableRef = ref(this.db, `tables/${tableId}`);
            await update(tableRef, { isActive: false });
        } catch (error) {
            console.error('Error removing table:', error);
            throw error;
        }
    }

    async getTables(): Promise<Table[]> {
        try {
            const snapshot = await get(this.tablesRef);
            const tablesData = snapshot.val() as Record<string, Omit<Table, 'id'>> | null;
            const tables: Table[] = [];

            if (tablesData) {
                Object.keys(tablesData).forEach((key) => {
                    const table = tablesData[key];
                    if (table.isActive) {
                        tables.push({
                            id: key,
                            tableNumber: table.tableNumber,
                            isActive: table.isActive,
                            createdAt: table.createdAt,
                        });
                    }
                });

                tables.sort((a, b) => a.tableNumber - b.tableNumber);
            }

            return tables;
        } catch (error) {
            console.error('Error getting tables:', error);
            return [];
        }
    }
}

export const firebaseTableService = new FirebaseTableService();
