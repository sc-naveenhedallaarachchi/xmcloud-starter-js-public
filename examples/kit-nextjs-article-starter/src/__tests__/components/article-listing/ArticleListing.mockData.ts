import { Field, ImageField, LinkField } from '@sitecore-content-sdk/nextjs';

// Mock article 1
export const mockArticle1 = {
  url: '/articles/article-1',
  id: 'article-1',
  name: 'Article 1',
  fields: {
    pageTitle: {
      value: 'Introduction to React Hooks',
      editable: 'Introduction to React Hooks',
    } as Field<string>,
    pageSummary: {
      value: 'Learn the fundamentals of React Hooks and how they can improve your code.',
      editable: 'Learn the fundamentals of React Hooks',
    } as Field<string>,
    pageThumbnail: {
      value: {
        src: '/article-1-thumb.jpg',
        alt: 'Article 1 Thumbnail',
        width: 800,
        height: 600,
      },
    } as ImageField,
    pageReadTime: {
      value: '8 min read',
      editable: '8 min read',
    } as Field<string>,
    taxAuthor: {
      id: 'author-1',
      name: 'Jane Smith',
      fields: {
        personFirstName: {
          value: 'Jane',
        } as Field<string>,
        personLastName: {
          value: 'Smith',
        } as Field<string>,
        personProfileImage: {
          value: {
            src: '/jane-smith.jpg',
            alt: 'Jane Smith',
          },
        } as ImageField,
      },
    },
  },
};

// Mock article 2
export const mockArticle2 = {
  url: '/articles/article-2',
  id: 'article-2',
  name: 'Article 2',
  fields: {
    pageTitle: {
      value: 'Advanced TypeScript Patterns',
      editable: 'Advanced TypeScript Patterns',
    } as Field<string>,
    pageSummary: {
      value: 'Explore advanced TypeScript patterns for building robust applications.',
      editable: 'Explore advanced TypeScript patterns',
    } as Field<string>,
    pageThumbnail: {
      value: {
        src: '/article-2-thumb.jpg',
        alt: 'Article 2 Thumbnail',
        width: 800,
        height: 600,
      },
    } as ImageField,
    pageReadTime: {
      value: '12 min read',
      editable: '12 min read',
    } as Field<string>,
    taxAuthor: {
      id: 'author-2',
      name: 'John Doe',
      fields: {
        personFirstName: {
          value: 'John',
        } as Field<string>,
        personLastName: {
          value: 'Doe',
        } as Field<string>,
        personProfileImage: {
          value: {
            src: '/john-doe.jpg',
            alt: 'John Doe',
          },
        } as ImageField,
      },
    },
  },
};

// Mock article 3 (no author image)
export const mockArticle3 = {
  url: '/articles/article-3',
  id: 'article-3',
  name: 'Article 3',
  fields: {
    pageTitle: {
      value: 'CSS Grid Layout Guide',
      editable: 'CSS Grid Layout Guide',
    } as Field<string>,
    pageSummary: {
      value: 'Master CSS Grid and create responsive layouts with ease.',
      editable: 'Master CSS Grid',
    } as Field<string>,
    pageThumbnail: {
      value: {
        src: '/article-3-thumb.jpg',
        alt: 'Article 3 Thumbnail',
        width: 800,
        height: 600,
      },
    } as ImageField,
    pageReadTime: {
      value: '6 min read',
      editable: '6 min read',
    } as Field<string>,
    taxAuthor: {
      id: 'author-3',
      name: 'Sarah Johnson',
      fields: {
        personFirstName: {
          value: 'Sarah',
        } as Field<string>,
        personLastName: {
          value: 'Johnson',
        } as Field<string>,
        personProfileImage: undefined,
      },
    },
  },
};

// Mock article 4
export const mockArticle4 = {
  url: '/articles/article-4',
  id: 'article-4',
  name: 'Article 4',
  fields: {
    pageTitle: {
      value: 'Next.js Performance Tips',
      editable: 'Next.js Performance Tips',
    } as Field<string>,
    pageSummary: {
      value: 'Optimize your Next.js applications for better performance.',
      editable: 'Optimize your Next.js applications',
    } as Field<string>,
    pageThumbnail: {
      value: {
        src: '/article-4-thumb.jpg',
        alt: 'Article 4 Thumbnail',
        width: 800,
        height: 600,
      },
    } as ImageField,
    pageReadTime: {
      value: '10 min read',
      editable: '10 min read',
    } as Field<string>,
    taxAuthor: {
      id: 'author-4',
      name: 'Mike Chen',
      fields: {
        personFirstName: {
          value: 'Mike',
        } as Field<string>,
        personLastName: {
          value: 'Chen',
        } as Field<string>,
        personProfileImage: {
          value: {
            src: '/mike-chen.jpg',
            alt: 'Mike Chen',
          },
        } as ImageField,
      },
    },
  },
};

// Mock link field
export const mockLinkField: LinkField = {
  value: {
    href: '/all-articles',
    text: 'View All Articles',
    title: 'View All Articles',
    linktype: 'internal',
  },
};

// Mock fields
export const mockFields = {
  titleOptional: {
    value: 'Latest Articles',
    editable: 'Latest Articles',
  } as Field<string>,
  descriptionOptional: {
    value: 'Discover our latest insights and tutorials',
    editable: 'Discover our latest insights and tutorials',
  } as Field<string>,
  linkOptional: mockLinkField,
  featuredContent: [mockArticle1, mockArticle2, mockArticle3, mockArticle4],
};

export const mockFieldsWithoutTitle = {
  linkOptional: mockLinkField,
  featuredContent: [mockArticle1, mockArticle2],
};

export const mockFieldsWithoutDescription = {
  titleOptional: mockFields.titleOptional,
  linkOptional: mockLinkField,
  featuredContent: [mockArticle1, mockArticle2],
};

export const mockFieldsWithoutLink = {
  titleOptional: mockFields.titleOptional,
  descriptionOptional: mockFields.descriptionOptional,
  featuredContent: [mockArticle1, mockArticle2],
};

export const mockFieldsTwoArticles = {
  titleOptional: mockFields.titleOptional,
  descriptionOptional: mockFields.descriptionOptional,
  linkOptional: mockLinkField,
  featuredContent: [mockArticle1, mockArticle2],
};

export const mockFieldsOneArticle = {
  titleOptional: mockFields.titleOptional,
  featuredContent: [mockArticle1],
};

export const mockFieldsNoArticles = {
  titleOptional: mockFields.titleOptional,
  descriptionOptional: mockFields.descriptionOptional,
  linkOptional: mockLinkField,
  featuredContent: [],
};

// Mock params
export const mockParams = {
  styles: 'custom-listing-style',
};

// Complete props combinations
export const defaultProps = {
  params: mockParams,
  fields: mockFields,
  isPageEditing: false,
};

export const propsWithoutTitle = {
  params: mockParams,
  fields: mockFieldsWithoutTitle,
  isPageEditing: false,
};

export const propsWithoutDescription = {
  params: mockParams,
  fields: mockFieldsWithoutDescription,
  isPageEditing: false,
};

export const propsWithoutLink = {
  params: mockParams,
  fields: mockFieldsWithoutLink,
  isPageEditing: false,
};

export const propsTwoArticles = {
  params: mockParams,
  fields: mockFieldsTwoArticles,
  isPageEditing: false,
};

export const propsOneArticle = {
  params: mockParams,
  fields: mockFieldsOneArticle,
  isPageEditing: false,
};

export const propsNoArticles = {
  params: mockParams,
  fields: mockFieldsNoArticles,
  isPageEditing: false,
};

export const propsEditing = {
  params: mockParams,
  fields: mockFields,
  isPageEditing: true,
};


