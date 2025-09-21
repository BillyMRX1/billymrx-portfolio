import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "resume.pdf");
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"resume.pdf\"",
        "Cache-Control": "public, max-age=86400",
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
  } catch (error) {
    return new NextResponse("Resume file not found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
}
