import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { dispatch } from '../store';
import { articleGetAllUnread } from '../store/actions/articleActions';

import AppBar from './AppBar';
import Drawer from './folders/Drawer';
import ArticlesList from './articles/List';
import ArticleContent from './articles/Content';

import { State } from '../store';

import {
  DRAWER_WIDTH,
  ARTICLE_LIST_WIDTH,
  APPBAR_HEIGHT,
  APPBAR_HEIGHT_MOBILE
} from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    content: {
      display: 'flex',
      flexGrow: 1,
      // padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: -DRAWER_WIDTH
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    },
    articlesList: {
      flexGrow: 0
    },
    articleContent: {
      alignItems: 'center',
      flexGrow: 1,
      marginLeft: ARTICLE_LIST_WIDTH,
      padding: theme.spacing(0, 1),
      justifyContent: 'flex-end',
      [theme.breakpoints.down('sm')]: {
        marginTop: APPBAR_HEIGHT_MOBILE,
        height: `calc(100vh - ${APPBAR_HEIGHT_MOBILE}px)`
      },
      [theme.breakpoints.up('sm')]: {
        marginTop: APPBAR_HEIGHT,
        height: `calc(100vh - ${APPBAR_HEIGHT}px)`
      }
    }
  })
);

const Main: React.FC = () => {
  const classes = useStyles();
  const open = useSelector((state: State) => state.folder.drawerOpen);

  useEffect(() => {
    dispatch(articleGetAllUnread());
  }, []);

  return (<div className={classes.root}>
    <AppBar />
    <Drawer />
    <main
      className={clsx(classes.content, {
        [classes.contentShift]: open
      })}
    >
      <div className={classes.articlesList}>
        <ArticlesList />
      </div>
      <div className={classes.articleContent}>
        <ArticleContent />
      </div>
    </main>
  </div>);
}

export default Main;
