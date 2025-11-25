"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    author: "",
    title: "",
    content: "",
    category: "Technology",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          author: data.author,
          title: data.title,
          content: data.content,
          category: data.category,
        });
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/posts/${params.id}`);
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Error updating post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-warning text-dark">
              <h2 className="mb-0">
                <i className="bi bi-pencil me-2"></i>Edit Post
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
                  />
                </div>

                {/* Title */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Content */}
                <div className="mb-3">
                  <label className="form-label fw-bold">Content *</label>
                  <textarea
                    className="form-control"
                    rows={6}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Category */}
                <div className="mb-3">
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
                    className="btn btn-warning"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>

                  <Link
                    href={`/posts/${params.id}`}
                    className="btn btn-secondary"
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancel
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
