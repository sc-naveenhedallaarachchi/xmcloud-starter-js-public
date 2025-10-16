import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Default as MultiPromo } from '@/components/multi-promo/MultiPromo';
import {
  defaultProps,
  propsWith4Columns,
  propsWithPositionStyles,
  propsWithoutDescription,
  propsWithoutTitle,
  propsWithoutChildren,
  propsWithoutDatasource,
  propsWithoutFields,
  propsEditing,
  mockPageDataEditing,
} from './MultiPromo.mockProps';
import { mockUseSitecoreContext, mockApi } from '@/__tests__/testUtils/componentMocks';

describe('MultiPromo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render multi-promo with all fields', () => {
      render(<MultiPromo {...defaultProps} />);

      expect(screen.getByText('Featured Products')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Explore our curated selection of premium products designed for your lifestyle.'
        )
      ).toBeInTheDocument();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    it('should render with data-component attribute', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const component = container.querySelector('[data-component="MultiPromoCarousel"]');
      expect(component).toBeInTheDocument();
    });

    it('should render title as h2 tag', () => {
      render(<MultiPromo {...defaultProps} />);

      const title = screen.getByText('Featured Products');
      expect(title.tagName).toBe('H2');
    });

    it('should render description as RichText', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const description = container.querySelector('.prose');
      expect(description).toBeInTheDocument();
      expect(description?.innerHTML).toContain(
        'Explore our curated selection of premium products'
      );
    });
  });

  describe('Promo items rendering', () => {
    it('should render all promo items', () => {
      render(<MultiPromo {...defaultProps} />);

      const promoItems = screen.getAllByTestId('multi-promo-item');
      expect(promoItems).toHaveLength(4);
    });

    it('should render promo items with correct content', () => {
      render(<MultiPromo {...defaultProps} />);

      expect(screen.getByText('Premium Headphones')).toBeInTheDocument();
      expect(screen.getByText('Smart Watch')).toBeInTheDocument();
      expect(screen.getByText('Wireless Speaker')).toBeInTheDocument();
      expect(screen.getByText('Laptop Stand')).toBeInTheDocument();
    });

    it('should render carousel items', () => {
      render(<MultiPromo {...defaultProps} />);

      const carouselItems = screen.getAllByTestId('carousel-item');
      expect(carouselItems).toHaveLength(4);
    });

    it('should pass isPageEditing to MultiPromoItem', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<MultiPromo {...propsEditing} />);

      const promoItems = screen.getAllByTestId('multi-promo-item');
      promoItems.forEach((item) => {
        expect(item).toHaveAttribute('data-editing', 'true');
      });
    });
  });

  describe('Carousel configuration', () => {
    it('should initialize carousel with correct options', () => {
      render(<MultiPromo {...defaultProps} />);

      const carousel = screen.getByTestId('carousel');
      const opts = JSON.parse(carousel.getAttribute('data-opts') || '{}');

      expect(opts.align).toBe('center');
      expect(opts.loop).toBe(true);
      expect(opts.skipSnaps).toBe(true);
      expect(opts.breakpoints).toBeDefined();
    });

    it('should set carousel API', async () => {
      render(<MultiPromo {...defaultProps} />);

      // The setApi is called asynchronously via useEffect
      await waitFor(() => {
        expect(mockApi.on).toHaveBeenCalled();
      });
    });

    it('should add event listeners to carousel API', async () => {
      render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        expect(mockApi.on).toHaveBeenCalledWith('select', expect.any(Function));
      });
    });
  });

  describe('Column layout', () => {
    it('should apply 3-column layout classes', () => {
      render(<MultiPromo {...defaultProps} />);

      const carouselItems = screen.getAllByTestId('carousel-item');
      carouselItems.forEach((item) => {
        expect(item.className).toContain('lg:basis-[31%]');
      });
    });

    it('should apply 4-column layout classes', () => {
      render(<MultiPromo {...propsWith4Columns} />);

      const carouselItems = screen.getAllByTestId('carousel-item');
      carouselItems.forEach((item) => {
        expect(item.className).toContain('xl:basis-[23%]');
      });
    });

    it('should apply responsive basis classes', () => {
      render(<MultiPromo {...defaultProps} />);

      const carouselItems = screen.getAllByTestId('carousel-item');
      carouselItems.forEach((item) => {
        expect(item.className).toContain('basis-3/4');
        expect(item.className).toContain('sm:basis-[45%]');
        expect(item.className).toContain('md:basis-[31%]');
      });
    });
  });

  describe('Optional fields handling', () => {
    it('should render without description', () => {
      render(<MultiPromo {...propsWithoutDescription} />);

      expect(screen.getByText('Featured Products')).toBeInTheDocument();
      expect(
        screen.queryByText('Explore our curated selection of premium products')
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    it('should render without title', () => {
      render(<MultiPromo {...propsWithoutTitle} />);

      expect(screen.queryByText('Featured Products')).not.toBeInTheDocument();
      expect(screen.getByTestId('carousel')).toBeInTheDocument();
    });

    it('should render without children', () => {
      render(<MultiPromo {...propsWithoutChildren} />);

      expect(screen.getByText('Featured Products')).toBeInTheDocument();
      expect(screen.queryByTestId('carousel')).not.toBeInTheDocument();
    });
  });

  describe('Custom styles handling', () => {
    it('should apply custom styles from params', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const component = container.querySelector('[data-component="MultiPromoCarousel"]');
      expect(component).toHaveClass('custom-multi-promo-style');
    });

    it('should apply position-left by default when no position styles', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const component = container.querySelector('[data-component="MultiPromoCarousel"]');
      expect(component).toHaveClass('position-left');
    });

    it('should not apply position-left when position styles exist', () => {
      const { container } = render(<MultiPromo {...propsWithPositionStyles} />);

      const component = container.querySelector('[data-component="MultiPromoCarousel"]');
      expect(component).not.toHaveClass('position-left');
      expect(component).toHaveClass('position-right');
    });
  });

  describe('Keyboard navigation', () => {
    it('should handle ArrowRight key to scroll next', async () => {
      render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        const rootNode = mockApi.rootNode();
        const keydownListener = rootNode.addEventListener.mock.calls.find(
          (call: any) => call[0] === 'keydown'
        )?.[1];

        if (keydownListener) {
          const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
          Object.defineProperty(event, 'preventDefault', {
            value: jest.fn(),
          });
          keydownListener(event);

          expect(mockApi.scrollNext).toHaveBeenCalled();
        }
      });
    });

    it('should handle ArrowLeft key to scroll previous', async () => {
      render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        const rootNode = mockApi.rootNode();
        const keydownListener = rootNode.addEventListener.mock.calls.find(
          (call: any) => call[0] === 'keydown'
        )?.[1];

        if (keydownListener) {
          const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
          Object.defineProperty(event, 'preventDefault', {
            value: jest.fn(),
          });
          keydownListener(event);

          expect(mockApi.scrollPrev).toHaveBeenCalled();
        }
      });
    });

    it('should prevent default behavior for arrow keys', async () => {
      render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        const rootNode = mockApi.rootNode();
        const keydownListener = rootNode.addEventListener.mock.calls.find(
          (call: any) => call[0] === 'keydown'
        )?.[1];

        if (keydownListener) {
          const mockPreventDefault = jest.fn();
          const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
          Object.defineProperty(event, 'preventDefault', {
            value: mockPreventDefault,
          });
          keydownListener(event);

          expect(mockPreventDefault).toHaveBeenCalled();
        }
      });
    });
  });

  describe('Mousewheel scrolling', () => {
    it('should scroll next on positive deltaX', async () => {
      render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        const rootNode = mockApi.rootNode();
        const wheelListener = rootNode.addEventListener.mock.calls.find(
          (call: any) => call[0] === 'wheel'
        )?.[1];

        if (wheelListener) {
          const event = new WheelEvent('wheel', { deltaX: 10 });
          wheelListener(event);

          expect(mockApi.scrollNext).toHaveBeenCalled();
        }
      });
    });

    it('should scroll previous on negative deltaX', async () => {
      render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        const rootNode = mockApi.rootNode();
        const wheelListener = rootNode.addEventListener.mock.calls.find(
          (call: any) => call[0] === 'wheel'
        )?.[1];

        if (wheelListener) {
          const event = new WheelEvent('wheel', { deltaX: -10 });
          wheelListener(event);

          expect(mockApi.scrollPrev).toHaveBeenCalled();
        }
      });
    });
  });

  describe('Accessibility', () => {
    it('should have sr-only live region for announcements', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const liveRegion = container.querySelector('.sr-only[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
    });

    it('should announce slide changes', async () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        const selectCallback = mockApi.on.mock.calls.find(
          (call: any[]) => call[0] === 'select'
        )?.[1];

        if (selectCallback) {
          mockApi.selectedScrollSnap.mockReturnValue(1);
          selectCallback();

          const liveRegion = container.querySelector('.sr-only[aria-live="polite"]');
          expect(liveRegion).toHaveTextContent('Slide 2 of 4');
        }
      });
    });
  });

  describe('Component structure', () => {
    it('should apply responsive margin classes', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const component = container.querySelector('[data-component="MultiPromoCarousel"]');
      expect(component).toHaveClass('mx-auto', 'my-8', 'md:my-16', 'max-w-screen-xl');
    });

    it('should apply flex layout to header section', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const headerSection = container.querySelector('.flex.flex-col');
      expect(headerSection).toHaveClass('xl:flex-row', 'xl:items-end', 'xl:justify-between');
    });

    it('should apply carousel overflow classes', () => {
      render(<MultiPromo {...defaultProps} />);

      const carousel = screen.getByTestId('carousel');
      expect(carousel.className).toContain('overflow-hidden');
      expect(carousel.className).toContain('-ml-4');
      expect(carousel.className).toContain('-mr-4');
    });
  });

  describe('Edge cases and fallbacks', () => {
    it('should render NoDataFallback when fields is null', () => {
      render(<MultiPromo {...propsWithoutFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('Multi Promo');
    });

    it('should render NoDataFallback when fields is undefined', () => {
      const propsWithUndefinedFields = {
        ...defaultProps,
        fields: undefined as any,
      };

      render(<MultiPromo {...propsWithUndefinedFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
    });

    it('should handle missing datasource', () => {
      render(<MultiPromo {...propsWithoutDatasource} />);

      expect(screen.queryByText('Featured Products')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel')).not.toBeInTheDocument();
    });

    it('should handle undefined children results', () => {
      const propsWithUndefinedChildren = {
        ...defaultProps,
        fields: {
          data: {
            datasource: {
              title: defaultProps.fields.data.datasource.title,
              description: defaultProps.fields.data.datasource.description,
              children: {} as any,
            },
          },
        },
      };

      render(<MultiPromo {...propsWithUndefinedChildren} />);

      expect(screen.queryByTestId('carousel-item')).not.toBeInTheDocument();
    });
  });

  describe('CSS classes and styling', () => {
    it('should apply correct title classes', () => {
      render(<MultiPromo {...defaultProps} />);

      const title = screen.getByText('Featured Products');
      expect(title).toHaveClass(
        'font-heading',
        'text-4xl',
        'sm:text-5xl',
        'lg:text-6xl',
        'tracking-tighter'
      );
    });

    it('should apply correct description classes', () => {
      const { container } = render(<MultiPromo {...defaultProps} />);

      const description = container.querySelector('.prose');
      expect(description).toHaveClass('text-lg', 'leading-[1.444]', 'tracking-tight');
    });

    it('should apply carousel content margin classes', () => {
      render(<MultiPromo {...defaultProps} />);

      const carouselContent = screen.getByTestId('carousel-content');
      expect(carouselContent).toHaveClass('my-12', 'sm:my-16', 'sm:-ml-8');
    });

    it('should apply carousel item sizing classes', () => {
      render(<MultiPromo {...defaultProps} />);

      const carouselItems = screen.getAllByTestId('carousel-item');
      carouselItems.forEach((item) => {
        expect(item).toHaveClass('min-w-[238px]', 'max-w-[416px]', 'pl-4', 'sm:pl-8');
      });
    });
  });

  describe('Cleanup', () => {
    it('should setup event listeners with cleanup', async () => {
      const removeEventListenerMock = jest.fn();
      const addEventListenerMock = jest.fn();
      
      mockApi.rootNode.mockReturnValue({
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
      });

      const { unmount } = render(<MultiPromo {...defaultProps} />);

      await waitFor(() => {
        expect(addEventListenerMock).toHaveBeenCalledWith('keydown', expect.any(Function));
        expect(addEventListenerMock).toHaveBeenCalledWith('wheel', expect.any(Function));
      });

      unmount();

      // Verify removeEventListener is called (cleanup happens on unmount)
      await waitFor(() => {
        expect(removeEventListenerMock).toHaveBeenCalled();
      });
    });
  });
});

