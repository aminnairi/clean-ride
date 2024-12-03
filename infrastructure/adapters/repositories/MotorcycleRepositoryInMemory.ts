import type { MotorcycleRepository } from "../../../application/repositories/MotorcycleRepository.ts";
import type { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity.ts";

export class MotorcycleRepositoryInMemory implements MotorcycleRepository {
  public constructor(public readonly motorcycles: MotorcycleEntity[]) {}

  public async save(motorcycle: MotorcycleEntity): Promise<void> {
    this.motorcycles.push(motorcycle);
  }

  public async all(): Promise<MotorcycleEntity[]> {
    return this.motorcycles;
  }

  public async findOneById(id: string): Promise<MotorcycleEntity | null> {
    return this.motorcycles.find((motorcycle) =>
      motorcycle.identifier === id
    ) ?? null;
  }
}
