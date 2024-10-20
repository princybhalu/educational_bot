import React, { useEffect, useState } from 'react';
import {
  AskQuetionApiCall,
  GetAllQuestionListApiCall,
  CreateProfileApiCall,
} from '../services/api/profiling';
import { ProfileScreenName, QuestionStatus } from '../utils/enums';
import '../style/Profiling.css';
import ProfilingTitle1 from '../assets/image/profiling_title_1.gif';
import ProfilingTitle2 from '../assets/image/profiling_title_2.gif';
import ProfilingTitle3 from '../assets/image/profiling_title_3.gif';
import ProfilingTitle4 from '../assets/image/profiling_title_4.gif';
import TimeLIneSetion from '../components/profiling/TimeLineSection';
import TimeLIneSetionOfWeb from '../components/profiling/TimeLineSectionOFWeb';
import QuestionSection from '../components/profiling/QuestionSection';
import { useSelector } from 'react-redux';
import MascotTextComponent from '../components/profiling/MascotTextComponent';

const data = [
  {
    question_id: '670ce43d52efc71e620c5067',
    category_key: 'hobby',
    question: 'What hobbies do you regularly engage in during your free time?',
    sequence: 1,
    status: QuestionStatus.ACTIVE,
    answer: '',
  },
  {
    question_id: '670ce43d52efc71e620c5068',
    category_key: 'hobby',
    question: 'How do your hobbies help you relax or recharge?',
    sequence: 2,
    status: QuestionStatus.DISABLE,
    answer: '',
  },
  {
    question_id: '670ce43d52efc71e620c5069',
    category_key: 'learning_style',
    question:
      'Do you prefer to learn through visual aids, hands-on activities, or reading?',
    sequence: 3,
    status: QuestionStatus.DISABLE,
    answer: '',
  },
  {
    question_id: '670ce43d52efc71e620c506a',
    category_key: 'learning_style',
    question:
      'When learning new concepts, do you focus more on the details or the overall picture?',
    sequence: 4,
    status: QuestionStatus.DISABLE,
    answer: '',
  },
  {
    question_id: '670ce43d52efc71e620c506b',
    category_key: 'academic_confidence',
    question:
      'How confident do you feel when approaching challenging academic topics?',
    sequence: 5,
    status: QuestionStatus.DISABLE,
    answer: '',
  },
];

interface Question {
  question_id: string;
  category_key: string;
  question: string;
  sequence: number;
  answer: string;
  generated_question?: string;
  status: string;
}

export default function Profiling() {
  const user = useSelector((state: any) => state.auth.user);
  console.log({ user });
  const [screenName, setScreenName] = useState(ProfileScreenName.ONLY_AVATAR);
  const [displayQuestionIndex, setDisplayQuestionIndex] = useState<number>(0);
  const [currentCategoryKey, setCurrentCategoryKey] = useState<string | null>(
    null
  );
  // when apicall to set this then also add status fields in data bcz from backend it is not come
  const [questionList, setQuestionList] = useState(data);
  const [isCalledCreateProfile, setIsCalledCreateProfile] = useState(false);

  const handleAskQuetion = async (body: any, nextIndex: number) => {
    try {
      // for future addition
      // if (!questionList) {
      //   try {
      //     const res = await GetAllQuestionListApiCall();
      //     setQuestionList(res.data);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }

      // create profile question
      if (!isCalledCreateProfile) {
        try {
          await CreateProfileApiCall(user.id);
          setIsCalledCreateProfile(true);
        } catch (err) {
          console.log('err in get profile : ', err);
        }
      }

      if (isCalledCreateProfile) {
        // this real logic
        const res = await AskQuetionApiCall(body);
        console.log(res);

        if (res.data.is_profile_completed) {
          setScreenName(ProfileScreenName.GIVE_DESCRIPTION_OF_TEACHER);
          return;
        }

        //  checking profile is completed or not
        if (
          res.data.profile_data.length === questionList.length &&
          res.data.profile_data[res.data.profile_data.length - 1].answer
        ) {
          setScreenName(ProfileScreenName.GIVE_DESCRIPTION_OF_TEACHER);
          return;
        }

        // logic of create question list
        const resProfileData = res.data.profile_data;
        const resNextQuestion = res.data.next_question;
        resProfileData.splice(0, 1);
        const newQuestionListData = [...resProfileData];
        setDisplayQuestionIndex(newQuestionListData.length);
        newQuestionListData.push({
          ...resNextQuestion,
          status: QuestionStatus.ACTIVE,
          answer: '',
        });
        // add disable questions
        questionList.splice(0, newQuestionListData.length);
        console.log({ questionList, newQuestionListData });
        setQuestionList([...newQuestionListData, ...questionList]);

        // without api call need to call
        // if(!nextIndex) return null;
        // questionList[nextIndex].status =  QuestionStatus.COMPLETED;
        // questionList[nextIndex + 1].status =  QuestionStatus.ACTIVE;
        // setQuestionList([...questionList]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleAskQuetion(null, 0).then();
  }, [isCalledCreateProfile]);

  return (
    <>
      {/* Navigation Header */}
      {(screenName === ProfileScreenName.QUESTION ||
        screenName === ProfileScreenName.TIMELINE) && (
        <>
          {' '}
          <div className="flex justify-between mx-5">
            {screenName === ProfileScreenName.QUESTION && (
              <>
                <div
                  className="flex"
                  onClick={() => {
                    setScreenName(ProfileScreenName.TIMELINE);
                    setCurrentCategoryKey('hobby');
                  }}
                >
                  <div className="my-auto mr-3">
                    <svg
                      width="16"
                      height="8"
                      viewBox="0 0 16 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 3.5C15.2761 3.5 15.5 3.72386 15.5 4C15.5 4.27614 15.2761 4.5 15 4.5L15 3.5ZM0.646446 4.35355C0.451184 4.15829 0.451184 3.84171 0.646446 3.64645L3.82843 0.464465C4.02369 0.269203 4.34027 0.269203 4.53553 0.464465C4.7308 0.659727 4.7308 0.97631 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM15 4.5L1 4.5L1 3.5L15 3.5L15 4.5Z"
                        fill="#003366"
                      />
                    </svg>
                  </div>
                  <span className="text-[#405E7F] navigation-headline ">
                    {' '}
                    Back To Timeline{' '}
                  </span>
                </div>
              </>
            )}
            {screenName === ProfileScreenName.TIMELINE && (
              <>
                {' '}
                <div
                  className="flex"
                  onClick={() => {
                    setScreenName(ProfileScreenName.QUESTION);
                  }}
                >
                  <div className="my-auto mr-3">
                    <svg
                      width="16"
                      height="8"
                      viewBox="0 0 16 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 3.5C15.2761 3.5 15.5 3.72386 15.5 4C15.5 4.27614 15.2761 4.5 15 4.5L15 3.5ZM0.646446 4.35355C0.451184 4.15829 0.451184 3.84171 0.646446 3.64645L3.82843 0.464465C4.02369 0.269203 4.34027 0.269203 4.53553 0.464465C4.7308 0.659727 4.7308 0.97631 4.53553 1.17157L1.70711 4L4.53553 6.82843C4.7308 7.02369 4.7308 7.34027 4.53553 7.53553C4.34027 7.7308 4.02369 7.7308 3.82843 7.53553L0.646446 4.35355ZM15 4.5L1 4.5L1 3.5L15 3.5L15 4.5Z"
                        fill="#003366"
                      />
                    </svg>
                  </div>
                  <span className="text-[#405E7F] navigation-headline ">
                    {' '}
                    Back To Question{' '}
                  </span>
                </div>
              </>
            )}
          </div>{' '}
        </>
      )}

      {/* Title Of Screen */}
      {(screenName === ProfileScreenName.ONLY_AVATAR ||
        screenName === ProfileScreenName.TIMELINE ||
        screenName === ProfileScreenName.QUESTION) && (
        <>
          <div className="w-full h-full">
            <div className="relative max-w-max mx-auto py-16 text-3xl sm:text-4xl md:text-5xl font-bold flex flex-col gap-3 items-center Darker-Grotesque transition-all duration-100">
              <img
                src={ProfilingTitle1}
                alt="Icon 1"
                className="w-9 md:w-24 absolute top-5 left-20 md:left-0"
              />
              <img
                src={ProfilingTitle3}
                alt="Icon 3"
                className="w-9 md:w-24 rotate-12 absolute top-5 right-20 md:right-0"
              />
              <img
                src={ProfilingTitle2}
                alt="Icon 2"
                className="w-9 md:w-24 absolute top-16 md:top-36  left-0 md:-left-28 -rotate-12"
              />

              <img
                src={ProfilingTitle4}
                alt="Icon 4"
                className="w-9 md:w-24 absolute top-16 md:top-20 right-0 md:-right-32 rotate-12"
              />
              <h1 className="hidden md:block">Help us tailor your learning!</h1>
              <div className="flex gap-2 flex-col md:flex-row flex-wrap justify-center items-center">
                <h1 className="text-nowrap">Quick Check On</h1>
                <h2 className=" bg-[#FFE0CC] px-2.5 py-1 rounded-lg line-clamp-1">
                  Your Focus & Well-Being!
                </h2>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Only avatar screen */}
      {screenName === ProfileScreenName.ONLY_AVATAR && (
        <div className="w-full p-10 flex flex-col gap-20 items-center">
          <button
            className="text-white bg-blue-900 px-16 py-3.5 rounded-full text-lg md:text-xl mx-auto"
            onClick={async () => {
              await handleAskQuetion(null, 0);
              setScreenName(ProfileScreenName.QUESTION);
            }}
          >
            {' '}
            Lets Start Quetions{' '}
          </button>

          <MascotTextComponent
            text="Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text.Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text. Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text Lorem Ipsum is simply dummy text."
            direction="right"
          />
        </div>
      )}

      {/* Time Line section */}
      {screenName === ProfileScreenName.TIMELINE &&
        currentCategoryKey !== null && (
          <>
            <TimeLIneSetion questionList={questionList} />
            {/* <TimeLIneSetionOfWeb questionList={questionList} /> */}
          </>
        )}

      {/* question screen */}
      {screenName === ProfileScreenName.QUESTION && (
        <>
          <QuestionSection
            //@ts-ignore
            handleAskQuetion={handleAskQuetion}
            questions={questionList}
            displayQuestionIndex={displayQuestionIndex}
          />
        </>
      )}

      {/* GIVE_DESCRIPTION_OF_TEACHER */}
      {screenName === ProfileScreenName.GIVE_DESCRIPTION_OF_TEACHER && (
        <>
          <div> this is descrition </div>
        </>
      )}
    </>
  );
}
