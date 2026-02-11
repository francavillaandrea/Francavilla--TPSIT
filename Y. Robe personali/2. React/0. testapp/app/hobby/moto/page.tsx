import { SiteLayout } from "../../components/site-layout";

export default function MotoPage() {
  return (
    <SiteLayout
      current="hobby"
      currentHobby="moto"
      title="La Mia Passione per le Moto"
      eyebrow="Hobby"
      subtitle="Moto - Francavilla Andrea"
    >
      <div className="card bg-body-tertiary mb-4">
        <img src="/assets/img/Beta2.jpg" className="card-img-top cover-large" alt="Beta RR 50" />
        <div className="card-body">
          <h2 className="h4">Beta RR 50</h2>
          <p>
            La Beta RR 50 è una moto da enduro leggera e maneggevole, perfetta per iniziare nel mondo
            dell&apos;off-road. Con il suo motore a 2 tempi raffreddato a liquido, offre un ottimo compromesso tra
            prestazioni e maneggevolezza. L&apos;ho scelta come mia prima moto per la sua affidabilità e versatilità.
          </p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <img src="/assets/img/Beta3.jpg" className="img-fluid rounded cover-small w-100" alt="Beta vista 1" />
        </div>
        <div className="col-12 col-md-4">
          <img src="/assets/img/Beta4.jpg" className="img-fluid rounded cover-small w-100" alt="Beta vista 2" />
        </div>
        <div className="col-12 col-md-4">
          <img src="/assets/img/Beta5.jpg" className="img-fluid rounded cover-small w-100" alt="Beta vista 3" />
        </div>
      </div>

      <div className="card bg-body-tertiary mb-4">
        <div className="card-body">
          <h2 className="h4">Caratteristiche Tecniche</h2>
          <ul className="list-unstyled mb-0">
            <li>
              <i className="bi bi-gear me-2 text-danger"></i>Motore: Monocilindrico 2 Tempi
            </li>
            <li>
              <i className="bi bi-speedometer2 me-2 text-danger"></i>Cilindrata: 50 cc
            </li>
            <li>
              <i className="bi bi-droplet-half me-2 text-danger"></i>Raffreddamento: A liquido
            </li>
            <li>
              <i className="bi bi-lightning-charge me-2 text-danger"></i>Potenza: 3 CV
            </li>
            <li>
              <i className="bi bi-box me-2 text-danger"></i>Peso: 85 kg a secco
            </li>
          </ul>
        </div>
      </div>

      <div className="card bg-body-tertiary mb-4">
        <div className="card-body">
          <h2 className="h4">La Mia Officina</h2>
          <p>
            Una delle cose che mi appassiona di più è la meccanica della moto. Mi piace dedicare il mio tempo libero
            a smontare e rimontare vari componenti del Beta, studiandone il funzionamento nei minimi dettagli. Questa
            pratica non solo mi permette di acquisire una conoscenza più approfondita della mia moto, ma mi dà anche
            la possibilità di effettuare personalmente la manutenzione ordinaria e le piccole riparazioni. È
            un&apos;attività che richiede pazienza e precisione, ma la soddisfazione di vedere la moto funzionare
            perfettamente dopo averci lavorato sopra è impagabile.
          </p>
        </div>
      </div>

      <div className="card bg-body-tertiary mb-4">
        <div className="card-body">
          <h2 className="h4">Le Mie Esperienze</h2>
          <p>
            Ho iniziato a guidare le moto all&apos;età di 15 anni. Da allora, questa passione è cresciuta sempre di
            più. La mia Beta RR 50 mi ha accompagnato in numerose avventure off-road, permettendomi di esplorare
            sentieri e migliorare le mie capacità di guida. L&apos;enduro non è solo uno sport per me, ma un vero e
            proprio stile di vita.
          </p>
        </div>
      </div>

      <div className="card bg-body-tertiary mb-4">
        <div className="card-body">
          <h2 className="h4">Una Passione di Famiglia</h2>
          <p>
            La passione per le moto non è nata per caso. Mio padre, grande appassionato delle due ruote, mi ha
            trasmesso questo amore fin da piccolo. Nel corso degli anni, ha avuto l&apos;opportunità di guidare
            diverse moto, ognuna con le sue caratteristiche uniche. Attraverso i suoi racconti e le sue esperienze, ho
            imparato ad apprezzare non solo l&apos;aspetto tecnico delle moto, ma anche la libertà e le emozioni che
            solo guidare una moto può regalare. È grazie a lui se oggi posso dire che le moto non sono solo un mezzo
            di trasporto, ma una vera e propria passione che ci unisce.
          </p>
        </div>
      </div>

      <div className="card bg-body-tertiary mb-4">
        <div className="card-body">
          <h2 className="h4">La Passione di Mio Padre</h2>
          <div className="row g-4">
            <div className="col-12 col-lg-6">
              <img src="/assets/img/vtr1000.jpg" className="img-fluid rounded cover-medium w-100" alt="Honda VTR 1000" />
            </div>
            <div className="col-12 col-lg-6">
              <h3 className="h5 mb-3">Honda VTR 1000</h3>
              <p>
                La Honda VTR 1000 Firestorm è stata una delle moto più amate da mio padre. Con il suo potente motore
                V-twin da 996cc, questa sportiva rappresentava il perfetto equilibrio tra prestazioni e comfort. Il
                caratteristico rombo del bicilindrico e la sua versatilità la rendevano ideale sia per i viaggi lunghi
                che per le uscite domenicali.
              </p>
            </div>
          </div>
          <div className="row g-4 mt-1">
            <div className="col-12 col-lg-6">
              <img src="/assets/img/Freccia.jpg" className="img-fluid rounded cover-medium w-100" alt="Cagiva Freccia" />
            </div>
            <div className="col-12 col-lg-6">
              <h3 className="h5 mb-3">Cagiva Freccia C12R</h3>
              <p>
                La Cagiva Freccia C12R è stata la prima vera moto di mio padre. Prodotta negli anni &apos;90, questa
                125cc rappresentava il sogno di molti giovani ragazzi dell&apos;epoca e l&apos;inizio di una passione
                che poi mi ha trasmesso.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-body-tertiary">
        <div className="card-body">
          <h2 className="h4">Le Mie Avventure</h2>
          <div className="mb-4">
            <h3 className="h5 mb-2">Misano World Circuit</h3>
            <p>
              Ho avuto l&apos;incredibile opportunità di visitare il Misano World Circuit Marco Simoncelli, uno dei
              circuiti più iconici del motomondiale. Respirare l&apos;atmosfera del mondo delle corse è stata
              un&apos;esperienza indimenticabile.
            </p>
          </div>
          <div>
            <h3 className="h5 mb-2">Le Mie Avventure in Enduro</h3>
            <p>
              L&apos;enduro è una disciplina che mi permette di mettere alla prova le mie capacità di guida in ogni
              condizione. Affrontare sentieri impervi, attraversare boschi e superare ostacoli naturali è una sfida
              continua che mi appassiona sempre di più.
            </p>
          </div>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <img src="/assets/img/misano1.jpg" className="img-fluid rounded cover-medium w-100" alt="Misano 1" />
            </div>
            <div className="col-12 col-md-6">
              <img src="/assets/img/misano2.jpg" className="img-fluid rounded cover-medium w-100" alt="Misano 2" />
            </div>
            <div className="col-12">
              <img src="/assets/img/enduro.png" className="img-fluid rounded cover-large w-100" alt="Enduro" />
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
