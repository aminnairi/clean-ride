import { expect } from "jsr:@std/expect";
import { Brand } from "../types/Brand.ts";
import { Model } from "../types/Model.ts";
import { AppointmentEntity } from "./AppointmentEntity.ts";
import { AppointmentDate } from "../types/AppointmentDate.ts";
import { MotorcycleEntity } from "./MotorcycleEntity.ts";

Deno.test("Shoud return an appointment entity", () => {
  const date = AppointmentDate.from(new Date(2030, 1, 1));

  if (date instanceof Error) {
    throw date;
  }

  const brand = Brand.from("Triumph");

  if (brand instanceof Error) {
    throw brand;
  }

  const model = Model.from("Street Triple");

  if (model instanceof Error) {
    throw model;
  }

  const year = 2024;

  const motorcycle = MotorcycleEntity.create(brand, model, year);
  const result = AppointmentEntity.create(date, motorcycle);

  expect(result.motorcycle.brand.value).toStrictEqual("Triumph");
  expect(result.motorcycle.model.value).toStrictEqual("Street Triple");
  expect(result.motorcycle.year).toStrictEqual(2024);
  expect(result.date.value.toISOString()).toStrictEqual(new Date(2030, 1, 1).toISOString());
});
