"use client";

import { useEffect, useMemo, useState } from "react";

type Skill = {
  id: string;
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  details: string[];
  ctaLabel?: string;
  ctaHref?: string;
};

const skills: Skill[] = [
  {
    id: "web",
    icon: "bi-code-slash",
    iconColor: "text-danger",
    title: "Web Developing",
    subtitle: "Competenze nel Web Developing",
    details: [
      "Conoscenze consolidate di HTML",
      "Conoscenze consolidate di CSS",
      "Una conoscenza minima e non consolidata di JavaScript",
      "Tema chiaro/scuro dinamico",
    ],
  },
  {
    id: "bash",
    icon: "bi-terminal",
    iconColor: "text-warning",
    title: "Command Line",
    subtitle: "Competenze Bash",
    details: [
      "Gestione file e directory",
      "Gestione permessi",
      "Pipeline e redirezione",
      "Altri script in arrivo prossimamente...",
    ],
  },
  {
    id: "clike",
    icon: "bi-file-earmark-code",
    iconColor: "text-success",
    title: "Linguaggi C-like",
    subtitle: "Competenze",
    details: [
      "C, nel quale ho una conoscenza abbastanza consolidata",
      "C++, nel quale ho conoscenze minime",
      "C#, nel quale ho delle buone conoscenze ma poco approfondite",
      "Altri progetti in arrivo prossimamente...",
    ],
  },
  {
    id: "python",
    icon: "bi-filetype-py",
    iconColor: "text-info",
    title: "Python",
    subtitle: "Competenze Python",
    details: [
      "Programmazione base",
      "Gestione file e input utente",
      "Manipolazione stringhe",
      "Utilizzo della libreria Tkinter",
    ],
    ctaLabel: "Scarica progetto ToDo",
    ctaHref: "/assets/projects/todoList.zip",
  },
];

export function SkillsShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedSkill = useMemo(
    () => skills.find((skill) => skill.id === selectedId) ?? null,
    [selectedId],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <section className="skills-showcase mb-5">
        <p className="text-center text-uppercase small mb-3 skill-kicker">Competenze</p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          {skills.map((skill) => (
            <button
              key={skill.id}
              type="button"
              className="skill-orb"
              onClick={() => setSelectedId(skill.id)}
              aria-label={`Apri dettagli ${skill.title}`}
            >
              <i className={`bi ${skill.icon} ${skill.iconColor}`}></i>
            </button>
          ))}
        </div>
      </section>

      {selectedSkill ? (
        <div className="skill-modal-backdrop" role="dialog" aria-modal="true">
          <div className="skill-modal-card">
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <div>
                <h2 className="h4 mb-1">{selectedSkill.title}</h2>
                <p className="mb-0 text-muted">{selectedSkill.subtitle}</p>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Chiudi dettagli competenza"
                onClick={() => setSelectedId(null)}
              ></button>
            </div>

            <ul className="mb-3">
              {selectedSkill.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>

            {selectedSkill.ctaHref && selectedSkill.ctaLabel ? (
              <a href={selectedSkill.ctaHref} className="btn btn-danger btn-sm">
                {selectedSkill.ctaLabel}
              </a>
            ) : null}
          </div>

          <button
            type="button"
            className="skill-modal-overlay-close"
            onClick={() => setSelectedId(null)}
            aria-label="Chiudi finestra"
          ></button>
        </div>
      ) : null}
    </>
  );
}
