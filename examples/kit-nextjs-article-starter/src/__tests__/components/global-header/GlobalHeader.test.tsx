import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default as GlobalHeader } from '@/components/global-header/GlobalHeader';
import {
  defaultProps,
  propsWithoutLogo,
  propsWithoutLinks,
  propsWithoutContact,
  propsWithEmptyItem,
  mockPageData,
  mockPageDataEditing,
} from './GlobalHeader.mockProps';
import { mockUseSitecoreContext } from '@/__tests__/testUtils/componentMocks';

describe('GlobalHeader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render header with all fields in normal mode', () => {
      render(<GlobalHeader {...defaultProps} />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByTestId('logo-component')).toBeInTheDocument();
      expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
    });

    it('should render header as a header element', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('sticky', 'top-0', 'z-50');
    });

    it('should render logo in Link component when not editing', () => {
      render(<GlobalHeader {...defaultProps} />);

      const logo = screen.getByTestId('logo-component');
      expect(logo).toBeInTheDocument();
      
      const logoLink = logo.closest('a');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render logo as Image when in editing mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<GlobalHeader {...defaultProps} />);

      expect(screen.getByTestId('image-field')).toBeInTheDocument();
    });

    it('should not render logo link when logo value is missing', () => {
      render(<GlobalHeader {...propsWithoutLogo} />);

      expect(screen.queryByTestId('logo-component')).not.toBeInTheDocument();
    });
  });

  describe('Desktop navigation', () => {
    it('should render all navigation links', () => {
      render(<GlobalHeader {...defaultProps} />);

      // Links appear in both desktop and mobile navigation
      expect(screen.getAllByText('About').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Services').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Blog').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
    });

    it('should render navigation links with correct hrefs', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const aboutLinks = screen.getAllByText('About');
      const servicesLinks = screen.getAllByText('Services');
      
      const aboutLink = aboutLinks[0].closest('a');
      const servicesLink = servicesLinks[0].closest('a');
      
      expect(aboutLink).toHaveAttribute('href', '/about');
      expect(servicesLink).toHaveAttribute('href', '/services');
    });

    it('should render navigation with ghost button variant', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const buttons = container.querySelectorAll('[data-variant="ghost"]');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should render header contact CTA button', () => {
      render(<GlobalHeader {...defaultProps} />);

      const ctaButtons = screen.getAllByText('Get Started');
      expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
      
      // Check desktop CTA
      const ctaLink = ctaButtons[0].closest('a');
      expect(ctaLink).toHaveAttribute('href', '/get-started');
    });

    it('should not render CTA when headerContact is missing', () => {
      render(<GlobalHeader {...propsWithoutContact} />);

      expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
    });

    it('should handle empty navigation links', () => {
      render(<GlobalHeader {...propsWithoutLinks} />);

      expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
      expect(screen.queryByText('About')).not.toBeInTheDocument();
    });
  });

  describe('Mobile navigation', () => {
    it('should render mobile menu trigger', () => {
      render(<GlobalHeader {...defaultProps} />);

      expect(screen.getByTestId('sheet-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
    });

    it('should render Sheet component for mobile menu', () => {
      render(<GlobalHeader {...defaultProps} />);

      expect(screen.getByTestId('sheet')).toBeInTheDocument();
      expect(screen.getByTestId('sheet-content')).toBeInTheDocument();
    });

    it('should render Sheet content on the right side', () => {
      render(<GlobalHeader {...defaultProps} />);

      const sheetContent = screen.getByTestId('sheet-content');
      expect(sheetContent).toHaveAttribute('data-side', 'right');
    });

    it('should render navigation links in mobile menu', () => {
      render(<GlobalHeader {...defaultProps} />);

      // All links appear twice - once in desktop nav, once in mobile nav
      const aboutLinks = screen.getAllByText('About');
      expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Editing mode behavior', () => {
    it('should render Sitecore Link components in editing mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<GlobalHeader {...defaultProps} />);

      // In editing mode, links are rendered differently
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByTestId('image-field')).toBeInTheDocument();
    });

    it('should render CTA with Sitecore Link in editing mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<GlobalHeader {...defaultProps} />);

      const ctaButtons = screen.getAllByText('Get Started');
      expect(ctaButtons.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Scroll behavior', () => {
    let addEventListenerSpy: jest.SpyInstance;
    let removeEventListenerSpy: jest.SpyInstance;

    beforeEach(() => {
      addEventListenerSpy = jest.spyOn(window, 'addEventListener');
      removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
      addEventListenerSpy.mockRestore();
      removeEventListenerSpy.mockRestore();
    });

    it('should add scroll event listener on mount', () => {
      render(<GlobalHeader {...defaultProps} />);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });

    it('should remove scroll event listener on unmount', () => {
      const { unmount } = render(<GlobalHeader {...defaultProps} />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );
    });
  });

  describe('Component structure', () => {
    it('should apply container query classes', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const header = container.querySelector('header');
      expect(header).toHaveClass('@container');
    });

    it('should apply correct height class', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const header = container.querySelector('header');
      expect(header).toHaveClass('h-[96px]');
    });

    it('should apply responsive padding classes', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const innerContainer = container.querySelector('.px-4');
      expect(innerContainer).toBeInTheDocument();
      expect(innerContainer).toHaveClass('@xl:px-8', 'max-w-screen-xl');
    });

    it('should apply sticky positioning', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const header = container.querySelector('header');
      expect(header).toHaveClass('sticky', 'top-0', 'z-50');
    });
  });

  describe('Edge cases and fallbacks', () => {
    it('should handle undefined fields gracefully', () => {
      const propsWithUndefinedFields = {
        ...defaultProps,
        fields: undefined as any,
      };

      render(<GlobalHeader {...propsWithUndefinedFields} />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
    });

    it('should handle empty item data', () => {
      render(<GlobalHeader {...propsWithEmptyItem} />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.queryByTestId('logo-component')).not.toBeInTheDocument();
    });

    it('should handle missing children results', () => {
      const propsWithoutChildren = {
        ...defaultProps,
        fields: {
          data: {
            item: {
              logo: defaultProps.fields.data.item.logo,
              children: {} as any,
              headerContact: defaultProps.fields.data.item.headerContact,
            },
          },
        },
      };

      render(<GlobalHeader {...propsWithoutChildren} />);

      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.queryByText('About')).not.toBeInTheDocument();
    });
  });

  describe('CSS classes and styling', () => {
    it('should apply background and border classes', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const header = container.querySelector('header');
      expect(header).toHaveClass('bg-background', 'border-b');
    });

    it('should apply responsive flex classes to desktop nav', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      // Check for the class by looking at the element's className
      const desktopNav = Array.from(container.querySelectorAll('div')).find(
        (div) => div.className && div.className.includes('@lg:flex')
      );
      expect(desktopNav).toBeTruthy();
    });

    it('should hide mobile nav on large screens', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      // Check for the class by looking at the element's className
      const mobileNav = Array.from(container.querySelectorAll('div')).find(
        (div) => div.className && div.className.includes('@lg:hidden')
      );
      expect(mobileNav).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should render header with banner role', () => {
      render(<GlobalHeader {...defaultProps} />);

      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('should provide sr-only text for menu button', () => {
      const { container } = render(<GlobalHeader {...defaultProps} />);

      const srText = container.querySelector('.sr-only');
      expect(srText).toBeInTheDocument();
      expect(srText).toHaveTextContent('Toggle menu');
    });

    it('should render navigation as nav element', () => {
      render(<GlobalHeader {...defaultProps} />);

      expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
    });
  });
});

