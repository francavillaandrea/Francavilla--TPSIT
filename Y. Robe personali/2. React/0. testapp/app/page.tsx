import Link from "next/link";
import { SkillsShowcase } from "./components/home/skills-showcase";
import { SiteLayout } from "./components/site-layout";

const highlights = [
    {
        icon: "bi-layers",
        title: "Sviluppo Web",
        text: "Progetti frontend strutturati con attenzione a usabilità, performance e design responsive.",
    },
    {
        icon: "bi-controller",
        title: "Game Projects",
        text: "Raccolta di giochi sviluppati in JavaScript per allenare logica e rapidità d'esecuzione.",
    },
    {
        icon: "bi-rocket-takeoff",
        title: "Crescita Continua",
        text: "Percorso tecnico in costante evoluzione con studio pratico e focus su progetti reali.",
    },
];

const quickStats = [
    { value: "16+", label: "Giochi sviluppati" },
    { value: "4", label: "Aree tecniche principali" },
    { value: "2026", label: "Portfolio aggiornato" },
];

export default function Home() {
    return (
        <SiteLayout
            current="home"
            title="Portfolio Professionale"
            eyebrow="Andrea Francavilla"
            subtitle="Sviluppatore junior orientato a frontend, logica applicata e progetti web interattivi."
        >
            <section className="hero-stage mb-5">
                <div className="row g-4 align-items-center">
                    <div className="col-12 col-lg-5 text-center">
                        <img src="/assets/img/Beta.jpg" alt="Andrea Francavilla" className="hero-avatar rounded-circle" />
                    </div>
                    <div className="col-12 col-lg-7">
                        <p className="section-kicker mb-2">Profilo</p>
                        <h2 className="display-6 mb-3">Costruisco esperienze web chiare, veloci e concrete.</h2>
                        <p className="mb-4 text-muted">
                            Questo portfolio raccoglie i miei progetti, il mio percorso e le aree su cui sto investendo
                            per crescere come sviluppatore.
                        </p>
                        <div className="d-flex flex-wrap gap-2">
                            <Link href="/games" className="btn btn-danger">
                                Vedi i giochi
                            </Link>
                            <Link href="/me" className="btn btn-outline-light">
                                Scopri il profilo
                            </Link>
                            <Link href="/contact" className="btn btn-outline-light">
                                Contattami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="row g-3 mb-5">
                {quickStats.map((stat) => (
                    <div className="col-12 col-md-4" key={stat.label}>
                        <div className="quick-stat">
                            <p className="quick-stat-number mb-1">{stat.value}</p>
                            <p className="text-muted mb-0">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <SkillsShowcase />

            <section>
                <div className="row g-4">
                    {highlights.map((item) => (
                        <div className="col-12 col-lg-4" key={item.title}>
                            <article className="card section-card h-100">
                                <div className="card-body">
                                    <i className={`bi ${item.icon} feature-icon`}></i>
                                    <h2 className="h5 mt-3">{item.title}</h2>
                                    <p className="mb-0 text-muted">{item.text}</p>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </section>
        </SiteLayout>
    );
}
