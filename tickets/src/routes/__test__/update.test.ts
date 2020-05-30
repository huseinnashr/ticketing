import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "sdsdas", price: 200 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "sdsdas", price: 200 })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const reponse = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "sdasada", price: 20 });

  await request(app)
    .put(`/api/tickets/${reponse.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "sdaascasca", price: 100 })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "sdasada", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "asdsadas", price: -10 })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "sdasada", price: 20 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "new title", price: 100 })
    .expect(200);

  const ticketReponse = await request(app).get(
    `/api/tickets/${response.body.id}`
  );

  expect(ticketReponse.body.title).toEqual("new title");
  expect(ticketReponse.body.price).toEqual(100);
});
