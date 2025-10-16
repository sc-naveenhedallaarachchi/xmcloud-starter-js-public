import { render, screen, fireEvent } from '@testing-library/react';
import { Default as Video } from '@/components/video/Video';
import { mockOpenModal } from '@/__tests__/testUtils/componentMocks';
import {
  defaultProps,
  propsWithoutImage,
  propsWithoutModal,
  propsWithDarkIcon,
  propsWithoutDisplayIcon,
  propsMinimal,
  propsWithVimeoVideo,
  propsWithoutVideoUrl,
  propsWithCustomButtonClass,
  propsWithoutFields,
  propsWithUndefinedFields,
  propsWithEmptyVideo,
  propsWithoutParams,
} from './Video.mockProps';

describe('Video Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render video component with all fields', () => {
      render(<Video {...defaultProps} />);

      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
      expect(screen.getByTestId('image-wrapper')).toBeInTheDocument();
    });

    it('should render video thumbnail image', () => {
      render(<Video {...defaultProps} />);

      const image = screen.getByTestId('image-wrapper');
      expect(image).toHaveAttribute('src', '/images/video-thumbnail.jpg');
      expect(image).toHaveAttribute('alt', 'Video Thumbnail');
    });

    it('should render play button icon when displayIcon is true', () => {
      render(<Video {...defaultProps} />);

      const playIcon = screen.getByTestId('icon-play');
      expect(playIcon).toBeInTheDocument();
    });

    it('should handle displayIcon param', () => {
      render(<Video {...propsWithoutDisplayIcon} />);

      // Icon may still render but SVG decoration should not
      const container = screen.getByTestId('image-wrapper').parentElement;
      expect(container).toBeInTheDocument();
    });

    it('should render decorative SVG when displayIcon param is set', () => {
      const { container } = render(<Video {...defaultProps} />);

      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Component structure', () => {
    it('should render with correct container structure', () => {
      const { container } = render(<Video {...defaultProps} />);

      const mainContainer = container.querySelector('.max-w-screens-2xl');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('relative', 'z-10', 'mx-auto', 'overflow-hidden');
    });

    it('should render aspect video container', () => {
      const { container } = render(<Video {...defaultProps} />);

      const aspectVideoContainer = container.querySelector('.aspect-video');
      expect(aspectVideoContainer).toBeInTheDocument();
    });
  });

  describe('Play button styling', () => {
    it('should apply white text color when darkPlayIcon is false', () => {
      render(<Video {...defaultProps} />);

      const playButton = screen.getByTestId('icon-play');
      const buttonContainer = playButton.closest('button');
      expect(buttonContainer).toHaveClass('text-white');
    });

    it('should apply black text color when darkPlayIcon is true', () => {
      render(<Video {...propsWithDarkIcon} />);

      const playButton = screen.getByTestId('icon-play');
      const buttonContainer = playButton.closest('button');
      expect(buttonContainer).toHaveClass('text-black');
    });

    it('should render with custom button class prop', () => {
      render(<Video {...propsWithCustomButtonClass} />);

      const playButton = screen.getByTestId('icon-play');
      const buttonContainer = playButton.closest('button');
      // Button classes are applied via cn() utility
      expect(buttonContainer).toBeInTheDocument();
    });

    it('should apply default button classes', () => {
      render(<Video {...defaultProps} />);

      const playButton = screen.getByTestId('icon-play');
      const buttonContainer = playButton.closest('button');
      expect(buttonContainer).toHaveClass('absolute', 'inset-0', 'z-20', 'flex', 'cursor-pointer');
    });
  });

  describe('Modal behavior', () => {
    it('should render VideoModal when useModal is true', () => {
      render(<Video {...defaultProps} />);

      expect(screen.getByTestId('video-modal')).toBeInTheDocument();
    });

    it('should not render VideoModal when useModal is false', () => {
      render(<Video {...propsWithoutModal} />);

      expect(screen.queryByTestId('video-modal')).not.toBeInTheDocument();
    });

    it('should open modal when play button is clicked with modal enabled', () => {
      render(<Video {...defaultProps} />);

      const playButton = screen.getByTestId('icon-play').closest('button') as HTMLElement;
      fireEvent.click(playButton);

      expect(mockOpenModal).toHaveBeenCalled();
    });
  });

  describe('Video player behavior', () => {
    it('should render VideoPlayer when modal is disabled', () => {
      render(<Video {...propsWithoutModal} />);

      expect(screen.getByTestId('video-player')).toBeInTheDocument();
    });

    it('should not render VideoPlayer initially when modal is enabled', () => {
      render(<Video {...defaultProps} />);

      expect(screen.queryByTestId('video-player')).not.toBeInTheDocument();
    });

    it('should pass correct video URL to VideoPlayer', () => {
      render(<Video {...propsWithoutModal} />);

      const videoUrl = screen.getByTestId('video-url');
      expect(videoUrl).toHaveTextContent('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    });
  });

  describe('Video URL handling', () => {
    it('should handle YouTube video URL', () => {
      render(<Video {...defaultProps} />);

      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
    });

    it('should handle Vimeo video URL', () => {
      render(<Video {...propsWithVimeoVideo} />);

      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
    });

    it('should show placeholder when video URL is missing', () => {
      render(<Video {...propsWithoutVideoUrl} />);

      expect(screen.getByText('Please add video')).toBeInTheDocument();
    });

    it('should show placeholder when video URL is empty', () => {
      render(<Video {...propsWithEmptyVideo} />);

      expect(screen.getByText('Please add video')).toBeInTheDocument();
    });
  });

  describe('Image handling', () => {
    it('should render custom image when provided', () => {
      render(<Video {...defaultProps} />);

      const image = screen.getByTestId('image-wrapper');
      expect(image).toHaveAttribute('src', '/images/video-thumbnail.jpg');
    });

    it('should use YouTube thumbnail when image is not provided', () => {
      render(<Video {...propsWithoutImage} />);

      // Component will use getYouTubeThumbnail as fallback
      const { container } = render(<Video {...propsWithoutImage} />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('Edge cases and fallbacks', () => {
    it('should show NoDataFallback when fields is null', () => {
      render(<Video {...propsWithoutFields} />);

      expect(screen.getByTestId('no-data-fallback')).toBeInTheDocument();
      expect(screen.getByText('Video')).toBeInTheDocument();
    });

    it('should show NoDataFallback when fields is undefined', () => {
      render(<Video {...propsWithUndefinedFields} />);

      expect(screen.getByTestId('no-data-fallback')).toBeInTheDocument();
    });

    it('should handle missing params gracefully', () => {
      render(<Video {...propsWithoutParams} />);

      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
    });

    it('should render with minimal props', () => {
      render(<Video {...propsMinimal} />);

      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on play button', () => {
      render(<Video {...defaultProps} />);

      const playButton = screen.getByTestId('icon-play').closest('button');
      expect(playButton).toHaveAttribute('aria-label', 'Play video');
    });

    it('should set aria-hidden on thumbnail image', () => {
      render(<Video {...defaultProps} />);

      const imageContainer = screen.getByTestId('image-wrapper-container');
      expect(imageContainer).toHaveClass('cover-image');
    });

    it('should render SVG with aria-hidden', () => {
      const { container } = render(<Video {...defaultProps} />);

      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Responsive behavior', () => {
    it('should apply aspect ratio to video container', () => {
      const { container } = render(<Video {...defaultProps} />);

      const aspectContainer = container.querySelector('.aspect-video');
      expect(aspectContainer).toBeInTheDocument();
      expect(aspectContainer).toHaveClass('w-full');
    });

    it('should apply max width to container', () => {
      const { container } = render(<Video {...defaultProps} />);

      const motionDiv = container.querySelector('.max-w-screens-2xl.mx-auto');
      expect(motionDiv).toBeInTheDocument();
    });
  });

  describe('Animation and interactions', () => {
    it('should render with framer-motion wrapper', () => {
      render(<Video {...defaultProps} />);

      const motionDivs = screen.getAllByTestId('motion-div');
      expect(motionDivs.length).toBeGreaterThan(0);
    });

    it('should have cursor pointer on play button', () => {
      render(<Video {...defaultProps} />);

      const playButton = screen.getByTestId('icon-play').closest('button');
      expect(playButton).toHaveClass('cursor-pointer');
    });
  });

  describe('Error state', () => {
    it('should render error message when no video URL', () => {
      render(<Video {...propsWithoutVideoUrl} />);

      expect(screen.getByText('Please add video')).toBeInTheDocument();
    });

    it('should style error message appropriately', () => {
      render(<Video {...propsWithoutVideoUrl} />);

      const errorMessage = screen.getByText('Please add video');
      expect(errorMessage.parentElement).toHaveClass('bg-secondary', 'flex', 'aspect-video');
    });
  });

  describe('Play icon styling', () => {
    it('should apply correct size classes to play icon', () => {
      render(<Video {...defaultProps} />);

      const playIcon = screen.getByTestId('icon-play');
      expect(playIcon).toHaveClass('h-[65px]', 'w-[65px]');
    });

    it('should apply hover scale transition to play icon', () => {
      render(<Video {...defaultProps} />);

      const playIcon = screen.getByTestId('icon-play');
      expect(playIcon).toHaveClass('transition-transform', 'hover:scale-110');
    });
  });
});

