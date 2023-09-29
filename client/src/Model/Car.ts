import { CarDto } from "../Api/Dto/CarDto";

export class Car {
  id: string;
  name: string;
  year: number;
  price: number;
  brand: string;

  constructor(id: string, name: string, year: number, price: number, brand: string) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.price = price;
    this.brand = brand;
  }

  public static fromDto(dto: CarDto): Car {
    return new Car(dto.id, dto.name, dto.year, dto.price, dto.brand);
  }

  public static fromDtos(dtos: CarDto[]): Car[] {
    return dtos.map(dto => Car.fromDto(dto));
  }
}