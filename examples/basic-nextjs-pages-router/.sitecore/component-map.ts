// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as titleprops from 'src/components/title/title.props';
import * as StructuredData from 'src/components/structured-data/StructuredData';
import * as structureddataprops from 'src/components/structured-data/structured-data.props';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as rowsplitterprops from 'src/components/row-splitter/row-splitter.props';
import * as RichText from 'src/components/rich-text/RichText';
import * as richtextprops from 'src/components/rich-text/rich-text.props';
import * as Promo from 'src/components/promo/Promo';
import * as promoprops from 'src/components/promo/promo.props';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder copy/PartialDesignDynamicPlaceholder';
import * as partialdesigndynamicplaceholderprops from 'src/components/partial-design-dynamic-placeholder copy/partial-design-dynamic-placeholder.props';
import * as PageContent from 'src/components/page-content/PageContent';
import * as pagecontentprops from 'src/components/page-content/page-content.props';
import * as Navigation from 'src/components/navigation/Navigation';
import * as navigationprops from 'src/components/navigation/navigation.props';
import * as LinkList from 'src/components/link-list/LinkList';
import * as linklistprops from 'src/components/link-list/link-list.props';
import * as Image from 'src/components/image/Image';
import * as imageprops from 'src/components/image/image.props';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as contentblockprops from 'src/components/content-block/content-block.props';
import * as Container from 'src/components/container/Container';
import * as containerprops from 'src/components/container/container.props';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as columnsplitterprops from 'src/components/column-splitter/column-splitter.props';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['title', { ...titleprops }],
  ['StructuredData', { ...StructuredData }],
  ['structured-data', { ...structureddataprops }],
  ['RowSplitter', { ...RowSplitter }],
  ['row-splitter', { ...rowsplitterprops }],
  ['RichText', { ...RichText }],
  ['rich-text', { ...richtextprops }],
  ['Promo', { ...Promo }],
  ['promo', { ...promoprops }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['partial-design-dynamic-placeholder', { ...partialdesigndynamicplaceholderprops }],
  ['PageContent', { ...PageContent }],
  ['page-content', { ...pagecontentprops }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['navigation', { ...navigationprops }],
  ['LinkList', { ...LinkList }],
  ['link-list', { ...linklistprops }],
  ['Image', { ...Image }],
  ['image', { ...imageprops }],
  ['ContentBlock', { ...ContentBlock, componentType: 'client' }],
  ['content-block', { ...contentblockprops }],
  ['Container', { ...Container }],
  ['container', { ...containerprops }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['column-splitter', { ...columnsplitterprops }],
]);

export default componentMap;
