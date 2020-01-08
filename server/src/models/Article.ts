import { Model, DataTypes } from 'sequelize';

import sequelize from '../db';
import ArticleInferface from '../../../types/Article';

import Feed from './Feed';

export class Article extends Model implements ArticleInferface {
  id!: number;
  title: string;
  link: string;
  pubDate: Date;
  creator: string;
  contentSnippet: string;
  content: string;
  guid: string;
  read: boolean;
  markedAsReadAt: Date;
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
    field: 'pub_date',
    set(value: Date | string): void {
      const setValue = typeof value === 'string' ? new Date(value) : value;
      this.setDataValue('pubDate', setValue);
    }
  },
  creator: {
    type: DataTypes.STRING,
    field: 'creator'
  },
  contentSnippet: {
    type: DataTypes.TEXT,
    field: 'content_snippet'
  },
  content: {
    type: DataTypes.TEXT,
    field: 'content'
  },
  guid: {
    type: DataTypes.STRING,
    field: 'guid'
  },
  read: {
    type: DataTypes.BOOLEAN,
    field: 'read'
  },
  markedAsReadAt: {
    type: DataTypes.DATE,
    field: 'marked_as_read_at',
    set(value: Date | string): void {
      const setValue = typeof value === 'string' ? new Date(value) : value;
      this.setDataValue('markedAsReadAt', setValue);
    }
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
