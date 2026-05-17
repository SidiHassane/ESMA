"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  Clock3,
  Droplets,
  Factory,
  HardHat,
  Truck,
  Import,
  LandPlot,
  MapPin,
  Menu,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  Users,
  Wrench,
  X,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
  imagePosition?: string;
};

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  location: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

type GalleryPhoto = {
  src: string;
  alt: string;
};

type GalleryVideo = {
  src: string;
  poster: string;
  title: string;
};

const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "Entreprise", href: "#entreprise" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "Galerie", href: "#galerie" },
  { label: "Contact", href: "#contact" },
];

const primaryPhone = {
  label: "WhatsApp / Standard",
  display: "+227 97 56 46 16",
  href: "tel:+22797564616",
};

const secondaryPhone = {
  label: "Ligne directe",
  display: "+227 90 02 96 91",
  href: "tel:+22790029691",
};

const whatsappHref = "https://wa.me/22797564616";

const services: Service[] = [
  {
    title: "Travaux publics",
    description:
      "Conception et exécution d'infrastructures routières, plateformes, ouvrages de génie civil et aménagements structurants.",
    icon: LandPlot,
    image: "/images/roads.jpg",
    imageAlt: "Équipe de chantier sur un projet de travaux publics",
    imagePosition: "center 52%",
  },
  {
    title: "Bâtiment",
    description:
      "Construction de bâtiments administratifs, résidentiels, logistiques et industriels avec des standards élevés de qualité.",
    icon: Building2,
    image: "/images/building.jpg",
    imageAlt: "Bâtiment moderne illustrant une activité de construction",
  },
  {
    title: "Hydraulique",
    description:
      "Réseaux d'adduction, forage, distribution et ouvrages hydrauliques pour les besoins urbains, ruraux et industriels.",
    icon: Droplets,
    image: "/images/hero.jpg",
    imageAlt: "Travaux de bétonnage avec conduite visible pour un ouvrage hydraulique",
    imagePosition: "center 58%",
  },
  {
    title: "Assainissement",
    description:
      "Canalisations, drainage, collecte et traitement des eaux usées pour des environnements durables et conformes.",
    icon: Wrench,
    image:
      "https://images.pexels.com/photos/12387207/pexels-photo-12387207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Tuyaux en béton alignés sur un chantier d'assainissement",
    imagePosition: "center 62%",
  },
  {
    title: "Industrie",
    description:
      "Travaux industriels, maintenance, montage d'équipements et accompagnement technique pour les sites exigeants.",
    icon: Factory,
    image: "/images/industry.jpg",
    imageAlt: "Intérieur d'un site industriel de grande dimension",
  },
  {
    title: "Import / Export",
    description:
      "Approvisionnement, fourniture d'équipements, logistique et importation de matériaux liés aux activités de chantier.",
    icon: Import,
    image: "/images/logistics.jpg",
    imageAlt: "Allée logistique avec palettes et fournitures techniques",
  },
  {
    title: "Location d'engins",
    description:
      "Mise à disposition d'une flotte d'engins de chantier performants pour vos travaux de terrassement et de construction.",
    icon: Truck,
    image:
      "https://images.pexels.com/photos/15370211/pexels-photo-15370211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    imageAlt: "Excavatrice lourde en activité sur un chantier de terrassement",
    imagePosition: "center 55%",
  },
  {
    title: "Énergie renouvelable",
    description:
      "Interventions dans le solaire et les équipements associés, avec un agrément obtenu récemment pour accompagner les besoins en énergie renouvelable.",
    icon: Sun,
    image: "/images/hero.jpg",
    imageAlt:
      "Ouvrage technique illustrant une activité liée à l'énergie renouvelable",
    imagePosition: "center 56%",
  },
];

const projects: Project[] = [
  {
    title: "Construction de 10 villas pour la CNSS",
    category: "Bâtiment résidentiel",
    description:
      "Programme de construction mené pour le compte de la CNSS, avec plusieurs vues de terrain visibles dans la galerie photo et vidéo.",
    image: encodeURI(
      "/images/Chantier/WhatsApp Image 2026-05-16 at 18.23.14 (1).jpeg",
    ),
    imageAlt: "Vue de la construction des 10 villas réalisées pour la CNSS",
    imagePosition: "center",
    location: "Diffa",
  },
  {
    title: "Centre de promotion sociale de Diffa",
    category: "Équipement social",
    description:
      "Réalisation d'un équipement à vocation sociale avec suivi de chantier, finitions extérieures et documentation visuelle sur site.",
    image: encodeURI(
      "/images/Chantier/WhatsApp Image 2026-05-16 at 18.23.22.jpeg",
    ),
    imageAlt: "Centre de promotion sociale de Diffa en cours de réalisation",
    imagePosition: "center",
    location: "Diffa",
  },
  {
    title: "École d'excellence de Diffa",
    category: "Éducation",
    description:
      "Projet éducatif structurant documenté par plusieurs prises de vue terrain, illustrant l'avancement des ouvrages et des aménagements.",
    image: encodeURI(
      "/images/Chantier/WhatsApp Image 2026-05-16 at 18.23.23.jpeg",
    ),
    imageAlt: "Vue de l'École d'excellence de Diffa sur chantier",
    imagePosition: "center",
    location: "Diffa",
  },
];

const differentiators = [
  {
    title: "Expertise reconnue",
    description:
      "Plus de deux décennies d'expérience au service des projets structurants publics et privés.",
    icon: BadgeCheck,
  },
  {
    title: "Respect des délais",
    description:
      "Une organisation rigoureuse orientée planification, coordination de terrain et maîtrise d'exécution.",
    icon: Clock3,
  },
  {
    title: "Équipements modernes",
    description:
      "Des moyens matériels et techniques mobilisables pour répondre aux projets d'envergure.",
    icon: HardHat,
  },
  {
    title: "Équipe qualifiée",
    description:
      "Des profils techniques, opérationnels et managériaux engagés dans la qualité du résultat.",
    icon: Users,
  },
  {
    title: "Sécurité et conformité",
    description:
      "Des standards élevés en matière de sécurité, de contrôle qualité et d'exigences réglementaires.",
    icon: ShieldCheck,
  },
  {
    title: "Agrément énergie renouvelable",
    description:
      "Un agrément obtenu récemment qui permet à ENTREPRISE ESMA d'élargir ses interventions aux solutions en énergie renouvelable.",
    icon: Sun,
  },
];

const milestones = [
  {
    year: "2001",
    title: "Création à Agadez",
    description:
      "Lancement d'ENTREPRISE ESMA le 16 mai 2001 avec une ambition claire : bâtir durablement.",
  },
  {
    year: "2007",
    title: "Structuration et croissance",
    description:
      "Renforcement administratif, montée en compétence des équipes et diversification des interventions.",
  },
  {
    year: "2014",
    title: "Expansion multisectorielle",
    description:
      "Développement des activités dans l'hydraulique, l'assainissement et les services industriels.",
  },
  {
    year: "Aujourd'hui",
    title: "Référence régionale",
    description:
      "Plus de 25 ans d'expérience, une capacité confirmée sur les grands projets techniques et un agrément récent dans l'énergie renouvelable.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "ENTREPRISE ESMA a démontré une excellente maîtrise opérationnelle, avec une équipe engagée et des délais tenus.",
    author: "Directeur de projet",
    role: "Maître d'ouvrage public",
  },
  {
    quote:
      "Nous avons apprécié la qualité du suivi de chantier, la clarté des échanges et le sérieux dans l'exécution.",
    author: "Responsable technique",
    role: "Partenaire industriel",
  },
  {
    quote:
      "Un partenaire fiable pour des travaux à fort enjeu, capable de mobiliser les ressources nécessaires sur le terrain.",
    author: "Chef de programme",
    role: "Opérateur privé",
  },
];

const stats = [
  { value: 20, suffix: "+", label: "années d'expérience" },
  { value: 100, suffix: "+", label: "projets accompagnés" },
  { value: 50, suffix: "+", label: "partenaires et clients" },
  { value: 200, suffix: "+", label: "collaborateurs mobilisables" },
];

const galleryReferences = [
  {
    title: "Construction de 10 villas pour la CNSS",
    location: "Diffa",
    description:
      "Programme résidentiel mené pour le compte de la CNSS, documenté par plusieurs séquences photo et vidéo.",
  },
  {
    title: "Centre de promotion sociale",
    location: "Diffa",
    description:
      "Réalisation d'un équipement à vocation sociale avec vues de chantier et avancement des ouvrages.",
  },
  {
    title: "École d'excellence",
    location: "Diffa",
    description:
      "Captations de terrain autour d'un projet éducatif structurant, intégrées à la galerie globale du site.",
  },
];

const chantierPhotos: GalleryPhoto[] = [
  "WhatsApp Image 2026-05-16 at 18.23.14 (1).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.14 (2).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.14.jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.15 (1).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.15 (2).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.15 (3).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.15.jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.16.jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.19.jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.22 (1).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.22.jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.23 (1).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.23.jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.29 (1).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.29.jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.36 (1).jpeg",
  "WhatsApp Image 2026-05-16 at 18.23.36.jpeg",
].map((fileName, index) => ({
  src: encodeURI(`/images/Chantier/${fileName}`),
  alt: `Archive photo de terrain ENTREPRISE ESMA ${index + 1}`,
}));

const chantierVideos: GalleryVideo[] = [
  {
    src: encodeURI("/videos/WhatsApp Video 2026-05-16 at 18.23.19.mp4"),
    poster: chantierPhotos[8]?.src ?? chantierPhotos[0].src,
    title: "Suivi terrain",
  },
  {
    src: encodeURI("/videos/WhatsApp Video 2026-05-16 at 18.23.22.mp4"),
    poster: chantierPhotos[9]?.src ?? chantierPhotos[1].src,
    title: "Avancement des travaux",
  },
  {
    src: encodeURI("/videos/WhatsApp Video 2026-05-16 at 18.23.29.mp4"),
    poster: chantierPhotos[14]?.src ?? chantierPhotos[2].src,
    title: "Exécution sur site",
  },
  {
    src: encodeURI("/videos/WhatsApp Video 2026-05-16 at 18.23.36.mp4"),
    poster: chantierPhotos[16]?.src ?? chantierPhotos[3].src,
    title: "Progression chantier",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function AnimatedCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1400;

    const tick = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      setCount(Math.round(progress * value));

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    >
      <div className="text-4xl font-semibold text-white">
        {count}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-slate-400">
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem("esma-theme") !== "light";
    }

    return true;
  });
  const [scrolled, setScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    if (activeCategory === "Tous") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  const categories = useMemo(
    () => ["Tous", ...new Set(projects.map((project) => project.category))],
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaderVisible(false), 1300);

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 24);
      setShowTopButton(offset > 420);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem("esma-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <AnimatePresence>
        {loaderVisible ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
          >
            <div className="text-center">
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-orange-400/50 bg-orange-400/10 text-2xl font-semibold text-orange-300"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { scale: [1, 1.05, 1], rotate: [0, 3, 0] }
                }
                transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
              >
                ES
              </motion.div>
              <p className="text-xs uppercase tracking-[0.5em] text-slate-400">
                ENTREPRISE ESMA
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div
        className={
          darkMode
            ? "min-h-screen bg-slate-950 text-slate-100"
            : "min-h-screen bg-slate-50 text-slate-950"
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "ENTREPRISE ESMA",
              address: "BP 128 / AZ - Agadez",
              areaServed: "Niger",
              telephone: ["+22797564616", "+22790029691"],
              foundingDate: "2001-05-16",
              keywords: [
                "entreprise BTP Niger",
                "travaux publics Agadez",
                "hydraulique Niger",
                "entreprise construction Niger",
                "assainissement Agadez",
                "énergie renouvelable Niger",
              ],
            }),
          }}
        />

        <header
          className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
            scrolled
              ? darkMode
                ? "border-b border-white/10 bg-slate-950/85 shadow-2xl shadow-black/10 backdrop-blur-xl"
                : "border-b border-slate-200 bg-white/90 shadow-lg shadow-slate-200/60 backdrop-blur-xl"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
            <a href="#accueil" className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Logo ENTREPRISE ESMA"
                width={96}
                height={48}
                className="h-12 w-auto rounded-lg object-contain"
              />
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.3em]">
                  ENTREPRISE ESMA
                </div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  BTP, hydraulique, industrie et énergie renouvelable
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-8 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm transition hover:text-orange-400 ${
                    darkMode ? "text-slate-200" : "text-slate-700"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Changer le thème"
                onClick={() => setDarkMode((value) => !value)}
                className={`hidden rounded-full border p-3 transition lg:inline-flex ${
                  darkMode
                    ? "border-white/10 bg-white/5 text-slate-200 hover:border-orange-400/50 hover:text-orange-300"
                    : "border-slate-200 bg-white text-slate-700 hover:border-orange-400/50 hover:text-orange-500"
                }`}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a
                href="#contact"
                className="hidden rounded-full bg-orange-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-orange-300 lg:inline-flex"
              >
                Demander un devis
              </a>
              <button
                type="button"
                aria-label="Ouvrir le menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
                className={`rounded-full border p-3 lg:hidden ${
                  darkMode
                    ? "border-white/10 bg-white/5 text-white"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
          <div
            className={`border-t px-4 pb-3 lg:hidden ${
              darkMode ? "border-white/10" : "border-slate-200"
            }`}
          >
            <nav
              aria-label="Navigation rapide mobile"
              className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {navigation.map((item) => (
                <a
                  key={`mobile-quick-${item.href}`}
                  href={item.href}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ${
                    darkMode
                      ? "border-white/10 bg-white/5 text-slate-100 hover:border-orange-400/40 hover:text-orange-300"
                      : "border-slate-200 bg-white text-slate-700 hover:border-orange-400/40 hover:text-orange-500"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="ml-auto flex h-full w-[85%] max-w-sm flex-col bg-slate-900 p-6"
                onClick={(event) => event.stopPropagation()}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="mb-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={64}
                      height={32}
                      className="h-8 w-auto rounded object-contain"
                    />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                      ESMA
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label="Fermer le menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full border border-white/10 p-3 text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-3">
                  {navigation.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-lg font-medium text-white transition active:scale-95 hover:border-orange-400/40 hover:bg-orange-400/10"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={20} className="text-orange-400" />
                    </a>
                  ))}
                </div>

                <div className="mt-auto grid gap-4 pt-10">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setDarkMode((value) => !value)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-4 text-white"
                    >
                      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                      <span className="text-sm font-medium">{darkMode ? "Clair" : "Sombre"}</span>
                    </button>
                    <a
                      href={secondaryPhone.href}
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-4 text-white"
                    >
                      <Phone size={20} />
                      <span className="text-sm font-medium">Appeler</span>
                    </a>
                  </div>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-3 rounded-2xl bg-orange-400 py-5 text-center font-bold text-slate-950 shadow-lg shadow-orange-400/20 active:scale-[0.98]"
                  >
                    <ArrowRight size={20} />
                    Contacter sur WhatsApp
                  </a>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main>
          <section
            id="accueil"
            className="relative overflow-hidden border-b border-white/10 scroll-mt-40"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.75) 45%, rgba(2,6,23,0.85) 100%), url(/images/hero.jpg)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.18),_transparent_22%)]" />

            <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pb-24 pt-44 sm:pt-40 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pt-32">
              <motion.div
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={sectionVariant}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-orange-400" />
                  Depuis 2001 a Agadez
                </div>
                <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Plus de 20 ans d&apos;expertise au service des infrastructures
                  et du developpement.
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                  ENTREPRISE ESMA accompagne les projets publics, industriels et
                  techniques avec rigueur, experience et une execution orientee
                  resultat dans les secteurs du BTP, de l&apos;hydraulique et de
                  l&apos;assainissement, et intervient desormais dans
                  l&apos;energie renouvelable grace a un agrement obtenu
                  recemment.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#services"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-400 px-7 py-4 font-semibold text-slate-950 transition hover:bg-orange-300"
                  >
                    Nos services
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white transition hover:border-orange-400/50 hover:bg-orange-400/10"
                  >
                    Nous contacter
                    <Phone size={18} />
                  </a>
                </div>
                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    "Travaux publics",
                    "Hydraulique",
                    "Services industriels",
                    "Énergie renouvelable",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-sm text-slate-200 backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid gap-6 lg:justify-self-end"
              >
                <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 shadow-2xl shadow-black/30 backdrop-blur-md">
                  <p className="text-sm uppercase tracking-[0.28em] text-orange-300">
                    Capacité d&apos;intervention
                  </p>
                  <div className="mt-6 grid gap-5">
                    {[
                      "Gestion de grands chantiers d'infrastructures",
                      "Pilotage multi-metiers et coordination terrain",
                      "Approche qualite, securite et conformite",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <BadgeCheck
                          size={20}
                          className="mt-1 shrink-0 text-orange-300"
                        />
                        <p className="text-slate-100">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.slice(0, 2).map((stat) => (
                    <AnimatedCounter key={stat.label} {...stat} />
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <motion.section
            id="entreprise"
            className={`scroll-mt-36 py-16 lg:py-24 ${
              darkMode ? "bg-slate-950" : "bg-slate-50"
            }`}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={sectionVariant}
          >
            <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
              <div className="space-y-8">
                <SectionHeading
                  eyebrow="L'entreprise"
                  title="Une trajectoire bâtie sur la confiance, la fiabilité et l'engagement."
                  description="Fondée le 16 mai 2001 à Agadez, ENTREPRISE ESMA s'est imposée comme un acteur polyvalent des travaux publics, du bâtiment, de l'hydraulique, de l'assainissement, des services industriels et, plus récemment, de l'énergie renouvelable au Niger."
                />

                <div
                  className={`rounded-[2rem] border p-8 ${
                    darkMode
                      ? "border-white/10 bg-white/5"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <h3 className="text-xl font-semibold">
                    Vision et valeurs
                  </h3>
                  <p
                    className={`mt-4 leading-8 ${
                      darkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    Notre ambition est d&apos;accompagner durablement le
                    developpement des territoires et des activites economiques
                    par des ouvrages robustes, performants et adaptes aux
                    realites du terrain.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      "Qualite",
                      "Securite",
                      "Fiabilite",
                      "Engagement",
                      "Expertise",
                    ].map((value) => (
                      <span
                        key={value}
                        className={`rounded-full px-4 py-2 text-sm ${
                          darkMode
                            ? "bg-slate-900 text-slate-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div
                  className={`absolute left-4 top-4 h-[calc(100%-2rem)] w-px ${
                    darkMode ? "bg-white/10" : "bg-slate-200"
                  }`}
                />
                <div className="space-y-8">
                  {milestones.map((item, index) => (
                    <motion.div
                      key={item.year}
                      className={`relative ml-0 rounded-[2rem] border p-7 pl-12 ${
                        darkMode
                          ? "border-white/10 bg-white/5"
                          : "border-slate-200 bg-white"
                      }`}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
                      whileInView={
                        shouldReduceMotion ? undefined : { opacity: 1, x: 0 }
                      }
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <div className="absolute left-3 top-8 h-3 w-3 rounded-full bg-orange-400" />
                      <p className="text-sm uppercase tracking-[0.25em] text-orange-400">
                        {item.year}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
                      <p
                        className={`mt-3 leading-8 ${
                          darkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          <section
            id="services"
            className={darkMode ? "scroll-mt-36 bg-slate-900 py-16 lg:py-24" : "scroll-mt-36 bg-white py-16 lg:py-24"}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Services"
                title="Des compétences intégrées pour piloter des projets complexes."
                description="ENTREPRISE ESMA propose une offre complète de travaux, d'ingénierie opérationnelle et de prestations techniques au service des infrastructures et des investissements."
                align="center"
              />

              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {services.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <motion.article
                      key={service.title}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                      whileInView={
                        shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: index * 0.06 }}
                      className={`group overflow-hidden rounded-[2rem] border ${
                        darkMode
                          ? "border-white/10 bg-slate-950"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.imageAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-105"
                          style={{
                            objectPosition: service.imagePosition ?? "center",
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/5 via-slate-950/25 to-slate-950/80" />
                        <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/65 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                          {service.title}
                        </div>
                      </div>
                      <div className="p-8">
                        <div className="flex items-center gap-4">
                          <div className="rounded-2xl bg-orange-400/15 p-3 text-orange-300">
                            <Icon size={24} />
                          </div>
                          <h3 className="text-2xl font-semibold">{service.title}</h3>
                        </div>
                        <p
                          className={`mt-5 leading-8 ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {service.description}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="projets"
            className={darkMode ? "scroll-mt-36 bg-slate-950 py-16 lg:py-24" : "scroll-mt-36 bg-slate-50 py-16 lg:py-24"}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Réalisations"
                title="Des projets qui illustrent notre capacité à livrer avec exigence."
                description="Quelques références récentes présentées de manière fidèle, à partir de chantiers réellement suivis par ENTREPRISE ESMA à Diffa."
              />

              <div className="mt-10 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                      activeCategory === category
                        ? "bg-orange-400 text-slate-950"
                        : darkMode
                          ? "border border-white/10 bg-white/5 text-slate-200 hover:border-orange-400/40"
                          : "border border-slate-200 bg-white text-slate-700 hover:border-orange-400/40"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="mt-12 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="grid gap-6 md:grid-cols-2">
                  <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                      <motion.article
                        key={project.title}
                        layout
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.28 }}
                        className={`group overflow-hidden rounded-[2rem] border ${
                          darkMode
                            ? "border-white/10 bg-white/5"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
                            className="object-cover transition duration-700 group-hover:scale-105"
                            style={{
                              objectPosition: project.imagePosition ?? "center",
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/10 via-slate-950/20 to-slate-950/75" />
                        </div>
                        <div className="p-7">
                          <div className="flex items-center justify-between gap-4">
                            <span className="rounded-full bg-orange-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                              {project.category}
                            </span>
                            <span
                              className={`text-sm ${
                                darkMode ? "text-slate-400" : "text-slate-500"
                              }`}
                            >
                              {project.location}
                            </span>
                          </div>
                          <h3 className="mt-5 text-2xl font-semibold">
                            {project.title}
                          </h3>
                          <p
                            className={`mt-4 leading-8 ${
                              darkMode ? "text-slate-300" : "text-slate-600"
                            }`}
                          >
                            {project.description}
                          </p>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="grid gap-4 self-start">
                  {stats.map((stat) => (
                    <AnimatedCounter key={stat.label} {...stat} />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={darkMode ? "bg-slate-900 py-16 lg:py-24" : "bg-white py-16 lg:py-24"}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Pourquoi nous choisir"
                title="Un partenaire solide pour des projets exigeants et durables."
                description="Notre valeur ajoutée repose sur l'experience terrain, l'organisation, la securite et une vision long terme de la performance des ouvrages."
                align="center"
              />

              <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {differentiators.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                      whileInView={
                        shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                      }
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      className={`rounded-[2rem] border p-7 ${
                        darkMode
                          ? "border-white/10 bg-slate-950"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="inline-flex rounded-2xl bg-orange-400/15 p-3 text-orange-300">
                        <Icon size={24} />
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
                      <p
                        className={`mt-4 leading-8 ${
                          darkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            id="galerie"
            className={darkMode ? "bg-slate-900 py-16 lg:py-24" : "bg-white py-16 lg:py-24"}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Galerie"
                title="Photos et vidéos de terrain."
                description="Cette galerie regroupe des images prises sur plusieurs chantiers, notamment la construction de 10 villas pour la CNSS, le Centre de promotion sociale de Diffa et l'École d'excellence de Diffa."
              />

              <div className="mt-10 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
                  {galleryReferences.map((reference) => (
                    <div
                      key={reference.title}
                      className={`rounded-[1.75rem] border p-6 ${
                        darkMode
                          ? "border-white/10 bg-slate-950"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                        {reference.location}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold">
                        {reference.title}
                      </h3>
                      <p
                        className={`mt-3 leading-7 ${
                          darkMode ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {reference.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className={`rounded-[1.75rem] border p-6 ${
                    darkMode
                      ? "border-white/10 bg-slate-950"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                    Archive visuelle globale
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">
                    Une lecture simple, surtout sur mobile
                  </h3>
                  <p
                    className={`mt-3 leading-7 ${
                      darkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    Les photos et vidéos illustrent plusieurs réalisations.
                    Elles sont regroupées ici comme une archive de terrain et ne
                    correspondent pas chacune à un chantier distinct.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {[
                      "Photos prises directement sur site",
                      "Vidéos courtes plus légères à consulter",
                      "Affichage plus lisible sur téléphone",
                      "Navigation simple sans confusion par chantier",
                    ].map((item) => (
                      <div
                        key={item}
                        className={`rounded-2xl border px-4 py-3 text-sm ${
                          darkMode
                            ? "border-white/10 bg-white/5 text-slate-200"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                    Vidéos terrain
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    Séquences chantier
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                  {chantierVideos.map((video) => (
                    <article
                      key={video.src}
                      className={`overflow-hidden rounded-[1.75rem] border ${
                        darkMode
                          ? "border-white/10 bg-slate-950"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <video
                        src={video.src}
                        poster={video.poster}
                        controls
                        muted
                        playsInline
                        preload="none"
                        aria-label={video.title}
                        className="aspect-[4/5] w-full bg-black object-cover"
                      >
                        Votre navigateur ne prend pas en charge la lecture
                        vidéo.
                      </video>
                      <div className="p-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                          {video.title}
                        </p>
                        <p
                          className={`mt-2 text-sm ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          Archive vidéo multi-projets
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <div className="mb-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                    Photos terrain
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    Documentation visuelle
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {chantierPhotos.map((photo) => (
                    <article
                      key={photo.src}
                      className={`overflow-hidden rounded-[1.75rem] border ${
                        darkMode
                          ? "border-white/10 bg-slate-950"
                          : "border-slate-200 bg-slate-50"
                      }`}
                    >
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                          Galerie chantier
                        </p>
                        <p
                          className={`mt-2 text-sm ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          Archive photo multi-projets
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className={darkMode ? "bg-slate-950 py-16 lg:py-24" : "bg-slate-50 py-16 lg:py-24"}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Témoignages"
                title="Une réputation construite sur la qualité de l'exécution."
                description="Des retours représentatifs du niveau d'exigence attendu par les donneurs d'ordre, partenaires techniques et investisseurs."
              />

              <div className="mt-14 grid gap-6 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <motion.blockquote
                    key={testimonial.author}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={
                      shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className={`rounded-[2rem] border p-8 ${
                      darkMode
                        ? "border-white/10 bg-white/5"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <p className="text-lg leading-8">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <footer className="mt-8">
                      <div className="font-semibold">{testimonial.author}</div>
                      <div
                        className={`mt-1 text-sm ${
                          darkMode ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {testimonial.role}
                      </div>
                    </footer>
                  </motion.blockquote>
                ))}
              </div>
            </div>
          </section>

          <section
            id="contact"
            className={darkMode ? "scroll-mt-36 bg-slate-900 py-16 lg:py-24" : "scroll-mt-36 bg-white py-16 lg:py-24"}
          >
            <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
              <div className="space-y-8">
                <SectionHeading
                  eyebrow="Contact"
                  title="Échangeons sur votre prochain projet."
                  description="Vous recherchez un partenaire fiable pour un chantier, une infrastructure, un besoin hydraulique, une prestation industrielle ou un projet en énergie renouvelable ? Notre équipe est disponible pour étudier votre demande."
                />

                <div className="grid gap-4">
                  {[
                    {
                      icon: Phone,
                      title: "Téléphones et WhatsApp",
                      lines: [
                        `${primaryPhone.label} : ${primaryPhone.display}`,
                        `${secondaryPhone.label} : ${secondaryPhone.display}`,
                      ],
                    },
                    {
                      icon: MapPin,
                      title: "Adresse",
                      lines: ["BP 128 / AZ - Agadez", "Niger"],
                    },
                    {
                      icon: BriefcaseBusiness,
                      title: "Informations légales",
                      lines: ["RC : NI-AGA-2007-B-136", "NIF : 1629/R"],
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className={`rounded-[2rem] border p-6 ${
                          darkMode
                            ? "border-white/10 bg-slate-950"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="rounded-2xl bg-orange-400/15 p-3 text-orange-300">
                            <Icon size={22} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <div
                              className={`mt-2 space-y-1 ${
                                darkMode ? "text-slate-300" : "text-slate-600"
                              }`}
                            >
                              {item.lines.map((line) => (
                                <p key={line}>{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-orange-300"
                  >
                    WhatsApp
                    <ArrowRight size={18} />
                  </a>
                  <a
                    href="mailto:o.alkassoum7456@gmail.com"
                    className={`inline-flex items-center justify-center rounded-full border px-6 py-4 font-semibold transition ${
                      darkMode
                        ? "border-white/10 bg-white/5 text-white hover:border-orange-400/40"
                        : "border-slate-200 bg-slate-50 text-slate-900 hover:border-orange-400/40"
                    }`}
                  >
                    o.alkassoum7456@gmail.com
                  </a>
                </div>
              </div>

              <div className="grid gap-6">
                <div
                  className={`rounded-[2rem] border p-8 ${
                    darkMode
                      ? "border-white/10 bg-slate-950"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <h3 className="text-2xl font-semibold">
                    Demande de devis
                  </h3>
                  <p
                    className={`mt-3 ${
                      darkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    Décrivez votre besoin et notre équipe reviendra vers vous
                    dans les meilleurs délais.
                  </p>

                  <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        required
                        type="text"
                        placeholder="Nom complet"
                        className={`rounded-2xl border px-4 py-4 text-base outline-none transition ${
                          darkMode
                            ? "border-white/10 bg-white/5 placeholder:text-slate-500 focus:border-orange-400/50"
                            : "border-slate-200 bg-white placeholder:text-slate-400 focus:border-orange-400/50"
                        }`}
                      />
                      <input
                        required
                        type="text"
                        placeholder="Entreprise"
                        className={`rounded-2xl border px-4 py-4 text-base outline-none transition ${
                          darkMode
                            ? "border-white/10 bg-white/5 placeholder:text-slate-500 focus:border-orange-400/50"
                            : "border-slate-200 bg-white placeholder:text-slate-400 focus:border-orange-400/50"
                        }`}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input
                        required
                        type="email"
                        placeholder="Email professionnel"
                        className={`rounded-2xl border px-4 py-4 text-base outline-none transition ${
                          darkMode
                            ? "border-white/10 bg-white/5 placeholder:text-slate-500 focus:border-orange-400/50"
                            : "border-slate-200 bg-white placeholder:text-slate-400 focus:border-orange-400/50"
                        }`}
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Téléphone"
                        className={`rounded-2xl border px-4 py-4 text-base outline-none transition ${
                          darkMode
                            ? "border-white/10 bg-white/5 placeholder:text-slate-500 focus:border-orange-400/50"
                            : "border-slate-200 bg-white placeholder:text-slate-400 focus:border-orange-400/50"
                        }`}
                      />
                    </div>
                    <textarea
                      required
                      rows={5}
                      placeholder="Décrivez votre projet, sa localisation et vos attentes."
                      className={`rounded-[1.5rem] border px-4 py-4 text-base outline-none transition ${
                        darkMode
                          ? "border-white/10 bg-white/5 placeholder:text-slate-500 focus:border-orange-400/50"
                          : "border-slate-200 bg-white placeholder:text-slate-400 focus:border-orange-400/50"
                      }`}
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-400 px-6 py-4 font-semibold text-slate-950 transition hover:bg-orange-300"
                    >
                      Envoyer la demande
                      <ArrowRight size={18} />
                    </button>
                    {submitted ? (
                      <p className="text-sm text-emerald-400">
                        Merci. Votre demande a bien ete enregistree. Vous pouvez
                        egalement nous joindre au {primaryPhone.display} ou au{" "}
                        {secondaryPhone.display}.
                      </p>
                    ) : null}
                  </form>
                </div>

                <div
                  className={`overflow-hidden rounded-[2rem] border ${
                    darkMode
                      ? "border-white/10 bg-slate-950"
                      : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <iframe
                    title="Carte Agadez"
                    src="https://www.google.com/maps?q=Agadez%20Niger&output=embed"
                    className="h-[320px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer
          className={`border-t py-10 ${
            darkMode
              ? "border-white/10 bg-slate-950"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1fr_0.8fr_0.8fr] lg:px-8">
            <div>
              <div className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt="Logo ENTREPRISE ESMA"
                  width={96}
                  height={48}
                  className="h-12 w-auto rounded-lg object-contain"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                    ENTREPRISE ESMA
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Travaux publics, bâtiment, industrie et énergie renouvelable
                  </p>
                </div>
              </div>
              <p
                className={`mt-5 max-w-md leading-8 ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                ENTREPRISE ESMA met son experience, son exigence de qualite et
                sa capacite d&apos;execution au service du developpement des
                infrastructures, des investissements et des nouveaux besoins en
                energie renouvelable au Niger.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em]">
                Liens rapides
              </h3>
              <div className="mt-4 grid gap-3">
                {navigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`transition hover:text-orange-400 ${
                      darkMode ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em]">
                Coordonnées
              </h3>
              <div
                className={`mt-4 grid gap-3 ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <p>BP 128 / AZ - Agadez</p>
                <p>{primaryPhone.display}</p>
                <p>{secondaryPhone.display}</p>
                <p>o.alkassoum7456@gmail.com</p>
                <div className="flex gap-3 pt-2">
                  {["LinkedIn", "Facebook", "WhatsApp"].map((network) => (
                    <span
                      key={network}
                      className={`rounded-full px-3 py-2 text-sm ${
                        darkMode
                          ? "bg-white/5 text-slate-300"
                          : "bg-white text-slate-600"
                      }`}
                    >
                      {network}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t px-6 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8 ${
              darkMode
                ? "border-white/10 text-slate-400"
                : "border-slate-200 text-slate-500"
            }`}
          >
            <p>© 2026 ENTREPRISE ESMA. Tous droits reserves.</p>
            <p>Entreprise creee le 16 mai 2001 a Agadez.</p>
          </div>
        </footer>

        <AnimatePresence>
          {showTopButton ? (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`fixed bottom-24 right-6 z-40 rounded-full p-4 shadow-xl lg:bottom-8 ${
                darkMode
                  ? "bg-slate-800 text-orange-400 border border-white/10"
                  : "bg-white text-orange-500 border border-slate-200"
              }`}
              aria-label="Retour en haut"
            >
              <ArrowRight size={20} className="-rotate-90" />
            </motion.button>
          ) : null}
        </AnimatePresence>

        {/* Barre de contact rapide mobile */}
        <div className="fixed inset-x-0 bottom-0 z-[50] flex items-center justify-center gap-4 border-t border-white/10 bg-slate-900/80 p-4 backdrop-blur-lg lg:hidden">
          <a
            href={secondaryPhone.href}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-4 font-bold text-white active:scale-95"
          >
            <Phone size={20} />
            Appeler
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex flex-[1.5] items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-bold text-white shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <ArrowRight size={20} />
            WhatsApp
          </a>
        </div>

        {/* WhatsApp FAB Desktop */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-8 left-8 z-40 hidden items-center gap-2 rounded-full bg-emerald-500 px-6 py-4 font-bold text-white shadow-2xl shadow-emerald-500/30 transition hover:scale-105 active:scale-95 lg:flex"
        >
          <ArrowRight size={20} />
          WhatsApp
        </a>
      </div>
    </>
  );
}
