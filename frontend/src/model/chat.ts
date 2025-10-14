export interface Chat {
  user: string;
  ai: string | null;
  image: string | null;
}

export interface ChatResponse {
  timeTaken: string;
  response: string;
}
