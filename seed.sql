-- SQLite Mock data
-- Insertar Autores
INSERT INTO author (name, country) VALUES ('J.K. Rowling', 'United Kingdom');
INSERT INTO author (name, country) VALUES ('George R.R. Martin', 'United States');
INSERT INTO author (name, country) VALUES ('Isaac Asimov', 'United States');
INSERT INTO author (name, country) VALUES ('J.R.R. Tolkien', 'United Kingdom');

-- Insertar Géneros
INSERT INTO genre (name, description) VALUES ('Fantasy', 'Fantasy fiction is a genre that uses magic and other supernatural elements as a primary plot element, theme, or setting.');
INSERT INTO genre (name, description) VALUES ('Science Fiction', 'Science fiction explores futuristic concepts and advanced technology.');
INSERT INTO genre (name, description) VALUES ('Mystery', 'Mystery fiction involves a suspenseful investigation of a crime or a puzzle.');
INSERT INTO genre (name, description) VALUES ('Romance', 'Romance fiction focuses on the romantic relationships between characters.');

-- Insertar Editoriales
INSERT INTO publisher (name, country, website) VALUES ('Bloomsbury', 'United Kingdom', 'https://www.bloomsbury.com');
INSERT INTO publisher (name, country, website) VALUES ('Bantam Books', 'United States', 'https://www.penguinrandomhouse.com/bantam/');
INSERT INTO publisher (name, country, website) VALUES ('Penguin Books', 'United Kingdom', 'https://www.penguin.co.uk');

-- Insertar Categorías
INSERT INTO category (name, description) VALUES ('Fiction', 'Works of fiction that tell imaginative stories.');
INSERT INTO category (name, description) VALUES ('Non-Fiction', 'Works based on real events, people, and facts.');
INSERT INTO category (name, description) VALUES ('Young Adult', 'Books targeted at a teenage audience.');
INSERT INTO category (name, description) VALUES ('Children', 'Books suitable for children.');

-- Insertar Libros
INSERT INTO book (title, publishedYear, publisherId) VALUES ('Harry Potter and the Sorcerer Stone', 1997, 1);
INSERT INTO book (title, publishedYear, publisherId) VALUES ('A Game of Thrones', 1996, 2);
INSERT INTO book (title, publishedYear, publisherId) VALUES ('Foundation', 1951, 3);
INSERT INTO book (title, publishedYear, publisherId) VALUES ('The Hobbit', 1937, 1);

-- Insertar Relaciones Muchos a Muchos

-- Relación libros-autores
INSERT INTO book_authors_author (bookId, authorId) VALUES (1, 1);
INSERT INTO book_authors_author (bookId, authorId) VALUES (2, 2);
INSERT INTO book_authors_author (bookId, authorId) VALUES (3, 3);
INSERT INTO book_authors_author (bookId, authorId) VALUES (4, 4);

-- Relación libros-categorías
INSERT INTO book_categories_category (bookId, categoryId) VALUES (1, 1);
INSERT INTO book_categories_category (bookId, categoryId) VALUES (1, 3);
INSERT INTO book_categories_category (bookId, categoryId) VALUES (2, 1);
INSERT INTO book_categories_category (bookId, categoryId) VALUES (3, 1);
INSERT INTO book_categories_category (bookId, categoryId) VALUES (4, 1);
INSERT INTO book_categories_category (bookId, categoryId) VALUES (4, 4);

-- Relación libros-géneros
INSERT INTO book_genres_genre (bookId, genreId) VALUES (1, 1);
INSERT INTO book_genres_genre (bookId, genreId) VALUES (2, 1);
INSERT INTO book_genres_genre (bookId, genreId) VALUES (3, 2);
INSERT INTO book_genres_genre (bookId, genreId) VALUES (4, 1);
