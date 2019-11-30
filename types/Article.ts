export default interface Article {
  id: number;
  title: string;
  link: string;
  pubDate: Date;
  author: string;
  description: string;
  content: string;
  read: boolean;
  markedAsRead: Date;
  fkFeed: number;
  createdAt: Date;
  updatedAt: Date;
} // eslint-disable-line semi
