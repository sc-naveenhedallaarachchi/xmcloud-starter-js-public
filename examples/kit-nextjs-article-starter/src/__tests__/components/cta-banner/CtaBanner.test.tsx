import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as CtaBanner } from '@/components/cta-banner/CtaBanner';
import { mockUseSitecoreContext } from '@/__tests__/testUtils/componentMocks';
import {
  defaultProps,
  propsWithoutDescription,
  propsWithoutLink,
  propsWithEmptyLink,
  propsWithExternalLink,
  propsMinimal,
  propsWithEmptyValues,
  propsWithPrimaryColorScheme,
  propsWithSecondaryColorScheme,
  propsWithoutColorScheme,
  propsWithoutFields,
} from './CtaBanner.mockProps';

describe('CtaBanner Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render section element', () => {
      const { container } = render(<CtaBanner {...defaultProps} />);

      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should render title', () => {
      render(<CtaBanner {...defaultProps} />);

      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
    });

    it('should render title as h2 tag', () => {
      render(<CtaBanner {...defaultProps} />);

      const title = screen.getByTestId('text-h2');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Ready to Get Started?');
    });

    it('should render description', () => {
      render(<CtaBanner {...defaultProps} />);

      expect(
        screen.getByText('Join thousands of satisfied customers and transform your business today.')
      ).toBeInTheDocument();
    });

    it('should render description as p tag', () => {
      render(<CtaBanner {...defaultProps} />);

      const description = screen.getByTestId('text-p');
      expect(description).toBeInTheDocument();
    });

    it('should render animated section', () => {
      render(<CtaBanner {...defaultProps} />);

      const animatedSection = screen.getByTestId('animated-section');
      expect(animatedSection).toBeInTheDocument();
      expect(animatedSection).toHaveAttribute('data-direction', 'up');
    });

    it('should render button when link is provided', () => {
      render(<CtaBanner {...defaultProps} />);

      expect(screen.getByTestId('ui-button')).toBeInTheDocument();
    });

    it('should render link with correct href', () => {
      render(<CtaBanner {...defaultProps} />);

      const link = screen.getByTestId('sitecore-link');
      expect(link).toHaveAttribute('href', '/contact');
      expect(link).toHaveTextContent('Contact Us');
    });
  });

  describe('Color schemes', () => {
    it('should render with default color scheme', () => {
      const { container } = render(<CtaBanner {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('w-full', 'mx-auto', 'px-6');
    });

    it('should render with primary color scheme', () => {
      const { container } = render(<CtaBanner {...propsWithPrimaryColorScheme} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('should render with secondary color scheme', () => {
      const { container } = render(<CtaBanner {...propsWithSecondaryColorScheme} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('should handle missing color scheme', () => {
      const { container } = render(<CtaBanner {...propsWithoutColorScheme} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should apply color scheme to title', () => {
      render(<CtaBanner {...propsWithPrimaryColorScheme} />);

      const title = screen.getByTestId('text-h2');
      expect(title).toHaveClass('text-primary-foreground');
    });

    it('should apply color scheme to button', () => {
      render(<CtaBanner {...propsWithPrimaryColorScheme} />);

      const button = screen.getByTestId('ui-button');
      expect(button).toHaveClass('bg-accent', 'text-accent-foreground');
    });
  });

  describe('Optional fields', () => {
    it('should render without description', () => {
      render(<CtaBanner {...propsWithoutDescription} />);

      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
      expect(screen.queryByTestId('text-p')).toBeInTheDocument(); // Text component still renders
    });

    it('should render without link', () => {
      render(<CtaBanner {...propsWithoutLink} />);

      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
      expect(screen.queryByTestId('ui-button')).not.toBeInTheDocument();
    });

    it('should render with minimal fields', () => {
      render(<CtaBanner {...propsMinimal} />);

      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
      expect(screen.queryByTestId('ui-button')).not.toBeInTheDocument();
    });
  });

  describe('Link handling', () => {
    it('should render button when link has empty values', () => {
      render(<CtaBanner {...propsWithEmptyLink} />);

      expect(screen.getByTestId('ui-button')).toBeInTheDocument();
    });

    it('should render external link', () => {
      render(<CtaBanner {...propsWithExternalLink} />);

      const link = screen.getByTestId('sitecore-link');
      expect(link).toHaveAttribute('href', 'https://example.com/signup');
      expect(link).toHaveTextContent('Sign Up Now');
    });
  });

  describe('Empty field values', () => {
    it('should handle empty title field', () => {
      render(<CtaBanner {...propsWithEmptyValues} />);

      const title = screen.getByTestId('text-h2');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('');
    });

    it('should handle empty description field', () => {
      render(<CtaBanner {...propsWithEmptyValues} />);

      const description = screen.getByTestId('text-p');
      expect(description).toBeInTheDocument();
      expect(description).toHaveTextContent('');
    });
  });

  describe('Page editing mode', () => {
    beforeEach(() => {
      mockUseSitecoreContext.mockReturnValue({
        page: {
          mode: {
            isEditing: true,
          },
        },
      });
    });

    it('should pass editing mode to animated section', () => {
      render(<CtaBanner {...defaultProps} />);

      const animatedSection = screen.getByTestId('animated-section');
      expect(animatedSection).toHaveAttribute('data-editing', 'true');
    });

    it('should render editable link', () => {
      render(<CtaBanner {...defaultProps} />);

      const link = screen.getByTestId('sitecore-link');
      expect(link).toHaveAttribute('data-editable', 'true');
    });

    it('should render all fields in editing mode', () => {
      render(<CtaBanner {...defaultProps} />);

      expect(screen.getByTestId('text-h2')).toBeInTheDocument();
      expect(screen.getByTestId('text-p')).toBeInTheDocument();
      expect(screen.getByTestId('ui-button')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should render NoDataFallback when fields is null', () => {
      render(<CtaBanner {...propsWithoutFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('CTA Banner');
    });

    it('should handle missing params gracefully', () => {
      const propsWithoutParams = {
        fields: defaultProps.fields,
        params: {} as any,
      } as any;

      render(<CtaBanner {...propsWithoutParams} />);

      expect(screen.getByText('Ready to Get Started?')).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render section with correct classes', () => {
      const { container } = render(<CtaBanner {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('w-full', 'mx-auto', 'px-6', 'py-16');
    });

    it('should render content wrapper with max-width', () => {
      const { container } = render(<CtaBanner {...defaultProps} />);

      const wrapper = container.querySelector('.max-w-4xl');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('mx-auto', 'w-full');
    });

    it('should render title with correct typography classes', () => {
      render(<CtaBanner {...defaultProps} />);

      const title = screen.getByTestId('text-h2');
      expect(title).toHaveClass('mb-6', 'text-4xl', 'font-normal');
    });

    it('should render description with correct typography classes', () => {
      render(<CtaBanner {...defaultProps} />);

      const description = screen.getByTestId('text-p');
      expect(description).toHaveClass('mb-16', 'text-lg', 'antialiased');
    });

    it('should render button with correct typography classes', () => {
      render(<CtaBanner {...defaultProps} />);

      const button = screen.getByTestId('ui-button');
      expect(button).toHaveClass('text-sm', 'font-heading', 'font-medium');
    });
  });

  describe('Button component', () => {
    it('should render button with asChild prop', () => {
      render(<CtaBanner {...defaultProps} />);

      const button = screen.getByTestId('ui-button');
      expect(button).toHaveAttribute('data-as-child', 'true');
    });

    it('should wrap link in button', () => {
      render(<CtaBanner {...defaultProps} />);

      const button = screen.getByTestId('ui-button');
      const link = screen.getByTestId('sitecore-link');

      expect(button).toContainElement(link);
    });
  });

  describe('Accessibility', () => {
    it('should use semantic section element', () => {
      const { container } = render(<CtaBanner {...defaultProps} />);

      expect(container.querySelector('section')).toBeInTheDocument();
    });

    it('should use semantic heading (h2)', () => {
      render(<CtaBanner {...defaultProps} />);

      const heading = screen.getByTestId('text-h2');
      expect(heading).toBeInTheDocument();
    });

    it('should use semantic paragraph for description', () => {
      render(<CtaBanner {...defaultProps} />);

      const paragraph = screen.getByTestId('text-p');
      expect(paragraph).toBeInTheDocument();
    });
  });
});

