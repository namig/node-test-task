import { Command } from "commander";
import process from "process";
import inquirer from "inquirer";
import { CreateCarDto } from "./Api/Dto/CreateCarDto";
import { CarApi } from "./Api/CarApi";

export class CarCommand {
  carApi: CarApi;
  program: Command;

  constructor() {
    this.carApi = new CarApi();
    this.program = new Command();

    this.initCommands();
  }

  private list = async (): Promise<void> => {
    try {
      const cars = await this.carApi.getCars();
      this.log(cars);
    } catch (e) {
      this.error(`Something went wrong`);
    }
  }

  private createCar = async () => {
    this.log("Create a new car");

    const answers = await inquirer.prompt([
      { name: 'name', message: 'Enter name of the car:', type: 'input' },
      { name: 'year', message: 'Enter year of car production:', type: 'input' },
      { name: 'price', message: 'Enter car price:', type: 'input' },
      {
        name: 'brand',
        message: 'Select brand',
        type: 'list',
        choices: ['BMW', 'Audi', 'Mercedes', 'Porsche', 'Toyota']
      },
    ]);

    try {
      const dto = new CreateCarDto(answers.name, parseInt(answers.year), parseInt(answers.price), answers.brand);
      const createdCar = await this.carApi.createCar(dto);
      this.log(`Car ${answers.name} created:`);
      this.log(createdCar);
    } catch (e: any) {
      if (e.response?.status === 400) {
        this.error(`Validation error: ${e.response.data.message}`);
      } else {
        this.error(`Something went wrong`);
      }
    }
  }

  private deleteCar = async (id: string): Promise<void> => {
    try {
      await this.carApi.deleteCar(id);
      this.log(`Car with id ${id} deleted`)
    } catch (e: any) {
      this.error(`Car with id ${id} not found`);
    }
  }

  private log(data: any): void {
    console.log(data);
  }

  private error(data: any): void {
    console.error(data);
  }

  initCommands(): void {
    this.program.name('car')
      .description('CLI to manage cars')
      .version('1.0.0');

    this.program
      .command('list')
      .description('List all cars')
      .action(this.list);

    this.program.command('add')
      .description('Add a new car')
      .action(this.createCar);

    this.program.command('delete')
      .description('Delete car by id')
      .argument('<id>', 'Car id')
      .action(this.deleteCar);
  }

  parse(): void {
    this.program.parse(process.argv);
  }
}