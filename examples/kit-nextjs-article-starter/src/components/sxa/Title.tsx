import { Text, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import React, { JSX } from 'react';

interface Fields {
  data: {
    datasource: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          metadata?: { [key: string]: unknown };
        };
      };
    };
    contextItem: {
      url: {
        path: string;
        siteName: string;
      };
      field: {
        jsonValue: {
          value: string;
          metadata?: { [key: string]: unknown };
        };
      };
    };
  };
}

type TitleProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: TitleProps): JSX.Element => {
  const { page } = useSitecore();
  const datasource = props.fields?.data?.datasource || props.fields?.data?.contextItem;
  // Use the route's Title field for proper editing support with chrometype="field"
  const titleField: TextField = page.layout.sitecore.route?.fields?.Title as TextField;
  console.log('Title text', datasource);
  console.log('title fields', page.layout.sitecore.route?.fields);
  const text: TextField = titleField || datasource?.field?.jsonValue;
  const isPageEditing = Boolean(page.mode.isEditing);
  const modifyTitleProps = {
    ...text,
    value: text?.value || 'Add Title',
  };

  if (!page.mode.isNormal) {
    return (
      <div
        className={`component title ${props.params.styles}`}
        id={props.params.RenderingIdentifier}
      >
        <div className="component-content">
          <Text
            tag={props.params.tag}
            field={modifyTitleProps}
            editable={isPageEditing}
            className="field-title"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`component title ${props.params.styles}`} id={props.params.RenderingIdentifier}>
      <div className="component-content">
        {page.mode.isEditing ? (
          <Text
            tag={props.params.tag}
            field={modifyTitleProps}
            editable={isPageEditing}
            className="field-title"
          />
        ) : (
          <Text tag={props.params.tag} field={text} className="field-title" />
        )}
      </div>
    </div>
  );
};
