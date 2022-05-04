import { jest } from "@jest/globals";
import app from "../src/app.js";
import supertest from "supertest";
import * as cardService from "../src/services/cardService.js";
import * as companyService from "../src/services/companyService.js";
import * as employeeService from "../src/services/employeeService.js";
import * as cardRepository from "../src/repositories/cardRepository.js";
import faker from "@faker-js/faker";
import { connection } from "../src/database.js";
import createCard from "./factories/createCard.js";

beforeAll(async () => {
  await connection.query(`TRUNCATE TABLE companies CASCADE`);
});

afterAll(async () => {
  await connection.end();
});

describe("create", () => {
  it("should create new card and return status code 201", async () => {
    const { apiKey, body } = await createCard();

    const result = await supertest(app)
      .post("/cards")
      .send(body)
      .set({ "x-api-key": apiKey });

    expect(result.status).toEqual(201);
  });

  test(" ", async () => {
    jest
      .spyOn(cardRepository, "findById")
      .mockRejectedValue({ type: "not_found" });

    const result = await cardService.getById(1);

    expect(result.status).toEqual(404);
  });
});
