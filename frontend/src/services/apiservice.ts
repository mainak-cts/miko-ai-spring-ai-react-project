import { axiosIntance } from "../config/axiosconfig";
import type { ChatResponse } from "../model/chat";

export const chatWithAI = async (formData: FormData) => {
  const response = await axiosIntance.post<ChatResponse>("/chat", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
