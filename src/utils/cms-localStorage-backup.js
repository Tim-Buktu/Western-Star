// Content Management System Data - DATABASE MODE
// This file now redirects to the database API

import { getCMSData as apiGetCMSData, updateCMSData as apiUpdateCMSData, addNewsletter as apiAddNewsletter } from './cmsApi.js';

// Force database mode
if (typeof window !== 'undefined') {
  localStorage.setItem('westernStarMigrated', 'true');
  console.log('🔄 CMS forced to database mode');
}

// Legacy compatibility - redirect to API
export const getCMSData = apiGetCMSData;
export const updateCMSData = apiUpdateCMSData;
export const setCMSData = apiUpdateCMSData;

// Newsletter functions that use API
export const addNewsletter = apiAddNewsletter;
        date: "Dec 19, 2024",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 2,
        category: "CORPORATE",
        title: "Cohere Secures $6.8B Valuation as AI Investment Doubles Down",
        summary: "The Canadian AI startup has successfully raised additional funding, reflecting continued investor confidence in enterprise AI solutions.",
        date: "Dec 18, 2024",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 3,
        category: "POLICY & REGULATIONS",
        title: "New Digital Economy Regulations Reshape Market Dynamics",
        summary: "Government announces comprehensive framework for digital taxation and cross-border e-commerce, affecting major tech platforms.",
        date: "Dec 17, 2024",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 4,
        category: "INTERNATIONAL RELATIONS",
        title: "Southeast Asia Trade Alliance Strengthens Economic Cooperation",
        summary: "Regional leaders announce expanded partnerships focusing on technology transfer and sustainable development initiatives.",
        date: "Dec 16, 2024",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 5,
        category: "GLOBAL ECONOMY",
        title: "Central Bank Policy Shifts Impact Regional Investment Flows",
        summary: "Federal Reserve decisions trigger reassessment of emerging market strategies among institutional investors.",
        date: "Dec 15, 2024",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 6,
        category: "FINANCIAL",
        title: "Green Bond Market Reaches Record Highs in Asia-Pacific",
        summary: "Sustainable finance instruments gain momentum as corporations prioritize ESG compliance and climate targets.",
        date: "Dec 14, 2024",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 7,
        category: "INNOVATION",
        title: "Revolutionary Solar Technology Achieves 40% Efficiency Rate",
        summary: "Breakthrough in perovskite solar cells promises to transform renewable energy landscape with unprecedented efficiency gains.",
        date: "Dec 13, 2024",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 8,
        category: "CAREER",
        title: "Remote Work Policies Drive New Talent Acquisition Strategies",
        summary: "Companies adapt hiring practices as professionals increasingly prioritize flexible work arrangements and location independence.",
        date: "Dec 12, 2024",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 9,
        category: "LIFESTYLE",
        title: "Wellness Technology Integration Transforms Healthcare Access",
        summary: "Digital health platforms and wearable devices create new paradigms for preventive care and patient engagement.",
        date: "Dec 11, 2024",
        image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?q=80&w=1200&auto=format&fit=crop"
      },
      {
        id: 10,
        category: "CULTURAL",
        title: "Digital Preservation Initiatives Protect Regional Heritage",
        summary: "Technology partnerships enable comprehensive documentation and global access to traditional arts and cultural practices.",
        date: "Dec 10, 2024",
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop"
      }
    ]
  },

  // Topics/Features section
  topics: {
    title: "What we cover",
    items: [
      {
        id: 1,
        icon: "TrendingUp",
        title: "Tech & Business",
        description: "Signals from Indonesia's tech and enterprise landscape you can act on.",
        isActive: true
      },
      {
        id: 2,
        icon: "Scale",
        title: "Policy & Regulation",
        description: "Clarity on rules, incentives, and compliance that shift markets.",
        isActive: true
      },
      {
        id: 3,
        icon: "Landmark",
        title: "Investment",
        description: "Deal flow, sectors in motion, and capital allocators' playbooks.",
        isActive: true
      },
      {
        id: 4,
        icon: "Globe",
        title: "Global Dynamics",
        description: "How macro currents and geopolitics ripple through Indonesia.",
        isActive: true
      }
    ]
  },

  // Navigation
  navigation: {
    items: [
      { id: 1, label: "Research", href: "/research", isVisible: true },
      { id: 2, label: "News", href: "/news", isVisible: true },
      { id: 3, label: "Newsletter", href: "/newsroom", isVisible: true }
    ]
  },

  // News Articles Archive - Creative and varied content formats
  news: {
    title: "Latest News & Analysis",
    items: [
      {
        id: 1,
        type: 'feature-story', // Hero layout type
        category: "TECHNOLOGY",
        title: "The AI Revolution: How Machine Learning is Reshaping Southeast Asia's Economy",
        summary: "From Jakarta's smart traffic systems to Singapore's predictive healthcare, artificial intelligence is transforming how Southeast Asian nations approach economic development and social challenges.",
        showcaseSection: 'featured', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 1,
        content: `
          <h2>The Dawn of AI-Powered Economies</h2>
          <p>Southeast Asia stands at the cusp of an artificial intelligence revolution that promises to redefine economic structures, social interactions, and technological capabilities across the region. With investments exceeding $12 billion in 2024 alone, the transformation is both rapid and profound.</p>
          
          <h3>Smart Cities Leading the Charge</h3>
          <p>Jakarta's implementation of AI-powered traffic management systems has reduced congestion by 31% during peak hours, while Singapore's predictive maintenance algorithms have improved public transportation efficiency by 24%. These aren't just technological upgrades—they represent fundamental shifts in how cities function.</p>
          
          <blockquote class="bg-gray-50 border-l-4 border-brand-teal p-6 my-8">
            <p class="text-lg italic text-gray-700">"We're not just adopting AI; we're creating AI ecosystems that reflect our unique cultural and economic contexts."</p>
            <footer class="text-sm text-gray-600 mt-2">— Dr. Sarah Chen, Director of AI Policy, ASEAN Secretariat</footer>
          </blockquote>
          
          <h3>Economic Impact Across Sectors</h3>
          <p>The financial services sector has seen the most dramatic transformation, with digital banks processing loans 70% faster using AI-driven risk assessment. Manufacturing follows closely, with predictive maintenance reducing downtime by an average of 22% across major Indonesian and Thai facilities.</p>
          
          <h3>Challenges and Opportunities</h3>
          <p>However, this rapid adoption comes with significant challenges. Skills gaps affect 68% of companies attempting to implement AI solutions, while data privacy concerns remain paramount across all jurisdictions.</p>
          
          <p>The next phase of development will focus on creating AI governance frameworks that balance innovation with privacy protection, ensuring that the benefits of artificial intelligence reach all segments of society.</p>
        `,
        insights: [
          "AI investment in Southeast Asia exceeded $12 billion in 2024, marking a 340% increase from 2020",
          "Smart city initiatives have improved urban efficiency by an average of 28% across major metropolitan areas",
          "68% of companies report skills gaps as the primary barrier to AI implementation",
          "Digital financial services processing has accelerated by 70% through AI integration"
        ],
        author: {
          name: "Dr. Michael Zhang",
          role: "Technology Policy Analyst",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-15",
        lastUpdated: "2025-01-16",
        tags: ["TECHNOLOGY", "INNOVATION", "POLICY & REGULATIONS"],
        image: {
          url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
          alt: "AI and machine learning visualization with neural networks"
        },
        views: 15420,
        resources: [
          {
            type: "report",
            title: "Southeast Asia AI Adoption Report 2025",
            description: "Comprehensive analysis of AI implementation across the region",
            url: "#"
          },
          {
            type: "video",
            title: "Smart Cities Panel Discussion",
            description: "Industry leaders discuss the future of urban AI",
            url: "#"
          }
        ]
      },
      {
        id: 2,
        type: 'data-story', // Infographic/data-heavy layout
        category: "GLOBAL ECONOMY",
        title: "Trade Winds Shift: New Silk Road Economics in 2025",
        summary: "Comprehensive data analysis reveals how Belt and Road Initiative investments are creating new economic corridors, with Southeast Asia capturing 34% of total infrastructure spending.",
        showcaseSection: 'mosaic', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 2,
        content: `
          <h2>Following the Money: Infrastructure Investment Patterns</h2>
          <p>The Belt and Road Initiative (BRI) has allocated $847 billion globally since 2013, with Southeast Asia emerging as the primary beneficiary region. Our analysis of investment flows reveals striking patterns in how this capital is reshaping regional economies.</p>
          
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl my-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Investment Distribution by Sector</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-4 rounded-xl">
                <h4 class="font-semibold text-lg mb-2">Transportation & Logistics</h4>
                <div class="text-3xl font-bold text-brand-teal mb-1">$287B</div>
                <p class="text-gray-600 text-sm">Rail networks, ports, and airports</p>
              </div>
              <div class="bg-white p-4 rounded-xl">
                <h4 class="font-semibold text-lg mb-2">Energy Infrastructure</h4>
                <div class="text-3xl font-bold text-brand-coral mb-1">$198B</div>
                <p class="text-gray-600 text-sm">Power plants and grid modernization</p>
              </div>
            </div>
          </div>
          
          <h3>Regional Economic Impact</h3>
          <p>Countries participating in BRI projects have seen average GDP growth rates 1.8% higher than non-participating neighbors. The multiplier effect is particularly pronounced in logistics and manufacturing sectors.</p>
          
          <p>However, debt sustainability concerns have emerged, with six countries exceeding IMF recommended debt-to-GDP ratios as of Q4 2024.</p>
        `,
        insights: [
          "Southeast Asia captures 34% of total BRI infrastructure spending, totaling $287 billion since 2013",
          "Participating countries show 1.8% higher average GDP growth rates",
          "Transportation and logistics receive the largest investment share at $287 billion",
          "Six countries now exceed IMF debt sustainability thresholds"
        ],
        author: {
          name: "Elena Rodriguez",
          role: "Economic Research Director",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b9ad4a88?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-14",
        tags: ["GLOBAL ECONOMY", "INTERNATIONAL RELATIONS", "POLICY & REGULATIONS"],
        image: {
          url: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
          alt: "Global trade routes and economic corridors visualization"
        },
        views: 12890
      },
      {
        id: 3,
        type: 'breaking-news', // Alert/urgent layout
        category: "POLICY & REGULATIONS",
        title: "BREAKING: Indonesia Announces Digital Tax Framework for Global Tech Giants",
        summary: "New legislation requires international digital platforms to pay 12% tax on local revenue, affecting major tech companies operating in Southeast Asia's largest economy.",
        showcaseSection: 'mosaic', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 3,
        content: `
          <div class="bg-red-50 border-l-4 border-red-400 p-6 mb-8">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Breaking Development</h3>
                <p class="mt-1 text-sm text-red-700">This story is developing. Last updated: January 13, 2025 at 3:24 PM WIB</p>
              </div>
            </div>
          </div>
          
          <h2>Immediate Impact on Global Tech Operations</h2>
          <p>Indonesia's Ministry of Finance announced comprehensive digital tax legislation that will require all foreign digital service providers with annual revenue exceeding $130 million to register for tax purposes and pay a 12% levy on local revenue streams.</p>
          
          <h3>Which Companies Are Affected?</h3>
          <p>The regulation specifically targets:</p>
          <ul class="list-disc ml-6 my-4">
            <li>Social media platforms with Indonesian user bases exceeding 1 million</li>
            <li>E-commerce marketplaces facilitating transactions within Indonesia</li>
            <li>Digital advertising platforms serving Indonesian markets</li>
            <li>Cloud computing and software-as-a-service providers</li>
          </ul>
          
          <h3>Implementation Timeline</h3>
          <p>Companies have 90 days from publication to register with Indonesian tax authorities. The tax will apply to revenue generated from April 1, 2025, onwards.</p>
          
          <h3>Industry Response</h3>
          <p>The Asia Internet Coalition expressed concerns about potential double taxation and compliance complexity, while local Indonesian tech companies welcomed the move as promoting competitive balance.</p>
        `,
        insights: [
          "12% tax rate applies to local revenue for qualifying digital platforms",
          "$130 million annual revenue threshold determines tax obligation",
          "90-day registration period begins immediately",
          "Tax implementation starts April 1, 2025"
        ],
        author: {
          name: "Andi Pratama",
          role: "Policy Affairs Correspondent",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-13",
        tags: ["POLICY & REGULATIONS", "TECHNOLOGY", "FINANCIAL"],
        image: {
          url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop",
          alt: "Indonesian government building with digital overlay"
        },
        views: 28470,
        resources: [
          {
            type: "report",
            title: "Full Legislative Text (Indonesian)",
            description: "Complete digital tax framework documentation",
            url: "#"
          }
        ]
      },
      {
        id: 4,
        type: 'lifestyle-feature', // Magazine-style layout
        category: "LIFESTYLE",
        title: "The New Executive: How Southeast Asia's Leaders Are Redefining Work-Life Balance",
        summary: "From meditation corners in Bangkok boardrooms to 4-day work weeks in Singapore startups, a new generation of executives is challenging traditional business culture across Southeast Asia.",
        showcaseSection: 'loop', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 4,
        content: `
          <h2>Beyond the Corner Office</h2>
          <p>In a glass-walled conference room overlooking Bangkok's bustling Sukhumvit district, Siriporn Thanakit begins her Monday morning not with spreadsheets or strategy calls, but with a 15-minute guided meditation session alongside her senior management team.</p>
          
          <p>"Five years ago, this would have been unthinkable," says Thanakit, CEO of Bangkok-based fintech startup PayFlow. "Now, it's how we start every week. The results speak for themselves—productivity is up 23%, and employee satisfaction scores are at an all-time high."</p>
          
          <h3>The Wellness-First Executive</h3>
          <p>Thanakit represents a growing movement among Southeast Asian business leaders who are fundamentally reimagining what executive leadership looks like in the post-pandemic world. From Singapore to Jakarta, a new breed of CEOs and C-suite executives are prioritizing employee wellness, mental health, and work-life integration over traditional metrics of success.</p>
          
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl my-8">
            <h4 class="text-xl font-bold text-gray-900 mb-4">By the Numbers: The Wellness Revolution</h4>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2">67%</div>
                <p class="text-gray-700">of SEA executives now offer mental health days</p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-pink-600 mb-2">43%</div>
                <p class="text-gray-700">have implemented flexible working arrangements</p>
              </div>
            </div>
          </div>
          
          <h3>The Four-Day Experiment</h3>
          <p>In Singapore, marketing agency Zenith Creative made headlines by permanently adopting a four-day work week after a successful six-month trial. "We're not just talking about work-life balance," explains founder Marcus Lim. "We're demonstrating it. Our team is more creative, more focused, and frankly, happier."</p>
          
          <p>The results have been striking: client retention increased by 15%, while employee turnover dropped to just 3%—well below the industry average of 18%.</p>
        `,
        insights: [
          "67% of Southeast Asian executives now offer dedicated mental health days",
          "Companies with flexible work arrangements report 23% higher productivity",
          "Four-day work week trials show 15% improvement in client retention",
          "Employee turnover drops to 3% in companies prioritizing work-life balance"
        ],
        author: {
          name: "Lara Chen",
          role: "Lifestyle & Culture Editor",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-12",
        tags: ["LIFESTYLE", "CORPORATE", "CAREER"],
        image: {
          url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
          alt: "Modern office space with meditation area and natural lighting"
        },
        views: 9240
      },
      {
        id: 5,
        type: 'innovation-spotlight', // Product/tech showcase layout
        category: "INNOVATION",
        title: "Floating Solar Farms: Indonesia's Bold Solution to Energy and Land Scarcity",
        summary: "Revolutionary floating photovoltaic technology is transforming Indonesia's reservoirs into clean energy powerhouses, generating 145 MW while preserving valuable agricultural land.",
        showcaseSection: 'mosaic', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 5,
        content: `
          <h2>Innovation Born from Necessity</h2>
          <p>When PT Indonesia Power faced the challenge of expanding renewable energy capacity without sacrificing agricultural land, they turned to an innovative solution: floating solar panel arrays that literally rise with the tide.</p>
          
          <p>The Cirata Floating Solar Power Plant, sprawling across 200 hectares of West Java's largest reservoir, represents more than just technological innovation—it's a blueprint for sustainable development in land-scarce regions across Southeast Asia.</p>
          
          <h3>Technology That Adapts</h3>
          <p>Unlike traditional ground-mounted solar installations, these floating arrays are anchored using specialized HDPE (high-density polyethylene) floats that can withstand monsoon conditions while maintaining optimal panel positioning. The system incorporates several groundbreaking features:</p>
          
          <div class="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl my-8">
            <h4 class="text-xl font-bold text-gray-900 mb-6">Technical Innovation Highlights</h4>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h5 class="font-semibold text-gray-900">Adaptive Anchoring System</h5>
                  <p class="text-gray-700">Responds to water level fluctuations of up to 15 meters</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h5 class="font-semibold text-gray-900">Cooling Enhancement</h5>
                  <p class="text-gray-700">Water contact improves panel efficiency by 8-15%</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span class="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h5 class="font-semibold text-gray-900">Dual-Purpose Design</h5>
                  <p class="text-gray-700">Reduces water evaporation by 70% while generating power</p>
                </div>
              </div>
            </div>
          </div>
          
          <h3>Environmental Impact</h3>
          <p>Beyond energy generation, the floating arrays provide unexpected environmental benefits. By covering approximately 30% of the reservoir surface, they significantly reduce water evaporation—saving an estimated 1.5 million liters annually. This water conservation effect is particularly valuable during Indonesia's increasingly unpredictable dry seasons.</p>
          
          <h3>Scaling Across the Region</h3>
          <p>The success at Cirata has attracted attention from across Southeast Asia. Thailand's Electricity Generating Authority is planning a 2,725 MW floating solar project, while Vietnam has announced similar initiatives for its Mekong Delta region.</p>
        `,
        insights: [
          "145 MW generation capacity while preserving agricultural land",
          "8-15% efficiency improvement due to water cooling",
          "70% reduction in water evaporation saves 1.5 million liters annually",
          "Thailand planning 2,725 MW floating solar expansion based on success"
        ],
        author: {
          name: "Dr. Ravi Patel",
          role: "Clean Energy Technology Specialist",
          avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-11",
        tags: ["INNOVATION", "TECHNOLOGY", "GLOBAL ECONOMY"],
        image: {
          url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
          alt: "Floating solar panels on reservoir with mountains in background"
        },
        views: 7680,
        resources: [
          {
            type: "video",
            title: "Floating Solar Technology Explained",
            description: "Technical deep-dive into floating photovoltaic systems",
            url: "#"
          },
          {
            type: "report",
            title: "Southeast Asia Renewable Energy Outlook",
            description: "Regional analysis of clean energy adoption",
            url: "#"
          }
        ]
      },
      {
        id: 6,
        type: 'profile-interview', // People-focused layout
        category: "CAREER",
        title: "Rising Stars: The 30-Under-30 Entrepreneurs Reshaping Southeast Asian Business",
        summary: "Meet the young innovators building tomorrow's unicorns—from sustainable fashion platforms to AI-powered education tools, these entrepreneurs are solving regional challenges with global ambitions.",
        showcaseSection: 'loop', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 6,
        content: `
          <h2>The Next Generation of Business Leaders</h2>
          <p>At just 26, Maya Sari has already disrupted two industries. Her sustainable fashion platform, EcoThread, connects traditional Indonesian textile artisans with global consumers, while her latest venture uses blockchain technology to verify ethical supply chains across Southeast Asia.</p>
          
          <p>"My generation doesn't just want to build successful companies," Sari explains from her Jakarta headquarters, surrounded by samples of organic cotton and recycled polyester fabrics. "We want to solve the problems our parents' generation couldn't tackle."</p>
          
          <div class="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl my-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Meet the Innovators</h3>
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b9ad4a88?q=80&w=80&auto=format&fit=crop" 
                     alt="Maya Sari" class="w-16 h-16 rounded-full object-cover">
                <div>
                  <h4 class="font-bold text-lg text-gray-900">Maya Sari, 26</h4>
                  <p class="text-orange-600 font-medium">Founder, EcoThread</p>
                  <p class="text-gray-700 mt-1">"Connecting 2,500 artisans with sustainable fashion markets"</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop" 
                     alt="Kevin Tan" class="w-16 h-16 rounded-full object-cover">
                <div>
                  <h4 class="font-bold text-lg text-gray-900">Kevin Tan, 28</h4>
                  <p class="text-orange-600 font-medium">CEO, LearnFlow</p>
                  <p class="text-gray-700 mt-1">"AI-powered education reaching 100,000 students daily"</p>
                </div>
              </div>
            </div>
          </div>
          
          <h3>The Impact Generation</h3>
          <p>What sets this cohort apart isn't just their age—it's their approach to business as a force for social change. Kevin Tan's LearnFlow uses artificial intelligence to provide personalized tutoring to students in remote areas of the Philippines and Thailand, reaching over 100,000 learners daily.</p>
          
          <p>"Traditional education models weren't built for our geography or our diversity of languages," Tan explains. "We're using technology to solve uniquely Southeast Asian challenges."</p>
          
          <h3>Funding the Future</h3>
          <p>These young entrepreneurs are attracting serious capital. In 2024, Southeast Asian startups founded by leaders under 30 raised a combined $2.3 billion, with 67% focusing on sustainability, education, or healthcare solutions.</p>
        `,
        insights: [
          "Southeast Asian startups led by under-30 founders raised $2.3 billion in 2024",
          "67% focus on sustainability, education, or healthcare solutions",
          "EcoThread connects 2,500 traditional artisans with global sustainable fashion markets",
          "LearnFlow reaches 100,000 students daily across Philippines and Thailand"
        ],
        author: {
          name: "James Wong",
          role: "Startup Ecosystem Reporter",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-10",
        tags: ["CAREER", "INNOVATION", "CORPORATE"],
        image: {
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
          alt: "Young entrepreneurs in modern co-working space"
        },
        views: 11530
      },
      {
        id: 7,
        type: 'cultural-analysis', // Deep-dive cultural layout
        category: "CULTURAL",
        title: "Digital Pagodas: How Ancient Buddhist Practices Are Finding New Life in Tech-Savvy Myanmar",
        summary: "Virtual meditation sessions, AI-powered Buddhist text analysis, and blockchain-verified monastery donations represent a fascinating fusion of ancient wisdom and modern technology in Myanmar's digital transformation.",
        showcaseSection: 'loop', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 7,
        content: `
          <h2>Where Ancient Wisdom Meets Silicon Valley</h2>
          <p>In the golden-lit halls of Shwedagon Pagoda, 78-year-old Sayadaw U Tejaniya adjusts his laptop screen as hundreds of devotees from around the world join his morning meditation session via video call. This scene, once unimaginable, now represents Myanmar's unique approach to digitalizing its rich Buddhist heritage.</p>
          
          <p>"The dhamma transcends physical boundaries," the revered meditation teacher explains through a translator. "If technology can bring more people to the path of enlightenment, then we must embrace it thoughtfully."</p>
          
          <h3>The Digital Monastery</h3>
          <p>Myanmar's monasteries have become unlikely pioneers in digital innovation. The Mahasi Meditation Center now offers AI-powered guided meditation in 12 languages, while the International Theravada Buddhist University has digitized over 50,000 pages of ancient Pali texts, making them searchable and accessible worldwide.</p>
          
          <div class="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl my-8 border border-amber-200">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Digital Dharma by the Numbers</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-4xl font-bold text-amber-600 mb-2">127,000</div>
                <p class="text-gray-700 font-medium">Global participants in virtual meditation sessions</p>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-yellow-600 mb-2">50,000+</div>
                <p class="text-gray-700 font-medium">Ancient texts digitized and translated</p>
              </div>
              <div class="text-center">
                <div class="text-4xl font-bold text-orange-600 mb-2">$2.1M</div>
                <p class="text-gray-700 font-medium">Donated through blockchain-verified platforms</p>
              </div>
            </div>
          </div>
          
          <h3>Preserving Authenticity in a Digital Age</h3>
          <p>The challenge lies in maintaining the authenticity and spiritual depth of Buddhist teachings while leveraging modern technology. Venerable Ashin Ottama, a tech-savvy monk who completed his computer science degree before ordination, leads efforts to ensure digital adaptations remain true to Buddhist principles.</p>
          
          <p>"We're not changing Buddhism to fit technology," he explains. "We're using technology to make authentic Buddhism more accessible. The distinction is crucial."</p>
          
          <h3>Global Impact, Local Roots</h3>
          <p>The digital transformation has had profound effects both locally and internationally. Virtual pilgrimages to Myanmar's sacred sites attract over 200,000 participants annually, while blockchain-based donation systems have provided unprecedented transparency in monastery funding, increasing international contributions by 340%.</p>
        `,
        insights: [
          "127,000 global participants join virtual meditation sessions from Myanmar monasteries",
          "Over 50,000 ancient Pali texts have been digitized and made searchable",
          "$2.1 million donated through blockchain-verified transparency platforms",
          "Virtual pilgrimages attract 200,000+ annual participants worldwide"
        ],
        author: {
          name: "Thant Zin",
          role: "Cultural Technology Correspondent",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-09",
        tags: ["CULTURAL", "TECHNOLOGY", "INNOVATION"],
        image: {
          url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
          alt: "Golden Buddhist pagoda with digital overlay showing connectivity"
        },
        views: 8930
      },
      {
        id: 8,
        type: 'financial-deep-dive', // Finance/investment focused layout
        category: "FINANCIAL",
        title: "The $50 Billion Question: Southeast Asian Green Bond Market Reaches Historic Heights",
        summary: "Unprecedented investor appetite for sustainable finance drives record-breaking issuance, but questions remain about greenwashing and long-term impact verification in rapidly growing regional markets.",
        showcaseSection: 'mosaic', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 8,
        content: `
          <h2>A Market Transformed</h2>
          <p>The transformation has been swift and decisive. In 2020, Southeast Asian green bond issuance totaled just $8.2 billion. By 2024, that figure had soared to $51.3 billion, representing a compound annual growth rate of 145%—the highest in any global region.</p>
          
          <p>This explosive growth reflects not just increasing environmental awareness, but fundamental shifts in how institutional investors evaluate risk and opportunity in emerging markets.</p>
          
          <h3>Leading the Charge</h3>
          <p>Singapore has emerged as the undisputed hub for green finance in the region, with its Green Finance Incentive Scheme attracting over 200 international financial institutions to establish sustainable finance operations in the city-state.</p>
          
          <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl my-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Market Breakdown by Country (2024)</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-white rounded-lg">
                <div>
                  <h4 class="font-semibold text-gray-900">Singapore</h4>
                  <p class="text-sm text-gray-600">Government & Corporate Issuance</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-green-600">$18.7B</div>
                  <div class="text-sm text-gray-500">36% of regional total</div>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 bg-white rounded-lg">
                <div>
                  <h4 class="font-semibold text-gray-900">Indonesia</h4>
                  <p class="text-sm text-gray-600">Sovereign & Infrastructure</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-emerald-600">$14.2B</div>
                  <div class="text-sm text-gray-500">28% of regional total</div>
                </div>
              </div>
              <div class="flex items-center justify-between p-4 bg-white rounded-lg">
                <div>
                  <h4 class="font-semibold text-gray-900">Thailand</h4>
                  <p class="text-sm text-gray-600">Banking & Energy Sector</p>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-teal-600">$11.8B</div>
                  <div class="text-sm text-gray-500">23% of regional total</div>
                </div>
              </div>
            </div>
          </div>
          
          <h3>The Verification Challenge</h3>
          <p>However, rapid growth has brought scrutiny. Environmental groups and regulators are increasingly concerned about "greenwashing"—the practice of labeling conventional projects as environmentally friendly to access lower-cost green financing.</p>
          
          <p>"We're seeing tremendous enthusiasm, but we need to ensure these funds are actually creating measurable environmental impact," warns Dr. Sarah Lim, Director of Sustainable Finance at the Asian Development Bank.</p>
          
          <h3>Technology to the Rescue</h3>
          <p>Blockchain-based verification systems are emerging as a solution. Malaysia's Bursa Exchange has pioneered a distributed ledger system that tracks green bond proceeds from issuance through to final project impact, providing unprecedented transparency for investors.</p>
        `,
        insights: [
          "Southeast Asian green bond market grew from $8.2B to $51.3B in four years (145% CAGR)",
          "Singapore leads with $18.7B in issuance, representing 36% of regional market",
          "200+ international financial institutions established operations in Singapore",
          "Malaysia pioneers blockchain-based verification for bond impact tracking"
        ],
        author: {
          name: "Patricia Kim",
          role: "Sustainable Finance Analyst",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-08",
        tags: ["FINANCIAL", "INNOVATION", "GLOBAL ECONOMY"],
        image: {
          url: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
          alt: "Green finance and sustainable investment visualization"
        },
        views: 13250,
        resources: [
          {
            type: "report",
            title: "Southeast Asian Green Finance Report 2025",
            description: "Comprehensive analysis of sustainable finance trends",
            url: "#"
          },
          {
            type: "report",
            title: "Blockchain in Bond Markets",
            description: "Technical guide to distributed ledger verification systems",
            url: "#"
          }
        ]
      },
      {
        id: 9,
        type: 'international-analysis', // Geopolitical/diplomatic layout
        category: "INTERNATIONAL RELATIONS",
        title: "ASEAN's Digital Diplomacy: How WhatsApp and Zoom Are Reshaping Southeast Asian Foreign Policy",
        summary: "Traditional diplomatic protocols give way to digital-first engagement as ASEAN nations leverage technology for faster crisis response and multilateral coordination in an increasingly complex geopolitical landscape.",
        showcaseSection: 'loop', // 'featured', 'mosaic', 'loop', 'none'
        isVisible: true,
        position: 9,
        content: `
          <h2>Diplomacy at Digital Speed</h2>
          <p>When territorial tensions flared in the South China Sea last November, the response came not through traditional diplomatic channels, but via a secure WhatsApp group connecting foreign ministers from all ten ASEAN member states. Within six hours, a coordinated statement was drafted, reviewed, and published—a process that previously would have taken weeks.</p>
          
          <p>This shift toward digital diplomacy represents more than mere technological adoption; it's fundamentally changing how Southeast Asian nations conduct international relations in an era of rapid information flow and 24/7 news cycles.</p>
          
          <h3>The New Tools of Statecraft</h3>
          <p>The COVID-19 pandemic accelerated the adoption of digital diplomatic tools, but the practice has evolved far beyond pandemic-era necessity. Singapore's Ministry of Foreign Affairs now maintains 47 different WhatsApp groups for various multilateral engagements, while Thailand's diplomatic corps uses AI-powered translation tools to conduct real-time negotiations in multiple languages.</p>
          
          <blockquote class="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
            <p class="text-lg italic text-gray-700">"Digital diplomacy isn't just about speed—it's about building relationships and trust through constant, informal communication."</p>
            <footer class="text-sm text-gray-600 mt-2">— Dr. Vivian Balakrishnan, Singapore's Minister for Foreign Affairs</footer>
          </blockquote>
          
          <h3>Virtual Summits, Real Results</h3>
          <p>The most significant example came during the ASEAN Digital Ministers' Summit, conducted entirely via encrypted video platforms. The virtual format allowed for smaller breakout sessions and more focused discussions, resulting in the fastest treaty ratification in ASEAN history—the Digital Economy Framework Agreement was signed just 72 hours after initial negotiations began.</p>
          
          <h3>Challenges and Concerns</h3>
          <p>However, this digital transformation isn't without risks. Cybersecurity experts warn that rapid adoption of commercial communication platforms may expose sensitive diplomatic communications to foreign surveillance. Several ASEAN members are now developing sovereign digital diplomatic platforms to maintain secure communications.</p>
          
          <p>Additionally, the informal nature of digital communication has raised concerns about proper documentation and the historical record of important diplomatic decisions.</p>
        `,
        insights: [
          "ASEAN foreign ministers resolved South China Sea tensions via WhatsApp in 6 hours vs. weeks traditionally",
          "Singapore maintains 47 diplomatic WhatsApp groups for multilateral engagement",
          "Digital Economy Framework Agreement ratified in record 72 hours using virtual negotiations",
          "Thailand deploys AI translation for real-time multilingual diplomatic discussions"
        ],
        author: {
          name: "Ambassador Chen Wei Ming",
          role: "Digital Diplomacy Specialist",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-07",
        tags: ["INTERNATIONAL RELATIONS", "TECHNOLOGY", "POLICY & REGULATIONS"],
        image: {
          url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
          alt: "ASEAN flags with digital connectivity overlay"
        },
        views: 10470
      },
      {
        id: 10,
        type: 'corporate-strategy', // Business strategy focused layout
        category: "CORPORATE",
        title: "The Archipelago Advantage: How Indonesian Conglomerates Are Mastering Multi-Island Operations",
        summary: "From palm oil to digital banking, Indonesian business groups are pioneering distributed operations models that turn geographic complexity into competitive advantage, offering lessons for global corporations.",
        content: `
          <h2>Turning Complexity into Competitive Advantage</h2>
          <p>Managing operations across 17,508 islands spread over three time zones might seem like a logistical nightmare, but Indonesia's largest conglomerates have transformed this geographic complexity into their secret weapon.</p>
          
          <p>Sinar Mas Group's recent expansion illustrates this perfectly: while international competitors struggle with Indonesia's distributed markets, the Jakarta-based conglomerate operates seamlessly from Aceh to Papua, leveraging deep local knowledge and distributed infrastructure that took decades to build.</p>
          
          <h3>The Distributed Operations Model</h3>
          <p>Indonesian conglomerates have evolved a unique approach to multi-market management that differs significantly from traditional hub-and-spoke models used by Western corporations. Instead of centralizing operations in Jakarta, successful Indonesian groups operate through semi-autonomous regional centers, each adapted to local market conditions.</p>
          
          <div class="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-2xl my-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Archipelago Operations Strategy</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white p-6 rounded-xl">
                <h4 class="font-bold text-lg text-gray-900 mb-3">Traditional Hub Model</h4>
                <ul class="text-sm text-gray-700 space-y-2">
                  <li>• Central decision-making in Jakarta</li>
                  <li>• Standardized products across regions</li>
                  <li>• High logistics costs</li>
                  <li>• Limited local adaptation</li>
                </ul>
              </div>
              <div class="bg-white p-6 rounded-xl border-2 border-indigo-200">
                <h4 class="font-bold text-lg text-indigo-900 mb-3">Indonesian Archipelago Model</h4>
                <ul class="text-sm text-gray-700 space-y-2">
                  <li>• Regional autonomy with strategic coordination</li>
                  <li>• Products adapted to local preferences</li>
                  <li>• Optimized inter-island supply chains</li>
                  <li>• Deep community relationships</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h3>Case Study: Lippo Group's Digital Transformation</h3>
          <p>Lippo Group's transformation of its retail operations demonstrates the power of this approach. Instead of imposing a single digital platform across all markets, the group developed regionally-adapted e-commerce solutions that account for varying internet speeds, payment preferences, and delivery infrastructure across different islands.</p>
          
          <p>The result: while international e-commerce players struggle with Indonesia's complexity, Lippo's distributed model achieved 89% customer satisfaction rates and 34% year-over-year growth in previously underserved markets.</p>
          
          <h3>Lessons for Global Corporations</h3>
          <p>International companies are taking notice. McKinsey's recent study of Indonesian business models identifies three key strategies that global corporations can adapt:
          
          <ol class="list-decimal ml-6 my-4 space-y-2">
            <li><strong>Invest in Local Intelligence:</strong> Successful Indonesian groups maintain permanent teams in secondary markets, not just sales representatives.</li>
            <li><strong>Adapt Products, Not Just Marketing:</strong> Product modifications based on local preferences, not just translated advertising.</li>
            <li><strong>Build Ecosystem Partnerships:</strong> Long-term relationships with local suppliers, distributors, and community leaders.</li>
          </ol>
        `,
        insights: [
          "Indonesian conglomerates operate across 17,508 islands using distributed autonomous regional centers",
          "Lippo Group achieved 89% customer satisfaction with regionally-adapted digital solutions",
          "Distributed model delivers 34% YoY growth in previously underserved markets",
          "McKinsey identifies Indonesian archipelago strategy as model for global corporations"
        ],
        author: {
          name: "Dr. Indira Sari",
          role: "Corporate Strategy Consultant",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b9ad4a88?q=80&w=150&auto=format&fit=crop"
        },
        date: "2025-01-06",
        tags: ["CORPORATE", "GLOBAL ECONOMY", "INNOVATION"],
        image: {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
          alt: "Indonesian archipelago map with business connectivity lines"
        },
        views: 8940
      }
    ]
  },

  // Newsletter archive
  newsletters: {
    title: "Daily Newsletter Archive",
    items: [
      {
        id: 1,
        date: "2025-08-15",
        title: "AI Infrastructure Bets and Indonesia's Power Puzzle",
        keyDiscussion: "As Gemini Ultra rollouts meet local grid constraints, we examine the winners and risks for 2025. Infrastructure investments in AI are accelerating, but power grid limitations pose significant challenges for large-scale deployment. The intersection of technological advancement and infrastructure reality creates both opportunities and bottlenecks.",
        tags: ["TECHNOLOGY", "POLICY & REGULATIONS", "INNOVATION"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>AI Infrastructure Investment Surge</h2><p>The rapid advancement of AI technologies has led to unprecedented infrastructure investments across Southeast Asia. However, the reality of power grid constraints presents significant challenges for scaling these technologies effectively.</p><h2>Indonesia's Energy Challenge</h2><p>Indonesia's power grid infrastructure requires substantial upgrades to support the energy-intensive requirements of modern AI systems. This creates a complex policy and investment landscape that requires careful navigation.</p><h2>Market Implications</h2><p>The intersection of AI demand and infrastructure limitations creates unique investment opportunities and risks that will shape the market through 2025 and beyond.</p>",
        newsletterUrl: "#"
      },
      {
        id: 2,
        date: "2025-08-14",
        title: "Nickel to Batteries: Why Policy Sequencing Matters",
        keyDiscussion: "Examining tariffs, midstream investments, and the downstream employment trade-offs in Indonesia's critical mineral supply chain. The sequencing of policy implementation significantly impacts the effectiveness of industrial development strategies and employment outcomes.",
        tags: ["POLICY & REGULATIONS", "GLOBAL ECONOMY", "CORPORATE"],
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Critical Mineral Supply Chains</h2><p>Indonesia's position as a major nickel producer creates strategic advantages in the global battery supply chain. However, policy sequencing determines whether these advantages translate into sustainable economic development.</p><h2>Employment and Industrial Development</h2><p>The trade-offs between upstream extraction and downstream processing create complex employment dynamics that require careful policy coordination.</p>",
        newsletterUrl: "#"
      },
      {
        id: 3,
        date: "2025-08-13",
        title: "Payments: Interchange, QRIS, and the SME Margin Squeeze",
        keyDiscussion: "As payment rails mature, distribution edges shift to compliance and operations. The evolution of Indonesia's payment ecosystem from infrastructure development to operational excellence creates new competitive dynamics for small and medium enterprises.",
        tags: ["FINANCIAL", "TECHNOLOGY", "CORPORATE"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Payment Infrastructure Maturity</h2><p>Indonesia's payment infrastructure has reached a level of maturity where competitive advantages are increasingly found in operational excellence and compliance capabilities rather than basic connectivity.</p><h2>SME Impact</h2><p>Small and medium enterprises face increasing pressure as payment providers focus on higher-margin segments and compliance requirements become more stringent.</p>",
        newsletterUrl: "#"
      },
      {
        id: 4,
        date: "2025-08-12",
        title: "Southeast Asian Trade Dynamics in 2025",
        keyDiscussion: "Regional trade patterns are evolving rapidly as geopolitical tensions reshape global supply chains. Southeast Asian nations are positioning themselves as critical nodes in the new trade architecture, creating opportunities and challenges for local businesses and international investors.",
        tags: ["INTERNATIONAL RELATIONS", "GLOBAL ECONOMY", "POLICY & REGULATIONS"],
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Shifting Trade Patterns</h2><p>The reconfiguration of global supply chains presents both opportunities and challenges for Southeast Asian economies. Countries are strategically positioning themselves to capture value in the new trade landscape.</p>",
        newsletterUrl: "#"
      },
      {
        id: 5,
        date: "2025-08-11",
        title: "Green Finance Revolution in Emerging Markets",
        keyDiscussion: "Sustainable finance instruments are gaining unprecedented momentum as corporations prioritize ESG compliance and climate targets. The green bond market in Asia-Pacific has reached record highs, signaling a fundamental shift in how businesses approach environmental responsibility and financial planning.",
        tags: ["FINANCIAL", "INNOVATION", "GLOBAL ECONOMY"],
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Green Bond Market Surge</h2><p>The Asia-Pacific green bond market has experienced unprecedented growth, reflecting increasing corporate commitment to environmental sustainability and climate action.</p>",
        newsletterUrl: "#"
      },
      {
        id: 6,
        date: "2025-08-10",
        title: "Digital Transformation in Southeast Asian Healthcare",
        keyDiscussion: "The healthcare sector in Southeast Asia is undergoing rapid digital transformation. From telemedicine platforms to AI-powered diagnostic tools, technology is reshaping how healthcare services are delivered across the region, creating new opportunities for innovation and improved patient outcomes.",
        tags: ["TECHNOLOGY", "INNOVATION", "LIFESTYLE"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Healthcare Innovation Wave</h2><p>Digital health solutions are transforming patient care across Southeast Asia, driven by increasing smartphone penetration and government support for digital health initiatives.</p>",
        newsletterUrl: "#"
      },
      {
        id: 7,
        date: "2025-08-09",
        title: "The Future of Work: Remote Collaboration in Asia",
        keyDiscussion: "As remote work becomes permanent in many organizations, Asian companies are pioneering new approaches to distributed collaboration. This shift is reshaping corporate culture, talent acquisition strategies, and the future of urban development across major Asian cities.",
        tags: ["CAREER", "TECHNOLOGY", "CULTURAL"],
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Remote Work Evolution</h2><p>The transformation of work culture in Asia presents unique challenges and opportunities as organizations adapt to distributed teams and digital-first collaboration.</p>",
        newsletterUrl: "#"
      },
      {
        id: 8,
        date: "2025-08-08",
        title: "Sustainable Supply Chains: Asia's Green Revolution",
        keyDiscussion: "Asian manufacturers are leading the charge in sustainable supply chain transformation. From circular economy principles to carbon-neutral logistics, companies are reimagining how goods are produced, distributed, and consumed in the world's most dynamic economic region.",
        tags: ["CORPORATE", "INNOVATION", "GLOBAL ECONOMY"],
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Green Manufacturing</h2><p>Sustainable practices are becoming central to Asian manufacturing as companies balance profitability with environmental responsibility.</p>",
        newsletterUrl: "#"
      },
      {
        id: 9,
        date: "2025-08-07",
        title: "Cryptocurrency Regulation: Balancing Innovation and Stability",
        keyDiscussion: "Asian governments are crafting nuanced approaches to cryptocurrency regulation, seeking to foster blockchain innovation while maintaining financial stability. These regulatory frameworks are setting global precedents for the digital asset economy.",
        tags: ["POLICY & REGULATIONS", "FINANCIAL", "TECHNOLOGY"],
        image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Regulatory Landscape</h2><p>The evolving cryptocurrency regulatory environment in Asia reflects a delicate balance between innovation promotion and consumer protection.</p>",
        newsletterUrl: "#"
      },
      {
        id: 10,
        date: "2025-08-06",
        title: "E-commerce Evolution: Social Commerce Takes Center Stage",
        keyDiscussion: "Social commerce is revolutionizing how consumers discover and purchase products across Asia. Live streaming, influencer partnerships, and integrated payment systems are creating seamless shopping experiences that blend social interaction with commercial transactions.",
        tags: ["TECHNOLOGY", "CORPORATE", "CULTURAL"],
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        content: "<h2>Social Shopping Revolution</h2><p>The integration of social media and e-commerce platforms is creating new paradigms for customer engagement and sales conversion.</p>",
        newsletterUrl: "#"
      }
    ]
  },



  // Testimonials section
  testimonials: {
    title: "Built for clarity, not noise",
    subtitle: "Trusted by professionals who need reliable insights to make informed decisions",
    items: [
      {
        id: 1,
        name: "Dimas Pratama",
        title: "Partner, Jakarta VC",
        text: "Ringkas tapi tajam. Membantu tim investasi kami memilah sinyal dari noise setiap pagi.",
        isActive: true
      },
      {
        id: 2,
        name: "Rani Wibowo",
        title: "Head of Strategy, Tech Co.",
        text: "Persilangan market intel + policy awareness yang pas untuk keputusan cepat.",
        isActive: true
      },
      {
        id: 3,
        name: "Andika Putra",
        title: "Director, PE Fund",
        text: "Nada insider/investor terasa, tapi tetap kredibel dan netral pada data.",
        isActive: true
      }
    ]
  },

  // Footer
  footer: {
    links: [
      { id: 1, label: "Privacy", href: "#privacy", isVisible: true },
      { id: 2, label: "Terms", href: "#terms", isVisible: true },
      { id: 3, label: "Contact", href: "#contact", isVisible: true }
    ],
    copyright: "Western Star. All rights reserved."
  }
};

// CMS Helper functions
export const updateCMSData = (section, field, value) => {
  console.log(`updateCMSData called - Section: ${section}, Field: ${field}`, value)
  
  // Get current data including any saved changes
  const currentData = JSON.parse(JSON.stringify(getCMSData())); // Deep copy to avoid mutations
  
  // Ensure the section exists
  if (!currentData[section]) {
    currentData[section] = {};
  }
  
  if (typeof currentData[section] === 'object' && currentData[section] !== null) {
    if (field.includes('.')) {
      // Handle nested fields like 'hero.title'
      const keys = field.split('.');
      let target = currentData[section];
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
    } else {
      currentData[section][field] = value;
    }
  } else {
    // If section is not an object, create a new object
    currentData[section] = { [field]: value };
  }
  
  // Save the updated data to localStorage
  const dataToSave = JSON.stringify(currentData)
  localStorage.setItem('westernStarCMS', dataToSave);
  
  console.log(`CMS Data Updated and Saved - Section: ${section}, Field: ${field}`, value);
  console.log('Full updated data saved to localStorage:', currentData);
  
  // Verify the save by reading it back
  const verification = localStorage.getItem('westernStarCMS')
  if (verification) {
    try {
      const parsed = JSON.parse(verification)
      console.log('Verification - data read back from localStorage:', parsed[section]?.[field])
    } catch (e) {
      console.error('Verification failed - could not parse saved data:', e)
    }
  }
  
  // Trigger a custom event to notify components of data changes
  window.dispatchEvent(new CustomEvent('cmsDataUpdated', { 
    detail: { section, field, value } 
  }));
};

// Set an entire CMS section
export const setCMSData = (section, data) => {
  // Get current data including any saved changes
  const currentData = getCMSData();
  
  // Set the entire section
  currentData[section] = data;
  
  // Save the updated data to localStorage
  localStorage.setItem('westernStarCMS', JSON.stringify(currentData));
  
  // Trigger a custom event to notify components of data changes
  window.dispatchEvent(new CustomEvent('cmsDataUpdated', { 
    detail: { section, data } 
  }));
};

// Helper: shallow-deep merge to preserve new defaults while keeping saved edits
function mergeDefaults(defaults, saved) {
  if (!saved) return defaults
  const out = { ...defaults }
  for (const key of Object.keys(saved)) {
    const sVal = saved[key]
    const dVal = defaults[key]
    if (Array.isArray(sVal)) {
      out[key] = sVal // prefer user arrays
    } else if (sVal && typeof sVal === 'object' && dVal && typeof dVal === 'object') {
      out[key] = { ...dVal, ...sVal }
    } else if (sVal !== undefined) {
      out[key] = sVal
    }
  }
  return out
}

export const getAvailableTags = () => {
  // Convert the availableTags from cmsData to the expected format
  return cmsData.availableTags.map(tag => ({
    value: tag.name,
    label: tag.name,
    color: tag.color,
    active: tag.isActive
  }));
};

// Clear CMS cache
export const clearCMSCache = () => {
  localStorage.removeItem('westernStarCMS')
  console.log('CMS cache cleared')
}

// Fix the getCMSData function - the field parameter was missing
export const getCMSData = (section = null, field = null) => {
  // In a real application, this would fetch from a database
  const savedRaw = localStorage.getItem('westernStarCMS')
  let data = JSON.parse(JSON.stringify(cmsData)) // Deep copy of defaults
  
  if (savedRaw) {
    try {
      const savedParsed = JSON.parse(savedRaw)
      console.log('Loading saved data from localStorage:', savedParsed)
      
      // For arrays like news.items, we want to completely replace with saved data
      // For objects, we want to merge
      Object.keys(savedParsed).forEach(sectionKey => {
        const savedSection = savedParsed[sectionKey]
        const defaultSection = data[sectionKey]
        
        if (Array.isArray(savedSection)) {
          // Replace arrays completely
          data[sectionKey] = savedSection
        } else if (savedSection && typeof savedSection === 'object' && defaultSection && typeof defaultSection === 'object') {
          // Merge objects, but handle special cases
          if (sectionKey === 'news' && savedSection.items) {
            // For news section, replace items array but merge other properties
            data[sectionKey] = {
              ...defaultSection,
              ...savedSection,
              items: savedSection.items // Ensure items array is replaced completely
            }
          } else {
            // Deep merge for other object sections
            data[sectionKey] = mergeDefaults(defaultSection, savedSection)
          }
        } else {
          // Replace primitive values
          data[sectionKey] = savedSection
        }
      })
      
      console.log('Final merged data:', data)
    } catch (e) {
      console.error('Error parsing localStorage:', e)
      // ignore parse errors and fall back to defaults
    }
  }
  
  if (!section) return data
  if (!field) return data[section]
  
  if (field.includes('.')) {
    const keys = field.split('.')
    let result = data[section]
    for (const key of keys) {
      result = result?.[key]
      if (result === undefined) break
    }
    return result
  }
  
  return data[section]?.[field]
}

// Restore helpers used by the CMS Admin
export const addTrendingTopic = (newTopic) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const newId = Math.max(0, ...currentTopics.map(t => t.id || 0)) + 1
  const topicWithId = { ...newTopic, id: newId }
  
  updateCMSData('trendingTopics', 'items', [...currentTopics, topicWithId])
  return topicWithId
}

export const updateTrendingTopic = (id, updatedTopic) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const updatedTopics = currentTopics.map(topic => 
    topic.id === id ? { ...topic, ...updatedTopic } : topic
  )
  
  updateCMSData('trendingTopics', 'items', updatedTopics)
}

export const deleteTrendingTopic = (id) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const filteredTopics = currentTopics.filter(topic => topic.id !== id)
  
  updateCMSData('trendingTopics', 'items', filteredTopics)
}

// Newsletter Management Functions
export const addNewsletter = (newsletter) => {
  const newsletters = getCMSData('newsletters') || { items: [] }
  const currentNewsletters = newsletters.items || []
  const newId = Math.max(0, ...currentNewsletters.map(n => n.id || 0)) + 1
  
  const newNewsletter = {
    id: newId,
    dateAdded: new Date().toISOString(),
    ...newsletter
  }
  
  newsletters.items = [newNewsletter, ...currentNewsletters]
  setCMSData('newsletters', newsletters)
  return newNewsletter.id
}

export const addMultipleNewsletters = (newslettersArray) => {
  const newsletters = getCMSData('newsletters') || { items: [] }
  const currentNewsletters = newsletters.items || []
  let nextId = Math.max(0, ...currentNewsletters.map(n => n.id || 0)) + 1
  
  const newNewsletters = newslettersArray.map(newsletter => ({
    id: nextId++,
    dateAdded: new Date().toISOString(),
    ...newsletter
  }))
  
  newsletters.items = [...newNewsletters, ...currentNewsletters]
  setCMSData('newsletters', newsletters)
  return newNewsletters.map(n => n.id)
}

export const updateNewsletter = (id, updates) => {
  const newsletters = getCMSData('newsletters') || { items: [] }
  const currentNewsletters = newsletters.items || []
  
  const updatedNewsletters = currentNewsletters.map(newsletter => 
    newsletter.id === id ? { 
      ...newsletter, 
      ...updates,
      lastModified: new Date().toISOString()
    } : newsletter
  )
  
  newsletters.items = updatedNewsletters
  setCMSData('newsletters', newsletters)
  return updatedNewsletters.find(n => n.id === id)
}

export const deleteNewsletter = (id) => {
  const newsletters = getCMSData('newsletters') || { items: [] }
  const currentNewsletters = newsletters.items || []
  
  newsletters.items = currentNewsletters.filter(newsletter => newsletter.id !== id)
  setCMSData('newsletters', newsletters)
}

export const importNewslettersFromJSON = (jsonData) => {
  try {
    let parsedData
    if (typeof jsonData === 'string') {
      parsedData = JSON.parse(jsonData)
    } else {
      parsedData = jsonData
    }

    // Validate the JSON structure
    if (!parsedData.newsletters || !Array.isArray(parsedData.newsletters)) {
      throw new Error('JSON must contain a "newsletters" array')
    }

    // Validate each newsletter object
    const requiredFields = ['title', 'date', 'keyDiscussion', 'tags']
    parsedData.newsletters.forEach((newsletter, index) => {
      requiredFields.forEach(field => {
        if (!newsletter[field]) {
          throw new Error(`Newsletter at index ${index} is missing required field: ${field}`)
        }
      })
      
      // Validate date format
      if (isNaN(new Date(newsletter.date))) {
        throw new Error(`Newsletter at index ${index} has invalid date format: ${newsletter.date}`)
      }
      
      // Ensure tags is an array
      if (!Array.isArray(newsletter.tags)) {
        throw new Error(`Newsletter at index ${index} tags must be an array`)
      }
    })

    // Add newsletters to the existing data
    const addedIds = addMultipleNewsletters(parsedData.newsletters)
    return {
      success: true,
      message: `Successfully imported ${parsedData.newsletters.length} newsletters`,
      addedIds
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

// Testimonials management functions
export const addTestimonial = (newTestimonial) => {
  const currentTestimonials = getCMSData('testimonials', 'items') || []
  const newId = Math.max(0, ...currentTestimonials.map(t => t.id || 0)) + 1
  const testimonialWithId = { ...newTestimonial, id: newId }
  
  updateCMSData('testimonials', 'items', [...currentTestimonials, testimonialWithId])
  return testimonialWithId
}

export const updateTestimonial = (id, updatedTestimonial) => {
  const currentTestimonials = getCMSData('testimonials', 'items') || []
  const updatedTestimonials = currentTestimonials.map(testimonial => 
    testimonial.id === id ? { ...testimonial, ...updatedTestimonial } : testimonial
  )
  
  updateCMSData('testimonials', 'items', updatedTestimonials)
}

export const deleteTestimonial = (id) => {
  const currentTestimonials = getCMSData('testimonials', 'items') || []
  const filteredTestimonials = currentTestimonials.filter(testimonial => testimonial.id !== id)
  
  updateCMSData('testimonials', 'items', filteredTestimonials)
}

// Reorder trending topics
export const reorderTrendingTopics = (sourceIndex, destinationIndex) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const reorderedTopics = Array.from(currentTopics)
  const [reorderedItem] = reorderedTopics.splice(sourceIndex, 1)
  reorderedTopics.splice(destinationIndex, 0, reorderedItem)
  
  updateCMSData('trendingTopics', 'items', reorderedTopics)
}

// Move trending topic
export const moveTrendingTopic = (id, direction) => {
  const currentTopics = getCMSData('trendingTopics', 'items') || []
  const topicIndex = currentTopics.findIndex(topic => topic.id === id)
  
  if (topicIndex === -1) return
  
  let newIndex = topicIndex
  if (direction === 'up' && topicIndex > 0) {
    newIndex = topicIndex - 1
  } else if (direction === 'down' && topicIndex < currentTopics.length - 1) {
    newIndex = topicIndex + 1
  }
  
  if (newIndex !== topicIndex) {
    reorderTrendingTopics(topicIndex, newIndex)
  }
}

// News Articles Management Functions
export const addNewsArticle = (newArticle) => {
  console.log('Adding news article:', newArticle)
  const currentNews = getCMSData('news', 'items') || []
  console.log('Current news before adding:', currentNews)
  const newId = Math.max(0, ...currentNews.map(n => n.id || 0)) + 1
  
  // Process article content to auto-generate insights and resources
  const processedArticle = processArticleContent(newArticle)
  
  const articleWithId = { 
    ...processedArticle, 
    id: newId,
    date: new Date().toISOString().split('T')[0],
    lastUpdated: new Date().toISOString().split('T')[0],
    views: 0,
    isVisible: true,
    showcaseSection: newArticle.showcaseSection || 'none', // 'featured', 'mosaic', 'loop', 'none'
    position: newArticle.position || currentNews.length + 1
  }
  
  console.log('Article with ID to be added:', articleWithId)
  const updatedNews = [...currentNews, articleWithId]
  console.log('Updated news array:', updatedNews)
  
  updateCMSData('news', 'items', updatedNews)
  console.log('News article added successfully')
  return articleWithId
}

export const updateNewsArticle = (id, updatedArticle) => {
  const currentNews = getCMSData('news', 'items') || []
  
  // Process article content to auto-generate insights and resources
  const processedUpdate = processArticleContent(updatedArticle)
  
  const updatedNews = currentNews.map(article => 
    article.id === id ? { 
      ...article, 
      ...processedUpdate,
      lastUpdated: new Date().toISOString().split('T')[0]
    } : article
  )
  
  updateCMSData('news', 'items', updatedNews)
}

export const deleteNewsArticle = (id) => {
  const currentNews = getCMSData('news', 'items') || []
  const filteredNews = currentNews.filter(article => article.id !== id)
  
  updateCMSData('news', 'items', filteredNews)
}

export const reorderNewsArticles = (sourceIndex, destinationIndex) => {
  const currentNews = getCMSData('news', 'items') || []
  const reorderedNews = Array.from(currentNews)
  const [reorderedItem] = reorderedNews.splice(sourceIndex, 1)
  reorderedNews.splice(destinationIndex, 0, reorderedItem)
  
  // Update position values to match new order
  const updatedNews = reorderedNews.map((article, index) => ({
    ...article,
    position: index + 1
  }))
  
  updateCMSData('news', 'items', updatedNews)
}

export const moveNewsArticle = (id, direction) => {
  const currentNews = getCMSData('news', 'items') || []
  const articleIndex = currentNews.findIndex(article => article.id === id)
  
  if (articleIndex === -1) return
  
  let newIndex = articleIndex
  if (direction === 'up' && articleIndex > 0) {
    newIndex = articleIndex - 1
  } else if (direction === 'down' && articleIndex < currentNews.length - 1) {
    newIndex = articleIndex + 1
  }
  
  if (newIndex !== articleIndex) {
    reorderNewsArticles(articleIndex, newIndex)
  }
}

export const setNewsShowcaseSection = (id, section) => {
  const currentNews = getCMSData('news', 'items') || []
  const updatedNews = currentNews.map(article => 
    article.id === id ? { ...article, showcaseSection: section } : article
  )
  
  updateCMSData('news', 'items', updatedNews)
}

export const toggleNewsVisibility = (id) => {
  const currentNews = getCMSData('news', 'items') || []
  const updatedNews = currentNews.map(article => 
    article.id === id ? { ...article, isVisible: !article.isVisible } : article
  )
  
  updateCMSData('news', 'items', updatedNews)
}

export const getNewsByShowcaseSection = (section) => {
  const currentNews = getCMSData('news', 'items') || []
  return currentNews
    .filter(article => article.showcaseSection === section && article.isVisible)
    .sort((a, b) => (a.position || 0) - (b.position || 0))
}

export const getFeaturedArticle = () => {
  const featuredNews = getNewsByShowcaseSection('featured')
  return featuredNews[0] || null
}

export const getMosaicArticles = () => {
  return getNewsByShowcaseSection('mosaic')
}

export const getLoopArticles = () => {
  return getNewsByShowcaseSection('loop')
}

// HTML Content Processing Utilities
export const extractKeyInsights = (htmlContent) => {
  if (!htmlContent) return []
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  
  const insights = []
  
  // Look for headings that might indicate key insights
  const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
  headings.forEach(heading => {
    const text = heading.textContent.trim()
    if (text.length > 10 && text.length < 100) {
      insights.push(text)
    }
  })
  
  // Look for strong/bold statements
  const strongElements = doc.querySelectorAll('strong, b')
  strongElements.forEach(element => {
    const text = element.textContent.trim()
    if (text.length > 20 && text.length < 150) {
      insights.push(text)
    }
  })
  
  // Look for list items as potential insights (especially those at the end which are usually key takeaways)
  const listItems = doc.querySelectorAll('li')
  listItems.forEach((item, index) => {
    const text = item.textContent.trim()
    // Prioritize items from lists near the end of the content (likely key takeaways)
    const parentUL = item.closest('ul')
    const allULs = doc.querySelectorAll('ul')
    const isLastList = Array.from(allULs).indexOf(parentUL) >= allULs.length - 2
    
    if (text.length > 20 && text.length < 200 && isLastList) {
      insights.push(text)
    }
  })
  
  // Deduplicate insights
  const uniqueInsights = insights.filter((insight, index, self) => 
    self.findIndex(i => i.toLowerCase() === insight.toLowerCase()) === index
  )
  
  return uniqueInsights.slice(0, 5)
}

export const extractAdditionalResources = (htmlContent, tags = []) => {
  if (!htmlContent) return []
  
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  
  const resources = []
  
  // Look for links as resources
  const links = doc.querySelectorAll('a[href]')
  links.forEach(link => {
    const href = link.getAttribute('href')
    const text = link.textContent.trim()
    
    if (href && text && href !== '#' && !href.startsWith('javascript:')) {
      resources.push({
        title: text,
        url: href,
        type: getResourceType(href, text)
      })
    }
  })
  
  // Add tag-based related articles
  const relatedArticles = getRelatedArticles(tags)
  relatedArticles.forEach(article => {
    resources.push({
      title: article.title,
      url: `/news/${article.slug || article.id}`,
      type: 'Related Article'
    })
  })
  
  return resources.slice(0, 8) // Limit to 8 resources
}

const getResourceType = (url, text) => {
  const lowerUrl = url.toLowerCase()
  const lowerText = text.toLowerCase()
  
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('vimeo.com')) {
    return 'Video'
  }
  if (lowerUrl.includes('.pdf')) {
    return 'PDF'
  }
  if (lowerText.includes('download') || lowerText.includes('report')) {
    return 'Download'
  }
  if (lowerUrl.includes('blog') || lowerUrl.includes('article')) {
    return 'Article'
  }
  if (lowerUrl.startsWith('mailto:')) {
    return 'Contact'
  }
  
  return 'Link'
}

export const getRelatedArticles = (tags = [], currentArticleId = null) => {
  if (!tags.length) return []
  
  const allNews = getCMSData('news', 'items') || []
  const tagSet = new Set(tags.map(tag => tag.toLowerCase()))
  
  return allNews
    .filter(article => {
      if (article.id === currentArticleId) return false
      if (!article.isVisible) return false
      if (!article.tags || !article.tags.length) return false
      
      // Check if any tags match
      return article.tags.some(tag => tagSet.has(tag.toLowerCase()))
    })
    .sort((a, b) => {
      // Sort by number of matching tags (descending)
      const aMatches = a.tags.filter(tag => tagSet.has(tag.toLowerCase())).length
      const bMatches = b.tags.filter(tag => tagSet.has(tag.toLowerCase())).length
      if (aMatches !== bMatches) return bMatches - aMatches
      
      // Then by date (newest first)
      return new Date(b.date) - new Date(a.date)
    })
    .slice(0, 4) // Limit to 4 related articles
}

export const processArticleContent = (article) => {
  if (!article.content) return article
  
  const processedArticle = { ...article }
  
  // Auto-generate insights if not manually set
  if (!processedArticle.insights || processedArticle.insights.length === 0) {
    processedArticle.insights = extractKeyInsights(article.content)
  }
  
  // Auto-generate resources if not manually set
  if (!processedArticle.resources || processedArticle.resources.length === 0) {
    processedArticle.resources = extractAdditionalResources(article.content, article.tags)
  }
  
  return processedArticle
}

// Utility to refresh all articles and auto-generate their insights and resources
export const refreshAllArticleContent = () => {
  const currentNews = getCMSData('news', 'items') || []
  
  const updatedNews = currentNews.map(article => {
    // Force regeneration by temporarily clearing existing insights/resources
    const articleForProcessing = {
      ...article,
      insights: [], // Force regeneration
      resources: [] // Force regeneration
    }
    return processArticleContent(articleForProcessing)
  })
  
  updateCMSData('news', 'items', updatedNews)
  return updatedNews.length
}

// Debug utilities
export const debugNewsData = () => {
  console.log('=== NEWS DEBUG INFO ===')
  
  // Check localStorage directly
  const localStorageData = localStorage.getItem('westernStarCMS')
  console.log('LocalStorage raw data exists:', !!localStorageData)
  
  if (localStorageData) {
    try {
      const parsed = JSON.parse(localStorageData)
      console.log('Parsed localStorage keys:', Object.keys(parsed))
      console.log('News section in localStorage:', parsed.news)
      console.log('News items count in localStorage:', parsed.news?.items?.length || 0)
      
      if (parsed.news?.items) {
        parsed.news.items.forEach((item, index) => {
          console.log(`Article ${index + 1}:`, {
            id: item.id,
            title: item.title,
            isVisible: item.isVisible,
            showcaseSection: item.showcaseSection
          })
        })
      }
    } catch (e) {
      console.error('Error parsing localStorage:', e)
    }
  }
  
  // Check default cmsData
  console.log('Default cmsData news:', cmsData.news)
  console.log('Default news items count:', cmsData.news?.items?.length || 0)
  
  // Check getCMSData output
  const cmsNewsData = getCMSData('news')
  console.log('CMS News data from getCMSData:', cmsNewsData)
  console.log('News items count from getCMSData:', cmsNewsData?.items?.length || 0)
  
  const newsItems = getCMSData('news', 'items')
  console.log('News items specifically from getCMSData:', newsItems)
  console.log('News items count specifically:', newsItems?.length || 0)
  
  // Check showcase functions
  console.log('Featured articles:', getFeaturedArticle())
  console.log('Mosaic articles:', getMosaicArticles())
  console.log('Loop articles:', getLoopArticles())
  
  return {
    localStorage: localStorageData,
    cmsNewsData,
    newsItems,
    hasLocalStorageData: !!localStorageData,
    localStorageItemsCount: localStorageData ? (JSON.parse(localStorageData).news?.items?.length || 0) : 0,
    getCMSDataItemsCount: newsItems?.length || 0
  }
}

// Utility to clear all CMS data and reset to defaults
export const resetCMSData = () => {
  localStorage.removeItem('westernStarCMS')
  console.log('CMS data cleared from localStorage')
  window.dispatchEvent(new CustomEvent('cmsDataUpdated', { detail: { reset: true } }))
  return getCMSData()
}

// Test localStorage persistence
export const testLocalStorage = () => {
  console.log('=== TESTING LOCALSTORAGE PERSISTENCE ===')
  
  // Test 1: Add a simple test article
  const testArticle = {
    title: "Test Article " + Date.now(),
    summary: "This is a test article to verify localStorage persistence",
    content: "<p>Test content</p>",
    category: "TECHNOLOGY",
    tags: ["TECHNOLOGY"],
    author: { name: "Test Author", role: "Tester" },
    image: { url: "https://via.placeholder.com/400x200", alt: "Test image" }
  }
  
  console.log('Adding test article:', testArticle)
  const addedArticle = addNewsArticle(testArticle)
  console.log('Article added with ID:', addedArticle.id)
  
  // Test 2: Verify immediate retrieval
  const immediateCheck = getCMSData('news', 'items')
  console.log('Immediate check - articles in memory:', immediateCheck.length)
  
  // Test 3: Simulate page refresh by clearing runtime cache and re-reading
  console.log('Simulating page refresh...')
  const freshData = (() => {
    const savedRaw = localStorage.getItem('westernStarCMS')
    if (!savedRaw) return null
    return JSON.parse(savedRaw)
  })()
  
  console.log('Fresh data from localStorage:', freshData?.news?.items?.length || 0)
  
  if (freshData?.news?.items) {
    const foundTestArticle = freshData.news.items.find(item => item.id === addedArticle.id)
    console.log('Test article found after simulated refresh:', !!foundTestArticle)
  }
  
  return {
    testArticleId: addedArticle.id,
    immediateCount: immediateCheck.length,
    persistedCount: freshData?.news?.items?.length || 0,
    success: (immediateCheck.length === (freshData?.news?.items?.length || 0))
  }
}
