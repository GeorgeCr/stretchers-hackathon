// eslint-disable-next-line import/no-unresolved
import supertest from "supertest";
import app from "./app";

const request = supertest(app);

test("should serve a health endpoint", async () => {
  const response = await request.get("/health");
  expect(response.status).toBe(200);
});

test("should serve a ping endpoint", async () => {
  const response = await request.get("/ping");
  expect(response.status).toBe(200);
});

test("should serve an example endpoint", async () => {
  const response = await request.get("/example/test");
  expect(response.body.ok).toBeTruthy();
});

test("should serve the basic react component for the homepage", async () => {
  const response = await request.get("/");
  expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
});
