import prisma from "@/prisma/client";
import { NextRequest } from "next/server";
import { sendSuccessResponse } from "../responseUtils";

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return sendSuccessResponse(users, 200);
}
