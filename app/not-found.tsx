import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="mb-4">
              <i className="bi bi-emoji-frown display-1 text-primary"></i>
            </div>
            <h1 className="display-1 fw-bold text-primary">404</h1>
            <h2 className="mb-4">Oops! Page Not Found</h2>
            <p className="lead text-muted mb-4">
              The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable.
            </p>

            <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
              <Link href="/" className="btn btn-primary btn-lg">
                <i className="bi bi-house-door me-2"></i>
                Go Home
              </Link>
              <Link href="/posts" className="btn btn-outline-primary btn-lg">
                <i className="bi bi-newspaper me-2"></i>
                View Posts
              </Link>
            </div>

            <div className="mt-5 p-4 bg-white rounded shadow-sm">
              <h5 className="mb-3">Quick Links</h5>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <Link
                  href="/"
                  className="badge bg-primary text-decoration-none p-2"
                >
                  Home
                </Link>
                <Link
                  href="/posts"
                  className="badge bg-primary text-decoration-none p-2"
                >
                  Posts
                </Link>
                <Link
                  href="/posts/add"
                  className="badge bg-primary text-decoration-none p-2"
                >
                  Create Post
                </Link>
                <Link
                  href="/explore"
                  className="badge bg-primary text-decoration-none p-2"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
