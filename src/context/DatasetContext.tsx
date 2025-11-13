import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface Dataset {
    name: string;
    columns: string[];
    preview: any[];
}

interface DatasetContextType {
    dataset: Dataset | null;
    setDataset: React.Dispatch<React.SetStateAction<Dataset | null>>;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider = ({ children }: { children: ReactNode }) => {
    const [dataset, setDataset] = useState<Dataset | null>(null);
    return (<DatasetContext.Provider value={{ dataset, setDataset }}>
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