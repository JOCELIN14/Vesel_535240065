"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  likes: number;
  category: string;
  createdAt: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts", { cache: "no-store" });
      const data = await response.json();
      console.log("HASIL FETCH:", data);

      setPosts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus post ini?")) {
      try {
        await fetch(`/api/posts/${id}`, { method: "DELETE" });
        fetchPosts();
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleLike = async (id: number) => {
    try {
      await fetch(`/api/posts/${id}/like`, { method: "POST" });
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-4 fw-bold">
            <i className="bi bi-newspaper me-3"></i>
            All Posts
          </h1>
        </div>
        <div className="col-auto">
          <Link href="/posts/add" className="btn btn-primary btn-lg">
            <i className="bi bi-plus-circle me-2"></i>
            Create New Post
          </Link>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="alert alert-info text-center">
          <h4>No posts yet!</h4>
          <p>Be the first to create a post.</p>
        </div>
      ) : (
        <div className="row g-4">
          {posts.map((post) => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm hover-shadow transition">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className="badge bg-primary">{post.category}</span>
                    <small className="text-muted">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </small>
                  </div>

                  <h5 className="card-title fw-bold">{post.title}</h5>
                  <p className="text-muted mb-2">
                    <i className="bi bi-person-circle me-1"></i>
                    by {post.author}
                  </p>
                  <p className="card-text">
                    {post.content.substring(0, 100)}...
                  </p>

                  <div className="d-flex align-items-center gap-2 mb-3">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="btn btn-sm btn-outline-danger"
                    >
                      <i className="bi bi-heart-fill me-1"></i>
                      {post.likes}
                    </button>
                  </div>

                  <div className="d-grid gap-2">
                    <Link
                      href={`/posts/${post.id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      <i className="bi bi-eye me-1"></i>
                      View Details
                    </Link>
                    <div className="btn-group">
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="btn btn-warning btn-sm"
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <i className="bi bi-trash me-1"></i>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
