"use client";
import React, { useState } from "react";
import {
  Activity,
  Shield,
  BarChart3,
  Clock,
  Eye,
  Code,
  ArrowRight,
  Check,
  Github,
  Twitter,
  Linkedin,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import dashboard from "./dashboard.png";
import setup from "./sdksetup.png";
import logo from "./logo2.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll function
  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false);
  };

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
      description: "Ideal for personal or side projects",
      features: [
        "Up to 1,000 requests/month",
        "7-day log retention",
        "Basic API usage analytics",
        "Access to dashboard metrics",
        "Community support",
      ],
      available: true,
    },
    {
      name: "Pro",
      price: "$29 / month",
      description: "Best for growing developers or small teams",
      features: [
        "Up to 500,000 requests/month",
        "90-day log retention",
        "Advanced analytics & visual insights",
        "Real-time usage updates every minute",
        "Email notifications for API errors or downtime",
        "Priority email support",
        "Team collaboration (multiple API keys)",
      ],
      popular: true,
      available: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale applications and organizations",
      features: [
        "Unlimited requests",
        "Unlimited log retention",
        "Custom integrations and alerts (Slack, Webhooks, Email)",
        "Dedicated account manager & 24/7 support",
        "Custom SLAs and uptime guarantees",
        "On-premise or private cloud deployment",
        "Audit logs & compliance tools",
      ],
      available: false,
    },
  ];

  const faqs = [
    {
      question: "How do I integrate API Analytics with my application?",
      answer:
        "Integration is simple! Install our SDK via npm, add a single line of code to initialize it with your API key, and you're ready to go. We currenlty support Node.js. Full documentation is available .",
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
        "Absolutely! We use end-to-end encryption,  and never store sensitive request/response bodies unless explicitly configured. Your data privacy is our top priority.",
    },
    {
      question: "What languages and frameworks are supported?",
      answer:
        "ApiDeck currently supports Node.js (Express.js framework). Support for additional frameworks such as Fastify, Koa, and NestJS, as well as other languages like Python and Go, is planned for future updates.",
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer:
        "Yes! Enterprise plans include custom integrations, on-premise deployment options, dedicated support, and SLA guarantees. Contact our sales team to discuss your specific requirements.",
    },
  ];
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/login");
  };

  const handleContactUs = () => {
    // router.push("/contactus");
    window.location.href = "/contactus"
  };
  const docsPage = () => {
    // router.push("/docs");
    window.location.href = "/docs"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden font-['Outfit']">
      {/* Dot Pattern Background */}
      <div className="fixed inset-0 z-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

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

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .nav-link {
          position: relative;
          display: inline-block;
          cursor: pointer;
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

        .feature-card:nth-child(1) { animation-delay: 0.1s; }
        .feature-card:nth-child(2) { animation-delay: 0.2s; }
        .feature-card:nth-child(3) { animation-delay: 0.3s; }
        .feature-card:nth-child(4) { animation-delay: 0.4s; }
        .feature-card:nth-child(5) { animation-delay: 0.5s; }
        .feature-card:nth-child(6) { animation-delay: 0.6s; }

        .pricing-card {
          opacity: 0;
          animation: scaleIn 0.6s ease-out forwards;
        }

        .pricing-card:nth-child(1) { animation-delay: 0.1s; }
        .pricing-card:nth-child(2) { animation-delay: 0.2s; }
        .pricing-card:nth-child(3) { animation-delay: 0.3s; }

        html {
          scroll-behavior: smooth;
        }

        .hamburger {
          width: 24px;
          height: 20px;
          position: relative;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          width: 100%;
          height: 2px;
          background-color: white;
          transition: all 0.3s ease;
          display: block;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .mobile-menu {
          transform: translateX(100%);
          transition: transform 0.3s ease-in-out;
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        @media (max-width: 768px) {
          body {
            overflow-x: hidden;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="relative z-[500] bg-black/80 backdrop-blur-md border-b border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 animate-fade-in-up">
              
              <div className="w-11 h-12 bg-transparent rounded flex items-center justify-center">
                {/* <img src={logo.src} alt="ApiDeck Logo" /> */}
                <Image src={logo.src} alt="Apideck Logo" width={70} height={70} />
              </div>

              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                ApiDeck
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div
              className="hidden md:flex items-center space-x-8 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center space-x-8">
               
                <button
                  onClick={() => smoothScrollTo("pricing")}
                  className="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide"
                >
                  PRICING
                </button>
                <button
                  onClick={docsPage}
                  className="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide"
                >
                  DOCS
                </button>
                <button
                  onClick={handleContactUs}
                  className="nav-link text-gray-300 hover:text-white transition-colors text-sm font-medium uppercase tracking-wide"
                >
                  SUPPORT
                </button>
              </div>

              {/* Get Started Button */}
              <button
                onClick={handleGetStarted}
                className="get-started-btn px-5 py-2 bg-orange-500 text-black rounded font-semibold text-sm uppercase tracking-wide transition-all hover:scale-105 shadow-lg shadow-yellow-400/20"
              >
                GET STARTED
              </button>
            </div>

            {/* Mobile Menu Button & Get Started */}
            <div className="flex md:hidden items-center space-x-4">
              <button
                onClick={handleGetStarted}
                className="get-started-btn px-4 py-2 bg-orange-500 text-black rounded font-semibold text-xs uppercase tracking-wide transition-all hover:scale-105 shadow-lg shadow-yellow-400/20"
              >
                START
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`hamburger ${mobileMenuOpen ? "open" : ""}`}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>

       {/* Mobile Menu */}
       {mobileMenuOpen && (
          <div 
            className="fixed top-[73px] right-0 w-64 h-auto bg-black/98 backdrop-blur-xl border-l-2 border-t-2 border-orange-500/50 md:hidden z-[500] shadow-2xl shadow-orange-500/20 rounded-tl-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col p-6 space-y-3">
              {/* DOCS Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = "/docs";
                }}
                className="w-full text-left text-gray-300 hover:text-white hover:bg-orange-500/10 active:bg-orange-500/20 transition-all text-base font-medium uppercase tracking-wide py-4 px-4 border border-gray-700/50 hover:border-orange-500/50 cursor-pointer rounded-lg touch-manipulation"
              >
                DOCS
              </button>
              
              {/* PRICING Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => smoothScrollTo("pricing"), 150);
                }}
                className="w-full text-left text-gray-300 hover:text-white hover:bg-orange-500/10 active:bg-orange-500/20 transition-all text-base font-medium uppercase tracking-wide py-4 px-4 border border-gray-700/50 hover:border-orange-500/50 cursor-pointer rounded-lg touch-manipulation"
              >
                PRICING
              </button>
              
              {/* SUPPORT Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = "/contactus";
                }}
                className="w-full text-left text-gray-300 hover:text-white hover:bg-orange-500/10 active:bg-orange-500/20 transition-all text-base font-medium uppercase tracking-wide py-4 px-4 border border-gray-700/50 hover:border-orange-500/50 cursor-pointer rounded-lg touch-manipulation"
              >
                SUPPORT
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 sm:pt-32 pb-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up text-white"
              style={{ animationDelay: "0.1s" }}
            >
              Monitor Your APIs
              <span className="block text-orange-500">Like Never Before</span>
            </h1>

            <p
              className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up px-4"
              style={{ animationDelay: "0.2s" }}
            >
              Monitor performance, track uptime, and detect API issues before
              your users do — all from one powerful dashboard.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            ></div>
          </div>
        </div>

        {/* Dashboard Preview Images - Stacked Layout */}
        <div
          className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="space-y-6 sm:space-y-8">
            {/* Code Setup Image - Square/Portrait */}
            <div className="relative group mx-auto max-w-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform duration-500">
                <div className="bg-gray-800/30 flex items-center justify-center">
                  <Image
                    width={400}
                    height={400}
                    loading="lazy"
                    src={setup.src}
                    alt="SnapAlert Setup Code"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Dashboard Settings Image - Wide Rectangle */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-3xl opacity-50 group-hover:opacity-70 transition-opacity" />
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.01] transition-transform duration-500">
                <div className="bg-gray-800/30 flex items-center justify-center">
                  <Image
                    width={500}
                    height={600}
                    loading="lazy"
                    src={dashboard.src}
                    alt="SnapAlert Dashboard Settings"
                    className="w-full h-full relative object-cover p-6 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 py-20 sm:py-32 border-t border-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
              Everything You Need to Monitor Your APIs
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Powerful features designed to give you complete visibility and
              control over your API infrastructure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, i) => (
              <div
                key={i}
                className="feature-card group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8 hover:border-white/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 text-white group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
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
        className="relative z-10 py-20 sm:py-32 border-t border-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Choose the plan that fits your needs. Take a free trial now.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => {
              const isPopular = plan.popular;
              const isComingSoon = !plan.available;

              const cardClasses = `
                pricing-card relative backdrop-blur-sm border rounded-xl p-6 sm:p-8 
                transition-all duration-300 group flex flex-col
                ${
                  isPopular
                    ? "border-white sm:scale-105 shadow-lg shadow-white/20 hover:scale-[1.07] hover:shadow-xl"
                    : "border-gray-800 hover:border-gray-700 hover:scale-105"
                }
                ${isComingSoon ? "bg-gray-900/30" : "bg-gray-900/50"}
              `;

              const buttonText =
                plan.price === "Custom" ? "Contact Sales" : "Get Started Free";

              return (
                <div key={i} className={cardClasses}>
                  {/* Coming Soon Badge */}
                  {isComingSoon && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 animate-pulse">
                      COMING SOON
                    </div>
                  )}

                  {/* Blur overlay for coming soon cards */}
                  {isComingSoon && (
                    <div className="absolute inset-0 backdrop-blur-[2px] bg-gray-950/40 rounded-xl z-10 pointer-events-none" />
                  )}

                  <div
                    className={`mb-6 relative ${isComingSoon ? "z-0" : "z-10"}`}
                  >
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline">
                      <span className="text-4xl sm:text-5xl font-bold">
                        {plan.price}
                      </span>
                      {plan.price !== "Custom" && plan.price !== "Free" && (
                        <span className="text-gray-400 ml-2">/month</span>
                      )}
                    </div>
                  </div>

                  <ul
                    className={`space-y-3 sm:space-y-4 mb-8 flex-grow relative ${
                      isComingSoon ? "z-0" : "z-10"
                    }`}
                  >
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={!isComingSoon ? handleGetStarted : undefined}
                    disabled={isComingSoon}
                    className={`w-full py-3 rounded-lg font-semibold transition-all relative mt-auto text-sm sm:text-base ${
                      isComingSoon
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed z-0"
                        : isPopular
                        ? "bg-white hover:bg-gray-100 text-gray-950 hover:scale-105 z-10"
                        : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 hover:scale-105 z-10"
                    }`}
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
        className="relative z-10 py-20 sm:py-32 border-t border-slate-800/50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 px-4">
              Everything you need to know about API Analytics
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="group backdrop-blur-sm border-b border-slate-800/50 overflow-hidden transition-all duration-300 animate-fade-in-up"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left transition-colors border-l-4 border-transparent group-hover:border-white"
                >
                  <span className="font-medium text-base sm:text-lg text-white pr-6 sm:pr-8">
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
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-slate-400 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="relative z-10 py-20 sm:py-32 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />

            <div className="relative animate-fade-in-up">
              <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mx-auto mb-6 animate-pulse" />

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
                Still Wondering How It Works?
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                Our team is here to help you get started and answer any
                questions you might have about API monitoring.
              </p>

              <button
                onClick={handleContactUs}
                className="group inline-flex items-center space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-lg font-semibold text-base sm:text-lg transition-all hover:scale-105 shadow-lg shadow-orange-500/25"
              >
                <span>Contact Our Team</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs sm:text-sm text-slate-500 mt-6">
                Get a response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-black" />
                </div>
                <span className="text-xl font-bold text-orange-400">
                  ApiDeck
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                The modern way to monitor and analyze your API performance.
              </p>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h4 className="font-semibold mb-4 text-base sm:text-lg">
                Product
              </h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <button
                    onClick={() => smoothScrollTo("features")}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => smoothScrollTo("pricing")}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <a
                    href="/docs"
                    className="hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <h4 className="font-semibold mb-4 text-base sm:text-lg">
                Company
              </h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>

                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleContactUs}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="font-semibold mb-4 text-base sm:text-lg">Legal</h4>
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
              </ul>
            </div>
          </div>
          <div className="flex justify-end mr-8 mb-3 ">
            <span className="text-orange-400">
              Ensure your APIs never go down again.
            </span>
          </div>

          <div
            className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between animate-fade-in-up space-y-4 md:space-y-0"
            style={{ animationDelay: "0.4s" }}
          >
            <p className="text-slate-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 API Analytics. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
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
                href="https://www.linkedin.com/in/aman-kishor-profile/"
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
}
