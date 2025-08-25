import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function FAQSection() {
  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "Who is eligible to access financing through Credence?",
          answer: "Credence serves agri-businesses, exporters, importers, corporates, and financiers operating in African agricultural markets. Eligibility criteria include having verifiable trade documentation, operating in agriculture-related sectors, and meeting our basic KYB (Know Your Business) requirements."
        },
        {
          question: "What do I need to get started?",
          answer: "To get started, you'll need valid business registration documents, tax certificates, recent financial statements, trade documentation (LPOs, invoices, contracts), and contact information for key stakeholders. Our onboarding team will guide you through the specific requirements for your business type."
        },
        {
          question: "How long does onboarding take?",
          answer: "Standard onboarding typically takes 3-5 business days for SMEs and 5-10 business days for larger corporates, depending on the complexity of your business structure and the completeness of submitted documentation. We prioritize fast-track processing for verified repeat clients."
        }
      ]
    },
    {
      title: "Trade Financing",
      questions: [
        {
          question: "What kind of trades does Credence finance?",
          answer: "Credence finances agricultural commodities trading, agri-processing, export-import transactions, supply chain purchases, equipment procurement for agri-businesses, and working capital for verified agricultural trade deals across Africa."
        },
        {
          question: "Do I need collateral?",
          answer: "Credence uses innovative risk assessment models that often reduce traditional collateral requirements. For many trade finance products, the underlying trade assets, digital guarantees, or trade insurance can serve as security. Collateral requirements vary based on deal size, risk profile, and relationship history."
        },
        {
          question: "How much financing can I access?",
          answer: "Financing limits range from $10,000 for small-scale traders to $5 million+ for large corporate deals. Limits are determined by your business profile, trade history, creditworthiness, and the specific transaction being financed. Limits can increase over time with successful repayment history."
        },
        {
          question: "What documents do I need to upload to apply for financing?",
          answer: "Required documents include: Local Purchase Orders (LPOs), commercial invoices, delivery receipts, contracts/agreements, proof of business registration, recent bank statements, financial statements, and any relevant permits or licenses. Specific requirements may vary by transaction type."
        }
      ]
    },
    {
      title: "Repayments & Disbursements",
      questions: [
        {
          question: "How are funds disbursed?",
          answer: "Funds are disbursed directly to your designated bank account or through our digital wallet system. For trade finance, we often disburse directly to suppliers or use escrow mechanisms to ensure proper fund utilization. Disbursement timing ranges from same-day to 48 hours after approval."
        },
        {
          question: "How does repayment work?",
          answer: "Repayment terms are structured around your trade cycle, typically 30-180 days. We offer flexible repayment options including milestone-based payments, revenue-based repayments, or traditional term structures. Automatic deductions can be set up from your designated account on agreed dates."
        }
      ]
    },
    {
      title: "Support",
      questions: [
        {
          question: "What if I have questions during onboarding?",
          answer: "Our dedicated onboarding team provides support via phone, email, and WhatsApp during business hours. You'll be assigned a relationship manager who will guide you through the entire process and answer any questions. We also provide comprehensive documentation and video tutorials."
        },
        {
          question: "Can I speak with someone directly?",
          answer: "Yes! You can reach our customer support team at support@credenceapp.co or call our dedicated helpline. For complex queries, we offer video calls with our specialists. Our team is available Monday-Friday, 8 AM-6 PM WAT, with emergency support available for urgent trading situations."
        }
      ]
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
            Everything you need to know about Credence trade financing, from getting started to managing your trades.
          </p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-0 shadow-lg">
              <CardHeader className="bg-tertiary">
                <CardTitle className="text-2xl text-primary" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem 
                      key={questionIndex} 
                      value={`${categoryIndex}-${questionIndex}`}
                      className="border-b last:border-b-0"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50">
                        <span className="font-semibold text-foreground" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '400' }}>
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}