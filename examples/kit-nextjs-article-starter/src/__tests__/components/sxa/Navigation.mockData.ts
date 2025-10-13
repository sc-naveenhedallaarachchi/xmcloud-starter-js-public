import { TextField } from '@sitecore-content-sdk/nextjs';

// Mock page data for useSitecore hook
export const mockPageData = {
  mode: {
    isEditing: false,
  },
};

export const mockPageDataEditing = {
  mode: {
    isEditing: true,
  },
};

// Mock navigation fields
export const mockNavigationFields = {
  Id: 'nav-1',
  DisplayName: 'Home',
  Title: {
    value: 'Home Page',
    editable: 'Home Page',
  } as TextField,
  NavigationTitle: {
    value: 'Home',
    editable: 'Home',
  } as TextField,
  Href: '/home',
  Querystring: '',
  Children: [],
  Styles: ['nav-item'],
};

export const mockNavigationFieldsWithChildren = {
  Id: 'nav-2',
  DisplayName: 'Products',
  Title: {
    value: 'Products Page',
    editable: 'Products Page',
  } as TextField,
  NavigationTitle: {
    value: 'Products',
    editable: 'Products',
  } as TextField,
  Href: '/products',
  Querystring: '',
  Children: [
    {
      Id: 'nav-2-1',
      DisplayName: 'Product 1',
      Title: {
        value: 'Product 1 Page',
        editable: 'Product 1 Page',
      } as TextField,
      NavigationTitle: {
        value: 'Product 1',
        editable: 'Product 1',
      } as TextField,
      Href: '/products/product-1',
      Querystring: '',
      Children: [],
      Styles: ['nav-item', 'nav-subitem'],
    },
    {
      Id: 'nav-2-2',
      DisplayName: 'Product 2',
      Title: {
        value: 'Product 2 Page',
        editable: 'Product 2 Page',
      } as TextField,
      NavigationTitle: {
        value: 'Product 2',
        editable: 'Product 2',
      } as TextField,
      Href: '/products/product-2',
      Querystring: '',
      Children: [],
      Styles: ['nav-item', 'nav-subitem'],
    },
  ],
  Styles: ['nav-item', 'has-children'],
};

export const mockNavigationFieldsWithoutTitle = {
  Id: 'nav-3',
  DisplayName: 'About',
  Title: null as any,
  NavigationTitle: null as any,
  Href: '/about',
  Querystring: '',
  Children: [],
  Styles: ['nav-item'],
};

export const mockNavigationFieldsEmpty = {
  Id: '',
  DisplayName: '',
  Title: null as any,
  NavigationTitle: null as any,
  Href: '',
  Querystring: '',
  Children: [],
  Styles: ['nav-item'],
};

// Mock params
export const mockParams = {
  GridParameters: 'col-12',
  Styles: 'custom-nav-style',
  RenderingIdentifier: 'nav-rendering-id',
};

export const mockParamsWithoutStyles = {
  GridParameters: 'col-12',
  Styles: '',
  RenderingIdentifier: 'nav-rendering-id',
};

export const mockParamsWithoutId = {
  GridParameters: 'col-12',
  Styles: 'custom-nav-style',
  RenderingIdentifier: '',
};

// Complete props combinations
export const defaultProps = {
  params: mockParams,
  fields: mockNavigationFields,
  handleClick: jest.fn(),
  relativeLevel: 0,
};

export const propsWithChildren = {
  params: mockParams,
  fields: mockNavigationFieldsWithChildren,
  handleClick: jest.fn(),
  relativeLevel: 0,
};

export const propsWithoutStyles = {
  params: mockParamsWithoutStyles,
  fields: mockNavigationFields,
  handleClick: jest.fn(),
  relativeLevel: 0,
};

export const propsWithoutId = {
  params: mockParamsWithoutId,
  fields: mockNavigationFields,
  handleClick: jest.fn(),
  relativeLevel: 0,
};

export const propsWithoutTitle = {
  params: mockParams,
  fields: mockNavigationFieldsWithoutTitle,
  handleClick: jest.fn(),
  relativeLevel: 0,
};

export const propsEmpty = {
  params: mockParams,
  fields: mockNavigationFieldsEmpty,
  handleClick: jest.fn(),
  relativeLevel: 0,
};
