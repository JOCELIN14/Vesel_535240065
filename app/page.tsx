import Link from "next/link";
import prisma from "@/lib/prisma";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-blue-600">
      <div className="container py-5">
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-md-8">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-5 text-center">
                <h1 className="display-3 fw-bold text-primary mb-4">
                  SOSIAL MEDIA KITA
                </h1>
                <div className="mb-4 p-4 bg-light rounded-3">
                  <h3 className="text-secondary mb-3">Informasi Mahasiswa</h3>
                  <p className="fs-5 mb-2">
                    <strong>Nama:</strong> [JOCELIN]
                  </p>
                  <p className="fs-5 mb-2">
                    <strong>NIM:</strong> [535240065]
                  </p>
                  <p className="fs-5 mb-0">
                    <strong>Topik:</strong> Social Media Website
                  </p>
                </div>

                <h4 className="mt-5 mb-4 text-start">
                  Daftar Postingan (Read-Only):
                </h4>
                <div className="text-start">
                  {posts.length === 0 ? (
                    <p className="text-muted">
                      Belum ada postingan yang diterbitkan.
                    </p>
                  ) : (
                    posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-3 mb-3 border rounded-3 shadow-sm bg-white"
                      >
                        <h5 className="text-primary mb-1">{post.title}</h5>
                        <p className="mb-2">{post.content}</p>
                        <small className="text-muted">
                          Dibuat: {post.createdAt.toLocaleDateString()}
                        </small>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-5">
                  <h4 className="mb-3">Fitur Aplikasi:</h4>
                  <div className="row g-3 mb-4">
                    <div className="col-md-4">
                      <div className="p-3 bg-primary bg-opacity-10 rounded">
                        <i className="bi bi-pencil-square fs-3 text-primary"></i>
                        <p className="mt-2 mb-0">Create Posts</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-success bg-opacity-10 rounded">
                        <i className="bi bi-heart-fill fs-3 text-danger"></i>
                        <p className="mt-2 mb-0">Like & Share</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="p-3 bg-info bg-opacity-10 rounded">
                        <i className="bi bi-compass fs-3 text-info"></i>
                        <p className="mt-2 mb-0">Explore API</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-3 d-md-flex justify-content-center">
                  <Link href="/posts" className="btn btn-primary btn-lg px-4">
                    <i className="bi bi-list-ul me-2"></i>
                    Lihat Semua Posts
                  </Link>
                  <Link
                    href="/explore"
                    className="btn btn-outline-primary btn-lg px-4"
                  >
                    <i className="bi bi-compass me-2"></i>
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
