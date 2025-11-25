import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all posts
export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("ERROR GET POSTS:", error); // <-- tambahkan ini
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

// POST create new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await prisma.post.create({
      data: {
        author: body.author,
        title: body.title,
        content: body.content,
        imageUrl: body.imageUrl || null,
        category: body.category,
        tags: body.tags || null,
        isPublic: body.isPublic !== false,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("ERROR CREATE POST:", error); // <-- tambahkan ini
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
