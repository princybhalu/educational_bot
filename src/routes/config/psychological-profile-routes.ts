import { lazy } from 'react';
import { RouteConfig } from '../../types/route';

const IntroductionSection = lazy(
  () => import('../../pages/psychological-profiling')
);
const QuestionsListSection = lazy(
  () => import('../../pages/psychological-profiling/QuestionsList')
);
const UserAnalysisSection = lazy(
  () => import('../../pages/psychological-profiling/UserAnalysis')
);
const FreeDescriptionSection = lazy(
  () => import('../../pages/psychological-profiling/free-description')
);
const AiCraftingSection = lazy(
  () => import('../../pages/psychological-profiling/ai-crafting')
);

export const PsychologicalProfileRoutes: RouteConfig[] = [
  {
    path: '/psychological-profile',
    key: 'psychological-profile',
    isProtected: true,
    element: IntroductionSection,
    // islayout: true,
    // isProfilingRequired: true,
  },
  {
    path: '/psychological-profile/question-list',
    key: 'psychological-profile-question-list',
    isProtected: true,
    element: QuestionsListSection,
    // islayout: true,
    // isProfilingRequired: true,
  },
  {
    path: '/psychological-profile/user-analysis',
    key: 'psychological-profile-user-analysis',
    isProtected: true,
    element: UserAnalysisSection,
    // islayout: true,
    // isProfilingRequired: true,
  },
  {
    path: '/psychological-profile/free-description',
    key: 'psychological-profile-free-description',
    isProtected: true,
    element: FreeDescriptionSection,
    // islayout: true,
    // isProfilingRequired: true,
  },
  {
    path: '/psychological-profile/ai-crafting',
    key: 'psychological-profile-ai-crafting',
    isProtected: true,
    element: AiCraftingSection,
    // islayout: true,
    // isProfilingRequired: true,
  },
];
