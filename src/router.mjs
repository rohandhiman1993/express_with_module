import { Router } from "express";

const router = Router();

router.get("/cache", (req, res) => {
  res.send({ success: "true" });
});

export default router;
