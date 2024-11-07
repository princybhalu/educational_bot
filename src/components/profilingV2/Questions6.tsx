import React, { useState, useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import { QuestionsTypes } from '../../types/profiling';
import {
  AskQuetionApiCall,
  CreateProfileApiCall,
  GetAllQuestionListApiCall,
} from '../../services/api/profiling';
import { useSelector } from 'react-redux';
import { ProfileScreenNameV2 } from '../../utils/enums';

interface DrainParticle {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  speed: number;
  size: number;
  progress: number;
}

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
  };

  return (
    <div
      className={`mx-auto bg-[rgb(18,24,38)] text-white rounded-lg p-6 shadow-lg w-full transition-all duration-500
        ${isTransitioning ? (transitionDirection === 'in' ? 'avatar-transition-in' : 'avatar-transition-out') : ''}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold flex">
          <Sparkles className="w-4 h-4 text-blue-400 mr-3" />
          Question {questionNumber} of {totalQuestions}
        </h2>
      </div>

      <p className="text-lg font-medium mb-4">{questionText}</p>

      <textarea
        value={answer}
        onChange={handleTextAreaChange}
        placeholder="Write your answer here..."
        className="w-full p-3 rounded-lg bg-gray-700 text-white resize-none mb-4 focus:outline-none"
        rows={3}
        disabled={isSubmitted}
      />
    </div>
  );
};

interface QuizProps {
  setCurrentScreen: (a: string) => void;
  setAnalysisData: (a: any) => void;
}

const Quiz: React.FC<QuizProps> = ({ setCurrentScreen, setAnalysisData }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'in' | 'out'>(
    'out'
  );
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [displayWords, setDisplayWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [drainProgress, setDrainProgress] = useState<number>(0);
  const [drainParticles, setDrainParticles] = useState<DrainParticle[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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

  const createDrainParticle = (): DrainParticle => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 48;
    const speed = 2 + Math.random() * 2;
    const size = 3 + Math.random() * 4;

    return {
      id: Math.random(),
      startX: Math.cos(angle) * radius,
      startY: Math.sin(angle) * radius,
      angle,
      speed,
      size,
      progress: 0,
    };
  };

  const drainColor = async () => {
    const particleCount = 20;
    const particles = Array.from(
      { length: particleCount },
      createDrainParticle
    );
    setDrainParticles(particles);

    for (let i = 0; i <= 100; i += 2) {
      setDrainProgress(i);
      setDrainParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          progress: Math.min(100, particle.progress + particle.speed),
        }))
      );
      await new Promise((r) => setTimeout(r, 20));
    }
    setDrainParticles([]);
  };

  const fillColor = async () => {
    const particleCount = 20;
    const particles = Array.from(
      { length: particleCount },
      createDrainParticle
    );
    setDrainParticles(particles);

    for (let i = 100; i >= 0; i -= 2) {
      setDrainProgress(i);
      setDrainParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          progress: Math.max(0, particle.progress - particle.speed),
        }))
      );
      await new Promise((r) => setTimeout(r, 20));
    }
    setDrainParticles([]);
  };

  const typeWord = async (word: string) => {
    let tempWord = '';
    for (let i = 0; i <= word.length; i++) {
      tempWord = word.slice(0, i);
      setCurrentWord(tempWord);
      await new Promise((r) => setTimeout(r, 20));
    }
    return new Promise((r) => setTimeout(r, 50));
  };

  const writeFeedback = async (feedback: string) => {
    setDisplayWords([]);
    setCurrentWord('');
    setCurrentWordIndex(-1);
    setIsTypingComplete(false);

    await drainColor();
    await new Promise((r) => setTimeout(r, 600));

    const words = feedback.split(' ');
    for (let i = 0; i < words.length; i++) {
      setCurrentWordIndex(i);
      await typeWord(words[i]);
      setDisplayWords((prev) => [...prev, words[i]]);
      setCurrentWord('');
      await new Promise((r) => setTimeout(r, 50));
    }

    await new Promise((r) => setTimeout(r, 600));
    await fillColor();
    setIsTypingComplete(true);
  };

  const handleTransition = (direction: 'prev' | 'next') => {
    setTransitionDirection('in');
    setIsTransitioning(true);
    setIsAvatarActive(true);

    // Calculate the position of the avatar for animation
    const avatar = document.querySelector('.avatar-container');
    const card = document.querySelector('.question-card');
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
      setDisplayWords([]);
      setCurrentWord('');
      setCurrentWordIndex(-1);
      setIsTypingComplete(false);
      setFeedback('');

      setTimeout(() => {
        setIsTransitioning(false);
        setIsAvatarActive(false);
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
        if (questionList) setQuestionCompleted(questionList?.length);
        setAnalysisData(res.data.psychological_profile);
        await writeFeedback(
          res.data.profile_meta[res.data.last_attempted_question].ai_response
            .feedback + ' '
        );
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
        await writeFeedback(
          res.data.profile_data[res.data.profile_data.length - 2].ai_response
            .feedback + ' '
        );
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      const errorFeedback =
        'There was an error processing your response. Please try again.';
      await writeFeedback(errorFeedback);
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
              setCurrentScreen(ProfileScreenNameV2.ANALYSIS);
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
          setCurrentScreen(ProfileScreenNameV2.ANALYSIS);
          setAnalysisData(res.data.psychological_profile);
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
            setCurrentScreen(ProfileScreenNameV2.ANALYSIS);
            return;
          } else if (
            questionList &&
            res.data.profile_data.length === questionList.length &&
            res.data.profile_data[questionList.length - 1].answers
          ) {
            setCurrentScreen(ProfileScreenNameV2.ANALYSIS);
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
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* {isAiThinking && (
          <>
            <h1 className="text-white">setIsAiThinking</h1>
          </>
        )} */}
        <div className="avatar-container relative w-24 h-24 mb-4 transition-all duration-300">
          <div
            className={`relative w-24 h-24 mb-4 ease-in duration-300 ${isAvatarActive ? 'avatar-active' : ''}`}
          >
            {/* <div
              className="w-full h-full rounded-full ease-in duration-300"
              style={{
                background: 'rgb(18, 24, 38)',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
              }}
            /> */}

            {/* <div
              className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300
              ${isAvatarActive ? 'avatar-glow' : ''}`}
              style={{
                background: 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                backgroundSize: '200% 200%',
                animation: 'gradient 3s ease infinite',
                transform: 'scale(1)',
                zIndex: 1,
              }}
            /> */}

            {/* Base Circle with Fade Effect */}
            <div
              className={`w-full h-full rounded-full ease-in duration-300 ${
                isAiThinking ? 'animate-pulse' : ''
              }`}
              style={{
                background: '#ffffff',
                boxShadow: 'inset 0 0 15px rgba(0,0,0,0.5)',
                opacity: isAiThinking ? '0.8' : '1',
                transition: 'opacity 0.5s ease-in-out',
              }}
            />

            {/* Glowing Circle with Dynamic Gradient Animation */}
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300
          ${isAvatarActive ? 'avatar-glow opacity-100' : 'opacity-7'}`}
              style={{
                background:
                  displayWords.length > 1
                    ? ''
                    : 'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                backgroundSize: '200% 200%',
                animation: `gradient ${isAiThinking ? '1.5s' : '3s'} ease infinite`,
                transform: 'scale(1)',
                zIndex: 1,
              }}
            />

            {drainParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(45deg, #60a5fa, #1d4ed8, #0ea5e9)',
                  left: '50%',
                  top: '50%',
                  transform: `translate(
                  calc(-50% + ${particle.startX + Math.cos(particle.angle) * particle.progress}px),
                  calc(-50% + ${particle.startY + Math.sin(particle.angle) * particle.progress}px)
                )`,
                  opacity: 1 - particle.progress / 100,
                  transition: 'transform 0.1s linear, opacity 0.1s linear',
                }}
              />
            ))}
          </div>
        </div>

        {/* Feedback Display */}
        {displayWords.length > 0 && (
          <div className="w-full max-w-3xl bg-[#12182a] rounded-lg p-4 mb-8 shadow-lg border border-[#1d2235]">
            <p className="text-md md:text-lg text-white leading-relaxed">
              {displayWords.map((word, index) => (
                <span
                  key={index}
                  className={`word inline-block mx-1 transition-all duration-200 ease-out ${
                    index === currentWordIndex ? 'text-[#3b82f6]' : 'text-white'
                  }`}
                >
                  {word}
                </span>
              ))}
              {currentWord && (
                <span className="current-word word inline-block mx-1 text-[#3b82f6]">
                  {currentWord} <span className="animate-pulse">|</span>
                </span>
              )}
            </p>
          </div>
        )}

        {isLoading && (
          <>
            <div> loading........ </div>
          </>
        )}

        {!isLoading && CurrentFullQuestion && (
          <>
            <div className="w-full px-4 mb-8">
              <div className="flex justify-between items-center mb-2 text-white">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">
                  {questionCompleted} / {questionList && questionList.length}{' '}
                  Questions
                </span>
              </div>

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
            </div>
            <div className="question-card-container w-full perspective-1000">
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
                      setCurrentScreen(ProfileScreenNameV2.INTRODUCTION)
                    }
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors bg-gray-700 hover:bg-gray-600 text-white`}
                  >
                    Back
                  </button>
                </>
              ) : (
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion <= 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
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
                  disabled={!answer?.trim()}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    !answer?.trim()
                      ? 'bg-blue-500/50 text-gray-300 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  Send
                </button>
              ) : questionList && questionList.length === currentQuestion ? (
                <button
                  onClick={() => {
                    setCurrentScreen(ProfileScreenNameV2.ANALYSIS);
                  }}
                  disabled={!isTypingComplete}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isTypingComplete
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-green-500/50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Finish
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  //@ts-ignore
                  disabled={
                    (!feedback && questionCompleted < currentQuestion) ||
                    (feedback && !isTypingComplete)
                  }
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    !(
                      (!feedback && questionCompleted < currentQuestion) ||
                      (feedback && !isTypingComplete)
                    )
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-green-500/50 text-gray-300 cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              )}
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
    </div>
  );
};

export default Quiz;
