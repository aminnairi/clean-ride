import type { AppointmentRepository } from "../../../application/repositories/AppointmentRepository.ts";
import type { AppointmentEntity } from "../../../domain/entities/AppointmentEntity.ts";

export class AppointmentRepositoryInMemory implements AppointmentRepository {
  public constructor(private readonly appointments: AppointmentEntity[]) {}

  public async save(appointment: AppointmentEntity): Promise<void> {
    this.appointments.push(appointment);
  }

  public async all(): Promise<AppointmentEntity[]> {
    return this.appointments;
  }
}
