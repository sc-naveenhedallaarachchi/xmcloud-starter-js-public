'use client';

import { useState } from 'react';
import { Text } from '@sitecore-content-sdk/nextjs';
import { UseStateToggleReproProps } from './use-state-toggle-repro.props';

/**
 * Repro component for Pages editing + useState conditional render.
 * Toggle hides/shows a Text field to verify scpm re-binding after remount.
 */
export const Default = (props: UseStateToggleReproProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const textdata = props?.fields?.Text ?? 'TEST DATA';
  return (
    <div className="container-default component">
      <button type="button" onClick={() => setIsVisible(!isVisible)}>
        Toggle
      </button>
      {isVisible && (
        <div className="component-content">
          <Text field={props.fields.Text} />
        </div>
      )}
    </div>
  );
};
