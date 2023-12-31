import { NextFunction, Request, Response, Router } from "express";
import { CarService } from "../Service/CarService";
import { plainToInstance } from "class-transformer";
import { CreateCarDto } from "../Dto/CreateCarDto";
import { validate, ValidationError } from "class-validator";
import { ValidationHttpError } from "../Infrastructure/Error/ValidationHttpError";
import { CarsFilter } from "../Dto/CarsFilter";

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
      const filter = new CarsFilter(req.query.sortBy as string);
      const cars = await this.carService.getCars(filter);
      res.send(cars);
    } catch (error) {
      next(error);
    }
  }

  public createCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(CreateCarDto, req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints || [])).join(', ');
        next(new ValidationHttpError(message));
        return;
      }

      const car = await this.carService.createCar(req.body);
      res.send(car);
    } catch (error) {
      next(error);
    }
  }

  public deleteCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.carService.deleteCar(req.params.id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}