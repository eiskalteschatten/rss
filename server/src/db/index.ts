import { Sequelize, Options } from 'sequelize';
import config from 'config';
import path from 'path';
import migrateDb from 'sequelize-migration-wrapper';

const dbConfig = config.get<Options>('dbConfig');

// Clone the options because config.get returns an immutable object that doesn't work
const options = Object.assign({}, dbConfig);

const sequelize = new Sequelize(options);
export default sequelize;

migrateDb({
  sequelize,
  path: path.resolve(__dirname, './migrations'),
  filePattern: /\.ts|\.js$/
});

export async function setupSequelize(): Promise<Sequelize> {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    await migrateDb.migrate();

    console.log('Database migration scripts successfully executed.');
  }
  catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  return sequelize;
}
