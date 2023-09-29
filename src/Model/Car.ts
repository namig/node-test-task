import { ICar } from "../Entity/CarEntity";

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

  public static fromEntity(entity: ICar): Car {
    return new Car(entity._id, entity.name, entity.year, entity.price, entity.brand);
  }

  public static fromEntities(entities: ICar[]): Car[] {
    return entities.map(entity => Car.fromEntity(entity));
  }
}