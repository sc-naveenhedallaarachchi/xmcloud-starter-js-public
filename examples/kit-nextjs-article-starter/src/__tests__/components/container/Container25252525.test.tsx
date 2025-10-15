import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as Container25252525 } from '@/components/container/container-25252525/Container25252525';
import {
  defaultProps,
  propsWithExcludeTopMargin,
  propsWithEmptyPlaceholders,
  mockSitecoreContext,
  mockSitecoreContextEditing,
} from './Container25252525.mockProps';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Placeholder: ({ name }: any) => <div data-testid={`placeholder-${name}`}>Placeholder: {name}</div>,
  useSitecore: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  cn: (...args: any[]) =>
    args
      .flat()
      .filter(Boolean)
      .map((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object') {
          return Object.keys(arg)
            .filter((key) => arg[key])
            .join(' ');
        }
        return '';
      })
      .filter(Boolean)
      .join(' '),
}));

import { useSitecore } from '@sitecore-content-sdk/nextjs';

const mockUseSitecore = useSitecore as jest.MockedFunction<typeof useSitecore>;

describe('Container25252525 Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
  });

  describe('Basic rendering', () => {
    it('should render container with all four placeholders', () => {
      render(<Container25252525 {...defaultProps} />);

      expect(screen.getByTestId('placeholder-container-25-one-main-25')).toBeInTheDocument();
      expect(screen.getByTestId('placeholder-container-25-two-main-25')).toBeInTheDocument();
      expect(screen.getByTestId('placeholder-container-25-three-main-25')).toBeInTheDocument();
      expect(screen.getByTestId('placeholder-container-25-four-main-25')).toBeInTheDocument();
    });

    it('should apply container--25252525 class', () => {
      const { container } = render(<Container25252525 {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('container--25252525');
    });

    it('should apply custom styles', () => {
      const { container } = render(<Container25252525 {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('custom-style');
    });
  });

  describe('Layout structure', () => {
    it('should render four column layout', () => {
      const { container } = render(<Container25252525 {...defaultProps} />);

      const flexWrapper = container.querySelector('.w-full.mx-auto.max-w-\\[1760px\\]');
      expect(flexWrapper).toBeInTheDocument();
      expect(flexWrapper).toHaveClass('flex', 'flex-wrap', 'items-stretch');
    });

    it('should render four FlexItem components', () => {
      const { container } = render(<Container25252525 {...defaultProps} />);

      const flexItems = container.querySelectorAll('.w-full.p-4.mb-4');
      expect(flexItems.length).toBe(4);
    });

    it('should apply responsive column width classes', () => {
      const { container } = render(<Container25252525 {...defaultProps} />);

      const flexItems = container.querySelectorAll('.w-full.p-4.mb-4');
      flexItems.forEach((item) => {
        expect(item).toHaveClass('md:w-1/2', 'lg:w-1/4');
      });
    });
  });

  describe('Margin handling', () => {
    it('should apply default top margin', () => {
      const { container } = render(<Container25252525 {...defaultProps} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('mt-10');
    });

    it('should exclude top margin when excludeTopMargin is 1', () => {
      const { container } = render(<Container25252525 {...propsWithExcludeTopMargin} />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('mt-0');
    });
  });

  describe('Empty placeholder handling', () => {
    it('should not render when placeholders are empty and not editing', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
      const { container } = render(<Container25252525 {...propsWithEmptyPlaceholders} />);

      expect(container.firstChild).toBeNull();
    });

    it('should render when placeholders are empty but in editing mode', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContextEditing as any);
      const { container } = render(<Container25252525 {...propsWithEmptyPlaceholders} />);

      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });
});

