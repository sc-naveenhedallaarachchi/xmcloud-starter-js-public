import { TextField } from '@sitecore-content-sdk/nextjs';

// Mock page data for useSitecore hook
export const mockPageData = {
  mode: {
    isEditing: false,
    isNormal: true,
  },
  layout: {
    sitecore: {
      route: {
        fields: {
          Title: {
            value: 'Page Title',
            editable: 'Page Title',
          } as TextField,
        },
      },
    },
  },
};

export const mockPageDataEditing = {
  mode: {
    isEditing: true,
    isNormal: false,
  },
  layout: {
    sitecore: {
      route: {
        fields: {
          Title: {
            value: 'Page Title',
            editable: 'Page Title',
          } as TextField,
        },
      },
    },
  },
};

export const mockPageDataWithoutTitle = {
  mode: {
    isEditing: false,
    isNormal: true,
  },
  layout: {
    sitecore: {
      route: {
        fields: {},
      },
    },
  },
};

// Mock fields data
export const mockFields = {
  data: {
    datasource: {
      url: {
        path: '/test-path',
        siteName: 'test-site',
      },
      field: {
        jsonValue: {
          value: 'Datasource Title',
          metadata: {},
        },
      },
    },
    contextItem: {
      url: {
        path: '/context-path',
        siteName: 'test-site',
      },
      field: {
        jsonValue: {
          value: 'Context Title',
          metadata: {},
        },
      },
    },
  },
};

export const mockFieldsWithoutDatasource = {
  data: {
    datasource: null as any,
    contextItem: {
      url: {
        path: '/context-path',
        siteName: 'test-site',
      },
      field: {
        jsonValue: {
          value: 'Context Title',
          metadata: {},
        },
      },
    },
  },
};

export const mockFieldsEmpty = {
  data: {
    datasource: {
      url: {
        path: '/test-path',
        siteName: 'test-site',
      },
      field: {
        jsonValue: {
          value: '',
          metadata: {},
        },
      },
    },
    contextItem: {
      url: {
        path: '/context-path',
        siteName: 'test-site',
      },
      field: {
        jsonValue: {
          value: '',
          metadata: {},
        },
      },
    },
  },
};

// Mock params
export const mockParams = {
  styles: 'custom-title-style',
  tag: 'h1',
  RenderingIdentifier: 'title-rendering-id',
};

export const mockParamsWithoutStyles = {
  tag: 'h2',
  RenderingIdentifier: 'title-rendering-id',
};

export const mockParamsWithoutTag = {
  styles: 'custom-title-style',
  RenderingIdentifier: 'title-rendering-id',
};

// Complete props combinations
export const defaultProps = {
  params: mockParams,
  fields: mockFields,
};

export const propsWithoutStyles = {
  params: mockParamsWithoutStyles,
  fields: mockFields,
};

export const propsWithoutTag = {
  params: mockParamsWithoutTag,
  fields: mockFields,
};

export const propsWithoutDatasource = {
  params: mockParams,
  fields: mockFieldsWithoutDatasource,
};

export const propsWithEmptyFields = {
  params: mockParams,
  fields: mockFieldsEmpty,
};

