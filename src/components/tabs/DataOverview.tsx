import { useState } from "react";
import { useDataset } from "../../context/DatasetContext";
import DatasetPreview from "../../utils/DatasetPreview";

const DataOverviewTab = () => {
    const { rawDataset } = useDataset();

    const [page, setPage] = useState(0);
    const pageSize = 10;

    if (!rawDataset) return <p>No dataset uploaded</p>;

    return (
        <div className="p-6">
            <DatasetPreview dataset={rawDataset.data} page={page} setPage={setPage} pageSize={pageSize} />
        </div>
    );
};

export default DataOverviewTab;