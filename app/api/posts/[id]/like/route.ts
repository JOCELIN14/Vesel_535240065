import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: {
        likes: { increment: 1 },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}
