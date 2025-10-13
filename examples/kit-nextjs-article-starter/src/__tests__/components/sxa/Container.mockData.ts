import { ComponentRendering, ComponentParams } from '@sitecore-content-sdk/nextjs';

// Mock params data
export const mockParams: ComponentParams = {
  GridParameters: 'col-12',
  Styles: 'custom-container-style',
  DynamicPlaceholderId: 'main',
  RenderingIdentifier: 'container-rendering-id',
  BackgroundImage: '',
};

// Mock rendering data
export const mockRendering: ComponentRendering & { params: ComponentParams } = {
  componentName: 'Container',
  dataSource: 'test-datasource',
  placeholders: {},
  uid: 'test-uid',
  params: mockParams,
};

export const mockParamsWithContainer: ComponentParams = {
  GridParameters: 'col-12',
  Styles: 'container custom-container-style',
  DynamicPlaceholderId: 'main',
  RenderingIdentifier: 'container-rendering-id',
  BackgroundImage: '',
};

export const mockParamsWithBackgroundImage: ComponentParams = {
  GridParameters: 'col-12',
  Styles: 'custom-container-style',
  DynamicPlaceholderId: 'main',
  RenderingIdentifier: 'container-rendering-id',
  BackgroundImage: 'mediaurl="/test-image.jpg"',
};

export const mockParamsWithoutStyles: ComponentParams = {
  GridParameters: 'col-12',
  Styles: '',
  DynamicPlaceholderId: 'main',
  RenderingIdentifier: 'container-rendering-id',
  BackgroundImage: '',
};

export const mockParamsWithoutGridParameters: ComponentParams = {
  GridParameters: '',
  Styles: 'custom-container-style',
  DynamicPlaceholderId: 'main',
  RenderingIdentifier: 'container-rendering-id',
  BackgroundImage: '',
};

export const mockParamsWithoutId: ComponentParams = {
  GridParameters: 'col-12',
  Styles: 'custom-container-style',
  DynamicPlaceholderId: 'main',
  RenderingIdentifier: '',
  BackgroundImage: '',
};

// Create rendering objects with params
const mockRenderingWithContainer: ComponentRendering & { params: ComponentParams } = {
  componentName: 'Container',
  dataSource: 'test-datasource',
  placeholders: {},
  uid: 'test-uid',
  params: mockParamsWithContainer,
};

const mockRenderingWithBackgroundImage: ComponentRendering & { params: ComponentParams } = {
  componentName: 'Container',
  dataSource: 'test-datasource',
  placeholders: {},
  uid: 'test-uid',
  params: mockParamsWithBackgroundImage,
};

const mockRenderingWithoutStyles: ComponentRendering & { params: ComponentParams } = {
  componentName: 'Container',
  dataSource: 'test-datasource',
  placeholders: {},
  uid: 'test-uid',
  params: mockParamsWithoutStyles,
};

const mockRenderingWithoutGridParameters: ComponentRendering & { params: ComponentParams } = {
  componentName: 'Container',
  dataSource: 'test-datasource',
  placeholders: {},
  uid: 'test-uid',
  params: mockParamsWithoutGridParameters,
};

const mockRenderingWithoutId: ComponentRendering & { params: ComponentParams } = {
  componentName: 'Container',
  dataSource: 'test-datasource',
  placeholders: {},
  uid: 'test-uid',
  params: mockParamsWithoutId,
};

// Complete props combinations
export const defaultProps = {
  rendering: mockRendering,
  params: mockParams,
};

export const propsWithContainer = {
  rendering: mockRenderingWithContainer,
  params: mockParamsWithContainer,
};

export const propsWithBackgroundImage = {
  rendering: mockRenderingWithBackgroundImage,
  params: mockParamsWithBackgroundImage,
};

export const propsWithoutStyles = {
  rendering: mockRenderingWithoutStyles,
  params: mockParamsWithoutStyles,
};

export const propsWithoutGridParameters = {
  rendering: mockRenderingWithoutGridParameters,
  params: mockParamsWithoutGridParameters,
};

export const propsWithoutId = {
  rendering: mockRenderingWithoutId,
  params: mockParamsWithoutId,
};

