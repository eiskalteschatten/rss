import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core';

import { dispatch } from '../store';
import { articleGetAllUnread } from '../store/actions/articleActions';

import AppBar from './AppBar';
import Drawer from './folders/Drawer';
import ArticlesList from './articles/List';

import { State } from '../store';

import { DRAWER_WIDTH } from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    content: {
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
    reset: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end'
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
      <div className={classes.reset} />

      <ArticlesList />
    </main>
  </div>);
}

export default Main;
