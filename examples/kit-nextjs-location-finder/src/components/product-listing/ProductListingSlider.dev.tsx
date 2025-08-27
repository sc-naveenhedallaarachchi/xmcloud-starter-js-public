import { Text } from '@sitecore-content-sdk/nextjs';
import React, { useState, useMemo } from 'react';
import { NoDataFallback } from '@/utils/NoDataFallback';
import { Default as AnimatedSection } from '@/components/animated-section/AnimatedSection.dev';
import { ProductListingProps } from './product-listing.props';
import { ProductListingCard } from './ProductListingCard.dev';
import { useMatchMedia } from '@/hooks/use-match-media';
import { cn } from '@/lib/utils';
import {
  SlideCarousel,
  SlideCarouselItemWrap,
} from '@/components/slide-carousel/SlideCarousel.dev';

export const ProductListingSlider: React.FC<ProductListingProps> = (props) => {
  const isReducedMotion = useMatchMedia('(prefers-reduced-motion: reduce)');
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { fields, isPageEditing } = props;

  // Defensive data access pattern like LocationSearch
  const datasource = useMemo(() => fields?.data?.datasource || {}, [fields?.data?.datasource]);
  const { products, title, viewAllLink } = datasource;

  // More robust product access
  const sitecoreProducts = useMemo(() => {
    return products?.targetItems || [];
  }, [products?.targetItems]);

  // Handle design library preview when datasource is null
  if (!fields?.data?.datasource) {
    return (
      <div className="@container transform-gpu border-b-2 border-t-2 [.border-b-2+&]:border-t-0">
        <div className="@md:py-20 @lg:py-28 py-12">
          <div className="@xl:px-0 @md:pb-0 mx-auto max-w-screen-xl px-0 pb-10 [&:not(.px-6_&):not(.px-8_&):not(.px-10_&)]:px-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Product Listing Slider</h3>
              <p className="text-gray-600">
                No datasource configured. Please configure the component datasource in Sitecore.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (fields) {
    const getCardClasses = (productId: string) => {
      if (isReducedMotion) {
        // Reduced motion version - no scaling, blur, or complex animations
        return cn(
          'transition-opacity duration-150',
          activeCard !== null && activeCard !== productId ? 'opacity-60' : '',
          activeCard === productId ? 'z-10' : ''
        );
      } else {
        // Full motion version
        return cn(
          'transition-all duration-500 ease-in-out h-full',
          activeCard !== null && activeCard !== productId ? 'opacity-50 scale-95 blur-[2px]' : '',
          activeCard === productId ? 'scale-102 z-10' : ''
        );
      }
    };

    return (
      <div
        className={cn('@container transform-gpu border-b-2 border-t-2 [.border-b-2+&]:border-t-0', {
          [props?.params?.styles]: props?.params?.styles,
        })}
      >
        <div className="@md:py-20 @lg:py-28 py-12 ">
          <div className="@xl:px-0 @md:pb-0 mx-auto max-w-screen-xl px-0 pb-10 [&:not(.px-6_&):not(.px-8_&):not(.px-10_&)]:px-6">
            <AnimatedSection
              direction="down"
              duration={400}
              reducedMotion={isReducedMotion}
              className=" "
              isPageEditing={isPageEditing}
            >
              <div>
                <Text tag="h2" className={cn('@md:w-1/2 w-full')} field={title?.jsonValue} />
              </div>
            </AnimatedSection>
          </div>
          <SlideCarousel>
            {sitecoreProducts.length > 0 ? (
              sitecoreProducts.map((product, index) => (
                <SlideCarouselItemWrap key={index} className="max-w-[546px]">
                  <div
                    className={getCardClasses(`product-${index}`)}
                    onMouseEnter={() => setActiveCard(`product-${index}`)}
                    onMouseLeave={() => setActiveCard(null)}
                    onFocus={() => setActiveCard(`product-${index}`)}
                    onBlur={() => setActiveCard(null)}
                  >
                    <ProductListingCard
                      product={product}
                      link={viewAllLink?.jsonValue}
                      prefersReducedMotion={isReducedMotion}
                      isPageEditing={isPageEditing}
                    />
                  </div>
                </SlideCarouselItemWrap>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No products available</p>
              </div>
            )}
          </SlideCarousel>
        </div>
      </div>
    );
  }

  return <NoDataFallback componentName="ProductListing" />;
};
