import { ContactForm } from "../components/contact-form";
import { SiteLayout } from "../components/site-layout";

export default function ContactPage() {
  return (
    <SiteLayout
      current="contact"
      title="Contattami"
      eyebrow="Contatti"
      subtitle="Contatti - Francavilla Andrea"
    >
      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card bg-body-tertiary h-100">
            <div className="card-body">
              <h2 className="h4 mb-3">Informazioni di Contatto</h2>
              <ul className="list-unstyled mb-0">
                <li className="mb-3">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a href="mailto:a.francavilla.3537@vallauri.edu" className="link-body-emphasis text-decoration-none">
                    a.francavilla.3537@vallauri.edu
                  </a>
                </li>
                <li className="mb-3">
                  <i className="bi bi-instagram me-2"></i>
                  <a
                    href="https://www.instagram.com/andrea.francavilla/"
                    className="link-body-emphasis text-decoration-none"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @andrea.francavilla
                  </a>
                </li>
                <li>
                  <i className="bi bi-github me-2"></i>
                  <a
                    href="https://github.com/francavillaandrea"
                    className="link-body-emphasis text-decoration-none"
                    target="_blank"
                    rel="noreferrer"
                  >
                    francavillaandrea
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card bg-body-tertiary">
            <div className="card-body">
              <h2 className="h4 mb-3">Inviami un messaggio</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
