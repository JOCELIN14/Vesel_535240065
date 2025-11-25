import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.update({
      where: { id: parseInt(params.id) },
      data: {
        likes: { increment: 1 },
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}
