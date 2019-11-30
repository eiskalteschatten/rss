import { Model, DataTypes } from 'sequelize';

import sequelize from '../db';

export class Folder extends Model {
  id!: number;
  name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Folder.init({
  name: {
    type: DataTypes.STRING,
    field: 'name'
  }
}, {
  sequelize,
  modelName: 'folder'
});

Folder.sync();

export default Folder;
