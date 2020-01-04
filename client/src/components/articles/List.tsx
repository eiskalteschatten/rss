import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import { State } from '../../store';
import Article from '../../../../types/Article';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    markedAsRead: {
      opacity: .5
    },
    pubDate: {
      fontSize: '.9em',
      opacity: .7
    }
  })
);

function formatPubDate(date: Date): string {
  const formatedDate = new Date(date).toLocaleString('en-GB', {
    day : 'numeric',
    month : 'short',
    year : 'numeric',
    hour: '2-digit',
	  minute: '2-digit'
  });

  return formatedDate;
}

const ArticlesList: React.FC = () => {
  const classes = useStyles();
  const articles = useSelector((state: State) => state.article.articles) as Article[];

  return (<List>
    {articles.map((article) => (
      <span
          key={article.id}
        className={clsx({
          [classes.markedAsRead]: article.read
        })}
      >
        <ListItem button>
          <ListItemText
            primary={article.title}
            secondary={<React.Fragment>
              <div className={classes.pubDate}>
                {formatPubDate(article.pubDate)}
              </div>
              {article.contentSnippet.substring(0, 75)}
            </React.Fragment>}
          />
        </ListItem>
      </span>
    ))}
  </List>);
}

export default ArticlesList;
