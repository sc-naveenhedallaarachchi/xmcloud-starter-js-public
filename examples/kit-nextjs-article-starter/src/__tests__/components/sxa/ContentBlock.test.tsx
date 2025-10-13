import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentBlock from '@/components/sxa/ContentBlock';
import {
  defaultProps,
  propsWithEmptyHeading,
  propsWithEmptyContent,
  propsWithComplexContent,
} from './ContentBlock.mockData';

// Mock the Sitecore Content SDK components
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  Text: ({ field, tag, className }: any) => {
    const Tag = tag || 'span';
    return React.createElement(Tag, { className }, field?.value || '');
  },
  RichText: ({ field, className }: any) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: field?.value || '' }} />
  ),
  withDatasourceCheck: () => (Component: any) => Component,
}));

describe('ContentBlock Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render heading and content', () => {
      render(<ContentBlock {...defaultProps} />);

      expect(screen.getByText('Test Heading')).toBeInTheDocument();
      expect(screen.getByText('bold')).toBeInTheDocument();
    });

    it('should render with correct heading tag', () => {
      render(<ContentBlock {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
    });

    it('should render rich text content', () => {
      render(<ContentBlock {...defaultProps} />);

      const contentDiv = screen.getByText('bold').closest('.contentDescription');
      expect(contentDiv).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render correct DOM structure', () => {
      render(<ContentBlock {...defaultProps} />);

      const container = screen.getByText('Test Heading').closest('div');
      expect(container).toHaveClass('contentBlock');
      
      const heading = container?.querySelector('.contentTitle');
      expect(heading).toBeInTheDocument();
      expect(heading?.tagName).toBe('H2');
      
      const content = container?.querySelector('.contentDescription');
      expect(content).toBeInTheDocument();
    });

    it('should apply correct CSS classes', () => {
      render(<ContentBlock {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('contentTitle');
      
      const contentDiv = screen.getByText('bold').closest('.contentDescription');
      expect(contentDiv).toHaveClass('contentDescription');
    });
  });

  describe('Content variations', () => {
    it('should handle empty heading', () => {
      render(<ContentBlock {...propsWithEmptyHeading} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('');
      expect(screen.getByText('This is test content.')).toBeInTheDocument();
    });

    it('should handle empty content', () => {
      render(<ContentBlock {...propsWithEmptyContent} />);

      expect(screen.getByText('Test Heading')).toBeInTheDocument();
      const contentDiv = screen.getByRole('heading', { level: 2 }).closest('div')?.querySelector('.contentDescription');
      expect(contentDiv).toHaveTextContent('');
    });

    it('should handle complex HTML content', () => {
      render(<ContentBlock {...propsWithComplexContent} />);

      expect(screen.getByText('Complex Content Heading')).toBeInTheDocument();
      expect(screen.getByText('Subheading')).toBeInTheDocument();
      expect(screen.getByText('List item 1')).toBeInTheDocument();
      expect(screen.getByText('List item 2')).toBeInTheDocument();
      expect(screen.getByText('This is a quote')).toBeInTheDocument();
    });
  });

  describe('Field props passing', () => {
    it('should pass correct props to Text component for heading', () => {
      render(<ContentBlock {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('contentTitle');
      expect(heading).toHaveTextContent('Test Heading');
    });

    it('should pass correct props to RichText component for content', () => {
      render(<ContentBlock {...defaultProps} />);

      const contentDiv = screen.getByText('bold').closest('.contentDescription');
      expect(contentDiv).toHaveClass('contentDescription');
    });
  });

  describe('HTML rendering', () => {
    it('should render HTML tags in rich text content', () => {
      render(<ContentBlock {...defaultProps} />);

      const strongElement = screen.getByText('bold');
      expect(strongElement).toBeInTheDocument();
      expect(strongElement.tagName).toBe('STRONG');
    });

    it('should render complex HTML structure', () => {
      render(<ContentBlock {...propsWithComplexContent} />);

      // Check for various HTML elements
      expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2); // Main heading and subheading
      expect(screen.getByText('List item 1')).toBeInTheDocument();
      expect(screen.getByText('List item 2')).toBeInTheDocument();
      
      // Check for blockquote
      const blockquote = screen.getByText('This is a quote').closest('blockquote');
      expect(blockquote).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle missing fields gracefully', () => {
      const propsWithoutFields = {
        ...defaultProps,
        fields: null as any,
      };

      // This should not throw an error due to withDatasourceCheck
      expect(() => render(<ContentBlock {...propsWithoutFields} />)).not.toThrow();
    });

    it('should handle undefined field values', () => {
      const propsWithUndefinedFields = {
        ...defaultProps,
        fields: {
          heading: { value: undefined } as any,
          content: { value: undefined } as any,
        },
      };

      render(<ContentBlock {...propsWithUndefinedFields} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('');
      
      const contentDiv = heading.closest('div')?.querySelector('.contentDescription');
      expect(contentDiv).toHaveTextContent('');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      render(<ContentBlock {...defaultProps} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Test Heading');
    });

    it('should maintain semantic structure with complex content', () => {
      render(<ContentBlock {...propsWithComplexContent} />);

      const headings = screen.getAllByRole('heading', { level: 2 });
      expect(headings[0]).toHaveTextContent('Complex Content Heading');
      expect(headings[1]).toHaveTextContent('Subheading');
    });
  });
});
