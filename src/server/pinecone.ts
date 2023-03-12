import { PineconeClient } from "pinecone-client";

import { env } from "@/env.mjs";

export type EmbeddingType = "input" | "tag" | "project";
export type Metadata = { type: EmbeddingType };

const globalForPinecone = globalThis as unknown as {
  pinecone: PineconeClient<Metadata>;
};

export const pinecone =
  globalForPinecone.pinecone ||
  new PineconeClient<Metadata>({
    apiKey: process.env.PINECONE_API_KEY,
    baseUrl: process.env.PINECONE_BASE_URL,
    namespace: process.env.PINECONE_NAMESPACE,
  });

if (env.NODE_ENV !== "production") globalForPinecone.pinecone = pinecone;
