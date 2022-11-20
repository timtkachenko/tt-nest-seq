import { Sequelize } from 'sequelize-typescript';
import * as Path from 'path';

const rootDir = Path.resolve(__dirname + '/../');
const models = [
  `${rootDir}/**/models/*{.ts,.js}`,
  `${rootDir}/**/*{model.ts,model.js}`,
];

export const sequelize = new Sequelize({
  logging: true,
  dialect: 'sqlite',
  storage: './database.sqlite3',
  models,
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf('.model')) === member.toLowerCase()
    );
  },
});
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      await sequelize.sync();
      return sequelize;
    },
  },
];
