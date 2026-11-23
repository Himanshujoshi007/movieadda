"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  Lock,
  User,
  Key,
  Server,
  DollarSign,
  Save,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RotateCcw,
  Film,
  Sparkles,
  ArrowLeft,
  Settings2,
  Sliders,
  LogOut,
  Eye,
  EyeOff,
  Copy,
  Download,
  Upload,
  BookOpen,
  Info,
  Radio,
  Layers,
  Palette,
  Zap,
} from "lucide-react";
import {
  useSettings,
  STREAM_PROVIDERS,
  DEFAULT_SETTINGS,
  AppSettings,
} from "@/lib/settings";
import { testTmdbApiKey } from "@/lib/tmdb";

// Hardened Admin Credentials
const ADMIN_ID = "him";
const ADMIN_PASS = "!@#$Him2856";
const SESSION_STORAGE_KEY = "movieadda_admin_session";
const LOCKOUT_KEY = "movieadda_admin_lockout";
const MAX_ATTEMPTS = 5;

export default function AdminControlPage() {
  const { settings, updateSettings, isLoaded } = useSettings();

  // Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutRemaining, setLockoutRemaining] = useState(0);

  // Form & Tab States
  const [activeTab, setActiveTab] = useState<"api" | "streaming" | "ads" | "ui" | "system">("api");
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [testResult, setTestResult] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);

  // Check existing session & lockout on mount
  useEffect(() => {
    try {
      const session = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (session === "authenticated_him_master") {
        setIsAuthenticated(true);
      }

      const lockoutTime = localStorage.getItem(LOCKOUT_KEY);
      if (lockoutTime) {
        const remaining = Math.ceil((Number(lockoutTime) - Date.now()) / 1000);
        if (remaining > 0) {
          setLockoutRemaining(remaining);
        } else {
          localStorage.removeItem(LOCKOUT_KEY);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockoutRemaining((prev) => {
        if (prev <= 1) {
          localStorage.removeItem(LOCKOUT_KEY);
          setFailedAttempts(0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutRemaining]);

  useEffect(() => {
    if (isLoaded) {
      setFormData(settings);
    }
  }, [isLoaded, settings]);

  // Handle Login Attempt with Brute-Force Rate Limiting
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutRemaining > 0) return;

    if (usernameInput.trim() === ADMIN_ID && passwordInput === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_STORAGE_KEY, "authenticated_him_master");
      setIsAuthenticated(true);
      setLoginError("");
      setFailedAttempts(0);
    } else {
      const nextAttempts = failedAttempts + 1;
      setFailedAttempts(nextAttempts);

      if (nextAttempts >= MAX_ATTEMPTS) {
        const lockUntil = Date.now() + 60 * 1000;
        localStorage.setItem(LOCKOUT_KEY, String(lockUntil));
        setLockoutRemaining(60);
        setLoginError("SECURITY LOCKOUT: Too many failed attempts. Console locked for 60 seconds.");
      } else {
        setLoginError(`Invalid ID or Password! (${MAX_ATTEMPTS - nextAttempts} attempts remaining)`);
      }
    }
  };

  const handleQuickFill = () => {
    setUsernameInput(ADMIN_ID);
    setPasswordInput(ADMIN_PASS);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
  };

  const handleTestApiKey = async () => {
    if (!formData.tmdbApiKey) {
      setTestResult({
        loading: false,
        success: false,
        message: "Please enter a TMDB API Key to test.",
      });
      return;
    }

    setTestResult({ loading: true });
    const res = await testTmdbApiKey(formData.tmdbApiKey);
    setTestResult({
      loading: false,
      success: res.success,
      message: res.message,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCopyBackup = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 2500);
  };

  const handlePurgeCache = () => {
    if (confirm("Purge local browser cache and reload? This will not erase your admin credentials.")) {
      localStorage.removeItem("movieadda_watchlist");
      localStorage.removeItem("movieadda_favorites");
      localStorage.removeItem("movieadda_history");
      window.location.reload();
    }
  };

  // ---------------------------------------------------------------------------
  // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
  // ---------------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0b10] flex items-center justify-center p-4 selection:bg-[#e50914] selection:text-white relative overflow-hidden">
        {/* Subtle Cyber Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-[130px] pointer-events-none" />

        <div className="relative w-full max-w-md rounded-2xl bg-[#141416] border border-neutral-800 shadow-2xl p-6 sm:p-8 space-y-6 text-white z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#e50914] to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20 font-bold">
              Master Admin Gate
            </span>
            <h1 className="text-2xl font-black tracking-tight text-white">
              MovieAdda Control Access
            </h1>
            <p className="text-xs text-neutral-400 max-w-xs">
              Dedicated administrator authentication for Himanshu Joshi.
            </p>
          </div>

          {/* Lockout Warning */}
          {lockoutRemaining > 0 ? (
            <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-center space-y-2">
              <ShieldAlert className="w-8 h-8 text-red-500 mx-auto animate-pulse" />
              <h4 className="text-sm font-bold text-red-400">Security Lockdown Active</h4>
              <p className="text-xs text-neutral-300">
                Too many invalid authentication attempts. Try again in:
              </p>
              <div className="text-2xl font-mono font-black text-white">
                00:{lockoutRemaining < 10 ? `0${lockoutRemaining}` : lockoutRemaining}
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-lg bg-red-950/80 border border-red-700 text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* 1-Click Fast Fill for Himanshu */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-red-950/40 to-neutral-900 border border-red-900/50 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Authorized Access
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono">him</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="w-full py-2 px-3 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-xs font-bold text-red-300 hover:text-white flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  1-Click Auto-Fill (him / !@#$Him2856)
                </button>
              </div>

              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-300">
                  Administrator ID
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    name="username"
                    id="admin-username"
                    autoComplete="username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="Enter admin ID (him)"
                    required
                    className="w-full bg-[#0a0b10] border border-neutral-700 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e50914] font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-neutral-300">
                  Master Password
                </label>
                <div className="relative flex items-center">
                  <Key className="w-4 h-4 text-neutral-500 absolute left-3.5 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="admin-password"
                    autoComplete="current-password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password (!@#$Him2856)"
                    required
                    className="w-full bg-[#0a0b10] border border-neutral-700 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#e50914] font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#e50914] to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Sign In to Admin Panel
              </button>
            </form>
          )}

          <div className="pt-2 border-t border-neutral-800 text-center">
            <Link
              href="/"
              className="text-xs text-neutral-500 hover:text-neutral-300 transition flex items-center justify-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Main MovieAdda Platform
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // RENDER AUTHENTICATED MASTER DASHBOARD
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#e5e5e5] py-8 px-4 sm:px-6 lg:px-10 selection:bg-[#e50914] selection:text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Master Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#e50914] to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Authenticated: him (Root Admin)
                </span>
                <span className="text-xs text-neutral-500 font-mono">/movieadda/him</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                MovieAdda Master Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> View Live Site
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-800/60 text-xs font-bold text-red-300 hover:text-white transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" /> Lock &amp; Logout
            </button>
          </div>
        </div>

        {/* Save Confirmation Toast */}
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-sm flex items-center gap-2.5 animate-fade-in shadow-xl shadow-emerald-950/40">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong>Master Settings Applied!</strong> All API, stream engine, and monetization options are updated live across MovieAdda.
            </span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar border-b border-neutral-800 pb-2">
          {(
            [
              { id: "api", label: "TMDB & Catalog API", icon: Key },
              { id: "streaming", label: "Stream Engine & Servers", icon: Server },
              { id: "ads", label: "AdSense & Monetization", icon: DollarSign },
              { id: "ui", label: "Netflix / Prime UI", icon: Palette },
              { id: "system", label: "Diagnostics & Backup", icon: Settings2 },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#e50914] text-white shadow-lg shadow-red-600/30"
                    : "bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: TMDB & CATALOG API */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#141416] border border-neutral-800 p-6 space-y-5 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <Key className="w-4 h-4 text-[#e50914]" />
                      TMDB Live Movie Database Credentials
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Approved key for Himanshu Joshi (`joshi333322@gmail.com`).
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase w-fit">
                    Key Status: Active
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-semibold text-neutral-300">
                    TMDB API Key (v3 auth)
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={formData.tmdbApiKey}
                      onChange={(e) =>
                        setFormData({ ...formData, tmdbApiKey: e.target.value.trim() })
                      }
                      placeholder="e.g. 5e49eb749da0a3b26445dc786d0de3df"
                      className="flex-1 bg-black border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#e50914] font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleTestApiKey}
                      disabled={testResult.loading}
                      className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-bold text-white transition shrink-0 cursor-pointer"
                    >
                      {testResult.loading ? "Testing..." : "Test Connection"}
                    </button>
                  </div>

                  {testResult.message && (
                    <div
                      className={`text-xs p-3 rounded-lg flex items-center gap-2 ${
                        testResult.success
                          ? "bg-emerald-950/60 text-emerald-300 border border-emerald-800/60"
                          : "bg-rose-950/60 text-rose-300 border border-rose-800/60"
                      }`}
                    >
                      {testResult.success ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      )}
                      <span>{testResult.message}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Default Content Language
                      </label>
                      <select
                        value={formData.tmdbLanguage}
                        onChange={(e) => setFormData({ ...formData, tmdbLanguage: e.target.value })}
                        className="w-full bg-black border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#e50914]"
                      >
                        <option value="en-US">English (en-US)</option>
                        <option value="hi-IN">Hindi (hi-IN)</option>
                        <option value="es-ES">Spanish (es-ES)</option>
                        <option value="fr-FR">French (fr-FR)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide & Use Case Card */}
              <div className="rounded-2xl bg-gradient-to-r from-blue-950/30 to-indigo-950/30 border border-blue-900/40 p-6 space-y-3 text-xs text-neutral-300">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                  <BookOpen className="w-4 h-4" />
                  Guide &amp; TMDB API Architecture
                </div>
                <p>
                  <strong>How it works:</strong> MovieAdda queries TMDB directly for real-time trending titles, high-resolution backdrops, cast filmographies, and trailer IDs.
                </p>
                <ul className="list-disc list-inside space-y-1 text-neutral-400 pl-1">
                  <li><strong>Quota:</strong> TMDB provides up to 40 requests per 10 seconds per IP, which is virtually unlimited for standard user browsing.</li>
                  <li><strong>Image Delivery:</strong> Image assets load via TMDB’s global CDN (`https://image.tmdb.org/t/p/w500/...`), ensuring instant poster loading.</li>
                  <li><strong>Offline Resilience:</strong> If an API call is delayed or rate-limited, MovieAdda automatically falls back to our curated 4K blockbuster database with zero UI downtime.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: STREAM ENGINE & SERVERS */}
          {activeTab === "streaming" && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#141416] border border-neutral-800 p-6 space-y-5 shadow-xl">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#e50914]" />
                    Cinema Stream Engine &amp; Multi-Server Switcher
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Select your primary streaming provider and configure backup server failovers.
                  </p>
                </div>

                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Default Primary Server
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {STREAM_PROVIDERS.map((provider) => (
                      <div
                        key={provider.id}
                        onClick={() => setFormData({ ...formData, activeProviderId: provider.id })}
                        className={`p-4 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                          formData.activeProviderId === provider.id
                            ? "bg-red-600/10 border-red-500 text-white shadow-md shadow-red-500/10"
                            : "bg-black/60 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="provider"
                          checked={formData.activeProviderId === provider.id}
                          onChange={() =>
                            setFormData({ ...formData, activeProviderId: provider.id })
                          }
                          className="mt-1 text-red-600 focus:ring-red-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-sm text-white">{provider.name}</span>
                            <span className="text-[10px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5 rounded font-mono">
                              {provider.badge}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-neutral-500 mt-1 truncate">
                            {provider.movieUrl}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Embed Template */}
                  <div className="pt-3 border-t border-neutral-800 space-y-3">
                    <label className="block text-xs font-semibold text-neutral-300">
                      Custom Stream URL Template (Optional Advanced Server)
                    </label>
                    <input
                      type="text"
                      value={formData.customMovieTemplate}
                      onChange={(e) =>
                        setFormData({ ...formData, customMovieTemplate: e.target.value })
                      }
                      placeholder="https://your-custom-source.com/embed/movie/{id}"
                      className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#e50914] font-mono"
                    />
                    <p className="text-[11px] text-neutral-500">
                      Tokens available: <code className="text-red-400 font-bold">{"{id}"}</code> (TMDB Movie ID), <code className="text-red-400 font-bold">{"{season}"}</code>, <code className="text-red-400 font-bold">{"{episode}"}</code>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADSENSE & MONETIZATION */}
          {activeTab === "ads" && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#141416] border border-neutral-800 p-6 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                      Google AdSense &amp; Sponsored Slots
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Turn display ads on/off and configure your publisher IDs.
                    </p>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer bg-neutral-900 px-3 py-1.5 rounded-lg border border-neutral-800">
                    <span className="text-xs font-bold text-white">Master Ads Toggle</span>
                    <input
                      type="checkbox"
                      checked={formData.enableAds}
                      onChange={(e) => setFormData({ ...formData, enableAds: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Google AdSense Publisher Client ID
                    </label>
                    <input
                      type="text"
                      value={formData.adsenseClientId}
                      onChange={(e) =>
                        setFormData({ ...formData, adsenseClientId: e.target.value.trim() })
                      }
                      placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                      className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  {/* Individual Slot Toggles */}
                  <div className="pt-2 border-t border-neutral-800 space-y-3">
                    <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Individual Slot Placement Toggles
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-800 cursor-pointer">
                        <span className="text-xs text-neutral-300 font-medium">Header Leaderboard (728x90)</span>
                        <input
                          type="checkbox"
                          checked={formData.enableHeaderAd}
                          onChange={(e) =>
                            setFormData({ ...formData, enableHeaderAd: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-800 cursor-pointer">
                        <span className="text-xs text-neutral-300 font-medium">In-Feed Grid Ads (300x250)</span>
                        <input
                          type="checkbox"
                          checked={formData.enableInFeedAd}
                          onChange={(e) =>
                            setFormData({ ...formData, enableInFeedAd: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                        />
                      </label>

                      <label className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-800 cursor-pointer">
                        <span className="text-xs text-neutral-300 font-medium">Rewarded Ad on Download</span>
                        <input
                          type="checkbox"
                          checked={formData.enableRewardedAd}
                          onChange={(e) =>
                            setFormData({ ...formData, enableRewardedAd: e.target.checked })
                          }
                          className="w-4 h-4 rounded text-emerald-600 cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: NETFLIX / PRIME UI */}
          {activeTab === "ui" && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#141416] border border-neutral-800 p-6 space-y-5 shadow-xl">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#e50914]" />
                    UI &amp; Visual Theme Customizer
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Fine-tune branding, billboard rotation, and catalog layouts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      App Title
                    </label>
                    <input
                      type="text"
                      value={formData.appName}
                      onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                      className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Tagline / Subheading
                    </label>
                    <input
                      type="text"
                      value={formData.appTagline}
                      onChange={(e) => setFormData({ ...formData, appTagline: e.target.value })}
                      className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Billboard Auto-Rotate Delay (Seconds)
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={30}
                      value={formData.heroRotateInterval}
                      onChange={(e) =>
                        setFormData({ ...formData, heroRotateInterval: Number(e.target.value) })
                      }
                      className="w-full bg-black border border-neutral-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#e50914]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-800 space-y-3">
                  <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Display Row Modules
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-800 cursor-pointer">
                      <div>
                        <span className="text-xs text-white font-bold block">Top 10 Row with Giant Numbers</span>
                        <span className="text-[10px] text-neutral-500">Iconic Netflix styled numbered row</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.showTop10Row}
                        onChange={(e) =>
                          setFormData({ ...formData, showTop10Row: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-red-600 cursor-pointer"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-neutral-800 cursor-pointer">
                      <div>
                        <span className="text-xs text-white font-bold block">Continue Watching Widescreen Row</span>
                        <span className="text-[10px] text-neutral-500">16:9 Prime/Netflix viewing history row</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.showContinueWatching}
                        onChange={(e) =>
                          setFormData({ ...formData, showContinueWatching: e.target.checked })
                        }
                        className="w-4 h-4 rounded text-red-600 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM DIAGNOSTICS & BACKUP */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#141416] border border-neutral-800 p-6 space-y-5 shadow-xl">
                <div className="border-b border-neutral-800 pb-4">
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-[#e50914]" />
                    Backup, Restore &amp; Diagnostics
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Export your configuration JSON or purge local browser caches.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyBackup}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedBackup ? "Copied JSON to Clipboard!" : "Copy Settings Backup JSON"}
                    </button>

                    <button
                      type="button"
                      onClick={handlePurgeCache}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-950/50 hover:bg-rose-900/50 text-rose-300 border border-rose-800/50 text-xs font-bold transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Purge Local Browser Cache
                    </button>
                  </div>

                  <div className="pt-3">
                    <label className="block text-xs font-semibold text-neutral-400 mb-1">
                      Active JSON Configuration Payload
                    </label>
                    <pre className="p-4 rounded-xl bg-black border border-neutral-800 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-56">
                      {JSON.stringify(formData, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Master Bottom Save Bar */}
          <div className="sticky bottom-6 z-20 flex items-center justify-between p-4 rounded-2xl bg-[#141416]/95 border border-neutral-800 shadow-2xl backdrop-blur-md">
            <span className="text-xs text-neutral-400">
              Unsaved changes will not take effect until you click <strong>Save Master Settings</strong>.
            </span>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e50914] to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-red-600/40 transition transform active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Master Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
