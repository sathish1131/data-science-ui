import axios from "axios";
import { API_CONFIG } from "./config";

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

export interface Dataset {
    name: string;
    columns: string[];
    preview: any[];
}

export const uploadFile = async (file: File): Promise<Dataset> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = api.post<Dataset>(API_CONFIG.ENDPOINTS.UPLOAD_FILE,
        formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return (await response).data;
};