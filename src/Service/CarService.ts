import { CreateCarDto } from "../Dto/CreateCarDto";
import { CarEntity } from "../Entity/CarEntity";
import { Car } from "../Model/Car";
import { NotFoundError } from "../Infrastructure/Error/NotFoundError";
import * as mongoose from "mongoose";
import { ValidationHttpError } from "../Infrastructure/Error/ValidationHttpError";
import { CarsFilter } from "../Dto/CarsFilter";

export class CarService {
  public getCars = async (filter: CarsFilter): Promise<Car[]> => {
    if (filter.sortBy) {
      const sort: any = { [filter.sortBy]: 1 };
      return Car.fromEntities(await CarEntity.find().sort(sort));
    }

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
