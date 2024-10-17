import React, { useEffect, useState } from 'react';
import { AskQuetionApiCall } from '../services/api/profiling';
import { ProfileScreenName } from '../utils/enums';
import '../style/Profiling.css';
import ProfilingTitle1 from '../assets/image/profiling_title_1.gif';
import ProfilingTitle2 from '../assets/image/profiling_title_2.gif';
import ProfilingTitle3 from '../assets/image/profiling_title_3.gif';
import ProfilingTitle4 from '../assets/image/profiling_title_4.gif';
import TimeLIneSetion from '../components/profiling/TimeLineSection';
import TimeLIneSetion1 from '../components/profiling/TimeLineSection1';
// import QuestionCard from '../components/profiling/QuestionScreen';
import QuestionCard from '../components/profiling/Question1';

const data = [
  {
    category_key: 'hobby',
    question: 'What hobbies do you regularly engage in during your free time?',
    sequence: 1,
    isCompleted: true,
  },
  {
    category_key: 'hobby',
    question: 'How do your hobbies help you relax or recharge?',
    sequence: 2,
    isCompleted: true,
  },
  {
    category_key: 'learning_style',
    question:
      'Do you prefer to learn through visual aids, hands-on activities, or reading?',
    sequence: 3,
    isCompleted: true,
  },
  {
    category_key: 'learning_style',
    question:
      'When learning new concepts, do you focus more on the details or the overall picture?',
    sequence: 4,
    isCompleted: true,
  },
  {
    category_key: 'academic_confidence',
    question:
      'How confident do you feel when approaching challenging academic topics?',
    sequence: 5,
    isCompleted: true,
  },
  {
    category_key: 'academic_confidence',
    question:
      'What strategies do you use to boost your academic confidence in areas where you feel less strong?',
    sequence: 6,
    isCompleted: true,
  },
  {
    category_key: 'exam_preparation_style',
    question: 'How do you usually prepare for exams or important tests?',
    sequence: 7,
  },
  {
    category_key: 'exam_preparation_style',
    question:
      'Do you prefer studying for exams over a long period or cramming closer to the test date?',
    sequence: 8,
  },
  {
    category_key: 'study_style',
    question:
      'Do you prefer studying alone, in groups, or with a study partner?',
    sequence: 9,
  },
  {
    category_key: 'study_style',
    question:
      'What is your preferred study environment (e.g., quiet, with background music, etc.)?',
    sequence: 10,
  },
  {
    category_key: 'emotional_motivation',
    question:
      'What keeps you emotionally motivated during long or difficult study sessions?',
    sequence: 11,
  },
  {
    category_key: 'emotional_motivation',
    question:
      'Do you find your emotions influencing how well you study or work on academic tasks?',
    sequence: 12,
  },
];
let nextIndex = 0;
interface Question {
  category_key: string;
  question: string;
  sequence: number;
}

export default function Profiling() {
  const [screenName, setScreenName] = useState(ProfileScreenName.ONLY_AVATAR);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [currentCategoryKey, setCurrentCategoryKey] = useState<string | null>(
    null
  );
  const [profileData, setProfileData] = useState(null);

  const handleAskQuetion = async (body: any) => {
    try {
      // const res = await  AskQuetionApiCall(body);
      // console.log(res);
      // if(res.data.nextQuestion) {
      //   setCurrentQuestion(res.data.nextQuestion);
      // }
      // if(res.data.profileData){
      //   setProfileData(res.data.profileData);
      // }
      setCurrentQuestion(data[nextIndex++]);
    } catch (err) {
      console.log(err);
    }
  };

  const questions = [
    { id: 1, question: 'How Do You Handle Stress?' },
    { id: 2, question: 'What Motivates You the Most?' },
    { id: 3, question: 'What Are Your Hobbies?' },
  ];

  return (
    <>
      {/* Navigation Header */}
      {(screenName === ProfileScreenName.QUESTION ||
        screenName === ProfileScreenName.TIMELINE) && (
        <> navigation header which is fix {screenName} </>
      )}

      {/* Title Of Screen */}
      {(screenName === ProfileScreenName.ONLY_AVATAR ||
        screenName === ProfileScreenName.TIMELINE ||
        screenName === ProfileScreenName.QUESTION) && (
        <>
          <div className="focus-check-container">
            <div className="icons-container">
              <img src={ProfilingTitle1} alt="Icon 1" className="icon" />
              <img src={ProfilingTitle2} alt="Icon 2" className="icon" />
              <img src={ProfilingTitle3} alt="Icon 3" className="icon" />
              <img src={ProfilingTitle4} alt="Icon 4" className="icon" />
            </div>
            <h1 className="main-heading">Quick Check On</h1>
            <h2 className="sub-heading">Your Focus & Well-Being!</h2>
          </div>
        </>
      )}

      {/* Only avatar screen */}
      {screenName === ProfileScreenName.ONLY_AVATAR && (
        <>
          <button
            className="btn  btn-primary"
            onClick={async () => {
              await handleAskQuetion(null);
              setScreenName(ProfileScreenName.QUESTION);
            }}
          >
            {' '}
            Lets Start Quetions{' '}
          </button>
        </>
      )}

      {/* Time Line section */}
      {screenName === ProfileScreenName.TIMELINE &&
        currentCategoryKey !== null && (
          <>
            <TimeLIneSetion
              data={data}
              currentCategoryKey={currentCategoryKey}
              currentQuestion={currentQuestion}
            />

            <TimeLIneSetion1 data={data} currentCategory={currentCategoryKey} />
          </>
        )}

      {/* question screen */}
      {screenName === ProfileScreenName.QUESTION &&
        currentQuestion !== null && (
          <>
            {/* <QuestionScreen data={data} currentCategory={currentCategoryKey} currentQuestion={currentQuestion} /> */}
            {/* <QuestionCard 
         //@ts-ignore
         question={currentQuestion} handleAskQuetion={handleAskQuetion} />
        </>} */}
            <QuestionCard questions={questions} />
          </>
        )}
    </>
  );
}
