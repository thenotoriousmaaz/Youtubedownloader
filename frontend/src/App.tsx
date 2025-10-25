import React from 'react'
import DownloaderCard from '@/components/DownloaderCard'
import { Youtube, Zap, Shield, Smartphone, HardDrive, Music, Video, Download, CheckCircle, ChevronDown } from 'lucide-react'

export default function App() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Downloads",
      description: "Download YouTube videos and audio at maximum speed. Our optimized servers ensure the fastest download experience possible."
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "No malware, no viruses, no registration required. Your privacy is our priority. Download videos safely and securely."
    },
    {
      icon: Smartphone,
      title: "Works on All Devices",
      description: "Download YouTube videos on any device - desktop, tablet, or mobile. Compatible with Windows, Mac, Linux, iOS, and Android."
    },
    {
      icon: HardDrive,
      title: "Multiple Quality Options",
      description: "Choose from various quality options including 4K, 1080p, 720p, 480p, and more. Download in the quality that suits your needs."
    },
    {
      icon: Music,
      title: "Extract Audio to MP3",
      description: "Convert YouTube videos to MP3 audio files. Perfect for creating music playlists and podcasts without video."
    },
    {
      icon: Video,
      title: "Support for All Formats",
      description: "Download videos in MP4, WEBM, and other popular formats. Audio downloads available in MP3, M4A, and more."
    }
  ]

  const faqs = [
    {
      question: "Is YT Downloader free to use?",
      answer: "Yes, absolutely! YT Downloader is completely free to use with no hidden charges. You can download unlimited YouTube videos and audio without any registration or subscription fees."
    },
    {
      question: "What video formats and quality options are available?",
      answer: "We support multiple video formats including MP4 and WEBM. Quality options range from 144p to 4K (2160p), including 240p, 360p, 480p, 720p (HD), and 1080p (Full HD). For audio, we offer MP3 and M4A formats in various bitrates."
    },
    {
      question: "Do I need to install any software or browser extension?",
      answer: "No installation required! YT Downloader is a web-based online tool that works directly in your browser. Simply paste the YouTube video URL and download - no software, extensions, or plugins needed."
    },
    {
      question: "Can I download YouTube videos on my mobile phone?",
      answer: "Yes! YT Downloader works perfectly on all mobile devices including iPhone, iPad, Android phones, and tablets. Our responsive design ensures a seamless experience on any screen size."
    },
    {
      question: "Is it legal to download YouTube videos?",
      answer: "Downloading videos for personal use is generally acceptable, but you should always respect copyright laws and YouTube's terms of service. Only download videos you have permission to download or that are in the public domain."
    },
    {
      question: "How do I download a YouTube video?",
      answer: "It's simple: 1) Copy the YouTube video URL, 2) Paste it into our downloader above, 3) Click 'Download', 4) Choose your preferred format and quality, 5) Save the file to your device."
    },
    {
      question: "Can I convert YouTube videos to MP3?",
      answer: "Yes! Our YouTube to MP3 converter allows you to extract audio from any YouTube video. Simply select the MP3 audio format option after fetching the video information."
    },
    {
      question: "Are there any download limits?",
      answer: "No limits! You can download as many YouTube videos and audio files as you want. We don't impose any restrictions on the number of downloads per day or month."
    },
    {
      question: "Why is my download slow?",
      answer: "Download speed depends on several factors including your internet connection, server load, and video size. We use high-speed servers to ensure optimal download performance. Larger files and higher quality videos naturally take longer to download."
    },
    {
      question: "Can I download private or age-restricted videos?",
      answer: "No, we can only download publicly available YouTube videos. Private videos, age-restricted content that requires login, and videos with download restrictions cannot be downloaded."
    }
  ]

  const howToSteps = [
    {
      step: 1,
      title: "Copy YouTube Video URL",
      description: "Go to YouTube and find the video you want to download. Copy the video URL from your browser's address bar or use the share button."
    },
    {
      step: 2,
      title: "Paste URL in Downloader",
      description: "Paste the copied YouTube video URL into the input field above and click the 'Download' button."
    },
    {
      step: 3,
      title: "Choose Format & Quality",
      description: "Select your preferred video format (MP4, WEBM) and quality (4K, 1080p, 720p, etc.) or choose audio format (MP3) for music downloads."
    },
    {
      step: 4,
      title: "Download to Your Device",
      description: "Click the download button for your chosen format. The file will be saved to your device's download folder."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal Header */}
      <header className="glass-header sticky top-0 z-50 fade-in">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Youtube className="w-7 h-7 text-gray-900" />
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">Youtube Video Downloader</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Big Centered Content */}
      <main className="flex-1 px-6 py-20">
        <div className="w-full max-w-4xl mx-auto">
          {/* Large Hero Text */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight leading-none">
              Download.
              <br />
              <span className="text-gray-400">Anywhere.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
              The fastest way to save your favorite YouTube videos and music.
            </p>
          </div>

          {/* Main Downloader Card - Big and Centered */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <DownloaderCard />
          </div>
        </div>

        {/* SEO Content Sections */}
        <div className="max-w-7xl mx-auto mt-32">
           {/* Features Section */}
           <section className="mb-32">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                 Why Choose Youtube Video Downloader?
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                 The best free YouTube video downloader with powerful features
               </p>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               {features.map((feature, index) => (
                 <div 
                   key={index}
                   className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all hover:transform hover:scale-105"
                   style={{ animationDelay: `${index * 0.1}s` }}
                 >
                   <feature.icon className="w-12 h-12 text-gray-700 mb-4" />
                   <h3 className="text-xl font-semibold text-gray-900 mb-3">
                     {feature.title}
                   </h3>
                   <p className="text-gray-600 leading-relaxed">
                     {feature.description}
                   </p>
                 </div>
               ))}
             </div>
           </section>

           {/* How It Works Section */}
           <section className="mb-32">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                 How to Download YouTube Videos
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                 Download any YouTube video in just 4 simple steps
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
               {howToSteps.map((item, index) => (
                 <div 
                   key={index}
                   className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all relative"
                 >
                   <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                     {item.step}
                   </div>
                   <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-2">
                     {item.title}
                   </h3>
                   <p className="text-gray-600 leading-relaxed">
                     {item.description}
                   </p>
                 </div>
               ))}
             </div>
           </section>

           {/* About Section - Rich Content for SEO */}
           <section className="mb-32 max-w-4xl mx-auto">
             <div className="bg-white backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-lg">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                 Free YouTube Video Downloader Online
               </h2>
               <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
                 <p>
                   <strong className="text-gray-900">Youtube Video Downloader</strong> is the most reliable and user-friendly free YouTube video downloader available online. Whether you want to download YouTube videos to watch offline, convert YouTube to MP3 for your music collection, or save educational content for later viewing, our tool makes it incredibly easy and fast.
                 </p>
                 <p>
                   Our YouTube downloader supports all video quality options from standard definition (SD) to ultra high definition (4K). You can download videos in 144p, 240p, 360p, 480p, 720p HD, 1080p Full HD, and even 4K 2160p resolution depending on the source video's available formats. This flexibility ensures you get exactly what you need - whether you're saving storage space or want the highest quality possible.
                 </p>
                 <p>
                   As a <strong className="text-gray-900">YouTube to MP3 converter</strong>, our tool excels at extracting audio from videos. Perfect for downloading music, podcasts, interviews, or any audio content from YouTube. The MP3 files are high quality and compatible with all devices and media players. You can also download in other audio formats like M4A for even better quality.
                 </p>
                 <p>
                   Unlike other YouTube downloaders that require software installation or browser extensions, Youtube Video Downloader is completely web-based. This means it works on any device with a web browser - Windows PC, Mac, Linux, iPhone, iPad, Android phones and tablets. No downloads, no installations, no hassle. Just paste the URL and download.
                 </p>
                 <p>
                   We prioritize your <strong className="text-gray-900">privacy and security</strong>. Our service doesn't require registration, doesn't store your download history, and doesn't track your activity. The downloads are direct from YouTube's servers to your device, ensuring fast speeds and security. We never inject malware or unwanted software into your downloads.
                 </p>
                 <p>
                   Whether you're a content creator needing reference material, a student saving educational videos, or someone who loves collecting favorite content, Youtube Video Downloader is your go-to solution for downloading YouTube videos and audio. Fast, free, and unlimited downloads with no restrictions.
                 </p>
               </div>
             </div>
           </section>

           {/* Supported Formats Section */}
           <section className="mb-32">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                 Supported Formats & Quality
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                 Download in your preferred format and quality
               </p>
             </div>
             <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                 <Video className="w-10 h-10 text-gray-700 mb-4" />
                 <h3 className="text-2xl font-semibold text-gray-900 mb-4">Video Formats</h3>
                 <ul className="space-y-3 text-gray-600">
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">MP4</strong> - Most compatible video format</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">WEBM</strong> - High quality web format</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">4K (2160p)</strong> - Ultra HD quality</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">1080p</strong> - Full HD quality</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">720p</strong> - HD quality</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">480p, 360p, 240p, 144p</strong> - Standard quality</span>
                   </li>
                 </ul>
               </div>
               <div className="bg-white backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                 <Music className="w-10 h-10 text-gray-700 mb-4" />
                 <h3 className="text-2xl font-semibold text-gray-900 mb-4">Audio Formats</h3>
                 <ul className="space-y-3 text-gray-600">
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">MP3</strong> - Universal audio format</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">M4A</strong> - High quality audio</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">320kbps</strong> - Best audio quality</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">256kbps</strong> - High quality</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">192kbps</strong> - Good quality</span>
                   </li>
                   <li className="flex items-center gap-3">
                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                     <span><strong className="text-gray-900">128kbps</strong> - Standard quality</span>
                   </li>
                 </ul>
               </div>
             </div>
           </section>

           {/* FAQ Section */}
           <section className="mb-32">
             <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                 Frequently Asked Questions
               </h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                 Everything you need to know about downloading YouTube videos
               </p>
             </div>
             <div className="max-w-4xl mx-auto space-y-4">
               {faqs.map((faq, index) => (
                 <div 
                   key={index}
                   className="bg-white backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                 >
                   <button
                     onClick={() => setOpenFaq(openFaq === index ? null : index)}
                     className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                   >
                     <h3 className="text-lg font-semibold text-gray-900 pr-4">
                       {faq.question}
                     </h3>
                     <ChevronDown 
                       className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                         openFaq === index ? 'rotate-180' : ''
                       }`}
                     />
                   </button>
                   {openFaq === index && (
                     <div className="px-8 pb-6">
                       <p className="text-gray-600 leading-relaxed">
                         {faq.answer}
                       </p>
                     </div>
                   )}
                 </div>
               ))}
             </div>
           </section>

           {/* Additional SEO Content */}
           <section className="mb-32 max-w-4xl mx-auto">
             <div className="bg-white backdrop-blur-sm rounded-2xl p-12 border border-gray-200 shadow-lg">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                 The Best YouTube Video Downloader for All Your Needs
               </h2>
               <div className="space-y-4 text-gray-600 leading-relaxed">
                 <p>
                   Looking for a reliable <strong className="text-gray-900">YouTube video downloader</strong> that actually works? Youtube Video Downloader is trusted by millions of users worldwide for downloading YouTube videos quickly and easily. Our service is optimized for speed, reliability, and ease of use.
                 </p>
                 <p>
                   Whether you need a <strong className="text-gray-900">YouTube to MP4 converter</strong> or <strong className="text-gray-900">YouTube to MP3 converter</strong>, we've got you covered. Our advanced download technology ensures you get the best quality available while maintaining fast download speeds. We support videos from all YouTube categories - music videos, tutorials, vlogs, educational content, entertainment, and more.
                 </p>
                 <p>
                   Students, teachers, content creators, and casual users all love Youtube Video Downloader for its simplicity and reliability. Download lecture videos for offline study, save music videos for your collection, archive important content, or keep entertainment videos for travel when you don't have internet access.
                 </p>
                 <p>
                   Our <strong className="text-gray-900">online video downloader</strong> is constantly updated to ensure compatibility with YouTube's latest changes. We monitor and maintain our service 24/7 to provide you with uninterrupted downloading capabilities. No matter when you need to download a video, Youtube Video Downloader is ready to serve you.
                 </p>
                 <p>
                   Start downloading your favorite YouTube videos today - no account needed, no software to install, completely free forever!
                 </p>
               </div>
             </div>
           </section>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="py-12 px-6 fade-in border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Youtube className="w-6 h-6 text-gray-900" />
                <span className="font-semibold text-gray-900">Youtube Video Downloader</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                The fastest and most reliable free YouTube video and audio downloader. Download unlimited videos in HD quality.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How to Use</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">YouTube to MP4</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">YouTube to MP3</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Video Downloader</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Audio Converter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">DMCA</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2025 Youtube Video Downloader. All rights reserved. Please respect copyright laws and YouTube's Terms of Service.
              </p>
              <p className="text-gray-500 text-sm">
                Made with ♥ for YouTube lovers worldwide
              </p>
            </div>
          </div>
      </div>
      </footer>
    </div>
  )
}
