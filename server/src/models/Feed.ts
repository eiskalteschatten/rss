import { Model, DataTypes } from 'sequelize';

import sequelize from '../db';
import Folder from './Folder';

export class Feed extends Model {
  id!: number;
  name: string;
  feedUrl: string;
  link: string;
  fkFolder: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Feed.init({
  name: {
    type: DataTypes.STRING,
    field: 'name'
  },
  feedUrl: {
    type: DataTypes.STRING,
    field: 'feed_url'
  },
  link: {
    type: DataTypes.STRING,
    field: 'link'
  },
  fkFolder: {
    type: DataTypes.INTEGER,
    field: 'fk_folder'
  }
}, {
  sequelize,
  modelName: 'feed'
});

Feed.belongsTo(Folder, {
  as: 'folder',
  foreignKey: 'fkFolder',
  targetKey: 'id'
});

Feed.sync();

export default Feed;
