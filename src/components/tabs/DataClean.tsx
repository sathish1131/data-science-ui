import React, { useEffect } from "react";
import { useDataset } from "../../context/DatasetContext";

const DataOverviewTab: React.FC = () => {
    const { cleanedDataset, rawDataset, setPipelineStep } = useDataset();
    if (!cleanedDataset && rawDataset) {

    }
    useEffect(() => {
        if (cleanedDataset) {
            setPipelineStep("cleaning");
        }
    }, [cleanedDataset]);

    return (
        <div>
            {cleanedDataset && (
                <div className="w-full flex justify-center mt-10">
                    <div className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl p-8 w-[750px] text-center hover:shadow-xl transition-all duration-300">
                        <p className="text-lg font-semibold text-gray-700 mb-3">
                            Rows: <span className="font-medium text-gray-600">{cleanedDataset.data?.row_count}</span>
                        </p>
                        <h3 className="text-lg font-semibold text-gray-700 mt-4 mb-3">
                            Columns:
                        </h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {cleanedDataset.data?.columns?.map((col: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm border border-sky-200"
                                >
                                    {col}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default DataOverviewTab;