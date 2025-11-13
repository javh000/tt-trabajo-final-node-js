import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

const corsConfig = {
  origin: ["http://localhost", "http://127.0.0.1:5500"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  exposedHeaders: ["Content-Length"],
  maxAge: 600,
  optionsSuccessStatus: 204,
};

app.use(express.json());
app.use(cors(corsConfig));

app.get("/", (req, res) => {
  res.json("API Node-JS Express");
});

app.use((req, res, next) => {
  res.status(404).json("Recurso no encontrado");
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
