import faker from "@faker-js/faker";
import { connection } from "../../src/database.js";

export default async function createCard() {
  const dataCompanie = {
    name: faker.lorem.words(2),
    apiKey: Number(faker.random.alphaNumeric(8)),
  };

  const companie = await connection.query(
    `INSERT INTO companies (name, "apiKey") VALUES ($1, $2) RETURNING id`,
    [dataCompanie.name, dataCompanie.apiKey]
  );

  const dataEmployee = {
    fullName: faker.lorem.words(2),
    cpf: faker.random.alphaNumeric(8),
    email: faker.internet.email(),
    companyId: companie.rows[0].id,
  };

  const employee = await connection.query(
    `INSERT INTO employees ("fullName", cpf, email, "companyId") 
    VALUES ($1, $2, $3, $4) RETURNING id`,
    [
      dataEmployee.fullName,
      dataEmployee.cpf,
      dataEmployee.email,
      dataEmployee.companyId,
    ]
  );

  const body = {
    employeeId: employee.rows[0].id,
    type: "education",
  };

  return { apiKey: dataCompanie.apiKey, body };
}
