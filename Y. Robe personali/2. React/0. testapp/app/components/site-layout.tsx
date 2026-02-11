import Link from "next/link";
import { ReactNode } from "react";
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
  const hobbyActive = current === "hobby" || currentHobby;

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border border-1 rounded-bottom sticky-top main-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand text-decoration-none" href="/">
            Francavilla Andrea
          </Link>

          <div className="d-flex align-items-center gap-3 w-100 justify-content-between flex-wrap">
            <ul className="navbar-nav flex-row flex-wrap gap-1">
              <li className="nav-item">
                <Link className={`nav-link ${current === "home" ? "active" : ""}`} href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${current === "me" ? "active" : ""}`} href="/me">
                  Me
                </Link>
              </li>
              <li className="nav-item nav-dropdown">
                <Link className={`nav-link ${hobbyActive ? "active" : ""}`} href="/hobby">
                  Hobby
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className={`dropdown-item ${currentHobby === "moto" ? "active" : ""}`} href="/hobby/moto">
                      Moto
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${currentHobby === "musica" ? "active" : ""}`}
                      href="/hobby/musica"
                    >
                      Musica
                    </Link>
                  </li>
                  <li>
                    <Link className={`dropdown-item ${currentHobby === "sport" ? "active" : ""}`} href="/hobby/sport">
                      Sport
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${current === "games" ? "active" : ""}`} href="/games">
                  Giochi
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${current === "contact" ? "active" : ""}`} href="/contact">
                  Contatti
                </Link>
              </li>
            </ul>

            <ThemeSwitcher />
          </div>
        </div>
      </nav>

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

      <footer className="py-3 border border-1 rounded-top bg-body-tertiary">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <a
                href="https://www.instagram.com/andrea.francavilla/"
                className="link-body-emphasis text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-instagram fs-5"></i>
              </a>
            </div>
            <div className="text-center flex-grow-1 mx-4">
              <p className="mb-0">© Author Francavilla Andrea 2026 All Rights Reserved.</p>
            </div>
            <div>
              <a
                href="https://github.com/francavillaandrea"
                className="link-body-emphasis text-decoration-none"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-github fs-5"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
