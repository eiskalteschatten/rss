import React from 'react';
import { useSelector } from 'react-redux';

import {
  Dialog,
  Slide,
  IconButton,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { TransitionProps } from '@material-ui/core/transitions';

import ArticleContent from './Content';

import { State, dispatch } from '../../store';
import { articleCloseMobileDialog } from '../../store/actions/articleActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    closeButton: {
      position: 'absolute',
      top: theme.spacing(0),
      right: theme.spacing(2),
      zIndex: 10000
    }
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>((props, ref) =>
  <Slide direction='left' ref={ref} {...props} />
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
  >
    <IconButton edge='end' color='inherit' onClick={handleClose} className={classes.closeButton}>
      <CloseIcon />
    </IconButton>

    <ArticleContent />
  </Dialog>);
}

export default ArticleMobileContent;
