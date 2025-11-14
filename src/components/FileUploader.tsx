import React, { useState } from "react";
import { uploadFile } from "../services/api";
import { useDataset } from "../context/DatasetContext";

const FileUploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadEnabled, setUploadEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setDataset, setPipelineStep } = useDataset();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPipelineStep("upload");
            setDataset(null);
            setUploadEnabled(true);
        }
    };


    const handleUpload = async () => {
        if (!selectedFile) return alert("Please upload a file first!");
        try {
            setLoading(true);
            const data = await uploadFile(selectedFile);
            setDataset(data);
            setPipelineStep("cleaning");
            setUploadEnabled(false);
            alert("File uploaded successfully");
        } catch (err) {
            console.error("Upload Error: ", err);
            setUploadEnabled(true);
            setPipelineStep("upload");
            alert("Upload Failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center mt-10">
            <div className="bg-white/90 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl p-8 w-[400px] text-center hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-semibold text-sky-600 mb-2">
                    Upload Dataset
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                    Upload your CSV or Excel file to begin analysis
                </p>
                <div className="border-2 border-dashed border-sky-300 rounded-xl p-6 bg-sky-50/40 hover:bg-sky-100 transition-colors">
                    <input
                        type="file"
                        accept=".csv, .xlsx, .xls"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-600 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-sky-500 file:text-white hover:file:bg-sky-600 cursor-pointer"
                    />
                </div>
                {selectedFile && (
                    <p className="mt-4 text-gray-700 text-sm italic">
                        Selected: <span className="font-medium">{selectedFile.name}</span>
                    </p>
                )}
                <button
                    onClick={handleUpload}
                    disabled={!uploadEnabled || loading}
                    className={`mt-6 w-full py-2 rounded-lg text-white font-semibold transition-all ${!uploadEnabled || loading ? "bg-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600"
                        }`}
                >
                    {loading ? "Uploading..." : "Upload File"}
                </button>
            </div>
        </div>
    );
};

export default FileUploader;