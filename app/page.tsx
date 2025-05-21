"use client"
import Image from "next/image"
import { ProductPreview } from "@/components/product-preview"
import { VIPCardShowcase } from "@/components/vip-card-showcase"
import { Navigation } from "@/components/navigation"
import type { PreviewItem } from "@/types/carousel"

// Sample preview items data
const previewItems: PreviewItem[] = [
  {
    id: "wallet",
    title: "VIP Wallet UI",
    description: "Hunter view showing current tier, access points, and nearby venues.",
    icon: "fas fa-wallet",
    imageUrl: "https://images.unsplash.com/photo-1607082352121-fa243f3dde32?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "admin",
    title: "Admin Dashboard",
    description: "High Table view with member analytics and event management.",
    icon: "fas fa-chart-line",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "checkin",
    title: "Event Check-in",
    description: "Seamless entry experience with QR code or NFC tap.",
    icon: "fas fa-qrcode",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "scanner",
    title: "Loyalty Scanner",
    description: "Venue staff interface for recognizing and rewarding members.",
    icon: "fas fa-star",
  },
  {
    id: "rewards",
    title: "Mystery Reward",
    description: "The thrill of unlocking a surprise benefit at random moments.",
    icon: "fas fa-gift",
  },
]

export default function Home() {
  return (
    <div className="antialiased font-[Montserrat,sans-serif] bg-[#0a0a0a] text-[#e5e5e5]">
      {/* Navigation - Replace the old nav with our new component */}
      <Navigation />

      {/* Hero Section */}
      <section
        className="hero-bg flex items-center pt-16 min-h-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                  Access the Hidden
                </span>
                <br />
                <span className="text-white">Privileges</span>
              </h1>
              <p className="text-xl text-gray-300">
                An exclusive gateway to decentralized VIP networks. Where elite clubs, secret societies, and high-tier
                events converge.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <button className="px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-md hover:from-yellow-400 hover:to-yellow-200 transition transform hover:-translate-y-1">
                  Get Early Access
                </button>
                <button className="px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-yellow-600 rounded-md hover:bg-yellow-600 hover:bg-opacity-20 transition transform hover:-translate-y-1">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="vip-card rounded-xl p-8 card-hover border-gold max-w-md mx-auto glow-effect border border-yellow-600/30 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d]">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-yellow-400">VIP Card</span>
                  <span className="text-xs text-gray-400">#001</span>
                </div>
                <div className="h-40 mb-8 flex items-center justify-center">
                  <span className="text-4xl font-bold text-yellow-300">MasterVIP</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Valid Thru: 12/30</span>
                  <span className="text-yellow-500 font-semibold">PLATINUM</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-600 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 gold-gradient-text animate-gradient-move">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                "Not everyone gets a seat at this table."
              </span>
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6 section-divider"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-300 mb-6 fade-in-up delay-100">
                MasterVIP is a global infrastructure for issuing and managing digital VIP privileges – no cards, no
                friction, no middlemen.
              </p>
              <p className="text-gray-400 fade-in-up delay-200">
                From underground clubs in Tokyo to private lounges in Berlin, from speaker rooms at defense summits to
                secret startup salons in Lisbon — we connect private ecosystems in a secure and seamless layer.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 rounded-lg p-6 card-hover shadow-gold border-gold">
                <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-users text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">For Organizations</h3>
                <p className="text-gray-400 text-sm">
                  Create private circles and manage VIP access with complete control.
                </p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 card-hover shadow-gold border-gold">
                <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-id-card text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">For Members</h3>
                <p className="text-gray-400 text-sm">Your digital identity for the most exclusive venues worldwide.</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 card-hover shadow-gold border-gold">
                <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-globe text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Global Network</h3>
                <p className="text-gray-400">Multi-language, multi-currency, multi-culture infrastructure.</p>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 card-hover shadow-gold border-gold">
                <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-shield-alt text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">Secure</h3>
                <p className="text-gray-400 text-sm">GDPR & data sovereignty ready. Your privacy is our priority.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Is It For Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                Who Is It For?
              </span>
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-black bg-opacity-50 rounded-xl p-8 card-hover border-gold shadow-gold ">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-crown text-yellow-500 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold">
                  For Organizations
                  <br />
                  <span className="text-yellow-500">"High Table"</span>
                </h3>
              </div>
              <ul className="space-y-4 text-gray-300 text-base">
                <li className="flex items-start">
                  <i className="fas fa-user-shield text-yellow-500 mr-3 mt-1"></i> Issue and manage VIP memberships for
                  your club, bar, or event.
                </li>
                <li className="flex items-start">
                  <i className="fas fa-bolt text-yellow-500 mr-3 mt-1"></i> Create instant promotions and loyalty
                  programs for members.
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chart-line text-yellow-500 mr-3 mt-1"></i> Track member activity and upgrade
                  tiers automatically.
                </li>
                <li className="flex items-start">
                  <i className="fas fa-lock text-yellow-500 mr-3 mt-1"></i> Full control, privacy, and data sovereignty
                  for your organization.
                </li>
              </ul>
            </div>
            <div className="bg-black bg-opacity-50 rounded-xl p-8 card-hover border-gold shadow-gold">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user-secret text-yellow-500 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold">
                  For Members
                  <br />
                  <span className="text-yellow-500">"Hunters"</span>
                </h3>
              </div>
              <ul className="space-y-4 text-gray-300 text-base">
                <li className="flex items-start">
                  <i className="fas fa-gift text-yellow-500 mr-3 mt-1"></i> Receive rewards, points, and exclusive codes
                  instantly.
                </li>
                <li className="flex items-start">
                  <i className="fas fa-calendar-check text-yellow-500 mr-3 mt-1"></i> Join events, collect points, and
                  pay at the counter with your app.
                </li>
                <li className="flex items-start">
                  <i className="fas fa-search-dollar text-yellow-500 mr-3 mt-1"></i> Hunt for points, codes, and
                  discounts every day.
                </li>
                <li className="flex items-start">
                  <i className="fas fa-mug-hot text-yellow-500 mr-3 mt-1"></i> Earn points for every visit, every
                  coffee, every event.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                Core Features
              </span>
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-start mb-8">
                <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-6">
                  <i className="fas fa-mobile-alt text-yellow-500 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Digital VIP Card</h3>
                  <p className="text-gray-400">No more plastic. Your VIP status is always with you, on your phone.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-layer-group text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Multiple Tiers</h4>
                    <p className="text-gray-400 text-sm">
                      Bronze, Silver, Gold, Platinum, and custom levels for every organization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-users-cog text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Admin Control</h4>
                    <p className="text-gray-400 text-sm">
                      Admins can issue, upgrade, and manage all member privileges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-bullhorn text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Promotions & Events</h4>
                    <p className="text-gray-400 text-sm">
                      Create and push promotions, events, and news to all members instantly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-coins text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Points & Rewards</h4>
                    <p className="text-gray-400 text-sm">
                      Earn, redeem, and track points for every action and purchase.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-qrcode text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">QR/NFC Access</h4>
                    <p className="text-gray-400 text-sm">Scan to enter, pay, or join events. Works even offline.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-start mb-8">
                <div className="w-12 h-12 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-6">
                  <i className="fas fa-user-astronaut text-yellow-500 text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Dynamic Skin UI</h3>
                  <p className="text-gray-400">
                    Each VIP card can have a unique look and feel, based on level or organization.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-film text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Neo-noir Design</h4>
                    <p className="text-gray-400 text-sm">
                      Cinematic, dark, and luxurious. Inspired by John Wick's world.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-shield-alt text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">Privacy First</h4>
                    <p className="text-gray-400 text-sm">GDPR-ready, no data sold, all privacy by design.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-code text-yellow-500"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold">White-label SDK</h4>
                    <p className="text-gray-400 text-sm">Partners can build their own branded VIP experience.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Scale Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                Designed to Scale Worldwide
              </span>
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 card-hover shadow-gold border-gold text-center">
              <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-language text-yellow-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-language</h3>
              <p className="text-gray-400">
                Localized experiences in all major languages with more added continuously.
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 card-hover shadow-gold border-gold text-center">
              <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-coins text-yellow-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-currency</h3>
              <p className="text-gray-400">
                Support for all global currencies with real-time conversion and local pricing.
              </p>
            </div>
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 card-hover shadow-gold border-gold text-center">
              <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-globe-europe text-yellow-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-culture</h3>
              <p className="text-gray-400">Adapted to local customs, etiquette, and unspoken rules of each market.</p>
            </div>
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 card-hover shadow-gold border-gold text-center">
              <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-wifi text-yellow-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Works offline</h3>
              <p className="text-gray-400">QR/NFC fallback ensures access even in underground or remote locations.</p>
            </div>
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 card-hover shadow-gold border-gold text-center">
              <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-user-shield text-yellow-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">GDPR ready</h3>
              <p className="text-gray-400">Full compliance with global data protection regulations.</p>
            </div>
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-8 card-hover shadow-gold border-gold text-center">
              <div className="w-16 h-16 bg-yellow-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-code text-yellow-500 text-3xl"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">White-label SDK</h3>
              <p className="text-gray-400">Custom implementations for partners who need their own branded solution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview Carousel - Using our new component */}
      <ProductPreview title="Product Preview" items={previewItems} />

      {/* VIP Card Showcase */}
      <section id="vip-cards">
        <VIPCardShowcase
          title="Exclusive VIP Cards"
          description="Our digital VIP cards provide instant recognition and access to exclusive privileges worldwide."
        />
      </section>

      {/* Pilots Section */}
      <section id="pilots" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f9d423] to-[#d4af37] bg-clip-text text-transparent">
                Built for Fast Testing – MVP Ready
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Demo or Die. Join the first real-world pilots in:</p>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900 rounded-xl overflow-hidden card-hover border-gold">
              <div className="h-48 bg-gradient-to-b from-yellow-900 to-black flex items-center justify-center relative">
                <Image
                  src="https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"
                  alt="Tokyo"
                  fill
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  style={{ zIndex: 0 }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="text-5xl font-bold gold-gradient relative z-10">🇯🇵</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Tokyo</h3>
                <p className="text-gray-400 mb-4">
                  Underground club network testing frictionless entry and tiered rewards.
                </p>
                <div className="flex items-center text-sm text-yellow-500">
                  <i className="fas fa-user-friends mr-2"></i>
                  <span>12 venues participating</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl overflow-hidden card-hover border-gold">
              <div className="h-48 bg-gradient-to-b from-yellow-900 to-black flex items-center justify-center relative">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-4627383dde33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80"
                  alt="Berlin"
                  fill
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  style={{ zIndex: 0 }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="text-5xl font-bold gold-gradient relative z-10">🇩🇪</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Berlin</h3>
                <p className="text-gray-400 mb-4">Private lounge, speaker room, and exclusive member upgrades.</p>
                <div className="flex items-center text-sm text-yellow-500">
                  <i className="fas fa-user-friends mr-2"></i>
                  <span>8 venues participating</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-xl overflow-hidden card-hover border-gold">
              <div className="h-48 bg-gradient-to-b from-yellow-900 to-black flex items-center justify-center relative">
                <Image
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2052&q=80"
                  alt="Lisbon"
                  fill
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                  style={{ zIndex: 0 }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="text-5xl font-bold gold-gradient relative z-10">🇵🇹</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Lisbon</h3>
                <p className="text-gray-400 mb-4">Secret startup salons and exclusive member benefits.</p>
                <div className="flex items-center text-sm text-yellow-500">
                  <i className="fas fa-user-friends mr-2"></i>
                  <span>5 venues participating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
