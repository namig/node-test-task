import express, { Express } from "express";
import { CarService } from "./Service/CarService";
import { CarController } from "./Controller/CarController";
import { dbConnection } from "./Database/db";

export class App {
  public app: Express;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.connectToDatabase();
    this.initMiddlewares();
    this.initRoutes();
  }

  initMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initRoutes(): void {
    const carService = new CarService();
    const carController = new CarController(carService);

    this.app.use(carController.initRoutes());
  }

  private async connectToDatabase(): Promise<void> {
    await dbConnection();
  }


  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${this.port}`);
    });
  }
}