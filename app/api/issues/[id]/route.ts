import { NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { updateIssueSchema } from "@/app/validationSchema";
import { sendErrorResponse, sendSuccessResponse } from "../../responseUtils";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return sendErrorResponse("Unauthorized", 401);
  const body = await request.json();
  const validation = updateIssueSchema.safeParse(body);
  if (!validation.success) {
    const firstError = validation.error.issues[0];
    const path = firstError.path.join(".");
    const message = firstError.message;
    return sendErrorResponse(
      `${path ? path.toUpperCase() + ": " : ""}${message}`,
      400
    );
  }
  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });
    if (!user) return sendErrorResponse("Invalid User", 400);
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return sendErrorResponse("Issue not found.", 404);

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId,
    },
  });
  return sendSuccessResponse(updatedIssue, 201);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return sendErrorResponse("Unauthorized", 401);
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) return sendErrorResponse("Issue not found.", 404);

  await prisma.issue.delete({
    where: { id: issue.id },
  });
  return sendSuccessResponse({}, 200);
}
