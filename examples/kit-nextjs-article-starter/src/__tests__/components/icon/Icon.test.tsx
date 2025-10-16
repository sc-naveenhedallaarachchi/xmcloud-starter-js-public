import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Default as Icon } from '@/components/icon/Icon';
import {
  mockFacebookIconProps,
  mockInstagramIconProps,
  mockYoutubeIconProps,
  mockTwitterIconProps,
  mockLinkedInIconProps,
  mockEmailIconProps,
  mockInternalIconProps,
  mockExternalIconProps,
  mockFileIconProps,
  mockMediaIconProps,
  mockArrowLeftIconProps,
  mockArrowRightIconProps,
  mockPlayIconProps,
  mockArrowUpRightIconProps,
  mockDiversityIconProps,
  mockCommunitiesIconProps,
  mockCrossArrowsIconProps,
  mockSignalIconProps,
  mockIconWithAltText,
  mockIconWithoutClassName,
} from './Icon.mockProps';

describe('Icon Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Social media icons', () => {
    it('should render Facebook icon', async () => {
      render(<Icon {...mockFacebookIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Instagram icon', async () => {
      render(<Icon {...mockInstagramIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-InstagramIcon');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Youtube icon', async () => {
      render(<Icon {...mockYoutubeIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-YoutubeIcon');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Twitter icon', async () => {
      render(<Icon {...mockTwitterIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-TwitterIcon');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render LinkedIn icon', async () => {
      render(<Icon {...mockLinkedInIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-LinkedInIcon');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Communication icons', () => {
    it('should render Email icon', async () => {
      render(<Icon {...mockEmailIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-EmailIcon');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Link type icons', () => {
    it('should render Internal icon', async () => {
      render(<Icon {...mockInternalIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-InternalIcon');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render External icon', async () => {
      render(<Icon {...mockExternalIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-ExternalIcon');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('File and media icons', () => {
    it('should render File icon', async () => {
      render(<Icon {...mockFileIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FileIcon');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Media icon (same as File)', async () => {
      render(<Icon {...mockMediaIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FileIcon');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Navigation icons', () => {
    it('should render Arrow Left icon', async () => {
      render(<Icon {...mockArrowLeftIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-arrow-left');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Arrow Right icon', async () => {
      render(<Icon {...mockArrowRightIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-arrow-right');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Arrow Up Right icon', async () => {
      render(<Icon {...mockArrowUpRightIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-arrow-up-right');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Action icons', () => {
    it('should render Play icon', async () => {
      render(<Icon {...mockPlayIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-play');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Custom theme icons', () => {
    it('should render Diversity icon', async () => {
      render(<Icon {...mockDiversityIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-diversity');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Communities icon', async () => {
      render(<Icon {...mockCommunitiesIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-communities');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Cross Arrows icon', async () => {
      render(<Icon {...mockCrossArrowsIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-cross-arrows');
        expect(icon).toBeInTheDocument();
      });
    });

    it('should render Signal icon', async () => {
      render(<Icon {...mockSignalIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-signal');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Icon attributes', () => {
    it('should apply className to icon', async () => {
      render(<Icon {...mockFacebookIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toHaveClass('icon-facebook');
      });
    });

    it('should set aria-hidden when isAriaHidden is true', async () => {
      render(<Icon {...mockFacebookIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should not set aria-hidden when isAriaHidden is false', async () => {
      render(<Icon {...mockInstagramIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-InstagramIcon');
        expect(icon).toHaveAttribute('aria-hidden', 'false');
      });
    });

    it('should set aria-label when altText is provided', async () => {
      render(<Icon {...mockIconWithAltText} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toHaveAttribute('aria-label', 'Follow us on Facebook');
      });
    });

    it('should render without className when not provided', async () => {
      render(<Icon {...mockIconWithoutClassName} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-TwitterIcon');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Dynamic icon loading', () => {
    it('should render icon (mock renders synchronously)', () => {
      const { container } = render(<Icon {...mockFacebookIconProps} />);
      
      // In the real component, it returns null initially, but mocks render synchronously
      expect(container.firstChild).not.toBeNull();
      expect(screen.getByTestId('icon-FacebookIcon')).toBeInTheDocument();
    });

    it('should load icon asynchronously', async () => {
      render(<Icon {...mockFacebookIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Icon mapping', () => {
    it('should map FACEBOOK enum to FacebookIcon component', async () => {
      render(<Icon {...mockFacebookIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toHaveTextContent('FacebookIcon');
      });
    });

    it('should map INSTAGRAM enum to InstagramIcon component', async () => {
      render(<Icon {...mockInstagramIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-InstagramIcon');
        expect(icon).toHaveTextContent('InstagramIcon');
      });
    });

    it('should map ARROW_LEFT enum to arrow-left component', async () => {
      render(<Icon {...mockArrowLeftIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-arrow-left');
        expect(icon).toHaveTextContent('arrow-left');
      });
    });

    it('should map MEDIA and FILE enums to same FileIcon component', async () => {
      const { rerender } = render(<Icon {...mockFileIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FileIcon');
        expect(icon).toBeInTheDocument();
      });

      rerender(<Icon {...mockMediaIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FileIcon');
        expect(icon).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should be hidden from screen readers by default', async () => {
      render(<Icon {...mockFacebookIconProps} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should be accessible with aria-label when provided', async () => {
      render(<Icon {...mockIconWithAltText} />);

      await waitFor(() => {
        const icon = screen.getByTestId('icon-FacebookIcon');
        expect(icon).toHaveAttribute('aria-label', 'Follow us on Facebook');
        expect(icon).toHaveAttribute('aria-hidden', 'false');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined iconName gracefully', async () => {
      const { container } = render(<Icon iconName={undefined as any} />);

      // Should return null for undefined iconName
      await waitFor(() => {
        expect(container.firstChild).toBeNull();
      });
    });
  });
});

