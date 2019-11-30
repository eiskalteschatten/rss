import cron from 'node-cron';
import config from 'config';

import { refreshAllFeeds } from '../services/feedsService';

export function setupCronjobs(): void {
  // Feed Refresh
  const feedRefreshCron = config.get<string>('feeds.cron');
  console.log('Setting up feed refresh cronjob for', feedRefreshCron);
  cron.schedule(feedRefreshCron, refreshAllFeeds);
}

export default setupCronjobs;
