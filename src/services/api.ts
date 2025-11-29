import axios from "axios";
import { API_CONFIG } from "./config";
import { CleanResponseSchema, UploadResponseSchema, type CleanResponse, type UploadResponse } from "../types";

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

export const uploadFile = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = api.post<UploadResponse>(API_CONFIG.ENDPOINTS.UPLOAD_FILE,
        formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    const validated = UploadResponseSchema.parse((await response).data);
    return validated;
};

export const cleanData = async (session_id: string): Promise<CleanResponse> => {
    const response = api.post<CleanResponse>(API_CONFIG.ENDPOINTS.CLEAN_DATA,
        {
            "session_id": session_id
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        });
    const validated = CleanResponseSchema.parse((await response).data);
    return validated;
};