import Link from "next/link";
import { SiteLayout } from "./components/site-layout";
import { SkillsShowcase } from "./components/home/skills-showcase";

export default function Home() {
    return (
        <SiteLayout current="home" title="Andrea Francavilla" eyebrow="Home" subtitle="Portfolio - Francavilla Andrea">
            <div className="hero-stage mb-5 position-relative overflow-hidden">
                <div className="shape top-0 start-0 p-4 d-none d-md-block">
                    <i className="bi bi-code-slash display-4 rotating text-danger"></i>
                </div>
                <div className="shape top-0 end-0 p-4 d-none d-md-block">
                    <i className="bi bi-terminal display-4 floating text-warning"></i>
                </div>
                <div className="shape bottom-0 start-0 p-4 d-none d-md-block">
                    <i className="bi bi-file-earmark-code display-4 scaling text-success"></i>
                </div>
                <div className="shape bottom-0 end-0 p-4 d-none d-md-block">
                    <i className="bi bi-filetype-py display-4 floating text-info"></i>
                </div>

                <div className="text-center hero-content">
                    <Link href="/games" className="d-inline-block">
                        <img src="/assets/img/Beta.jpg" alt="Sfondo Beta" className="rounded-circle shadow hero-avatar" />
                    </Link>
                    <h2 className="display-6 mt-4 mb-2">Andrea Francavilla</h2>
                    <p className="lead floating mb-0">--- Portfolio ---</p>
                    <div className="d-flex justify-content-center gap-2 flex-wrap mt-4">
                        <Link href="/me" className="btn btn-danger">
                            Me
                        </Link>
                        <Link href="/contact" className="btn btn-outline-danger">
                            Contatti
                        </Link>
                    </div>
                </div>
            </div>

            <SkillsShowcase />

            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <div className="card bg-body-tertiary h-100 floating-card">
                        <div className="card-body">
                            <h2 className="h5 mb-3">
                                <i className="bi bi-lightning-charge me-2 text-danger"></i>Competenze nel Web Developing
                            </h2>
                            <p className="mb-0">
                                Conoscenze consolidate di HTML e CSS. Una conoscenza minima e non consolidata di JavaScript.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="card bg-body-tertiary h-100 floating-card">
                        <div className="card-body">
                            <h2 className="h5 mb-3">
                                <i className="bi bi-rocket-takeoff me-2 text-info"></i>Progetti Realizzati
                            </h2>
                            <p className="mb-0">
                                Sito portfolio personale realizzato con HTML5 semantico, Bootstrap 5 per il layout, animazioni CSS
                                personalizzate e tema chiaro/scuro dinamico.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </SiteLayout>
    );
}
