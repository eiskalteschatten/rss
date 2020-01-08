import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  AppBar as AppBarMu,
  Toolbar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import MarkunreadOutlinedIcon from '@material-ui/icons/MarkunreadOutlined';

import { dispatch, State } from '../store';
import { folderOpenDrawer, folderCloseDrawer } from '../store/actions/folderActions';
import { articleRefreshAndGetAllUnread, articleMarkAllRead } from '../store/actions/articleActions';

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
    },
    appBarFiller: {
      flex: 1
    }
  })
);

const AppBar: React.FC = () => {
  const classes = useStyles();
  const drawerOpen = useSelector((state: State) => state.folder.drawerOpen);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  const handleConfirmDialogClose = () => setConfirmDialogOpen(false);

  const handleMarkAllAsRead = () => {
    handleConfirmDialogClose();;
    dispatch(articleMarkAllRead());
  };

  const ConfirmDialog: React.FC = () => {
    return (<Dialog
      open={confirmDialogOpen}
      onClose={handleConfirmDialogClose}
    >
      <DialogTitle>{'Are you sure?'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to mark all articles as read?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleMarkAllAsRead} color='secondary'>
          Yes
        </Button>
        <Button onClick={handleConfirmDialogClose} color='secondary' autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>);
  };

  return (<AppBarMu
    position='fixed'
    className={clsx(classes.appBar, {
      [classes.appBarShift]: drawerOpen
    })}
  >
    <Toolbar>
      <IconButton
        onClick={() => drawerOpen ? dispatch(folderCloseDrawer()) : dispatch(folderOpenDrawer())}
        edge='start'
      >
        <MenuIcon />
      </IconButton>
      <Typography variant='h6' noWrap>
        RSS
      </Typography>

      <div className={classes.appBarFiller} />

      <IconButton onClick={() => dispatch(articleRefreshAndGetAllUnread())}>
        <RefreshIcon />
      </IconButton>
      <IconButton edge='end' onClick={() => setConfirmDialogOpen(true)}>
        <MarkunreadOutlinedIcon />
      </IconButton>
    </Toolbar>
    <ConfirmDialog />
  </AppBarMu>);
}

export default AppBar;
