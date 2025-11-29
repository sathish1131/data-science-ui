import React from "react";
import DataOverviewTab from "./DataOverview";
import DataCleanTab from "./DataClean";
import DataVisualizationTab from "./DataVisualization";
import AutoEDATab from "./AutoEDA";
import ModelBuildTab from "./ModelBuild";
import PredictionTab from "./Prediction";
import { useDataset } from "../../context/DatasetContext";

const TabsContainer: React.FC = () => {
    const { rawDataset, cleanedDataset, trainedModel, activeTab, setActiveTab } = useDataset();

    const tabs = [
        { id: "overview", label: "Data Overview", enabled: rawDataset !== null },
        { id: "clean", label: "Data Cleaning", enabled: rawDataset !== null },
        { id: "visual", label: "Data Visualization", enabled: cleanedDataset !== null },
        { id: "eda", label: "Auto EDA", enabled: cleanedDataset !== null },
        { id: "model", label: "Model Building", enabled: cleanedDataset !== null },
        { id: "predict", label: "Prediction", enabled: trainedModel !== null },
    ];

    return (
        <div className="w-full mt-10 px-6">
            <div className="flex justify-center space-x-4 mb-6">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => tab.enabled && setActiveTab(tab.id)}
                        disabled={!tab.enabled}
                        className={`px-4 py-2 rounded-xl font-medium text-sm 
              ${activeTab === tab.id ? "bg-sky-500 text-white" : "bg-gray-100 text-gray-600"}
              ${!tab.enabled ? "opacity-40 cursor-not-allowed" : ""}
            `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center">
                {{
                    overview: <DataOverviewTab />,
                    clean: <DataCleanTab />,
                    visual: <DataVisualizationTab />,
                    eda: <AutoEDATab />,
                    model: <ModelBuildTab />,
                    predict: <PredictionTab />
                }[activeTab]}
            </div>
        </div>
    );
};

export default TabsContainer;