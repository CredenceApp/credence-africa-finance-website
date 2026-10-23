// Authoritative legal text, transcribed verbatim from the client-supplied documents (src/imports/*.pdf).
// Do not edit wording here without a revised client source. `**x**` renders as bold.
export type Block =
  | { p: string }
  | { h3: string }
  | { ul: string[] }
  | { ol: string[] }
  | { lines: string[] }
  | { table: { head: string[]; rows: string[][] } }
export type Section = { id: string; title: string; blocks: Block[] }
export type LegalDoc = { effective?: string; updated?: string; intro?: Block[]; sections: Section[] }

const terms: LegalDoc = {
  updated: "May 2026",
  intro: [
    { p: "Welcome to Credence. These Terms of Use (“Terms”) govern your access to and use of the Credence platform, website, applications, products, and services." },
    { p: "By clicking “Accept,” “Continue,” “Sign Up,” or by accessing or using the platform, you agree to be legally bound by these Terms." },
    { p: "If you do not agree, please do not use the platform." },
  ],
  sections: [
    { id: "s1", title: "1. ABOUT CREDENCE", blocks: [
      { p: "Credence is a technology-enabled trade facilitation and compliance platform focused on agro-allied, commodity, and structured trade transactions. Credence does not operate as a bank, financial institution, or licensed deposit-taking entity. Instead, it:" },
      { ul: ["facilitates connections between Traders, Financiers, and Buyers,", "conducts due diligence and compliance checks,", "supports transaction structuring, monitoring and execution oversight."] },
      { p: "Credence may partner with licensed financial institutions, logistics providers, inspectors, and other third parties to enable transactions." },
    ] },
    { id: "s2", title: "2. ELIGIBILITY", blocks: [
      { p: "To use the platform, you confirm that:" },
      { ul: [
        "you are at least 18 years old,",
        "you have authority to act on behalf of your business or organization,",
        "neither you nor any beneficial owner, director, officer, affiliate, or related party is subject to international sanctions or trade restrictions;",
        "you are not currently subject to any criminal, regulatory, anti-money laundering, anti-corruption, fraud, or governmental investigation that may materially impact your use of the platform;",
        "you are not involved in any pending litigation, insolvency proceeding, arbitration, or dispute that may expose Credence or other users to legal, financial, or reputational risk;",
        "your activities, source of funds, and transactions conducted through the platform are lawful and legitimate.",
      ] },
    ] },
    { id: "s3", title: "3. OUR SERVICES", blocks: [
      { p: "Credence may provide services including:" },
      { ul: ["KYC and due diligence support,", "transaction facilitation,", "supplier and vendor verification,", "Trade execution monitoring and oversight"] },
      { p: "Credence does not:" },
      { ul: ["take custody of funds (unless explicitly stated),", "guarantee the performance of any party,", "act as principal in transactions."] },
      { p: "Our services may evolve over time, and we reserve the right to modify or discontinue any service." },
    ] },
    { id: "s4", title: "4. YOUR RESPONSIBILITIES", blocks: [
      { p: "You agree to:" },
      { ul: ["provide accurate and complete information,", "maintain updated records,", "comply with all applicable laws,", "cooperate with compliance reviews and verification requests,", "ensure that documents submitted are authentic and lawful."] },
    ] },
    { id: "s5", title: "5. COMPLIANCE AND VERIFICATION", blocks: [
      { p: "Credence may request:" },
      { ul: ["Government issued identification documents,", "Corporate records,", "source of funds information,", "transaction documentation,", "Beneficial ownership details."] },
      { p: "We reserve the right to:" },
      { ul: ["reject or suspend any user,", "refuse any transaction,", "request additional documentation at any time,", "report suspicious activities where legally required."] },
      { p: "Failure to provide requested information may result in restricted access or account termination." },
    ] },
    { id: "s6", title: "6. NO GUARANTEE", blocks: [
      { p: "Credence does not guarantee:" },
      { ul: ["funding approval,", "investor participation,", "transaction completion,", "profitability,", "supplier performance,", "buyer performance,"] },
      { p: "All business decisions and transactions are undertaken at your own risk." },
    ] },
    { id: "s7", title: "7. PLATFORM ROLE", blocks: [
      { p: "Credence acts solely as:" },
      { ul: ["a facilitator,", "a compliance support provider,", "a transaction oversight platform."] },
      { p: "Credence is not responsible for:" },
      { ul: ["disputes between users,", "breach of contract by any party,", "delivery failures,", "quality disputes,", "repayment defaults,", "business losses."] },
    ] },
    { id: "s8", title: "8. FEES", blocks: [
      { p: "Certain services may attract fees and by using our paid services, you agree to pay all applicable fees communicated to you. Except where required by law, fees paid are non-refundable." },
    ] },
    { id: "s9", title: "9. PROHIBITED ACTIVITIES", blocks: [
      { p: "You may not use the platform to:" },
      { ul: ["engage in fraud or misrepresentation,", "submit false or misleading information,", "facilitate illegal trade,", "transact with sanctioned individuals or entities,", "violate anti-money laundering or anti-corruption laws,", "interfere with platform security or operations."] },
      { p: "Credence reserves the right to investigate and report suspicious activities." },
    ] },
    { id: "s10", title: "10. SANCTIONS, INVESTIGATIONS, AND LEGAL COMPLIANCE", blocks: [
      { p: "You represent and warrant that you are not:" },
      { ul: [
        "subject to any international sanctions or trade restrictions;",
        "acting on behalf of, or affiliated with, any sanctioned person or entity;",
        "incorporated, resident, or operating from a prohibited or sanctioned jurisdiction;",
        "subject to any ongoing criminal, regulatory, enforcement, anti-corruption, anti-money laundering, fraud, or governmental investigation that may materially affect your use of the platform or any transaction facilitated through the platform;",
        "involved in any pending litigation, arbitration, insolvency proceeding, or legal dispute that may expose Credence or other platform users to legal, financial, or reputational risk.",
        "You further undertake to promptly notify Credence of any: investigation, enforcement action, sanctions designation, material litigation, regulatory inquiry, insolvency event, or similar circumstance arising after onboarding.",
      ] },
      { p: "Credence may block or terminate access where such risks are identified." },
    ] },
    { id: "s11", title: "11. INTELLECTUAL PROPERTY", blocks: [
      { p: "All platform content, branding, software, logos, text, graphics, and materials are owned by or licensed to Credence. You may not reproduce, copy, distribute, modify, reverse engineer, commercially exploit any part of the platform without prior written consent." },
    ] },
    { id: "s12", title: "12. DATA PRIVACY", blocks: [
      { p: "By using the platform, you consent to the collection, processing, storage, and sharing of your information for:" },
      { ul: ["compliance purposes,", "transaction facilitation,", "legal and regulatory obligations,", "operational improvement.", "Credence may share information with:", "financial institutions,", "compliance partners,", "regulators,", "service providers where necessary."] },
    ] },
    { id: "s13", title: "13. ACCOUNT SUSPENSION OR TERMINATION", blocks: [
      { p: "Credence may suspend, restrict, or terminate your access if:" },
      { ul: ["you breach these Terms,", "compliance concerns arise,", "fraudulent or suspicious activity is detected,", "required documents are not provided."] },
      { p: "We may do so without prior notice where necessary for legal or security reasons." },
    ] },
    { id: "s14", title: "14. LIMITATION OF LIABILITY", blocks: [
      { p: "To the maximum extent permitted by law, Credence shall not be liable for:" },
      { ul: ["indirect or consequential losses,", "loss of profits,", "business interruption,", "data loss,", "third-party actions,", "transaction failures."] },
    ] },
    { id: "s15", title: "15. INDEMNITY", blocks: [
      { p: "You agree to indemnify and hold Credence harmless from claims, liabilities, damages, losses, and expenses arising from:" },
      { ul: ["your use of the platform,", "your transactions,", "your breach of these Terms,", "violation of laws or third-party rights."] },
    ] },
    { id: "s17", title: "17. GOVERNING LAW", blocks: [
      { p: "These Terms shall be governed by the laws of the Federal Republic of Nigeria, unless otherwise specified by applicable agreements." },
    ] },
    { id: "s18", title: "18. CHANGES TO THESE TERMS", blocks: [
      { p: "Credence may update these Terms from time to time. Updated versions become effective immediately upon publication on the platform. Your continued use of the platform constitutes acceptance of any updates." },
    ] },
  ],
}

// Sign-up page copy from the Terms source, held for the onboarding flow (not part of the web Terms page).
export const signUpAcceptance = {
  lead: "By creating an account or continuing to use the platform, you acknowledge that you have read, understood, and agreed to the:",
  items: ["Terms of Use,", "Privacy Policy,", "Compliance & KYC Requirements."],
  checkbox: "I Agree to the Terms of Use and Privacy Policy.",
}

const privacy: LegalDoc = {
  effective: "13 August 2026",
  updated: "12 August 2026",
  intro: [
    { p: "Credence Charter Limited (“Credence,” “we,” “us,” or “our”) provides market, liquidity, and risk-guarantee trade infrastructure for pan-African agribusinesses, connecting commodity merchants, aggregators, exporters, and financiers through our digital platform, mobile applications, and related services (collectively, the “Services”). This Privacy Policy explains how we collect, use, disclose, and protect personal data when you use our Services, visit our website, or otherwise interact with us." },
    { p: "This Policy applies to merchants, buyers, sellers, aggregators, financiers, institutional partners, website visitors, and any other individuals whose personal data we process in connection with the Services (“you”). By using our Services, you acknowledge that you have read and understood this Policy." },
    { p: "We operate across multiple African jurisdictions, including Nigeria, and design this Policy to reflect generally applicable data protection principles, including the Nigeria Data Protection Act 2023 (“NDPA”), the Nigeria Data Protection Regulation, applicable Central Bank of Nigeria (“CBN”) guidelines on customer data, and, where relevant to your location, other applicable data protection laws such as the EU/UK GDPR or South Africa’s Protection of Personal Information Act (“POPIA”). Where local law imposes stricter requirements than this Policy, local law will govern." },
  ],
  sections: [
    { id: "s1", title: "1. Scope and Who This Policy Covers", blocks: [
      { p: "This Policy covers personal data we process through:" },
      { ul: [
        "The Credence web platform and mobile applications;",
        "Onboarding, KYC/KYB, and due-diligence processes for merchants, buyers, sellers, and financiers;",
        "The trade origination marketplace, escrow and disbursement infrastructure, and related banking rails;",
        "Our website, marketing communications, and customer support channels; and",
        "Interactions with our partners, agents, and institutional counterparties acting on our behalf.",
      ] },
      { p: "This Policy does not cover the practices of third parties we do not control, including financiers, banking partners, credit bureaus, or other companies not owned or controlled by Credence, even where they participate in a trade facilitated through our Services. We encourage you to review the privacy policies of any third party you interact with through our platform." },
    ] },
    { id: "s2", title: "2. Information We Collect", blocks: [
      { p: "We collect personal data directly from you, automatically through your use of the Services, and from third parties, as described below." },
      { h3: "2.1 Identity and KYC Information" },
      { p: "When you register as a merchant, buyer, seller, or individual user, we may collect:" },
      { ul: [
        "Full name, date of birth, gender, nationality, and government-issued identification (e.g., National ID, BVN, international passport);",
        "Contact details, including address, phone number, and email address;",
        "Photographs or biometric identifiers used for identity verification;",
        "Proof of address and other documents required for regulatory Know-Your-Customer (“KYC”) checks.",
      ] },
      { h3: "2.2 Business and KYB Information" },
      { p: "For merchants, aggregators, exporters, and institutional partners, we may collect Know-Your-Business (“KYB”) information, including:" },
      { ul: [
        "Business registration and incorporation documents, tax identification numbers, and licences;",
        "Details of directors, beneficial owners, signatories, and authorised representatives;",
        "Trade history, supply-chain documentation, purchase orders, invoices, and delivery schedules;",
        "Bank account and virtual account details used for disbursement and settlement.",
      ] },
      { h3: "2.3 Financial and Transaction Data" },
      { ul: [
        "Trade and transaction details, including commodity type, quantity, pricing, tenor, and counterparties;",
        "Wallet balances, funding and withdrawal activity, and payment and repayment history;",
        "Credit, risk, and trade-performance scores generated by our risk assessment and AI-powered scoring tools;",
        "Collateral, guarantee, insurance, and escrow-related records.",
      ] },
      { h3: "2.4 Technical and Usage Data" },
      { ul: [
        "Device identifiers, IP address, browser type, operating system, and mobile network information;",
        "Log data, including access times, pages viewed, and app interaction data;",
        "Location data where enabled by your device settings;",
        "Cookies and similar tracking technologies on our website (see Section 8).",
      ] },
      { h3: "2.5 Communications and Support Data" },
      { ul: [
        "Records of correspondence with our support, sales, or partnerships teams;",
        "Details submitted to access reports or other gated resources, including your name, work email, phone number, industry, and whether you work as a financier;",
        "Feedback, survey responses, consent records, and marketing preferences.",
      ] },
      { h3: "2.6 Information from Third Parties" },
      { p: "We may receive personal data about you from:" },
      { ul: [
        "Financiers, buyers, sellers, or other counterparties involved in a trade you participate in;",
        "Credit bureaus, identity verification providers, and AML/sanctions screening services;",
        "Banking and payment infrastructure partners; and",
        "Publicly available sources and regulatory or governmental registries.",
      ] },
    ] },
    { id: "s3", title: "3. How We Use Your Information", blocks: [
      { p: "We use personal data for the following purposes:" },
      { ul: [
        "**Onboarding and identity verification:** to perform KYC/KYB checks, verify your identity, and confirm eligibility to use the Services.",
        "**Trade origination and matching:** to operate the marketplace, match buyers, sellers, and financiers, and facilitate trade execution.",
        "**Risk assessment and credit scoring:** to evaluate counterparty, operational, financial, location, and documentation risk, including through AI-powered risk-scoring tools, and to generate trade intelligence used in underwriting.",
        "**Payments, escrow, and disbursement:** to process fund movement, escrow-controlled settlement, milestone-based disbursement, and repayment collection through our banking infrastructure.",
        "**Compliance and fraud prevention:** to comply with KYC/AML/CFT obligations, sanctions screening, tax reporting, and other regulatory requirements, and to detect and prevent fraud or misuse of the Services.",
        "**Platform operation and support:** to maintain, secure, and improve the Services, provide customer support, and respond to enquiries.",
        "**Communications:** to send transactional notices, service updates, and, where you have consented, marketing communications about our Services.",
        "**Analytics and product development:** to analyse usage trends, develop new features, and improve our trade intelligence and risk models.",
        "**Legal and institutional reporting:** to provide financiers and institutional partners with settlement reports, trade performance data, repayment confirmations, and updated risk scores in connection with trades they have funded.",
      ] },
    ] },
    { id: "s4", title: "4. Legal Basis for Processing", blocks: [
      { p: "Depending on your jurisdiction, we rely on one or more of the following legal bases to process your personal data:" },
      { ul: [
        "**Performance of a contract,** to onboard you and deliver the Services you request;",
        "**Compliance with a legal obligation,** including KYC/AML/CFT, tax, and financial regulatory requirements;",
        "**Legitimate interests,** including fraud prevention, risk management, platform security, and product improvement, balanced against your rights and interests;",
        "**Consent,** for optional marketing communications and non-essential cookies, which you may withdraw at any time; and",
        "**Vital interests or public interest,** in limited circumstances required by law.",
      ] },
    ] },
    { id: "s5", title: "5. How We Share Your Information", blocks: [
      { p: "We disclose personal data only as necessary for the purposes described in this Policy, including with:" },
      { ul: [
        "**Financiers and institutional partners:** who require trade, risk, and repayment data to evaluate and fund transactions originated on our platform.",
        "**Banking and payment infrastructure providers:** who facilitate virtual accounts, escrow, and disbursement/settlement of funds.",
        "**Identity verification, credit bureau, and screening providers:** engaged to perform KYC/KYB checks, credit assessments, and AML/sanctions screening.",
        "**Insurers and guarantee providers:** involved in goods-in-transit insurance, collateral management, or credit risk guarantee arrangements.",
        "**Service providers and processors:** such as cloud hosting, analytics, and IT support vendors, who process data on our behalf under contractual confidentiality and security obligations.",
        "**Regulators and public authorities:** including the CBN and other applicable regulators, where required by law, regulation, or legal process.",
        "**Professional advisers:** such as auditors, lawyers, and consultants, on a need-to-know basis.",
        "**Successors in a corporate transaction:** such as a merger, acquisition, financing, or sale of assets, subject to appropriate safeguards.",
      ] },
      { p: "We do not sell personal data to third parties for their independent marketing purposes." },
    ] },
    { id: "s6", title: "6. Cross-Border Data Transfers", blocks: [
      { p: "As a pan-African trade infrastructure provider, we may transfer personal data across borders, including to financiers, service providers, or affiliates located outside your home country, and to countries that may have data protection laws different from those in your jurisdiction. Where we transfer personal data internationally, we take steps intended to ensure an adequate level of protection, such as contractual safeguards, and, where applicable, mechanisms recognized under the NDPA, GDPR, POPIA, or other relevant frameworks." },
    ] },
    { id: "s7", title: "7. Data Security", blocks: [
      { p: "We implement technical and organizational measures designed to protect personal data against unauthorised access, alteration, disclosure, or destruction, including:" },
      { ul: [
        "Encryption of data in transit and, where appropriate, at rest;",
        "Access controls and role-based permissions restricting internal access to personal data;",
        "Escrow-controlled settlement and monitored disbursement infrastructure to protect financial data integrity;",
        "Regular monitoring, audits, and security reviews of our systems; and",
        "Contractual security obligations imposed on third-party processors.",
      ] },
      { p: "No system is completely secure, and we cannot guarantee absolute security of information transmitted to or stored on our Services. If we become aware of a data breach affecting your personal data, we will notify you and applicable regulators as required by law." },
    ] },
    { id: "s8", title: "8. Cookies and Tracking Technologies", blocks: [
      { p: "Our website and platform use cookies and similar technologies to operate core functionality, remember preferences, and understand how our Services are used. These may include:" },
      { ul: [
        "**Strictly necessary cookies:** required for login, security, and core platform functionality.",
        "**Analytics cookies:** used to understand usage patterns and improve the Services.",
        "**Preference cookies:** used to remember your settings and preferences.",
      ] },
      { p: "You can control cookies through your browser settings; disabling certain cookies may affect the functionality of our Services." },
    ] },
    { id: "s9", title: "9. Data Retention", blocks: [
      { p: "We retain personal data for as long as necessary to fulfill the purposes described in this Policy, including to maintain business and trade records, satisfy KYC/AML/CFT and other regulatory record keeping obligations, resolve disputes, and enforce our agreements. Retention periods vary by data category and applicable regulatory requirement for a minimum of five (5) years after the end of the business relationship, consistent with CBN/AML record-keeping requirements. Where data is no longer required, we securely delete or anonymize it." },
    ] },
    { id: "s10", title: "10. Your Right", blocks: [
      { p: "Subject to applicable law, you may have the right to:" },
      { ul: [
        "Access the personal data we hold about you;",
        "Request correction of inaccurate or incomplete data;",
        "Request deletion of your personal data, subject to our legal and regulatory retention obligations;",
        "Object to or request restriction of certain processing, including direct marketing;",
        "Request a portable copy of personal data you have provided to us; and",
        "Withdraw consent at any time where processing is based on consent, without affecting the lawfulness of processing before withdrawal.",
      ] },
      { p: "To exercise these rights, contact us using the details in Section 14. We may need to verify your identity before actioning a request, and certain requests may be limited where we have an overriding legal or regulatory obligation to retain or process the data (for example, KYC/AML recordkeeping)." },
      { p: "If you are not satisfied with our response, you may have the right to lodge a complaint with the Nigeria Data Protection Commission (“NDPC”) or another applicable data protection authority in your jurisdiction." },
    ] },
    { id: "s11", title: "11. Automated Decision-Making and AI-Powered Risk Scoring", blocks: [
      { p: "We use AI-powered tools and automated risk-scoring models to assess counterparty, operational, financial, and documentation risk as part of our trade origination and financing process. These tools inform, but do not solely and automatically determine, decisions that significantly affect you unless disclosed to you at the time. Where a decision materially affecting you is based solely on automated processing, you may have the right to request human review, express your point of view, and contest the decision, subject to applicable law." },
    ] },
    { id: "s12", title: "12. Children’s Privacy", blocks: [
      { p: "Our Services are intended for business use by adults and entities engaged in commercial trade and finance activity. We do not knowingly collect personal data from individuals under the age of 18. If we become aware that we have inadvertently collected such data, we will take steps to delete it." },
    ] },
    { id: "s13", title: "13. Third-Party Links and Services", blocks: [
      { p: "Our Services may contain links to third-party websites, applications, or services, including those of financiers, banking partners, and institutional counterparties. This Policy does not apply to those third parties, and we encourage you to review their respective privacy policies." },
    ] },
    { id: "s14", title: "14. Contact Us", blocks: [
      { p: "If you have questions, concerns, or requests regarding this Policy or our data practices, please contact us at:" },
      { lines: ["Credence Charter Limited", "Attn: Compliance Department", "14 Babatunde Street, Off Ogunlana Drive, Lagos State, Nigeria", "Email: compliance@credenceapp.co", "Website: www.credence54.com"] },
    ] },
    { id: "s15", title: "15. Changes to This Policy", blocks: [
      { p: "We may update this Policy from time to time to reflect changes in our practices, technology, legal requirements, or the countries in which we operate. We will post the updated Policy on our website with a revised “Last Updated” date and, where changes are material, provide additional notice as appropriate. Your continued use of the Services after changes take effect constitutes acceptance of the revised Policy" },
    ] },
  ],
}

const cookies: LegalDoc = {
  effective: "5th October 2026",
  updated: "5th October 2026",
  sections: [
    { id: "s1", title: "1. About this policy", blocks: [
      { p: "This Cookie Policy explains how Credence Charter Limited (“Credence”, “we”, “us” or “our”) uses cookies and similar technologies when you visit our websites , use our trade finance platform, or use our mobile application (together, the “Services”)." },
      { p: "It should be read together with our Privacy Policy, which explains how we collect, use and protect your personal data more generally. Where cookies or similar technologies process personal data, we do so in line with the Nigeria Data Protection Act 2023 (“NDPA”) and the directions and guidance of the Nigeria Data Protection Commission (“NDPC”)." },
    ] },
    { id: "s2", title: "2. What are cookies and similar technologies?", blocks: [
      { p: "Cookies are small text files that a website places on your browser or device. They help a website recognise your device, remember your actions and preferences, keep you signed in, and understand how the site is used." },
      { p: "We also use similar technologies that work in comparable ways, including:" },
      { ol: [
        "Local storage and session storage in your browser, which store small amounts of data on your device.",
        "Pixels and tags (small code snippets or images) that record whether a page or email has been viewed.",
        "Software development kits (SDKs) and device identifiers in our mobile application, which help the app function and help us understand how it performs.",
      ] },
      { p: "In this policy, “cookies” includes all of these technologies." },
    ] },
    { id: "s3", title: "3. Why we use cookies", blocks: [
      { p: "Credence provides a digital trade finance platform that includes onboarding, identity verification, escrow-controlled settlement and a trade marketplace. We use cookies to:" },
      { ol: [
        "keep the Services secure and protect your account, including by supporting login and multi-factor authentication;",
        "make the Services work properly and remember your choices;",
        "understand how the Services are used so we can improve them; and",
        "measure the effectiveness of our communications and outreach.",
      ] },
      { p: "We do not use cookies to store sensitive information such as passwords, BVN, NIN, bank details or identity documents." },
    ] },
    { id: "s4", title: "4. The types of cookies we use", blocks: [
      { table: {
        head: ["Category", "Purpose", "Consent needed?", "Typical duration"],
        rows: [
          ["Strictly necessary", "Essential for the Services to work and be secure: session management, authentication, MFA, fraud prevention, load balancing, and remembering your cookie choices.", "No. These cannot be switched off.", "Session to 24 months"],
          ["Functional / preference", "Remember your settings, such as language, display preferences and previously entered details.", "Yes", "up to 24 months"],
          ["Analytics / performance", "Collect information about how visitors use the Services (pages visited, errors, device and browser type) so we can measure and improve performance.", "Yes", "up to 24 months"],
        ],
      } },
      { p: "Session cookies are deleted when you close your browser or app. Persistent cookies remain on your device until they expire or you delete them." },
    ] },
    { id: "s5", title: "5. Our legal basis", blocks: [
      { ol: [
        "Strictly necessary cookies: we rely on our legitimate interests in operating and securing the Services, and on what is necessary to provide the service you have requested. These are used only to the extent needed for that purpose.",
        "All other cookies: we rely on your consent. We will ask for it through our cookie banner or settings before these cookies are placed. Consent must be freely given, specific, informed and unambiguous. We do not use pre-ticked boxes, and you can use the Services without accepting non-essential cookies.",
      ] },
    ] },
    { id: "s6", title: "6. How to manage your choices", blocks: [
      { p: "**Cookie settings.** When you first visit our Services you will see a cookie banner that lets you accept all, reject non-essential cookies, or choose by category. You can change or withdraw your consent at any time through the Settings menu on our platform. Withdrawing consent does not affect the lawfulness of processing before the withdrawal." },
      { p: "**Browser settings.** Most browsers let you block or delete cookies. Instructions vary by browser, so please use your browser’s help function. If you block all cookies, including strictly necessary ones, parts of the Services such as secure login may not work." },
      { p: "**Mobile devices.** You limit tracking through your device’s privacy settings." },
    ] },
    { id: "s7", title: "7. Third-party cookies", blocks: [
      { p: "Some cookies are placed by third parties that provide services to us, such as identity verification and KYC/KYB vendors, hosting and security providers. These third parties may process information about your use of the Services in accordance with their own privacy and cookie policies. We require our service providers to protect your data under written agreements, and we assess their data protection and security practices before engaging them." },
    ] },
    { id: "s8", title: "8. International transfers", blocks: [
      { p: "Some of our service providers may process data outside Nigeria. Where cookie data that identifies you is transferred outside Nigeria, we do so only in accordance with the NDPA, including through an adequacy decision, appropriate safeguards or another lawful transfer mechanism." },
    ] },
    { id: "s9", title: "9. How long we keep information", blocks: [
      { p: "Cookies have the lifespans set out in Section 4. Personal data collected through cookies is kept only as long as necessary for the purposes described in this policy and in line with our data retention schedule, after which it is deleted or anonymized." },
    ] },
    { id: "s10", title: "10. Your rights", blocks: [
      { p: "Under the NDPA, you have rights in relation to your personal data, including the right to be informed, to access it, to have it corrected or deleted, to restrict or object to its processing, to data portability, and to withdraw consent at any time. You also have the right not to be subject to a decision based solely on automated processing that significantly affects you. To exercise any of these rights, contact us using the details in Section 13. You also have the right to lodge a complaint with the Nigeria Data Protection Commission." },
    ] },
    { id: "s11", title: "11. Children", blocks: [
      { p: "Our Services are intended for businesses and are not directed at children. We do not knowingly use cookies to collect personal data from anyone under 18." },
    ] },
    { id: "s12", title: "12. Changes to this policy", blocks: [
      { p: "We may update this Cookie Policy from time to time, for example when we change the cookies we use or when the law changes. We will post the updated version on our website with a new “last updated” date and, where the change is material, ask for your consent again or notify you by [banner / email]." },
    ] },
    { id: "s13", title: "13. Contact us", blocks: [
      { p: "If you have questions about this Cookie Policy or how we handle your data, contact our Data Protection Officer:" },
      { p: "Credence Charter Limited at 14 Babatunde Street, Off Ogunlana Drive, Lagos State, Nigeria" },
      { p: "Email: compliance@credenceapp.co" },
    ] },
  ],
}

const disclaimer: LegalDoc = {
  effective: "2nd October 2026",
  updated: "2nd October 2026",
  sections: [
    { id: "s1", title: "1. About this disclaimer", blocks: [
      { p: "This Website Disclaimer applies to the websites, trade finance platform and mobile application operated by Credence Charter Limited (“Credence”, “we”, “us” or “our”) (together, the “Services”). By accessing or using the Services you acknowledge that you have read and understood this disclaimer. If you do not agree with it, please do not use the Services." },
      { p: "It should be read together with our Terms of Use, Privacy Policy and Cookie Policy. If there is a conflict between this disclaimer and a signed agreement between you and Credence, the signed agreement prevails." },
    ] },
    { id: "s2", title: "2. General information only", blocks: [
      { p: "The content on the Services is provided for general information purposes. While we take care to keep it accurate and up to date, we make no representation or warranty, express or implied, that it is complete, accurate, current or suitable for your particular circumstances. Information may change without notice, and you should verify anything important before relying on it." },
    ] },
    { id: "s3", title: "3. No financial, legal, tax or investment advice", blocks: [
      { p: "Nothing on the Services is financial, legal, tax, investment, customs or trade advice, or a recommendation or offer to buy or sell any product, goods or service. You are responsible for your own commercial decisions and should obtain independent professional advice suited to your situation before entering any trade, transaction or contract." },
    ] },
    { id: "s4", title: "4. Regulatory status", blocks: [
      { p: "Credence Charter Limited is incorporated in Nigeria provides trade finance activities through its licensed partners and financiers.Unless stated otherwise, Credence is not a bank, and funds held in connection with the Services are not deposits and are not covered by deposit insurance." },
    ] },
    { id: "s5", title: "5. Trade marketplace and third parties", blocks: [
      { p: "Credence does not own, inspect, guarantee or endorse any listed goods or services, and is not responsible for the quality, safety, legality, delivery, description or price of anything offered, or for the conduct or ability of any buyer, seller, financier or other user. Any contract for the sale of goods or services is between the relevant users." },
      { p: "The Services may use or link to third-party providers and to third-party websites. We do not control and are not responsible for their content, availability, privacy practices or security, and a link is not an endorsement." },
    ] },
    { id: "s6", title: "6. Escrow-controlled settlement and verification", blocks: [
      { p: "Escrow-controlled settlement, identity verification and onboarding checks are carried out under the applicable agreements and our compliance procedures. Completion of verification or the use of escrow does not guarantee that a counterparty will perform, that goods or documents are genuine, or that a transaction will complete. We may delay, decline or suspend onboarding, transactions or access where required by law, by our compliance obligations or to manage risk, without liability to the extent permitted by law." },
    ] },
    { id: "s7", title: "7. Availability and security", blocks: [
      { p: "We aim to keep the Services available and secure but do not guarantee uninterrupted, error-free or fully secure access. The Services may be unavailable from time to time for maintenance, technical faults or events outside our control. You are responsible for protecting your login details and devices and for the accuracy of information you submit." },
    ] },
    { id: "s8", title: "8. Beware of fraud", blocks: [
      { p: "Credence will never ask you to share your password, one-time passcode or multi-factor authentication code. Please be careful of fake websites, messages or calls using our name. If you suspect fraud or a suspicious message, contact us immediately using the details in Section 11." },
    ] },
    { id: "s9", title: "9. Limitation of liability", blocks: [
      { p: "To the fullest extent permitted by Nigerian law, Credence and its directors, employees and affiliates are not liable for any loss or damage (including indirect or consequential loss, loss of profit, revenue, business or data) arising from your use of, or inability to use, the Services, or from reliance on their content, except where such loss is caused by our fraud or gross negligence, or where liability cannot lawfully be excluded. Nothing in this disclaimer limits any rights you have under applicable law or under a signed agreement with us." },
    ] },
    { id: "s10", title: "10. Governing law and changes", blocks: [
      { p: "This disclaimer is governed by the laws of the Federal Republic of Nigeria, and the courts of Lagos State have jurisdiction over any dispute arising from it, subject to any dispute resolution terms in a signed agreement. We may update this disclaimer from time to time. The updated version will be posted on our website with a new “last updated” date." },
    ] },
    { id: "s11", title: "11. Contact us", blocks: [
      { p: "If you have questions about this disclaimer, contact:" },
      { p: "Credence Charter Limited at 14 Babatunde Street, Off Ogunlana Drive, Lagos State, Nigeria" },
      { p: "Email: compliance@credenceapp.co" },
    ] },
  ],
}

export const docs: Record<"terms" | "privacy" | "cookies" | "disclaimer", LegalDoc> = { terms, privacy, cookies, disclaimer }
