import mongoose from "mongoose";

const reseñaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego" },
  autor: { type: String, required: true },
  texto: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("Reseña", reseñaSchema);
