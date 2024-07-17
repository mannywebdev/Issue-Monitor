import { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { sendErrorResponse, sendSuccessResponse } from "../responseUtils";
import { createIssueSchema } from "@/app/validationSchema";

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
