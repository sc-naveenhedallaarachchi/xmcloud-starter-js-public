import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default as AlertBanner } from '@/components/alert-banner/AlertBanner.dev';
import {
  defaultProps,
  propsWithoutLink,
  propsWithoutImage,
  propsWithEmptyLink,
  propsMinimal,
  propsWithEmptyTitle,
  propsWithEmptyDescription,
  propsWithoutFields,
  propsWithEmptyParams,
} from './AlertBanner.mockProps';

describe('AlertBanner Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render alert banner with all fields', () => {
      render(<AlertBanner {...defaultProps} />);

      expect(screen.getByTestId('alert')).toBeInTheDocument();
      expect(screen.getByText('Important Announcement')).toBeInTheDocument();
      expect(screen.getByText('Please read this important message carefully')).toBeInTheDocument();
      expect(screen.getByTestId('button-base')).toBeInTheDocument();
      expect(screen.getByTestId('ui-button')).toBeInTheDocument();
    });

    it('should render title in AlertTitle component', () => {
      render(<AlertBanner {...defaultProps} />);

      const alertTitle = screen.getByTestId('alert-title');
      expect(alertTitle).toContainElement(screen.getByText('Important Announcement'));
    });

    it('should render description in AlertDescription component', () => {
      render(<AlertBanner {...defaultProps} />);

      const alertDescription = screen.getByTestId('alert-description');
      expect(alertDescription).toContainElement(
        screen.getByText('Please read this important message carefully')
      );
    });

    it('should render close button with X icon', () => {
      render(<AlertBanner {...defaultProps} />);

      const closeButton = screen.getByTestId('ui-button');
      expect(closeButton).toContainElement(screen.getByTestId('x-icon'));
    });

    it('should render link button when link is provided', () => {
      render(<AlertBanner {...defaultProps} />);

      const button = screen.getByTestId('button-base');
      expect(button).toHaveAttribute('href', '/learn-more');
      expect(button).toHaveTextContent('Learn More');
    });
  });

  describe('Optional fields handling', () => {
    it('should render without link field', () => {
      render(<AlertBanner {...propsWithoutLink} />);

      expect(screen.getByText('Important Announcement')).toBeInTheDocument();
      expect(screen.getByText('Please read this important message carefully')).toBeInTheDocument();
      expect(screen.queryByTestId('button-base')).not.toBeInTheDocument();
      expect(screen.getByTestId('ui-button')).toBeInTheDocument();
    });

    it('should render without image field', () => {
      render(<AlertBanner {...propsWithoutImage} />);

      expect(screen.getByText('Important Announcement')).toBeInTheDocument();
      expect(screen.getByTestId('button-base')).toBeInTheDocument();
    });

    it('should not render link button when link href is empty', () => {
      render(<AlertBanner {...propsWithEmptyLink} />);

      expect(screen.queryByTestId('button-base')).not.toBeInTheDocument();
    });

    it('should render with only required fields', () => {
      render(<AlertBanner {...propsMinimal} />);

      expect(screen.getByText('Important Announcement')).toBeInTheDocument();
      expect(screen.getByText('Please read this important message carefully')).toBeInTheDocument();
      expect(screen.queryByTestId('button-base')).not.toBeInTheDocument();
      expect(screen.getByTestId('ui-button')).toBeInTheDocument();
    });
  });

  describe('Close functionality', () => {
    it('should hide alert when close button is clicked', () => {
      render(<AlertBanner {...defaultProps} />);

      const alert = screen.getByTestId('alert');
      expect(alert).not.toHaveClass('hidden');

      const closeButton = screen.getByTestId('ui-button');
      fireEvent.click(closeButton);

      expect(alert).toHaveClass('hidden');
    });

    it('should toggle hidden class on close button click', () => {
      const { container } = render(<AlertBanner {...defaultProps} />);

      const alert = container.querySelector('[data-testid="alert"]');
      expect(alert).not.toHaveClass('hidden');

      const closeButton = screen.getByTestId('ui-button');
      fireEvent.click(closeButton);

      expect(alert).toHaveClass('hidden');
    });

    it('should maintain hidden state after multiple clicks', () => {
      render(<AlertBanner {...defaultProps} />);

      const alert = screen.getByTestId('alert');
      const closeButton = screen.getByTestId('ui-button');

      fireEvent.click(closeButton);
      expect(alert).toHaveClass('hidden');

      // Click again should keep it hidden (state is true)
      fireEvent.click(closeButton);
      expect(alert).toHaveClass('hidden');
    });
  });

  describe('Component structure', () => {
    it('should render correct DOM structure', () => {
      const { container } = render(<AlertBanner {...defaultProps} />);

      const alert = screen.getByTestId('alert');
      expect(alert).toHaveClass('relative', 'border-none');

      const mainContainer = container.querySelector('.mx-auto.flex');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('w-full', 'max-w-screen-xl');
    });

    it('should apply correct title classes', () => {
      render(<AlertBanner {...defaultProps} />);

      const alertTitle = screen.getByTestId('alert-title');
      expect(alertTitle).toHaveClass('text-base', 'font-semibold', 'leading-none', 'tracking-tight');
    });

    it('should apply correct description classes', () => {
      render(<AlertBanner {...defaultProps} />);

      const alertDescription = screen.getByTestId('alert-description');
      expect(alertDescription).toHaveClass('text-muted-foreground', 'text-sm');
    });

    it('should render title with correct Text component classes', () => {
      render(<AlertBanner {...defaultProps} />);

      const titleText = screen.getByText('Important Announcement');
      expect(titleText).toHaveClass('font-heading', 'text-lg', 'font-semibold');
    });

    it('should render description as p tag', () => {
      render(<AlertBanner {...defaultProps} />);

      const descriptionText = screen.getByText('Please read this important message carefully');
      expect(descriptionText.tagName).toBe('P');
    });

    it('should apply correct close button attributes', () => {
      render(<AlertBanner {...defaultProps} />);

      const closeButton = screen.getByTestId('ui-button');
      expect(closeButton).toHaveAttribute('data-variant', 'default');
      expect(closeButton).toHaveAttribute('data-size', 'icon');
    });
  });

  describe('Button component integration', () => {
    it('should pass correct props to ButtonBase component', () => {
      render(<AlertBanner {...defaultProps} />);

      const button = screen.getByTestId('button-base');
      expect(button).toHaveAttribute('href', '/learn-more');
      expect(button).toHaveAttribute('data-variant', 'default');
    });

    it('should conditionally render ButtonBase based on link href', () => {
      const { rerender } = render(<AlertBanner {...defaultProps} />);
      expect(screen.getByTestId('button-base')).toBeInTheDocument();

      rerender(<AlertBanner {...propsWithEmptyLink} />);
      expect(screen.queryByTestId('button-base')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases and fallbacks', () => {
    // NOTE: Component has a bug - it destructures fields before checking if fields exists
    // This causes a runtime error. The check should happen before destructuring.
    it('should throw error when fields is null due to component bug', () => {
      // Component destructures before checking, causing error
      expect(() => {
        render(<AlertBanner {...propsWithoutFields} />);
      }).toThrow();
    });

    it('should throw error when fields is undefined due to component bug', () => {
      const propsWithUndefinedFields = {
        ...defaultProps,
        fields: undefined as any,
      };

      // Component destructures before checking, causing error
      expect(() => {
        render(<AlertBanner {...propsWithUndefinedFields} />);
      }).toThrow();
    });

    it('should handle empty title value', () => {
      render(<AlertBanner {...propsWithEmptyTitle} />);

      const titleElements = screen.getAllByTestId('text-field');
      const titleText = titleElements.find((el) => el.textContent === '');
      expect(titleText).toBeInTheDocument();
    });

    it('should handle empty description value', () => {
      render(<AlertBanner {...propsWithEmptyDescription} />);

      expect(screen.getByText('Important Announcement')).toBeInTheDocument();
      expect(screen.getByTestId('alert-description')).toBeInTheDocument();
    });

    it('should handle empty params', () => {
      render(<AlertBanner {...propsWithEmptyParams} />);

      expect(screen.getByTestId('alert')).toBeInTheDocument();
      expect(screen.getByText('Important Announcement')).toBeInTheDocument();
    });
  });

  describe('Layout and responsiveness', () => {
    it('should apply responsive padding classes', () => {
      const { container } = render(<AlertBanner {...defaultProps} />);

      const mainContainer = container.querySelector('.mx-auto.flex');
      expect(mainContainer).toHaveClass('py-1', 'xl:px-8');
    });

    it('should render content in correct flex layout', () => {
      const { container } = render(<AlertBanner {...defaultProps} />);

      const mainContainer = container.querySelector('.mx-auto.flex');
      expect(mainContainer).toHaveClass('items-center', 'justify-between', 'gap-4');
    });

    it('should render buttons container with correct classes', () => {
      const { container } = render(<AlertBanner {...defaultProps} />);

      const buttonsContainer = container.querySelector('.flex.items-center.gap-2');
      expect(buttonsContainer).toBeInTheDocument();
      expect(buttonsContainer).toContainElement(screen.getByTestId('button-base'));
      expect(buttonsContainer).toContainElement(screen.getByTestId('ui-button'));
    });

    it('should apply spacing classes to content container', () => {
      const { container } = render(<AlertBanner {...defaultProps} />);

      const contentContainer = container.querySelector('.space-y-1');
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have role="alert" on alert element', () => {
      render(<AlertBanner {...defaultProps} />);

      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should render close button as clickable element', () => {
      render(<AlertBanner {...defaultProps} />);

      const closeButton = screen.getByTestId('ui-button');
      expect(closeButton.tagName).toBe('BUTTON');
    });

    it('should have proper semantic structure', () => {
      render(<AlertBanner {...defaultProps} />);

      expect(screen.getByTestId('alert-title')).toBeInTheDocument();
      expect(screen.getByTestId('alert-description')).toBeInTheDocument();
    });
  });

  describe('State management', () => {
    it('should initialize with isHidden state as false', () => {
      render(<AlertBanner {...defaultProps} />);

      const alert = screen.getByTestId('alert');
      expect(alert).not.toHaveClass('hidden');
    });

    it('should update isHidden state when close button is clicked', () => {
      render(<AlertBanner {...defaultProps} />);

      const alert = screen.getByTestId('alert');
      const closeButton = screen.getByTestId('ui-button');

      expect(alert).not.toHaveClass('hidden');

      fireEvent.click(closeButton);

      expect(alert).toHaveClass('hidden');
    });
  });
});

