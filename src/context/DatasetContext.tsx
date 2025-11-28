import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type PipelineStep =
    | "upload"
    | "overview"
    | "cleaning"
    | "visualization"
    | "eda"
    | "modeling"
    | "prediction";

type DatasetContextType = {
    rawDataset: any;
    setRawDataset: (data: any) => void;
    cleanedDataset: any;
    setCleanedDataset: (data: any) => void;
    visualizationDataset: any;
    setVisualizationDataset: (data: any) => void;
    edaDataset: any;
    setEdaDataset: (data: any) => void;
    pipelineStep: PipelineStep;
    setPipelineStep: (step: PipelineStep) => void;
};

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider = ({ children }: { children: ReactNode }) => {
    const [rawDataset, setRawDataset] = useState<any>(null);
    const [cleanedDataset, setCleanedDataset] = useState<any>(null);
    const [visualizationDataset, setVisualizationDataset] = useState<any>(null);
    const [edaDataset, setEdaDataset] = useState<any>(null);
    const [pipelineStep, setPipelineStep] = useState<PipelineStep>("upload");
    const values = { rawDataset, setRawDataset, cleanedDataset, setCleanedDataset, visualizationDataset, setVisualizationDataset, edaDataset, setEdaDataset, pipelineStep, setPipelineStep };
    return (<DatasetContext.Provider value={values}>
        {children}
    </DatasetContext.Provider>);
};

export const useDataset = () => {
    const context = useContext(DatasetContext);
    if (!context) {
        throw new Error("useDataset must be used with a DatasetProvider");
    }
    return context;
};