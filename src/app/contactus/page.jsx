"use client"
import React, { useState } from 'react';
import { Mail, Twitter, Send, Clock, CheckCircle2,ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const router = useRouter()

   const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={handleBackToHome}
          className="flex items-center space-x-2 px-4 py-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-lg hover:border-orange-500/50 transition-all duration-300 hover:scale-105 group"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-orange-400 transition-colors" />
          <span className="text-slate-400 group-hover:text-white transition-colors">
            Back 
          </span>
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-emerald-400 to-violet-400 text-transparent bg-clip-text text-sm font-semibold tracking-wider uppercase">
              Contact Developer
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose your preferred channel to reach out. I'm here to help with your queries and collaborate on exciting projects.
          </p>
        </div>

        {/* Cards Grid - The grid container ensures equal width and height for its children */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Twitter Card */}
          <div
            onMouseEnter={() => setHoveredCard('twitter')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            
            {/* Added h-full to explicitly stretch to the grid cell's height */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 group-hover:border-emerald-500/50 rounded-3xl p-8 transition-all duration-500 h-full flex flex-col">
              {/* Icon Section */}
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-emerald-400 to-teal-500 p-4 rounded-2xl">
                    <Twitter className="w-8 h-8 text-white" fill="white" />
                  </div>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
                  Fastest Response
                </span>
              </div>

              {/* Content */}
              <h3 className="text-3xl font-bold text-white mb-3">
                Message on X
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Slide into my DMs for quick conversations, casual questions, or just to say hi. Perfect for instant feedback.
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Usually respond within 1-2 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Great for quick questions & ideas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>Casual and conversational tone</span>
                </div>
              </div>

              {/* CTA Button - Use mt-auto to push the button to the bottom of the equal-height card */}
              <a
                href="https://x.com/kishoraman21"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold py-4 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/50"
              >
                <Send className="w-5 h-5" />
                Drop the idea 
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div
            onMouseEnter={() => setHoveredCard('email')}
            onMouseLeave={() => setHoveredCard(null)}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
            
            {/* Added h-full to explicitly stretch to the grid cell's height */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-slate-700 group-hover:border-violet-500/50 rounded-3xl p-8 transition-all duration-500 h-full flex flex-col">
              {/* Icon Section */}
              <div className="flex items-start justify-between mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-violet-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative bg-gradient-to-br from-violet-400 to-purple-500 p-4 rounded-2xl">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="bg-violet-500/20 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full">
                  Professional
                </span>
              </div>

              {/* Content */}
              <h3 className="text-3xl font-bold text-white mb-3">
                Send an Email
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Reach out via email for detailed discussions, project proposals, or technical inquiries that need thorough attention.
              </p>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                  <span>Detailed and thoughtful responses</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                  <span>Attach files, screenshots & documents</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
                  <span>Perfect for collaboration proposals</span>
                </div>
              </div>

              {/* CTA Button - Use mt-auto to push the button to the bottom of the equal-height card */}
              <a
                href="mailto:kishoraman2121@gmail.com"
                className="mt-auto flex items-center justify-center gap-2 w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-semibold py-4 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/50"
              >
                <Mail className="w-5 h-5" />
                Compose Email
              </a>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 rounded-full px-6 py-3">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">
              Average response time: <span className="text-white font-semibold">24 hours</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}