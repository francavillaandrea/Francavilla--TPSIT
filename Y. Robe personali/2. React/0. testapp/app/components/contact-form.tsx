"use client";

import { FormEvent, useState } from "react";

const COOLDOWN_MS = 5 * 60 * 1000;

export function ContactForm() {
  const [status, setStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<"info" | "error" | "success">("info");
  const [lastSent, setLastSent] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("contact-last-sent") || "0");
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Date.now() - lastSent < COOLDOWN_MS) {
      const remainingSeconds = Math.max(0, Math.ceil((lastSent + COOLDOWN_MS - Date.now()) / 1000));
      setStatus(`Attendi ${remainingSeconds}s prima di inviare un altro messaggio.`);
      setStatusType("error");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 3 || subject.length < 3 || message.length < 10) {
      setStatus("Compila tutti i campi: messaggio minimo 10 caratteri.");
      setStatusType("error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("Inserisci un'email valida.");
      setStatusType("error");
      return;
    }

    const mailto = new URL("mailto:a.francavilla.3537@vallauri.edu");
    mailto.searchParams.set("subject", `[Portfolio] ${subject}`);
    mailto.searchParams.set("body", `Nome: ${name}\nEmail: ${email}\n\n${message}`);

    window.location.href = mailto.toString();
    const now = Date.now();
    localStorage.setItem("contact-last-sent", String(now));
    setLastSent(now);
    setStatus("Client mail aperto. Se non si apre nulla, controlla il client email predefinito.");
    setStatusType("success");
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nome
        </label>
        <input type="text" className="form-control" id="name" name="name" minLength={3} maxLength={30} required />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" id="email" name="email" minLength={5} maxLength={60} required />
      </div>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label">
          Oggetto
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          name="subject"
          minLength={3}
          maxLength={80}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Messaggio
        </label>
        <textarea className="form-control" id="message" name="message" rows={5} minLength={10} required />
      </div>
      <button type="submit" className="btn btn-danger d-flex align-items-center gap-2">
        Invia <i className="bi bi-send"></i>
      </button>
      {status ? (
        <p className={`mt-3 mb-0 ${statusType === "error" ? "text-danger" : statusType === "success" ? "text-success" : "text-muted"}`}>
          {status}
        </p>
      ) : null}
    </form>
  );
}
