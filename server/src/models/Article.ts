import { Model, DataTypes } from 'sequelize';

import sequelize from '../db';
import Feed from './Feed';

export class Article extends Model {
  id!: number;
  title: string;
  link: string;
  pubDate: Date;
  author: string;
  description: string;
  content: string;
  read: boolean;
  markedAsRead: Date;
  fkFeed: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

Article.init({
  title: {
    type: DataTypes.STRING,
    field: 'title'
  },
  link: {
    type: DataTypes.STRING,
    field: 'link'
  },
  pubDate: {
    type: DataTypes.DATE,
    field: 'pub_date'
  },
  author: {
    type: DataTypes.STRING,
    field: 'author'
  },
  description: {
    type: DataTypes.STRING,
    field: 'description'
  },
  content: {
    type: DataTypes.TEXT,
    field: 'content'
  },
  read: {
    type: DataTypes.BOOLEAN,
    field: 'read'
  },
  markedAsRead: {
    type: DataTypes.DATE,
    field: 'marked_as_read'
  },
  fkFeed: {
    type: DataTypes.INTEGER,
    field: 'fk_feed'
  }
}, {
  sequelize,
  modelName: 'article'
});

Article.belongsTo(Feed, {
  as: 'feed',
  foreignKey: 'fkFeed',
  targetKey: 'id'
});

Article.sync();

export default Article;
