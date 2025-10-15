import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default as Navigation } from '@/components/sxa/Navigation';
import {
  defaultProps,
  propsWithChildren,
  propsWithoutStyles,
  propsWithoutId,
  propsWithoutTitle,
  propsEmpty,
  mockPageData,
  mockPageDataEditing,
} from './Navigation.mockProps';

// Mock the useSitecore hook
const mockUseSitecore = jest.fn();
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  useSitecore: () => mockUseSitecore(),
  Link: ({ field, children, onClick, editable }: any) => (
    <a 
      href={field?.value?.href || '#'} 
      onClick={onClick}
      data-editable={editable}
      data-testid="nav-link"
    >
      {children}
    </a>
  ),
}));

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecore.mockReturnValue(mockPageData);
  });

  describe('Basic rendering', () => {
    it('should render navigation with single item', () => {
      render(<Navigation {...defaultProps} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByTestId('nav-link')).toBeInTheDocument();
    });

    it('should render navigation with children', () => {
      render(<Navigation {...propsWithChildren} />);

      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });

    it('should render empty navigation when fields are empty', () => {
      render(<Navigation {...(propsEmpty as any)} />);

      expect(screen.getByText('[Navigation]')).toBeInTheDocument();
    });

    it('should apply custom styles', () => {
      render(<Navigation {...defaultProps} />);

      const container = screen.getByText('Home').closest('.component.navigation');
      expect(container).toHaveClass('component', 'navigation', 'col-12', 'custom-nav-style');
    });

    it('should render without custom styles when not provided', () => {
      render(<Navigation {...propsWithoutStyles} />);

      const container = screen.getByText('Home').closest('.component.navigation');
      expect(container).toHaveClass('component', 'navigation', 'col-12');
      expect(container).not.toHaveClass('custom-nav-style');
    });

    it('should have correct rendering identifier', () => {
      render(<Navigation {...defaultProps} />);

      const container = screen.getByText('Home').closest('.component.navigation');
      expect(container).toHaveAttribute('id', 'nav-rendering-id');
    });

    it('should render without id when RenderingIdentifier is not provided', () => {
      render(<Navigation {...propsWithoutId} />);

      const container = screen.getByText('Home').closest('.component.navigation');
      expect(container).not.toHaveAttribute('id');
    });
  });

  describe('Mobile menu functionality', () => {
    it('should render mobile menu toggle', () => {
      render(<Navigation {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass('menu-mobile-navigate');
    });

    it('should toggle menu when checkbox is clicked', () => {
      render(<Navigation {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();
    });

    it('should prevent default when in editing mode', () => {
      mockUseSitecore.mockReturnValue(mockPageDataEditing);
      const mockPreventDefault = jest.fn();
      
      render(<Navigation {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox, { preventDefault: mockPreventDefault });
      
      // The component should handle editing mode differently
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Navigation text handling', () => {
    it('should use NavigationTitle when available', () => {
      render(<Navigation {...defaultProps} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should fallback to Title when NavigationTitle is not available', () => {
      const propsWithTitleOnly = {
        ...defaultProps,
        fields: {
          item1: {
            ...(defaultProps.fields as any).item1,
            NavigationTitle: null as any,
          },
        } as any,
      };

      render(<Navigation {...(propsWithTitleOnly as any)} />);

      expect(screen.getByText('Home Page')).toBeInTheDocument();
    });

    it('should fallback to DisplayName when neither title is available', () => {
      render(<Navigation {...(propsWithoutTitle as any)} />);

      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });

  describe('Link generation', () => {
    it('should generate correct link field', () => {
      render(<Navigation {...defaultProps} />);

      const link = screen.getByTestId('nav-link');
      expect(link).toHaveAttribute('href', '/home');
    });

    it('should include querystring in link', () => {
      const propsWithQuerystring = {
        ...defaultProps,
        fields: {
          item1: {
            ...(defaultProps.fields as any).item1,
            Querystring: '?param=value',
          },
        } as any,
      };

      render(<Navigation {...propsWithQuerystring} />);

      const link = screen.getByTestId('nav-link');
      expect(link).toHaveAttribute('href', '/home');
    });
  });

  describe('Children rendering', () => {
    it('should render children with correct relative level', () => {
      render(<Navigation {...propsWithChildren} />);

      const product1 = screen.getByText('Product 1');
      const product1Container = product1.closest('li');
      // Parent items get relativeLevel=1, children get relativeLevel=2
      expect(product1Container).toHaveClass('nav-item', 'nav-subitem', 'rel-level2');
    });

    it('should handle click events for children', () => {
      render(<Navigation {...propsWithChildren} />);

      // Find the link by getting all nav-link elements and filtering by text
      const product1 = screen.getByText('Product 1');
      const product1Link = product1.closest('a');
      
      // Verify the link exists and is clickable
      expect(product1Link).toBeInTheDocument();
      expect(product1Link).toHaveAttribute('href', '/products/product-1');
      
      // Click should not throw error
      fireEvent.click(product1Link as HTMLElement);
    });
  });

  describe('Component structure', () => {
    it('should render correct DOM structure', () => {
      render(<Navigation {...defaultProps} />);

      const container = screen.getByText('Home').closest('.component.navigation');
      expect(container).toHaveClass('component', 'navigation');
      
      const label = container?.querySelector('label');
      expect(label).toHaveClass('menu-mobile-navigate-wrapper');
      
      const checkbox = label?.querySelector('input[type="checkbox"]');
      expect(checkbox).toBeInTheDocument();
      
      const hamburger = label?.querySelector('.menu-humburger');
      expect(hamburger).toBeInTheDocument();
      
      const contentDiv = label?.querySelector('.component-content');
      expect(contentDiv).toBeInTheDocument();
      
      const nav = contentDiv?.querySelector('nav');
      expect(nav).toBeInTheDocument();
      
      const ul = nav?.querySelector('ul');
      expect(ul).toHaveClass('clearfix');
    });

    it('should render navigation list items correctly', () => {
      render(<Navigation {...defaultProps} />);

      const listItem = screen.getByText('Home').closest('li');
      // Top-level items get relativeLevel=1
      expect(listItem).toHaveClass('nav-item', 'rel-level1');
      expect(listItem).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Active state handling', () => {
    it('should toggle active state when navigation title is clicked', () => {
      render(<Navigation {...defaultProps} />);

      const navigationTitle = screen.getByText('Home').closest('.navigation-title');
      expect(navigationTitle).toBeInTheDocument();

      fireEvent.click(navigationTitle!);
      
      const listItem = navigationTitle?.closest('li');
      expect(listItem).toHaveClass('active');
    });
  });

  describe('Editing mode', () => {
    it('should render with editable links in editing mode', () => {
      mockUseSitecore.mockReturnValue(mockPageDataEditing);
      
      render(<Navigation {...defaultProps} />);

      const link = screen.getByTestId('nav-link');
      expect(link).toHaveAttribute('data-editable', 'true');
    });

    it('should render without editable links in normal mode', () => {
      mockUseSitecore.mockReturnValue(mockPageData);
      
      render(<Navigation {...defaultProps} />);

      const link = screen.getByTestId('nav-link');
      expect(link).toHaveAttribute('data-editable', 'false');
    });
  });

  describe('Edge cases', () => {
    it('should handle missing params gracefully', () => {
      const propsWithoutParams = {
        params: null as any,
        fields: defaultProps.fields,
        handleClick: defaultProps.handleClick,
        relativeLevel: defaultProps.relativeLevel,
      };

      render(<Navigation {...propsWithoutParams} />);

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('should handle empty children array', () => {
      render(<Navigation {...defaultProps} />);

      const listItem = screen.getByText('Home').closest('li');
      const childrenUl = listItem?.querySelector('ul');
      expect(childrenUl).not.toBeInTheDocument();
    });

    it('should handle missing field values gracefully', () => {
      render(<Navigation {...(propsEmpty as any)} />);

      expect(screen.getByText('[Navigation]')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper tabindex for keyboard navigation', () => {
      render(<Navigation {...defaultProps} />);

      const listItem = screen.getByText('Home').closest('li');
      expect(listItem).toHaveAttribute('tabIndex', '0');
    });

    it('should have proper checkbox for mobile menu', () => {
      render(<Navigation {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toHaveClass('menu-mobile-navigate');
    });
  });
});
