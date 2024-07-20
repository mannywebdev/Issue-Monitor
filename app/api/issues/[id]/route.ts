import { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchema";
import { sendErrorResponse, sendSuccessResponse } from "../../responseUtils";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return sendErrorResponse("Issue not found.", 404);

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      ...body,
    },
  });
  return sendSuccessResponse(updatedIssue, 201);
}
