"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost, BlogContentSection, ProjectItem } from "@/lib/types";
import { projectCategories } from "@/data/projects";
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
  Briefcase,
  MapPin,
  Layers,
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

  // Top Section Switch: 'posts' or 'projects'
  const [activeSection, setActiveSection] = useState<"posts" | "projects">("posts");

  // Posts State
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
  const [selectedPostTab, setSelectedPostTab] = useState<string>("all");
  const [postSearchFilter, setPostSearchFilter] = useState<string>("");

  // Projects State
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState<boolean>(false);
  const [selectedProjectTab, setSelectedProjectTab] = useState<string>("All Projects");
  const [projectSearchFilter, setProjectSearchFilter] = useState<string>("");

  // Notification State
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Post Editor Modal State
  const [isPostEditorOpen, setIsPostEditorOpen] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [savingPost, setSavingPost] = useState<boolean>(false);
  const [deleteConfirmPostId, setDeleteConfirmPostId] = useState<string | null>(null);

  // Post Form Fields
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

  // Project Editor Modal State
  const [isProjectEditorOpen, setIsProjectEditorOpen] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [savingProject, setSavingProject] = useState<boolean>(false);
  const [deleteConfirmProjectId, setDeleteConfirmProjectId] = useState<string | null>(null);
  const [uploadingProjectImage, setUploadingProjectImage] = useState<boolean>(false);

  // Project Form Fields
  const [projName, setProjName] = useState("");
  const [projLocation, setProjLocation] = useState("Nairobi, Kenya");
  const [projCategory, setProjCategory] = useState<string>("Swimming Pools");
  const [projDescription, setProjDescription] = useState("");
  const [projFullDetails, setProjFullDetails] = useState("");
  const [projImage, setProjImage] = useState("/assets/projects/project_swimming_pool.jpg");
  const [projSystems, setProjSystems] = useState<string[]>(["Ultraguard 2K Cementitious Waterproofing"]);
  const [projScope, setProjScope] = useState("");
  const [projClient, setProjClient] = useState("");
  const [projYear, setProjYear] = useState("2026");
  const [projStatus, setProjStatus] = useState<"published" | "draft">("published");
  const [projFeatured, setProjFeatured] = useState<boolean>(false);

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
        fetchProjects();
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
        fetchPosts();
        fetchProjects();
        showNotification("Welcome to Matshepo Admin Panel", "success");
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

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const res = await fetch("/api/projects?all=true");
      const data = await res.json();
      if (data.success && Array.isArray(data.projects)) {
        setProjects(data.projects);
      }
    } catch (err) {
      console.error("Failed to load projects:", err);
      showNotification("Failed to load projects", "error");
    } finally {
      setLoadingProjects(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Helper to open create post modal
  const openCreatePostModal = (type: "newsletter" | "article" | "company" = "newsletter") => {
    const now = new Date();
    const currentMonthYear = now.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

    setEditingPostId(null);
    setFormContentType(type);
    setFormDate(formattedDate);
    setFormMonthYear(currentMonthYear);
    setFormStatus("published");
    setFormFeatured(false);
    setFormPdfUrl("");

    if (type === "newsletter") {
      setFormCategory("Monthly Newsletter");
      setFormTitle(`Matshepo Monthly Newsletter — ${currentMonthYear}`);
      setFormSlug(`matshepo-monthly-newsletter-${now.toLocaleString("en-US", { month: "short" }).toLowerCase()}-${now.getFullYear()}`);
      setFormEdition(`Issue #${posts.filter((p) => p.isNewsletter).length + 1} — ${currentMonthYear}`);
      setFormSummary("Technical updates, on-site project case studies, and construction chemical best practices from the Matshepo Africa team.");
      setFormImage("/assets/blog/blog_waterproofing.jpg");
      setFormTakeaways([
        "Key chemical formulation milestones and project highlights",
        "Quality application procedures for zero-failure waterproofing",
        "New contractor training and product distribution centers across Kenya",
      ]);
      setFormSections([
        {
          sectionHeading: "Executive Director's Note",
          paragraphs: [
            "Welcome to this month's official edition of the Matshepo Africa newsletter. In this publication, we showcase our latest site executions and technical breakthroughs in tile adhesives and dual-component waterproofing across East Africa.",
          ],
        },
        {
          sectionHeading: "Featured Project Showcase",
          paragraphs: [
            "Our engineering field team recently completed waterproofing works for high-load commercial facilities using Ultraguard 2K and Simba Grip 818 adhesive.",
          ],
        },
      ]);
    } else {
      setFormCategory("Tile Adhesives");
      setFormTitle("");
      setFormSlug("");
      setFormEdition("");
      setFormSummary("");
      setFormImage("/assets/blog/blog_tile_adhesive.jpg");
      setFormTakeaways([""]);
      setFormSections([{ sectionHeading: "Introduction", paragraphs: [""] }]);
    }

    setIsPostEditorOpen(true);
  };

  // Helper to open edit post modal
  const openEditPostModal = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormDate(post.date);
    setFormMonthYear(post.monthYear || "");
    setFormEdition(post.newsletterEdition || "");
    setFormPdfUrl(post.pdfUrl || "");
    setFormReadTime(post.readTime || "5 min read");
    setFormSummary(post.summary);
    setFormImage(post.image || "/assets/blog/blog_tile_adhesive.jpg");
    setFormAuthorName(post.author?.name || "Matshepo Editorial Team");
    setFormAuthorRole(post.author?.role || "Technical & Quality Division");
    setFormTakeaways(post.keyTakeaways && post.keyTakeaways.length > 0 ? post.keyTakeaways : [""]);
    setFormSections(
      post.content && post.content.length > 0
        ? post.content
        : [{ sectionHeading: "Introduction", paragraphs: [""] }]
    );
    setFormStatus(post.status || "published");
    setFormFeatured(post.featured || false);
    setFormContentType(post.isNewsletter || post.category === "Monthly Newsletter" ? "newsletter" : "article");
    setIsPostEditorOpen(true);
  };

  // Open Project Modal for Create
  const openCreateProjectModal = () => {
    setEditingProjectId(null);
    setProjName("");
    setProjLocation("Nairobi, Kenya");
    setProjCategory("Swimming Pools");
    setProjDescription("");
    setProjFullDetails("");
    setProjImage("/assets/projects/project_swimming_pool.jpg");
    setProjSystems(["Ultraguard 2K Cementitious Waterproofing"]);
    setProjScope("");
    setProjClient("");
    setProjYear(new Date().getFullYear().toString());
    setProjStatus("published");
    setProjFeatured(false);
    setIsProjectEditorOpen(true);
  };

  // Open Project Modal for Edit
  const openEditProjectModal = (proj: ProjectItem) => {
    setEditingProjectId(proj.id);
    setProjName(proj.name);
    setProjLocation(proj.location || "Nairobi, Kenya");
    setProjCategory(proj.category || "Swimming Pools");
    setProjDescription(proj.description || "");
    setProjFullDetails(proj.fullDetails || proj.description || "");
    setProjImage(proj.image || "/assets/projects/project_swimming_pool.jpg");
    setProjSystems(proj.systemsUsed && proj.systemsUsed.length > 0 ? proj.systemsUsed : [""]);
    setProjScope(proj.scope || "");
    setProjClient(proj.client || "");
    setProjYear(proj.completionYear || new Date().getFullYear().toString());
    setProjStatus(proj.status || "published");
    setProjFeatured(proj.featured || false);
    setIsProjectEditorOpen(true);
  };

  // File Upload Handlers
  const handleFileUpload = async (file: File, type: "image" | "pdf", target: "post" | "project") => {
    if (type === "image") {
      if (target === "post") setUploadingImage(true);
      else setUploadingProjectImage(true);
    } else {
      setUploadingPdf(true);
    }

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
        if (target === "post") {
          if (type === "image") {
            setFormImage(data.url);
            showNotification("Post cover uploaded successfully", "success");
          } else {
            setFormPdfUrl(data.url);
            showNotification("PDF newsletter document uploaded", "success");
          }
        } else {
          setProjImage(data.url);
          showNotification("Project photo uploaded successfully", "success");
        }
      } else {
        showNotification(data.message || "Upload failed", "error");
      }
    } catch {
      showNotification("Upload request error", "error");
    } finally {
      if (type === "image") {
        if (target === "post") setUploadingImage(false);
        else setUploadingProjectImage(false);
      } else {
        setUploadingPdf(false);
      }
    }
  };

  // Save Post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showNotification("Please provide a title", "error");
      return;
    }

    try {
      setSavingPost(true);
      const isNewsletter = formContentType === "newsletter" || formCategory === "Monthly Newsletter";

      const payload = {
        title: formTitle,
        slug: formSlug,
        category: formCategory,
        date: formDate,
        monthYear: formMonthYear,
        isNewsletter,
        newsletterEdition: formEdition,
        pdfUrl: formPdfUrl,
        readTime: formReadTime,
        summary: formSummary,
        image: formImage,
        author: {
          name: formAuthorName,
          role: formAuthorRole,
        },
        content: formSections.filter((s) => s.paragraphs.some((p) => p.trim().length > 0)),
        keyTakeaways: formTakeaways.filter((t) => t.trim().length > 0),
        status: formStatus,
        featured: formFeatured,
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
          editingPostId ? "Post updated successfully!" : "Post published successfully!",
          "success"
        );
        setIsPostEditorOpen(false);
        fetchPosts();
      } else {
        showNotification(data.message || "Failed to save post", "error");
      }
    } catch {
      showNotification("Error communicating with server", "error");
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
        setDeleteConfirmPostId(null);
        fetchPosts();
      } else {
        showNotification(data.message || "Failed to delete post", "error");
      }
    } catch {
      showNotification("Error communicating with server", "error");
    }
  };

  // Save Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) {
      showNotification("Please provide a project name", "error");
      return;
    }
    if (!projDescription.trim()) {
      showNotification("Please provide a short description", "error");
      return;
    }

    try {
      setSavingProject(true);
      const payload = {
        name: projName,
        location: projLocation,
        category: projCategory,
        description: projDescription,
        fullDetails: projFullDetails || projDescription,
        image: projImage,
        systemsUsed: projSystems.filter((s) => s.trim().length > 0),
        scope: projScope,
        client: projClient,
        completionYear: projYear,
        featured: projFeatured,
        status: projStatus,
      };

      const url = editingProjectId ? `/api/projects/${editingProjectId}` : "/api/projects";
      const method = editingProjectId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showNotification(
          editingProjectId ? "Project updated successfully!" : "Project published successfully!",
          "success"
        );
        setIsProjectEditorOpen(false);
        fetchProjects();
      } else {
        showNotification(data.message || "Failed to save project", "error");
      }
    } catch {
      showNotification("Error communicating with server", "error");
    } finally {
      setSavingProject(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        showNotification("Project deleted successfully", "success");
        setDeleteConfirmProjectId(null);
        fetchProjects();
      } else {
        showNotification(data.message || "Failed to delete project", "error");
      }
    } catch {
      showNotification("Error communicating with server", "error");
    }
  };

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (selectedPostTab === "newsletters" && !(p.isNewsletter || p.category === "Monthly Newsletter")) {
        return false;
      }
      if (selectedPostTab === "drafts" && p.status !== "draft") {
        return false;
      }
      if (selectedPostTab === "articles" && (p.isNewsletter || p.category === "Monthly Newsletter")) {
        return false;
      }

      if (postSearchFilter) {
        const q = postSearchFilter.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.monthYear && p.monthYear.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [posts, selectedPostTab, postSearchFilter]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedProjectTab !== "All Projects" && p.category !== selectedProjectTab) {
        return false;
      }
      if (projectSearchFilter) {
        const q = projectSearchFilter.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.scope.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, selectedProjectTab, projectSearchFilter]);

  // Stats
  const totalNewsletters = useMemo(
    () => posts.filter((p) => p.isNewsletter || p.category === "Monthly Newsletter").length,
    [posts]
  );
  const totalDrafts = useMemo(() => posts.filter((p) => p.status === "draft").length, [posts]);

  // Loading Screen while verifying auth
  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-[#0875C9] animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Loading Matshepo Admin Platform...
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
              <Lock className="w-7 h-7 text-[#FFC400]" />
            </div>
            <h1 className="text-2xl font-black text-[#073B69]">Admin Portal</h1>
            <p className="text-xs text-slate-500">
              Sign in to manage blog articles, monthly newsletters, and company portfolio projects.
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
                placeholder="Enter admin username..."
                required
                autoComplete="username"
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
                  placeholder="Enter administrator password..."
                  required
                  autoComplete="current-password"
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

          {/* Quick Password Hint Box */}
          <div className="p-3.5 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-[#0875C9] block">
              Default Credentials:
            </span>
            <p>
              Username: <code className="bg-white px-2 py-0.5 rounded text-slate-900 font-mono font-bold">matshepo</code>
            </p>
            <p>
              Password: <code className="bg-white px-2 py-0.5 rounded text-slate-900 font-mono font-bold">matshepo777</code>
            </p>
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
                Company Admin &amp; Content Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={activeSection === "posts" ? "/blog" : "/projects"}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>{activeSection === "posts" ? "View Live Blog" : "View Live Projects"}</span>
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
        {/* Navigation Tabs: Blog / Newsletters VS Projects */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveSection("posts")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSection === "posts"
                  ? "bg-white text-[#073B69] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Newspaper className="w-4 h-4 text-[#0875C9]" />
              <span>Blog &amp; Newsletters ({posts.length})</span>
            </button>
            <button
              onClick={() => setActiveSection("projects")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeSection === "projects"
                  ? "bg-white text-[#073B69] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4 text-[#FFC400]" />
              <span>Projects &amp; Old Works ({projects.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            {activeSection === "posts" ? (
              <>
                <button
                  onClick={() => openCreatePostModal("newsletter")}
                  className="btn-yellow px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Newsletter</span>
                </button>
                <button
                  onClick={() => openCreatePostModal("article")}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#073B69] text-white hover:bg-[#05294A] flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Article</span>
                </button>
              </>
            ) : (
              <button
                onClick={openCreateProjectModal}
                className="btn-yellow px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project / Old Work</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= SECTION 1: BLOG & NEWSLETTERS ================= */}
        {activeSection === "posts" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Total Publications</span>
                <span className="text-2xl sm:text-3xl font-black text-[#073B69] mt-1 block">
                  {posts.length}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Monthly Newsletters</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0875C9] mt-1 block">
                  {totalNewsletters}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Technical Guides</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-700 mt-1 block">
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
              {/* Filter Toolbar */}
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
                      onClick={() => setSelectedPostTab(tab.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        selectedPostTab === tab.id
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
                    value={postSearchFilter}
                    onChange={(e) => setPostSearchFilter(e.target.value)}
                    placeholder="Search publications..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] bg-slate-50"
                  />
                </div>
              </div>

              {/* Table */}
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
                              <div>{post.monthYear || post.date}</div>
                              {post.pdfUrl && (
                                <span className="text-[10px] text-green-700 flex items-center gap-1 mt-0.5">
                                  <FileText className="w-2.5 h-2.5" /> PDF Attached
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-4 whitespace-nowrap">
                              {post.status === "draft" ? (
                                <span className="bg-slate-100 text-slate-600 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                                  Draft
                                </span>
                              ) : (
                                <span className="bg-emerald-50 text-emerald-700 font-bold px-2.5 py-0.5 rounded-full text-[10px] inline-flex items-center gap-1">
                                  <Check className="w-3 h-3 text-emerald-600" /> Published
                                </span>
                              )}
                            </td>

                            <td className="py-4 px-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <Link
                                  href={`/blog/${post.slug}`}
                                  target="_blank"
                                  className="p-1.5 text-slate-400 hover:text-[#0875C9] hover:bg-slate-100 rounded-lg transition-colors"
                                  title="View Public Article"
                                >
                                  <Eye className="w-4 h-4" />
                                </Link>
                                <button
                                  onClick={() => openEditPostModal(post)}
                                  className="p-1.5 text-slate-400 hover:text-[#073B69] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Post"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                {deleteConfirmPostId === post.id ? (
                                  <div className="inline-flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                                    <button
                                      onClick={() => handleDeletePost(post.id)}
                                      className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold cursor-pointer"
                                    >
                                      Confirm
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirmPostId(null)}
                                      className="px-1.5 py-0.5 text-slate-600 hover:text-slate-900 text-[10px] cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setDeleteConfirmPostId(post.id)}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Delete Post"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
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
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-bold">No publications match your filter.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= SECTION 2: PROJECTS & OLD WORKS ================= */}
        {activeSection === "projects" && (
          <div className="space-y-6 animate-in fade-in">
            {/* Project Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Total Works</span>
                <span className="text-2xl sm:text-3xl font-black text-[#073B69] mt-1 block">
                  {projects.length}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Swimming Pools</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0875C9] mt-1 block">
                  {projects.filter((p) => p.category === "Swimming Pools").length}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Basements &amp; Roofs</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-700 mt-1 block">
                  {projects.filter((p) => p.category === "Basements" || p.category === "Rooftops").length}
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Featured Spotlights</span>
                <span className="text-2xl sm:text-3xl font-black text-[#FFC400] mt-1 block">
                  {projects.filter((p) => p.featured).length}
                </span>
              </div>
            </div>

            {/* Projects Table & Controls */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
              {/* Category Filter Toolbar */}
              <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {projectCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedProjectTab(cat)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        selectedProjectTab === cat
                          ? "bg-[#073B69] text-white"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={projectSearchFilter}
                    onChange={(e) => setProjectSearchFilter(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] bg-slate-50"
                  />
                </div>
              </div>

              {/* Table */}
              {loadingProjects ? (
                <div className="p-12 text-center">
                  <RefreshCw className="w-6 h-6 text-[#0875C9] animate-spin mx-auto mb-2" />
                  <p className="text-xs text-slate-500 font-bold">Loading projects...</p>
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#F5F8FC] border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-bold">
                      <tr>
                        <th className="py-3 px-5">Project / Work</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Scope</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProjects.map((proj) => (
                        <tr key={proj.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-5">
                            <div className="flex items-center gap-3">
                              <div className="relative w-14 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                                <Image
                                  src={proj.image || "/assets/projects/project_swimming_pool.jpg"}
                                  alt={proj.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="max-w-md">
                                <span className="font-bold text-[#073B69] hover:text-[#0875C9] transition-colors line-clamp-1 block">
                                  {proj.name}
                                </span>
                                <span className="text-[11px] text-slate-400 line-clamp-1">
                                  {proj.description}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="bg-blue-50 text-[#0875C9] font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                              {proj.category}
                            </span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap text-slate-600 font-medium">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#0875C9]" />
                              <span>{proj.location}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-slate-600 max-w-xs">
                            <span className="line-clamp-1">{proj.scope || "N/A"}</span>
                          </td>

                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href="/projects"
                                target="_blank"
                                className="p-1.5 text-slate-400 hover:text-[#0875C9] hover:bg-slate-100 rounded-lg transition-colors"
                                title="View on Projects Page"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => openEditProjectModal(proj)}
                                className="p-1.5 text-slate-400 hover:text-[#073B69] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                title="Edit Project"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              {deleteConfirmProjectId === proj.id ? (
                                <div className="inline-flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                                  <button
                                    onClick={() => handleDeleteProject(proj.id)}
                                    className="px-2 py-0.5 bg-red-600 text-white rounded text-[10px] font-bold cursor-pointer"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmProjectId(null)}
                                    className="px-1.5 py-0.5 text-slate-600 hover:text-slate-900 text-[10px] cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmProjectId(proj.id)}
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Project"
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
                <div className="p-12 text-center space-y-3">
                  <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-bold">No projects found for this category.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ================= MODAL 1: BLOG / NEWSLETTER EDITOR ================= */}
      {isPostEditorOpen && (
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
                  {editingPostId ? "Update Publication" : "Create New Publication"}
                </span>
                <h3 className="text-lg font-black">
                  {formContentType === "newsletter" ? "Monthly Newsletter Edition" : "Technical Article"}
                </h3>
              </div>
              <button
                onClick={() => setIsPostEditorOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSavePost} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-slate-700">
              {/* Row 1: Title & Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-800 block">
                    Headline / Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Matshepo Monthly Newsletter — November 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs font-semibold bg-white"
                  >
                    <option value="Monthly Newsletter">Monthly Newsletter</option>
                    <option value="Tile Adhesives">Tile Adhesives</option>
                    <option value="Waterproofing">Waterproofing</option>
                    <option value="Flooring">Flooring</option>
                    <option value="Construction Tips">Construction Tips</option>
                    <option value="Company News">Company News</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Newsletter-Specific Fields */}
              {formContentType === "newsletter" && (
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-amber-900 block">Newsletter Edition / Issue</label>
                    <input
                      type="text"
                      value={formEdition}
                      onChange={(e) => setFormEdition(e.target.value)}
                      placeholder="e.g. Issue #12 — November 2026"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-amber-900 block">Month &amp; Year Tag</label>
                    <input
                      type="text"
                      value={formMonthYear}
                      onChange={(e) => setFormMonthYear(e.target.value)}
                      placeholder="e.g. November 2026"
                      className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-amber-900 block">PDF Download URL (Optional)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formPdfUrl}
                        onChange={(e) => setFormPdfUrl(e.target.value)}
                        placeholder="https://... or upload PDF"
                        className="w-full px-3 py-2 rounded-xl border border-amber-200 bg-white text-xs"
                      />
                      <label className="px-3 py-2 bg-[#073B69] hover:bg-[#0875C9] text-white rounded-xl text-[11px] font-bold cursor-pointer shrink-0 flex items-center gap-1">
                        <Upload className="w-3 h-3" />
                        <span>{uploadingPdf ? "..." : "Upload"}</span>
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "pdf", "post");
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Row 3: Summary / Excerpt */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">
                  Summary / Executive Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="A concise synopsis displayed on cards and newsletter listings..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs"
                />
              </div>

              {/* Row 4: Cover Image */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Cover Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image src={formImage} alt="Cover preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={formImage}
                      onChange={(e) => setFormImage(e.target.value)}
                      placeholder="/assets/blog/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                    <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingImage ? "Uploading..." : "Upload Image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "image", "post");
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Status & Featured Controls */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Status</label>
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

              {/* Save Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsPostEditorOpen(false)}
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
                      <span>{editingPostId ? "Update Publication" : "Publish to Blog"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: PROJECT / OLD WORKS EDITOR ================= */}
      {isProjectEditorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
        >
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-[#073B69] via-[#0875C9] to-[#05294A] text-white">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#FFC400] font-bold block">
                  {editingProjectId ? "Edit Portfolio Work" : "New Portfolio Project"}
                </span>
                <h3 className="text-lg font-black">
                  {editingProjectId ? `Edit "${projName}"` : "Add Completed Project / Old Work"}
                </h3>
              </div>
              <button
                onClick={() => setIsProjectEditorOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveProject} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs text-slate-700">
              {/* Row 1: Name & Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1.5">
                  <label className="font-bold text-slate-800 block">
                    Project / Work Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    placeholder="e.g. Westlands Commercial Basement Tanking"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Application Category</label>
                  <select
                    value={projCategory}
                    onChange={(e) => setProjCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs font-semibold bg-white"
                  >
                    <option value="Swimming Pools">Swimming Pools</option>
                    <option value="Basements">Basements</option>
                    <option value="Rooftops">Rooftops</option>
                    <option value="Wet Areas">Wet Areas</option>
                    <option value="Balconies">Balconies</option>
                    <option value="Other Projects">Other Projects</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Location, Scope & Year */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Location</label>
                  <input
                    type="text"
                    value={projLocation}
                    onChange={(e) => setProjLocation(e.target.value)}
                    placeholder="e.g. Nairobi, Kenya"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Execution Scope</label>
                  <input
                    type="text"
                    value={projScope}
                    onChange={(e) => setProjScope(e.target.value)}
                    placeholder="e.g. 850 m² exposed roof terrace"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-800 block">Completion Year</label>
                  <input
                    type="text"
                    value={projYear}
                    onChange={(e) => setProjYear(e.target.value)}
                    placeholder="e.g. 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              {/* Row 3: Short Description */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">
                  Short Summary / Card Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={projDescription}
                  onChange={(e) => setProjDescription(e.target.value)}
                  placeholder="Summary shown on project portfolio cards..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs"
                />
              </div>

              {/* Row 4: Full Case Study Details */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">
                  Full Case Study &amp; Technical Execution Details
                </label>
                <textarea
                  rows={4}
                  value={projFullDetails}
                  onChange={(e) => setProjFullDetails(e.target.value)}
                  placeholder="Detailed breakdown of substrate preparation, application challenges, materials specified, and final testing results..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0875C9] text-xs"
                />
              </div>

              {/* Row 5: Systems / Products Specified */}
              <div className="space-y-2">
                <label className="font-bold text-slate-800 block">
                  Chemical Systems &amp; Products Used
                </label>
                <div className="space-y-2">
                  {projSystems.map((sys, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={sys}
                        onChange={(e) => {
                          const updated = [...projSystems];
                          updated[idx] = e.target.value;
                          setProjSystems(updated);
                        }}
                        placeholder="e.g. Ultraguard 2K Cementitious Waterproofing"
                        className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs"
                      />
                      {projSystems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setProjSystems(projSystems.filter((_, i) => i !== idx))}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setProjSystems([...projSystems, ""])}
                    className="text-[11px] font-bold text-[#0875C9] hover:underline"
                  >
                    + Add Another Product / System
                  </button>
                </div>
              </div>

              {/* Row 6: Image Upload */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-800 block">Project Site Photo</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <Image src={projImage} alt="Site preview" fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={projImage}
                      onChange={(e) => setProjImage(e.target.value)}
                      placeholder="/assets/projects/..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                    <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingProjectImage ? "Uploading..." : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) handleFileUpload(e.target.files[0], "image", "project");
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Footer */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
                <button
                  type="button"
                  onClick={() => setIsProjectEditorOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="btn-yellow px-6 py-2.5 rounded-xl font-black flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  {savingProject ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving Project...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>{editingProjectId ? "Update Work" : "Publish Project"}</span>
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
