import { stories } from "@prisma/client";

// TODO: rename prisma model to singular uppercase
export type Story = Omit<stories, "time"> & { time: string };
