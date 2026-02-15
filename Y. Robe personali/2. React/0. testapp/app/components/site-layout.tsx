"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { ScrollProgress } from "./scroll-progress";
import { ThemeSwitcher } from "./theme-switcher";

type NavKey = "home" | "me" | "hobby" | "contact" | "games";
type HobbyKey = "moto" | "musica" | "sport";

type SiteLayoutProps = {
    current: NavKey;
    currentHobby?: HobbyKey;
    title: string;
    subtitle?: string;
    eyebrow?: string;
    children: ReactNode;
};

export function SiteLayout({ current, currentHobby, title, subtitle, eyebrow, children }: SiteLayoutProps) {
    const hobbyActive = current === "hobby" || Boolean(currentHobby);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="main-header sticky-top">
                <nav className="container nav-shell">
                    <Link className="brand text-decoration-none" href="/" onClick={() => setIsMenuOpen(false)}>
                        <span className="brand-dot" />
                        Andrea Francavilla
                    </Link>

                    <div className="d-flex align-items-center gap-2">
                        <ThemeSwitcher />
                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary d-lg-none"
                            aria-label="Apri menu"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <i className="bi bi-list"></i>
                        </button>
                    </div>
                </nav>

                <div className={`container nav-links-wrap ${isMenuOpen ? "open" : ""}`}>
                    <ul className="nav-links-list">
                        <li>
                            <Link className={`nav-pill ${current === "home" ? "active" : ""}`} href="/" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-pill ${current === "me" ? "active" : ""}`} href="/me" onClick={() => setIsMenuOpen(false)}>
                                Profilo
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-pill ${hobbyActive ? "active" : ""}`} href="/hobby" onClick={() => setIsMenuOpen(false)}>
                                Hobby
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-pill ${current === "games" ? "active" : ""}`} href="/games" onClick={() => setIsMenuOpen(false)}>
                                Giochi
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-pill ${current === "contact" ? "active" : ""}`} href="/contact" onClick={() => setIsMenuOpen(false)}>
                                Contatti
                            </Link>
                        </li>
                    </ul>

                    <ul className="nav-links-list nav-sublist">
                        <li>
                            <Link className={`nav-subpill ${currentHobby === "moto" ? "active" : ""}`} href="/hobby/moto" onClick={() => setIsMenuOpen(false)}>
                                Moto
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-subpill ${currentHobby === "musica" ? "active" : ""}`} href="/hobby/musica" onClick={() => setIsMenuOpen(false)}>
                                Musica
                            </Link>
                        </li>
                        <li>
                            <Link className={`nav-subpill ${currentHobby === "sport" ? "active" : ""}`} href="/hobby/sport" onClick={() => setIsMenuOpen(false)}>
                                Sport
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

            <ScrollProgress />

            <main className="flex-grow-1">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-10">
                            <section className="page-heading text-center mb-5">
                                {eyebrow ? <p className="text-uppercase small page-eyebrow mb-2">{eyebrow}</p> : null}
                                <h1 className="mb-3">{title}</h1>
                                {subtitle ? <p className="lead mb-0 page-subtitle">{subtitle}</p> : null}
                            </section>
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="site-footer">
                <div className="container footer-shell">
                    <p className="mb-0 small">© 2026 Andrea Francavilla. Tutti i diritti riservati.</p>
                    <div className="d-flex align-items-center gap-3">
                        <a
                            href="https://www.instagram.com/andrea.francavilla/"
                            className="footer-link"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Instagram"
                        >
                            <i className="bi bi-instagram fs-5"></i>
                        </a>
                        <a
                            href="https://github.com/francavillaandrea"
                            className="footer-link"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <i className="bi bi-github fs-5"></i>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
