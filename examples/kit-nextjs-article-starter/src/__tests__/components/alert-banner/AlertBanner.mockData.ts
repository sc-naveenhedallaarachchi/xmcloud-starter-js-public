import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

// Mock fields data
export const mockTitleField: Field<string> = {
  value: 'Important Announcement',
  editable: 'Important Announcement',
};

export const mockDescriptionField: Field<string> = {
  value: 'Please read this important message carefully',
  editable: 'Please read this important message carefully',
};

export const mockImageField: ImageField = {
  value: {
    src: '/test-alert-image.jpg',
    alt: 'Alert Image',
    width: 100,
    height: 100,
  },
  editable: 'Alert Image',
};

export const mockLinkField: LinkField = {
  value: {
    href: '/learn-more',
    text: 'Learn More',
    title: 'Learn More',
    target: '',
    linktype: 'internal',
  },
};

export const mockLinkFieldEmpty: LinkField = {
  value: {
    href: '',
    text: '',
    title: '',
    target: '',
    linktype: '',
  },
};

export const mockFields = {
  title: mockTitleField,
  description: mockDescriptionField,
  image: mockImageField,
  link: mockLinkField,
};

export const mockFieldsWithoutLink = {
  title: mockTitleField,
  description: mockDescriptionField,
  image: mockImageField,
};

export const mockFieldsWithoutImage = {
  title: mockTitleField,
  description: mockDescriptionField,
  link: mockLinkField,
};

export const mockFieldsWithEmptyLink = {
  title: mockTitleField,
  description: mockDescriptionField,
  link: mockLinkFieldEmpty,
};

export const mockFieldsMinimal = {
  title: mockTitleField,
  description: mockDescriptionField,
};

export const mockFieldsWithEmptyTitle = {
  title: {
    value: '',
    editable: '',
  } as Field<string>,
  description: mockDescriptionField,
  link: mockLinkField,
};

export const mockFieldsWithEmptyDescription = {
  title: mockTitleField,
  description: {
    value: '',
    editable: '',
  } as Field<string>,
  link: mockLinkField,
};

// Mock params data
export const mockParams = {
  mock_param: 'test-param-value',
};

export const mockParamsEmpty = {};

// Mock external fields data
export const mockExternalFields = {
  mock_external_data: {
    value: 'External data value',
    editable: 'External data value',
  } as Field<string>,
};

// Complete props combinations
export const defaultProps = {
  params: mockParams,
  fields: mockFields,
  externalFields: mockExternalFields,
};

export const propsWithoutLink = {
  params: mockParams,
  fields: mockFieldsWithoutLink,
  externalFields: mockExternalFields,
};

export const propsWithoutImage = {
  params: mockParams,
  fields: mockFieldsWithoutImage,
  externalFields: mockExternalFields,
};

export const propsWithEmptyLink = {
  params: mockParams,
  fields: mockFieldsWithEmptyLink,
  externalFields: mockExternalFields,
};

export const propsMinimal = {
  params: mockParams,
  fields: mockFieldsMinimal,
  externalFields: mockExternalFields,
};

export const propsWithEmptyTitle = {
  params: mockParams,
  fields: mockFieldsWithEmptyTitle,
  externalFields: mockExternalFields,
};

export const propsWithEmptyDescription = {
  params: mockParams,
  fields: mockFieldsWithEmptyDescription,
  externalFields: mockExternalFields,
};

export const propsWithoutFields = {
  params: mockParams,
  fields: null as any,
  externalFields: mockExternalFields,
};

export const propsWithEmptyParams = {
  params: mockParamsEmpty,
  fields: mockFields,
  externalFields: mockExternalFields,
};


