import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { State } from '../../store';
import Article from '../../../../types/Article';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    }
  })
);

const ArticleContent: React.FC = () => {
  const classes = useStyles();
  const selectedArticleIndex = useSelector((state: State) => state.article.selectedArticleIndex) as number;
  const articles = useSelector((state: State) => state.article.articles) as Article[];

  if (selectedArticleIndex === undefined || selectedArticleIndex === null) {
    return <div />;
  }

  const selectedArticle = articles[selectedArticleIndex];

  return (<div className={classes.root}>
    {selectedArticle.title}
  </div>);
}

export default ArticleContent;
