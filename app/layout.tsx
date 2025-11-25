import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SocialKita - Share Your Stories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow">
          <div className="container">
            <Link href="/" className="navbar-brand fw-bold fs-4">
              <i className="bi bi-chat-heart-fill me-2"></i>
              SocialKita
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    <i className="bi bi-house-door me-1"></i>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/posts">
                    <i className="bi bi-newspaper me-1"></i>
                    Posts
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/posts/add">
                    <i className="bi bi-plus-circle me-1"></i>
                    Create
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/explore">
                    <i className="bi bi-compass me-1"></i>
                    Explore
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="min-vh-100">{children}</main>

        <footer className="bg-dark text-white py-4 mt-5">
          <div className="container text-center">
            <p className="mb-0">SocialKita</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
