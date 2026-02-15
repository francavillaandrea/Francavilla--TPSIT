"use client";

import Link from "next/link";
import { Game } from "@/app/data/games";

type GamesGridProps = {
  games: Game[];
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
  onReset: () => void;
};

function difficultyBadgeClass(difficulty: Game["difficulty"]) {
  if (difficulty === "Facile") return "text-bg-success";
  if (difficulty === "Media") return "text-bg-warning";
  return "text-bg-danger";
}

export function GamesGrid({ games, favorites, onToggleFavorite, onReset }: GamesGridProps) {
  if (games.length === 0) {
    return (
      <div className="card bg-body-tertiary border-danger-subtle">
        <div className="card-body text-center py-5">
          <i className="bi bi-emoji-frown display-5 text-danger"></i>
          <h2 className="h4 mt-3">Nessun gioco trovato</h2>
          <p className="text-muted mb-4">Prova a cambiare ricerca, categoria o filtro preferiti.</p>
          <button type="button" className="btn btn-danger" onClick={onReset}>
            Ripristina filtri
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {games.map((game) => {
        const isFavorite = favorites.includes(game.slug);
        return (
          <div className="col-12 col-md-6 col-xl-4" key={game.slug}>
            <div className="card bg-body-tertiary h-100 game-card">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className={`badge ${difficultyBadgeClass(game.difficulty)}`}>{game.difficulty}</span>
                  <button
                    type="button"
                    className={`btn btn-sm ${isFavorite ? "btn-danger" : "btn-outline-danger"}`}
                    aria-label={`Aggiungi ${game.title} ai preferiti`}
                    onClick={() => onToggleFavorite(game.slug)}
                  >
                    <i className="bi bi-heart-fill"></i>
                  </button>
                </div>

                <div className="text-center mb-3">
                  <i className={`bi ${game.icon} display-5 text-danger`}></i>
                </div>

                <h2 className="h5 text-center">{game.title}</h2>
                <p className="text-center text-muted mb-2">
                  {game.category} • ~{game.estimatedMinutes} min
                </p>
                <p className="flex-grow-1">{game.description}</p>

                <div className="d-flex gap-2 mt-2">
                  <a href={game.path} target="_blank" rel="noreferrer" className="btn btn-outline-danger w-50">
                    Originale
                  </a>
                  <Link href={`/games/${game.slug}`} className="btn btn-danger w-50">
                    Gioca
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
