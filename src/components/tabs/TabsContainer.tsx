import React, { useEffect, useState } from "react";
import DataOverviewTab from "./DataOverview";
import DataCleanTab from "./DataClean";
import DataVisualizationTab from "./DataVisualization";
import AutoEDATab from "./AutoEDA";
import ModelBuildTab from "./ModelBuild";
import PredictionTab from "./Prediction";
import { useDataset } from "../../context/DatasetContext";

const tabs = [
    { id: "overview", label: "Data Overview" },
    { id: "clean", label: "Data Cleaning" },
    { id: "visual", label: "Data Visualization" },
    { id: "eda", label: "Auto EDA" },
    { id: "model", label: "Model Building" },
    { id: "predict", label: "Prediction" },
];

const order = ["upload", "overview", "cleaning", "visualization", "eda", "modeling", "prediction"];

const TabsContainer: React.FC = () => {
    const { pipelineStep, dataset } = useDataset();
    const [activeTab, setActiveTab] = useState<string>("overview");

    useEffect(() => {
        const currentIdx = order.indexOf(pipelineStep);

        const firstEnabled = tabs.find(tab => {
            const requiredStepKey =
                tab.id === "overview" ? "overview" :
                    tab.id === "clean" ? "cleaning" :
                        tab.id === "visual" ? "visualization" :
                            tab.id === "eda" ? "eda" :
                                tab.id === "model" ? "modeling" :
                                    "prediction";
            return order.indexOf(requiredStepKey) <= currentIdx;
        });

        if (firstEnabled) {
            setActiveTab(firstEnabled.id);
        } else {
            setActiveTab("overview");
        }
    }, [pipelineStep, dataset]);

    const renderTabContent = () => {
        switch (activeTab) {
            case "overview":
                return <DataOverviewTab />;
            case "clean":
                return <DataCleanTab />;
            case "visual":
                return <DataVisualizationTab />;
            case "eda":
                return <AutoEDATab />;
            case "model":
                return <ModelBuildTab />;
            case "predict":
                return <PredictionTab />;
            default:
                return null;
        }
    };

    const currentIdx = order.indexOf(pipelineStep);

    return (
        <div className="w-full mt-10 px-6">
            <div className="flex justify-center space-x-4 mb-6">
                {tabs.map((tab) => {
                    const requiredStepKey =
                        tab.id === "overview" ? "overview" :
                            tab.id === "clean" ? "cleaning" :
                                tab.id === "visual" ? "visualization" :
                                    tab.id === "eda" ? "eda" :
                                        tab.id === "model" ? "modeling" :
                                            "prediction";

                    const requiredIdx = order.indexOf(requiredStepKey);
                    const disabled = currentIdx < requiredIdx;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => !disabled && setActiveTab(tab.id)}
                            disabled={disabled}
                            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all
                ${activeTab === tab.id ? "bg-sky-500 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-sky-100"}
                ${disabled ? "opacity-40 cursor-not-allowed" : ""}
              `}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center min-h-[200px]">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TabsContainer;