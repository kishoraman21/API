"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Activity,
  Clock,
  TrendingUp,
  AlertCircle,
  Loader2,
  LogOut,
  Key,
  BarChart3,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import logo from "../logo2.svg"
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";

const APIAnalyticsDashboard = () => {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("setup");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [hasFetched , setHasFetched] = useState(false);

  const [stats, setStats] = useState({
    totalRequests: 0,
    successRate: 0,
    avgResponseTime: 0,
    activeEndpoints: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);

  // New state for overview data
  const [usageData, setUsageData] = useState([]);
  const [endpointData, setEndpointData] = useState([]);
  const [isLoadingOverview, setIsLoadingOverview] = useState(false);
  const [overviewError, setOverviewError] = useState(null);

  const [recentLogs, setRecentLogs] = useState([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [logsError, setLogsError] = useState(null);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("User Logged out successfully");
  };

  const handleCopyApiKey = async () => {
    const keyToCopy = session?.user?.apikey;
    if (!keyToCopy) return;
    try {
      await navigator.clipboard.writeText(keyToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const { data: session, status } = useSession();

  // Fetch summary stats from backend
 useEffect(() => {
  let intervalID;

  const fetchStats = async () => {
    if (!session?.user?.apikey) return;

    setIsLoadingStats(true);
    setStatsError(null);

    try {
      const apikey = session?.user?.apikey;
      const response = await axios.get(`/api/usage/summary/?apikey=${apikey}`);

      if (response.data?.summary && Array.isArray(response.data.summary)) {
        const summaryData = response.data.summary;

        const totalRequests = summaryData.reduce(
          (sum, item) => sum + item.totalHits,
          0
        );
        const avgResponseTime =
          summaryData.length > 0
            ? summaryData.reduce((sum, item) => sum + item.avgResponse, 0) /
              summaryData.length
            : 0;
        const successRate =
          summaryData.length > 0
            ? (summaryData.reduce((sum, item) => sum + item.successRate, 0) /
                summaryData.length) *
              100
            : 0;
        const activeEndpoints = summaryData.length;

        setStats({
          totalRequests,
          successRate: Math.round(successRate * 10) / 10,
          avgResponseTime: Math.round(avgResponseTime),
          activeEndpoints,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStatsError(error.response?.data?.message || "Failed to fetch stats");
      toast.error("Failed to load statistics");
    } finally {
      setIsLoadingStats(false);
    }
  };

  //  Fetch once and start interval if user is on summary section
  if (status === "authenticated" && activeSection === "summary") {
    fetchStats();

    //  Auto-refresh every 2 minutes
    intervalID = setInterval(fetchStats, 2 * 60 * 1000);
  }

  //  Cleanup on unmount or section/tab change
  return () => {
    clearInterval(intervalID);
  };
}, [session, status, activeSection]);

  // Fetch overview data (usage timeline and endpoint distribution)
 useEffect(() => {
  let intervalId;

  const fetchOverviewData = async () => {
    if (!session?.user?.apikey) return;

    setIsLoadingOverview(true);
    setOverviewError(null);

    try {
      const apikey = session?.user?.apikey;

      // Fetch logs for timeline data
      const logsResponse = await axios.get(`/api/usage/stats?apikey=${apikey}`);

      // Fetch summary for endpoint data
      const summaryResponse = await axios.get(`/api/usage/summary/?apikey=${apikey}`);

      // Process logs data for timeline chart
      if (logsResponse.data?.logs && Array.isArray(logsResponse.data.logs)) {
        const logs = logsResponse.data.logs;

        const hourlyData = {};
        logs.forEach((log) => {
          const logDate = new Date(log.timestamp);
          const hourKey = `${logDate.getHours().toString().padStart(2, "0")}:00`;

          if (!hourlyData[hourKey]) {
            hourlyData[hourKey] = { time: hourKey, requests: 0, errors: 0 };
          }

          hourlyData[hourKey].requests++;
          if (log.status_code >= 400) {
            hourlyData[hourKey].errors++;
          }
        });

        const timelineData = Object.values(hourlyData).sort((a, b) => a.time.localeCompare(b.time));

        setUsageData(
          timelineData.length > 0
            ? timelineData
            : [{ time: "No Data", requests: 0, errors: 0 }]
        );
      }

      // Process summary data for endpoint distribution
      if (summaryResponse.data?.summary && Array.isArray(summaryResponse.data.summary)) {
        const summaryData = summaryResponse.data.summary;
        const colors = ["red", "purple", "blue", "yellow", "green"];

        const endpointDistribution = summaryData.map((item, index) => ({
          name: item.endpoint,
          value: item.totalHits,
          color: colors[index % colors.length],
        }));

        setEndpointData(
          endpointDistribution.length > 0
            ? endpointDistribution
            : [{ name: "No Data", value: 0, color: "#6b7280" }]
        );
      }
    } catch (error) {
      console.error("Error fetching overview data:", error);
      setOverviewError(
        error.response?.data?.message || "Failed to fetch overview data"
      );
      toast.error("Failed to load overview data");
    } finally {
      setIsLoadingOverview(false);
    }
  };

  //  Start fetching when user enters summary section
  if (
    !hasFetched &&
    status === "authenticated" &&
    activeTab === "overview" &&
    activeSection === "summary"
  ) {
    fetchOverviewData();
    setHasFetched(true);

    //  Auto-refresh every 2 minutes
    intervalId = setInterval(fetchOverviewData, 2 * 60 * 1000);
  }

  //  Cleanup interval on unmount or tab change
  return () => {
    clearInterval(intervalId);
  };
}, [session, status, activeTab, activeSection, hasFetched]);


  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "text-green-400 bg-green-500/10";
    if (status >= 400 && status < 500) return "text-red-400 bg-red-500/10";
    if (status >= 500) return "text-red-300 bg-red-500/20";
    return "text-gray-400 bg-gray-700/50";
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: "text-blue-400 bg-blue-500/10",
      POST: "text-green-400 bg-green-500/10",
      PUT: "text-yellow-400 bg-yellow-500/10",
      DELETE: "text-red-400 bg-red-500/10",
      PATCH: "text-purple-400 bg-purple-500/10",
    };
    return colors[method] || "text-gray-400 bg-gray-700/50";
  };

  const filteredLogs = recentLogs.filter((log) => {
    const isNotOptions = log.method !== "OPTIONS";
    const matchesSearch =
      log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.method.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "success" &&
        log.status_code >= 200 &&
        log.status_code < 300) ||
      (filterStatus === "error" && log.status_code >= 400);
    return matchesSearch && matchesFilter && isNotOptions;
  });

  // Fetch logs data from backend
  useEffect(() => {
  let intervalId;

  const fetchLogs = async (showToast = false) => {
    if (!session?.user?.apikey) return;

    setIsLoadingLogs(true);
    setLogsError(null);

    try {
      const apikey = session.user.apikey;
      const response = await axios.get(`/api/usage/stats?apikey=${apikey}`);

      if (response.data?.logs && Array.isArray(response.data.logs)) {
        setRecentLogs(response.data.logs);

        if (showToast) {
          toast.success("Fetched logs successfully!");
        }
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLogsError(error.response?.data?.message || "Failed to fetch logs");
      toast.error("Failed to load logs data");
    } finally {
      setIsLoadingLogs(false);
    }
  };

  if (status === "authenticated" && activeTab === "logs") {
    // Initial fetch with toast
    fetchLogs(true);

    //  Auto-refresh every 2 minutes silently (no toast)
    intervalId = setInterval(() => fetchLogs(false), 2 * 60 * 1000);
  }

  //  Cleanup on unmount or tab change
  return () => {
    clearInterval(intervalId);
  };
}, [session, status, activeTab]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (status === "authenticated") {
    return (
      <div className="min-h-screen h-screen bg-black text-gray-100 flex relative overflow-hidden">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/80 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 ${
            sidebarOpen ? "w-64" : "md:w-20"
          }  fixed md:relative h-screen bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 flex flex-col z-40`}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full items-center justify-center hover:bg-gray-700 transition-colors shadow-lg z-10"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4 text-gray-300" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-300" />
            )}
          </button>

          <div className="p-6 border-b border-gray-800">
            <div
              className={`flex items-center ${
                sidebarOpen ? "space-x-3" : "justify-center"
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-transparent ">
            <img src={logo.src} alt="ApiDeck Logo" />
          </div>
              {sidebarOpen && (
                <div>
                  <h2 className="text-xl font-bold text-white">ApiDeck</h2>
                  <p className="text-xs text-gray-400">Analytics Platform</p>
                </div>
              )}
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveSection("setup")}
              className={`w-full flex items-center ${
                sidebarOpen ? "space-x-3" : "justify-center"
              } px-4 py-3 rounded-lg transition-all ${
                activeSection === "setup"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
              }`}
              title={!sidebarOpen ? "Setup" : ""}
            >
              <Key className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Setup</span>}
            </button>

            <button
              onClick={() => setActiveSection("summary")}
              className={`w-full flex items-center ${
                sidebarOpen ? "space-x-4" : "justify-center"
              } px-4 py-3 rounded-lg transition-all ${
                activeSection === "summary"
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
              }`}
              title={!sidebarOpen ? "Summary" : ""}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Summary</span>}
            </button>
          </nav>

          <div className="p-4 border-t border-gray-800 space-y-4 mt-auto">
            {sidebarOpen && session?.user && (
              <div className="bg-gray-800/50 rounded-xl p-3 border border-gray-700 backdrop-blur-sm">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Current Account
                </p>

                <div className="flex items-center space-x-3">
                  {session?.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={`${session.user.name}'s profile picture`}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                      <span className="text-white font-bold text-sm">
                        {session?.user?.username
                          ? session.user.username[0].toUpperCase()
                          : session?.user?.email[0].toUpperCase()}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {session?.user?.username || "User Name"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {session?.user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className={`w-full flex items-center justify-center ${
                sidebarOpen ? "space-x-2" : ""
              } px-4 py-2 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all duration-200 text-sm font-medium`}
              title={!sidebarOpen ? "Logout" : "Logout"}
            >
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <header className="border-b border-gray-800 sticky top-0 z-20 backdrop-blur-xl bg-black/80">
            <div className="px-4 md:px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors md:hidden"
                  >
                    {sidebarOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <Menu className="w-6 h-6" />
                    )}
                  </button>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white">
                      {activeSection === "setup"
                        ? "API Setup"
                        : "API Analytics"}
                    </h1>
                    <p className="text-sm text-gray-400">
                      {activeSection === "setup"
                        ? "Manage your API credentials"
                        : "Real-time monitoring & insights"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            {activeSection === "setup" ? (
              <div className="h-full flex items-center px-4 md:px-6 py-8 md:py-12">
                <div className="w-full max-w-4xl mx-auto">
                  <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
                    <div className="bg-gray-800 px-6 md:px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 md:w-14 h-12 md:h-14 bg-black/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                          <Key className="w-6 md:w-7 h-6 md:h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-bold text-white">
                            API Key
                          </h2>
                          <p className="text-gray-300 text-sm mt-1">
                            Secure access to your API service
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6">
                      <div className="bg-yellow-900/20 border-l-4 border-yellow-500 rounded-lg p-4 md:p-5 mb-6 md:mb-8">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-semibold text-white mb-1">
                              Important Security Notice
                            </h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                              Your API key provides access to the API service.
                              Keep it secure and never share it publicly.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-white">
                          Your API Key
                        </label>
                        <div className="relative">
                          <input
                            type={apiKeyVisible ? "text" : "password"}
                            value={session.user.apikey}
                            readOnly
                            className="w-full px-4 py-3 md:py-4 pr-24 md:pr-28 bg-gray-800/50 border-2 border-gray-700 rounded-xl font-mono text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            <button
                              onClick={() => setApiKeyVisible(!apiKeyVisible)}
                              className="p-2 md:p-2.5 hover:bg-gray-700 rounded-lg transition-colors group"
                              title={
                                apiKeyVisible ? "Hide API key" : "Show API key"
                              }
                            >
                              {apiKeyVisible ? (
                                <EyeOff className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
                              ) : (
                                <Eye className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
                              )}
                            </button>
                            <button
                              onClick={handleCopyApiKey}
                              className="p-2 md:p-2.5 hover:bg-gray-700 rounded-lg transition-colors group"
                              title="Copy API key"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-400" />
                              ) : (
                                <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-200" />
                              )}
                            </button>
                          </div>
                        </div>
                        {copied && (
                          <div className="flex items-center space-x-2 text-green-400 animate-in fade-in duration-200">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              API key copied to clipboard!
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 md:mt-8 bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 md:p-6">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-gray-300 mb-3">
                              Security Best Practices
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start space-x-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                <span>
                                  Never commit your API key to version control
                                </span>
                              </li>
                              <li className="flex items-start space-x-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                <span>
                                  Use environment variables to store your key
                                </span>
                              </li>
                              <li className="flex items-start space-x-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                <span>Rotate your API key regularly</span>
                              </li>
                              <li className="flex items-start space-x-2 text-sm text-gray-300">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>
                                <span>
                                  Monitor usage for suspicious activity
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
                {isLoadingStats ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-gray-500 animate-spin" />
                  </div>
                ) : statsError ? (
                  <div className="text-center py-12 mb-8">
                    <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <p className="text-red-400 font-medium">{statsError}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Activity className="w-5 md:w-6 h-5 md:h-6 text-gray-400" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                          Live
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-medium mb-1">
                        Total Requests
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        {stats.totalRequests.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 md:w-12 h-10 md:h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 md:w-6 h-5 md:h-6 text-green-400" />
                        </div>
                        <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                          {stats.successRate >= 95 ? "Healthy" : "Monitor"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-medium mb-1">
                        Success Rate
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        {stats.successRate}%
                      </p>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <Clock className="w-5 md:w-6 h-5 md:h-6 text-gray-400" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                          Avg
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-medium mb-1">
                        Avg Response Time
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        {Math.round(stats.avgResponseTime)}ms
                      </p>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 md:w-12 h-10 md:h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-5 md:w-6 h-5 md:h-6 text-gray-400" />
                        </div>
                        <span className="text-xs font-medium text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                          Active
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-medium mb-1">
                        Active Endpoints
                      </p>
                      <p className="text-2xl md:text-3xl font-bold text-white">
                        {stats.activeEndpoints}
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-800 mb-8 overflow-hidden">
                  <div className="border-b border-gray-800 overflow-x-auto">
                    <div className="flex min-w-max">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-6 py-4 font-medium transition-colors relative whitespace-nowrap ${
                          activeTab === "overview"
                            ? "text-white bg-gray-800"
                            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                        }`}
                      >
                        Overview
                        {activeTab === "overview" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("logs")}
                        className={`px-6 py-4 font-medium transition-colors relative whitespace-nowrap ${
                          activeTab === "logs"
                            ? "text-white bg-gray-800"
                            : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                        }`}
                      >
                        Live Logs
                        {activeTab === "logs" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {activeTab === "overview" && (
                    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                      {isLoadingOverview ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="w-8 h-8 text-gray-500 animate-spin mb-4" />
                          <p className="text-gray-400 font-medium">
                            Loading overview data...
                          </p>
                        </div>
                      ) : overviewError ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                          </div>
                          <p className="text-red-400 font-medium mb-4">
                            {overviewError}
                          </p>
                          <button
                            onClick={() => {
                              setActiveTab("overview");
                            }}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Retry
                          </button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-4">
                              Request Volume
                            </h3>
                            {usageData.length > 0 &&
                            usageData[0].time !== "No Data" ? (
                              <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={usageData}>
                                  <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#374151"
                                  />
                                  <XAxis dataKey="time" stroke="#9ca3af" />
                                  <YAxis stroke="#9ca3af" />
                                  <Tooltip
                                    contentStyle={{
                                      backgroundColor: "#1f2937",
                                      border: "1px solid #374151",
                                      borderRadius: "8px",
                                      color: "#fff",
                                    }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="requests"
                                    stroke="#d1d5db" // light gray
                                    strokeWidth={3}
                                    dot={{ fill: "#d1d5db", r: 4 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="errors"
                                    stroke="#ef4444" // red
                                    strokeWidth={2}
                                    dot={{ fill: "#ef4444", r: 3 }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            ) : (
                              <div className="flex items-center justify-center h-64 bg-gray-800/30 rounded-lg">
                                <p className="text-gray-500">
                                  No request data available
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-4">
                                Endpoint Distribution
                              </h3>
                              {endpointData.length > 0 &&
                              endpointData[0].name !== "No Data" ? (
                                <ResponsiveContainer width="100%" height={300}>
                                  <PieChart>
                                    <Pie
                                      data={endpointData}
                                      cx="50%"
                                      cy="50%"
                                      outerRadius={100}
                                      dataKey="value"
                                      label={({ name, percent }) =>
                                        name
                                          ? `${name.substring(0, 20)}${
                                              name.length > 20 ? "..." : ""
                                            } ${(percent * 100).toFixed(0)}%`
                                          : ""
                                      }
                                    >
                                      {endpointData.map((entry, index) => (
                                        <Cell
                                          key={`cell-${index}`}
                                          fill={entry.color}
                                        />
                                      ))}
                                    </Pie>
                                    <Tooltip
                                      contentStyle={{
                                        backgroundColor: "white",
                                        border: "1px solid #374151",
                                        borderRadius: "8px",
                                        color: "#fff",
                                      }}
                                    />
                                  </PieChart>
                                </ResponsiveContainer>
                              ) : (
                                <div className="flex items-center justify-center h-64 bg-gray-800/30 rounded-lg">
                                  <p className="text-gray-500">
                                    No endpoint data available
                                  </p>
                                </div>
                              )}
                            </div>

                            <div>
                              <h3 className="text-lg font-semibold text-white mb-4">
                                Requests by Endpoint
                              </h3>
                              {endpointData.length > 0 &&
                              endpointData[0].name !== "No Data" ? (
                                <div className="space-y-3">
                                  {endpointData.map((endpoint, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div
                                          className="w-3 h-3 rounded-full flex-shrink-0"
                                          style={{
                                            backgroundColor: endpoint.color,
                                          }}
                                        />
                                        <span
                                          className="font-medium text-gray-300 text-sm truncate"
                                          title={endpoint.name}
                                        >
                                          {endpoint.name}
                                        </span>
                                      </div>
                                      <span className="text-white font-semibold ml-3">
                                        {endpoint.value.toLocaleString()}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-64 bg-gray-800/30 rounded-lg">
                                  <p className="text-gray-500">
                                    No endpoint data available
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {activeTab === "logs" && (
                    <div className="p-4 md:p-6">
                      <div className="mb-6 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <svg
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                            <input
                              type="text"
                              placeholder="Search endpoints, methods..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-800 transition-all"
                            />
                          </div>
                          <div className="flex gap-2">
                            <select
                              value={filterStatus}
                              onChange={(e) => setFilterStatus(e.target.value)}
                              className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                              <option value="all">All Status</option>
                              <option value="success">Success</option>
                              <option value="error">Errors</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto -mx-4 md:mx-0">
                        {isLoadingLogs ? (
                          <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-gray-500 animate-spin mb-4" />
                            <p className="text-gray-400 font-medium">
                              Loading logs...
                            </p>
                          </div>
                        ) : logsError ? (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                              <AlertCircle className="w-8 h-8 text-red-400" />
                            </div>
                            <p className="text-red-400 font-medium">
                              {logsError}
                            </p>
                            <button
                              onClick={() => {
                                const fetchLogs = async () => {
                                  if (!session?.user?.apikey) return;
                                  setIsLoadingLogs(true);
                                  setLogsError(null);
                                  try {
                                    const apikey = session?.user?.apikey;
                                    const response = await axios.get(
                                      `/api/usage/stats?apikey=${apikey}`
                                    );
                                    if (
                                      response.data?.logs &&
                                      Array.isArray(response.data.logs)
                                    ) {
                                      setRecentLogs(response.data.logs);
                                    }
                                  } catch (error) {
                                    console.error(
                                      "Error fetching logs:",
                                      error
                                    );
                                    setLogsError(
                                      error.response?.data?.message ||
                                        "Failed to fetch logs"
                                    );
                                  } finally {
                                    setIsLoadingLogs(false);
                                  }
                                };
                                fetchLogs();
                              }}
                              className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Retry
                            </button>
                          </div>
                        ) : (
                          <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden">
                              <table className="min-w-full">
                                <thead>
                                  <tr className="text-left border-b border-gray-800">
                                    <th className="pb-3 px-4 md:px-0 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                      Method
                                    </th>
                                    <th className="pb-3 px-4 md:px-0 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                      Endpoint
                                    </th>
                                    <th className="pb-3 px-4 md:px-0 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                      Status
                                    </th>
                                    <th className="pb-3 px-4 md:px-0 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                      Response Time(in ms)
                                    </th>
                                    <th className="pb-3 px-4 md:px-0 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                      Timestamp
                                    </th>
                                    <th className="pb-3 px-4 md:px-0 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                      IP
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                  {filteredLogs.map((log, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-gray-800/50 transition-colors"
                                    >
                                      <td className="py-4 px-4 md:px-0">
                                        <span
                                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getMethodColor(
                                            log.method
                                          )}`}
                                        >
                                          {log.method}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4 md:px-0 font-mono text-sm text-gray-300 whitespace-nowrap">
                                        {log.endpoint}
                                      </td>
                                      <td className="py-4 px-4 md:px-0">
                                        <span
                                          className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(
                                            log.status_code
                                          )}`}
                                        >
                                          {log.status_code}
                                        </span>
                                      </td>
                                      <td className="py-4 px-4 md:px-0 text-sm text-gray-400 whitespace-nowrap">
                                        {log.response_time_ms}
                                      </td>
                                      <td className="py-4 px-4 md:px-0 text-sm text-gray-500 whitespace-nowrap">
                                        {new Date(log.timestamp).toLocaleString(
                                          "en-IN",
                                          {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                          }
                                        )}
                                      </td>
                                      <td className="py-4 px-4 md:px-0 font-mono text-xs text-gray-500 whitespace-nowrap">
                                        {log.ip}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>

                      {filteredLogs.length === 0 &&
                        !isLoadingLogs &&
                        !logsError && (
                          <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg
                                className="w-8 h-8 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                            <p className="text-gray-400 font-medium">
                              No logs found
                            </p>
                            <p className="text-gray-500 text-sm mt-1">
                              Try adjusting your search or filters
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default APIAnalyticsDashboard;
