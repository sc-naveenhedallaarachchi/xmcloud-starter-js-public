import React from 'react';
import { render, screen } from '@testing-library/react';
import { AccordionBlockItem } from '@/components/accordion-block/AccordionBlockItem.dev';
import { mockAccordionItem1, mockAccordionItem2 } from './AccordionBlock.mockProps';

describe('AccordionBlockItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render accordion item with heading and description', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      expect(screen.getByText('What is this product?')).toBeInTheDocument();
      expect(screen.getByTestId('rich-text-content')).toBeInTheDocument();
    });

    it('should render heading in trigger', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toContainElement(screen.getByTestId('text-field'));
    });

    it('should render description in content', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const content = screen.getByTestId('accordion-content');
      expect(content).toContainElement(screen.getByTestId('rich-text-content'));
    });

    it('should render description as HTML', () => {
      const { container } = render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const description = container.querySelector('[data-testid="rich-text-content"]');
      expect(description?.innerHTML).toContain(
        '<p>This is a detailed description of the product.</p>'
      );
    });
  });

  describe('Value generation', () => {
    it('should generate correct value with default prefix', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const accordionItem = screen.getByTestId('accordion-item');
      expect(accordionItem).toHaveAttribute('data-value', 'accordion-block-item-1');
    });

    it('should generate correct value with custom prefix', () => {
      render(
        <AccordionBlockItem
          index={2}
          child={mockAccordionItem1}
          valuePrefix="custom-accordion"
        />
      );

      const accordionItem = screen.getByTestId('accordion-item');
      expect(accordionItem).toHaveAttribute('data-value', 'custom-accordion-3');
    });

    it('should generate correct value based on index', () => {
      const { rerender } = render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      let accordionItem = screen.getByTestId('accordion-item');
      expect(accordionItem).toHaveAttribute('data-value', 'accordion-block-item-1');

      rerender(<AccordionBlockItem index={5} child={mockAccordionItem1} />);
      accordionItem = screen.getByTestId('accordion-item');
      expect(accordionItem).toHaveAttribute('data-value', 'accordion-block-item-6');
    });
  });

  describe('Component structure', () => {
    it('should render correct DOM structure', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const accordionItem = screen.getByTestId('accordion-item');
      expect(accordionItem).toHaveClass('border-b');

      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toBeInTheDocument();

      const content = screen.getByTestId('accordion-content');
      expect(content).toBeInTheDocument();
    });

    it('should apply correct trigger classes', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const trigger = screen.getByTestId('accordion-trigger');
      expect(trigger).toHaveClass('font-heading', 'flex', 'items-center', 'justify-between');
    });

    it('should apply correct content classes', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const content = screen.getByTestId('accordion-content');
      expect(content).toHaveClass('overflow-hidden', 'text-sm', 'transition-all');
    });

    it('should wrap description in grid container', () => {
      const { container } = render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const gridContainer = container.querySelector('.font-heading.grid.gap-4.text-sm');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('Multiple items rendering', () => {
    it('should render multiple accordion items correctly', () => {
      const { container } = render(
        <>
          <AccordionBlockItem index={0} child={mockAccordionItem1} />
          <AccordionBlockItem index={1} child={mockAccordionItem2} />
        </>
      );

      expect(screen.getByText('What is this product?')).toBeInTheDocument();
      expect(screen.getByText('How do I use it?')).toBeInTheDocument();
      
      const items = container.querySelectorAll('[data-testid="accordion-item"]');
      expect(items).toHaveLength(2);
    });

    it('should generate unique values for multiple items', () => {
      const { container } = render(
        <>
          <AccordionBlockItem index={0} child={mockAccordionItem1} />
          <AccordionBlockItem index={1} child={mockAccordionItem2} />
        </>
      );

      const items = container.querySelectorAll('[data-testid="accordion-item"]');
      expect(items[0]).toHaveAttribute('data-value', 'accordion-block-item-1');
      expect(items[1]).toHaveAttribute('data-value', 'accordion-block-item-2');
    });
  });

  describe('Edge cases', () => {
    it('should handle missing heading gracefully', () => {
      const itemWithoutHeading = {
        heading: {
          jsonValue: null as any,
        },
        description: mockAccordionItem1.description,
      };

      render(<AccordionBlockItem index={0} child={itemWithoutHeading} />);

      expect(screen.getByTestId('accordion-trigger')).toBeInTheDocument();
    });

    it('should handle missing description gracefully', () => {
      const itemWithoutDescription = {
        heading: mockAccordionItem1.heading,
        description: {
          jsonValue: null as any,
        },
      };

      render(<AccordionBlockItem index={0} child={itemWithoutDescription} />);

      expect(screen.getByTestId('accordion-content')).toBeInTheDocument();
    });

    it('should handle empty heading value', () => {
      const itemWithEmptyHeading = {
        heading: {
          jsonValue: {
            value: '',
            editable: '',
          },
        },
        description: mockAccordionItem1.description,
      };

      render(<AccordionBlockItem index={0} child={itemWithEmptyHeading} />);

      expect(screen.getByTestId('text-field')).toHaveTextContent('');
    });

    it('should handle empty description value', () => {
      const itemWithEmptyDescription = {
        heading: mockAccordionItem1.heading,
        description: {
          jsonValue: {
            value: '',
            editable: '',
          },
        },
      };

      const { container } = render(<AccordionBlockItem index={0} child={itemWithEmptyDescription} />);

      const description = container.querySelector('[data-testid="rich-text-content"]');
      expect(description?.innerHTML).toBe('');
    });
  });

  describe('Index-based behavior', () => {
    it('should handle index 0 correctly', () => {
      render(<AccordionBlockItem index={0} child={mockAccordionItem1} />);

      const accordionItem = screen.getByTestId('accordion-item');
      expect(accordionItem).toHaveAttribute('data-value', 'accordion-block-item-1');
    });

    it('should handle large index numbers correctly', () => {
      render(<AccordionBlockItem index={99} child={mockAccordionItem1} />);

      const accordionItem = screen.getByTestId('accordion-item');
      expect(accordionItem).toHaveAttribute('data-value', 'accordion-block-item-100');
    });
  });
});


