import { useTables } from '../../hooks/useTables';

interface TableSelectorProps {
    value: string;
    onChange: (value: string) => void;
}

function TableSelector({ value, onChange }: TableSelectorProps) {
    const { tables, loading } = useTables();

    if (loading) {
        return (
            <div className="w-[90%] sm:w-full max-w-125">
                <select
                    className="font-['Kelly_Slab'] w-full px-4 sm:px-8 py-3 text-lg sm:text-2xl bg-[#d9d9d9] border-none rounded-[40px] cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2732%27%20height=%2732%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20fill=%27%23000%27%20d=%27M7%2010l5%205%205-5z%27/%3E%3C/svg%3E')] bg-no-repeat bg-position-[right_15px_center] pr-12 sm:pr-16 text-black transition-all duration-300 hover:bg-[#c9c9c9] focus:outline-none focus:ring-2 focus:ring-black/20"
                    disabled
                >
                    <option>Yükleniyor...</option>
                </select>
            </div>
        );
    }

    return (
        <div className="w-[90%] sm:w-full max-w-125">
            <select
                className="font-['Kelly_Slab'] w-full px-4 sm:px-8 py-3 text-lg sm:text-2xl bg-[#d9d9d9] border-none rounded-[40px] cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2732%27%20height=%2732%27%20viewBox=%270%200%2024%2024%27%3E%3Cpath%20fill=%27%23000%27%20d=%27M7%2010l5%205%205-5z%27/%3E%3C/svg%3E')] bg-no-repeat bg-position-[right_15px_center] pr-12 sm:pr-16 text-black transition-all duration-300 hover:bg-[#c9c9c9] focus:outline-none focus:ring-2 focus:ring-black/20"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Masa Seçin</option>
                {tables.map((table) => (
                    <option key={table.id} value={`Masa ${table.tableNumber}`}>
                        Masa {table.tableNumber}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default TableSelector;

