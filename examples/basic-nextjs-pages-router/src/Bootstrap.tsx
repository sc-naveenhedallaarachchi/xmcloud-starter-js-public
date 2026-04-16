'use client';
import { useEffect, JSX } from 'react';
import { initContentSdk } from '@sitecore-content-sdk/core';
import { analyticsBrowserAdapter, analyticsPlugin } from '@sitecore-content-sdk/analytics-core';
import { eventsPlugin } from '@sitecore-content-sdk/events';
import config from 'sitecore.config';

const Bootstrap = ({
  siteName,
  isPreviewMode,
}: {
  siteName: string;
  isPreviewMode: boolean;
}): JSX.Element | null => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.debug('Browser Events SDK is not initialized in development environment');
      return;
    }

    if (isPreviewMode) {
      console.debug('Browser Events SDK is not initialized in edit and preview modes');
      return;
    }

    const clientContextId = config.api.edge?.clientContextId;
    if (!clientContextId) {
      console.error('Client Edge API settings missing from configuration');
      return;
    }

    void initContentSdk({
      config: {
        contextId: clientContextId,
        edgeUrl: config.api.edge?.edgeUrl,
        siteName: siteName || config.defaultSite,
      },
      plugins: [
        analyticsPlugin({
          adapter: analyticsBrowserAdapter(),
          options: {
            enableCookie: true,
            cookieDomain: window.location.hostname.replace(/^www\./, ''),
          },
        }),
        eventsPlugin(),
      ],
    });
  }, [siteName, isPreviewMode]);

  return null;
};

export default Bootstrap;
