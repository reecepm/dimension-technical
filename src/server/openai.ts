import { Configuration, OpenAIApi } from "openai";

import { env } from "@/env.mjs";

const globalForOpenAI = globalThis as unknown as {
  openai: OpenAIApi;
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = globalForOpenAI.openai || new OpenAIApi(configuration);

if (env.NODE_ENV !== "production") globalForOpenAI.openai = openai;
