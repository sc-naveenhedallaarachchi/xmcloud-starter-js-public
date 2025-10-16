import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as AccordionBlock } from '@/components/accordion-block/AccordionBlock';
import { AccordionBlockDefault } from '@/components/accordion-block/AccordionBlockDefault.dev';
import { mockUseSitecoreContext } from '@/__tests__/testUtils/componentMocks';
import {
  defaultProps,
  propsWithoutDescription,
  propsWithoutLink,
  propsWithEmptyChildren,
  propsWithoutStyles,
  propsEditing,
  propsWithoutDatasource,
  propsWithoutFields,
  mockPageData,
  mockPageDataEditing,
} from './AccordionBlock.mockProps';

describe('AccordionBlock Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecoreContext.mockReturnValue(mockPageData as any);
  });

  describe('Default export with useSitecore', () => {
    it('should render accordion block with all fields in normal mode', () => {
      render(<AccordionBlock {...defaultProps} />);

      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('Find answers to common questions')).toBeInTheDocument();
      expect(screen.getByTestId('button-base')).toBeInTheDocument();
      expect(screen.getByText('What is this product?')).toBeInTheDocument();
      expect(screen.getByText('How do I use it?')).toBeInTheDocument();
    });

    it('should pass isPageEditing from useSitecore to AccordionBlockDefault', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing as any);
      render(<AccordionBlock {...defaultProps} />);

      // In editing mode, the component should render
      expect(screen.getByTestId('accordion')).toBeInTheDocument();
    });
  });

  describe('AccordionBlockDefault Component', () => {
    describe('Basic rendering', () => {
      it('should render accordion block with all fields', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(screen.getByText('Find answers to common questions')).toBeInTheDocument();
        expect(screen.getByTestId('button-base')).toBeInTheDocument();
        expect(screen.getByTestId('accordion')).toBeInTheDocument();
      });

      it('should render correct number of accordion items', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const accordionItems = screen.getAllByTestId('accordion-item');
        expect(accordionItems).toHaveLength(3);
      });

      it('should render accordion items with correct content', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        expect(screen.getByText('What is this product?')).toBeInTheDocument();
        expect(screen.getByText('How do I use it?')).toBeInTheDocument();
        expect(screen.getByText('What is the pricing?')).toBeInTheDocument();
      });

      it('should render heading as h2 tag', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const heading = screen.getByText('Frequently Asked Questions');
        expect(heading.tagName).toBe('H2');
      });

      it('should render description as p tag', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const description = screen.getByText('Find answers to common questions');
        expect(description.tagName).toBe('P');
      });
    });

    describe('Optional fields handling', () => {
      it('should render without description field', () => {
        render(<AccordionBlockDefault {...propsWithoutDescription} />);

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(screen.queryByText('Find answers to common questions')).not.toBeInTheDocument();
        expect(screen.getByTestId('button-base')).toBeInTheDocument();
      });

      it('should render without link field', () => {
        render(<AccordionBlockDefault {...propsWithoutLink} />);

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(screen.getByText('Find answers to common questions')).toBeInTheDocument();
        expect(screen.queryByTestId('accordion-button')).not.toBeInTheDocument();
      });

      it('should render with empty children array', () => {
        render(<AccordionBlockDefault {...propsWithEmptyChildren} />);

        expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
        expect(screen.queryAllByTestId('accordion-item')).toHaveLength(0);
      });
    });

    describe('Editing mode behavior', () => {
      it('should render all accordion items in editing mode', () => {
        render(<AccordionBlockDefault {...propsEditing} />);

        const accordion = screen.getByTestId('accordion');
        expect(accordion).toBeInTheDocument();
        
        // Verify all accordion items are rendered
        const accordionItems = screen.getAllByTestId('accordion-item');
        expect(accordionItems).toHaveLength(3);
      });

      it('should render properly in editing mode', () => {
        render(<AccordionBlockDefault {...propsEditing} />);

        const accordion = screen.getByTestId('accordion');
        expect(accordion).toBeInTheDocument();
        expect(accordion).toHaveAttribute('data-type', 'multiple');
      });

      it('should allow accordion interaction in normal mode', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const accordion = screen.getByTestId('accordion');
        expect(accordion).toBeInTheDocument();
        expect(accordion).toHaveAttribute('data-type', 'multiple');
      });
    });

    describe('Component structure', () => {
      it('should render correct DOM structure', () => {
        const { container } = render(<AccordionBlockDefault {...defaultProps} />);

        const mainDiv = container.querySelector('[data-component="AccordionBlock"]');
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).toHaveClass('bg-secondary', 'text-secondary-foreground', 'rounded-3xl');
      });

      it('should apply custom styles from params', () => {
        const { container } = render(<AccordionBlockDefault {...defaultProps} />);

        const mainDiv = container.querySelector('[data-component="AccordionBlock"]');
        expect(mainDiv).toHaveClass('custom-accordion-style');
      });

      it('should render without custom styles when not provided', () => {
        const { container } = render(<AccordionBlockDefault {...propsWithoutStyles} />);

        const mainDiv = container.querySelector('[data-component="AccordionBlock"]');
        expect(mainDiv).toBeInTheDocument();
        expect(mainDiv).not.toHaveClass('custom-accordion-style');
      });

      it('should set accordion type to multiple', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const accordion = screen.getByTestId('accordion');
        expect(accordion).toHaveAttribute('data-type', 'multiple');
      });
    });

    describe('Button component integration', () => {
      it('should pass correct link field to Button component', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const button = screen.getByTestId('button-base');
        expect(button).toHaveAttribute('href', '/contact-us');
        expect(button).toHaveTextContent('Contact Us');
      });
    });

    describe('Edge cases and fallbacks', () => {
      it('should render NoDataFallback when fields is null', () => {
        render(<AccordionBlockDefault {...propsWithoutFields} />);

        const fallback = screen.getByTestId('no-data-fallback');
        expect(fallback).toBeInTheDocument();
        expect(fallback).toHaveTextContent('Accordion Block');
      });

      it('should render NoDataFallback when fields is undefined', () => {
        const propsWithUndefinedFields = {
          ...defaultProps,
          fields: undefined as any,
        };

        render(<AccordionBlockDefault {...propsWithUndefinedFields} />);

        const fallback = screen.getByTestId('no-data-fallback');
        expect(fallback).toBeInTheDocument();
      });

      it('should handle missing datasource gracefully', () => {
        render(<AccordionBlockDefault {...propsWithoutDatasource} />);

        expect(screen.queryByText('Frequently Asked Questions')).not.toBeInTheDocument();
        expect(screen.queryAllByTestId('accordion-item')).toHaveLength(0);
      });

      it('should handle undefined children.results', () => {
        const propsWithUndefinedChildren = {
          ...defaultProps,
          fields: {
            data: {
              datasource: {
                heading: defaultProps.fields.data.datasource.heading,
                description: defaultProps.fields.data.datasource.description,
                link: defaultProps.fields.data.datasource.link,
                children: {} as any,
              },
            },
          },
        };

        render(<AccordionBlockDefault {...propsWithUndefinedChildren} />);

        expect(screen.queryAllByTestId('accordion-item')).toHaveLength(0);
      });
    });

    describe('CSS classes and styling', () => {
      it('should apply container query classes', () => {
        const { container } = render(<AccordionBlockDefault {...defaultProps} />);

        const mainDiv = container.querySelector('[data-component="AccordionBlock"]');
        expect(mainDiv).toHaveClass('@container');
      });

      it('should apply correct heading classes', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const heading = screen.getByText('Frequently Asked Questions');
        expect(heading).toHaveClass(
          'font-heading',
          'text-primary',
          'text-5xl',
          'font-normal',
          'tracking-tighter'
        );
      });

      it('should apply correct description classes', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const description = screen.getByText('Find answers to common questions');
        expect(description).toHaveClass('font-body', 'text-base', 'font-normal');
      });
    });

    describe('Accordion item rendering', () => {
      it('should render accordion items in correct order', () => {
        render(<AccordionBlockDefault {...defaultProps} />);

        const accordionItems = screen.getAllByTestId('accordion-item');
        expect(accordionItems[0]).toHaveAttribute('data-value', 'accordion-block-item-1');
        expect(accordionItems[1]).toHaveAttribute('data-value', 'accordion-block-item-2');
        expect(accordionItems[2]).toHaveAttribute('data-value', 'accordion-block-item-3');
      });

      it('should render accordion item descriptions as HTML', () => {
        const { container } = render(<AccordionBlockDefault {...defaultProps} />);

        const descriptions = container.querySelectorAll('[data-testid="accordion-content"] div');
        expect(descriptions[0].innerHTML).toContain(
          '<p>This is a detailed description of the product.</p>'
        );
      });
    });
  });
});

