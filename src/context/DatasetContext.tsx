import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type PipelineStep =
    | "upload"
    | "cleaning"
    | "visualization"
    | "eda"
    | "modeling"
    | "prediction";

type DatasetContextType = {
    dataset: any;
    setDataset: (data: any) => void;
    pipelineStep: PipelineStep;
    setPipelineStep: (step: PipelineStep) => void;
};

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider = ({ children }: { children: ReactNode }) => {
    const [dataset, setDataset] = useState<any>(null);
    const [pipelineStep, setPipelineStep] = useState<PipelineStep>("upload");
    return (<DatasetContext.Provider value={{ dataset, setDataset, pipelineStep, setPipelineStep }}>
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