import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as MultiPromoTabs } from '@/components/multi-promo-tabs/MultiPromoTabs';
import {
  defaultProps,
  propsWithoutDroplistLabel,
  propsWithoutTitle,
  propsWithEmptyChildren,
  propsWithoutDatasource,
  propsWithoutFields,
  propsEditing,
  mockPageData,
  mockPageDataEditing,
} from './MultiPromoTabs.mockProps';
import { mockUseSitecoreContext } from '@/__tests__/testUtils/componentMocks';

describe('MultiPromoTabs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecoreContext.mockReturnValue(mockPageData);
  });

  describe('Basic rendering', () => {
    it('should render with all fields', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      expect(screen.getByText('Explore Our Collections')).toBeInTheDocument();
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
    });

    it('should render title as h2', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      const title = screen.getByText('Explore Our Collections');
      expect(title.tagName).toBe('H2');
    });

    it('should render all tab triggers', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      const tabTriggers = screen.getAllByTestId('tabs-trigger');
      expect(tabTriggers).toHaveLength(3);
      expect(tabTriggers[0]).toHaveTextContent('Electronics');
      expect(tabTriggers[1]).toHaveTextContent('Fashion');
      expect(tabTriggers[2]).toHaveTextContent('Home & Garden');
    });
  });

  describe('Tab switching', () => {
    it('should initialize with first tab active', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      const tabs = screen.getByTestId('tabs');
      expect(tabs).toBeInTheDocument();
      // Verify first tab trigger is rendered
      const tabTriggers = screen.getAllByTestId('tabs-trigger');
      expect(tabTriggers[0]).toHaveAttribute('data-value', '0');
    });

    it('should render tab contents', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      const tabContents = screen.getAllByTestId('tabs-content');
      expect(tabContents).toHaveLength(3);
    });
  });

  describe('Mobile select dropdown', () => {
    it('should render select for mobile', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      expect(screen.getByTestId('select')).toBeInTheDocument();
    });

    it('should render droplist label', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      expect(screen.getByText('Choose a category')).toBeInTheDocument();
    });

    it('should use default label when not provided', () => {
      render(<MultiPromoTabs {...propsWithoutDroplistLabel} />);
      
      expect(screen.getByText('Select a value')).toBeInTheDocument();
    });

    it('should render all select items', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      const selectItems = screen.getAllByTestId('select-item');
      expect(selectItems).toHaveLength(3);
    });
  });

  describe('Editing mode', () => {
    it('should render stacked layout in edit mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<MultiPromoTabs {...propsEditing} />);
      
      const promoTabs = screen.getAllByTestId('promo-tab');
      expect(promoTabs).toHaveLength(3);
      promoTabs.forEach(tab => {
        expect(tab).toHaveAttribute('data-edit-mode', 'true');
      });
    });

    it('should not render tabs component in edit mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<MultiPromoTabs {...propsEditing} />);
      
      expect(screen.queryByTestId('tabs')).not.toBeInTheDocument();
    });

    it('should not render select in edit mode', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing);
      render(<MultiPromoTabs {...propsEditing} />);
      
      expect(screen.queryByTestId('select')).not.toBeInTheDocument();
    });
  });

  describe('Optional fields', () => {
    it('should render without title', () => {
      render(<MultiPromoTabs {...propsWithoutTitle} />);
      
      expect(screen.queryByText('Explore Our Collections')).not.toBeInTheDocument();
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
    });

    it('should handle empty children array', () => {
      render(<MultiPromoTabs {...propsWithEmptyChildren} />);
      
      expect(screen.queryByTestId('tabs-trigger')).not.toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should render NoDataFallback when fields is null', () => {
      render(<MultiPromoTabs {...propsWithoutFields} />);
      
      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toHaveTextContent('Tabbed Multi-Promo');
    });

    it('should handle missing datasource', () => {
      render(<MultiPromoTabs {...propsWithoutDatasource} />);
      
      // When datasource is missing, tabs render but with no children
      expect(screen.getByTestId('tabs')).toBeInTheDocument();
      expect(screen.queryByTestId('tabs-trigger')).not.toBeInTheDocument();
    });
  });

  describe('CSS classes', () => {
    it('should apply container classes', () => {
      const { container } = render(<MultiPromoTabs {...defaultProps} />);
      
      const component = container.querySelector('.multi-promo-tabs');
      expect(component).toHaveClass('@container', 'bg-primary');
    });

    it('should apply title classes', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      const title = screen.getByText('Explore Our Collections');
      expect(title).toHaveClass('font-heading', '@md:text-6xl');
    });
  });

  describe('Accessibility', () => {
    it('should associate label with select', () => {
      render(<MultiPromoTabs {...defaultProps} />);
      
      const label = screen.getByText('Choose a category');
      const selectTrigger = screen.getByTestId('select-trigger');
      
      expect(label.tagName).toBe('LABEL');
      expect(selectTrigger).toHaveAttribute('id');
    });
  });
});

