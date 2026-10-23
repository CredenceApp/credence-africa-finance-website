import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, Award, MapPin, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  const achievements = [
    {
      icon: Award,
      title: "Industry Recognition",
      description: "Top Financial Services Provider in Africa 2024"
    },
    {
      icon: MapPin,
      title: "Pan-African Presence",
      description: "Operating across 15+ African countries"
    },
    {
      icon: Clock,
      title: "Proven Track Record",
      description: "Over 10 years of successful operations"
    }
  ];

  const values = [
    "Deep understanding of African markets",
    "Commitment to sustainable financial growth",
    "Innovative solutions for emerging economies",
    "Strong regulatory compliance and transparency",
    "Local expertise with global standards"
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Leading Financial Innovation in Africa
              </h2>
              <p className="text-xl text-muted-foreground">
                Credence Africa Finance is a premier financial services firm dedicated to unlocking 
                the vast potential of African markets through innovative financial solutions and 
                strategic partnerships.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Why Choose Credence?</h3>
              <ul className="space-y-3">
                {values.map((value, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="w-full sm:w-auto">
              Learn More About Us
            </Button>
          </div>

          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1650784854945-264d5b0b6b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjb25zdWx0aW5nJTIwdGVhbXxlbnwxfHx8fDE3NTU2NDExNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Financial consulting team"
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="grid gap-4">
              {achievements.map((achievement, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="flex items-center p-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <achievement.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}