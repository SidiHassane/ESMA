"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
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
  Import,
  LandPlot,
  MapPin,
  Menu,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  TrendingUp,
  Users,
  Wrench,
  X,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  location: string;
};

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const navigation = [
  { label: "Accueil", href: "#accueil" },
  { label: "Entreprise", href: "#entreprise" },
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projets" },
  { label: "Contact", href: "#contact" },
];

const services: Service[] = [
  {
    title: "Travaux publics",
    description:
      "Conception et exécution d'infrastructures routières, plateformes, ouvrages de génie civil et aménagements structurants.",
    icon: LandPlot,
    image: "/images/roads.jpg",
  },
  {
    title: "Bâtiment",
    description:
      "Construction de bâtiments administratifs, résidentiels, logistiques et industriels avec des standards élevés de qualité.",
    icon: Building2,
    image: "/images/building.jpg",
  },
  {
    title: "Hydraulique",
    description:
      "Réseaux d'adduction, forage, distribution et ouvrages hydrauliques pour les besoins urbains, ruraux et industriels.",
    icon: Droplets,
    image: "/images/hydraulics.jpg",
  },
  {
    title: "Assainissement",
    description:
      "Canalisations, drainage, collecte et traitement des eaux usées pour des environnements durables et conformes.",
    icon: Wrench,
    image: "/images/roads.jpg",
  },
  {
    title: "Industrie",
    description:
      "Travaux industriels, maintenance, montage d'équipements et accompagnement technique pour les sites exigeants.",
    icon: Factory,
    image: "/images/industry.jpg",
  },
  {
    title: "Import / Export",
    description:
      "Approvisionnement, fourniture d'équipements, logistique et importation de matériaux liés aux activités de chantier.",
    icon: Import,
    image: "/images/logistics.jpg",
  },
];

const projects: Project[] = [
  {
    title: "Construction d'axe routier régional",
    category: "Travaux publics",
    description:
      "Réalisation d'un tronçon structurant avec terrassement, revêtement, ouvrages de franchissement et signalisation.",
    image: "/images/roads.jpg",
    location: "Région d'Agadez",
  },
  {
    title: "Réseau hydraulique multi-sites",
    category: "Hydraulique",
    description:
      "Extension de réseau, pose de conduites et mise en place de solutions de distribution d'eau pour plusieurs zones.",
    image: "/images/hydraulics.jpg",
    location: "Nord du Niger",
  },
  {
    title: "Bâtiment administratif et technique",
    category: "Bâtiment",
    description:
      "Conception-construction d'un ensemble fonctionnel intégrant bureaux, locaux techniques et finitions premium.",
    image: "/images/building.jpg",
    location: "Agadez",
  },
  {
    title: "Programme d'assainissement urbain",
    category: "Assainissement",
    description:
      "Création de réseaux d'évacuation, ouvrages de drainage et amélioration de la résilience urbaine face aux eaux pluviales.",
    image: "/images/roads.jpg",
    location: "Centre-ville",
  },
  {
    title: "Maintenance industrielle lourde",
    category: "Industrie",
    description:
      "Interventions de maintenance et d'optimisation sur équipements industriels avec exigences fortes de disponibilité.",
    image: "/images/industry.jpg",
    location: "Site industriel",
  },
  {
    title: "Fourniture d'équipements spécialisés",
    category: "Import / Export",
    description:
      "Pilotage logistique, sourcing international et livraison de matériels techniques adaptés aux chantiers.",
    image: "/images/logistics.jpg",
    location: "Niger",
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
    title: "Solutions durables",
    description:
      "Une approche responsable favorisant la robustesse des ouvrages et la pérennité des investissements.",
    icon: TrendingUp,
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
      "Plus de 20 ans d'expérience et une capacité confirmée à accompagner les grands projets techniques.",
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
              telephone: ["+22797564616"],
              foundingDate: "2001-05-16",
              keywords: [
                "entreprise BTP Niger",
                "travaux publics Agadez",
                "hydraulique Niger",
                "entreprise construction Niger",
                "assainissement Agadez",
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
              <img src="/logo.png" alt="Logo ENTREPRISE ESMA" className="h-12 w-auto object-contain rounded-lg" />
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.3em]">
                  ENTREPRISE ESMA
                </div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  BTP, hydraulique et services industriels
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
        </header>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.div
              className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-md lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="ml-auto flex h-full w-[85%] max-w-sm flex-col bg-slate-900 p-6"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="mb-10 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                    Navigation
                  </span>
                  <button
                    type="button"
                    aria-label="Fermer le menu"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full border border-white/10 p-3 text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  {navigation.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white transition hover:border-orange-400/40 hover:bg-orange-400/10"
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={18} />
                    </a>
                  ))}
                </div>

                <div className="mt-auto grid gap-4 pt-8">
                  <button
                    type="button"
                    onClick={() => setDarkMode((value) => !value)}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-3 text-white"
                  >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {darkMode ? "Mode clair" : "Mode sombre"}
                  </button>
                  <a
                    href="https://wa.me/22797564616"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-orange-400 px-5 py-3 text-center font-semibold text-slate-950"
                  >
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
            className="relative overflow-hidden border-b border-white/10"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.75) 45%, rgba(2,6,23,0.85) 100%), url(/images/hero.jpg)",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.18),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.18),_transparent_22%)]" />

            <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-16 px-6 pb-20 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
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
                <h1 className="mt-8 text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Plus de 20 ans d&apos;expertise au service des infrastructures
                  et du developpement.
                </h1>
                <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                  ENTREPRISE ESMA accompagne les projets publics, industriels et
                  techniques avec rigueur, experience et une execution orientee
                  resultat dans les secteurs du BTP, de l&apos;hydraulique et de
                  l&apos;assainissement.
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
                <div className="mt-12 grid gap-4 sm:grid-cols-3">
                  {[
                    "Travaux publics",
                    "Hydraulique",
                    "Services industriels",
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
            className={`py-24 ${
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
                  description="Fondée le 16 mai 2001 à Agadez, ENTREPRISE ESMA s'est imposée comme un acteur polyvalent des travaux publics, du bâtiment, de l'hydraulique, de l'assainissement et des services industriels au Niger."
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
            className={darkMode ? "bg-slate-900 py-24" : "bg-white py-24"}
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
                      <div
                        className="h-56 bg-cover bg-center transition duration-500 group-hover:scale-105"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.08), rgba(15,23,42,0.74)), url(${service.image})`,
                        }}
                      />
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
            className={darkMode ? "bg-slate-950 py-24" : "bg-slate-50 py-24"}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <SectionHeading
                eyebrow="Réalisations"
                title="Des projets qui illustrent notre capacité à livrer avec exigence."
                description="Une sélection de références fictives réalistes reflétant les domaines d'intervention d'ENTREPRISE ESMA dans les infrastructures, les réseaux et les projets industriels."
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
                        className={`overflow-hidden rounded-[2rem] border ${
                          darkMode
                            ? "border-white/10 bg-white/5"
                            : "border-slate-200 bg-white"
                        }`}
                      >
                        <div
                          className="h-56 bg-cover bg-center"
                          style={{
                            backgroundImage: `linear-gradient(180deg, rgba(15,23,42,0.10), rgba(15,23,42,0.72)), url(${project.image})`,
                          }}
                        />
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

          <section className={darkMode ? "bg-slate-900 py-24" : "bg-white py-24"}>
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
            className={darkMode ? "bg-slate-950 py-24" : "bg-slate-50 py-24"}
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
            className={darkMode ? "bg-slate-900 py-24" : "bg-white py-24"}
          >
            <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
              <div className="space-y-8">
                <SectionHeading
                  eyebrow="Contact"
                  title="Échangeons sur votre prochain projet."
                  description="Vous recherchez un partenaire fiable pour un chantier, une infrastructure, un besoin hydraulique ou une prestation industrielle ? Notre équipe est disponible pour étudier votre demande."
                />

                <div className="grid gap-4">
                  {[
                    {
                      icon: Phone,
                      title: "Téléphone / WhatsApp",
                      lines: ["+227 97 56 46 16"],
                    },
                    {
                      icon: MapPin,
                      title: "Adresse",
                      lines: ["BP 128 / AZ - Agadez", "Niger"],
                    },
                    {
                      icon: BriefcaseBusiness,
                      title: "Informations légales",
                      lines: ["RC : NI-AGA-2007-B-136", "NIF : 1629/S"],
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
                    href="https://wa.me/22797564616"
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
                        className={`rounded-2xl border px-4 py-3 outline-none transition ${
                          darkMode
                            ? "border-white/10 bg-white/5 placeholder:text-slate-500 focus:border-orange-400/50"
                            : "border-slate-200 bg-white placeholder:text-slate-400 focus:border-orange-400/50"
                        }`}
                      />
                      <input
                        required
                        type="text"
                        placeholder="Entreprise"
                        className={`rounded-2xl border px-4 py-3 outline-none transition ${
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
                        className={`rounded-2xl border px-4 py-3 outline-none transition ${
                          darkMode
                            ? "border-white/10 bg-white/5 placeholder:text-slate-500 focus:border-orange-400/50"
                            : "border-slate-200 bg-white placeholder:text-slate-400 focus:border-orange-400/50"
                        }`}
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Téléphone"
                        className={`rounded-2xl border px-4 py-3 outline-none transition ${
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
                      className={`rounded-[1.5rem] border px-4 py-3 outline-none transition ${
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
                        egalement nous joindre au +227 97 56 46 16.
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
                <img src="/logo.png" alt="Logo ENTREPRISE ESMA" className="h-12 w-auto object-contain rounded-lg" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em]">
                    ENTREPRISE ESMA
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    Travaux publics, bâtiment et infrastructures
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
                infrastructures et des investissements au Niger.
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
                <p>+227 97 56 46 16</p>
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-6 right-6 z-40 rounded-full bg-orange-400 p-4 text-slate-950 shadow-lg shadow-orange-400/30"
              aria-label="Retour en haut"
            >
              <ArrowRight size={18} className="-rotate-90" />
            </motion.button>
          ) : null}
        </AnimatePresence>

        <a
          href="https://wa.me/22797564616"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 left-6 z-40 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
        >
          WhatsApp
        </a>
      </div>
    </>
  );
}
