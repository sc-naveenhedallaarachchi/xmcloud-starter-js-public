import { Field, LinkField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export interface TopicListingParams {
  backgroundTheme: string;
  [key: string]: any;  
}

export interface TopicListingFields {
  data: {
    datasource: {
      title: { jsonValue: Field<string> };
      children?: {
        results: TopicItemProps[];
      };
    };
  };
}

export interface TopicListingProps extends ComponentProps {
  params: TopicListingParams;
  fields: TopicListingFields;
}

export type TopicItemProps = {
  link?: {
    jsonValue?: LinkField;
  };
};
