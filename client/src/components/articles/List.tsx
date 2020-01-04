import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  useTheme,
  createStyles
} from '@material-ui/core';

import { State } from '../../store';
import Article from '../../../../types/Article';

import {
  DRAWER_WIDTH,
  ARTICLE_LIST_WIDTH,
  APPBAR_HEIGHT,
  APPBAR_HEIGHT_MOBILE
} from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      [theme.breakpoints.down('md')]: {
        width: '100%'
      },
      [theme.breakpoints.up('md')]: {
        width: ARTICLE_LIST_WIDTH
      },
      [theme.breakpoints.down('sm')]: {
        top: APPBAR_HEIGHT_MOBILE,
        height: `calc(100vh - ${APPBAR_HEIGHT_MOBILE}px)`
      },
      [theme.breakpoints.up('sm')]: {
        top: APPBAR_HEIGHT,
        height: `calc(100vh - ${APPBAR_HEIGHT}px)`
      }
    },
    drawerPaperShift: {
      left: DRAWER_WIDTH,
      transition: theme.transitions.create(['left'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      })
    },
    markedAsRead: {
      opacity: .5
    },
    pubDate: {
      display: 'block',
      fontSize: '.9em',
      opacity: .7
    },
    toolbar: theme.mixins.toolbar
  })
);

const formatPubDate = (date: Date): string => new Date(date).toLocaleString('en-GB', {
  day : 'numeric',
  month : 'short',
  year : 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});

const ArticlesList: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const articles = useSelector((state: State) => state.article.articles) as Article[];
  const foldersDrawerOpen = useSelector((state: State) => state.folder.drawerOpen);
  const [mobileListOpen, setMobileListOpen] = useState<boolean>(false);

  return (<>
      <Drawer
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerPaperShift]: foldersDrawerOpen
          })
        }}
        variant='permanent'
        open
      >
        <List>
          {articles.map((article) => (
            <span
              key={article.id}
              className={clsx({
                [classes.markedAsRead]: article.read
              })}
            >
              <ListItem button>
                <ListItemText
                  primary={article.title}
                  secondary={<>
                    <span className={classes.pubDate}>
                      {formatPubDate(article.pubDate)}
                    </span>
                    {article.contentSnippet.substring(0, 75)}
                  </>}
                />
              </ListItem>
            </span>
          ))}
        </List>
      </Drawer>
  </>);
}

export default ArticlesList;
