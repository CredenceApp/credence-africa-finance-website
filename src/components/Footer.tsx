import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        "Trade Finance",
        "Digital Marketplace", 
        "Risk Guarantee Infrastructure",
        "LPO Financing",
        "Invoice Discounting",
        "Supply Chain Finance"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Our Team",
        "Careers",
        "News & Insights",
        "Case Studies"
      ]
    },
    {
      title: "Support",
      links: [
        "Contact Us",
        "Help Center",
        "Documentation",
        "API Reference",
        "System Status",
        "Security"
      ]
    },
    {
      title: "Resources",
      links: [
        "Market Reports",
        "Financial Tools",
        "Testimonials",
        "Regulatory Updates",
        "FAQs",
        "KYB Onboarding Portal",
        "Financiers Portal"
      ]
    }
  ];

  const socialLinks = [
    // { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/credence54inc?s=21", label: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/credenceapphq/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/credence54inc?igsh=MjF0bTk3b29xcWt2&utm_source=qr", label: "Instagram" }
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-3xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                Credence
              </span>
              <p className="text-gray-300 mt-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                Comprehensive trade infrastructure suite powering agricultural finance across Africa.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-3" />
                <span className="text-sm" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>support@credenceapp.co</span>
              </div>
              <div className="text-gray-300 text-sm" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                1-11 Commercial Avenue, Yaba, Lagos
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-3">
              <h4 className="font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                Stay Updated
              </h4>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-secondary"
                />
                <Button 
                  size="sm" 
                  className="bg-secondary hover:bg-secondary/90 text-white font-semibold px-6"
                >
                  Subscribe
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white hover:bg-white/10 p-2"
                  asChild
                >
                  <a href={social.href} target='_blank' aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-white" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                      style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-300">
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>© CredenceApp Africa Limited 2025. All Rights Reserved.</span>
            <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}