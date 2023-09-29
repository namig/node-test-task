import { CarApi } from "./CarApi";
import { Command } from "commander";
import process from "process";
import inquirer from "inquirer";

export class CarCommand {
  carApi: CarApi;
  program: Command;

  constructor() {
    this.carApi = new CarApi();
    this.program = new Command();

    this.initCommands();
  }

  private list = async (): Promise<void> => {
    const cars = await this.carApi.getCars();
    this.log(cars);
  }

  private createCar = async () => {
    console.log("Create a new car");

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
    console.log(answers);
  }


  private deleteCar = async (id: string): Promise<void> => {
    await this.carApi.deleteCar(id);
    this.log(`Car with id ${id} deleted`)
  }

  private log(data: any): void {
    console.log(data);
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