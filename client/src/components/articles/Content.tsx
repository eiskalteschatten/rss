import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Container,
  Typography,
  Toolbar,
  Button,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import MarkunreadIcon from '@material-ui/icons/Markunread';

import { State, dispatch } from '../../store';
import { articleMarkReadUnread } from '../../store/actions/articleActions';

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
  const [selectedArticle, setSelectedArticle] = useState<Article>();

  useEffect(() => {
    setSelectedArticle(articles[selectedArticleIndex]);
  }, [selectedArticleIndex, articles]);

  if (!selectedArticle) {
    return <div />;
  }

  const handleMarkReadUnread = (read: boolean) => dispatch(articleMarkReadUnread(selectedArticle.id, read));

  return (<Container fixed>
    <Toolbar disableGutters>
      {selectedArticle.read ? (
        <Button startIcon={<MarkunreadIcon />} onClick={() => handleMarkReadUnread(false)}>
          Mark as Unread
        </Button>
      ) : (
        <Button startIcon={<MarkunreadIcon />}  onClick={() => handleMarkReadUnread(true)}>
          Mark as Read
        </Button>
      )}
    </Toolbar>

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
        {selectedArticle.feed && selectedArticle.feed.name}
      </div>
    </a>

    <div
      className={classes.content}
      dangerouslySetInnerHTML={{__html: selectedArticle.content}}
    />
  </Container>);
}

export default ArticleContent;
