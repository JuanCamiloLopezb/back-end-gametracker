import express from "express";
import Juego from "../models/Juego.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const juegos = await Juego.find();
  res.json(juegos);
});

router.post("/", async (req, res) => {
  const nuevoJuego = new Juego(req.body);
  await nuevoJuego.save();
  res.json(nuevoJuego);
});

router.put("/:id", async (req, res) => {
  const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(juegoActualizado);
});

router.delete("/:id", async (req, res) => {
  await Juego.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Juego eliminado" });
});

export default router;
