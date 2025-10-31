import express from "express";
import cors from "cors";
import path from "path";
import productsRoutes from "./routes/products";
import cartRoutes from "./routes/cart";
import "dotenv/config"

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.json({ ok: true }));

app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/assets", express.static(path.resolve(__dirname, "assets")));

app.use((_req, res) => res.status(404).json({ message: "Not found" }));

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = Number(4000);
const HOST = process.env.HOST ?? "0.0.0.0";

const server = app.listen(PORT, HOST, () => {
  console.log("✅ API Rodando:", server.address());
});

server.on("error", (err: any) => {
  console.error("❌ Erro no listen:", err.code, err.message);
});
