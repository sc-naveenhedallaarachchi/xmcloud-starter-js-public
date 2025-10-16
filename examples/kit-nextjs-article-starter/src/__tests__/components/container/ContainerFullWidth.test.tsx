import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as ContainerFullWidth } from '@/components/container/container-full-width/ContainerFullWidth';
import { mockUseSitecoreContext } from '@/__tests__/testUtils/componentMocks';
import {
  defaultProps,
  propsWithExcludeTopMargin,
  propsWithEmptyPlaceholders,
  propsWithChildren,
  propsWithoutDynamicId,
  mockSitecoreContext,
  mockSitecoreContextEditing,
} from './ContainerFullWidth.mockProps';

describe('ContainerFullWidth Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render container with placeholder', () => {
      const { container } = render(<ContainerFullWidth {...defaultProps} />);

      const section = container.querySelector('section.container--full-width');
      expect(section).toBeInTheDocument();
    });

    it('should render placeholder', () => {
      render(<ContainerFullWidth {...defaultProps} />);

      expect(screen.getByTestId('placeholder-container-fullwidth-main-fullwidth')).toBeInTheDocument();
    });

    it('should apply custom styles', () => {
      const { container } = render(<ContainerFullWidth {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-fullwidth-style');
    });

    it('should apply @container class', () => {
      const { container } = render(<ContainerFullWidth {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('@container', 'container--full-width', 'group');
    });
  });

  describe('Margin handling', () => {
    it('should apply default top margin when excludeTopMargin is 0', () => {
      const { container } = render(<ContainerFullWidth {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('mt-4');
    });

    it('should exclude top margin when excludeTopMargin is 1', () => {
      const { container } = render(<ContainerFullWidth {...propsWithExcludeTopMargin} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('mt-0');
    });
  });

  describe('Layout structure', () => {
    it('should render with Flex wrapper', () => {
      render(<ContainerFullWidth {...defaultProps} />);

      expect(screen.getByTestId('flex')).toBeInTheDocument();
    });

    it('should apply group-[.is-inset]:p-0 class to Flex', () => {
      render(<ContainerFullWidth {...defaultProps} />);

      const flex = screen.getByTestId('flex');
      expect(flex).toHaveClass('group-[.is-inset]:p-0');
    });

    it('should render FlexItem with full basis', () => {
      render(<ContainerFullWidth {...defaultProps} />);

      const flexItem = screen.getByTestId('flex-item');
      expect(flexItem).toHaveAttribute('data-basis', 'full');
    });
  });

  describe('Empty placeholder handling', () => {
    it('should not render when placeholder is empty and not in editing mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockSitecoreContext as any);
      const { container } = render(<ContainerFullWidth {...propsWithEmptyPlaceholders} />);

      expect(container.firstChild).toBeNull();
    });

    it('should render when placeholder is empty but in editing mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockSitecoreContextEditing as any);
      const { container } = render(<ContainerFullWidth {...propsWithEmptyPlaceholders} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should render when children are provided', () => {
      mockUseSitecoreContext.mockReturnValue(mockSitecoreContext as any);
      const propsWithEmptyAndChildren = {
        ...propsWithEmptyPlaceholders,
        children: 'Child content' as any,
      };

      const { container } = render(<ContainerFullWidth {...propsWithEmptyAndChildren} />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });
  });

  describe('Placeholder key generation', () => {
    it('should generate correct placeholder key with DynamicPlaceholderId', () => {
      render(<ContainerFullWidth {...defaultProps} />);

      expect(screen.getByTestId('placeholder-container-fullwidth-main-fullwidth')).toBeInTheDocument();
    });

    it('should generate placeholder key without DynamicPlaceholderId', () => {
      render(<ContainerFullWidth {...propsWithoutDynamicId} />);

      expect(screen.getByTestId('placeholder-container-fullwidth-')).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render section as root element', () => {
      const { container } = render(<ContainerFullWidth {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section?.tagName).toBe('SECTION');
    });

    it('should have correct class hierarchy', () => {
      const { container } = render(<ContainerFullWidth {...defaultProps} />);

      const section = container.querySelector('section');
      const flex = section?.querySelector('[data-testid="flex"]');
      const flexItem = flex?.querySelector('[data-testid="flex-item"]');

      expect(section).toBeInTheDocument();
      expect(flex).toBeInTheDocument();
      expect(flexItem).toBeInTheDocument();
    });
  });
});

