"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Info,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DocsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedSections, setExpandedSections] = useState({
    setup: true,
    resources: true,
  });
  const sectionRefs = useRef({});

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Intersection Observer to detect active section while scrolling
  useEffect(() => {
    const mainContent = document.querySelector("main");

    if (!mainContent) return;

    const observerOptions = {
      root: mainContent,
      rootMargin: "0px 0px -80% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Small delay to ensure refs are set
    setTimeout(() => {
      Object.keys(sectionRefs.current).forEach((key) => {
        if (sectionRefs.current[key]) {
          observer.observe(sectionRefs.current[key]);
        }
      });
    }, 100);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth scroll to section when sidebar item is clicked
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    const mainContent = document.querySelector("main");

    if (element && mainContent) {
      const elementTop = element.offsetTop;
      mainContent.scrollTo({
        top: elementTop - 100,
        behavior: "smooth",
      });
    }
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const navigation = [
    {
      title: "INTRODUCTION",
      items: [{ id: "getting-started", label: "Getting Started" }],
    },
    {
      title: "SETUP",
      key: "setup",
      expandable: true,
      items: [
        { id: "installation", label: "Installation" },
        { id: "configuration", label: "Configuration" },
      ],
    },
    {
      title: "RESOURCES",
      key: "resources",
      expandable: true,
      items: [
        { id: "pricing", label: "Pricing" },
        { id: "faqs", label: "FAQs" },
      ],
    },
  ];

  const router = useRouter();
  const login = () => {
    router.push("/login");
  };
  const home = () => {
    router.push("/");
  };

  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <button onClick={home}>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <Activity className="w-6 h-6 text-black" />
                </div>
                <span className="text-xl font-bold">ApiDeck</span>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={login}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              GET STARTED
            </button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`
          fixed top-16 left-0 bottom-0 w-64 bg-black border-r border-gray-800 overflow-y-auto
          transition-transform duration-300 z-40
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
        >
          <nav className="p-6 space-y-6">
            {navigation.map((section, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 tracking-wider">
                    {section.title}
                  </h3>
                  {section.expandable && (
                    <button onClick={() => toggleSection(section.key)}>
                      {expandedSections[section.key] ? (
                        <ChevronDown size={16} className="text-gray-500" />
                      ) : (
                        <ChevronRight size={16} className="text-gray-500" />
                      )}
                    </button>
                  )}
                </div>
                {(!section.expandable || expandedSections[section.key]) && (
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollToSection(item.id)}
                          className={`
                            w-full text-left px-3 py-2 rounded-lg transition-colors
                            ${
                              activeSection === item.id
                                ? "bg-orange-900/30 text-orange-400 font-medium"
                                : "text-gray-400 hover:text-white hover:bg-gray-900/50"
                            }
                          `}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-0 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="p-8 md:p-12 max-w-5xl mx-auto space-y-16 pb-16">
            {/* Getting Started Section */}
            <section
              id="getting-started"
              ref={(el) => (sectionRefs.current["getting-started"] = el)}
            >
              <div className="space-y-8">
                <div>
                  <div className="inline-block bg-orange-500 text-white text-sm px-3 py-1 rounded-full mb-4">
                    SDK v1.0.0
                  </div>
                  <h1 className="text-5xl font-bold text-white mb-4">
                    ApiDeck Documentation
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Instantly monitor your APIs and track performance metrics in
                    real-time.
                  </p>
                </div>

                <div className="pt-8">
                  <h2 className="text-3xl font-bold text-white mb-6">
                    Getting Started
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    ApiDeck is a powerful API monitoring SDK that tracks every
                    API call, analyzes performance metrics, and provides
                    actionable insights. This documentation will guide you
                    through setting up and configuring ApiDeck in your project.
                  </p>

                  <div className="bg-orange-950/30 border border-orange-900/50 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-orange-400 font-semibold mb-2">
                          Note
                        </h3>
                        <p className="text-gray-300">
                          You&apos;ll need to sign up for an ApiDeck account to get
                          your API key before proceeding with the installation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="pt-4">
                   <h2 className="text-2xl font-bold text-white mb-4">
                    Get Your API Key
                  </h2>
                  <p className="text-gray-300 mb-4">
                   1. Signup and create an APiDeck account.
                  </p>
                  <p className="text-gray-300 mb-4">
                    2. Log in to your dashboard. Your unique apikey will be automatically generated and displayed.
                  </p>
                  <p className="text-gray-300 mb-4">
                  3. Now use this apikey in the backend setup.
                  </p>
                </div>

            {/* Installation Section */}
            <section
              id="installation"
              ref={(el) => (sectionRefs.current["installation"] = el)}
            >
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Installation
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Install the ApiDeck SDK using npm, yarn:
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="bg-gray-900 rounded-t-lg px-4 py-2 border-b border-orange-400 ">
                      <span className="text-gray-400 text-sm font-mono">
                        npm
                      </span>
                    </div>
                    <div className="bg-black rounded-b-lg p-4">
                      <code className="text-green-400 font-mono text-sm">
                        npm install apideck
                      </code>
                    </div>
                  </div>

                  <div>
                    <div className="bg-gray-900 rounded-t-lg px-4 py-2 border-b border-orange-400 ">
                      <span className="text-gray-400 text-sm font-mono">
                        yarn
                      </span>
                    </div>
                    <div className="bg-black rounded-b-lg p-4">
                      <code className="text-green-400 font-mono text-sm">
                        yarn add apideck
                      </code>
                    </div>
                  </div>
                </div>


                


                <div className="pt-4">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Quick Setup
                  </h2>
                  <p className="text-gray-300 mb-4">
                    After installation, initialize ApiDeck in your application:
                  </p>

                  <div className="bg-gray-900 rounded-t-lg px-4 py-2 border-b border-orange-400">
                    <span className="text-gray-400 text-sm font-mono">
                      javascript
                    </span>
                  </div>
                  <div className="bg-black rounded-b-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
                      {`
import { apiTracker } from "apideck";

app.use(
  apiTracker({
    apikey: "YOUR_API_KEY",                 
    trackerUrl: "APIDECK_URL", 
  })
);
`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Configuration Section */}
            <section
              id="configuration"
              ref={(el) => (sectionRefs.current["configuration"] = el)}
            >
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Configuration
                  </h1>
                  <p className="text-gray-300 text-lg">
                    Configure ApiDeck to match your monitoring needs.
                  </p>
                </div>

                <div className="p-4">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Configuration Options
                  </h2>
                  <div className="overflow-x-auto bg-gray-900/50 rounded-lg border border-gray-800">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Option
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {/* Options from the image */}
                        <tr className="hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-orange-400">
                            apiKey
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            string
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            Your unique API key from the ApiDeck dashboard.
                          </td>
                        </tr>

                        <tr className="hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-orange-400">
                            trackerUrl
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            string
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">
                            The backend URL where usage data is sent for logging
                            and analytics.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </section>

            {/* Pricing Section */}
            <section
              id="pricing"
              ref={(el) => (sectionRefs.current["pricing"] = el)}
            >
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">
                    Pricing
                  </h1>
                  <p className="text-gray-300 text-lg mb-8">
                    Choose the plan that fits your monitoring needs.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800 hover:border-orange-500 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Starter
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">
                        Free
                      </span>

                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Up to 1,000 requests/month</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Basic analytics</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>7-day log retention</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Access to dashboard metrics</span>
                      </li>
                    </ul>
                    <button
                      onClick={login}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors"
                    >
                      Get Started
                    </button>
                  </div>

                  <div className="  blur-[2px]   bg-gradient-to-b from-orange-900/30 to-gray-900/50 rounded-lg p-6 border-2 border-orange-500 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold ">
                      Popular
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Professional
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">$99</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Up to 1M API calls/month</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Advanced analytics</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Priority support</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>30 days data retention</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Custom alerts</span>
                      </li>
                    </ul>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">
                      Coming Soon
                    </button>
                  </div>

                  <div className=" blur-[2px] bg-gray-900/50 rounded-lg p-6 border border-gray-800 hover:border-orange-500 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">
                      Enterprise
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">
                        Custom
                      </span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Unlimited API calls</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Custom analytics</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>24/7 dedicated support</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Custom data retention</span>
                      </li>
                      <li className="text-gray-300 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>SLA guarantees</span>
                      </li>
                    </ul>
                    <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg transition-colors">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* FAQs Section */}
            <section id="faqs" ref={(el) => (sectionRefs.current["faqs"] = el)}>
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-4">FAQs</h1>
                  <p className="text-gray-300 text-lg mb-8">
                    Frequently asked questions about ApiDeck.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      What is ApiDeck?
                    </h3>
                    <p className="text-gray-300">
                      ApiDeck is a comprehensive API monitoring SDK that helps
                      you track, analyze, and optimize your API performance in
                      real-time. It provides detailed insights into every API
                      call, helping you identify issues before they impact your
                      users.
                    </p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      How does ApiDeck track API calls?
                    </h3>
                    <p className="text-gray-300">
                      ApiDeck integrates seamlessly into your application
                      through our lightweight SDK. It automatically captures API
                      requests and responses, along with performance metrics,
                      and sends this data to your dashboard for analysis.
                    </p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Can I use ApiDeck in production?
                    </h3>
                    <p className="text-gray-300">
                      Absolutely! ApiDeck is designed for production
                      environments. Our SDK has minimal performance overhead and
                      includes features like sampling rates to ensure it doesn&apos;t
                      impact your application&apos;s performance.
                    </p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      What languages and frameworks are supported?
                    </h3>
                    <p className="text-gray-300">
                      ApiDeck currently supports Node.js (Express.js framework).
                      Support for additional frameworks such as Fastify, Koa,
                      and NestJS, as well as other languages like Python and Go,
                      is planned for future updates.
                    </p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      How secure is my data?
                    </h3>
                    <p className="text-gray-300">
                      We take security seriously. All data is encrypted in
                      transit and at rest. We never store sensitive information
                      like API keys or authentication tokens. You can also
                      configure what data gets sent to ApiDeck.
                    </p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Do I need to create any routes manually?
                    </h3>
                    <p className="text-gray-300">
                      No. You only need to provide the trackerUrl of your
                      backend where the data is collected. The SDK automatically
                      sends POST requests to the dedicated API.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        
        /* Custom scrollbar styling */
        main::-webkit-scrollbar {
          width: 12px;
        }
        
        main::-webkit-scrollbar-track {
          background: #000000;
        }
        
        main::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 6px;
          border: 2px solid #000000;
        }
        
        main::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
        
        /* Firefox scrollbar */
        main {
          scrollbar-width: thin;
          scrollbar-color: #f97316 #000000;
        }
      `}</style>
    </div>
  );
};

export default DocsPage;
