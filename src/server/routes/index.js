import { Router } from "express";

const testRouter = new Router();

testRouter.get("/test", (req, res) => {
  res.send({ ok: true });
});

export default testRouter;
