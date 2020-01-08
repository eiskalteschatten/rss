import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';

import { State, dispatch } from '../../store';

import {
  articleOpenMobileDialog,
  articleSetSelectedIndex,
  articleMarkReadUnread
} from '../../store/actions/articleActions';

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
      opacity: .6
    },
    metaData: {
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
  const articles = useSelector((state: State) => state.article.articles) as Article[];
  const foldersDrawerOpen = useSelector((state: State) => state.folder.drawerOpen);
  const selectedArticleIndex = useSelector((state: State) => state.article.selectedArticleIndex) as number;
  const [selectedArticleId, setSelectedArticleId] = useState<number>();

  useEffect(() => {
    const article = articles[selectedArticleIndex];
    setSelectedArticleId(article && article.id);
  }, [selectedArticleIndex, articles]);

  useEffect(() => {
    if (selectedArticleId) {
      dispatch(articleMarkReadUnread(selectedArticleId, true));
    }
  }, [selectedArticleId]);

  const handleOpenArticle = async (index: number): Promise<void> => {
    await dispatch(articleSetSelectedIndex(index));
    await dispatch(articleOpenMobileDialog());
  };

  const moveUp = async (): Promise<void> => {
    if (selectedArticleIndex > 0) {
      const newIndex = selectedArticleIndex - 1;
      await dispatch(articleSetSelectedIndex(newIndex));
    }
  };

  const moveDown = async (): Promise<void> => {
    if (selectedArticleIndex < articles.length - 1) {
      const newIndex = selectedArticleIndex + 1;
      await dispatch(articleSetSelectedIndex(newIndex));
    }
  };

  const onKeyPressed = async (e: KeyboardEvent<HTMLUListElement>): Promise<void> => {
    if (e.keyCode === 38) {
      await moveUp();
    }
    else if (e.keyCode === 40) {
      await moveDown();
    }
  };

  return (<Drawer
    classes={{
      paper: clsx(classes.drawerPaper, {
        [classes.drawerPaperShift]: foldersDrawerOpen
      })
    }}
    variant='permanent'
    open
  >
    <List onKeyDown={onKeyPressed}>
      {articles.map((article, index) => (
        <ListItem
          key={article.id}
          button
          onClick={() => handleOpenArticle(index)}
          selected={selectedArticleIndex === index}
          className={clsx({
            [classes.markedAsRead]: article.read
          })}
        >
          {article.feed && article.feed.icon &&
            <ListItemAvatar>
              <Avatar
                src={article.feed.icon}
              />
            </ListItemAvatar>
          }
          <ListItemText
            primary={article.title}
            secondary={<>
              <span className={classes.metaData}>
                {formatPubDate(article.pubDate)}<br />
                {article.feed && article.feed.name}
              </span>
              {article.contentSnippet.substring(0, 75)}
            </>}
          />
        </ListItem>
      ))}
    </List>
  </Drawer>);
}

export default ArticlesList;
