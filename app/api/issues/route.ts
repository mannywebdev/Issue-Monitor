import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { sendErrorResponse, sendSuccessResponse } from "../responseUtils";

const createIssueSchema = z
  .object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
  })
  .strict();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    const firstError = validation.error.issues[0];
    const path = firstError.path.join(".");
    const message = firstError.message;
    return sendErrorResponse(
      `${path ? path.toUpperCase() + ": " : ""}${message}`,
      400
    );
  }
  const newIssue = await prisma.issue.create({
    data: { ...body },
  });
  return sendSuccessResponse(newIssue, 201);
}
