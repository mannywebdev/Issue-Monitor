import { NextResponse } from "next/server";

const sendSuccessResponse = <T>(data: T, statusCode: number) => {
  return NextResponse.json({ success: true, data }, { status: statusCode });
};

const sendErrorResponse = (errorMessage: string, statusCode: number) => {
  return NextResponse.json(
    { success: false, error: errorMessage },
    { status: statusCode }
  );
};

export { sendSuccessResponse, sendErrorResponse };
