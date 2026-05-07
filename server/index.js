const express = require("express");
const app = express();
app.use(express.json());

// In-memory "database"
let books = [
  { id: 1, title: "The Pragmatic Programmer", author: "Hunt & Thomas", year: 1999, available: true },
  { id: 2, title: "Clean Code", author: "Robert C. Martin", year: 2008, available: true },
  { id: 3, title: "You Don't Know JS", author: "Kyle Simpson", year: 2015, available: false },
];
let nextId = 4;

// GET /books — бүх номыг буцаана
app.get("/books", (req, res) => {
  res.json({ data: books, total: books.length });
});

// GET /books/:id — нэг номыг буцаана, олдохгүй бол 404
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ error: "Book not found", id: req.params.id });
  res.json(book);
});

// POST /books — шинэ ном нэмэх; title, author заавал байна
app.post("/books", (req, res) => {
  const { title, author, year, available } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  const book = { id: nextId++, title, author, year: year || null, available: available !== false };
  books.push(book);
  res.status(201).json(book);
});

// PUT /books/:id — бүтэн шинэчлэх
app.put("/books/:id", (req, res) => {
  const idx = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  const { title, author, year, available } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: "title and author are required" });
  }
  books[idx] = { id: books[idx].id, title, author, year: year || null, available: available !== false };
  res.json(books[idx]);
});

// DELETE /books/:id — ном устгах
app.delete("/books/:id", (req, res) => {
  const idx = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: "Book not found" });
  books.splice(idx, 1);
  res.status(204).send();
});

// GET /health — CI health-check
app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Books API running on port ${PORT}`));

module.exports = app;
