"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, BlogContentSection } from "@/lib/types";
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
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Search,
  LogOut,
  RefreshCw,
  FileText,
  Check,
  Building,
} from "lucide-react";

export const AdminClient: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // Dashboard State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [savingPost, setSavingPost] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formContentType, setFormContentType] = useState<"newsletter" | "article" | "company">("newsletter");
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formCategory, setFormCategory] = useState("Monthly Newsletter");
  const [formDate, setFormDate] = useState("");
  const [formMonthYear, setFormMonthYear] = useState("");
  const [formEdition, setFormEdition] = useState("");
  const [formPdfUrl, setFormPdfUrl] = useState("");
  const [formReadTime, setFormReadTime] = useState("5 min read");
  const [formSummary, setFormSummary] = useState("");
  const [formImage, setFormImage] = useState("/assets/blog/blog_waterproofing.jpg");
  const [formAuthorName, setFormAuthorName] = useState("Matshepo Editorial Team");
  const [formAuthorRole, setFormAuthorRole] = useState("Technical & Quality Division");
  const [formTakeaways, setFormTakeaways] = useState<string[]>([""]);
  const [formSections, setFormSections] = useState<BlogContentSection[]>([
    { sectionHeading: "Introduction", paragraphs: [""] },
  ]);
  const [formStatus, setFormStatus] = useState<"published" | "draft">("published");
  const [formFeatured, setFormFeatured] = useState<boolean>(false);
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [uploadingPdf, setUploadingPdf] = useState<boolean>(false);

  // Check auth status on mount
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
        fetchPosts();
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
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setPassword("");
        fetchPosts();
        showNotification("Welcome to Matshepo Editorial Platform", "success");
      } else {
        setLoginError(data.message || "Invalid password");
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

  const fetchPosts = async () => {
    try {
      setLoadingPosts(true);
      const res = await fetch("/api/posts?all=true");
      const data = await res.json();
      if (data.success && Array.isArray(data.posts)) {
        setPosts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load posts:", err);
      showNotification("Failed to load publications", "error");
    } finally {
      setLoadingPosts(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper to open create modal
  const openCreateModal = (type: "newsletter" | "article" | "company" = "newsletter") => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const currentMonthYear = now.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    setEditingPostId(null);
    setFormContentType(type);
    setFormTitle(
      type === "newsletter"
        ? `Matshepo Monthly Newsletter — ${currentMonthYear} Edition`
        : ""
    );
    setFormSlug("");
    setFormCategory(
      type === "newsletter"
        ? "Monthly Newsletter"
        : type === "company"
        ? "Company News"
        : "Tile Adhesives"
    );
    setFormDate(formattedDate);
    setFormMonthYear(currentMonthYear);
    setFormEdition(
      type === "newsletter" ? `Issue — ${currentMonthYear}` : ""
    );
    setFormPdfUrl("");
    setFormReadTime("5 min read");
    setFormSummary("");
    setFormImage(
      type === "newsletter"
        ? "/assets/blog/blog_waterproofing.jpg"
        : "/assets/blog/blog_tile_adhesive.jpg"
    );
    setFormAuthorName("Matshepo Editorial Team");
    setFormAuthorRole("Technical & Quality Division");
    setFormTakeaways([""]);
    setFormSections([
      { sectionHeading: "Director's Note & Monthly Highlights", paragraphs: [""] },
      { sectionHeading: "Technical Guidance & Site Practices", paragraphs: [""] },
    ]);
    setFormStatus("published");
    setFormFeatured(type === "newsletter");
    setIsEditorOpen(true);
  };

  // Helper to open edit modal
  const openEditModal = (post: BlogPost) => {
    setEditingPostId(post.id);
    const isNl = post.isNewsletter || post.category === "Monthly Newsletter";
    setFormContentType(isNl ? "newsletter" : post.category === "Company News" ? "company" : "article");
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormDate(post.date);
    setFormMonthYear(post.monthYear || "");
    setFormEdition(post.newsletterEdition || "");
    setFormPdfUrl(post.pdfUrl || "");
    setFormReadTime(post.readTime || "5 min read");
    setFormSummary(post.summary);
    setFormImage(post.image);
    setFormAuthorName(post.author?.name || "Matshepo Editorial Team");
    setFormAuthorRole(post.author?.role || "Technical & Quality Division");
    setFormTakeaways(post.keyTakeaways?.length ? [...post.keyTakeaways] : [""]);
    setFormSections(
      post.content?.length
        ? post.content.map((s) => ({
            sectionHeading: s.sectionHeading || "",
            paragraphs: [...s.paragraphs],
          }))
        : [{ sectionHeading: "Overview", paragraphs: [""] }]
    );
    setFormStatus(post.status || "published");
    setFormFeatured(post.featured || false);
    setIsEditorOpen(true);
  };

  // Handle image upload from computer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadingImage(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormImage(data.url);
        showNotification("File uploaded successfully!", "success");
      } else {
        showNotification(data.message || "Upload failed", "error");
      }
    } catch {
      showNotification("Upload request failed", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // Handle PDF upload from computer
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploadingPdf(true);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormPdfUrl(data.url);
        showNotification("Newsletter PDF uploaded successfully!", "success");
      } else {
        showNotification(data.message || "PDF upload failed", "error");
      }
    } catch {
      showNotification("PDF upload request failed", "error");
    } finally {
      setUploadingPdf(false);
    }
  };

  // Save Post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showNotification("Please enter a title", "error");
      return;
    }
    if (!formSummary.trim()) {
      showNotification("Please enter a summary / excerpt", "error");
      return;
    }

    setSavingPost(true);

    const isNewsletter = formContentType === "newsletter" || formCategory === "Monthly Newsletter";

    // Clean takeaways & sections
    const cleanTakeaways = formTakeaways.filter((t) => t.trim().length > 0);
    const cleanSections = formSections
      .map((s) => ({
        sectionHeading: s.sectionHeading?.trim(),
        paragraphs: s.paragraphs.filter((p) => p.trim().length > 0),
      }))
      .filter((s) => s.paragraphs.length > 0);

    const postPayload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || undefined,
      category: formCategory,
      date: formDate.trim() || new Date().toLocaleDateString(),
      monthYear: formMonthYear.trim() || undefined,
      isNewsletter,
      newsletterEdition: isNewsletter ? formEdition.trim() || `${formMonthYear} Edition` : undefined,
      pdfUrl: formPdfUrl.trim() || undefined,
      readTime: formReadTime.trim() || "5 min read",
      summary: formSummary.trim(),
      image: formImage.trim() || "/assets/blog/blog_tile_adhesive.jpg",
      author: {
        name: formAuthorName.trim() || "Matshepo Editorial Team",
        role: formAuthorRole.trim() || "Technical & Quality Division",
      },
      keyTakeaways: cleanTakeaways,
      content: cleanSections.length > 0 ? cleanSections : [{ sectionHeading: "Overview", paragraphs: [formSummary] }],
      status: formStatus,
      featured: formFeatured,
    };

    try {
      let res;
      if (editingPostId) {
        res = await fetch(`/api/posts/${editingPostId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postPayload),
        });
      } else {
        res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postPayload),
        });
      }

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(
          editingPostId ? "Publication updated successfully!" : "New publication created successfully!",
          "success"
        );
        setIsEditorOpen(false);
        fetchPosts();
      } else {
        showNotification(data.message || "Failed to save post", "error");
      }
    } catch {
      showNotification("Error saving publication", "error");
    } finally {
      setSavingPost(false);
    }
  };

  // Delete Post
  const handleDeletePost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Publication deleted successfully", "success");
        setDeleteConfirmId(null);
        fetchPosts();
      } else {
        showNotification(data.message || "Failed to delete post", "error");
      }
    } catch {
      showNotification("Error communicating with server", "error");
    }
  };

  // Filtered list in Admin Table
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (selectedTab === "newsletters" && !(p.isNewsletter || p.category === "Monthly Newsletter")) {
        return false;
      }
      if (selectedTab === "drafts" && p.status !== "draft") {
        return false;
      }
      if (selectedTab === "articles" && (p.isNewsletter || p.category === "Monthly Newsletter")) {
        return false;
      }

      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.monthYear && p.monthYear.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [posts, selectedTab, searchFilter]);

  // Stats calculation
  const totalNewsletters = useMemo(() => {
    return posts.filter((p) => p.isNewsletter || p.category === "Monthly Newsletter").length;
  }, [posts]);

  const totalDrafts = useMemo(() => {
    return posts.filter((p) => p.status === "draft").length;
  }, [posts]);

  // Loading Screen while verifying auth
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#0875C9] animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Loading Matshepo Editorial Platform...
          </p>
        </div>
      </div>
    );
  }

  // Login Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#073B69] to-[#0875C9] text-white rounded-2xl flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-black text-[#073B69] tracking-tight">
              Matshepo Africa Ltd
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Company Editorial &amp; Content Publishing Platform
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Administrator Access Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator passkey..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0875C9]/20 focus:border-[#0875C9] bg-slate-50/50 pr-10"
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

            <button
              type="submit"
              disabled={loginLoading}
              className="btn-yellow w-full py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Access Publishing Desk</span>
              )}
            </button>
          </form>

          {/* Quick Password Hint Box */}
          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-[#0875C9] block">
              Default System Credentials:
            </span>
            <p>
              Passkey: <code className="bg-white px-2 py-0.5 rounded text-slate-900 font-mono font-bold">matshepo@admin2026</code>
            </p>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/blog"
              className="text-xs text-slate-500 hover:text-[#0875C9] font-semibold transition-colors"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
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
                Matshepo Content Studio
              </h2>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                Company Publishing Desk
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>View Live Blog</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container-custom mt-8 space-y-8">
        {/* Welcome & Action Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase text-[#0875C9] tracking-wider block">
              Content Management Platform
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#073B69] tracking-tight">
              Publish Monthly Newsletters &amp; Insights
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Create, edit, and operate your company publications, newsletter editions, and technical bulletins in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => openCreateModal("newsletter")}
              className="btn-yellow px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Newspaper className="w-4 h-4" />
              <span>+ New Monthly Newsletter</span>
            </button>
            <button
              onClick={() => openCreateModal("article")}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-[#073B69] hover:bg-[#0875C9] text-white flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ New Technical Guide</span>
            </button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Total Publications</span>
            <span className="text-2xl sm:text-3xl font-black text-[#073B69] mt-1 block">
              {posts.length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Monthly Newsletters</span>
              <Newspaper className="w-4 h-4 text-amber-500" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 block">
              {totalNewsletters}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase block">Guides &amp; Bulletins</span>
              <BookOpen className="w-4 h-4 text-[#0875C9]" />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-[#0875C9] mt-1 block">
              {posts.length - totalNewsletters}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Drafts</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-600 mt-1 block">
              {totalDrafts}
            </span>
          </div>
        </div>

        {/* Content Table & Controls */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* Table Header Filter Toolbar */}
          <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {[
                { id: "all", label: "All Content" },
                { id: "newsletters", label: `Newsletters (${totalNewsletters})` },
                { id: "articles", label: "Technical Guides" },
                { id: "drafts", label: `Drafts (${totalDrafts})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                    selectedTab === tab.id
                      ? "bg-[#073B69] text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search publications..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] bg-slate-50"
              />
            </div>
          </div>

          {/* Posts Table */}
          {loadingPosts ? (
            <div className="p-12 text-center">
              <RefreshCw className="w-6 h-6 text-[#0875C9] animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-500 font-bold">Loading publications...</p>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F8FC] border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-bold">
                  <tr>
                    <th className="py-3 px-5">Publication</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Issue / Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPosts.map((post) => {
                    const isNl = post.isNewsletter || post.category === "Monthly Newsletter";
                    return (
                      <tr key={post.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                              <Image
                                src={post.image || "/assets/blog/blog_tile_adhesive.jpg"}
                                alt={post.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="max-w-md">
                              <span className="font-bold text-[#073B69] hover:text-[#0875C9] transition-colors line-clamp-1 block">
                                {post.title}
                              </span>
                              <span className="text-[11px] text-slate-400 line-clamp-1">
                                {post.summary}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          {isNl ? (
                            <span className="bg-amber-50 text-amber-800 border border-amber-200 font-bold px-2.5 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                              <Newspaper className="w-3 h-3 text-amber-600" />
                              <span>Monthly Newsletter</span>
                            </span>
                          ) : (
                            <span className="bg-blue-50 text-[#0875C9] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                              {post.category}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap text-slate-600 font-medium">
                          <div>
                            {post.monthYear || post.date}
                          </div>
                          {post.newsletterEdition && (
                            <span className="text-[10px] text-slate-400 block">
                              {post.newsletterEdition}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              post.status === "draft"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            }`}
                          >
                            {post.status === "draft" ? "Draft" : "Published"}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              title="View on site"
                              className="p-1.5 text-slate-400 hover:text-[#0875C9] rounded-lg hover:bg-blue-50 transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>

                            <button
                              onClick={() => openEditModal(post)}
                              title="Edit post"
                              className="p-1.5 text-slate-600 hover:text-[#073B69] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => setDeleteConfirmId(post.id)}
                              title="Delete post"
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700">No publications found</h4>
              <p className="text-xs text-slate-500">
                Click &ldquo;+ New Monthly Newsletter&rdquo; or &ldquo;+ New Technical Guide&rdquo; to create your first company post.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black text-[#073B69]">
                Delete Publication?
              </h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently remove this publication? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="w-1/2 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePost(deleteConfirmId)}
                className="w-1/2 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publication Editor Drawer / Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between bg-[#F5F8FC]">
              <div>
                <h3 className="text-base font-black text-[#073B69]">
                  {editingPostId ? "Edit Publication" : "Create New Publication"}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {formContentType === "newsletter"
                    ? "Monthly Newsletter Edition"
                    : "Technical Insight / Company Announcement"}
                </span>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSavePost} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Type Switcher */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Publication Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "newsletter", label: "Monthly Newsletter", icon: Newspaper },
                    { id: "article", label: "Technical Guide", icon: BookOpen },
                    { id: "company", label: "Company News", icon: Building },
                  ].map((t) => {
                    const Icon = t.icon;
                    const isSelected = formContentType === t.id;
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => {
                          setFormContentType(t.id as any);
                          if (t.id === "newsletter") {
                            setFormCategory("Monthly Newsletter");
                          } else if (t.id === "company") {
                            setFormCategory("Company News");
                          } else {
                            setFormCategory("Tile Adhesives");
                          }
                        }}
                        className={`p-3 rounded-xl border text-left flex items-center gap-2 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-blue-50 border-[#0875C9] text-[#073B69] font-bold"
                            : "border-slate-200 hover:bg-slate-50 text-slate-600 font-medium"
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? "text-[#0875C9]" : "text-slate-400"}`} />
                        <span>{t.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title & Slug */}
              <div className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Publication Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Matshepo Monthly Newsletter — November 2026 Edition"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#0875C9]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      URL Slug (Auto-generated if empty)
                    </label>
                    <input
                      type="text"
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="e.g. matshepo-monthly-newsletter-november-2026"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:border-[#0875C9]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Category *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none focus:border-[#0875C9]"
                    >
                      <option value="Monthly Newsletter">Monthly Newsletter</option>
                      <option value="Company News">Company News</option>
                      <option value="Tile Adhesives">Tile Adhesives</option>
                      <option value="Waterproofing">Waterproofing</option>
                      <option value="Flooring">Flooring</option>
                      <option value="Construction Tips">Construction Tips</option>
                      <option value="Product Education">Product Education</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Newsletter Specific Details */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-3">
                <span className="font-black text-amber-900 uppercase tracking-wider text-[11px] block">
                  Edition &amp; Issue Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Month &amp; Year
                    </label>
                    <input
                      type="text"
                      value={formMonthYear}
                      onChange={(e) => setFormMonthYear(e.target.value)}
                      placeholder="e.g. November 2026"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#0875C9]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Issue / Volume Tag
                    </label>
                    <input
                      type="text"
                      value={formEdition}
                      onChange={(e) => setFormEdition(e.target.value)}
                      placeholder="e.g. Volume 1 • Issue 11"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#0875C9]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Publication Date
                    </label>
                    <input
                      type="text"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      placeholder="e.g. Nov 01, 2026"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white focus:outline-none focus:border-[#0875C9]"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Image Upload / Selection */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">
                  Cover / Featured Image
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-4 relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                    {formImage ? (
                      <Image
                        src={formImage}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-8 space-y-2">
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="Enter image URL or select below..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9]"
                    />

                    {/* File Upload Button */}
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#0875C9] font-bold border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer inline-flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? "Uploading..." : "Upload Image from PC"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={uploadingImage}
                          className="hidden"
                        />
                      </label>
                      <span className="text-[11px] text-slate-400">PNG, JPG, WebP</span>
                    </div>

                    {/* Quick Image Presets */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Presets:</span>
                      {[
                        { label: "Waterproofing", url: "/assets/blog/blog_waterproofing.jpg" },
                        { label: "Tile Adhesive", url: "/assets/blog/blog_tile_adhesive.jpg" },
                        { label: "Landmark Construction", url: "/assets/blog/blog_landmark_construction.jpg" },
                      ].map((p) => (
                        <button
                          type="button"
                          key={p.label}
                          onClick={() => setFormImage(p.url)}
                          className="text-[10px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary / Excerpt */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Summary / Excerpt (Lead Paragraph) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="A concise synopsis of this newsletter or article to engage readers..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0875C9]"
                />
              </div>

              {/* Author and Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formAuthorName}
                    onChange={(e) => setFormAuthorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Author Role / Dept</label>
                  <input
                    type="text"
                    value={formAuthorRole}
                    onChange={(e) => setFormAuthorRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Read Time</label>
                  <input
                    type="text"
                    value={formReadTime}
                    onChange={(e) => setFormReadTime(e.target.value)}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9]"
                  />
                </div>
              </div>

              {/* Downloadable Newsletter PDF (Optional) */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 block">
                  Newsletter PDF Document (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={formPdfUrl}
                    onChange={(e) => setFormPdfUrl(e.target.value)}
                    placeholder="Enter PDF URL or upload file directly from your computer..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9]"
                  />
                  <label className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 cursor-pointer inline-flex items-center gap-1.5 shrink-0 transition-colors">
                    <Upload className="w-3.5 h-3.5 text-[#0875C9]" />
                    <span>{uploadingPdf ? "Uploading..." : "Upload PDF"}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Executive Takeaways */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Executive Takeaways &amp; Bulletins
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormTakeaways([...formTakeaways, ""])}
                    className="text-[#0875C9] font-bold text-[11px] hover:underline cursor-pointer"
                  >
                    + Add Takeaway
                  </button>
                </div>
                {formTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={point}
                      onChange={(e) => {
                        const updated = [...formTakeaways];
                        updated[idx] = e.target.value;
                        setFormTakeaways(updated);
                      }}
                      placeholder={`Takeaway bullet #${idx + 1}`}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#0875C9]"
                    />
                    {formTakeaways.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formTakeaways.filter((_, i) => i !== idx);
                          setFormTakeaways(updated);
                        }}
                        className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Content Sections Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                  <label className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Content Sections &amp; Paragraphs
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormSections([
                        ...formSections,
                        { sectionHeading: "", paragraphs: [""] },
                      ])
                    }
                    className="btn-yellow px-3 py-1 rounded-lg text-[11px] font-black cursor-pointer shadow-2xs"
                  >
                    + Add New Section
                  </button>
                </div>

                {formSections.map((sec, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#073B69] text-xs">
                        Section #{sIdx + 1}
                      </span>
                      {formSections.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formSections.filter((_, i) => i !== sIdx);
                            setFormSections(updated);
                          }}
                          className="text-xs text-red-500 hover:underline cursor-pointer"
                        >
                          Remove Section
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={sec.sectionHeading || ""}
                        onChange={(e) => {
                          const updated = [...formSections];
                          updated[sIdx].sectionHeading = e.target.value;
                          setFormSections(updated);
                        }}
                        placeholder="e.g. 1. Monsoon-Ready Waterproofing Protocols"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#0875C9]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-slate-600 block">
                        Paragraphs
                      </label>
                      {sec.paragraphs.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2">
                          <textarea
                            rows={3}
                            value={p}
                            onChange={(e) => {
                              const updated = [...formSections];
                              updated[sIdx].paragraphs[pIdx] = e.target.value;
                              setFormSections(updated);
                            }}
                            placeholder={`Paragraph #${pIdx + 1}...`}
                            className="flex-1 px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs focus:outline-none focus:border-[#0875C9]"
                          />
                          {sec.paragraphs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...formSections];
                                updated[sIdx].paragraphs = updated[sIdx].paragraphs.filter(
                                  (_, i) => i !== pIdx
                                );
                                setFormSections(updated);
                              }}
                              className="p-1 text-slate-400 hover:text-red-500 mt-2 cursor-pointer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...formSections];
                          updated[sIdx].paragraphs.push("");
                          setFormSections(updated);
                        }}
                        className="text-[11px] font-bold text-[#0875C9] hover:underline cursor-pointer block pt-1"
                      >
                        + Add Another Paragraph to This Section
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status & Featured Controls */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Publishing Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-bold text-xs"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Save as Draft</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 mt-4 cursor-pointer font-bold text-slate-700">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="w-4 h-4 text-[#0875C9] rounded"
                    />
                    <span>Highlight as Featured Spotlight</span>
                  </label>
                </div>
              </div>

              {/* Save Footer Controls */}
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
                      <span>Saving to System...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingPostId ? "Update Publication" : "Publish to Insights"}</span>
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

