import * as api from "@hacker-news/core/api";
import type { NextApiRequest, NextApiResponse } from "next";

export interface Response<T> {
  data?: T;
  error?: {
    message: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<api.Item[]>>
) {
  if (req.method !== "GET") {
    res
      .status(405)
      .json(errorResponse(`${req.method ?? "method"} not allowed`));
  }

  const items = await api.topStories({ top: 10 });
  res.status(200).json(dataResponse(items));
}

function dataResponse<T>(data: T): Response<T> {
  return {
    data,
  };
}

function errorResponse<T>(message: string): Response<T> {
  return {
    error: {
      message,
    },
  };
}
