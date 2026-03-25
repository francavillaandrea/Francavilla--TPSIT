-- =============================================
-- DATABASE: biblioteca_vallauri
-- Compatibile con XAMPP / MySQL
-- Utente: root (senza password, default XAMPP)
-- =============================================

CREATE DATABASE IF NOT EXISTS biblioteca_vallauri
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE biblioteca_vallauri;

-- =====================
-- TABELLA: utenti
-- =====================
CREATE TABLE IF NOT EXISTS utenti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    nome VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================
-- TABELLA: libri
-- =====================
CREATE TABLE IF NOT EXISTS libri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(200) NOT NULL,
    autore VARCHAR(150) NOT NULL,
    img VARCHAR(100) DEFAULT 'default.jpg',
    disponibile TINYINT(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================
-- TABELLA: prestiti
-- =====================
CREATE TABLE IF NOT EXISTS prestiti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_utente INT NOT NULL,
    id_libro INT NOT NULL,
    data_prestito DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    data_restituzione DATETIME DEFAULT NULL,
    FOREIGN KEY (id_utente) REFERENCES utenti(id),
    FOREIGN KEY (id_libro)  REFERENCES libri(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- =====================
-- DATI: utenti
-- Le password sono in chiaro come nel progetto originale
-- =====================
INSERT INTO utenti (email, nome, password) VALUES
('mario.rossi@vallauri.edu',    'Mario Rossi',    'pass123'),
('luisa.bianchi@vallauri.edu',  'Luisa Bianchi',  'pass456'),
('giovanni.verdi@vallauri.edu', 'Giovanni Verdi', 'pass789'),
('teresa.neri@vallauri.edu',    'Teresa Neri',    'pass111'),
('carla.gialli@vallauri.edu',   'Carla Gialli',   'pass222');

-- =====================
-- DATI: libri
-- =====================
INSERT INTO libri (titolo, autore, img, disponibile) VALUES
('Il Piccolo Principe',                   'Antoine de Saint-Exupéry', 'libro1.jpg',  1),
('1984',                                  'George Orwell',            'libro2.jpg',  1),
('Il Nome della Rosa',                    'Umberto Eco',              'libro3.jpg',  1),
('Harry Potter e la Pietra Filosofale',   'J.K. Rowling',             'libro4.jpg',  1),
('Il Signore degli Anelli',               'J.R.R. Tolkien',           'libro5.jpg',  1),
('La Divina Commedia',                    'Dante Alighieri',          'libro6.jpg',  1),
('Il Gattopardo',                         'Giuseppe Tomasi di Lampedusa','libro7.jpg',1),
('Il Grande Gatsby',                      'F. Scott Fitzgerald',      'libro8.jpg',  1),
('Cime Tempestose',                       'Emily Brontë',             'libro9.jpg',  1),
('Orgoglio e Pregiudizio',               'Jane Austen',               'libro10.jpg', 1),
('Il Processo',                           'Franz Kafka',              'libro11.jpg', 1),
('Moby Dick',                             'Herman Melville',          'libro12.jpg', 1),
('Fahrenheit 451',                        'Ray Bradbury',             'libro13.jpg', 1),
('Il Ritratto di Dorian Gray',            'Oscar Wilde',              'libro14.jpg', 1),
('Anna Karenina',                         'Lev Tolstoj',              'libro15.jpg', 1),
('La Metamorfosi',                        'Franz Kafka',              'libro16.jpg', 1),
('Il Codice Da Vinci',                    'Dan Brown',                'libro17.jpg', 1),
('Dracula',                               'Bram Stoker',              'libro18.jpg', 1),
('Frankenstein',                          'Mary Shelley',             'libro19.jpg', 1),
('Il Giovane Holden',                     'J.D. Salinger',            'libro20.jpg', 1);
