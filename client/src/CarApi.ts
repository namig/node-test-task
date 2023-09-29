import axios, { AxiosInstance } from "axios";
import process from "process";

export class CarApi {
  _axios: AxiosInstance = axios.create({
    baseURL: process.env.API_URL
  });

  getCars = async (): Promise<any> => {
    const response = await this._axios.get('/api/cars');
    return response.data;
  }

  deleteCar = async (id: string): Promise<void> => {
    await this._axios.delete(`/api/cars/${id}`);
  }
}