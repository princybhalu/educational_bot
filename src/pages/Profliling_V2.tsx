import React, { useState } from 'react';
import { ProfileScreenNameV2 } from '../utils/enums';
import Introduction from '../components/profilingV2/Introduction';
import QuestionsComp from '../components/profilingV2/Questions6';
import T1 from '../components/profilingV2/macos-diagonal-fold';
import Analysis from '../components/profilingV2/analysis2';
import CraftingAITeacher from '../components/profilingV2/CraftingAITeacher3';

export default function Profliling_V2() {
  const [CurrentScreen, setCurrentScreen] = useState(
    ProfileScreenNameV2.QUESTIONS
  );

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
          {/* <T1 /> */}
          <QuestionsComp setCurrentScreen={setCurrentScreen} />
        </>
      )}

      {CurrentScreen === ProfileScreenNameV2.DESCRIPTION && (
        <>
          {' '}
          <div>
            <h1>ProfileScreenNameV2.DESCRIPTION : </h1>
            <h2>{ProfileScreenNameV2.DESCRIPTION}</h2>
          </div>
        </>
      )}

      {CurrentScreen === ProfileScreenNameV2.ANALYSIS && (
        <>
          <Analysis />
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
