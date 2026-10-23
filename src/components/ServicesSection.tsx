import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, Users, Shield, CreditCard, Network, FileCheck } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: TrendingUp,
      title: "Trade Finance",
      audience: "Agri-SMEs & Corporates",
      description: "LPO financing, invoice discounting, and purchase order structuring for agri-businesses.",
      features: [
        "Supply chain financing",
        "Invoice Factoring", 
        "PO Financing"
      ],
      bgColor: "bg-tertiary",
      iconColor: "text-primary"
    },
    {
      icon: Network,
      title: "Digital Marketplace",
      audience: "Buyers & Suppliers",
      description: "Verified supplier-buyer matchmaking with integrated trade finance solutions.",
      features: [
        "Verified Suppliers",
        "Buyer Network",
        "Trade Matching",
        "Credit Scoring"
      ],
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary"
    },
    {
      icon: Shield,
      title: "Risk Guarantee Infrastructure",
      audience: "Financiers & Traders",
      description: "Digital guarantees, credit risk cover, and payment triggers for secure trading.",
      features: [
        "Digital Guarantees",
        "Payment Protection",
        "Risk Assessment",
        "Insurance Coverage"
      ],
      bgColor: "bg-primary/10",
      iconColor: "text-primary"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
            How we Power Trades
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
            Comprehensive Trade Infrastructure Suite
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <CardHeader className="space-y-4 pb-6">
                <div className={`w-16 h-16 rounded-xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                </div>
                <div className="space-y-2">
                  <Badge variant="outline" className="text-xs font-medium" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                    {service.audience}
                  </Badge>
                  <CardTitle className="text-2xl" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                    {service.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                        <div className="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}