import { CreateCarDto } from "../Dto/CreateCarDto";
import { CarModel } from "../Database/CarModel";

export class CarService {

  public getCars = async () => {
    const cars = await CarModel.find();
    return cars;
  }

  public createCar = async (dto: CreateCarDto) => {
    const car = new CarModel({
      name: dto.name,
      year: dto.year,
      price: dto.price,
      brandId: dto.brandId,
    });
    return await car.save();
  }

  public deleteCar = async (id: string) => {
    const car = await CarModel.findByIdAndDelete(id);
    return car;
  }

}
