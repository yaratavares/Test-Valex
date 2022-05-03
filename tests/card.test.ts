import app from "../src/app.js";
import supertest from "supertest";
import * as cardService from "../src/services/cardService.js";
import * as companyService from "../src/services/companyService.js";
import * as employeeService from "../src/services/employeeService.js";
import * as cardRepository from "../src/repositories/cardRepository.js";
import faker from "@faker-js/faker";

describe("create", () => {
  test("should create new card", async () => {
    jest.spyOn(companyService, "validateApiKeyOrFail").mockResolvedValue();
    jest.spyOn(employeeService, "getById").mockResolvedValue({
      id: 1,
      fullName: faker.lorem.words(2),
      cpf: faker.random.alphaNumeric(8),
      email: faker.internet.email(),
      companyId: 2,
    });
    jest
      .spyOn(cardRepository, "findByTypeAndEmployeeId")
      .mockResolvedValueOnce();

    const result = await cardService.create("123", 2, "education");

    expect(result.length > 0).toBeTruthy();
  });
});
