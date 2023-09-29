import { NextFunction, Request, Response, Router } from "express";
import { CarService } from "../Service/CarService";

export class CarController {
  constructor(private carService: CarService) {
  }

  initRoutes(): Router {
    const router = Router();
    router.get('/api/cars', this.getCars);
    router.post('/api/cars', this.createCar);
    router.delete('/api/cars/:id', this.deleteCar);
    return router;
  }

  public getCars = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cars = await this.carService.getCars();
      res.send(cars);
    } catch (error) {
      next(error);
    }
  }

  public createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const car = await this.carService.createCar(req.body);
      res.send(car);
    } catch (error) {
      next(error);
    }
  }

  public deleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.carService.deleteCar(req.params.id);
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
}