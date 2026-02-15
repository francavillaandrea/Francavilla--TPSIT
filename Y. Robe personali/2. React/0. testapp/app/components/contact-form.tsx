"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const COOLDOWN_MS = 5 * 60 * 1000;

export function ContactForm() {
    const [status, setStatus] = useState<string>("");
    const [statusType, setStatusType] = useState<"info" | "error" | "success">("info");
    const [lastSent, setLastSent] = useState<number>(() => {
        if (typeof window === "undefined") return 0;
        return Number(localStorage.getItem("contact-last-sent") || "0");
    });
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timer);
    }, []);

    const remainingSeconds = useMemo(() => {
        return Math.max(0, Math.ceil((lastSent + COOLDOWN_MS - now) / 1000));
    }, [lastSent, now]);

    const canSend = remainingSeconds === 0;

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!canSend) {
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
            setStatus("Compila tutti i campi correttamente. Il messaggio deve avere almeno 10 caratteri.");
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
        const timestamp = Date.now();
        localStorage.setItem("contact-last-sent", String(timestamp));
        setLastSent(timestamp);
        setStatus("Client email aperto. Se non parte automaticamente, verifica il client predefinito.");
        setStatusType("success");
        event.currentTarget.reset();
    };

    return (
        <form onSubmit={onSubmit} className="d-grid gap-3">
            <div>
                <label htmlFor="name" className="form-label">
                    Nome
                </label>
                <input type="text" className="form-control" id="name" name="name" minLength={3} maxLength={40} required />
            </div>

            <div>
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input type="email" className="form-control" id="email" name="email" minLength={5} maxLength={80} required />
            </div>

            <div>
                <label htmlFor="subject" className="form-label">
                    Oggetto
                </label>
                <input type="text" className="form-control" id="subject" name="subject" minLength={3} maxLength={100} required />
            </div>

            <div>
                <label htmlFor="message" className="form-label">
                    Messaggio
                </label>
                <textarea className="form-control" id="message" name="message" rows={6} minLength={10} required />
            </div>

            <div className="d-flex flex-wrap gap-3 align-items-center">
                <button type="submit" className="btn btn-danger d-inline-flex align-items-center gap-2" disabled={!canSend}>
                    <i className="bi bi-send"></i>
                    {canSend ? "Invia messaggio" : `Riprova tra ${remainingSeconds}s`}
                </button>
                <p className="mb-0 small text-muted">Ti rispondo appena possibile.</p>
            </div>

            {status ? (
                <p className={`mb-0 ${statusType === "error" ? "text-danger" : statusType === "success" ? "text-success" : "text-muted"}`}>
                    {status}
                </p>
            ) : null}
        </form>
    );
}
