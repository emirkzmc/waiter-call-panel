import { useState } from "react";
import { useTables } from "../../hooks/useTables";
import { useTableActions } from "../../hooks/useTableActions";

export default function TablesManagement() {
    const { tables, loading } = useTables();
    const { addTable, removeTable, isProcessing } = useTableActions();
    const [newTableNumber, setNewTableNumber] = useState("");
    const [error, setError] = useState("");

    const handleAddTable = async () => {
        const tableNum = parseInt(newTableNumber);
        if (!tableNum || tableNum <= 0) {
            setError("Geçerli bir masa numarası girin");
            return;
        }

        try {
            setError("");
            await addTable(tableNum);
            setNewTableNumber("");
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || "Masa eklenirken hata oluştu");
        }
    };

    const handleRemoveTable = async (tableId: string) => {
        try {
            setError("");
            await removeTable(tableId);
        } catch (err: unknown) {
            const error = err as { message?: string };
            setError(error.message || "Masa kaldırılırken hata oluştu");
        }
    };

    if (loading) {
        return (
            <div className="bg- rounded-lg p-6 w-full h-full flex items-center justify-center">
                <div className="text-white text-lg">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <div className="bg- rounded-lg p-6 w-full h-full overflow-y-auto">
            <h2 className="text-xl font-semibold text-white mb-6">
                Masa Yönetimi
            </h2>

            <div className="mb-8">
                <div className="flex gap-3 items-center mb-2">
                    <input
                        type="number"
                        value={newTableNumber}
                        onChange={(e) => setNewTableNumber(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTable()}
                        placeholder="Masa numarası"
                        className="text-white border-2 border-gray-300 rounded-lg px-4 py-2 w-48 focus:outline-none focus:border-gray-500 placeholder:text-white"
                        disabled={isProcessing}
                    />
                    <button
                        onClick={handleAddTable}
                        disabled={isProcessing}
                        className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? "İşleniyor..." : "Masa Ekle"}
                    </button>
                </div>
                {error && (
                    <div className="text-red-400 text-sm mt-2">
                        {error}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-4 gap-6">
                {tables.map((table) => (
                    <div
                        key={table.id}
                        className="bg-gray-100 rounded-lg p-4 flex flex-col items-center gap-3 border-2 border-gray-300"
                    >
                        <div className="text-lg font-semibold text-gray-800">
                            Masa {table.tableNumber}
                        </div>
                        <button
                            onClick={() => handleRemoveTable(table.id)}
                            disabled={isProcessing}
                            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Kaldır
                        </button>
                    </div>
                ))}
            </div>

            {tables.length === 0 && (
                <div className="text-center text-gray-400 py-12">
                    Henüz masa eklenmemiş
                </div>
            )}
        </div>
    );
}

