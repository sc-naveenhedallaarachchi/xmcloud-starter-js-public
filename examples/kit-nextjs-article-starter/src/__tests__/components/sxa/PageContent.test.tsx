import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as PageContent } from '@/components/sxa/PageContent';
import {
  defaultProps,
  propsWithEmptyContent,
  propsWithoutStyles,
  propsWithoutId,
  propsWithoutFields,
  propsWithoutContentField,
  propsWithUndefinedParams,
  propsWithNullContent,
  mockSitecoreContext,
  mockSitecoreContextWithoutContent,
} from './PageContent.mockProps';

// Mock Sitecore SDK
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  RichText: ({ field, className }: any) => (
    <div className={className} data-testid="rich-text">
      {field?.value || ''}
    </div>
  ),
  useSitecore: jest.fn(),
}));

import { useSitecore } from '@sitecore-content-sdk/nextjs';

const mockUseSitecore = useSitecore as jest.MockedFunction<typeof useSitecore>;

describe('PageContent Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
  });

  describe('Basic rendering', () => {
    it('should render page content with default structure', () => {
      const { container } = render(<PageContent {...defaultProps} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toBeInTheDocument();
      expect(pageContent).toHaveClass('custom-page-content-style');
    });

    it('should render rich text content', () => {
      render(<PageContent {...defaultProps} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toBeInTheDocument();
      expect(richText).toHaveTextContent('This is page content');
    });

    it('should have correct rendering identifier', () => {
      const { container } = render(<PageContent {...defaultProps} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toHaveAttribute('id', 'page-content-id');
    });

    it('should apply field-content class to rich text', () => {
      render(<PageContent {...defaultProps} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toHaveClass('field-content');
    });
  });

  describe('Component structure', () => {
    it('should render correct DOM structure', () => {
      const { container } = render(<PageContent {...defaultProps} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toBeInTheDocument();

      const componentContent = pageContent?.querySelector('.component-content');
      expect(componentContent).toBeInTheDocument();

      const richText = componentContent?.querySelector('[data-testid="rich-text"]');
      expect(richText).toBeInTheDocument();
    });

    it('should combine component classes correctly', () => {
      const { container } = render(<PageContent {...defaultProps} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toHaveClass('component', 'page-content', 'custom-page-content-style');
    });
  });

  describe('Styles and parameters', () => {
    it('should handle empty Styles parameter', () => {
      const { container } = render(<PageContent {...propsWithoutStyles} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toHaveClass('component', 'page-content');
      expect(pageContent?.className).not.toContain('undefined');
    });

    it('should handle undefined Styles parameter', () => {
      const { container } = render(<PageContent {...propsWithUndefinedParams} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toBeInTheDocument();
    });

    it('should handle empty RenderingIdentifier', () => {
      const { container } = render(<PageContent {...propsWithoutId} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).not.toHaveAttribute('id');
    });

    it('should handle undefined RenderingIdentifier', () => {
      const propsWithUndefinedId = {
        ...defaultProps,
        params: {
          ...defaultProps.params,
          RenderingIdentifier: undefined,
        } as any,
      };

      const { container } = render(<PageContent {...propsWithUndefinedId} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).not.toHaveAttribute('id');
    });
  });

  describe('Fallback rendering', () => {
    it('should render fallback when fields is missing', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContextWithoutContent as any);
      const { container } = render(<PageContent {...propsWithoutFields} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toBeInTheDocument();

      const componentContent = pageContent?.querySelector('.component-content');
      const fallback = componentContent?.querySelector('.field-content');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('[Page Content]');
    });

    it('should render fallback when Content field is missing', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContextWithoutContent as any);
      const { container } = render(<PageContent {...propsWithoutContentField} />);

      const componentContent = container.querySelector('.component-content');
      const fallback = componentContent?.querySelector('.field-content');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('[Page Content]');
    });

    it('should render fallback when Content field is null', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContextWithoutContent as any);
      const { container } = render(<PageContent {...propsWithNullContent} />);

      const componentContent = container.querySelector('.component-content');
      const fallback = componentContent?.querySelector('.field-content');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('[Page Content]');
    });

    it('should render fallback with correct structure', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContextWithoutContent as any);
      const { container } = render(<PageContent {...propsWithoutFields} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toHaveClass('no-fields-style');
      expect(pageContent).toHaveAttribute('id', 'no-fields-id');

      const componentContent = pageContent?.querySelector('.component-content');
      expect(componentContent).toBeInTheDocument();

      const fallback = componentContent?.querySelector('.field-content');
      expect(fallback).toBeInTheDocument();
    });
  });

  describe('Route content fallback', () => {
    it('should use route content when fields.Content is missing', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
      render(<PageContent {...propsWithoutContentField} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toBeInTheDocument();
      expect(richText).toHaveTextContent('Content from route');
    });

    it('should prefer fields.Content over route content', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
      render(<PageContent {...defaultProps} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toHaveTextContent('This is page content');
      expect(richText).not.toHaveTextContent('Content from route');
    });

    it('should use route content when fields is undefined', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
      render(<PageContent {...propsWithoutFields} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toBeInTheDocument();
      expect(richText).toHaveTextContent('Content from route');
    });

    it('should handle empty content gracefully', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
      render(<PageContent {...propsWithEmptyContent} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toBeInTheDocument();
      expect(richText).toHaveTextContent('');
    });
  });

  describe('Edge cases', () => {
    it('should handle missing params gracefully', () => {
      const emptyParams = {} as any;
      const propsWithoutParams = {
        params: emptyParams,
        fields: defaultProps.fields,
      };

      const { container } = render(<PageContent {...propsWithoutParams} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toBeInTheDocument();
    });

    it('should handle undefined page context', () => {
      mockUseSitecore.mockReturnValue({ page: undefined } as any);
      const { container } = render(<PageContent {...propsWithoutFields} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent).toBeInTheDocument();

      const fallback = container.querySelector('.field-content');
      expect(fallback).toHaveTextContent('[Page Content]');
    });

    it('should handle missing route fields', () => {
      mockUseSitecore.mockReturnValue({
        page: {
          layout: {
            sitecore: {
              route: {
                fields: undefined,
              },
            },
          },
        },
      } as any);

      const { container } = render(<PageContent {...propsWithoutContentField} />);

      const fallback = container.querySelector('.field-content');
      expect(fallback).toHaveTextContent('[Page Content]');
    });

    it('should handle null route', () => {
      mockUseSitecore.mockReturnValue({
        page: {
          layout: {
            sitecore: {
              route: null,
            },
          },
        },
      } as any);

      const { container } = render(<PageContent {...propsWithoutFields} />);

      const fallback = container.querySelector('.field-content');
      expect(fallback).toHaveTextContent('[Page Content]');
    });

    it('should trim trailing whitespace from styles', () => {
      const propsWithTrailingSpace = {
        ...defaultProps,
        params: {
          ...defaultProps.params,
          Styles: 'custom-style   ',
        },
      };

      const { container } = render(<PageContent {...propsWithTrailingSpace} />);

      const pageContent = container.querySelector('.component.page-content');
      expect(pageContent?.className).toBe('component page-content custom-style   ');
    });
  });

  describe('Content rendering', () => {
    it('should render HTML content from rich text field', () => {
      render(<PageContent {...defaultProps} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toHaveTextContent('This is page content');
    });

    it('should pass correct field to RichText component', () => {
      render(<PageContent {...defaultProps} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toHaveClass('field-content');
      expect(richText).toHaveTextContent(defaultProps.fields.Content.value || '');
    });

    it('should render route content with correct field class', () => {
      mockUseSitecore.mockReturnValue(mockSitecoreContext as any);
      render(<PageContent {...propsWithoutContentField} />);

      const richText = screen.getByTestId('rich-text');
      expect(richText).toHaveClass('field-content');
    });
  });
});

