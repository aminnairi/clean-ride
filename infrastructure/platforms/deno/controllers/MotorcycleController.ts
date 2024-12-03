import type { MotorcycleRepository } from "../../../../application/repositories/MotorcycleRepository.ts";
import { ListMotorcyclesUsecase } from "../../../../application/usecases/ListMotorcyclesUsecase.ts";
import { CreateMotorcycleUsecase } from "../../../../application/usecases/CreateMotorcycleUsecase.ts";
import { z } from "npm:zod";
import { exhaustive } from "npm:exhaustive";

const requestSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.number(),
});

export class MotorcycleController {
  public constructor(private readonly motorcycleRepository: MotorcycleRepository) {}

  public async listMotorcycles(request: Request): Promise<Response> {
    const listMotorcyclesUsecase = new ListMotorcyclesUsecase(this.motorcycleRepository);
    const motorcycles = await listMotorcyclesUsecase.execute();

    return new Response(JSON.stringify(motorcycles), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async createMotorcycle(request: Request): Promise<Response> {
    const createMotorcycleUsecase = new CreateMotorcycleUsecase(this.motorcycleRepository);
    const body = await request.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return new Response("Malformed request", {
        status: 400,
      });
    }

    const { brand, model, year } = validation.data;
    const error = await createMotorcycleUsecase.execute(brand, model, year);

    if (!error) {
      return new Response(null, {
        status: 201,
      });
    }

    return exhaustive(error.name, {
      BrandLengthTooShortError: () => new Response("BrandLengthTooShortError", { status: 400 }),
      ModelLengthTooShortError: () => new Response("ModelLengthTooShortError", { status: 400 }),
    });
  }
}