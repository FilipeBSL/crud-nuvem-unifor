const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let items = [];
let idCounter = 1;

// Create
app.post('/items', (req, res) => {
  const item = { id: idCounter++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// Read all
app.get('/items', (req, res) => {
  res.json(items);
});

// Read one
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item não encontrado' });
  res.json(item);
});

// Update
app.put('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item não encontrado' });

  items[index] = { ...items[index], ...req.body };
  res.json(items[index]);
});

// Delete
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item não encontrado' });

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

// Porta local
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
