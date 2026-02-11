import Link from "next/link";
import { SiteLayout } from "../components/site-layout";

const hobbies = [
  {
    href: "/hobby/moto",
    title: "Moto",
    image: "/assets/img/Hobby/Moto_Stock.jpg",
    text: "La mia passione per le due ruote...",
    tag: "Adrenalina",
  },
  {
    href: "/hobby/musica",
    title: "Musica",
    image: "/assets/img/Hobby/Musica_Stock.png",
    text: "Il mio amore per la musica...",
    tag: "Creativita",
  },
  {
    href: "/hobby/sport",
    title: "Sport",
    image: "/assets/img/Hobby/Sport_Stock.jfif",
    text: "La mia passione per lo sport...",
    tag: "Disciplina",
  },
];

export default function HobbyPage() {
  return (
    <SiteLayout
      current="hobby"
      title="I Miei Hobby"
      eyebrow="Lifestyle"
      subtitle="I Miei Hobby"
    >
      <div className="row g-4">
        {hobbies.map((hobby) => (
          <div className="col-12 col-md-6 col-xl-4" key={hobby.title}>
            <div className="card h-100 bg-body-tertiary floating-card">
              <img src={hobby.image} className="card-img-top hobby-image" alt={hobby.title} />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h2 className="h5 card-title mb-0">{hobby.title}</h2>
                  <span className="badge text-bg-danger">{hobby.tag}</span>
                </div>
                <p className="card-text flex-grow-1">{hobby.text}</p>
                <Link href={hobby.href} className="btn btn-danger mt-2">
                  Leggi di piu
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SiteLayout>
  );
}
