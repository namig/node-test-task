import express, { Express } from "express";
import { CarService } from "./Service/CarService";
import { CarController } from "./Controller/CarController";
import { connect } from "mongoose";
import { ErrorMiddleware } from "./Infrastructure/ErrorMiddleware";

export class App {
  public app: Express;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;

    this.connectToDatabase();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.initRoutes();
    this.app.use(ErrorMiddleware);
  }

  private initRoutes(): void {
    const carService = new CarService();
    const carController = new CarController(carService);

    this.app.use(carController.initRoutes());
  }

  private async connectToDatabase(): Promise<void> {
    await connect(process.env.MONGO_URL!);
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`);
    });
  }
}