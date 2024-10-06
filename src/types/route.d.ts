import { ComponentType } from 'react';

export interface RouteConfig {
  path: string;
  element: ComponentType;
  key: string;
  layout?: ComponentType;
  isProtected?: boolean;
  isProfilingRequired?: boolean;
}
