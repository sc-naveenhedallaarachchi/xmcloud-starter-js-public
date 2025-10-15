import { Field } from '@sitecore-content-sdk/nextjs';
import {
  TestimonialCarouselProps,
  TestimonialCarouselItemProps,
} from '@/components/testimonial-carousel/testimonial-carousel.props';

// Mock testimonial items
export const mockTestimonialItem1: TestimonialCarouselItemProps = {
  testimonialQuote: {
    jsonValue: {
      value: 'This product has completely transformed the way we work. Highly recommended!',
    } as Field<string>,
  },
  testimonialAttribution: {
    jsonValue: {
      value: 'John Doe, CEO at TechCorp',
    } as Field<string>,
  },
};

export const mockTestimonialItem2: TestimonialCarouselItemProps = {
  testimonialQuote: {
    jsonValue: {
      value: 'Outstanding service and support. The team went above and beyond our expectations.',
    } as Field<string>,
  },
  testimonialAttribution: {
    jsonValue: {
      value: 'Jane Smith, Marketing Director',
    } as Field<string>,
  },
};

export const mockTestimonialItem3: TestimonialCarouselItemProps = {
  testimonialQuote: {
    jsonValue: {
      value: 'A game-changer for our business. We saw immediate results and increased productivity.',
    } as Field<string>,
  },
  testimonialAttribution: {
    jsonValue: {
      value: 'Mike Johnson, CTO',
    } as Field<string>,
  },
};

export const mockTestimonialItemWithoutAttribution: TestimonialCarouselItemProps = {
  testimonialQuote: {
    jsonValue: {
      value: 'Great experience overall!',
    } as Field<string>,
  },
};

// Default props with multiple testimonials
export const defaultProps: TestimonialCarouselProps = {
  fields: {
    data: {
      datasource: {
        children: {
          results: [mockTestimonialItem1, mockTestimonialItem2, mockTestimonialItem3],
        },
      },
    },
  },
  params: {
    styles: 'custom-carousel-styles',
  },
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

// Props with single testimonial
export const propsWithSingleTestimonial: TestimonialCarouselProps = {
  fields: {
    data: {
      datasource: {
        children: {
          results: [mockTestimonialItem1],
        },
      },
    },
  },
  params: {},
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

// Props with two testimonials
export const propsWithTwoTestimonials: TestimonialCarouselProps = {
  fields: {
    data: {
      datasource: {
        children: {
          results: [mockTestimonialItem1, mockTestimonialItem2],
        },
      },
    },
  },
  params: {},
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

// Props with testimonial without attribution
export const propsWithTestimonialWithoutAttribution: TestimonialCarouselProps = {
  fields: {
    data: {
      datasource: {
        children: {
          results: [mockTestimonialItemWithoutAttribution],
        },
      },
    },
  },
  params: {},
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

// Props with empty testimonials array
export const propsWithEmptyTestimonials: TestimonialCarouselProps = {
  fields: {
    data: {
      datasource: {
        children: {
          results: [],
        },
      },
    },
  },
  params: {},
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

// Props without children
export const propsWithoutChildren: TestimonialCarouselProps = {
  fields: {
    data: {
      datasource: {} as any,
    },
  },
  params: {},
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

// Props without fields (null scenario)
export const propsWithoutFields: TestimonialCarouselProps = {
  fields: null as any,
  params: {},
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

// Props with undefined fields
export const propsWithUndefinedFields: TestimonialCarouselProps = {
  fields: undefined as any,
  params: {},
  rendering: { componentName: 'TestimonialCarousel' } as any,
  name: 'TestimonialCarousel',
  sitecoreProvider: {},
  Testimonials: [],
};

