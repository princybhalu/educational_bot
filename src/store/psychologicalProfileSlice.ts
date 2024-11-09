import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LearningData {
  text: string;
  scale: number;
  recommended_approach: string;
}

interface AnalysisData {
  [key: string]: LearningData;
}

interface PsychologicalProfileStore {
  analysisData: AnalysisData | null;
  isViewedIntroductionSection: boolean;
}

const initialState: PsychologicalProfileStore = {
  analysisData: null,
  isViewedIntroductionSection: false,
};

const psychologicalProfileSlice = createSlice({
  name: 'psychologicalProfile',
  initialState,
  reducers: {
    introductionOnceChecked: (state) => {
      state.isViewedIntroductionSection = true;
    },
    storeAnalysisData: (state, action: PayloadAction<AnalysisData>) => {
      state.analysisData = action.payload;
    },
  },
});

export const { introductionOnceChecked, storeAnalysisData } =
  psychologicalProfileSlice.actions;

export default psychologicalProfileSlice.reducer;
