import type { Translations } from "./de";

export const en: Translations = {
  nav: {
    methode: "Method",
    prozess: "Process",
    cases: "Cases",
    angebot: "Services",
    team: "Team",
    cta: "Book a Call",
  },

  hero: {
    h1a: "Your experts have the answers.",
    h1b: "We give them the structure.",
    sub: "Your next technology initiative gets approved, supported, and delivered. Because every stakeholder has fully grasped the problem.",
    cta: "Book a Call",
    proofLabel: "Scientifically grounded",
    hmdAlt: "HMD Business Information Systems",
    studyTitle: "\"Evidence-based IT decisions through structured narratives\"",
    studyAction: "Read the study",
    studyBadge: "HMD",
    prereadTitle: "\"Narrative-to-Action: A framework for translating into agile backlog items\"",
    prereadAction: "Read pre-print",
    prereadBadge: "Pre-Read",
    phases: [
      { text: "Their knowledge stays unheard.", label: "Problem" },
      { text: "We give it structure.", label: "Solution" },
      { text: "You create business value.", label: "Outcome" },
    ],
  },

  problem: {
    label: "Typical Patterns of Failure",
    heading: "Does this sound familiar?",
    items: [
      {
        num: "01",
        title: "Premature Solutions",
        text: "Teams discuss solutions before the problem is understood. Instead of genuine root-cause analysis, they treat symptoms.",
        result: "Misguided efforts from day one",
      },
      {
        num: "02",
        title: "Silo Thinking",
        text: "Business units and management speak different languages. The connecting element that creates shared understanding is missing.",
        result: "No alignment, no progress",
      },
      {
        num: "03",
        title: "Death by PowerPoint",
        text: "Meetings devolve into one-way presentations. Complex problems are trivialized by bullet points, and critical thinking is suppressed.",
        result: "Pseudo-decisions instead of clarity",
      },
      {
        num: "04",
        title: "Implementation Gap",
        text: "Decisions that were made fizzle out. There is no clear translation into operational action items or funding models.",
        result: "Investments fail to deliver impact",
      },
    ],
  },

  methode: {
    label: "Our Approach",
    headingA: "The Narrative:",
    headingB: "Evidence over assumption.",
    desc: "A narrative in the NarraTec sense is a structured analysis document that connects root causes, decision logic, and actions in a jointly developed, traceable document — as the foundation for decisions that are carried internally.",
    features: [
      {
        title: "Internal Activation",
        text: "We provide the tool that enables your experts to contribute their knowledge with low barriers and participate directly in the solution, instead of relying on external consulting.",
      },
      {
        title: "Deep Root-Cause Analysis",
        text: "We strictly separate problem analysis from solution development to find the true root causes and avoid treating symptoms.",
      },
      {
        title: "Participative Decisions",
        text: "Through collaborative read-outs, stakeholders are actively involved rather than just informed. This paves the way for joint implementation.",
      },
      {
        title: "AI as Accelerator",
        text: "We use generative AI to immediately generate concrete drafts from your data that your experts can refine directly.",
      },
      {
        title: "Seamless Implementation",
        text: "Solution building blocks are translated into tangible work packages. This forms the basis for risk-reduced and efficient budget allocation without an implementation gap.",
      },
    ],
  },

  framework: {
    label: "The Process",
    heading: "The Narrative to Action Framework",
    desc: "From a vague problem to clear implementation. A scientifically grounded process model in five steps.",
    stepLabel: "Step",
    steps: [
      {
        title: "Prepare",
        text: "At the start, we jointly establish motivation, vision, and roles. A compact methodology training empowers your subject-matter experts to work independently right away.",
      },
      {
        title: "Understand & Design",
        text: "A small core team analyzes the problem holistically following the People-Technology-Organization principle. We strictly separate problem from solution to find genuine root causes.",
      },
      {
        title: "Validate & Sharpen",
        text: "Stakeholders read silently (\"Silent Reads\") and provide written feedback. This creates shared understanding and uncovers blind spots early on.",
      },
      {
        title: "Decide Based on Evidence",
        text: "Management decides based on a logically founded and collectively supported proposal and commissions the implementation.",
      },
      {
        title: "Implement Systematically",
        text: "Solution building blocks are translated into measurable work items. A structured approach ensures integrity in the handover to the teams.",
      },
    ],
  },

  artefakt: {
    label: "Decision Foundation",
    heading: "More than just text: A tool for clarity",
    desc: "We replace static slides with a living document. Every section serves a precise function in the decision-making process.",
    features: [
      {
        title: "Logical Causality",
        text: "No jumping between topics. The structure forces a complete description of the problem before presenting the solution.",
      },
      {
        title: "Source of Truth",
        text: "Replaces scattered email threads and redundant document versions. All stakeholders work in the same living document.",
      },
      {
        title: "Information Density",
        text: "Sentences over bullet points. Data is embedded as evidence, not decoration. Every section adds value.",
      },
      {
        title: "Contextual Feedback",
        text: "Comments sit directly at the relevant passage. Discussions are conducted precisely and resolved, rather than scattering across meetings.",
      },
      {
        title: "Measurable Building Blocks",
        text: "The end of the narrative is the beginning of the work. Solution building blocks prepare the implementation and tracking.",
      },
    ],
    docTitle: "Performance Optimization",
    docBadge: "Live Doc",
    docSection1: "1. Status Quo",
    docSection2: "2. Requirements",
    docSection3: "3. Solution Building Blocks",
    docPages: "6 pages",
    commentControlling: "Controlling",
    commentControllingText: "\"Have the OPEX savings for Q3 already been validated?\"",
    commentCTO: "CTO",
    commentCTOText: "\"Check synergies with cloud strategy.\"",
  },

  umsetzung: {
    label: "From Decision to Implementation",
    heading: "No implementation gap. Full budget control.",
    desc: "The narrative doesn't end with management approval. Solution building blocks are directly translated into prioritizable, fundable, and traceable work packages.",
    mappingSubtitle: "From narrative to sprint — without information loss",
    blocks: [
      {
        label: "From the Narrative",
        title: "Solution Building Block",
        desc: "Smallest responsibly deliverable unit of change — with tangible value and measurable target state",
      },
      {
        label: "Planning Objects",
        title: "Epic / Feature",
        desc: "Derived requirements from the narrative become acceptance criteria",
      },
      {
        label: "Task Pool",
        title: "User Stories & Tasks",
        desc: "Starting tasks are the work content of the first iteration",
      },
      {
        label: "End-to-End",
        title: "Full Traceability",
        desc: "Every ticket references its \"why\" — no work without justification",
      },
    ],
    safeTitle: "SAFe-compatible",
    safeDesc: "The Narrative-to-Action Framework is fully compatible with the Scaled Agile Framework (SAFe). Solution building blocks are directly mapped as Epics / Features into your PI Planning — no media break, no additional translation effort.",
    prereadBadge: "Pre-Read",
    prereadAction: "Read pre-print",
    benefits: [
      {
        title: "Risk Reduction through Increments",
        text: "Instead of a large project with uncertain outcomes, solution building blocks are released sequentially. What works gets expanded. What doesn't fit gets corrected early — before larger investments are made.",
        checks: [
          "Pilot blocks prove the approach before scale-up",
          "Misguided investments become visible early",
        ],
      },
      {
        title: "Granular Budget Approval",
        text: "Each solution building block is an independent, responsibly deliverable unit — with a measurable target state. This enables budget decisions at the block level instead of a one-time approval for a multi-year program.",
        checks: [
          "Investments follow demonstrated value",
          "CFO-ready: clear ROI per building block",
        ],
      },
      {
        title: "Scales with Complexity",
        text: "For manageable initiatives, solution building blocks are directly converted into Epics. For complex, cross-functional transformations, a two-stage path via focus narratives prevents the implementation team from losing orientation.",
        checks: [
          "Direct path for clear, self-contained initiatives",
          "Two-stage path for enterprise-wide transformations",
        ],
      },
    ],
  },

  ki: {
    label: "AI in the Process",
    headingA: "Intelligent support.",
    headingB: "Human decision.",
    desc: "Generative AI accelerates every step of the framework — precisely where it adds value. Intensity and usage depend on your use case and your team.",
    intensityTitle: "AI intensity as needed",
    scaleClassic: "Classic",
    scaleHybrid: "Hybrid",
    scaleAI: "AI-powered",
    intensityDesc: "Some teams prefer the classic approach at the whiteboard with a protocol; others deploy AI from the outset. The process is deliberately designed as partial automation — at defined quality gates, your experts' feedback and knowledge always flow in.",
    phases: [
      {
        phase: "Prepare",
        title: "Workshop Documentation",
        text: "AI-supported transcription and summarization of workshops — or classic whiteboard work with a protocol. What's adequate for the team and use case is decided by the Narrative Owner.",
      },
      {
        phase: "Understand & Design",
        title: "Narrative Creation",
        text: "Overcoming the blank page: Loose thoughts are turned into compelling formulations, content is tightened, and filler sentences are eliminated. AI delivers drafts that your experts can refine directly.",
      },
      {
        phase: "Validate & Sharpen",
        title: "Quality Assurance",
        text: "AI checks the root-cause analysis for effectiveness, the arguments for soundness, and the requirements definitions for completeness — as a second perspective alongside the stakeholder review.",
      },
      {
        phase: "Decide",
        title: "Decision Preparation",
        text: "AI-based consistency check of the decision document across all sections: Do the target state, solution building blocks, and funding align? Are there contradictions or gaps?",
      },
      {
        phase: "Implement",
        title: "Work Package Derivation",
        text: "AI creates task descriptions and acceptance criteria from the analysis results. Solution building blocks are translated into structured Epics and User Stories.",
      },
    ],
    humanTitle: "Your experts stay in the lead.",
    humanText: "AI generates drafts, checks consistency, and accelerates routine tasks. Every substantive decision, every prioritization, and every approval, however, rests with your subject-matter experts and stakeholders. Technology doesn't replace judgment — it makes it more effective.",
  },

  pullquote: {
    text: "It's not the technology that determines an initiative's success — it's whether every stakeholder has fully grasped the problem.",
    attribution: "The NarraTec Conviction",
  },

  szenarien: {
    label: "Use Cases",
    heading: "Where the method works",
    desc: "Wherever complexity meets implementation pressure and decisions need to be carried by everyone involved.",
    cases: [
      {
        title: "Strategic Transformation",
        text: "Reorganizations, new business models, or platform shifts rarely fail because of the technology — they fail due to unclear goals and missing alignment. The narrative creates the shared decision basis before the first investment is committed.",
        checks: [
          "Robust stakeholder alignment before project start",
          "Defensible foundation for budget and resource approvals",
        ],
      },
      {
        title: "Technical Sales",
        text: "In complex solution sales, the depth of problem understanding decides the deal. Instead of a standard pitch, a co-creation format with the customer produces a narrative that captures their situation more precisely than any prepared presentation could.",
        checks: [
          "Trust through demonstrable depth of understanding",
          "Solution architecture grounded in real requirements",
        ],
      },
      {
        title: "Task Forces & Critical Situations",
        text: "In crisis situations, the reflex is to act immediately. A structured analysis forces the team to identify the actual root cause before reacting and to evaluate response options with rigor.",
        checks: [
          "Sound root-cause analysis instead of symptom treatment",
          "Prioritized, high-impact countermeasures",
        ],
      },
    ],
  },

  stats: {
    items: [
      {
        label: "Scientific Publications",
        sub: "HMD Business Information Systems",
      },
      {
        label: "Process Steps",
        sub: "From vague problem to clear implementation",
      },
      {
        label: "Internal Enablement",
        sub: "Your team takes over — we guide",
      },
    ],
  },

  praxis: {
    label: "From Practice",
    heading: "Three examples from real enterprise initiatives.",
    desc: "Utilized across specialized departments and complex enterprise settings, bridging hierarchies and organizational silos.",
    ausgangslageLabel: "Starting Point",
    vorgehenLabel: "Approach",
    ergebnisLabel: "Result",
    cases: [
      {
        tag: "Case 1 · Transformation",
        title: "Shopfloor IT Reorganization",
        ausgangslage: "IT architecture and organization in the production environment should be jointly realigned by IT and business departments – despite differing priorities, time horizons and technical languages ​​of the participants.",
        vorgehen: "A thorough root cause analysis was conducted from human, organizational, and technical perspectives. The strict separation of problem and solution prevented hasty decisions. An overarching North Star narrative provided cross-team orientation, while derived focus narratives made the work in individual areas manageable. Based on this foundation, the transition to the Scaled Agile Framework (SAFe) was implemented, along with the associated budgeting.",
        ergebnis: "Jointly supported target architecture. Implementation in an agile product organization with a double-digit number of teams. Phased budgeting with clearly defined decision gates.",
        outcome: "Phased budgeting",
      },
      {
        tag: "Case 2 · Governance",
        title: "Open-Source Approval Process",
        ausgangslage: "A slow approval process was noticeably slowing down software delivery. Legal, Development, and the Open Source Office were each optimizing in isolation — without a shared understanding of the actual bottlenecks.",
        vorgehen: "The method brought all three areas together as equals. The structured narrative made organizational and process-related causes visible alongside technical ones — interdependencies that would have remained hidden in isolated analysis.",
        ergebnis: "A cross-functional target state replaced the previously parallel siloed solutions. The jointly developed solution significantly shortened approval cycle times.",
        outcome: "Shortened approval cycles",
      },
      {
        tag: "Case 3 · Strategic IT",
        title: "Delivery Model for AI Products",
        ausgangslage: "Central IT, multiple brand domains, and Business Partner Management needed to establish a shared delivery model for AI software products — across hierarchy levels and with partially conflicting requirements.",
        vorgehen: "Structuring the narrative along the product lifecycle. The trade-off between thoroughness and delivery speed became manageable despite the high number of stakeholders. The analysis yielded heterogeneous solution components — from technical platform development to building a domain community.",
        ergebnis: "Transparency about the required fields of action given high organizational complexity. Modular implementation of the solution components along prioritized impact paths.",
        outcome: "Consensus-ready target model",
      },
    ],
  },

  angebot: {
    label: "Services",
    heading: "Scalable formats for your needs",
    desc: "From methodological introduction to enterprise-wide transformation — we support you at every maturity level",
    decisionHeading: "Which format fits you?",
    cta: "Inquire",
    tiers: [
      {
        name: "Workshop",
        desc: "Methodological introduction for teams with initial practical applications",
        features: ["Methodology training with case studies", "Templates & tool setup", "Review support"],
        decision: "If you want to get to know the method and test it internally — without long-term commitment. Ideal for initial pilot projects with a manageable number of stakeholders.",
      },
      {
        name: "Advisory",
        desc: "Complete support for strategic initiatives with high complexity",
        features: ["Training your methodology experts", "End-to-end process support", "Implementation roadmap initialization"],
        badge: "Recommended for first projects",
        decision: "When a specific, complex initiative is on the horizon and you want to simultaneously anchor the method permanently in your organization. The engagement ends with a capable internal team.",
      },
      {
        name: "Transformation",
        desc: "Anchoring evidence-based culture across the organization.",
        features: ["Organizational adaptation", "Accompanying funding concept", "Long-term supervision"],
        decision: "When evidence-based decision culture needs to be established enterprise-wide — across multiple departments, hierarchy levels, and a longer time horizon.",
      },
    ],
  },

  team: {
    label: "Team",
    heading: "Who we are",
    desc: "Experts in evidence-based and effective decision-making.",
    members: [
      {
        name: "Dr. Richard Rößler",
        role: "Developer of the NarraTec methodology",
        bio: "I developed the methodology of structured narratives as an instrument for evidence-based decision-making, tested it in complex enterprise initiatives as a Narrative Owner and methodology expert, and published it in scientific contributions. With over 10 years of experience managing complex IT initiatives, my work sits at the intersection of management research and concrete project practice — with the goal of making decision quality systematically measurable.",
      },
      {
        name: "Prof. Dr. Uwe Wieland",
        role: "Expert in digital transformation & process optimization",
        bio: "I combine longstanding leadership experience in digital transformation with a passion for clear structures in complex initiatives. As co-founder of NarraTec, I bring the perspective of decision-makers — and know what it means to make far-reaching decisions with insufficient information.",
      },
    ],
  },

  footer: {
    text: "Let's talk about how we can solve your next challenge with structure.",
    legal: "Legal",
    impressum: "Legal Notice",
    datenschutz: "Privacy Policy",
    agb: "Terms & Conditions",
    copyright: "All rights reserved.",
  },

  contact: {
    heading: "Send a message to",
    name: "Dr. Richard Rößler",
    successTitle: "Your email client has been opened.",
    successText: "Please send the pre-filled email. We will get back to you as soon as possible.",
    close: "Close",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    profession: "Profession",
    company: "Company",
    country: "Country",
    message: "Message",
    selectPlaceholder: "Please select",
    messagePlaceholder: "Your message here …",
    privacyText: "By submitting the contact form, you agree that your data will be used to process your inquiry. For more information and revocation instructions, please refer to our",
    privacyLink: "Privacy Policy",
    requiredNote: "Fields marked with an asterisk (*) are required.",
    reset: "Reset",
    sending: "Sending…",
    send: "Send",
    countries: [
      "Germany", "Austria", "Switzerland", "Belgium", "Denmark",
      "Finland", "France", "Greece", "Ireland", "Italy",
      "Luxembourg", "Netherlands", "Norway", "Poland", "Portugal",
      "Sweden", "Spain", "Czech Republic", "Hungary",
      "United Kingdom", "USA", "Canada", "Other",
    ],
  },

  legalLayout: {
    back: "Back",
    copyright: "All rights reserved.",
    impressum: "Legal Notice",
    datenschutz: "Privacy Policy",
    agb: "Terms & Conditions",
  },

  impressum: {
    title: "Legal Notice",
    tmg: "Information pursuant to § 5 TMG",
    company: "Dr. Richard Rößler Management Advisory",
    street: "Flensburger Straße 92",
    city: "01157 Dresden",
    country: "Germany",
    owner: "Owner",
    ownerName: "Dr. Richard Rößler",
    contact: "Contact",
    emailLabel: "Email:",
    emailValue: "contact@narratec.io",
    register: "Registration",
    registerText: "No entry in the commercial register.",
    vatTitle: "VAT ID",
    vatDesc: "VAT identification number pursuant to § 27a of the German VAT Act:",
    vatId: "DE408433294",
    responsible: "Responsible for content pursuant to § 55 para. 2 RStV",
    disclaimer: "Disclaimer",
    contentLiability: "Liability for Content",
    contentLiabilityText: "The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with § 7 para. 1 TMG under general law. According to §§ 8 to 10 TMG, however, we are not obligated to monitor transmitted or stored third-party information or to investigate circumstances indicating illegal activity.",
    linkLiability: "Liability for Links",
    linkLiabilityText: "Our offer contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for the content of the linked pages.",
    copyright_: "Copyright",
    copyrightText: "The content and works created by the site operators on these pages are subject to German copyright law. Reproduction, editing, distribution, and any kind of use beyond the limits of copyright law require the written consent of the respective author or creator.",
  },

  datenschutz: {
    title: "Privacy Policy",
    s1: "1. Privacy at a Glance",
    s1_general: "General Information",
    s1_generalText: "The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can personally identify you. Detailed information on the subject of data protection can be found in our privacy policy listed below.",
    s1_data: "Data Collection on This Website",
    s1_dataText: "Data processing on this website is carried out by the website operator. Their contact details can be found in the legal notice of this website.",
    s2: "2. Hosting",
    s2_text: "This website is hosted on GitHub Pages. The provider is GitHub Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA. When visiting this website, GitHub automatically collects information in so-called server log files that your browser automatically transmits. Details can be found in GitHub's privacy policy:",
    s2_link: "GitHub Privacy Statement",
    s3: "3. General Information and Mandatory Disclosures",
    s3_privacy: "Data Protection",
    s3_privacyText: "The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.",
    s3_responsible: "Notice Regarding the Responsible Party",
    s3_responsibleIntro: "The responsible party for data processing on this website is:",
    s3_responsibleNote: "The responsible party is the natural or legal person who alone or jointly with others determines the purposes and means of processing personal data (e.g., names, email addresses, etc.).",
    s3_storage: "Storage Duration",
    s3_storageText: "Unless a more specific storage period has been stated within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke consent for data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data.",
    s3_revocation: "Revocation of Your Consent to Data Processing",
    s3_revocationText: "Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of the data processing carried out before the revocation remains unaffected by the revocation.",
    s3_complaint: "Right to Lodge a Complaint with the Supervisory Authority",
    s3_complaintText: "In the event of violations of the GDPR, data subjects have the right to lodge a complaint with a supervisory authority. The right to lodge a complaint exists without prejudice to any other administrative or judicial remedy.",
    s4: "4. Data Collection on This Website",
    s4_cookies: "Cookies",
    s4_cookiesText: "This website does not use cookies.",
    s4_email: "Contact via Email",
    s4_emailText: "If you contact us by email, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of handling your request. We do not share this data without your consent.",
    s4_emailLegal: "The processing of this data is based on Art. 6 para. 1 lit. b GDPR if your request is related to the performance of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective handling of inquiries directed to us (Art. 6 para. 1 lit. f GDPR) or on your consent (Art. 6 para. 1 lit. a GDPR).",
    s5: "5. Analytics Tools",
    s5_umami: "Umami Analytics",
    s5_umamiText: "This website uses Umami, a privacy-friendly web analytics solution. Umami does not use cookies and does not collect personal data. The collected data is processed anonymously and is used exclusively for statistical analysis of website usage. No data is shared with third parties.",
  },

  agb: {
    title: "Terms and Conditions",
    s1: "§ 1 Scope",
    s1_p1: "These General Terms and Conditions (hereinafter \"GTC\") apply to all business relationships between Dr. Richard Rößler Management Advisory, Flensburger Straße 92, 01157 Dresden (hereinafter \"NarraTec\" or \"we\") and its clients (hereinafter \"Client\"). The version valid at the time of contract conclusion shall apply.",
    s1_p2: "Deviating, conflicting, or supplementary GTC of the Client shall only become part of the contract if and to the extent that NarraTec has expressly consented to their validity in writing.",
    s2: "§ 2 Services",
    s2_intro: "NarraTec provides consulting services in the field of narrative structuring of technology projects, in particular:",
    s2_items: [
      "Narrative Discovery Workshops",
      "Creation of Narrative Briefings and Stakeholder Maps",
      "Advisory support for ongoing IT and transformation projects",
      "Framework implementation and backlog transfer",
    ],
    s2_closing: "The type and scope of services result from the respective offer or individual service agreement.",
    s3: "§ 3 Contract Conclusion",
    s3_text: "Offers from NarraTec are non-binding. A contract is only concluded through written order confirmation by NarraTec or through actual service delivery.",
    s4: "§ 4 Compensation and Payment",
    s4_p1: "Compensation is based on the individual service agreement. All prices are exclusive of statutory VAT.",
    s4_p2: "Invoices are payable within 14 days of invoicing without deduction, unless otherwise agreed. In case of late payment, the statutory provisions shall apply.",
    s5: "§ 5 Client's Obligations to Cooperate",
    s5_text: "The Client shall ensure that all information, documents, and access necessary for the provision of services are provided in a timely and complete manner. Delays attributable to a lack of cooperation shall not be at NarraTec's expense.",
    s6: "§ 6 Confidentiality",
    s6_text: "Both parties undertake to treat all confidential information of the other party obtained in the course of the cooperation as strictly confidential and to use it only for the contractually agreed purposes. This obligation shall survive the termination of the contract.",
    s7: "§ 7 Intellectual Property and Usage Rights",
    s7_p1: "Methods, frameworks, and tools of NarraTec (in particular the NarraTec Framework) remain the intellectual property of NarraTec. The Client receives a simple, non-transferable right of use to the work results created within the scope of the engagement.",
    s7_p2: "Project-specific documents created under the engagement (Narrative Briefings, Stakeholder Maps, etc.) become the property of the Client upon full payment.",
    s8: "§ 8 Liability",
    s8_p1: "NarraTec shall be liable without limitation for damages resulting from injury to life, body, or health, as well as for intent and gross negligence. In cases of slight negligence, NarraTec shall only be liable for breach of material contractual obligations, limited to the foreseeable, contract-typical damage.",
    s8_p2: "Liability for indirect damages, in particular lost profits, is excluded in cases of slight negligence.",
    s9: "§ 9 Contract Duration and Termination",
    s9_p1: "The contract duration results from the respective service agreement. Both parties may terminate the contract for good cause without notice. Termination must be in writing.",
    s9_p2: "In the event of early termination without good cause by the Client, services already rendered and demonstrably incurred expenses shall be compensated.",
    s10: "§ 10 Final Provisions",
    s10_p1: "The law of the Federal Republic of Germany shall apply. The place of jurisdiction for all disputes arising from this contract is Dresden, provided the Client is a merchant, a legal entity under public law, or a special fund under public law.",
    s10_p2: "Should individual provisions of these GTC be or become invalid, the validity of the remaining provisions shall remain unaffected. The invalid provision shall be replaced by an effective provision that comes closest to the economic purpose of the invalid provision.",
    date: "As of: April 2026",
  },
};
