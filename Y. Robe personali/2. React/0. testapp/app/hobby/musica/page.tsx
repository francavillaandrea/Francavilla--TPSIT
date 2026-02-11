import { SiteLayout } from "../../components/site-layout";

const artists = [
  { src: "/assets/img/Carti.jpg", alt: "Playboi Carti" },
  { src: "/assets/img/sfera.jpg", alt: "Sfera Ebbasta" },
  { src: "/assets/img/caparezza.jpg", alt: "Caparezza" },
  { src: "/assets/img/travis.jpg", alt: "Travis Scott" },
  { src: "/assets/img/kid yugi.jpg", alt: "Kid Yugi" },
  { src: "/assets/img/fabri fibra.jpg", alt: "Fabri Fibra" },
];

export default function MusicaPage() {
  return (
    <SiteLayout
      current="hobby"
      currentHobby="musica"
      title="La Musica nella Mia Vita"
      eyebrow="Hobby"
      subtitle="Musica - Francavilla Andrea"
    >
      <div className="card bg-body-tertiary mb-4">
        <div className="card-body">
          <div className="row g-3 mb-4">
            {artists.map((artist) => (
              <div className="col-6 col-md-4" key={artist.src}>
                <img src={artist.src} alt={artist.alt} className="img-fluid rounded artist-photo w-100" />
              </div>
            ))}
          </div>
          <h2 className="h4">Il Mio Rapporto con la Musica</h2>
          <p className="mb-4">
            La musica è una parte fondamentale della mia routine quotidiana. Senza di essa, probabilmente non riuscirei
            a vivere allo stesso modo, perché rappresenta per me uno strumento capace di rilassarmi, ma anche di
            influenzare profondamente il mio umore. Insieme ad altre passioni, come la moto, la musica è ciò che mi fa
            sentire davvero vivo.
          </p>
          <p className="mb-4">
            Attraverso ciò che ascolto, riesco a esprimere le mie emozioni e a dare voce a quello che spesso non riesco
            a dire a parole. Tra gli artisti che ascolto più frequentemente ci sono Playboi Carti, Travis Scott, Chief
            Keef, King Von e Ken Carson, che rappresentano per me l&apos;essenza di un certo stile e di un&apos;energia
            che mi coinvolge totalmente.
          </p>
          <p className="mb-4">
            Oltre alla scena americana, seguo anche molti artisti della trap italiana, come Sfera Ebbasta, Artie 5ive,
            Shiva e Kid Yugi, che riescono a raccontare attraverso la musica le realtà da cui provengono.
          </p>
          <p className="mb-0">
            Non mancano poi artisti italiani come Caparezza e Fabri Fibra, che, seppur con stili diversi, hanno avuto
            un grande impatto su di me.
          </p>
        </div>
      </div>

      <div className="card bg-body-tertiary mb-4">
        <div className="card-body">
          <h2 className="h4 mb-3">Generi Preferiti</h2>
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <span className="badge text-bg-danger me-2">Trap</span>Un sottogenere del rap con suoni elettronici
            </li>
            <li className="mb-2">
              <span className="badge text-bg-danger me-2">Hip-Hop</span>Il genere base da cui tutto è partito
            </li>
            <li className="mb-2">
              <span className="badge text-bg-danger me-2">Rap</span>In tutte le sue forme e sottogeneri
            </li>
            <li>
              <span className="badge text-bg-danger me-2">Drill</span>Una variante più aggressiva della trap
            </li>
          </ul>
        </div>
      </div>

      <div className="card bg-body-tertiary">
        <div className="card-body">
          <h2 className="h4">Playlist</h2>
          <p>
            La musica mi accompagna in ogni momento della giornata. Ho diverse playlist per ogni occasione:
            dall&apos;allenamento alla guida, dallo studio al relax.
          </p>
          <a
            href="https://open.spotify.com/user/31hvixinzjvp76gbi7kvise5vdoa?si=f837be01cd124b42"
            target="_blank"
            rel="noreferrer"
            className="btn btn-success d-inline-flex align-items-center gap-2"
          >
            <i className="bi bi-spotify"></i> Seguimi su Spotify
          </a>
        </div>
      </div>
    </SiteLayout>
  );
}
