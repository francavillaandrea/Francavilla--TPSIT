import { SiteLayout } from "../components/site-layout";

export default function MePage() {
  return (
    <SiteLayout
      current="me"
      title="Chi Sono"
      eyebrow="Me"
      subtitle="Chi Sono - Francavilla Andrea"
    >
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="text-center mb-4 reveal-up">
            <img
              src="/assets/img/Chi Sono/chisono.jpg"
              alt="Andrea Francavilla"
              className="rounded profile-image d-block mx-auto"
            />
          </div>

          <div className="card bg-body-tertiary mb-4 text-center reveal-up">
            <div className="card-body">
              <h2 className="h4 mb-3">Profilo</h2>
              <ul className="list-unstyled mb-0">
                <li>
                  <strong>Nome:</strong> Andrea Francavilla
                </li>
                <li>
                  <strong>Età:</strong> 17 anni
                </li>
                <li>
                  <strong>Residenza:</strong> Carrù, Italia
                </li>
                <li>
                  <strong>Occupazione:</strong> Studente
                </li>
              </ul>
            </div>
          </div>

          <div className="card bg-body-tertiary mb-4 text-center reveal-up">
            <div className="card-body">
              <h2 className="h4 mb-3">Percorso</h2>
              <p className="mb-0">
                Sono uno studente dell&apos;IIS Vallauri di Fossano, dove studio informatica. La mia passione per la
                tecnologia e la programmazione mi ha portato a scegliere questo percorso che mi sta fornendo le basi
                per il mio futuro.
              </p>
            </div>
          </div>

          <div className="card bg-body-tertiary mb-4 text-center reveal-up">
            <div className="card-body">
              <h2 className="h4 mb-3">Interessi e Passioni</h2>
              <p className="mb-0">
                Al di fuori dello studio, ho diverse passioni che coltivo nel tempo libero. La moto, la musica e lo
                sport sono parte integrante della mia vita quotidiana e contribuiscono a definire chi sono.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
