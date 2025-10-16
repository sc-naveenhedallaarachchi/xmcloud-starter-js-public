import '@testing-library/jest-dom';
import React from 'react';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', props);
  },
}));

// Mock Sitecore Content SDK components
jest.mock('@sitecore-content-sdk/nextjs', () => ({
  RichText: jest.fn(({ field }: { field: any }) => {
    return React.createElement('div', { 'data-testid': 'rich-text-content' }, field?.value || 'No content');
  }),
  Field: ({ field }: { field: any }) => {
    return React.createElement('span', {}, field?.value || '');
  },
}));

// Mock utility functions
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  },
}));

// Mock NoDataFallback component
jest.mock('@/utils/NoDataFallback', () => ({
  NoDataFallback: ({ componentName }: { componentName: string }) => 
    React.createElement('div', { 'data-testid': 'no-data-fallback' }, 
      `${componentName} requires a datasource item assigned.`
    ),
}));
