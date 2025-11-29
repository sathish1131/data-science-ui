import { useEffect, useRef, useState } from "react";
import { useDataset } from "../../context/DatasetContext";
import DatasetPreview from "../../utils/DatasetPreview";
import type { CleanResponse } from "../../types";
import { cleanData } from "../../services/api";

const DataCleanTab = () => {
    const { rawDataset, cleanedDataset, setCleanedDataset } = useDataset();
    const [isLoading, setIsLoading] = useState(false);
    const hasCalledRef = useRef(false);

    const handleClean = async () => {
        if (!rawDataset || cleanedDataset) return;
        setIsLoading(true);
        const response: CleanResponse = await cleanData(rawDataset.session_id);
        setCleanedDataset(response);
        setIsLoading(false);
    };

    useEffect(() => {
        if (rawDataset && !cleanedDataset && !hasCalledRef.current) {
            hasCalledRef.current = true;
            handleClean();
        }
    }, [rawDataset, cleanedDataset]);

    const [page, setPage] = useState(0);
    const pageSize = 10;

    return (
        <div className="p-6">
            {isLoading && <p>Cleaning dataset...</p>}
            {cleanedDataset && (
                <DatasetPreview
                    dataset={cleanedDataset.data}
                    page={page}
                    setPage={setPage}
                    pageSize={pageSize}
                />
            )}
        </div>
    );
};

export default DataCleanTab;