import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { QuestionsTypes } from '../../types/profiling';
import {
  AskQuetionApiCall,
  CreateProfileApiCall,
  GetAllQuestionListApiCall,
} from '../../services/api/profiling';
import { useDispatch, useSelector } from 'react-redux';
import { PsychologicalProfileRoutesName } from '../../utils/enums';
import { useNavigate } from 'react-router-dom';
import TypingAnimtionCard from '../../components/shared/TypingAnimtionCard';
import Orbit from '../../components/avatar/orbit';
import '../../style/psychological-profile-introduction.css';
import NeuralNetwork from '../../components/background-animations/NeuralNetwork';
import { storeAnalysisData } from '../../store/psychologicalProfileSlice';

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  isTransitioning: boolean;
  transitionDirection: 'in' | 'out';
  setAnswer: (a: string) => void;
  answer: string;
  isSubmitted: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  isTransitioning,
  transitionDirection,
  setAnswer,
  answer,
  isSubmitted,
}) => {
  console.log({
    questionNumber,
    totalQuestions,
    questionText,
    isTransitioning,
    transitionDirection,
    setAnswer,
    answer,
    isSubmitted,
  });
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    console.log(e?.target.value);
  };

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  return (
    <>
      <div className="relative bg-opacity-80 bg-gray-900 border border-blue-500 border-opacity-30 rounded-2xl p-10 mb-8 backdrop-blur-2xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[scanline_2s_linear_infinite]"></div>
        <div className="flex items-center gap-2 text-sky-400/100 text-md md:text-lg mb-6">
          <span className="animate-[pulse_1.5s_infinite]">★</span> Question{' '}
          {questionNumber} of 5
        </div>
        <h2 className="text-white text-lg md:text-2xl font-semibold mb-8 leading-relaxed">
          {questionText}
        </h2>
        <div className="relative bg-opacity-60 bg-gray-800 border border-blue-500 border-opacity-20 rounded-xl p-6">
          <textarea
            className="w-full min-h-[120px] bg-transparent border-none text-white text-lg resize-none outline-none placeholder-white placeholder-opacity-50"
            placeholder="Write your answer here..."
            value={answer}
            onChange={handleTextAreaChange}
            rows={3}
            disabled={isSubmitted}
          ></textarea>

          {/* <textarea
        value={answer}
        onChange={handleTextAreaChange}
        placeholder="Write your answer here..."
        className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none mb-4"
        rows={3}></textarea> */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-light-blue-400 transform scale-x-0 origin-left transition-transform duration-300 focus-within:scale-x-100"></div>
        </div>
      </div>
    </>
  );
};

let feedbackInLet = '';
// setAnalysisData
const Quiz: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'in' | 'out'>(
    'out'
  );
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [a1, setA1] = useState(false);
  const [isVisibleOfFeedback, SetisVisibleOfFeedback] = useState(false);

  const user = useSelector((state: any) => state.auth.user);
  const [questionList, setQuestionList] = useState<null | QuestionsTypes[]>(
    null
  );
  const [isCalledCreateProfile, setIsCalledCreateProfile] = useState(false);
  const [CurrentFullQuestion, setCurrentFullQuestion] =
    useState<null | QuestionsTypes>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answer, setAnswer] = useState<string>('');
  const [questionCompleted, setQuestionCompleted] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const navigate = useNavigate();
  const [orbitOpartion, setOrbitOpartion] = useState<
    'typing' | 'loading1' | null
  >(null);
  const dispatch = useDispatch();

  const handleTypingComplete = () => {
    setIsTypingComplete(true);
    setOrbitOpartion(null);
  };

  const handleTransition = (direction: 'prev' | 'next') => {
    setTransitionDirection('in');
    setIsTransitioning(true);
    // setIsAvatarActive(true);

    // Calculate the position of the avatar for animation
    const avatar = document.querySelector('.avatar-container');
    const card = document.querySelector('.question-card');
    console.log(avatar, card, '=====');
    if (avatar && card) {
      const avatarRect = avatar.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const translateX =
        avatarRect.left -
        cardRect.left +
        (avatarRect.width - cardRect.width) / 2;
      const translateY =
        avatarRect.top -
        cardRect.top +
        (avatarRect.height - cardRect.height) / 2;

      document.documentElement.style.setProperty(
        '--card-translate-x',
        `${translateX}px`
      );
      document.documentElement.style.setProperty(
        '--card-translate-y',
        `${translateY}px`
      );
    }

    setTimeout(() => {
      if (direction === 'prev') {
        setCurrentQuestion(currentQuestion - 1);
        if (questionList) {
          setAnswer(questionList[currentQuestion - 2].answer ?? '');
          setCurrentFullQuestion(questionList[currentQuestion - 2]);
        }
      } else {
        setCurrentQuestion(currentQuestion + 1);
        if (questionList) {
          setAnswer(questionList[currentQuestion]?.answer ?? '');
          setCurrentFullQuestion(questionList[currentQuestion]);
        }
      }
      setTransitionDirection('out');
      setIsTypingComplete(false);
      setOrbitOpartion(null);
      setFeedback('');
      SetisVisibleOfFeedback(false);
      feedbackInLet = '';

      setTimeout(() => {
        setIsTransitioning(false);
        // setIsAvatarActive(false);
      }, 500);
    }, 500);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      handleTransition('prev');
    }
  };

  const handleSubmit = async (answer: string) => {
    setIsAiThinking(true);
    setOrbitOpartion('loading1');
    try {
      // Call your API here
      const res = await AskQuetionApiCall({
        question_id: CurrentFullQuestion?.question_id,
        answer: answer,
      });
      setIsAiThinking(false);
      if (res.data.is_profile_completed) {
        setFeedback(
          res.data.profile_meta[res.data.last_attempted_question].ai_response
            .feedback
        );
        dispatch(storeAnalysisData(res.data.psychological_profile));
        if (questionList) setQuestionCompleted(questionList?.length);
        // setAnalysisData(res.data.psychological_profile);
        // await writeFeedback(
        //   res.data.profile_meta[res.data.last_attempted_question].ai_response
        //     .feedback + ' '
        // );
        SetisVisibleOfFeedback(true);
        setOrbitOpartion('typing');
        feedbackInLet =
          res.data.profile_meta[res.data.last_attempted_question].ai_response
            .feedback;

        return;
      }

      if (res.data.profile_data) {
        // preper data for question list
        const tempQuestionList =
          questionList &&
          questionList.map((ques: { question_id: any }) => {
            return (
              res.data.profile_data.find(
                ({ question_id }: { question_id: string }) =>
                  question_id === ques.question_id
              ) ?? ques
            );
          });
        setQuestionList(tempQuestionList);
        setQuestionCompleted(res.data.profile_data.length - 1);
        console.log(
          res.data.profile_data[res.data.profile_data.length - 2].ai_response
            .feedback
        );
        setFeedback(
          res.data.profile_data[res.data.profile_data.length - 2].ai_response
            .feedback
        );
        // await writeFeedback(
        //   res.data.profile_data[res.data.profile_data.length - 2].ai_response
        //     .feedback + ' '
        // );
        SetisVisibleOfFeedback(true);
        feedbackInLet =
          res.data.profile_data[res.data.profile_data.length - 2].ai_response
            .feedback;
        setOrbitOpartion('typing');
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      const errorFeedback =
        'There was an error processing your response. Please try again.';
      // await writeFeedback(errorFeedback);
      SetisVisibleOfFeedback(true);
      feedbackInLet = errorFeedback;
      setOrbitOpartion('typing');
    }
  };

  const handleNext = () => {
    if (questionList && currentQuestion < questionList.length) {
      handleTransition('next');
    } else {
      console.log('Quiz completed:', answer);
    }
  };

  const progress =
    questionList && (questionCompleted / questionList.length) * 100;

  useEffect(() => {
    const ApisCall = async () => {
      try {
        let QuestionListByApi = questionList ? questionList : [];
        //get question list api call
        if (!questionList) {
          try {
            const res = await GetAllQuestionListApiCall();
            setQuestionList(res.data);
            QuestionListByApi = res.data;
          } catch (err) {
            console.log('err in get question list', err);
          }
        }

        if (!isCalledCreateProfile) {
          try {
            const res = await CreateProfileApiCall(user.id);
            if (res.data.is_profile_completed) {
              dispatch(storeAnalysisData(res.data.psychological_profile));
              setTimeout(() => {
                navigate(PsychologicalProfileRoutesName.ANALYSIS);
              }, 3000);
              return;
            }
            setIsCalledCreateProfile(true);
          } catch (err) {
            console.log('err in get profile : ', err);
          }
        }

        const res = await AskQuetionApiCall(null);
        if (res.data.profileData) res.data.profile_data = res.data.profileData;
        // if my question answer is completed
        if (res.data.is_profile_completed) {
          dispatch(storeAnalysisData(res.data.psychological_profile));
          setTimeout(() => {
            navigate(PsychologicalProfileRoutesName.ANALYSIS);
          }, 3000);
          // setAnalysisData(res.data.psychological_profile);
          return;
        }
        if (res.data.profile_data) {
          //case of 1st  question
          if (res.data.profile_data.length === 1) {
            setCurrentFullQuestion(res.data.profile_data[0]);
            const tempQuestionList = QuestionListByApi.map((ques: any) => {
              return {
                ...ques,
                question_id: ques._id,
              };
            });
            setQuestionList(tempQuestionList);
            return;
          }

          // if my question answer is completed
          if (res.data.is_profile_completed) {
            dispatch(storeAnalysisData(res.data.psychological_profile));
            setTimeout(() => {
              navigate(PsychologicalProfileRoutesName.ANALYSIS);
            }, 3000);
            return;
          } else if (
            questionList &&
            res.data.profile_data.length === questionList.length &&
            res.data.profile_data[questionList.length - 1].answers
          ) {
            dispatch(storeAnalysisData(res.data.psychological_profile));
            setTimeout(() => {
              navigate(PsychologicalProfileRoutesName.ANALYSIS);
            }, 3000);
            return;
          }

          setCurrentFullQuestion(
            res.data.profile_data[res.data.profile_data.length - 1]
          );
          setCurrentQuestion(res.data.profile_data.length);
          setAnswer('');
          // preper data for question list
          const tempQuestionList = QuestionListByApi.map((ques: any) => {
            return (
              res.data.profile_data.find(
                ({ question_id }: { question_id: string }) =>
                  question_id === ques._id
              ) ?? {
                ...ques,
                question_id: ques._id,
              }
            );
          });
          setQuestionList(tempQuestionList);
          setQuestionCompleted(res.data.profile_data.length - 1);
        }
      } catch (err) {
        console.log(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    ApisCall();
  }, []);

  console.log({
    questionList,
    questionCompleted,
    currentQuestion,
    t: questionCompleted < currentQuestion && !isTypingComplete,
    t1: questionCompleted < currentQuestion,
    t2: !isTypingComplete,
  });

  return (
    <div className="min-h-screen bg-black w-full flex flex-col items-center justify-center">
      <NeuralNetwork />
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* ava */}
        <div className="avatar-container">
          <Orbit operation={orbitOpartion} />
        </div>
        {/* Feedback Display */}
        <TypingAnimtionCard
          isVisible={isVisibleOfFeedback}
          onTypingComplete={handleTypingComplete}
          className="fade-in"
          message={feedbackInLet}
        />

        {isLoading && (
          <>
            <div> loading........ </div>
          </>
        )}

        {!isLoading && CurrentFullQuestion && (
          <>
            {/* <div className="w-full px-4 mb-8">
              <div className="w-full h-2 bg-gray-700 rounded-full">
                <div
                  className="h-full rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${progress}%`,
                    background:
                      'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                  }}
                />
              </div>
            </div> */}
            <div className="w-full px-4 mb-8">
              <div className="w-full h-1.5 bg-white bg-opacity-10 rounded overflow-hidden mb-12">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-light-blue-400 animate-[pulse_2s_infinite]"
                  style={{
                    width: `${progress}%`,
                  }}
                ></div>
              </div>

              <div
                className={`question-card question-card-container w-full perspective-1000 z-[0]
              ${isTransitioning ? (transitionDirection === 'in' ? 'avatar-transition-in' : 'avatar-transition-out') : ''}`}
              >
                <QuestionCard
                  questionNumber={currentQuestion}
                  totalQuestions={(questionList && questionList.length) ?? 10}
                  questionText={CurrentFullQuestion.ai_response?.question ?? ''}
                  isTransitioning={isTransitioning}
                  transitionDirection={transitionDirection}
                  answer={answer}
                  setAnswer={setAnswer}
                  isSubmitted={!!CurrentFullQuestion.ai_response?.feedback}
                />
              </div>

              <div className="flex justify-between w-full mt-4">
                {currentQuestion <= 1 ? (
                  <>
                    {' '}
                    <button
                      onClick={() =>
                        navigate(PsychologicalProfileRoutesName.INTRODUCTION)
                      }
                      className={`relative px-8 py-4 bg-opacity-80 bg-gray-900 border border-blue-500 border-opacity-30 rounded-lg text-white transition hover:bg-opacity-20 hover:border-opacity-50`}
                    >
                      Back
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion <= 1}
                    className={`relative px-8 py-4 bg-opacity-80 bg-gray-900 border border-blue-500 border-opacity-30 rounded-lg text-white transition hover:bg-opacity-20 hover:border-opacity-50 ${
                      currentQuestion <= 1
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                  >
                    Previous
                  </button>
                )}
                {!CurrentFullQuestion.ai_response?.feedback && !feedback ? (
                  <button
                    onClick={() => handleSubmit(answer)}
                    disabled={isAiThinking || !answer?.trim()}
                    className={`relative px-8 py-4 bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg text-white shadow-lg hover:translate-y-[-2px] transition overflow-hidden ${
                      !(isAiThinking || answer?.trim())
                        ? 'bg-blue-500/50 text-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    {!isAiThinking ? 'Send' : 'Processing...'}
                    <span className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform rotate-45 animate-[btnShine_3s_infinite]"></span>
                  </button>
                ) : questionList && questionList.length === currentQuestion ? (
                  <button
                    onClick={() => {
                      navigate(PsychologicalProfileRoutesName.ANALYSIS);
                    }}
                    disabled={!isTypingComplete}
                    className={`relative px-8 py-4 bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg text-white shadow-lg hover:translate-y-[-2px] transition overflow-hidden ${
                      isTypingComplete
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-green-500/50 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Finish
                    {/* <span className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform rotate-45 animate-[btnShine_3s_infinite]"></span> */}
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    //@ts-ignore
                    disabled={
                      (!feedback && questionCompleted < currentQuestion) ||
                      (feedback && !isTypingComplete)
                    }
                    className={`px-4 py-2 rounded-lg font-semibold transition-colorsrelative px-8 py-4 bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg text-white shadow-lg hover:translate-y-[-2px] transition overflow-hidden ${
                      !(
                        (!feedback && questionCompleted < currentQuestion) ||
                        (feedback && !isTypingComplete)
                      )
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-green-500/50 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Next
                    {/* <span className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform rotate-45 animate-[btnShine_3s_infinite]"></span> */}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
       .perspective-1000 {
          perspective: 1000px;
        }

        @keyframes window-in {
          0% {
            transform: translate(0, 0) scale(1) rotateX(0);
            opacity: 1;
          }
          100% {
            transform: 
              translate(var(--card-translate-x), var(--card-translate-y))
              scale(0.1)
              rotateX(45deg);
            opacity: 0;
          }
        }

        @keyframes window-out {
          0% {
            transform: 
              translate(var(--card-translate-x), var(--card-translate-y))
              scale(0.1)
              rotateX(-45deg);
            opacity: 0;
          }
          100% {
            transform: translate(0, 0) scale(1) rotateX(0);
            opacity: 1;
          }
        }

        .window-in {
          animation: window-in 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center center;
        }

        .window-out {
          animation: window-out 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: center center;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .avatar-active {
          transform: scale(1.1);
        }
          
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes cursorBlink {
             0%, 70%, 100% { opacity: 1; }
             71%, 99% { opacity: 0; }
           }
  
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
            .word {
            position: relative;
            white-space: pre;
          }

           @keyframes card-to-avatar-in {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: scale(0.1) translate(0, -200px);
            opacity: 0;
          }
        }

        @keyframes card-from-avatar-out {
          0% {
            transform: scale(0.1) translate(0, -200px);
            opacity: 0;
          }
          100% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
        }

        .avatar-transition-in {
          animation: card-to-avatar-in 0.5s ease-in-out forwards;
        }

        .avatar-transition-out {
          animation: card-from-avatar-out 0.5s ease-in-out forwards;
        }
   `}</style>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes scanline {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes btnShine {
          0% { transform: translate(-100%, -100%) rotate(45deg); }
          100% { transform: translate(100%, 100%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
};

export default Quiz;
