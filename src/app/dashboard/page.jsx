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
import { useRouter } from "next/navigation";
import { useSession , signOut} from "next-auth/react";
import {toast } from "react-hot-toast"

const APIAnalyticsDashboard = () => {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("summary");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apikey, setApikey] = useState("");



  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [stats, setStats] = useState({
    totalRequests: 12847,
    successRate: 98.2,
    avgResponseTime: 142,
    activeEndpoints: 24,
  });

  const [usageData] = useState([
    { time: "00:00", requests: 245, errors: 3 },
    { time: "04:00", requests: 189, errors: 2 },
    { time: "08:00", requests: 523, errors: 8 },
    { time: "12:00", requests: 842, errors: 12 },
    { time: "16:00", requests: 967, errors: 15 },
    { time: "20:00", requests: 678, errors: 7 },
  ]);

  const [endpointData] = useState([
    { name: "/api/users", value: 3420, color: "#3b82f6" },
    { name: "/api/products", value: 2890, color: "#8b5cf6" },
    { name: "/api/orders", value: 2245, color: "#ec4899" },
    { name: "/api/analytics", value: 1892, color: "#10b981" },
    { name: "Others", value: 2400, color: "#6b7280" },
  ]);

  const [recentLogs, setRecentLogs] = useState([
    {
      id: 1,
      method: "GET",
      endpoint: "/api/users/profile",
      status: 200,
      time: "2.3s",
      timestamp: "14:32:15",
      ip: "192.168.1.45",
    },
    {
      id: 2,
      method: "POST",
      endpoint: "/api/orders/create",
      status: 201,
      time: "3.1s",
      timestamp: "14:31:58",
      ip: "192.168.1.67",
    },
    {
      id: 3,
      method: "GET",
      endpoint: "/api/products/search",
      status: 200,
      time: "1.8s",
      timestamp: "14:31:42",
      ip: "192.168.1.89",
    },
    {
      id: 4,
      method: "DELETE",
      endpoint: "/api/users/123",
      status: 204,
      time: "1.2s",
      timestamp: "14:31:25",
      ip: "192.168.1.34",
    },
    {
      id: 5,
      method: "PUT",
      endpoint: "/api/products/456",
      status: 200,
      time: "2.7s",
      timestamp: "14:30:59",
      ip: "192.168.1.23",
    },
    {
      id: 6,
      method: "GET",
      endpoint: "/api/analytics/daily",
      status: 500,
      time: "5.4s",
      timestamp: "14:30:38",
      ip: "192.168.1.56",
    },
    {
      id: 7,
      method: "POST",
      endpoint: "/api/auth/login",
      status: 200,
      time: "1.9s",
      timestamp: "14:30:12",
      ip: "192.168.1.78",
    },
    {
      id: 8,
      method: "GET",
      endpoint: "/api/orders/list",
      status: 200,
      time: "2.1s",
      timestamp: "14:29:45",
      ip: "192.168.1.90",
    },
  ]);

  const handleLogout = () => {
     signOut({ callbackUrl: '/' });
     toast.success("User Logged out successfully", {duration:1000})
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

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 5),
        avgResponseTime: Math.max(
          100,
          prev.avgResponseTime + (Math.random() - 0.5) * 10
        ),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return "text-green-600 bg-green-50";
    if (status >= 400 && status < 500) return "text-yellow-600 bg-yellow-50";
    if (status >= 500) return "text-red-600 bg-red-50";
    return "text-gray-600 bg-gray-50";
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: "text-blue-600 bg-blue-50",
      POST: "text-green-600 bg-green-50",
      PUT: "text-yellow-600 bg-yellow-50",
      DELETE: "text-red-600 bg-red-50",
      PATCH: "text-purple-600 bg-purple-50",
    };
    return colors[method] || "text-gray-600 bg-gray-50";
  };

  const filteredLogs = recentLogs.filter((log) => {
    const matchesSearch =
      log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.method.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "success" && log.status >= 200 && log.status < 300) ||
      (filterStatus === "error" && log.status >= 400);
    return matchesSearch && matchesFilter;
  });

  //sessions
  const { data: session, status } = useSession();
 
 //authorization based on the sessions
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
 
  if (status === "authenticated") {
     return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-20"
          } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col relative`}
        >
          {/* Collapse Button - Centered */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors shadow-md hover:shadow-lg z-10"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-600" />
            )}
          </button>

          <div className="p-6 border-b border-slate-200">
            <div
              className={`flex items-center ${
                sidebarOpen ? "space-x-3" : "justify-center"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-6 h-6 text-white" />
              </div>
              {sidebarOpen && (
                <div>
                  <h2 className="text-xl font-bold text-slate-900">API Hub</h2>
                  <p className="text-xs text-slate-500">Analytics Platform</p>
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
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              title={!sidebarOpen ? "Setup" : ""}
            >
              <Key className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Setup</span>}
            </button>

            <button
              onClick={() => setActiveSection("summary")}
              className={`w-full flex items-center ${
                sidebarOpen ? "space-x-3" : "justify-center"
              } px-4 py-3 rounded-lg transition-all ${
                activeSection === "summary"
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              title={!sidebarOpen ? "Summary" : ""}
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Summary</span>}
            </button>
          </nav>

          {/* User Info Section */}
          <div className="p-4 border-t border-slate-200 space-y-4">
            {sidebarOpen && session?.user && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">
                  Account
                </p>
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {session.user.username}
                </p>
                <p className="text-xs text-slate-600 truncate mt-1">
                  {session.user.email}
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${
                sidebarOpen ? "justify-center space-x-2" : "justify-center"
              } px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium shadow-md hover:shadow-lg`}
              title={!sidebarOpen ? "Logout" : ""}
            >
              <LogOut className="w-4 h-4" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors md:hidden"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                      {activeSection === "setup"
                        ? "API Setup"
                        : "API Analytics"}
                    </h1>
                    <p className="text-sm text-slate-500">
                      {activeSection === "setup"
                        ? "Manage your API credentials"
                        : "Real-time monitoring & insights"}
                    </p>
                  </div>
                </div>
                {activeSection === "summary" && (
                  <select
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="1h">Last Hour</option>
                    <option value="24h">Last 24 Hours</option>
                    <option value="7d">Last 7 Days</option>
                    <option value="30d">Last 30 Days</option>
                  </select>
                )}
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            {activeSection === "setup" ? (
              <div className="h-full flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-3xl">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <Key className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            API Key
                          </h2>
                          <p className="text-white">weclome back , {session.user.username}</p>
                          <p className="text-blue-100 text-sm mt-1">
                            Secure access to your API service
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      {/* Warning Message */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-5 mb-8">
                        <div className="flex items-start space-x-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900 mb-1">
                              Important Security Notice
                            </h3>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              Your API key provides access to the API service.
                              Keep it secure and never share it publicly.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* API Key Input */}
                      <div className="space-y-3">
                        <label className="block text-sm font-semibold text-slate-900">
                          Your API Key 
                        </label>
                        <div className="relative">
                          <input
                            type={apiKeyVisible ? "text" : "password"}
                            value={session.user.apikey}
                            readOnly
                            className="w-full px-4 py-4 pr-28 bg-slate-50 border-2 border-slate-200 rounded-xl font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                          />
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                            <button
                              onClick={() => setApiKeyVisible(!apiKeyVisible)}
                              className="p-2.5 hover:bg-slate-200 rounded-lg transition-colors group"
                              title={
                                apiKeyVisible ? "Hide API key" : "Show API key"
                              }
                            >
                              {apiKeyVisible ? (
                                <EyeOff className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                              ) : (
                                <Eye className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                              )}
                            </button>
                            <button
                              onClick={handleCopyApiKey}
                              className="p-2.5 hover:bg-slate-200 rounded-lg transition-colors group"
                              title="Copy API key"
                            >
                              {copied ? (
                                <Check className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4 text-slate-600 group-hover:text-slate-900" />
                              )}
                            </button>
                          </div>
                        </div>
                        {copied && (
                          <div className="flex items-center space-x-2 text-green-600 animate-in fade-in duration-200">
                            <Check className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              API key copied to clipboard!
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Security Best Practices */}
                      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-amber-900 mb-3">
                              Security Best Practices
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start space-x-2 text-sm text-amber-900">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></span>
                                <span>
                                  Never commit your API key to version control
                                </span>
                              </li>
                              <li className="flex items-start space-x-2 text-sm text-amber-900">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></span>
                                <span>
                                  Use environment variables to store your key
                                </span>
                              </li>
                              <li className="flex items-start space-x-2 text-sm text-amber-900">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></span>
                                <span>Rotate your API key regularly</span>
                              </li>
                              <li className="flex items-start space-x-2 text-sm text-amber-900">
                                <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></span>
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
              <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        +12.3%
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Total Requests
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {stats.totalRequests.toLocaleString()}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        +0.5%
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Success Rate
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {stats.successRate}%
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
                        -2.1ms
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Avg Response Time
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {Math.round(stats.avgResponseTime)}ms
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                        47 errors
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 font-medium mb-1">
                      Active Endpoints
                    </p>
                    <p className="text-3xl font-bold text-slate-900">
                      {stats.activeEndpoints}
                    </p>
                  </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl border border-slate-200 mb-8 overflow-hidden">
                  <div className="border-b border-slate-200">
                    <div className="flex">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`px-6 py-4 font-medium transition-colors relative ${
                          activeTab === "overview"
                            ? "text-blue-600 bg-blue-50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        Overview
                        {activeTab === "overview" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                        )}
                      </button>
                      <button
                        onClick={() => setActiveTab("logs")}
                        className={`px-6 py-4 font-medium transition-colors relative ${
                          activeTab === "logs"
                            ? "text-blue-600 bg-blue-50"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        Live Logs
                        {activeTab === "logs" && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  {activeTab === "overview" && (
                    <div className="p-6 space-y-8">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-4">
                          Request Volume
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={usageData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#e2e8f0"
                            />
                            <XAxis dataKey="time" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "white",
                                border: "1px solid #e2e8f0",
                                borderRadius: "8px",
                              }}
                            />
                            <Line
                              type="monotone"
                              dataKey="requests"
                              stroke="#3b82f6"
                              strokeWidth={3}
                              dot={{ fill: "#3b82f6", r: 4 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="errors"
                              stroke="#ef4444"
                              strokeWidth={2}
                              dot={{ fill: "#ef4444", r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            Top Endpoints
                          </h3>
                          <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                              <Pie
                                data={endpointData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                dataKey="value"
                                label={({ name, percent }) =>
                                  `${name} ${(percent * 100).toFixed(0)}%`
                                }
                              >
                                {endpointData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-4">
                            Requests by Endpoint
                          </h3>
                          <div className="space-y-3">
                            {endpointData.map((endpoint, i) => (
                              <div
                                key={i}
                                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: endpoint.color }}
                                  />
                                  <span className="font-medium text-slate-700 text-sm">
                                    {endpoint.name}
                                  </span>
                                </div>
                                <span className="text-slate-900 font-semibold">
                                  {endpoint.value.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "logs" && (
                    <div className="p-6">
                      <div className="mb-6 space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="relative flex-1">
                            <svg
                              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
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
                              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                          </div>
                          <div className="flex gap-2">
                            <select
                              value={filterStatus}
                              onChange={(e) => setFilterStatus(e.target.value)}
                              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="all">All Status</option>
                              <option value="success">Success</option>
                              <option value="error">Errors</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left border-b border-slate-200">
                              <th className="pb-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Method
                              </th>
                              <th className="pb-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Endpoint
                              </th>
                              <th className="pb-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="pb-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Time
                              </th>
                              <th className="pb-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                Timestamp
                              </th>
                              <th className="pb-3 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                                IP
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {filteredLogs.map((log) => (
                              <tr
                                key={log.id}
                                className="hover:bg-slate-50 transition-colors"
                              >
                                <td className="py-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getMethodColor(
                                      log.method
                                    )}`}
                                  >
                                    {log.method}
                                  </span>
                                </td>
                                <td className="py-4 font-mono text-sm text-slate-700">
                                  {log.endpoint}
                                </td>
                                <td className="py-4">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                      log.status
                                    )}`}
                                  >
                                    {log.status}
                                  </span>
                                </td>
                                <td className="py-4 text-sm text-slate-600">
                                  {log.time}
                                </td>
                                <td className="py-4 text-sm text-slate-500">
                                  {log.timestamp}
                                </td>
                                <td className="py-4 font-mono text-xs text-slate-500">
                                  {log.ip}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {filteredLogs.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                              className="w-8 h-8 text-slate-400"
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
                          <p className="text-slate-600 font-medium">
                            No logs found
                          </p>
                          <p className="text-slate-500 text-sm mt-1">
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