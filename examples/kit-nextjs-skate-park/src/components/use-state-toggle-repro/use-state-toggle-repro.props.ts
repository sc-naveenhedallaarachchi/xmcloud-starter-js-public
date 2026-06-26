import { Field } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

export type UseStateToggleReproProps = Partial<ComponentProps> & {
  fields: {
    Text?: Field<string>;
  };
};
