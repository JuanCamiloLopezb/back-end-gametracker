import express from "express";
import Reseña from "../models/Reseña.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const reseñas = await Reseña.find().populate("juegoId");
  res.json(reseñas);
});

router.post("/", async (req, res) => {
  const nuevaReseña = new Reseña(req.body);
  await nuevaReseña.save();
  res.json(nuevaReseña);
});

router.put("/:id", async (req, res) => {
  const reseñaActualizada = await Reseña.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(reseñaActualizada);
});

router.delete("/:id", async (req, res) => {
  await Reseña.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Reseña eliminada" });
});

export default router;
