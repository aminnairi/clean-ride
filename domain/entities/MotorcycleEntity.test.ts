import { expect } from "jsr:@std/expect";
import { Brand } from "../types/Brand.ts";
import { Model } from "../types/Model.ts";
import { MotorcycleEntity } from "./MotorcycleEntity.ts";

Deno.test("Shoud return a motorcycle entity", () => {
  const brand = Brand.from("Triumph");

  if (brand instanceof Error) {
    throw brand;
  }

  const model = Model.from("Street Triple");

  if (model instanceof Error) {
    throw model;
  }

  const year = 2024;

  const result = MotorcycleEntity.create(brand, model, year);

  expect(result.brand.value).toStrictEqual("Triumph");
  expect(result.model.value).toStrictEqual("Street Triple");
  expect(result.year).toStrictEqual(2024);
});
