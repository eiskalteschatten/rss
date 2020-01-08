import React from 'react';
import { useSelector } from 'react-redux';

import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';

import { TransitionProps } from '@material-ui/core/transitions';

import { State, dispatch } from '../../store';
import { articleCloseMobileDialog } from '../../store/actions/articleActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    appBar: {
      position: 'relative'
    },
    appBarFiller: {
      flex: 1
    },
    content: {
      padding: theme.spacing(3)
    }
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) =>
  <Slide direction='up' ref={ref} {...props} />
);

const ArticleMobileContent: React.FC = () => {
  const classes = useStyles();
  const open = useSelector((state: State) => state.article.mobileDialogOpen);

  const handleClose = () => dispatch(articleCloseMobileDialog());

  return (<Dialog
    fullScreen
    open={open}
    TransitionComponent={Transition}
    onClose={handleClose}
    className={classes.root}
  >
    <AppBar className={classes.appBar} color='secondary'>
      <Toolbar>
        <div className={classes.appBarFiller} />
        <IconButton edge='end' color='inherit' onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>

    <div className={classes.content}>
      article content
    </div>
  </Dialog>);
}

export default ArticleMobileContent;
