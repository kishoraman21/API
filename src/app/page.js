"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast"

import {
  Activity,
  Zap,
  Shield,
  BarChart3,
  TrendingUp,
  Clock,
  Eye,
  Code,
  ArrowRight,
  Check,
  Github,
  Twitter,
  Linkedin,
  ChevronDown,
} from "lucide-react";

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [particles, setParticles] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const router = useRouter()
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  

  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Real-time Monitoring",
      description:
        "Track every API request as it happens with live updates and instant notifications.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description:
        "Dive deep into usage patterns with comprehensive charts and metrics.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Error Tracking",
      description:
        "Identify and resolve issues quickly with detailed error logs and alerts.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Performance Insights",
      description:
        "Monitor response times and optimize your API for peak performance.",
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Complete Visibility",
      description:
        "Get full transparency into API calls with detailed request and response data.",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Developer Friendly",
      description:
        "Easy integration with any tech stack. Start monitoring in minutes.",
    },
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for side projects",
      features: [
        "Up to 500 requests/month",
        "7-day log retention",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      description: "For growing teams",
      features: [
        "Up to 500,000 requests/month",
        "90-day log retention",
        "Advanced analytics",
        "Priority support",
        "Custom alerts",
        "Team collaboration",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited requests",
        "Unlimited log retention",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
        "On-premise option",
      ],
    },
  ];

  const faqs = [
    {
      question: "How do I integrate API Analytics with my application?",
      answer:
        "Integration is simple! Install our SDK via npm, add a single line of code to initialize it with your API key, and you're ready to go. We support Node.js, Python, Ruby, Go, and more. Full documentation is available for all platforms.",
    },
    {
      question: "What happens if I exceed my plan limits?",
      answer:
        "We'll notify you when you're approaching your limit. You can upgrade at any time, or if you temporarily exceed your limit, we'll continue tracking with a small overage fee. No data is lost or dropped.",
    },
    {
      question: "How long is API data stored?",
      answer:
        "Data retention depends on your plan: 7 days for Starter, 90 days for Pro, and unlimited for Enterprise. You can also export your data at any time for long-term storage.",
    },
    {
      question: "Is my API data secure?",
      answer:
        "Absolutely! We use end-to-end encryption, SOC 2 Type II certified infrastructure, and never store sensitive request/response bodies unless explicitly configured. Your data privacy is our top priority.",
    },
    {
      question: "Can I monitor multiple APIs or environments?",
      answer:
        "Yes! You can create separate projects for different APIs or environments (production, staging, development). Each project has its own API key and isolated data.",
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer:
        "Yes! Enterprise plans include custom integrations, on-premise deployment options, dedicated support, and SLA guarantees. Contact our sales team to discuss your specific requirements.",
    },
  ];

  const stats = [
    { value: "10M+", label: "API Calls Tracked" },
    { value: "99.9%", label: "Uptime" },
    { value: "500+", label: "Happy Customers" },
    { value: "<50ms", label: "Avg Latency" },
  ];

  const onGEtStarted = ()=>{
    toast.loading("Redirecting to Login" , {duration: 1000})
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Grid Background with Animated Particles */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(51, 65, 85, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(51, 65, 85, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />

        {/* Animated Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: `radial-gradient(circle, rgba(249, 115, 22, 0.6), rgba(239, 68, 68, 0.3))`,
              animation: `float ${particle.duration}s ease-in-out infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes slideIn {
          from {
            transform: scaleX(0);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .nav-link {
          position: relative;
          display: inline-block;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #f97316, #dc2626);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease-out;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .get-started-btn {
          position: relative;
          overflow: hidden;
        }

        .get-started-btn::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, #fbbf24, #f59e0b);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease-out;
        }

        .get-started-btn:hover::before {
          transform: scaleX(1);
        }

        .feature-card {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .feature-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .feature-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .feature-card:nth-child(3) {
          animation-delay: 0.3s;
        }
        .feature-card:nth-child(4) {
          animation-delay: 0.4s;
        }
        .feature-card:nth-child(5) {
          animation-delay: 0.5s;
        }
        .feature-card:nth-child(6) {
          animation-delay: 0.6s;
        }

        .pricing-card {
          opacity: 0;
          animation: scaleIn 0.6s ease-out forwards;
        }

        .pricing-card:nth-child(1) {
          animation-delay: 0.1s;
        }
        .pricing-card:nth-child(2) {
          animation-delay: 0.2s;
        }
        .pricing-card:nth-child(3) {
          animation-delay: 0.3s;
        }
      `}</style>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-slate-800/50 backdrop-blur-sm bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 animate-fade-in-up">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">API Analytics</span>
            </div>

            <div
              className="flex items-center space-x-5 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#pricing"
                  className="nav-link text-slate-300 hover:text-white transition-colors"
                >
                  Pricing
                </a>
                <a
                  href="#"
                  className="nav-link text-slate-300 hover:text-white transition-colors mx-1"
                >
                  Docs
                </a>
                <a
                  href="/contactus"
                  className="nav-link text-slate-300 hover:text-white transition-colors mx-1"
                >
                  Support
                </a>
              </div>
              <button 
              onClick= {onGEtStarted}
              className="get-started-btn px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-medium transition-all hover:scale-105 shadow-lg shadow-orange-500/25">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full mb-8 backdrop-blur-sm animate-fade-in-up">
              <span className="text-sm text-orange-400 font-medium">
                Now with real-time analytics
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Monitor Your APIs
              <span className="block bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>

            <p
              className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Track every API call, analyze performance metrics, and get
              actionable insights with our powerful monitoring platform.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center space-x-2 shadow-lg shadow-orange-500/25">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Dashboard Preview */}
        <div
          className="max-w-6xl mx-auto px-6 mt-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur-3xl opacity-20" />
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 shadow-2xl hover:scale-[1.02] transition-transform duration-500">
              <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                <div className="flex items-center space-x-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 text-center text-sm text-slate-500">
                    dashboard.apianalytics.io
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-slate-800/50 rounded-lg border border-slate-700 animate-pulse"
                      />
                    ))}
                  </div>
                  <div className="h-64 bg-slate-800/50 rounded-lg border border-slate-700 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-32 border-t border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to Monitor Your APIs
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful features designed to give you complete visibility and
              control over your API infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="feature-card group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 text-orange-400 group-hover:bg-orange-500/20 transition-all duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="relative z-10 py-32 border-t border-slate-800/50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day
              free trial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => {
              // MODIFIED: Include the last plan's name here (e.g., 'Business' or 'Enterprise')
              const isComingSoon =
                plan.name === "Pro" || plan.name === "Enterprise";

              // Determine card classes: ALL cards now use the orange border style
              const cardClasses = `
                    pricing-card relative bg-slate-900 backdrop-blur-sm border rounded-xl p-8 
                    transition-all duration-300 group
                    border-orange-500 scale-105 shadow-lg shadow-orange-500/20
                    hover:scale-[1.07] hover:shadow-xl
                `;

              // Determine button text
              const buttonText = isComingSoon
                ? "Coming Soon"
                : plan.price === "Custom"
                ? "Contact Sales"
                : "Get Started Free";

              return (
                <div key={i} className={cardClasses}>
                  {/* COMING SOON OVERLAY (for Pro and Business) */}
                  {isComingSoon && (
                    <div className="absolute inset-0 bg-slate-950/70 rounded-xl z-20 pointer-events-none">
                      {/* Optional: Subtle visual effect inside the overlay if needed */}
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="mb-6 relative z-10">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && plan.price !== "Free" && (
                        <span className="text-slate-400 ml-2">/month</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 relative z-10">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-lg font-semibold transition-all relative z-10 ${
                      isComingSoon
                        ? "bg-slate-700 cursor-not-allowed text-slate-300" // Disabled look
                        : plan.popular
                        ? "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/25 hover:scale-105"
                        : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:scale-105"
                    }`}
                    disabled={isComingSoon} // Disable the button
                  >
                    {buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        id="faq"
        className="relative z-10 py-32 border-t border-slate-800/50"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-400">
              Everything you need to know about API Analytics
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                // Make the container a 'group' so hover effects can apply to children
                className="group backdrop-blur-sm border-b border-slate-800/50 overflow-hidden transition-all duration-300 animate-fade-in-up"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors border-l-4 border-transparent group-hover:border-orange-500"
                >
                  <span className="font-medium text-lg text-white pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === i ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-5 text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your APIs?
          </h2>
          <p className="text-xl text-slate-400 mb-12">
            Join hundreds of developers who trust API Analytics for their
            monitoring needs.
          </p>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">API Analytics</span>
              </div>
              <p className="text-slate-400 text-sm">
                The modern way to monitor and analyze your API performance.
              </p>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-slate-400 text-sm">
              © 2025 API Analytics. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a
                href="https://x.com/kishoraman21"
                className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-125"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/kishoraman21"
                className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-125"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-125"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
