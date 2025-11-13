require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Game = require('./models/juego.js');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Conexión a Base de Datos
const MONGO_URL = "mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/Juan"

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gamerboxd')
  .then(() => console.log(' Conectado a MongoDB'))
  .catch(err => console.error(' Error de conexión:', err));

// 2. Rutas (Endpoints) [cite: 52]

// GET: Obtener todos los juegos
app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ error: 'Error al traer juegos' });
  }
});

// POST: Agregar un juego nuevo
app.post('/api/games', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ error: 'Error al guardar juego' });
  }
});

// PUT: Editar un juego (reseñas, horas, estado)
app.put('/api/games/:id', async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar' });
  }
});

// DELETE: Eliminar juego
app.delete('/api/games/:id', async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Juego eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

// 3. Iniciar servidor
const PORT = 4000; // <--- CAMBIO AQUÍ
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});
