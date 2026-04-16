import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  defineProxy,
  MultisiteProxy,
  PersonalizeProxy,
  RedirectsProxy,
} from '@sitecore-content-sdk/nextjs/proxy';
import sites from '.sitecore/sites.json';
import scConfig from 'sitecore.config';

export function proxy(req: NextRequest) {
  // If no Edge server contextId, skip Edge proxies entirely.
  // (SSR/API can still use Local creds; no crash in Edge runtime.)
  if (!scConfig.api?.edge?.contextId) {
    return NextResponse.next();
  }

  const multisite = new MultisiteProxy({
    sites,
    ...scConfig.api.edge,
    ...scConfig.multisite,
    skip: () => false,
  });

  const redirects = new RedirectsProxy({
    sites,
    ...scConfig.api.edge,
    ...scConfig.redirects,
    skip: () => false,
  });

  const personalize = new PersonalizeProxy({
    sites,
    ...scConfig.api.edge,
    ...scConfig.personalize,
    skip: () => false,
  });

  return defineProxy(multisite, redirects, personalize).exec(req);
}

export const config = {
  matcher: [
    '/',
    '/((?!api/|_next/|healthz|sitecore/api/|-/|favicon.ico|sc_logo.svg|sitemap|robots|llms).*)',
  ],
};
