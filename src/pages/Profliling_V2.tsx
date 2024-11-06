import React, { useState } from 'react';
import { ProfileScreenNameV2 } from '../utils/enums';
import Introduction from '../components/profilingV2/Introduction';
import QuestionsComp from '../components/profilingV2/Questions6';
import T1 from '../components/profilingV2/macos-diagonal-fold';
import Analysis from '../components/profilingV2/analysis4';
import CraftingAITeacher from '../components/profilingV2/CraftingAITeacher3';
import Description from '../components/profilingV2/description4';

const tempData = {
  hobby: {
    text: 'User appears to engage in hobbies that are unclear but may indicate a lack of clarity or confidence in choosing activities they enjoy.',
    scale: 4,
    recommended_approach:
      'Experiment with different hobbies to discover what truly interests you.',
  },
  learning_style: {
    text: 'User seems to indicate a preference for vague learning styles, suggesting they may struggle with identifying effective methods for understanding concepts.',
    scale: 3,
    recommended_approach:
      'Try various study techniques, such as visual aids or group discussions, to find what resonates best with you.',
  },
  academic_confidence: {
    text: "User's lack of defined academic confidence suggests feelings of uncertainty in their abilities, which may hinder their learning experience.",
    scale: 2,
    recommended_approach:
      'Set small academic goals to gradually build your confidence and seek feedback when needed.',
  },
};

export default function Profliling_V2() {
  const [CurrentScreen, setCurrentScreen] = useState(
    ProfileScreenNameV2.DESCRIPTION
  );
  const [analysisData, setAnalysisData] = useState(tempData);

  return (
    <>
      {/* <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center"> */}
      {CurrentScreen === ProfileScreenNameV2.INTRODUCTION && (
        <>
          <Introduction setCurrentScreen={setCurrentScreen} />
        </>
      )}

      {CurrentScreen === ProfileScreenNameV2.QUESTIONS && (
        <>
          <QuestionsComp
            setCurrentScreen={setCurrentScreen}
            setAnalysisData={setAnalysisData}
          />
        </>
      )}

      {CurrentScreen === ProfileScreenNameV2.DESCRIPTION && (
        <>
          <Description
            setCurrentScreen={setCurrentScreen}
            onBack={() => setCurrentScreen(ProfileScreenNameV2.INTRODUCTION)}
          />
        </>
      )}

      {CurrentScreen === ProfileScreenNameV2.ANALYSIS && (
        <>
          <Analysis analysisData={analysisData} setCurrentScreen={setCurrentScreen} />
        </>
      )}

      {CurrentScreen === ProfileScreenNameV2.AI_CRAFTING && (
        <>
          {' '}
          <CraftingAITeacher />{' '}
        </>
      )}
      {/* </div> */}
    </>
  );
}
