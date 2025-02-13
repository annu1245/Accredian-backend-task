import express from "express";
import referralRoutes from "./src/routes/referralRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", referralRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});