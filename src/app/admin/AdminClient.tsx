"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, ProjectHighlight } from "@/lib/types";
import {
  Lock,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Save,
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  Newspaper,
  Calendar,
  Sparkles,
  Search,
  LogOut,
  RefreshCw,
  FileText,
  Check,
  Building,
  MapPin,
} from "lucide-react";

export const AdminClient: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Editions State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [savingPost, setSavingPost] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields for "Building the Future – Monthly Edition"
  const [formEditionName, setFormEditionName] = useState("");
  const [formMonthYear, setFormMonthYear] = useState("");
  const [formPdfUrl, setFormPdfUrl] = useState("");
  const [formSummary, setFormSummary] = useState("");
  const [formImage, setFormImage] = useState("/assets/blog/blog_waterproofing.jpg");

  // Subheading 1: Project Highlights
  const [projHeadingTitle, setProjHeadingTitle] = useState("Project Highlights");
  const [highlights, setHighlights] = useState<ProjectHighlight[]>([
    {
      title: "Levington Project",
      location: "Nairobi, Kenya",
      completionDate: "November 2026",
      image: "/assets/projects/project_swimming_pool.jpg",
      description: "Full structural waterproofing and premium tile adhesive installation for luxury residences.",
      systemsUsed: ["Ultraguard 2K Cementitious Waterproofing", "Simba Grip 818 (White Powder)"],
    },
  ]);

  // Subheading 2: Our Storyline
  const [storylineHeadingTitle, setStorylineHeadingTitle] = useState("Our Storyline");
  const [storylines, setStorylines] = useState<string[]>([
    "Factory Capacity Expansion: Commissioned new automated dry-mortar blending line in Nairobi, ramping up Simba Grip and Ultraguard production capacity by 40%.",
    "Chemical R&D Milestones: Formulated enhanced polymers for C2 grade adhesives, offering zero vertical slip and extended open time for large porcelain slabs.",
    "Contractor Training Programs: Conducted on-site masterclass sessions for 120+ local tile applicators across Nairobi and Kiambu counties.",
  ]);

  const [uploadingPdf, setUploadingPdf] = useState<boolean>(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setAuthChecking(true);
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      if (data.authenticated) {
        setIsAuthenticated(true);
        fetchEditions();
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthChecking(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setUsername("");
        setPassword("");
        fetchEditions();
        showNotification("Welcome to Matshepo Admin Desk", "success");
      } else {
        setLoginError(data.message || "Invalid username or password");
      }
    } catch {
      setLoginError("Connection failed. Please check network.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      setIsAuthenticated(false);
      showNotification("You have been signed out.", "success");
    } catch {
      setIsAuthenticated(false);
    }
  };

  const fetchEditions = async () => {
    try {
      setLoadingPosts(true);
      const res = await fetch("/api/posts?all=true");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load editions:", err);
      showNotification("Failed to load editions", "error");
    } finally {
      setLoadingPosts(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const openCreateModal = () => {
    const now = new Date();
    const currentMonthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    setEditingPostId(null);
    setFormEditionName(`Building the Future – ${currentMonthYear} Edition`);
    setFormMonthYear(currentMonthYear);
    setFormPdfUrl("");
    setFormSummary("Monthly company updates, featured site executions, and construction chemical advancements from Matshepo Africa Ltd.");
    setFormImage("/assets/blog/blog_waterproofing.jpg");
    setProjHeadingTitle("Project Highlights");
    setHighlights([
      {
        title: "Levington Project",
        location: "Nairobi, Kenya",
        completionDate: currentMonthYear,
        image: "/assets/projects/project_swimming_pool.jpg",
        description: "Full structural waterproofing and premium tile adhesive installation for luxury residences.",
        systemsUsed: ["Ultraguard 2K Cementitious Waterproofing", "Simba Grip 818 (White Powder)"],
      },
    ]);
    setStorylineHeadingTitle("Our Storyline");
    setStorylines([
      "Factory progress & automated dry-mortar blending capacity updates in Nairobi.",
      "Product developments in C1/C2 grade tile adhesives and flexible waterproofing membranes.",
      "Contractor and builder technical workshops conducted across East Africa.",
    ]);
    setIsEditorOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormEditionName(post.title || `Building the Future – ${post.monthYear || "Monthly Edition"}`);
    setFormMonthYear(post.monthYear || "");
    setFormPdfUrl(post.pdfUrl || "");
    setFormSummary(post.summary || "");
    setFormImage(post.image || "/assets/blog/blog_waterproofing.jpg");
    setProjHeadingTitle(post.projectHighlightsTitle || "Project Highlights");
    setHighlights(
      post.projectHighlights && post.projectHighlights.length > 0
        ? post.projectHighlights
        : [
            {
              title: "Levington Project",
              location: "Nairobi, Kenya",
              completionDate: post.monthYear || "November 2026",
              image: "/assets/projects/project_swimming_pool.jpg",
              description: "Completed project works with photos and completion date.",
              systemsUsed: ["Ultraguard 2K", "Simba Grip 818"],
            },
          ]
    );
    setStorylineHeadingTitle(post.storylineTitle || "Our Storyline");
    setStorylines(
      post.storylineContent && post.storylineContent.length > 0
        ? post.storylineContent
        : [
            "Monthly company updates and factory developments.",
            "Technical product milestones and contractor workshops.",
          ]
    );
    setIsEditorOpen(true);
  };

  const handleFileUpload = async (file: File, type: "image" | "pdf", hIdx?: number) => {
    if (type === "pdf") setUploadingPdf(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", type);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && data.url) {
        if (type === "pdf") {
          setFormPdfUrl(data.url);
          showNotification("PDF edition uploaded successfully", "success");
        } else if (typeof hIdx === "number") {
          const updated = [...highlights];
          updated[hIdx].image = data.url;
          setHighlights(updated);
          showNotification("Project photo uploaded successfully", "success");
        }
      } else {
        showNotification(data.message || "Upload failed", "error");
      }
    } catch {
      showNotification("Upload request error", "error");
    } finally {
      if (type === "pdf") setUploadingPdf(false);
    }
  };

  const handleSaveEdition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEditionName.trim()) {
      showNotification("Please provide an edition title", "error");
      return;
    }

    try {
      setSavingPost(true);
      const now = new Date();
      const slug = formEditionName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const payload = {
        title: formEditionName,
        slug,
        category: "Monthly Newsletter",
        date: now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
        monthYear: formMonthYear || now.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        isNewsletter: true,
        newsletterEdition: formEditionName,
        pdfUrl: formPdfUrl,
        readTime: "4 min read",
        summary: formSummary,
        image: formImage,
        projectHighlightsTitle: projHeadingTitle,
        projectHighlights: highlights.filter((h) => h.title.trim().length > 0),
        storylineTitle: storylineHeadingTitle,
        storylineContent: storylines.filter((s) => s.trim().length > 0),
        author: {
          name: "Matshepo Editorial Team",
          role: "Technical & Management",
        },
        content: [
          {
            sectionHeading: projHeadingTitle,
            paragraphs: highlights.map((h) => `${h.title}: ${h.description} (Completed: ${h.completionDate || "N/A"})`),
          },
          {
            sectionHeading: storylineHeadingTitle,
            paragraphs: storylines,
          },
        ],
        keyTakeaways: storylines.slice(0, 3),
        status: "published",
        featured: true,
      };

      const url = editingPostId ? `/api/posts/${editingPostId}` : "/api/posts";
      const method = editingPostId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(
          editingPostId ? "Edition updated successfully!" : "Monthly Edition published successfully!",
          "success"
        );
        setIsEditorOpen(false);
        fetchEditions();
      } else {
        showNotification(data.message || "Failed to save edition", "error");
      }
    } catch {
      showNotification("Error communicating with server", "error");
    } finally {
      setSavingPost(false);
    }
  };

  const handleDeleteEdition = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Edition deleted successfully", "success");
        setDeleteConfirmId(null);
        fetchEditions();
      } else {
        showNotification(data.message || "Failed to delete edition", "error");
      }
    } catch {
      showNotification("Error communicating with server", "error");
    }
  };

  const filteredEditions = useMemo(() => {
    if (!searchFilter.trim()) return posts;
    const q = searchFilter.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        (p.monthYear && p.monthYear.toLowerCase().includes(q))
    );
  }, [posts, searchFilter]);

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#0875C9] animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Loading Admin Portal...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#073B69] to-[#0875C9] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7 text-[#FFC400]" />
            </div>
            <h1 className="text-2xl font-black text-[#073B69]">Admin Portal</h1>
            <p className="text-xs text-slate-500">
              Manage &ldquo;What’s New – Building the Future&rdquo; monthly editions.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="matshepo"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] focus:ring-2 focus:ring-blue-100 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="matshepo777"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] focus:ring-2 focus:ring-blue-100 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-yellow w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Admin Panel</span>
              )}
            </button>
          </form>

          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-[#0875C9] block">Credentials:</span>
            <p>Username: <code className="bg-white px-2 py-0.5 rounded text-slate-900 font-mono font-bold">matshepo</code></p>
            <p>Password: <code className="bg-white px-2 py-0.5 rounded text-slate-900 font-mono font-bold">matshepo777</code></p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[#0875C9] font-semibold transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] pb-24">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 animate-in slide-in-from-bottom-4 duration-200 ${
            notification.type === "success"
              ? "bg-[#073B69] text-white border-blue-400"
              : "bg-red-600 text-white border-red-500"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-[#FFC400]" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="container-custom py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#073B69] to-[#0875C9] text-white flex items-center justify-center font-black text-sm shadow-xs">
              M
            </div>
            <div>
              <h2 className="text-sm font-black text-[#073B69] leading-tight">
                Building the Future Editorial Desk
              </h2>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                What’s New Monthly Publisher
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>View Live What’s New</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container-custom mt-8 space-y-6">
        {/* Banner with Add Button */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#0875C9] tracking-wider block">
              Monthly Publishing Desk
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-[#073B69]">
              Building the Future – Monthly Edition
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Each month features customizable subheadings: Project Highlights (completed projects, photos &amp; dates) and Our Storyline (company updates &amp; milestones).
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="btn-yellow px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Monthly Edition</span>
          </button>
        </div>

        {/* Editions Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-200/80 flex items-center justify-between gap-4">
            <h3 className="text-sm font-black text-[#073B69]">
              Published Editions ({posts.length})
            </h3>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search editions..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] bg-slate-50"
              />
            </div>
          </div>

          {loadingPosts ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-6 h-6 text-[#0875C9] animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-bold">Loading monthly editions...</p>
            </div>
          ) : filteredEditions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F8FC] border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-5">Monthly Edition</th>
                    <th className="py-3 px-4">Subheading 1 (Projects)</th>
                    <th className="py-3 px-4">Subheading 2 (Storyline)</th>
                    <th className="py-3 px-4">Release Date</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEditions.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                            <Image
                              src={post.image || "/assets/blog/blog_waterproofing.jpg"}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-[#073B69] hover:text-[#0875C9] block">
                              {post.title}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {post.monthYear || post.date}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-600">
                        <span className="font-bold text-[#0875C9] block">
                          {post.projectHighlightsTitle || "Project Highlights"}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {post.projectHighlights?.length || 2} projects listed
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-600">
                        <span className="font-bold text-slate-800 block">
                          {post.storylineTitle || "Our Storyline"}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {post.storylineContent?.length || 3} updates
                        </span>
                      </td>

                      <td className="py-4 px-4 text-slate-600 whitespace-nowrap">
                        {post.date}
                      </td>

                      <td className="py-4 px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href="/blog"
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-[#0875C9] hover:bg-slate-100 rounded-lg transition-colors"
                            title="View on What’s New page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => openEditModal(post)}
                            className="p-1.5 text-slate-400 hover:text-[#073B69] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Edition"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {deleteConfirmId === post.id ? (
                            <div className="inline-flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                              <button
                                onClick={() => handleDeleteEdition(post.id)}
                                className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold cursor-pointer"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-0.5 text-slate-600 hover:text-slate-900 text-[10px] cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(post.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Edition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-slate-500">
              No editions found. Click &ldquo;Create New Monthly Edition&rdquo; to publish one.
            </div>
          )}
        </div>
      </main>

      {/* ================= MODAL: EDIT MONTHLY EDITION ================= */}
      {isEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-[#073B69] to-[#0875C9] text-white">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#FFC400] font-bold block">
                  {editingPostId ? "Edit Monthly Edition" : "Publish New Edition"}
                </span>
                <h3 className="text-lg font-black">
                  Building the Future – Monthly Edition
                </h3>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveEdition} className="p-6 sm:p-8 overflow-y-auto space-y-8 text-xs text-slate-700">
              {/* Row 1: Edition Title & Month */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">
                    Main Edition Heading / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formEditionName}
                    onChange={(e) => setFormEditionName(e.target.value)}
                    placeholder="e.g. Building the Future – November 2026 Edition"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">
                    Month &amp; Year Tag
                  </label>
                  <input
                    type="text"
                    value={formMonthYear}
                    onChange={(e) => setFormMonthYear(e.target.value)}
                    placeholder="e.g. November 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs"
                  />
                </div>
              </div>

              {/* PDF & Synopsis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">PDF Download URL (Optional)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formPdfUrl}
                      onChange={(e) => setFormPdfUrl(e.target.value)}
                      placeholder="https://... or upload PDF"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                    <label className="px-3 py-2 bg-[#073B69] hover:bg-[#0875C9] text-white rounded-xl text-[11px] font-bold cursor-pointer shrink-0 flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingPdf ? "..." : "Upload PDF"}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "pdf");
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Monthly Note / Summary</label>
                  <input
                    type="text"
                    value={formSummary}
                    onChange={(e) => setFormSummary(e.target.value)}
                    placeholder="Brief summary of this month's updates..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* ================= SECTION 1: SUBHEADING 1 CONFIG (PROJECT HIGHLIGHTS) ================= */}
              <div className="p-5 bg-blue-50/50 rounded-3xl border border-blue-200/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0875C9] block">
                      Subheading 1 (Can change each month)
                    </span>
                    <input
                      type="text"
                      value={projHeadingTitle}
                      onChange={(e) => setProjHeadingTitle(e.target.value)}
                      className="text-base font-black text-[#073B69] bg-white px-3 py-1 rounded-lg border border-blue-200"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setHighlights([
                        ...highlights,
                        {
                          title: "New Project",
                          location: "Nairobi, Kenya",
                          completionDate: formMonthYear || "November 2026",
                          image: "/assets/projects/project_swimming_pool.jpg",
                          description: "Completed project works, photos and completion date.",
                          systemsUsed: ["Ultraguard 2K"],
                        },
                      ])
                    }
                    className="text-xs font-bold text-[#0875C9] hover:underline"
                  >
                    + Add Another Completed Project
                  </button>
                </div>

                <div className="space-y-4">
                  {highlights.map((h, hIdx) => (
                    <div
                      key={hIdx}
                      className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-xs text-[#073B69]">
                          Project #{hIdx + 1}
                        </span>
                        {highlights.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setHighlights(highlights.filter((_, i) => i !== hIdx))}
                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-700 block mb-1">
                            Project Name (e.g. Levington Project)
                          </label>
                          <input
                            type="text"
                            value={h.title}
                            onChange={(e) => {
                              const updated = [...highlights];
                              updated[hIdx].title = e.target.value;
                              setHighlights(updated);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">
                            Completion Date (e.g. Nov 2026)
                          </label>
                          <input
                            type="text"
                            value={h.completionDate}
                            onChange={(e) => {
                              const updated = [...highlights];
                              updated[hIdx].completionDate = e.target.value;
                              setHighlights(updated);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-700 block mb-1">Location</label>
                          <input
                            type="text"
                            value={h.location}
                            onChange={(e) => {
                              const updated = [...highlights];
                              updated[hIdx].location = e.target.value;
                              setHighlights(updated);
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Project Description / Scope of Completed Works
                        </label>
                        <textarea
                          rows={2}
                          value={h.description}
                          onChange={(e) => {
                            const updated = [...highlights];
                            updated[hIdx].description = e.target.value;
                            setHighlights(updated);
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <Image src={h.image || "/assets/projects/project_swimming_pool.jpg"} alt="Project photo" fill className="object-cover" />
                        </div>
                        <input
                          type="text"
                          value={h.image}
                          onChange={(e) => {
                            const updated = [...highlights];
                            updated[hIdx].image = e.target.value;
                            setHighlights(updated);
                          }}
                          placeholder="/assets/projects/..."
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        />
                        <label className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold cursor-pointer shrink-0">
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "image", hIdx);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ================= SECTION 2: SUBHEADING 2 CONFIG (OUR STORYLINE) ================= */}
              <div className="p-5 bg-amber-50/50 rounded-3xl border border-amber-200/70 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                      Subheading 2 (Can change each month)
                    </span>
                    <input
                      type="text"
                      value={storylineHeadingTitle}
                      onChange={(e) => setStorylineHeadingTitle(e.target.value)}
                      className="text-base font-black text-amber-950 bg-white px-3 py-1 rounded-lg border border-amber-200"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setStorylines([...storylines, ""])}
                    className="text-xs font-bold text-amber-800 hover:underline"
                  >
                    + Add Another Milestone / Update
                  </button>
                </div>

                <div className="space-y-3">
                  {storylines.map((st, sIdx) => (
                    <div key={sIdx} className="flex gap-2">
                      <textarea
                        rows={2}
                        value={st}
                        onChange={(e) => {
                          const updated = [...storylines];
                          updated[sIdx] = e.target.value;
                          setStorylines(updated);
                        }}
                        placeholder="e.g. Factory progress, new dry-mortar line, product developments..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                      {storylines.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setStorylines(storylines.filter((_, i) => i !== sIdx))}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Controls */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPost}
                  className="btn-yellow px-6 py-2.5 rounded-xl font-black flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  {savingPost ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Publishing Edition...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingPostId ? "Update Monthly Edition" : "Publish Monthly Edition"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
