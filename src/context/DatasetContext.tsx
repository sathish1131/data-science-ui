import { createContext, useContext, useState } from "react";
import type { UploadResponse, CleanResponse, ModelBuildResponse } from "../types";

type DatasetContextType = {
    rawDataset: UploadResponse | null;
    cleanedDataset: CleanResponse | null;
    trainedModel: ModelBuildResponse | null;
    setRawDataset: (data: UploadResponse | null) => void;
    setCleanedDataset: (data: CleanResponse | null) => void;
    setTrainedModel: (data: ModelBuildResponse | null) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

const DatasetContext = createContext<DatasetContextType>({
    rawDataset: null,
    cleanedDataset: null,
    trainedModel: null,
    setRawDataset: () => { },
    setCleanedDataset: () => { },
    setTrainedModel: () => { },
    activeTab: "overview",
    setActiveTab: () => { }
});

export const DatasetProvider = ({ children }: any) => {
    const [rawDataset, setRawDataset] = useState<UploadResponse | null>(null);
    const [cleanedDataset, setCleanedDataset] = useState<CleanResponse | null>(null);
    const [trainedModel, setTrainedModel] = useState<any>(null);
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <DatasetContext.Provider
            value={{
                rawDataset,
                cleanedDataset,
                setRawDataset,
                setCleanedDataset,
                trainedModel,
                setTrainedModel,
                activeTab,
                setActiveTab,
            }}
        >
            {children}
        </DatasetContext.Provider>
    );
};

export const useDataset = () => useContext(DatasetContext);