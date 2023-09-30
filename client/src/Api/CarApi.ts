import axios, { AxiosInstance } from "axios";
import process from "process";
import { Car } from "../Model/Car";
import { CarDto } from "./Dto/CarDto";
import { CreateCarDto } from "./Dto/CreateCarDto";

export class CarApi {
  _axios: AxiosInstance = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:8000',
  });

  getCars = async (): Promise<any> => {
    const response = await this._axios.get('/api/cars');
    return Car.fromDtos(response.data as CarDto[]);
  }

  createCar = async (dto: CreateCarDto): Promise<Car> => {
    const response = await this._axios.post('/api/cars', dto);
    return Car.fromDto(response.data as CarDto);
  }

  deleteCar = async (id: string): Promise<void> => {
    await this._axios.delete(`/api/cars/${id}`);
  }
}