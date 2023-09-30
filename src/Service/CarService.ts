import { CreateCarDto } from "../Dto/CreateCarDto";
import { CarEntity } from "../Entity/CarEntity";
import { Car } from "../Model/Car";
import { NotFoundError } from "../Infrastructure/Error/NotFoundError";
import * as mongoose from "mongoose";
import { ValidationHttpError } from "../Infrastructure/Error/ValidationHttpError";

export class CarService {
  public getCars = async (): Promise<Car[]> => {
    return Car.fromEntities(await CarEntity.find());
  }

  public createCar = async (dto: CreateCarDto): Promise<Car> => {
    const car = new CarEntity({
      name: dto.name,
      year: dto.year,
      price: dto.price,
      brand: dto.brand,
    });
    const created = await car.save();
    return Car.fromEntity(created);
  }

  public deleteCar = async (id: string): Promise<void> => {
    try {
      const car = await CarEntity.findByIdAndDelete(id);
      if (!car) {
        throw new NotFoundError(`Car with id ${id} not found`);
      }
    } catch (e) {
      if (e instanceof mongoose.Error.CastError) {
        throw new ValidationHttpError(`Invalid id ${id}`);
      }
      throw e;
    }
  }
}
