export type DatasetType = {
    row_count: number;
    columns: string[];
    preview: Record<string, any>[];
}
type DatasetPreviewProps = {
    dataset: DatasetType;
    page: number;
    setPage: (page: number) => void;
    pageSize?: number;
}
export default function DatasetPreview({
    dataset,
    page,
    setPage,
    pageSize = 5
}: DatasetPreviewProps) {
    const { columns, row_count, preview } = dataset;
    const totalPages = Math.ceil(preview.length / pageSize);
    const startIndex = page * pageSize;
    const currentRows = preview.slice(startIndex, startIndex + pageSize);
    return (
        <div className="space-y-6">
            <div>
                <p className="text-lg font-semibold text-gray-700 mb-3">
                    Rows: <span className="font-medium text-gray-600">{row_count}</span>
                </p>
                <p className="text-sm font-medium text-gray-700 mb-2">Columns: </p>
                <div className="flex gap-2 flex-wrap">{columns.map((col) => (
                    <span key={col} className="px-3 py-1 rounded-lg bg-gray-100 border text-xs text-gray-700">{col}</span>
                ))}</div>
            </div>
            <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="text-left font-medium px-4 py-2 border-b">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {currentRows.map((row, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                {columns.map((col) => (
                                    <td key={col} className="px-4 py-2 whitespace-nowrap">
                                        {row[col] ?? ""}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end items-center gap-3">
                <button onClick={() => setPage(page - 1)} disabled={page === 0} className="px-3 py-1 text-sm border rounded-md disabled:opacity-40">
                    Prev
                </button>
                <span className="text-sm text-gray-600">Page {page + 1} / {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages - 1} className="px-3 py-1 text-sm border rounded-md disabled:opacity-40">
                    Next
                </button>
            </div>
        </div >
    )
};