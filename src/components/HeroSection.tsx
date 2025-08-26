import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { ArrowRight, TrendingUp, FileText, Wallet, Search, BarChart3, Users, DollarSign, Activity, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import doodlePattern from 'figma:asset/1b5c0b80cb216a17454708a3d7522ed5f7aea094.png';

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const words = ["Structuring", "Derisking", "Financing"];

  const dashboardViews = [
    {
      title: "Trade Finance Dashboard",
      metrics: [
        { label: "Active Trades", value: "₦1.2B", color: "text-primary", bgColor: "bg-tertiary" },
        { label: "Monthly Growth", value: "+34%", color: "text-secondary", bgColor: "bg-secondary/10" }
      ],
      stats: [
        { label: "Trades Financed", value: "32", color: "text-primary" },
        { label: "Trades Processing", value: "12", color: "text-secondary" },
        { label: "Success Rate", value: "98.7%", color: "text-green-600" }
      ],
      actions: [
        { icon: FileText, label: "Submit LPO" },
        { icon: Search, label: "Track Trade" },
        { icon: Wallet, label: "View Wallet" }
      ]
    },
    {
      title: "Portfolio Analytics",
      metrics: [
        { label: "Total Volume", value: "₦3.8B", color: "text-primary", bgColor: "bg-tertiary" },
        { label: "ROI", value: "+18.5%", color: "text-secondary", bgColor: "bg-secondary/10" }
      ],
      stats: [
        { label: "Active Partners", value: "45", color: "text-primary" },
        { label: "Avg Deal Size", value: "₦37M", color: "text-secondary" },
        { label: "Processing Time", value: "2.3 days", color: "text-muted-foreground" }
      ],
      actions: [
        { icon: BarChart3, label: "View Reports" },
        { icon: Users, label: "Partners" },
        { icon: DollarSign, label: "Revenue" }
      ]
    },
    {
      title: "Risk Management",
      metrics: [
        { label: "Risk Score", value: "Low", color: "text-green-600", bgColor: "bg-tertiary" },
        { label: "Coverage", value: "95.2%", color: "text-primary", bgColor: "bg-secondary/10" }
      ],
      stats: [
        { label: "Guaranteed Trades", value: "28", color: "text-green-600" },
        { label: "Claims Ratio", value: "1.3%", color: "text-red-500" },
        { label: "Avg Response", value: "4 hrs", color: "text-primary" }
      ],
      actions: [
        { icon: Activity, label: "Risk Analysis" },
        { icon: CheckCircle, label: "Guarantees" },
        { icon: Clock, label: "Monitoring" }
      ]
    },
    {
      title: "Market Intelligence",
      metrics: [
        { label: "Market Cap", value: "$2.1B", color: "text-primary", bgColor: "bg-tertiary" },
        { label: "Price Trend", value: "+12%", color: "text-secondary", bgColor: "bg-secondary/10" }
      ],
      stats: [
        { label: "Active Markets", value: "18", color: "text-primary" },
        { label: "Price Signals", value: "156", color: "text-secondary" },
        { label: "Volatility", value: "Low", color: "text-green-600" }
      ],
      actions: [
        { icon: TrendingUp, label: "Trends" },
        { icon: BarChart3, label: "Analytics" },
        { icon: Search, label: "Research" }
      ]
    }
  ];

  // Auto-rotate dynamic text
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Fast auto-rotate carousel - pauses on hover
  useEffect(() => {
    if (!isCarouselHovered) {
      const interval = setInterval(() => {
        setCurrentSlide((prev: number) => (prev + 1) % dashboardViews.length);
      }, 5000); // 5 seconds - very dynamic!

      return () => clearInterval(interval);
    }
  }, [isCarouselHovered]);

  return (
    <section id="home" className="relative bg-gradient-to-br from-primary via-primary to-primary/90 text-white overflow-hidden min-h-screen">
      <div className="absolute inset-0 bg-black/10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full animate-pulse"></div>
        <div 
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-tertiary/10 rounded-full animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
        <div 
          className="absolute top-1/2 left-3/4 w-32 h-32 bg-secondary/8 rounded-full animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
        
        {/* Floating animated circles */}
        <div 
          className="absolute top-20 left-20 w-4 h-4 bg-secondary/20 rounded-full animate-bounce"
          style={{ animationDelay: '0.5s' }}
        ></div>
        <div 
          className="absolute top-40 right-32 w-3 h-3 bg-tertiary/30 rounded-full animate-bounce"
          style={{ animationDelay: '1.5s' }}
        ></div>
        <div 
          className="absolute bottom-32 left-16 w-2 h-2 bg-secondary/25 rounded-full animate-bounce"
          style={{ animationDelay: '3s' }}
        ></div>
        <div 
          className="absolute bottom-40 right-20 w-5 h-5 bg-tertiary/20 rounded-full animate-bounce"
          style={{ animationDelay: '2.5s' }}
        ></div>
      </div>

      {/* Doodle Pattern Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url(${doodlePattern})`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat'
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-black leading-tight" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                <span 
                  key={currentWord}
                  className="inline-block animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 text-secondary"
                >
                  {words[currentWord]}
                </span>
                <br />
                <span className="text-white">African Trade</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 max-w-lg leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                Comprehensive trade infrastructure suite powering agricultural finance across Africa.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-secondary text-white hover:bg-secondary/90 font-semibold px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://tally.so/r/mKABMg" target="_blank" rel="noopener noreferrer">
                  Request Financing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Fast Auto-rotating Carousel Dashboard with Hover Effects */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            {/* Hover Activity Ring */}
            {/* <div className={`absolute -inset-4 rounded-2xl transition-all duration-500 ${
              isCarouselHovered 
                ? 'bg-gradient-to-r from-secondary/20 via-tertiary/30 to-secondary/20 animate-pulse shadow-2xl shadow-secondary/25' 
                : 'bg-transparent'
            }`}></div> */}

            {/* Animated Corner Indicators */}
            {/* <div className={`absolute -top-2 -left-2 w-6 h-6 rounded-full transition-all duration-300 ${
              isCarouselHovered 
                ? 'bg-secondary scale-100 animate-ping' 
                : 'bg-transparent scale-0'
            }`}></div>
            <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full transition-all duration-300 ${
              isCarouselHovered 
                ? 'bg-tertiary scale-100 animate-ping' 
                : 'bg-transparent scale-0'
            }`} style={{ animationDelay: '0.5s' }}></div>
            <div className={`absolute -bottom-2 -left-2 w-6 h-6 rounded-full transition-all duration-300 ${
              isCarouselHovered 
                ? 'bg-tertiary scale-100 animate-ping' 
                : 'bg-transparent scale-0'
            }`} style={{ animationDelay: '1s' }}></div>
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full transition-all duration-300 ${
              isCarouselHovered 
                ? 'bg-secondary scale-100 animate-ping' 
                : 'bg-transparent scale-0'
            }`} style={{ animationDelay: '1.5s' }}></div> */}

            {/* Dynamic Border Animation */}
            {/* <div className={`absolute inset-0 rounded-xl transition-all duration-500 ${
              isCarouselHovered 
                ? 'border-2 border-secondary/50 shadow-lg shadow-secondary/20' 
                : 'border-0'
            }`}></div> */}

            <div className={`relative transition-transform duration-300 ${
              isCarouselHovered ? 'scale-105' : 'scale-100'
            }`}>
              <Card className={`bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden transition-all duration-500 ${
                isCarouselHovered ? 'shadow-3xl' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Header with Activity Indicator */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold text-primary" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                          {dashboardViews[currentSlide].title}
                        </h3>
                        {/* Live Activity Indicator */}
                        <div className={`flex items-center space-x-1 transition-all duration-300 ${
                          isCarouselHovered ? 'opacity-100' : 'opacity-60'
                        }`}>
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-green-600 font-medium">LIVE</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                    </div>

                    {/* Live Metrics with Hover Animation */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        Live Metrics
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {dashboardViews[currentSlide].metrics.map((metric, metricIndex) => (
                          <div 
                            key={metricIndex} 
                            className={`${metric.bgColor} rounded-lg p-4 border border-gray-100 transition-all duration-300 ${
                              isCarouselHovered ? 'transform hover:scale-105 shadow-md' : ''
                            }`}
                          >
                            <div className={`text-2xl font-bold ${metric.color} transition-all duration-300 ${
                              isCarouselHovered ? 'animate-pulse' : ''
                            }`} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                              {metric.value}
                            </div>
                            <div className="text-sm text-gray-600" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Stats with Activity Animation */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        Key Stats
                      </h4>
                      <div className="space-y-3">
                        {dashboardViews[currentSlide].stats.map((stat, statIndex) => (
                          <div 
                            key={statIndex} 
                            className={`flex justify-between items-center p-2 rounded transition-all duration-300 ${
                              isCarouselHovered 
                                ? 'hover:bg-gray-50 hover:scale-105 hover:shadow-sm' 
                                : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-gray-600" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                              {stat.label}
                            </span>
                            <span className={`font-bold ${stat.color} transition-all duration-300 ${
                              isCarouselHovered ? 'animate-pulse' : ''
                            }`} style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                              {stat.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions with Enhanced Interactivity */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        Quick Actions
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {dashboardViews[currentSlide].actions.slice(0, 2).map((action, actionIndex) => {
                          const IconComponent = action.icon;
                          return (
                            <Button 
                              key={actionIndex} 
                              size="sm" 
                              variant="outline" 
                              className={`flex items-center justify-center space-x-2 hover:bg-primary/5 hover:border-primary transition-all duration-300 ${
                                isCarouselHovered ? 'hover:scale-105 hover:shadow-md' : ''
                              }`}
                            >
                              <IconComponent className="h-4 w-4" />
                              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>{action.label}</span>
                            </Button>
                          );
                        })}
                        {dashboardViews[currentSlide].actions.length > 2 && (() => {
                          const ThirdAction = dashboardViews[currentSlide].actions[2];
                          const ThirdIconComponent = ThirdAction.icon;
                          return (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className={`flex items-center justify-center space-x-2 col-span-2 hover:bg-secondary/5 hover:border-secondary transition-all duration-300 ${
                                isCarouselHovered ? 'hover:scale-105 hover:shadow-md' : ''
                              }`}
                            >
                              <ThirdIconComponent className="h-4 w-4" />
                              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>{ThirdAction.label}</span>
                            </Button>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Enhanced Slide Indicators with Activity */}
            <div className="flex justify-center mt-4 space-x-2">
              {dashboardViews.map((_, index) => (
                <div 
                  key={index} 
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-secondary scale-125 shadow-lg shadow-secondary/50' 
                      : 'bg-white/50 hover:bg-white/70'
                  } ${isCarouselHovered ? 'animate-pulse' : ''}`}
                ></div>
              ))}
            </div>

            {/* Auto-rotation Status Indicator */}
            <div className={`absolute top-4 right-4 transition-all duration-300 ${
              isCarouselHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              {/* <div className="bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-white font-medium flex items-center space-x-2">
                {isCarouselHovered ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span>PAUSED</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span>AUTO</span>
                  </>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}