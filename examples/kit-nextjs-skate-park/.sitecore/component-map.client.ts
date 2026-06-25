// Client-safe component map for App Router

import { BYOCClientWrapper, NextjsContentSdkComponent, FEaaSClientWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

import * as UseStateToggleRepro from 'src/components/use-state-toggle-repro/UseStateToggleRepro';
import * as Navigation from 'src/components/navigation/Navigation';
import * as ContentBlock from 'src/components/content-block/ContentBlock';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCClientWrapper],
  ['FEaaSWrapper', FEaaSClientWrapper],
  ['Form', Form],
  ['UseStateToggleRepro', { ...UseStateToggleRepro }],
  ['Navigation', { ...Navigation }],
  ['ContentBlock', { ...ContentBlock }],
]);

export default componentMap;
