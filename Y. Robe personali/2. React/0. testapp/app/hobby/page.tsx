import Link from "next/link";
import { SiteLayout } from "../components/site-layout";

const hobbies = [
    {
        href: "/hobby/moto",
        title: "Moto",
        image: "/assets/img/Hobby/Moto_Stock.jpg",
        text: "Tecnica, adrenalina e manutenzione: una passione che unisce pratica e precisione.",
        tag: "Adrenalina",
    },
    {
        href: "/hobby/musica",
        title: "Musica",
        image: "/assets/img/Hobby/Musica_Stock.png",
        text: "Colonna sonora quotidiana che influenza energia, concentrazione e creatività.",
        tag: "Creatività",
    },
    {
        href: "/hobby/sport",
        title: "Sport",
        image: "/assets/img/Hobby/Sport_Stock.jfif",
        text: "Disciplina personale, equilibrio mentale e miglioramento costante.",
        tag: "Disciplina",
    },
];

export default function HobbyPage() {
    return (
        <SiteLayout current="hobby" title="Lifestyle & Passioni" eyebrow="Hobby" subtitle="Tre aree che completano il mio percorso personale e professionale.">
            <div className="row g-4">
                {hobbies.map((hobby) => (
                    <div className="col-12 col-md-6 col-xl-4" key={hobby.title}>
                        <article className="card section-card h-100">
                            <img src={hobby.image} className="card-img-top hobby-image" alt={hobby.title} />
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <h2 className="h5 card-title mb-0">{hobby.title}</h2>
                                    <span className="badge text-bg-danger">{hobby.tag}</span>
                                </div>
                                <p className="card-text flex-grow-1 text-muted">{hobby.text}</p>
                                <Link href={hobby.href} className="btn btn-danger mt-2">
                                    Esplora sezione
                                </Link>
                            </div>
                        </article>
                    </div>
                ))}
            </div>
        </SiteLayout>
    );
}
