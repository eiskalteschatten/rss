import React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  AppBar as AppBarMu,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

import { dispatch, State } from '../store';
import { folderOpenDrawer, folderCloseDrawer } from '../store/actions/folderActions';

import { DRAWER_WIDTH } from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })
    }
  })
);

const AppBar: React.FC = () => {
  const classes = useStyles();
  const drawerOpen = useSelector((state: State) => state.folder.drawerOpen);

  return (<AppBarMu
    position='fixed'
    className={clsx(classes.appBar, {
      [classes.appBarShift]: drawerOpen
    })}
  >
    <Toolbar>
      <IconButton
        color='inherit'
        onClick={() => drawerOpen ? dispatch(folderCloseDrawer()) : dispatch(folderOpenDrawer())}
        edge='start'
        // className={clsx(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap>
        RSS
      </Typography>
    </Toolbar>
  </AppBarMu>);
}

export default AppBar;
