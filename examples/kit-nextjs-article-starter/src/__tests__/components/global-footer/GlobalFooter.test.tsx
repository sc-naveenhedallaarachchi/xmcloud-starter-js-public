import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as GlobalFooter } from '@/components/global-footer/GlobalFooter';
import { mockUseSitecoreContext } from '@/__tests__/testUtils/componentMocks';
import {
  defaultProps,
  propsWithoutPromoLink,
  propsWithoutSocialLinks,
  propsWithoutDatasource,
  propsWithoutFields,
  mockPageDataEditing,
} from './GlobalFooter.mockProps';

describe('GlobalFooter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render footer with all fields in normal mode', () => {
      render(<GlobalFooter {...defaultProps} />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByTestId('logo-component')).toBeInTheDocument();
      expect(screen.getByTestId('footer-callout')).toBeInTheDocument();
      expect(screen.getByText('© 2024 Company Name. All rights reserved.')).toBeInTheDocument();
    });

    it('should render footer as a footer element', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const footer = container.querySelector('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('bg-primary', 'text-white');
    });

    it('should render logo section', () => {
      render(<GlobalFooter {...defaultProps} />);

      const logo = screen.getByTestId('logo-component');
      expect(logo).toBeInTheDocument();
      expect(logo.querySelector('img')).toHaveAttribute('src', '/images/footer-logo.svg');
    });

    it('should render placeholder for footer columns', () => {
      render(<GlobalFooter {...defaultProps} />);

      const placeholder = screen.getByTestId('placeholder-container-footer-column');
      expect(placeholder).toBeInTheDocument();
    });

    it('should render callout section with correct data', () => {
      render(<GlobalFooter {...defaultProps} />);

      expect(screen.getByTestId('callout-title')).toHaveTextContent('Stay Connected');
      expect(screen.getByTestId('callout-description')).toHaveTextContent(
        'Subscribe to our newsletter for updates'
      );
      expect(screen.getByTestId('callout-link')).toHaveAttribute('href', '/newsletter');
    });

    it('should render copyright text', () => {
      render(<GlobalFooter {...defaultProps} />);

      const copyrightText = screen.getByText('© 2024 Company Name. All rights reserved.');
      expect(copyrightText).toBeInTheDocument();
      expect(copyrightText).toHaveClass('text-sm', 'text-white/80');
    });
  });

  describe('Social links rendering', () => {
    it('should render all social links', () => {
      render(<GlobalFooter {...defaultProps} />);

      const socialButtons = screen.getAllByTestId('social-link-button');
      expect(socialButtons).toHaveLength(3);
    });

    it('should render social links with correct attributes', () => {
      render(<GlobalFooter {...defaultProps} />);

      const socialButtons = screen.getAllByTestId('social-link-button');
      expect(socialButtons[0]).toHaveAttribute('data-href', 'https://facebook.com');
      expect(socialButtons[1]).toHaveAttribute('data-href', 'https://twitter.com');
      expect(socialButtons[2]).toHaveAttribute('data-href', 'https://instagram.com');
    });

    it('should render social links with ghost variant', () => {
      render(<GlobalFooter {...defaultProps} />);

      const socialButtons = screen.getAllByTestId('social-link-button');
      socialButtons.forEach((button) => {
        expect(button).toHaveAttribute('data-variant', 'ghost');
      });
    });

    it('should render social links with icon size in normal mode', () => {
      render(<GlobalFooter {...defaultProps} />);

      const socialButtons = screen.getAllByTestId('social-link-button');
      socialButtons.forEach((button) => {
        expect(button).toHaveAttribute('data-size', 'icon');
        expect(button).toHaveAttribute('data-editing', 'false');
      });
    });

    it('should render social links with default size in editing mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<GlobalFooter {...defaultProps} />);

      const socialButtons = screen.getAllByTestId('social-link-button');
      socialButtons.forEach((button) => {
        expect(button).toHaveAttribute('data-size', 'default');
        expect(button).toHaveAttribute('data-editing', 'true');
      });
    });

    it('should handle empty social links array', () => {
      render(<GlobalFooter {...propsWithoutSocialLinks} />);

      const socialButtons = screen.queryAllByTestId('social-link-button');
      expect(socialButtons).toHaveLength(0);
    });
  });

  describe('Optional fields handling', () => {
    it('should render without promo link', () => {
      render(<GlobalFooter {...propsWithoutPromoLink} />);

      expect(screen.getByTestId('logo-component')).toBeInTheDocument();
      expect(screen.getByTestId('footer-callout')).toBeInTheDocument();
      expect(screen.queryByTestId('callout-link')).not.toBeInTheDocument();
    });

    it('should render with empty datasource', () => {
      render(<GlobalFooter {...propsWithoutDatasource} />);

      // Component should still render but with no content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.queryByTestId('logo-component')).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render correct grid layout for main content', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('max-w-screen-xl', 'mx-auto');
    });

    it('should render bottom section with border', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const bottomBorder = container.querySelector('.border-t');
      expect(bottomBorder).toBeInTheDocument();
      expect(bottomBorder).toHaveClass('border-white/10');
    });

    it('should apply container query classes', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const footer = container.querySelector('footer');
      expect(footer).toHaveClass('@container');
    });
  });

  describe('Placeholder integration', () => {
    it('should pass rendering object to Placeholder', () => {
      render(<GlobalFooter {...defaultProps} />);

      const placeholder = screen.getByTestId('placeholder-container-footer-column');
      expect(placeholder).toHaveAttribute('data-rendering', 'GlobalFooter');
    });
  });

  describe('Edge cases and fallbacks', () => {
    it('should render NoDataFallback when fields is null', () => {
      render(<GlobalFooter {...propsWithoutFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('Global Footer');
    });

    it('should render NoDataFallback when fields is undefined', () => {
      const propsWithUndefinedFields = {
        ...defaultProps,
        fields: undefined as any,
      };

      render(<GlobalFooter {...propsWithUndefinedFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
    });

    it('should handle missing datasource gracefully', () => {
      render(<GlobalFooter {...propsWithoutDatasource} />);

      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.queryByTestId('callout-title')).toBeInTheDocument();
    });

    it('should handle undefined social links results', () => {
      const propsWithUndefinedSocialLinks = {
        ...defaultProps,
        fields: {
          data: {
            datasource: {
              ...defaultProps.fields.data.datasource,
              footerSocialLinks: {} as any,
            },
          },
        },
      };

      render(<GlobalFooter {...propsWithUndefinedSocialLinks} />);

      const socialButtons = screen.queryAllByTestId('social-link-button');
      expect(socialButtons).toHaveLength(0);
    });
  });

  describe('CSS classes and styling', () => {
    it('should apply responsive grid classes', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toHaveClass('@md:grid-cols-2', '@lg:grid-cols-12');
    });

    it('should apply responsive padding classes', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const contentContainer = container.querySelector('.py-12');
      expect(contentContainer).toBeInTheDocument();
      expect(contentContainer).toHaveClass('px-4', '@xl:px-8');
    });

    it('should style social links container', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const socialContainer = container.querySelector('.flex.space-x-4');
      expect(socialContainer).toBeInTheDocument();
    });

    it('should apply responsive flex classes to bottom section', () => {
      const { container } = render(<GlobalFooter {...defaultProps} />);

      const bottomSection = container.querySelector('.global-footer__bottom');
      expect(bottomSection).toBeInTheDocument();
      expect(bottomSection).toHaveClass('@md:flex-row', 'flex-col');
    });
  });

  describe('Accessibility', () => {
    it('should render footer with contentinfo role', () => {
      render(<GlobalFooter {...defaultProps} />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('should render copyright text with proper encoding disabled', () => {
      render(<GlobalFooter {...defaultProps} />);

      const copyrightText = screen.getByText('© 2024 Company Name. All rights reserved.');
      expect(copyrightText).toBeInTheDocument();
    });
  });
});

