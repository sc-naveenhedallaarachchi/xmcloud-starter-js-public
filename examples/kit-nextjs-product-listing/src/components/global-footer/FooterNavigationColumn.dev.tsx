'use client';

import { type FC, useId, useRef, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import type {
  FooterNavigationColumnProps,
  FooterNavigationLink,
} from '@/components/global-footer/global-footer.props';
import { Button } from '@/components/ui/button';
import { Link, Text } from '@sitecore-content-sdk/nextjs';

import { EditableButton } from '@/components/button-component/ButtonComponent';
import { AnimatedHoverNav } from '@/components/ui/animated-hover-nav';
import { useContainerQuery } from '@/hooks/use-container-query';
import { cn } from '@/lib/utils';

/**
 * FooterNavigationColumn component renders a navigation column in the footer.
 * It displays a header and a list of navigation links with a hover effect.
 */
export const Default: FC<FooterNavigationColumnProps> = (props) => {
  // Safe destructuring with fallbacks - must happen before any hooks
  const {
    items,
    header,
    isPageEditing = false,
    parentRef,
    indicatorClassName = 'h-0-5 bg-secondary rounded-default bottom-0',
    alignItems = 'start',
    orientation = 'horizontal',
    listClassName = '@sm:gap-8m-0 flex list-none flex-wrap gap-4 p-0',
  } = props || {};

  // All hooks must be called unconditionally at the top level
  // Generate a unique ID for the accordion
  const accordionId = useId();

  // Check if we're on mobile
  // Refs and state for hover effect
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  // Create a fallback ref if parentRef is not provided (hooks must be called unconditionally)
  const fallbackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = parentRef || fallbackRef;
  // Always call the hook - it handles null refs internally
  const isMobile = useContainerQuery(containerRef, 'md', 'max');

  // Initialize item refs when items change
  useEffect(() => {
    if (items && Array.isArray(items)) {
      itemRefs.current = Array(items.length).fill(null);
    }
  }, [items]);

  // Now we can do early returns after all hooks are called
  // Validate props exist
  if (!props) {
    return null;
  }

  // Filter out items with invalid or missing link fields
  // Validate that link fields have the proper structure expected by Sitecore SDK
  const validItems = Array.isArray(items)
    ? items.filter((item: FooterNavigationLink) => {
        if (!item || !item.link || !item.link.jsonValue) {
          return false;
        }
        const linkField = item.link.jsonValue;
        // Ensure the link field has a value property (required by Sitecore SDK)
        return linkField && typeof linkField === 'object' && 'value' in linkField;
      })
    : [];

  // Early return if no valid items and not in editing mode
  if (validItems.length === 0 && !isPageEditing) {
    return null;
  }

  // Validate header field structure
  const isValidHeader = header?.jsonValue && 
    typeof header.jsonValue === 'object' && 
    'value' in header.jsonValue;

  // Render mobile accordion view
  if (isMobile && isValidHeader) {
    const headerValue = header.jsonValue?.value;
    return (
      <nav aria-label="Footer navigation">
        <Accordion type="single" collapsible className="w-full" aria-labelledby={accordionId}>
          <AccordionItem value={`item-${headerValue || accordionId}`}>
            <AccordionTrigger className="text-lg font-medium" id={accordionId}>
              <Text field={header.jsonValue} />
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 py-2">
                {validItems.length > 0
                  ? validItems.map((item: FooterNavigationLink, index) => {
                      const linkField = item?.link?.jsonValue;
                      // Double-check link field is valid before rendering
                      if (!linkField || typeof linkField !== 'object' || !('value' in linkField)) {
                        return null;
                      }

                      return (
                        <li key={`footerlinks-${index}-accordion-item`}>
                          <Button
                            variant="link"
                            asChild
                            className="h-auto text-pretty p-0 text-base font-normal text-white"
                          >
                            <Link field={linkField} />
                          </Button>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
    );
  }

  // Render desktop view with hover effect
  return (
    <nav aria-label="Footer navigation">
      <AnimatedHoverNav
        disableMobile={false}
        parentRef={parentRef || null}
        indicatorClassName={indicatorClassName}
        itemsAlign={(alignItems as 'start' | 'end' | 'center') || 'start'}
        orientation={orientation}
        mobileBreakpoint="sm"
      >
        <ul
          className={cn(listClassName, {
            'items-start': alignItems === 'start',
            'items-end': alignItems === 'end',
            'items-center': alignItems === 'center',
            'flex-col': orientation === 'vertical',
            '@md:flex-row  flex-col ': orientation !== 'vertical',
          })}
        >
          {validItems.length > 0
            ? validItems.map((item: FooterNavigationLink, index) => {
                const linkField = item?.link?.jsonValue;
                // Double-check link field is valid before rendering
                if (!linkField || typeof linkField !== 'object' || !('value' in linkField)) {
                  return null;
                }

                return (
                  <li key={index} className="relative">
                    <EditableButton
                      buttonLink={linkField}
                      isPageEditing={isPageEditing}
                      variant="secondary"
                      className="bg-transparent text-lg hover:bg-transparent"
                    />
                  </li>
                );
              })
            : null}
        </ul>
      </AnimatedHoverNav>
    </nav>
  );
};