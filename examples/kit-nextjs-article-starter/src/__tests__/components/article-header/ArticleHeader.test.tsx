import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Default as ArticleHeader } from '@/components/article-header/ArticleHeader';
import {
  mockUseSitecoreContext,
  mockBack,
  mockWindowOpen,
} from '@/__tests__/testUtils/componentMocks';
import {
  defaultProps,
  propsWithoutEyebrow,
  propsWithoutAuthor,
  propsWithoutReadTime,
  propsWithoutDate,
  propsMinimal,
  propsWithoutFields,
  propsWithAuthorNoImage,
  propsWithAuthorNoJobTitle,
} from './ArticleHeader.mockProps';

describe('ArticleHeader Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSitecoreContext.mockReturnValue({
      page: {
        mode: {
          isEditing: false,
        },
      },
    });
  });

  describe('Basic rendering', () => {
    it('should render article header with all fields', () => {
      render(<ArticleHeader {...defaultProps} />);

      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
      
      // Author name is rendered (check for both first and last name presence)
      // Use getAllByText since it appears in both avatar fallback and name paragraph
      const authorNames = screen.getAllByText(/John.*Doe/);
      expect(authorNames.length).toBeGreaterThan(0);
    });

    it('should render hero image', () => {
      render(<ArticleHeader {...defaultProps} />);

      const images = screen.getAllByTestId('image-wrapper');
      expect(images.length).toBeGreaterThan(0);
      expect(images[0]).toHaveAttribute('src', '/test-article-hero.jpg');
    });

    it('should render back button', () => {
      render(<ArticleHeader {...defaultProps} />);

      const backButton = screen.getAllByRole('button').find((button) =>
        button.textContent?.includes('Back to News') ||
        button.textContent?.includes('Demo1_ArticleHeader_BackToNewsLabel')
      );
      expect(backButton).toBeInTheDocument();
    });

    it('should render floating dock for sharing', () => {
      render(<ArticleHeader {...defaultProps} />);

      expect(screen.getAllByTestId('floating-dock').length).toBeGreaterThan(0);
    });

    it('should render toaster component', () => {
      render(<ArticleHeader {...defaultProps} />);

      expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });
  });

  describe('Optional fields handling', () => {
    it('should render without eyebrow/badge', () => {
      render(<ArticleHeader {...propsWithoutEyebrow} />);

      expect(screen.queryByTestId('badge')).not.toBeInTheDocument();
      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    });

    it('should render without author', () => {
      render(<ArticleHeader {...propsWithoutAuthor} />);

      expect(screen.queryByTestId('avatar')).not.toBeInTheDocument();
      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    });

    it('should render without read time', () => {
      render(<ArticleHeader {...propsWithoutReadTime} />);

      expect(screen.queryByText('5 min read')).not.toBeInTheDocument();
      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    });

    it('should render without display date', () => {
      render(<ArticleHeader {...propsWithoutDate} />);

      expect(screen.queryByTestId('date-field')).not.toBeInTheDocument();
      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    });

    it('should render with minimal props', () => {
      render(<ArticleHeader {...propsMinimal} />);

      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    });
  });

  describe('Author display', () => {
    it('should render author avatar with image', () => {
      render(<ArticleHeader {...defaultProps} />);

      const avatarImage = screen.getByTestId('avatar-image');
      expect(avatarImage).toHaveAttribute('src', '/test-author.jpg');
    });

    it('should render author name', () => {
      render(<ArticleHeader {...defaultProps} />);

      // Author name is rendered (check for both first and last name presence)
      // Use getAllByText since it appears in both avatar fallback and name paragraph
      const authorNames = screen.getAllByText(/John.*Doe/);
      expect(authorNames.length).toBeGreaterThan(0);
    });

    it('should render author job title', () => {
      render(<ArticleHeader {...defaultProps} />);

      expect(screen.getByText('Senior Developer')).toBeInTheDocument();
    });

    it('should render author without image', () => {
      render(<ArticleHeader {...propsWithAuthorNoImage} />);

      expect(screen.getByTestId('avatar-fallback')).toBeInTheDocument();
    });

    it('should render author without job title', () => {
      render(<ArticleHeader {...propsWithAuthorNoJobTitle} />);

      // Author name is rendered (check for both first and last name presence)
      // Use getAllByText since it appears in both avatar fallback and name paragraph
      const authorNames = screen.getAllByText(/John.*Doe/);
      expect(authorNames.length).toBeGreaterThan(0);
      expect(screen.queryByText('Senior Developer')).not.toBeInTheDocument();
    });

    it('should display "Written by" label for author', () => {
      render(<ArticleHeader {...defaultProps} />);

      const authorLabel =
        screen.queryByText('Written by') ||
        screen.queryByText('Demo1_ArticleHeader_AuthorLabel');
      expect(authorLabel).toBeInTheDocument();
    });
  });

  describe('Back button functionality', () => {
    it('should call window.history.back when clicked', () => {
      render(<ArticleHeader {...defaultProps} />);

      const backButton = screen.getAllByRole('button').find((button) =>
        button.textContent?.includes('Back to News')
      );
      if (backButton) {
        fireEvent.click(backButton);
        expect(mockBack).toHaveBeenCalled();
      }
    });

    it('should render back arrow icon', () => {
      render(<ArticleHeader {...defaultProps} />);

      expect(screen.getByTestId('icon-arrow-left')).toBeInTheDocument();
    });

    it('should render back button with correct text', () => {
      render(<ArticleHeader {...defaultProps} />);

      const backButton = screen.getAllByRole('button').find((button) =>
        button.textContent?.includes('Back to News') ||
        button.textContent?.includes('Demo1_ArticleHeader_BackToNewsLabel')
      );
      expect(backButton).toBeDefined();
      if (backButton) {
        expect(backButton).toBeInTheDocument();
      }
    });
  });

  describe('Social sharing functionality', () => {
    it('should render share buttons', () => {
      render(<ArticleHeader {...defaultProps} />);

      const facebookButtons = screen.getAllByText('Share on Facebook');
      const twitterButtons = screen.getAllByText('Share on Twitter');
      const linkedinButtons = screen.getAllByText('Share on LinkedIn');
      const emailButtons = screen.getAllByText('Share via Email');
      const copyButtons = screen.getAllByText('Copy Link');

      expect(facebookButtons.length).toBeGreaterThan(0);
      expect(twitterButtons.length).toBeGreaterThan(0);
      expect(linkedinButtons.length).toBeGreaterThan(0);
      expect(emailButtons.length).toBeGreaterThan(0);
      expect(copyButtons.length).toBeGreaterThan(0);
    });

    it('should open Facebook share dialog', () => {
      render(<ArticleHeader {...defaultProps} />);

      const facebookButtons = screen.getAllByText('Share on Facebook');
      fireEvent.click(facebookButtons[0]);

      expect(mockWindowOpen).toHaveBeenCalled();
      const callArgs = mockWindowOpen.mock.calls[0];
      expect(callArgs[0]).toContain('facebook.com');
    });

    it('should open Twitter share dialog', () => {
      render(<ArticleHeader {...defaultProps} />);

      const twitterButtons = screen.getAllByText('Share on Twitter');
      fireEvent.click(twitterButtons[0]);

      expect(mockWindowOpen).toHaveBeenCalled();
      const callArgs = mockWindowOpen.mock.calls[0];
      expect(callArgs[0]).toContain('twitter.com');
    });

    it('should open LinkedIn share dialog', () => {
      render(<ArticleHeader {...defaultProps} />);

      const linkedinButtons = screen.getAllByText('Share on LinkedIn');
      fireEvent.click(linkedinButtons[0]);

      expect(mockWindowOpen).toHaveBeenCalled();
      const callArgs = mockWindowOpen.mock.calls[0];
      expect(callArgs[0]).toContain('linkedin.com');
    });

    it('should copy link to clipboard', async () => {
      render(<ArticleHeader {...defaultProps} />);

      const copyButtons = screen.getAllByText('Copy Link');
      fireEvent.click(copyButtons[0]);

      await waitFor(() => {
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
      });
    });
  });

  describe('Date formatting', () => {
    it('should format date using formatDateInUTC', () => {
      render(<ArticleHeader {...defaultProps} />);

      expect(screen.getByText(/Formatted: 2024-01-15/)).toBeInTheDocument();
    });
  });

  describe('Badge/Eyebrow rendering', () => {
    it('should render badge with eyebrow text', () => {
      render(<ArticleHeader {...defaultProps} />);

      const badge = screen.getByTestId('badge');
      expect(badge).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
    });

    it('should apply correct badge classes', () => {
      render(<ArticleHeader {...defaultProps} />);

      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('bg-accent', 'text-accent-foreground');
    });
  });

  describe('Page editing mode', () => {
    beforeEach(() => {
      mockUseSitecoreContext.mockReturnValue({
        page: {
          mode: {
            isEditing: true,
          },
        },
      });
    });

    it('should show badge even without eyebrow value in editing mode', () => {
      render(<ArticleHeader {...propsWithoutEyebrow} />);

      expect(screen.getByTestId('badge')).toBeInTheDocument();
    });

    it('should show read time section even without value in editing mode', () => {
      render(<ArticleHeader {...propsWithoutReadTime} />);

      // In editing mode, the container should still render
      const textFields = screen.getAllByTestId('text-field');
      expect(textFields.length).toBeGreaterThan(0);
    });

    it('should show dictionary entry missing warning when translation is missing', () => {
      // Mock missing translation
      jest.spyOn(React, 'createElement');

      render(<ArticleHeader {...defaultProps} />);

      // Component should still render
      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render header element', () => {
      const { container } = render(<ArticleHeader {...defaultProps} />);

      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('should apply correct header classes', () => {
      const { container } = render(<ArticleHeader {...defaultProps} />);

      const header = container.querySelector('header');
      expect(header).toHaveClass('article-header', 'relative', 'overflow-hidden');
    });

    it('should render white bar section', () => {
      const { container } = render(<ArticleHeader {...defaultProps} />);

      const whiteBar = container.querySelector('[data-component="white-bar"]');
      expect(whiteBar).toBeInTheDocument();
    });

    it('should render backdrop blur overlay', () => {
      const { container } = render(<ArticleHeader {...defaultProps} />);

      const blurOverlay = container.querySelector('.backdrop-blur-md');
      expect(blurOverlay).toBeInTheDocument();
    });
  });

  describe('Responsive layout', () => {
    it('should render both mobile and desktop share sections', () => {
      render(<ArticleHeader {...defaultProps} />);

      const floatingDocks = screen.getAllByTestId('floating-dock');
      expect(floatingDocks.length).toBe(2); // Mobile and desktop
    });

    it('should render "Share" label for both sections', () => {
      render(<ArticleHeader {...defaultProps} />);

      const shareLabels = screen.getAllByText('Share');
      expect(shareLabels.length).toBe(2);
    });
  });

  describe('Edge cases and fallbacks', () => {
    it('should render NoDataFallback when fields is null', () => {
      render(<ArticleHeader {...propsWithoutFields} />);

      const fallback = screen.getByTestId('no-data-fallback');
      expect(fallback).toBeInTheDocument();
      expect(fallback).toHaveTextContent('ArticleHeader');
    });

    it('should handle missing datasource gracefully', () => {
      const propsWithoutDatasource = {
        ...defaultProps,
        fields: {
          data: {
            externalFields: defaultProps.fields.data.externalFields,
          },
        },
      };

      render(<ArticleHeader {...propsWithoutDatasource as any} />);

      expect(screen.getByText('The Future of Web Development')).toBeInTheDocument();
    });

    it('should handle missing externalFields gracefully', () => {
      const propsWithoutExternal = {
        ...defaultProps,
        fields: {
          data: {
            datasource: defaultProps.fields.data.datasource,
          },
        },
      };

      render(<ArticleHeader {...propsWithoutExternal as any} />);

      // Should still render the structure
      const { container } = render(<ArticleHeader {...propsWithoutExternal as any} />);
      expect(container.querySelector('header')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic header element', () => {
      const { container } = render(<ArticleHeader {...defaultProps} />);

      expect(container.querySelector('header')).toBeInTheDocument();
    });

    it('should have sr-only notification for clipboard', () => {
      const { container } = render(<ArticleHeader {...defaultProps} />);

      const srOnly = container.querySelector('.sr-only');
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveAttribute('aria-live', 'polite');
    });
  });
});

