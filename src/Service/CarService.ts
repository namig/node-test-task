import { CreateCarDto } from "../Dto/CreateCarDto";
import { CarEntity } from "../Entity/CarEntity";
import { Car } from "../Model/Car";
import { NotFoundError } from "../Infrastructure/Error/NotFoundError";

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
    const car = await CarEntity.findByIdAndDelete(id);
    if (!car) {
      throw new NotFoundError(`Car with id ${id} not found`);
    }
  }
}
