import { Sequelize } from "sequelize";
import { config } from "../config/index.js";

export const sequelize = new Sequelize(config.dbUrl, { logging: false });
