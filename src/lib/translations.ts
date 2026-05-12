export type Language = "tr" | "en";

export interface Translations {
  nav: {
    services: string;
    process: string;
    portfolio: string;
    benefits: string;
    faq: string;
    contact: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  process: {
    badge: string;
    title: string;
    subtitle: string;
    steps: {
      step: string;
      title: string;
      description: string;
    }[];
  };
  portfolio: {
    badge: string;
    title: string;
    subtitle: string;
    visitSite: string;
    items: {
      title: string;
      category: string;
      description: string;
      url: string;
    }[];
  };
  benefits: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      stat: string;
      title: string;
      description: string;
    }[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    slogan: string;
    description: string;
    links: string;
    contactTitle: string;
    rights: string;
  };
}

export const translations: Record<Language, Translations> = {
  tr: {
    nav: {
      services: "Hizmetler",
      process: "Süreç",
      portfolio: "Portfolyo",
      benefits: "Faydalar",
      faq: "SSS",
      contact: "İletişim",
      cta: "Ücretsiz Danışmanlık",
    },
    hero: {
      badge: "AI Otomasyon Ajansı",
      title: "İşinizi",
      titleHighlight: "Yapay Zekâ Destekli Otomasyonla",
      titleEnd: "Bir Üst Seviyeye Taşıyın",
      subtitle:
        "En kritik iş süreçlerinizi otomatikleştirmek için yapay zekânın gücünü kullanın; zamandan tasarruf edin, maliyetleri düşürün ve ekibinizin odağını gerçekten önemli işlere kaydırın",
      cta: "Hemen Başlayın",
      ctaSecondary: "Hizmetlerimiz",
    },
    services: {
      badge: "Hizmetler",
      title: "Neler Yapıyoruz?",
      subtitle:
        "İşletmenizin ihtiyaçlarına göre tasarlanan, uçtan uca web ve otomasyon çözümleri.",
      items: [
        {
          title: "Web Geliştirme",
          description:
            "Modern, hızlı ve mobil uyumlu web siteleri. SEO dostu altyapı ile Google'da üst sıralarda yer alın.",
          icon: "globe",
        },
        {
          title: "AI Otomasyon",
          description:
            "Yapay zekâ destekli chatbotlar, asistanlar ve iş süreçleri otomasyonu ile zamandan tasarruf edin.",
          icon: "bot",
        },
        {
          title: "Sosyal Medya Otomasyonu",
          description:
            "İçerik planlama, paylaşım otomasyonu ve etkileşim yönetimi ile sosyal medyanızı büyütün.",
          icon: "share",
        },
        {
          title: "E-ticaret Otomasyonu",
          description:
            "Sipariş yönetimi, stok takibi ve müşteri iletişimini otomatikleştirerek operasyonlarınızı hızlandırın.",
          icon: "cart",
        },
        {
          title: "İçerik Üretimi",
          description:
            "AI destekli ürün tanıtım videoları, reklam görselleri ve sosyal medya içerikleri oluşturun.",
          icon: "video",
        },
        {
          title: "Uygulama Geliştirme",
          description:
            "İşletmenize özel web ve mobil uygulamalar. Müşterilerinize doğrudan ulaşın.",
          icon: "app",
        },
      ],
    },
    process: {
      badge: "Süreç",
      title: "Nasıl Çalışıyoruz?",
      subtitle:
        "Fikirden canlı kullanıma kadar, projenizi 3 adımda hayata geçiriyoruz.",
      steps: [
        {
          step: "01",
          title: "Keşif & Analiz",
          description:
            "İş süreçlerinizi ve ihtiyaçlarınızı derinlemesine inceliyoruz. Hedeflerinizi anlıyor, en etkili çözüm yolunu belirliyoruz.",
        },
        {
          step: "02",
          title: "Tasarım & Geliştirme",
          description:
            "Size özel çözümü tasarlıyor ve geliştiriyoruz. Her aşamada sizi bilgilendiriyor, geri bildirimlerinizi entegre ediyoruz.",
        },
        {
          step: "03",
          title: "Teslimat & Destek",
          description:
            "Projeyi canlıya alıyor, kullanım eğitimi veriyor ve sürekli destek sağlıyoruz. Yanınızdayız.",
        },
      ],
    },
    portfolio: {
      badge: "Portfolyo",
      title: "Projelerimiz",
      subtitle: "Farklı sektörlerden gerçekleştirdiğimiz projeler.",
      visitSite: "Siteyi Ziyaret Et",
      items: [
        {
          title: "Bahtiyar Hoca",
          category: "Din & Eğitim",
          description: "Dini danışmanlık ve fetva platformu için modern web sitesi tasarımı.",
          url: "https://bahtiyarhoca.com",
        },
        {
          title: "A'saftat Baklava",
          category: "Gıda & İşletme",
          description: "Premium tatlıcı markası için etkileyici landing page ve marka kimliği.",
          url: "https://asaftat-baklava.vercel.app",
        },
        {
          title: "Psikolog Kliniği",
          category: "Sağlık & Klinik",
          description: "Psikolog kliniği için profesyonel randevu ve tanıtım web sitesi.",
          url: "https://psychology-futuristic-web.vercel.app",
        },
      ],
    },
    benefits: {
      badge: "Faydalar",
      title: "AI Otomasyonu İşinize Ne Katar?",
      subtitle: "Yapay zekâ ve otomasyon çözümlerinin işletmelere sağladığı somut faydalar.",
      items: [
        {
          stat: "%40",
          title: "Operasyonel Maliyet Düşüşü",
          description: "Tekrarlayan iş süreçlerinin otomasyonu ile operasyonel maliyetlerde ortalama düşüş.",
        },
        {
          stat: "%35",
          title: "Sepet Ortalaması Artışı",
          description: "E-ticaret otomasyonu ve kişiselleştirilmiş öneriler ile sepet ortalamasında artış.",
        },
        {
          stat: "7/24",
          title: "Kesintisiz Müşteri Hizmeti",
          description: "AI chatbot ve sesli asistanlar ile müşterilerinize her an yanıt verin.",
        },
        {
          stat: "%60",
          title: "Zaman Tasarrufu",
          description: "Manuel işlerin otomasyonu sayesinde ekibinizin gerçekten önemli işlere odaklanması.",
        },
        {
          stat: "3x",
          title: "İçerik Üretim Hızı",
          description: "AI destekli içerik üretimi ile video, görsel ve metin oluşturma hızında artış.",
        },
        {
          stat: "%25",
          title: "Gelir Artışı",
          description: "Dijital varlığın güçlendirilmesi ve otomasyon ile fiziki ve online satışlarda artış.",
        },
      ],
    },
    faq: {
      badge: "SSS",
      title: "Sık Sorulan Sorular",
      subtitle: "Merak ettiğiniz soruların yanıtları.",
      items: [
        {
          question: "AI otomasyon nedir ve işime nasıl fayda sağlar?",
          answer:
            "AI otomasyon, tekrarlayan iş süreçlerini yapay zekâ ile otomatikleştirmektir. Müşteri hizmetlerinden içerik üretimine, sipariş yönetiminden sosyal medya paylaşımlarına kadar birçok süreci otomatik hale getirerek zaman ve maliyet tasarrufu sağlar.",
        },
        {
          question: "Bir proje ne kadar sürede tamamlanır?",
          answer:
            "Projenin kapsamına göre değişmekle birlikte, basit bir web sitesi 1-2 hafta, kapsamlı bir otomasyon projesi 3-6 hafta içinde tamamlanır. Keşif görüşmesinde size net bir zaman çizelgesi sunuyoruz.",
        },
        {
          question: "Hangi sektörlere hizmet veriyorsunuz?",
          answer:
            "Gıda & restoran, sağlık, eğitim, e-ticaret, perakende ve hizmet sektörü başta olmak üzere her sektöre özel çözümler sunuyoruz. Portfolyomuzdaki projelerde farklı sektör örneklerini görebilirsiniz.",
        },
        {
          question: "Fiyatlandırma nasıl çalışıyor?",
          answer:
            "Her proje ihtiyaca göre özel fiyatlandırılır. Ücretsiz keşif görüşmesinde ihtiyaçlarınızı anlıyor ve size en uygun teklifi sunuyoruz. Sürpriz maliyet yoktur.",
        },
        {
          question: "Teslimattan sonra destek sağlıyor musunuz?",
          answer:
            "Evet, her projede teslimat sonrası destek ve bakım hizmeti sunuyoruz. Teknik sorunlar, güncellemeler ve iyileştirmeler için yanınızdayız.",
        },
      ],
    },
    contact: {
      badge: "İletişim",
      title: "Projenizi Konuşalım",
      subtitle:
        "Formu doldurun, 24 saat içinde size dönüş yapalım.",
      form: {
        name: "Ad Soyad",
        namePlaceholder: "Adınız ve soyadınız",
        email: "E-posta",
        emailPlaceholder: "ornek@email.com",
        message: "Mesajınız",
        messagePlaceholder: "Projeniz hakkında bize bilgi verin...",
        submit: "Mesaj Gönder",
        sending: "Gönderiliyor...",
        success: "Mesajınız başarıyla gönderildi! En kısa sürede dönüş yapacağız.",
        error: "Bir hata oluştu. Lütfen tekrar deneyin.",
      },
    },
    footer: {
      slogan: "Doğru Rota, Akıllı Çözüm",
      description:
        "Web geliştirme ve AI otomasyon çözümleri ile işletmenizin dijital dönüşüm ortağı.",
      links: "Hızlı Bağlantılar",
      contactTitle: "İletişim",
      rights: "Tüm hakları saklıdır.",
    },
  },
  en: {
    nav: {
      services: "Services",
      process: "Process",
      portfolio: "Portfolio",
      benefits: "Benefits",
      faq: "FAQ",
      contact: "Contact",
      cta: "Free Consultation",
    },
    hero: {
      badge: "AI Automation Agency",
      title: "Take Your Business to",
      titleHighlight: "the Next Level with",
      titleEnd: "AI-Powered Automation",
      subtitle:
        "Harness the power of artificial intelligence to automate your most critical business processes; save time, reduce costs, and shift your team's focus to what truly matters",
      cta: "Get Started",
      ctaSecondary: "Our Services",
    },
    services: {
      badge: "Services",
      title: "What We Do",
      subtitle:
        "End-to-end web and automation solutions tailored to your business needs.",
      items: [
        {
          title: "Web Development",
          description:
            "Modern, fast, and mobile-friendly websites. Rank higher on Google with SEO-optimized infrastructure.",
          icon: "globe",
        },
        {
          title: "AI Automation",
          description:
            "AI-powered chatbots, assistants, and business process automation to save time.",
          icon: "bot",
        },
        {
          title: "Social Media Automation",
          description:
            "Content planning, posting automation, and engagement management to grow your social media.",
          icon: "share",
        },
        {
          title: "E-commerce Automation",
          description:
            "Automate order management, stock tracking, and customer communication to speed up operations.",
          icon: "cart",
        },
        {
          title: "Content Production",
          description:
            "Create AI-powered product videos, advertising visuals, and social media content.",
          icon: "video",
        },
        {
          title: "App Development",
          description:
            "Custom web and mobile applications for your business. Reach your customers directly.",
          icon: "app",
        },
      ],
    },
    process: {
      badge: "Process",
      title: "How We Work",
      subtitle:
        "From idea to live deployment, we bring your project to life in 3 steps.",
      steps: [
        {
          step: "01",
          title: "Discovery & Analysis",
          description:
            "We thoroughly examine your business processes and needs. We understand your goals and determine the most effective solution path.",
        },
        {
          step: "02",
          title: "Design & Development",
          description:
            "We design and develop a custom solution for you. We keep you informed at every stage and integrate your feedback.",
        },
        {
          step: "03",
          title: "Delivery & Support",
          description:
            "We launch the project, provide usage training, and offer continuous support. We're always by your side.",
        },
      ],
    },
    portfolio: {
      badge: "Portfolio",
      title: "Our Projects",
      subtitle: "Projects we've completed across different industries.",
      visitSite: "Visit Site",
      items: [
        {
          title: "Bahtiyar Hoca",
          category: "Religion & Education",
          description: "Modern website design for a religious counseling and fatwa platform.",
          url: "https://bahtiyarhoca.com",
        },
        {
          title: "A'saftat Baklava",
          category: "Food & Business",
          description: "Impressive landing page and brand identity for a premium dessert brand.",
          url: "https://asaftat-baklava.vercel.app",
        },
        {
          title: "Psychology Clinic",
          category: "Health & Clinic",
          description: "Professional appointment and showcase website for a psychology clinic.",
          url: "https://psychology-futuristic-web.vercel.app",
        },
      ],
    },
    benefits: {
      badge: "Benefits",
      title: "What AI Automation Brings to Your Business",
      subtitle: "Tangible benefits that AI and automation solutions provide to businesses.",
      items: [
        {
          stat: "40%",
          title: "Operational Cost Reduction",
          description: "Average reduction in operational costs through automation of repetitive processes.",
        },
        {
          stat: "35%",
          title: "Cart Average Increase",
          description: "Increase in cart average through e-commerce automation and personalized recommendations.",
        },
        {
          stat: "24/7",
          title: "Non-stop Customer Service",
          description: "Respond to your customers at any time with AI chatbots and voice assistants.",
        },
        {
          stat: "60%",
          title: "Time Savings",
          description: "Let your team focus on truly important work through automation of manual tasks.",
        },
        {
          stat: "3x",
          title: "Content Production Speed",
          description: "Increase in video, visual, and text creation speed with AI-powered content production.",
        },
        {
          stat: "25%",
          title: "Revenue Growth",
          description: "Increase in physical and online sales through digital presence strengthening and automation.",
        },
      ],
    },
    faq: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Answers to your most common questions.",
      items: [
        {
          question: "What is AI automation and how does it benefit my business?",
          answer:
            "AI automation is automating repetitive business processes with artificial intelligence. It saves time and costs by automating many processes from customer service to content production, order management to social media posts.",
        },
        {
          question: "How long does a project take to complete?",
          answer:
            "Depending on the project scope, a simple website takes 1-2 weeks, while a comprehensive automation project is completed within 3-6 weeks. We provide a clear timeline during the discovery meeting.",
        },
        {
          question: "Which industries do you serve?",
          answer:
            "We offer customized solutions for every industry, primarily food & restaurant, health, education, e-commerce, retail, and service sectors. You can see examples from different sectors in our portfolio.",
        },
        {
          question: "How does pricing work?",
          answer:
            "Each project is custom-priced based on needs. We understand your needs in a free discovery meeting and present the most suitable offer. No surprise costs.",
        },
        {
          question: "Do you provide support after delivery?",
          answer:
            "Yes, we offer post-delivery support and maintenance for every project. We're here for technical issues, updates, and improvements.",
        },
      ],
    },
    contact: {
      badge: "Contact",
      title: "Let's Talk About Your Project",
      subtitle:
        "Fill out the form, and we'll get back to you within 24 hours.",
      form: {
        name: "Full Name",
        namePlaceholder: "Your full name",
        email: "Email",
        emailPlaceholder: "example@email.com",
        message: "Your Message",
        messagePlaceholder: "Tell us about your project...",
        submit: "Send Message",
        sending: "Sending...",
        success: "Your message has been sent successfully! We'll get back to you soon.",
        error: "An error occurred. Please try again.",
      },
    },
    footer: {
      slogan: "Right Route, Smart Solution",
      description:
        "Your digital transformation partner with web development and AI automation solutions.",
      links: "Quick Links",
      contactTitle: "Contact",
      rights: "All rights reserved.",
    },
  },
};
