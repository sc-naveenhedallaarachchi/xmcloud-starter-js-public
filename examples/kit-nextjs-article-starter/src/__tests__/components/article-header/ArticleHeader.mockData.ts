import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

// Mock images
export const mockImageField: ImageField = {
  value: {
    src: '/test-article-hero.jpg',
    alt: 'Article Hero Image',
    width: 1200,
    height: 800,
  },
  editable: 'Article Hero Image',
};

// Mock text fields
export const mockTitleField: Field<string> = {
  value: 'The Future of Web Development',
  editable: 'The Future of Web Development',
};

export const mockEyebrowField: Field<string> = {
  value: 'Technology',
  editable: 'Technology',
};

export const mockReadTimeField: Field<string> = {
  value: '5 min read',
  editable: '5 min read',
};

export const mockDisplayDateField: Field<string> = {
  value: '2024-01-15',
  editable: '2024-01-15',
};

// Mock author
export const mockAuthor = {
  id: 'author-1',
  name: 'John Doe',
  url: '/authors/john-doe',
  fields: {
    personProfileImage: {
      value: {
        src: '/test-author.jpg',
        alt: 'John Doe',
        width: 200,
        height: 200,
      },
    } as ImageField,
    personFirstName: {
      value: 'John',
      editable: 'John',
    } as Field<string>,
    personLastName: {
      value: 'Doe',
      editable: 'Doe',
    } as Field<string>,
    personJobTitle: {
      value: 'Senior Developer',
      editable: 'Senior Developer',
    } as Field<string>,
    personBio: {
      value: 'Experienced web developer',
      editable: 'Experienced web developer',
    } as Field<string>,
    personLinkedIn: {
      value: {
        href: 'https://linkedin.com/in/johndoe',
        text: 'LinkedIn',
        linktype: 'external',
      },
    } as LinkField,
  },
};

export const mockAuthorWithoutImage = {
  ...mockAuthor,
  fields: {
    ...mockAuthor.fields,
    personProfileImage: undefined,
  },
};

export const mockAuthorWithoutJobTitle = {
  ...mockAuthor,
  fields: {
    ...mockAuthor.fields,
    personJobTitle: undefined,
  },
};

// Mock fields
export const mockFields = {
  data: {
    datasource: {
      imageRequired: {
        jsonValue: mockImageField,
      },
      eyebrowOptional: {
        jsonValue: mockEyebrowField,
      },
    },
    externalFields: {
      pageHeaderTitle: {
        jsonValue: mockTitleField,
      },
      pageReadTime: {
        jsonValue: mockReadTimeField,
      },
      pageDisplayDate: {
        jsonValue: mockDisplayDateField,
      },
      pageAuthor: {
        jsonValue: mockAuthor,
      },
    },
  },
};

export const mockFieldsWithoutEyebrow = {
  data: {
    datasource: {
      imageRequired: {
        jsonValue: mockImageField,
      },
    },
    externalFields: mockFields.data.externalFields,
  },
};

export const mockFieldsWithoutAuthor = {
  data: {
    datasource: mockFields.data.datasource,
    externalFields: {
      pageHeaderTitle: {
        jsonValue: mockTitleField,
      },
      pageReadTime: {
        jsonValue: mockReadTimeField,
      },
      pageDisplayDate: {
        jsonValue: mockDisplayDateField,
      },
    },
  },
};

export const mockFieldsWithoutReadTime = {
  data: {
    datasource: mockFields.data.datasource,
    externalFields: {
      pageHeaderTitle: {
        jsonValue: mockTitleField,
      },
      pageDisplayDate: {
        jsonValue: mockDisplayDateField,
      },
      pageAuthor: {
        jsonValue: mockAuthor,
      },
    },
  },
};

export const mockFieldsWithoutDate = {
  data: {
    datasource: mockFields.data.datasource,
    externalFields: {
      pageHeaderTitle: {
        jsonValue: mockTitleField,
      },
      pageReadTime: {
        jsonValue: mockReadTimeField,
      },
      pageAuthor: {
        jsonValue: mockAuthor,
      },
    },
  },
};

export const mockFieldsWithoutImage = {
  data: {
    datasource: {
      eyebrowOptional: {
        jsonValue: mockEyebrowField,
      },
    },
    externalFields: mockFields.data.externalFields,
  },
};

export const mockFieldsMinimal = {
  data: {
    datasource: {
      imageRequired: {
        jsonValue: mockImageField,
      },
    },
    externalFields: {
      pageHeaderTitle: {
        jsonValue: mockTitleField,
      },
    },
  },
};

// Mock params
export const mockParams = {
  styles: 'custom-header-style',
};

// Complete props combinations
export const defaultProps = {
  params: mockParams,
  fields: mockFields,
};

export const propsWithoutEyebrow = {
  params: mockParams,
  fields: mockFieldsWithoutEyebrow,
};

export const propsWithoutAuthor = {
  params: mockParams,
  fields: mockFieldsWithoutAuthor,
};

export const propsWithoutReadTime = {
  params: mockParams,
  fields: mockFieldsWithoutReadTime,
};

export const propsWithoutDate = {
  params: mockParams,
  fields: mockFieldsWithoutDate,
};

export const propsWithoutImage = {
  params: mockParams,
  fields: mockFieldsWithoutImage,
};

export const propsMinimal = {
  params: mockParams,
  fields: mockFieldsMinimal,
};

export const propsWithoutFields = {
  params: mockParams,
  fields: null as any,
};

export const propsWithAuthorNoImage = {
  params: mockParams,
  fields: {
    data: {
      datasource: mockFields.data.datasource,
      externalFields: {
        ...mockFields.data.externalFields,
        pageAuthor: {
          jsonValue: mockAuthorWithoutImage,
        },
      },
    },
  },
};

export const propsWithAuthorNoJobTitle = {
  params: mockParams,
  fields: {
    data: {
      datasource: mockFields.data.datasource,
      externalFields: {
        ...mockFields.data.externalFields,
        pageAuthor: {
          jsonValue: mockAuthorWithoutJobTitle,
        },
      },
    },
  },
};


