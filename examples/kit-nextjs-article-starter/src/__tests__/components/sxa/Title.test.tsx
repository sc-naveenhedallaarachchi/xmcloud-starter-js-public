import React from 'react';
import { render, screen } from '@testing-library/react';
import { Default as Title } from '@/components/sxa/Title';
import {
  defaultProps,
  propsWithoutStyles,
  propsWithoutTag,
  propsWithoutDatasource,
  propsWithEmptyFields,
  mockPageData,
  mockPageDataEditing,
  mockPageDataWithoutTitle,
} from './Title.mockProps';
import { mockUseSitecoreContext } from '@/__tests__/testUtils/componentMocks';

describe('Title Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering in normal mode', () => {
    beforeEach(() => {
      mockUseSitecoreContext.mockReturnValue(mockPageData as any);
    });

    it('should render with page title when available', () => {
      render(<Title {...defaultProps} />);

      expect(screen.getByText('Page Title')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should render with empty text when page title is not available', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataWithoutTitle as any);
      render(<Title {...defaultProps} />);

      const titleElement = screen.getByTestId('text-h1');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toBeEmptyDOMElement();
    });

    it('should render with empty text when datasource is not available', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataWithoutTitle as any);
      render(<Title {...(propsWithoutDatasource as any)} />);

      const titleElement = screen.getByTestId('text-h1');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toBeEmptyDOMElement();
    });

    it('should render with empty text when fields are empty', () => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataWithoutTitle as any);
      render(<Title {...(propsWithEmptyFields as any)} />);

      const titleElement = screen.getByTestId('text-h1');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toBeEmptyDOMElement();
    });

    it('should apply custom styles', () => {
      render(<Title {...defaultProps} />);

      const container = screen.getByText('Page Title').closest('.component.title');
      expect(container).toHaveClass('component', 'title', 'custom-title-style');
    });

    it('should render without custom styles when not provided', () => {
      render(<Title {...propsWithoutStyles} />);

      const container = screen.getByText('Page Title').closest('.component.title');
      expect(container).toHaveClass('component', 'title');
      expect(container).not.toHaveClass('custom-title-style');
    });

    it('should use custom tag when provided', () => {
      render(<Title {...defaultProps} />);

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('should use default tag (span) when not provided', () => {
      render(<Title {...propsWithoutTag} />);

      const titleElement = screen.getByTestId('text-field');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.tagName).toBe('SPAN');
    });

    it('should have correct rendering identifier', () => {
      render(<Title {...defaultProps} />);

      const container = screen.getByText('Page Title').closest('.component.title');
      expect(container).toHaveAttribute('id', 'title-rendering-id');
    });
  });

  describe('Rendering in editing mode', () => {
    beforeEach(() => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing as any);
    });

    it('should render with editable text in editing mode', () => {
      render(<Title {...defaultProps} />);

      const textElement = screen.getByText('Page Title');
      expect(textElement).toHaveAttribute('data-editable', 'true');
    });

    it('should render with editable text when not in normal mode', () => {
      const editingModeData = {
        page: {
          ...mockPageDataEditing.page,
          mode: {
            isEditing: true,
            isNormal: false,
          },
        },
      };
      mockUseSitecoreContext.mockReturnValue(editingModeData as any);
      
      render(<Title {...defaultProps} />);

      const textElement = screen.getByText('Page Title');
      expect(textElement).toHaveAttribute('data-editable', 'true');
    });
  });

  describe('Component structure', () => {
    it('should render correct DOM structure', () => {
      render(<Title {...defaultProps} />);

      const container = screen.getByText('Page Title').closest('.component.title');
      expect(container).toHaveClass('component', 'title', 'custom-title-style');
      
      const contentDiv = container?.querySelector('.component-content');
      expect(contentDiv).toBeInTheDocument();
      
      const titleElement = contentDiv?.querySelector('.field-title');
      expect(titleElement).toBeInTheDocument();
    });

    it('should pass correct props to Text component', () => {
      render(<Title {...defaultProps} />);

      const textElement = screen.getByText('Page Title');
      expect(textElement).toHaveClass('field-title');
      expect(textElement.tagName).toBe('H1');
    });
  });

  describe('Edge cases', () => {
    beforeEach(() => {
      mockUseSitecoreContext.mockReturnValue(mockPageDataEditing as any);
    });

    it('should handle empty field values gracefully', () => {
      const editingContextWithoutTitle = {
        ...mockPageDataEditing,
        page: {
          ...mockPageDataEditing.page,
          layout: {
            sitecore: {
              route: {
                fields: {},
              },
            },
          },
        },
      };
      mockUseSitecoreContext.mockReturnValue(editingContextWithoutTitle as any);
      render(<Title {...(propsWithEmptyFields as any)} />);

      expect(screen.getByText('Add Title')).toBeInTheDocument();
    });

    it('should handle missing params gracefully', () => {
      const propsWithoutParams = {
        params: {},
        fields: defaultProps.fields,
      };
      
      render(<Title {...propsWithoutParams} />);

      expect(screen.getByText('Page Title')).toBeInTheDocument();
    });

    it('should handle missing fields gracefully', () => {
      const propsWithoutFields = {
        params: defaultProps.params,
        fields: null as any,
      };
      
      const editingContextWithoutTitle = {
        ...mockPageDataEditing,
        page: {
          ...mockPageDataEditing.page,
          layout: {
            sitecore: {
              route: {
                fields: {},
              },
            },
          },
        },
      };
      mockUseSitecoreContext.mockReturnValue(editingContextWithoutTitle as any);
      render(<Title {...propsWithoutFields} />);

      expect(screen.getByText('Add Title')).toBeInTheDocument();
    });
  });
});
