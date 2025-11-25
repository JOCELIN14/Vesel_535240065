"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    category: "Technology",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/posts");
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">
                <i className="bi bi-plus-circle me-2" />
                Create New Post
              </h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Author */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Author *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    required
                    placeholder="Your name"
                  />
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Post Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    placeholder="What's your post about?"
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Content *</label>
                  <textarea
                    className="form-control"
                    rows={5}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                    placeholder="Write something awesome..."
                  />
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Education">Education</option>
                    <option value="Sports">Sports</option>
                    <option value="Entertainment">Entertainment</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Create Post
                      </>
                    )}
                  </button>

                  <Link href="/posts" className="btn btn-secondary">
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
