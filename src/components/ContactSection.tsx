import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = 'Credence Message Us';
    const body = `
    First Name: ${formData.firstName}
    Last Name: ${formData.lastName}
    Email: ${formData.email}
    Company: ${formData.company}
    Message: ${formData.message}
    `;

    // Encode Subject and Body for URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Open default mail client with preferred email
    // window.location.href = `mailto:support@credenceapp.co?subject=${encodedSubject}&body=${encodedBody}`
    const mailtoLink = `mailto:support@credenceapp.co?subject=${encodedSubject}&body=${encodedBody}`

    // Open email client once
    window.open(mailtoLink, '_blank');
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      details: ["support@credenceapp.co"]
    },
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+234 (0)708 274 8826", "Monday-Friday, 8 AM-6 PM WAT"]
    },
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["1-11 Commercial Avenue, Yaba, Lagos", "Serving all African markets"]
    },
    {
      icon: Clock,
      title: "Response Time",
      details: ["Within 24 hours", "Emergency support available"]
    }
  ];

  return (
    <section id="contact" className="py-24 bg-tertiary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
            Ready to Power Your Next Trade?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
            Get in touch with our trade finance experts to unlock working capital
            for your agricultural business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 shadow-sm bg-white">
                  <CardContent className="flex items-start p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        {info.title}
                      </h4>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-muted-foreground text-sm" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-primary text-white border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                  Why Choose Credence?
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                    <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                    Fast processing: 24-48 hour approvals
                  </li>
                  <li className="flex items-center" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                    <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                    Flexible terms tailored to trade cycles
                  </li>
                  <li className="flex items-center" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                    <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                    No hidden fees or surprise charges
                  </li>
                  <li className="flex items-center" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                    <div className="w-2 h-2 rounded-full bg-secondary mr-3"></div>
                    Dedicated relationship management
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="shadow-xl border-0 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-primary" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        First Name
                      </label>
                      <Input name='firstName' value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" className="border-gray-300 focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                        Last Name
                      </label>
                      <Input name='lastName' value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" className="border-gray-300 focus:border-primary" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                      Email
                    </label>
                    <Input name='email' value={formData.email} onChange={handleChange} type="email" placeholder="Enter your email address" className="border-gray-300 focus:border-primary" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                      Company
                    </label>
                    <Input name='company' value={formData.company} onChange={handleChange} placeholder="Enter your company name" className="border-gray-300 focus:border-primary" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                      Message
                    </label>
                    <Textarea
                      name='message' value={formData.message} onChange={handleChange}
                      placeholder="Tell us about your trade financing needs and how we can help..."
                      className="min-h-[120px] border-gray-300 focus:border-primary resize-none"
                    />
                  </div>

                  <Button type='submit' className="w-full bg-primary hover:bg-primary/90 text-white font-semibold" size="lg">
                    Send Message
                  </Button>

                  <p className="text-xs text-muted-foreground text-center" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}