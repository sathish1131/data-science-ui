import React, { useState } from "react";
import DataCleanTab from "./DataClean";
import DataVisualizationTab from "./DataVisualization";
import AutoEDATab from "./AutoEDA";
import ModelBuildTab from "./ModelBuild";
import PredictionTab from "./Prediction";

const tabs = [
    { id: "clean", label: "Data Cleaning" },
    { id: "visual", label: "Data Visualization" },
    { id: "eda", label: "Auto EDA" },
    { id: "model", label: "Model Building" },
    { id: "predict", label: "Prediction" }
];

const TabsContainer: React.FC = () => {
    const [activeTab, setActiveTab] = useState("clean");

    const renderTabContent = () => {
        switch (activeTab) {
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
    return (
        <div className="w-full mt-10 px-6">
            <div className="flex justify-center space-x-4 mb-6">
                {tabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${activeTab == tab.id ? "bg-sky-500 text-white shadow" : "bg-gray-100 text-gray-600 hover:bg-sky-100"}`}>
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 text-center min-h-[200px]">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default TabsContainer;