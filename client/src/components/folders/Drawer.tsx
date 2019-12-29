import React from 'react';
import { useSelector } from 'react-redux';

import {
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  makeStyles,
  Theme,
  useTheme,
  createStyles
} from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderIcon from '@material-ui/icons/Folder';


import { dispatch, State } from '../../store';
import { folderCloseDrawer } from '../../store/actions/folderActions';

import { DRAWER_WIDTH } from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0
    },
    drawerPaper: {
      width: DRAWER_WIDTH
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar
    },
    headerText: {
      flex: 'auto'
    },
    closeButton: {
      justifyContent: 'flex-end'
    }
  })
);

const FoldersDrawer: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const open = useSelector((state: State) => state.folder.drawerOpen);
  const folders = useSelector((state: State) => state.folder.folders);
  const handleDrawerClose = () => dispatch(folderCloseDrawer());

  return (<Drawer
    className={classes.drawer}
    variant='persistent'
    anchor='left'
    open={open}
    classes={{
      paper: classes.drawerPaper
    }}
  >
    <div className={classes.drawerHeader}>
      <Typography variant='h6' noWrap className={classes.headerText}>
        Folders
      </Typography>

      <div className={classes.closeButton}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
        </div>
    </div>

    <Divider />

    <List>
      {folders.map((folder) => (
        <ListItem button key={folder.id}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={folder.name} />
        </ListItem>
      ))}
    </List>
  </Drawer>);
}

export default FoldersDrawer;
