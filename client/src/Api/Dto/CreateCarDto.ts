export class CreateCarDto {
  name: string;
  year: number;
  price: number;
  brand: string;

  constructor(name: string, year: number, price: number, brand: string) {
    this.name = name;
    this.year = year;
    this.price = price;
    this.brand = brand;
  }
}