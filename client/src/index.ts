#! /usr/bin/env node

import { CarCommand } from "./CarCommand";
import dotenv from "dotenv";

dotenv.config();

const carCommand = new CarCommand();
carCommand.parse();