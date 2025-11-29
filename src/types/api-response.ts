import { z } from "zod";

export const ApiResponseSchema = z.object({
    session_id: z.string(),
    status: z.enum(["success", "error"]),
    data: z.any()
});

export interface ApiResponse<T = any> {
    session_id: string;
    status: "success" | "error";
    data: T;
};

export const UploadDataSchema = z.object({
    columns: z.array(z.string()),
    row_count: z.number(),
    preview: z.array(z.record(z.string(), z.any())),
    message: z.string().optional()
});

export const UploadResponseSchema = ApiResponseSchema.extend({
    data: UploadDataSchema
})

export type UploadData = z.infer<typeof UploadDataSchema>;
export type UploadResponse = z.infer<typeof UploadResponseSchema>;

export const CleanDataSchema = z.object({
    columns: z.array(z.string()),
    row_count: z.number(),
    preview: z.array(z.record(z.string(), z.any())),
    message: z.string().optional()
});

export const CleanResponseSchema = ApiResponseSchema.extend({
    data: CleanDataSchema
})

export type CleanData = z.infer<typeof CleanDataSchema>;
export type CleanResponse = z.infer<typeof CleanResponseSchema>;

export const EdaDataSchema = z.object({
    message: z.string().optional()
});

export const EdaResponseSchema = ApiResponseSchema.extend({
    data: EdaDataSchema
})

export type EdaData = z.infer<typeof EdaDataSchema>;
export type EdaResponse = z.infer<typeof EdaResponseSchema>;

export const VisualisationDataSchema = z.object({
    message: z.string().optional()
});

export const VisualizationResponseSchema = ApiResponseSchema.extend({
    data: VisualisationDataSchema
})

export type VisualizationData = z.infer<typeof VisualisationDataSchema>;
export type VisualizationResponse = z.infer<typeof VisualizationResponseSchema>;

export const ModelBuildDataSchema = z.object({
    models: z.array(z.string()),
    message: z.string().optional()
});

export const ModelBuildResponseSchema = ApiResponseSchema.extend({
    data: ModelBuildDataSchema
})

export type ModelBuildData = z.infer<typeof ModelBuildDataSchema>;
export type ModelBuildResponse = z.infer<typeof ModelBuildResponseSchema>;

export const PredictionDataSchema = z.object({
    result: z.string(),
    message: z.string().optional()
});

export const PredictionResponseSchema = ApiResponseSchema.extend({
    data: PredictionDataSchema
})

export type PredictionData = z.infer<typeof PredictionDataSchema>;
export type PredictionResponse = z.infer<typeof PredictionResponseSchema>;