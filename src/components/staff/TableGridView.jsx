import TableCard from "./TableCard";

function TableGridView({ tables, onConfirm }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {tables.map((t) => (
                <TableCard key={t.id} table={t} onConfirm={onConfirm} />
            ))}
        </div>
    );
}

export default TableGridView;
