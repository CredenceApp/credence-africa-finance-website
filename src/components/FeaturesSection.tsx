import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Smartphone, Shield, Zap, HeadphonesIcon, Globe2, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturesSection() {
  const features = [
    {
      icon: Smartphone,
      title: "Digital First",
      description: "Modern digital platforms for seamless financial management"
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Bank-grade security with full regulatory compliance"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick turnaround times for all financial services"
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Round-the-clock customer support across all time zones"
    },
    {
      icon: Globe2,
      title: "Pan-African Network",
      description: "Extensive network across African financial markets"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Consistent track record of delivering exceptional returns"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary to-primary/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Why African Businesses Trust Credence
              </h2>
              <p className="text-xl text-gray-200">
                We combine deep local market knowledge with international best practices 
                to deliver superior financial solutions.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-white/10 border-white/20 text-white">
                  <CardHeader className="pb-3">
                    <feature.icon className="h-8 w-8 text-yellow-400 mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-200 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500">
              Explore Our Capabilities
            </Button>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnZlc3RtZW50JTIwZ3Jvd3RoJTIwY2hhcnR8ZW58MXx8fHwxNzU1NTQ2MzM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Investment growth charts"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Floating stats card */}
            <Card className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">98%</div>
                    <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">24hrs</div>
                    <div className="text-sm text-muted-foreground">Average Response</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}