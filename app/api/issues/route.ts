import { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { sendErrorResponse, sendSuccessResponse } from "../responseUtils";
import { issueSchema } from "@/app/validationSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return sendErrorResponse("Unauthorized", 401);
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
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
