import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  element: ComponentType;
  key: string;
  islayout?: boolean;
  isProtected?: boolean;
  isProfilingRequired?: boolean;
}
