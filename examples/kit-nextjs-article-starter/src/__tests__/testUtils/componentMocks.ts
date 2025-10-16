import React from 'react';

/**
 * Centralized component mocks for all tests
 * This file contains all the mock implementations used across test files
 */

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock HTMLMediaElement methods for video/audio
HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
HTMLMediaElement.prototype.pause = jest.fn();
HTMLMediaElement.prototype.load = jest.fn();

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => {
    return args
      .flat(2)
      .filter(Boolean)
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object' && !Array.isArray(arg)) {
          return Object.entries(arg)
            .filter(([, value]) => Boolean(value))
            .map(([key]) => key)
            .join(' ');
        }
        return '';
      })
      .filter(Boolean)
      .join(' ')
      .trim();
  },
}));

// Override useSitecore to return a mock function that can be customized per test
export const mockUseSitecoreContext = jest.fn(() => ({
  page: {
    mode: {
      isEditing: false,
    },
    layout: {
      sitecore: {
        route: {
          fields: {
            pageTitle: {
              value: '',
            },
          },
        },
      },
    },
  },
}));

// Mock the Sitecore Content SDK components
jest.mock('@sitecore-content-sdk/nextjs', () => {
  const ImageComponent = ({ field, className, 'data-testid': testId }: any) =>
    React.createElement('img', {
      src: field?.value?.src || '',
      alt: field?.value?.alt || '',
      className,
      'data-testid': testId || 'image-field',
    });
  
  const LinkComponent = ({ field, children, className, editable, ...props }: any) =>
    React.createElement(
      'a',
      {
        href: field?.value?.href || field?.value?.url || '#',
        className,
        'data-testid': 'sitecore-link',
        'data-editable': editable ? 'true' : 'false',
        ...props,
      },
      children || field?.value?.text
    );
  
  const RichTextComponent = jest.fn(({ field, className }: any) =>
    React.createElement('div', {
      className,
      'data-testid': 'rich-text-content',
      dangerouslySetInnerHTML: { __html: field?.value || '' },
    }));

  return {
    Text: ({ field, tag, className, editable }: any) => {
      const Tag = tag || 'span';
      const testId = tag ? `text-${tag}` : 'text-field';
      return React.createElement(
        Tag, 
        { 
          className, 
          'data-testid': testId,
          'data-editable': editable ? 'true' : undefined,
        }, 
        field?.value || ''
      );
    },
    DateField: ({ field, tag, className, render }: any) => {
      const Tag = tag || 'span';
      const testId = tag ? `date-${tag}` : 'date-field';
      const dateValue = field?.value || '';
      const displayValue = render ? render(dateValue) : dateValue;
      return React.createElement(
        Tag,
        {
          className,
          'data-testid': testId,
        },
        displayValue
      );
    },
    Image: ImageComponent,
    NextImage: ImageComponent,
    Link: LinkComponent,
    RichText: RichTextComponent,
    Placeholder: ({ name, rendering }: any) =>
      React.createElement(
        'div',
        { 
          'data-testid': `placeholder-${name}`,
          'data-rendering': rendering?.componentName || rendering?.uid,
        },
        `Placeholder: ${name}`
      ),
    withDatasourceCheck: () => (component: any) => {
      // Return a wrapped component that checks for datasource
      return (props: any) => {
        if (!props.fields) {
          return null;
        }
        return React.createElement(component, props);
      };
    },
    useSitecore: () => mockUseSitecoreContext(),
  };
});

// Mock ButtonBase (used by Card, AlertBanner, etc.)
// Note: We check if we're testing ButtonComponent itself, and if so, use the actual implementation
jest.mock('@/components/button-component/ButtonComponent', () => {
  const testPath = expect.getState().testPath || '';
  const isButtonComponentTest = testPath.includes('ButtonComponent.test');
  
  if (isButtonComponentTest) {
    // When testing ButtonComponent, use the actual implementation
    return jest.requireActual('@/components/button-component/ButtonComponent');
  }
  
  // For other tests, provide a simple mock of ButtonBase
  return {
    ButtonBase: ({ buttonLink, variant, children, className }: any) =>
      React.createElement(
        'a',
        {
          href: buttonLink?.value?.href || '#',
          'data-testid': 'button-base',
          'data-variant': variant,
          className,
        },
        children || buttonLink?.value?.text || 'Button'
      ),
    EditableImageButton: ({ iconImage, iconLink, buttonLink, icon, variant, size, isEditing, isPageEditing }: any) =>
      React.createElement(
        'button',
        {
          'data-testid': 'social-link-button',
          'data-href': 
            buttonLink?.value?.href || 
            buttonLink?.value?.url || 
            iconLink?.value?.href || 
            iconLink?.value?.url || 
            iconLink?.jsonValue?.value?.href || 
            buttonLink?.jsonValue?.value?.href || 
            '#',
          'data-variant': variant,
          'data-size': size,
          'data-editing': (isEditing || isPageEditing) ? 'true' : 'false',
        },
        icon?.value?.alt || iconImage?.jsonValue?.value?.alt || iconImage?.value?.alt || 'Social Link'
      ),
    EditableButton: ({ buttonLink, variant, children, className, isEditing, isPageEditing, 'data-testid': dataTestId, ...props }: any) => {
      const context = mockUseSitecoreContext();
      const isEditingMode = isEditing || isPageEditing || context?.page?.mode?.isEditing || false;
      
      // Extract href from various possible structures
      const href = buttonLink?.jsonValue?.value?.href || buttonLink?.value?.href || '#';
      const text = buttonLink?.jsonValue?.value?.text || buttonLink?.value?.text || 'Button';
      
      return React.createElement(
        'button',
        {
          'data-testid': dataTestId || 'hero-button',
          'data-href': href,
          'data-variant': variant,
          'data-editing': isEditingMode ? 'true' : 'false',
          className,
          ...props,
        },
        children || text
      );
    },
  };
});

// Mock the UI button component
jest.mock('@/components/ui/button', () => ({
  Button: React.forwardRef((props: any, ref: any) => {
    const testId = props['data-testid'] || 'ui-button';
    const { 
      children, 
      variant, 
      size, 
      onClick, 
      className, 
      asChild, 
      'data-testid': _dataTestId,
      ...otherProps 
    } = props;
    
    return React.createElement(
      'button',
      {
        ref,
        className,
        'data-testid': testId,
        'data-variant': variant,
        'data-size': size,
        'data-as-child': asChild,
        onClick,
        ...otherProps,
      },
      children
    );
  }),
}));

// Mock the Alert components
jest.mock('@/components/ui/alert', () => ({
  Alert: ({ children, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'alert', role: 'alert' },
      children
    ),
  AlertTitle: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'alert-title' }, children),
  AlertDescription: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'alert-description' }, children),
}));

// Mock the Card components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'card' }, children),
  CardHeader: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'card-header' }, children),
  CardTitle: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'card-title' }, children),
  CardDescription: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'card-description' }, children),
  CardContent: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'card-content' }, children),
  CardFooter: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'card-footer' }, children),
}));

// Mock the Accordion components
jest.mock('@/components/ui/accordion', () => ({
  Accordion: ({ children, type, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'accordion', 'data-type': type },
      children
    ),
  AccordionItem: ({ children, value, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'accordion-item', 'data-value': value },
      children
    ),
  AccordionTrigger: ({ children, className }: any) =>
    React.createElement('button', { className, 'data-testid': 'accordion-trigger' }, children),
  AccordionContent: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'accordion-content' }, children),
}));

// Mock the Tabs components
jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children, defaultValue, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'tabs', 'data-default-value': defaultValue },
      children
    ),
  TabsList: ({ children, className }: any) =>
    React.createElement('div', { className, 'data-testid': 'tabs-list' }, children),
  TabsTrigger: ({ children, value, className }: any) =>
    React.createElement(
      'button',
      { className, 'data-testid': 'tabs-trigger', 'data-value': value },
      children
    ),
  TabsContent: ({ children, value, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'tabs-content', 'data-value': value },
      children
    ),
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  X: () => React.createElement('span', { 'data-testid': 'x-icon' }, 'X'),
  ChevronRight: () => React.createElement('span', { 'data-testid': 'chevron-right-icon' }, '>'),
  ChevronLeft: () => React.createElement('span', { 'data-testid': 'chevron-left-icon' }, '<'),
  ChevronDown: () => React.createElement('span', { 'data-testid': 'chevron-down-icon' }, 'v'),
  Menu: () => React.createElement('span', { 'data-testid': 'menu-icon' }, '☰'),
  Play: () => React.createElement('span', { 'data-testid': 'play-icon' }, '▶'),
  Pause: () => React.createElement('span', { 'data-testid': 'pause-icon' }, '⏸'),
  Volume2: () => React.createElement('span', { 'data-testid': 'volume-icon' }, '🔊'),
  VolumeX: () => React.createElement('span', { 'data-testid': 'volume-x-icon' }, '🔇'),
  Maximize: () => React.createElement('span', { 'data-testid': 'maximize-icon' }, '⛶'),
  Minimize: () => React.createElement('span', { 'data-testid': 'minimize-icon' }, '⛶'),
  Facebook: () => React.createElement('span', { 'data-testid': 'facebook-icon' }, 'F'),
  Twitter: () => React.createElement('span', { 'data-testid': 'twitter-icon' }, 'T'),
  Instagram: () => React.createElement('span', { 'data-testid': 'instagram-icon' }, 'I'),
  Linkedin: () => React.createElement('span', { 'data-testid': 'linkedin-icon' }, 'in'),
  Youtube: () => React.createElement('span', { 'data-testid': 'youtube-icon' }, 'Y'),
  Link: () => React.createElement('span', { 'data-testid': 'link-icon' }, '🔗'),
  Check: () => React.createElement('span', { 'data-testid': 'check-icon' }, '✓'),
  Mail: () => React.createElement('span', { 'data-testid': 'mail-icon' }, '✉'),
}));

// Mock NoDataFallback
jest.mock('@/utils/NoDataFallback', () => {
  return {
    NoDataFallback: ({ componentName }: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'no-data-fallback', className: 'component' },
        React.createElement(
          'div',
          { className: 'component-content' },
          React.createElement(
            'span',
            { className: 'is-empty-hint' },
            `${componentName} requires a datasource item assigned. Please assign a datasource item to edit the content.`
          )
        )
      ),
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, initial, animate, transition, ...props }: any) =>
      React.createElement('div', { className, ...props }, children),
    section: ({ children, className, initial, animate, transition, ...props }: any) =>
      React.createElement('section', { className, ...props }, children),
    header: ({ children, className, initial, animate, transition, ...props }: any) =>
      React.createElement('header', { className, ...props }, children),
    button: ({ children, className, initial, animate, transition, onClick, ...props }: any) =>
      React.createElement('button', { className, onClick, ...props }, children),
    img: ({ className, src, alt, ...props }: any) =>
      React.createElement('img', { className, src, alt, ...props }),
    a: ({ children, className, href, ...props }: any) =>
      React.createElement('a', { className, href, ...props }, children),
  },
  AnimatePresence: ({ children }: any) => React.createElement('div', {}, children),
  useInView: () => true,
}));

// Mock react-intersection-observer (only if package exists)
// jest.mock('react-intersection-observer', () => ({
//   useInView: () => ({
//     ref: { current: null },
//     inView: true,
//   }),
// }));

// Mock Image component
// Note: When testing ImageBlock itself, use the actual implementation
jest.mock('@/components/image/ImageBlock', () => {
  const testPath = expect.getState().testPath || '';
  const isImageBlockTest = testPath.includes('ImageBlock.test');

  if (isImageBlockTest) {
    // When testing ImageBlock, use the actual implementation
    return jest.requireActual('@/components/image/ImageBlock');
  }

  // For other tests, provide a simple mock
  return {
    __esModule: true,
    default: ({ fields, className }: any) =>
      React.createElement('img', {
        src: fields?.data?.datasource?.image?.jsonValue?.value?.src || '',
        alt: fields?.data?.datasource?.image?.jsonValue?.value?.alt || '',
        className,
        'data-testid': 'image-block',
      }),
  };
});

// Mock Video component
jest.mock('@/components/video/Video', () => ({
  __esModule: true,
  Default: ({ fields, params }: any) => {
    const videoUrl = fields?.video?.value?.href;
    
    if (!fields) {
      return React.createElement('div', { 'data-testid': 'no-data-fallback' }, 'Video');
    }
    
    if (!videoUrl) {
      return React.createElement(
        'div',
        { className: 'bg-secondary flex aspect-video items-center justify-center' },
        React.createElement('p', {}, 'Please add video')
      );
    }

    return React.createElement(
      'div',
      { 'data-testid': 'motion-div', className: 'max-w-screens-2xl relative z-10 mx-auto overflow-hidden' },
      React.createElement(
        'div',
        { className: 'aspect-video w-full', style: { position: 'relative' } },
        [
          params?.useModal !== '0' &&
            React.createElement('div', { key: 'modal', 'data-testid': 'video-modal' }),
          params?.useModal === '0' &&
            React.createElement(
              'div',
              { key: 'player', 'data-testid': 'video-player' },
              React.createElement('div', { 'data-testid': 'video-url' }, videoUrl)
            ),
          fields?.image?.value?.src &&
            React.createElement('img', {
              key: 'image',
              'data-testid': 'image-wrapper',
              src: fields.image.value.src,
              alt: fields.image.value.alt || '',
            }),
          fields?.image?.value?.src &&
            React.createElement('div', {
              key: 'image-container',
              'data-testid': 'image-wrapper-container',
              className: 'cover-image',
            }),
          params?.displayIcon !== '0' &&
            React.createElement(
              'button',
              {
                key: 'button',
                className: `absolute inset-0 z-20 flex cursor-pointer items-center justify-center ${
                  params?.darkPlayIcon === '1' ? 'text-black' : 'text-white'
                }`,
                'aria-label': 'Play video',
                onClick: params?.useModal !== '0' ? mockOpenModal : undefined,
              },
              React.createElement('div', {
                'data-testid': 'icon-play',
                className: 'h-[65px] w-[65px] transition-transform hover:scale-110',
              })
            ),
          params?.displayIcon !== '0' &&
            React.createElement('svg', {
              key: 'svg',
              'aria-hidden': 'true',
              width: '50',
              height: '50',
            }),
        ].filter(Boolean)
      )
    );
  },
  VideoBase: ({ fields, params }: any) =>
    React.createElement(
      'video',
      {
        'data-testid': 'video-component',
        src: fields?.video?.value?.href || '',
        'data-dark-icon': params?.darkPlayIcon || '0',
      },
      'Video content'
    ),
}));

// Mock next-localization
jest.mock('next-localization', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'Demo1_SubscriptionBanner_ButtonLabel': 'Subscribe',
        'Demo1_SubscriptionBanner_EmailFieldPlaceholder': 'Enter your email address',
        'Demo1_SubscriptionBanner_SuccessMessage': 'Thank you for subscribing!',
        'Demo1_SubscriptionBanner_EmailFormatError': 'Invalid email format',
        'Demo1_ArticleHeader_BackToNewsLabel': 'Back to News',
        'Demo1_ArticleHeader_AuthorLabel': 'Written by',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      fn({ email: 'test@example.com' });
    },
    control: {},
    reset: jest.fn(),
    formState: { errors: {} },
  }),
}));

// Mock Form UI components
jest.mock('@/components/ui/form', () => ({
  Form: ({ children }: any) => React.createElement('div', { 'data-testid': 'form' }, children),
  FormField: ({ render }: any) =>
    render({
      field: {
        value: '',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        name: 'email',
        ref: jest.fn(),
      },
    }),
  FormItem: ({ children, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'form-item' },
      children
    ),
  FormControl: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'form-control' }, children),
  FormMessage: ({ children, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'form-message' },
      children
    ),
}));

// Mock Input component
jest.mock('@/components/ui/input', () => ({
  Input: ({ type, placeholder, disabled, className, ...props }: any) =>
    React.createElement('input', {
      type,
      placeholder,
      disabled,
      className,
      'data-testid': 'email-input',
      ...props,
    }),
}));

// Mock Icon component
jest.mock('@/components/icon/Icon', () => {
  // Map icon names to component names (matches the real Icon component)
  const iconMap: { [key: string]: string } = {
    'facebook': 'FacebookIcon',
    'instagram': 'InstagramIcon',
    'youtube': 'YoutubeIcon',
    'twitter': 'TwitterIcon',
    'linkedin': 'LinkedInIcon',
    'email': 'EmailIcon',
    'internal': 'InternalIcon',
    'external': 'ExternalIcon',
    'file': 'FileIcon',
    'media': 'FileIcon',
    'arrow-left': 'arrow-left',
    'arrow-right': 'arrow-right',
    'play': 'play',
    'arrow-up-right': 'arrow-up-right',
    'diversity': 'diversity',
    'communities': 'communities',
    'cross-arrows': 'cross-arrows',
    'signal': 'signal',
  };

  return {
    Default: ({ iconName, className, isAriaHidden = true, altText }: any) => {
      // Return null for undefined iconName
      if (!iconName) return null;

      const componentName = iconMap[iconName] || iconName;
      const attributes: any = {
        'data-testid': `icon-${componentName}`,
        className,
      };

      // Only add aria-hidden if it's true (matches real component)
      if (isAriaHidden) {
        attributes['aria-hidden'] = 'true';
      } else {
        attributes['aria-hidden'] = 'false';
      }

      // Add aria-label if altText is provided
      if (altText) {
        attributes['aria-label'] = altText;
      }

      return React.createElement('span', attributes, componentName);
    },
  };
});

// Mock ImageWrapper component
jest.mock('@/components/image/ImageWrapper.dev', () => ({
  Default: React.forwardRef(({ image, className, wrapperClass, sizes, alt, 'aria-hidden': ariaHidden }: any, ref: any) => {
    // Don't render if no image or empty src
    if (!image?.value?.src) {
      return null;
    }
    
    const imgAttributes: any = {
      ref,
      src: image.value.src,
      alt: alt || image?.value?.alt,
      className,
      'aria-hidden': ariaHidden,
      'data-testid': 'image-wrapper',
    };

    // Include width and height if they exist
    if (image.value.width) {
      imgAttributes.width = String(image.value.width);
    }
    if (image.value.height) {
      imgAttributes.height = String(image.value.height);
    }

    // Add data attributes for testing
    if (sizes) {
      imgAttributes['data-sizes'] = sizes;
    }
    if (alt) {
      imgAttributes['data-alt'] = alt;
    }
    
    return React.createElement(
      'div',
      { className: wrapperClass, 'data-testid': 'image-wrapper-container' },
      React.createElement('img', imgAttributes)
    );
  }),
}));

// Mock Breadcrumb components
jest.mock('@/components/ui/breadcrumb', () => ({
  Breadcrumb: ({ children }: any) =>
    React.createElement('nav', { 'data-testid': 'breadcrumb' }, children),
  BreadcrumbList: ({ children }: any) =>
    React.createElement('ol', { 'data-testid': 'breadcrumb-list' }, children),
  BreadcrumbItem: ({ children }: any) =>
    React.createElement('li', { 'data-testid': 'breadcrumb-item' }, children),
  BreadcrumbLink: ({ children, href }: any) =>
    React.createElement('a', { href, 'data-testid': 'breadcrumb-link' }, children),
  BreadcrumbPage: ({ children }: any) =>
    React.createElement('span', { 'data-testid': 'breadcrumb-page' }, children),
  BreadcrumbSeparator: () =>
    React.createElement('span', { 'data-testid': 'breadcrumb-separator' }, '/'),
}));

// Mock Flex components
jest.mock('@/components/flex/Flex.dev', () => ({
  Flex: ({ children, wrap, align, justify, direction, as, gap, className, fullBleed, ...props }: any) => {
    const Tag = as || 'div';
    return React.createElement(
      Tag,
      {
        className,
        'data-testid': 'flex',
        'data-wrap': wrap,
        'data-align': align,
        'data-justify': justify,
        'data-direction': direction,
        'data-gap': gap,
        'data-full-bleed': fullBleed ? 'true' : undefined,
        ...props,
      },
      children
    );
  },
  FlexItem: ({ children, basis, grow, className, ...props }: any) =>
    React.createElement(
      'div',
      {
        'data-testid': 'flex-item',
        'data-basis': basis,
        'data-grow': grow,
        className,
        ...props,
      },
      children
    ),
}));

// Mock Video components
jest.mock('@/components/video/VideoPlayer.dev', () => ({
  VideoPlayer: ({ videoUrl, isPlaying, onPlay, fullScreen, btnClasses }: any) =>
    React.createElement(
      'div',
      {
        'data-testid': 'video-player',
        'data-is-playing': isPlaying,
        'data-full-screen': fullScreen,
      },
      React.createElement(
        'button',
        { onClick: onPlay, className: btnClasses, 'data-testid': 'video-play-button' },
        'Play Video'
      ),
      React.createElement('div', { 'data-testid': 'video-url' }, videoUrl)
    ),
}));

jest.mock('@/components/video/VideoModal.dev', () => ({
  VideoModal: ({ isOpen, onClose, videoUrl }: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'video-modal', 'data-is-open': isOpen },
      React.createElement(
        'button',
        { onClick: onClose, 'data-testid': 'modal-close-button' },
        'Close'
      ),
      React.createElement('div', { 'data-testid': 'modal-video-url' }, videoUrl)
    ),
}));

// Mock video hooks and contexts
export const mockOpenModal = jest.fn();
export const mockCloseModal = jest.fn();

jest.mock('@/hooks/useVideoModal', () => ({
  useVideoModal: () => ({
    isOpen: false,
    openModal: mockOpenModal,
    closeModal: mockCloseModal,
  }),
}));

jest.mock('@/contexts/VideoContext', () => ({
  useVideo: () => ({
    playingVideoId: null,
    setPlayingVideoId: jest.fn(),
  }),
}));

// Mock video utilities
jest.mock('@/utils/video', () => ({
  extractVideoId: jest.fn((url) => {
    if (url?.includes('youtube.com')) return 'dQw4w9WgXcQ';
    if (url?.includes('vimeo.com')) return '123456789';
    return null;
  }),
}));

jest.mock('@/utils/isMobile', () => ({
  isMobile: jest.fn(() => false),
}));

// Mock Portal component
jest.mock('@/components/portal/portal.dev', () => ({
  Portal: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'portal' }, children),
}));

// Mock react-youtube
jest.mock('react-youtube', () => {
  return {
    __esModule: true,
    default: React.forwardRef(({ videoId, opts, className }: any, ref: any) =>
      React.createElement('div', {
        ref,
        'data-testid': 'youtube-player',
        'data-video-id': videoId,
        'data-autoplay': opts?.playerVars?.autoplay,
        className,
      })
    ),
  };
});

// Mock useIntersectionObserver hook
export const mockUseIntersectionObserver = jest.fn();

jest.mock('@/hooks/use-intersection-observer', () => ({
  useIntersectionObserver: (...args: any[]) => {
    // Import the mock from this module
    const { mockUseIntersectionObserver } = require('@/__tests__/testUtils/componentMocks');
    return mockUseIntersectionObserver(...args);
  },
}));

// Set default implementation after mock is created
mockUseIntersectionObserver.mockImplementation(() => [true, { current: null }]);

// Mock useToast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

// Mock Avatar components
jest.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'avatar' }, children),
  AvatarImage: ({ src, alt }: any) =>
    React.createElement('img', { src, alt, 'data-testid': 'avatar-image' }),
  AvatarFallback: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'avatar-fallback' }, children),
}));

// Mock Badge component
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children, className }: any) =>
    React.createElement(
      'div',
      { className, 'data-testid': 'badge' },
      children
    ),
}));

// Mock Toaster component
jest.mock('@/components/ui/toaster', () => ({
  Toaster: () => React.createElement('div', { 'data-testid': 'toaster' }),
}));

// Mock Sheet components
jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'sheet' }, children),
  SheetContent: ({ children, side }: any) =>
    React.createElement('div', { 'data-testid': 'sheet-content', 'data-side': side }, children),
  SheetTrigger: ({ children, asChild }: any) =>
    React.createElement('button', { 'data-testid': 'sheet-trigger', 'data-as-child': asChild }, children),
}));

// Mock NavigationMenu components
jest.mock('@/components/ui/navigation-menu', () => ({
  NavigationMenu: ({ children, className }: any) =>
    React.createElement('nav', { 'data-testid': 'navigation-menu', className }, children),
  NavigationMenuList: ({ children, className }: any) =>
    React.createElement('ul', { 'data-testid': 'navigation-menu-list', className }, children),
  NavigationMenuItem: ({ children, className }: any) =>
    React.createElement('li', { 'data-testid': 'navigation-menu-item', className }, children),
}));

// Mock Radix UI Navigation Menu
jest.mock('@radix-ui/react-navigation-menu', () => ({
  Root: ({ children, className, orientation, ...props }: any) =>
    React.createElement(
      'nav',
      {
        'data-testid': 'navigation-root',
        className,
        'data-orientation': orientation,
        'aria-label': 'Main',
        dir: 'ltr',
        ...props,
      },
      React.createElement('div', { style: { position: 'relative' } }, children)
    ),
  List: ({ children, className }: any) =>
    React.createElement(
      'ul',
      {
        'data-testid': 'navigation-list',
        className,
        'data-orientation': 'vertical',
        dir: 'ltr',
      },
      children
    ),
  Item: ({ children, className }: any) =>
    React.createElement('li', { 'data-testid': 'navigation-item', className }, children),
}));

// Mock Radix UI Icons
jest.mock('@radix-ui/react-icons', () => ({
  ChevronDownIcon: ({ className, ...props }: any) =>
    React.createElement(
      'svg',
      {
        'data-testid': 'chevron-icon',
        className,
        width: '15',
        height: '15',
        viewBox: '0 0 15 15',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
        ...props,
      },
      React.createElement('path', {
        d: 'M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z',
        fill: 'currentColor',
        fillRule: 'evenodd',
        clipRule: 'evenodd',
      })
    ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) =>
    React.createElement('a', { href, 'data-testid': 'next-link', ...props }, children),
}));

// Mock FloatingDock component
jest.mock('@/components/floating-dock/floating-dock.dev', () => ({
  FloatingDock: ({ items }: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'floating-dock' },
      items.map((item: any, index: number) =>
        React.createElement(
          'button',
          {
            key: index,
            onClick: item.onClick,
            'data-testid': `dock-item-${index}`,
          },
          item.title
        )
      )
    ),
}));

// Mock dictionary variables
jest.mock('@/variables/dictionary', () => ({
  dictionaryKeys: {
    ARTICLE_HEADER_BACKTONEWS: 'article-header-backtonews',
    ARTICLE_HEADER_AUTHOR_LABEL: 'article-header-author-label',
    BACK_TO_NEWS: 'back-to-news',
    WRITTEN_BY: 'written-by',
    SHARE: 'share',
  },
}));

// Mock date utilities
jest.mock('@/utils/date-utils', () => ({
  formatDateInUTC: (date: string) => `Formatted: ${date}`,
}));

// Mock carousel API
export const mockApi = {
  on: jest.fn(),
  off: jest.fn(),
  scrollNext: jest.fn(),
  scrollPrev: jest.fn(),
  selectedScrollSnap: jest.fn(() => 0),
  scrollSnapList: jest.fn(() => [0, 1, 2, 3]),
  rootNode: jest.fn(() => ({
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
};

// Mock the carousel component
jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children, setApi, className }: any) => {
    React.useEffect(() => {
      if (setApi) setApi(mockApi);
    }, [setApi]);
    return React.createElement('div', { 
      'data-testid': 'carousel',
      className,
      'data-opts': JSON.stringify({
        align: 'center',
        loop: true,
        skipSnaps: true,
        breakpoints: {}
      }) 
    }, children);
  },
  CarouselContent: ({ children, className }: any) =>
    React.createElement('div', { 'data-testid': 'carousel-content', className }, children),
  CarouselItem: ({ children, className }: any) =>
    React.createElement('div', { 'data-testid': 'carousel-item', className }, children),
  CarouselPrevious: ({ className, onClick, variant }: any) =>
    React.createElement('button', { 
      'data-testid': 'carousel-previous', 
      'data-variant': variant || 'default',
      className,
      onClick 
    }, 'Previous'),
  CarouselNext: ({ className, onClick, variant }: any) =>
    React.createElement('button', { 
      'data-testid': 'carousel-next',
      'data-variant': variant || 'default',
      className, 
      onClick 
    }, 'Next'),
}));

// Mock Meteors component
jest.mock('@/components/magicui/meteors', () => ({
  Meteors: ({ number, minDelay, maxDelay, minDuration, maxDuration, angle, size }: any) =>
    React.createElement('div', {
      'data-testid': 'meteors',
      'data-number': number,
      'data-min-delay': minDelay,
      'data-max-delay': maxDelay,
      'data-min-duration': minDuration,
      'data-max-duration': maxDuration,
      'data-angle': angle,
      'data-size': size,
    }),
}));

// Mock TopicItem component
jest.mock('@/components/topic-listing/TopicItem.dev', () => ({
  TopicItem: ({ link }: any) =>
    link?.jsonValue?.value?.href
      ? React.createElement(
          'a',
          {
            'data-testid': 'topic-item',
            'data-variant': 'topic',
            href: link.jsonValue.value.href,
          },
          link.jsonValue.value.text
        )
      : null,
}));

// Mock TestimonialCarouselItem component
jest.mock('@/components/testimonial-carousel/TestimonialCarouselItem', () => ({
  Default: ({ testimonialAttribution, testimonialQuote }: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'testimonial-item', className: 'px-4' },
      [
        testimonialAttribution?.jsonValue &&
          React.createElement(
            'div',
            { key: 'attribution', className: 'flex flex-col gap-4' },
            React.createElement(
              'div',
              { className: 'flex flex-row gap-[24px]' },
              [
                React.createElement(
                  'svg',
                  {
                    key: 'svg',
                    'aria-hidden': 'true',
                    className: 'text-accent inline-block h-8 w-8',
                    fill: 'none',
                    height: '25',
                    width: '35',
                    xmlns: 'http://www.w3.org/2000/svg',
                  },
                  React.createElement('path', {
                    d: 'M26 25c-5 0-7-2-7-6v-1c0-6 4-13 9-18h7c-4 4-6 7-7 12 2 1 4 3 4 6v1c0 4-2 6-6 6ZM6 25c-4 0-6-2-6-6v-1C0 12 3 5 9 0h7c-4 4-7 7-8 12 3 1 4 3 4 6v1c0 4-2 6-6 6Z',
                    fill: 'currentColor',
                  })
                ),
                React.createElement(
                  'p',
                  {
                    key: 'text',
                    'data-testid': 'testimonial-attribution',
                    className:
                      'text-primary text-sm font-semibold uppercase tracking-wide',
                  },
                  testimonialAttribution.jsonValue.value
                ),
              ]
            )
          ),
        React.createElement(
          'div',
          { key: 'quote', className: 'space-y-4' },
          testimonialQuote?.jsonValue &&
            React.createElement(
              'p',
              {
                'data-testid': 'text-p',
                className:
                  'text-primary @md:text-4xl  @lg:text-5xl font-heading text-3xl font-normal tracking-tight',
              },
              testimonialQuote.jsonValue.value
            )
        ),
      ]
    ),
}));

// Mock window methods
export const mockBack = jest.fn();
export const mockWindowOpen = jest.fn();

Object.defineProperty(window, 'history', {
  value: { back: mockBack },
  writable: true,
});

// Don't mock AnimatedSection - let the real component be tested with CSS styles

// Mock MediaSection component
jest.mock('@/components/media-section/MediaSection.dev', () => ({
  Default: ({ video, image, aspectRatio, className, reducedMotion }: any) => {
    // video can be a string (href) or an object
    const videoSrc = typeof video === 'string' ? video : (video?.jsonValue?.value?.src || video?.value?.src);
    const imageSrc = image?.jsonValue?.value?.src || image?.value?.src || '';
    return React.createElement(
      'div',
      {
        'data-testid': 'media-section',
        'data-video': videoSrc || null,
        'data-image': imageSrc,
        'data-reduced-motion': reducedMotion ? 'true' : 'false',
        className: className || aspectRatio || '',
      },
      videoSrc ? 'Video' : 'Image'
    );
  },
}));

// Mock Logo component
// Note: When testing Logo itself, use the actual implementation
jest.mock('@/components/logo/Logo.dev', () => {
  const testPath = expect.getState().testPath || '';
  const isLogoTest = testPath.includes('Logo.test');

  if (isLogoTest) {
    // When testing Logo, use the actual implementation
    return jest.requireActual('@/components/logo/Logo.dev');
  }

  // For other tests, provide a simple mock
  return {
    Default: ({ logo }: any) =>
      React.createElement(
        'div',
        { 'data-testid': 'logo-component' },
        React.createElement('img', {
          src: logo?.jsonValue?.value?.src || logo?.value?.src || '',
          alt: logo?.jsonValue?.value?.alt || logo?.value?.alt || 'Logo',
        })
      ),
  };
});

// Mock FooterNavigationCallout component
jest.mock('@/components/footer-navigation-callout/FooterNavigationCallout.dev', () => ({
  Default: ({ fields }: any) =>
    React.createElement(
      'div',
      { 'data-testid': 'footer-callout' },
      React.createElement('h3', { 'data-testid': 'callout-title' }, fields?.title?.value || ''),
      React.createElement('p', { 'data-testid': 'callout-description' }, fields?.description?.value || ''),
      fields?.linkOptional?.value?.href &&
        React.createElement(
          'a',
          {
            href: fields.linkOptional.value.href,
            'data-testid': 'callout-link',
          },
          fields.linkOptional.value.text
        )
    ),
}));

Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true,
});

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(() => Promise.resolve()),
  },
});

// Mock radash debounce
jest.mock('radash', () => ({
  debounce: ({ delay: _delay }: any, fn: any) => {
    const debouncedFn = fn;
    debouncedFn.cancel = jest.fn();
    return debouncedFn;
  },
}));

// Mock MultiPromoItem component
jest.mock('@/components/multi-promo/MultiPromoItem.dev', () => ({
  Default: ({ heading, isPageEditing }: any) =>
    React.createElement(
      'div',
      {
        'data-testid': 'multi-promo-item',
        'data-editing': isPageEditing,
      },
      heading?.jsonValue?.value
    ),
}));

// Mock Select components
jest.mock('@/components/ui/select', () => ({
  Select: ({ children, onValueChange, defaultValue }: any) =>
    React.createElement(
      'div',
      { 
        'data-testid': 'select',
        'data-value': defaultValue,
        onClick: () => onValueChange && onValueChange('0')
      },
      children
    ),
  SelectTrigger: ({ children, className, id }: any) =>
    React.createElement(
      'button',
      {
        'data-testid': 'select-trigger',
        className,
        id,
      },
      children
    ),
  SelectValue: ({ placeholder }: any) =>
    React.createElement('span', {}, placeholder),
  SelectContent: ({ children }: any) =>
    React.createElement('div', { 'data-testid': 'select-content' }, children),
  SelectItem: ({ children, value, className }: any) =>
    React.createElement(
      'div',
      {
        'data-testid': 'select-item',
        'data-value': value,
        className,
      },
      children
    ),
}));

// Mock MultiPromoTab component
jest.mock('@/components/multi-promo-tabs/MultiPromoTab.dev', () => ({
  Default: ({ isEditMode, link1, link2, image1, image2 }: any) =>
    React.createElement(
      'div',
      {
        'data-testid': 'promo-tab',
        'data-edit-mode': isEditMode ? 'true' : 'false',
      },
      React.createElement('div', { className: 'multi-promo-tab @md:grid-cols-2 @md:my-16 my-8 grid grid-cols-1 gap-6' }, [
        React.createElement('div', { key: 'item-1', className: 'flex flex-col gap-4' }, [
          React.createElement('div', { key: 'image-1', className: 'overflow-hidden rounded-2xl' },
            React.createElement('div', { 
              'data-testid': 'image-wrapper-container',
              className: 'w-full h-full'
            },
              React.createElement('img', {
                key: 'img',
                src: image1?.jsonValue?.value?.src || '',
                alt: image1?.jsonValue?.value?.alt || '',
                className: 'h-full w-full object-cover',
                'data-testid': 'image-wrapper',
                width: image1?.jsonValue?.value?.width,
                height: image1?.jsonValue?.value?.height,
              })
            )
          ),
          React.createElement('button', {
            key: 'button-1',
            'data-testid': 'hero-button',
            'data-href': link1?.jsonValue?.value?.href || '',
            'data-editing': isEditMode ? 'true' : 'false',
            className: 'bg-popover hover:bg-popover hover:text-popover-foreground text-popover-foreground font-body letter-spacing-[-0.8] flex w-fit items-center gap-2 rounded-lg px-4 py-2',
            icon: { value: 'arrow-up-right' },
            iconclassname: 'h-4 w-4',
          }, link1?.jsonValue?.value?.text || 'Add link')
        ]),
        React.createElement('div', { key: 'item-2', className: 'flex flex-col gap-4' }, [
          React.createElement('div', { key: 'image-2', className: 'overflow-hidden rounded-2xl' },
            React.createElement('div', { 
              'data-testid': 'image-wrapper-container',
              className: 'w-full h-full'
            },
              React.createElement('img', {
                key: 'img',
                src: image2?.jsonValue?.value?.src || '',
                alt: image2?.jsonValue?.value?.alt || '',
                className: 'h-full w-full object-cover',
                'data-testid': 'image-wrapper',
                width: image2?.jsonValue?.value?.width,
                height: image2?.jsonValue?.value?.height,
              })
            )
          ),
          React.createElement('button', {
            key: 'button-2',
            'data-testid': 'hero-button',
            'data-href': link2?.jsonValue?.value?.href || '',
            'data-editing': isEditMode ? 'true' : 'false',
            className: 'bg-popover hover:bg-popover hover:text-popover-foreground text-popover-foreground font-body letter-spacing-[-0.8] flex w-fit items-center gap-2 rounded-lg px-4 py-2',
            icon: { value: 'arrow-up-right' },
            iconclassname: 'h-4 w-4',
          }, link2?.jsonValue?.value?.text || 'Add link')
        ])
      ])
    ),
}));

