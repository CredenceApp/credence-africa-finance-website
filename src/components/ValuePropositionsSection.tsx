import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Sprout, Building2, TrendingUp, ArrowRight } from "lucide-react";

export function ValuePropositionsSection() {
  const propositions = [
    {
      icon: Sprout,
      audience: "Agri-SMEs & Exporters",
      headline: "Fuel your next trade with flexible, data-backed financing.",
      body: "Credence enables agri-businesses and exporters to unlock working capital for verified trades—fast, transparent, and built to scale.",
      bgGradient: "from-tertiary to-tertiary/50",
      iconColor: "text-primary"
    },
    {
      icon: Building2,
      audience: "Large Corporates",
      headline: "Seamless financing for complex supply chains.",
      body: "Whether you're processing commodities or managing bulk exports, Credence delivers structured, low-friction financing so you can focus on what matters, fulfilling demand and growing your footprint.",
      bgGradient: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary"
    },
    {
      icon: TrendingUp,
      audience: "Financiers",
      headline: "Access curated trade opportunities across high-growth African markets.",
      body: "Credence connects you to pre-vetted, real-economy trade deals—de-risked through data, structured for impact, and aligned with your return profile.",
      bgGradient: "from-primary/20 to-primary/5",
      iconColor: "text-primary"
    }
  ];

  return (
    <section id="value-propositions" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
            Tailored Solutions for Every Stakeholder
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
            Discover how Credence empowers different participants in the African agricultural trade ecosystem
          </p>
        </div>

        <div className="space-y-8">
          {propositions.map((prop, index) => (
            <Card key={index} className={`border-0 shadow-lg overflow-hidden bg-gradient-to-r ${prop.bgGradient}`}>
              <CardContent className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                      <prop.icon className={`h-8 w-8 ${prop.iconColor}`} />
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        {prop.audience}
                      </p>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        {prop.headline}
                      </h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                      {prop.body}
                    </p>
                  </div>
                  
                  <div className="lg:col-span-3 flex justify-center lg:justify-end">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-white font-semibold"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}