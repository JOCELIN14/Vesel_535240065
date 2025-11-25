// Pastikan Anda sudah mengonfigurasi prisma client di lib/prisma.ts atau lib/db.ts
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface EditPageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: EditPageProps) {
  const postId = parseInt(params.id);

  if (isNaN(postId)) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },

    select: {
      id: true,
      title: true,
      content: true,
      author: true,
      category: true,
      tags: true,
      isPublic: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Post: {post.title}</h1>

      {}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4 text-gray-700">
          Formulir untuk Post ID: **{post.id}** akan dimuat di sini.
        </p>

        {}

        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Judul</label>
            <input
              type="text"
              defaultValue={post.title}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Simpan Perubahan
          </button>
        </form>
      </div>
    </div>
  );
}
