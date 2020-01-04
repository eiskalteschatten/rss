import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { State } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    }
  })
);

const ArticleContent: React.FC = () => {
  const classes = useStyles();

  return (<div className={classes.root}>
    article content
  </div>);
}

export default ArticleContent;
