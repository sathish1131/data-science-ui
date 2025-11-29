import React, { useEffect, useState } from "react";
import { useDataset } from "../../context/DatasetContext";
import DatasetPreview from "../../utils/DatasetPreview";

const DataOverviewTab: React.FC = () => {
    const { rawDataset, setPipelineStep } = useDataset();
    useEffect(() => {
        if (rawDataset) {
            setPipelineStep("cleaning");
        }
    }, [rawDataset]);
    const [page, setPage] = useState(0);
    const pageSize = 10;
    return (
        <div className="p-6">
            {rawDataset && (
                < DatasetPreview dataset={rawDataset.data} page={page} setPage={setPage} pageSize={pageSize} />
            )}
        </div>
    )
};

export default DataOverviewTab;