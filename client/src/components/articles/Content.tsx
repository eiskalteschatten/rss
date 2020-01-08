import React from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import { State } from '../../store';
import Article from '../../../../types/Article';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    articleTitleLink: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        padding: 15,
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        },
        '&:active': {
          backgroundColor: 'rgba(255, 255, 255, 0.05)'
        }
      }
    },
    metaData: {
      fontSize: '.9em',
      opacity: .7,
      marginTop: 10
    },
    content: {
      marginTop: 35,
      [theme.breakpoints.up('sm')]: {
        padding: 15
      }
    }
  })
);

const formatPubDate = (date: Date): string => new Date(date).toLocaleString('en-GB', {
  day : 'numeric',
  month : 'long',
  year : 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

const ArticleContent: React.FC = () => {
  const classes = useStyles();
  const selectedArticleIndex = useSelector((state: State) => state.article.selectedArticleIndex) as number;
  const articles = useSelector((state: State) => state.article.articles) as Article[];

  if (selectedArticleIndex === undefined || selectedArticleIndex === null) {
    return <div />;
  }

  const selectedArticle = articles[selectedArticleIndex];

  return (<Container fixed>
    <a
      href={selectedArticle.link}
      target='_blank'
      className={classes.articleTitleLink}
      rel='noopener noreferrer'
    >
      <Typography variant='h3'>
        {selectedArticle.title}
      </Typography>

      <div className={classes.metaData}>
        {formatPubDate(selectedArticle.pubDate)}<br />
        {selectedArticle.feed.name}
      </div>
    </a>

    <div
      className={classes.content}
      dangerouslySetInnerHTML={{__html: selectedArticle.content}}
    />
  </Container>);
}

export default ArticleContent;
