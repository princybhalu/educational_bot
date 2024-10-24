import React, { FC, useEffect, useRef, useState } from 'react';
import '../../style/chat-bot.css';
import BackButton from 'assets/icons/BackButton';
import PlusButton from 'assets/icons/PlusButton';
import AnglesUp from 'assets/icons/AnglesUpIcon';
import AnglesDown from 'assets/icons/AnglesDown';
import PenToSquare from 'assets/icons/PenToSquare';
import ArrowUp from 'assets/icons/ArrowUp';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CreateProgrssApiCall,
  ChatApiCall,
  GetProgressApiCall,
} from 'services/api/learningPath';
import Markdown from 'react-markdown';
import AnimatedMarkdown from '../../components/learning-path/AnimatedMarkdown';
import { useAppSelector } from 'store/TypedHooks';
import NoDataFound from '../../components/shared/NoDataFound';
import DropletAnimation from '../../components/avatar';

export interface ChatResponse {
  Status: string;
  data: Data;
}

export interface Data {
  id: string;
  created_by: string;
  messages: Message[];
}

export interface Message {
  role: string;
  content: string;
}

const LearningChatView: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const ref = useRef<HTMLDivElement | null>(null);
  const chatSectionRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLButtonElement | null>(null);
  const [arrowButtonBottomHeight, setArrowButtonBottomHeight] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { type, relevantId, topicName } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatedProgress, setIsCreatedProgress] = useState(false);
  const [mainContent, setMainContent] = useState(null);
  const [chatContent, setChatContent] = useState(null);
  const doutRef = useRef();
  const [num, setNum] = useState(0);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
  const [displayLoadingAvatar, setDisplayLoadingAvatar] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const submitDout = async () => {
    try {
      const reqBody = {
        topic_id: relevantId,
      };
      //@ts-ignore
      if (doutRef.current && doutRef.current.value) {
        setDisplayLoadingAvatar(true);
        //@ts-ignore
        reqBody.query = doutRef.current ? doutRef.current.value : '';
        //@ts-ignore
        doutRef.current.value = '';
      } else {
        return;
      }
      const res1 = await ChatApiCall(reqBody, relevantId ?? '');

      console.log({ res1, mess: res1.data.messages });
      if (res1.data.messages) {
        if (res1.data.messages[1]) {
          setMainContent(res1.data.messages[1].content);
          res1.data.messages.splice(0, 2);
          console.log(res1.data.messages);
          setChatContent(res1.data.messages);
          setIsChatOpen(true);
          setDisplayLoadingAvatar(false);
        }
      } else {
        //@ts-ignore
        setMainContent('No content');
      }
    } catch (err) {
      console.log(err);
      setDisplayLoadingAvatar(false);
    }
  };

  useEffect(() => {
    const tempApiCall = async () => {
      try {
        try {
          const res = await CreateProgrssApiCall({
            type: type,
            relevant_id: relevantId,
          });
          console.log({ res });
        } catch (err) {
          console.log(err);
          //@ts-ignore
          if (err.status === 409) {
            try {
              const res = await GetProgressApiCall(relevantId ?? '');
            } catch (err) {
              console.log(err);
            }
          }
        } finally {
          setIsCreatedProgress(true);
        }

        const res1 = await ChatApiCall(
          {
            topic_id: relevantId,
          },
          relevantId ?? ''
        );

        console.log({ res1, mess: res1.data.messages });
        if (res1.data.messages) {
          if (res1.data.messages[1]) {
            setMainContent(res1.data.messages[1].content);
            res1.data.messages.splice(0, 2);
            console.log(res1.data.messages);
            setChatContent(res1.data.messages);
          }
        } else {
          //@ts-ignore
          setMainContent('No content');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    tempApiCall().then();
  }, []);

  useEffect(() => {
    if (arrowRef.current && ref.current) {
      const arrowButtonRect = arrowRef.current.getBoundingClientRect();
      const footerRect = ref.current.getBoundingClientRect();
      console.log('arrowButtonRect:', arrowButtonRect);
      console.log('footerRect:', footerRect);
      const distanceFromBottom = footerRect.y - arrowButtonRect.y;
      setArrowButtonBottomHeight(distanceFromBottom);
      console.log('Distance from bottom of arrow button:', distanceFromBottom);
      if (chatSectionRef.current) {
        chatSectionRef.current.style.height = `${distanceFromBottom}px`;
      }
    }
  }, [num]);

  const tempFunc = () => {
    if (num === 0) {
      setNum(1);
    }
    return <></>;
  };

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  console.log({ chatContent });

  useEffect(() => {
    console.log({ isAnimationCompleted });
  }, [isAnimationCompleted]);

  return (
    <>
      {isLoading && (
        <>
          <DropletAnimation />
        </>
      )}

      {!isLoading && mainContent === null && (
        <>
          <div> some things goes wrong </div>
        </>
      )}

      {!isLoading && mainContent && (
        <>
          <div className="content-container">
            {/* Bake button */}
            <div
              className="back-to-chapter"
              onClick={() => {
                navigate('/learning-path');
              }}
            >
              <BackButton /> &nbsp; Back
            </div>

            {/* Title Card */}
            <div className={`topic-card ${isChatOpen ? 'shrink-card' : ''}`}>
              <div className="topic-name">
                <h2 className="font-semibold">
                  {topicName}
                  {/* {topicName && topicName.length > 20 && isChatOpen
                    ? `${topicName.substring(0, 20)}...`
                    : topicName} */}
                </h2>
                {/* <div className="card-name">chapter Name</div> */}
              </div>
              {!isChatOpen && (
                <>
                  <div className="card-content">
                    {isAnimationCompleted && (
                      <>
                        <div className="card-content relative">
                          {' '}
                          <Markdown>{mainContent}</Markdown>
                        </div>
                      </>
                    )}

                    {!isAnimationCompleted && (
                      <AnimatedMarkdown
                        content={mainContent}
                        typingSpeed={20}
                        //@ts-ignore
                        setIsAnimationCompleted={setIsAnimationCompleted}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            className={`footer-container ${isChatOpen ? 'expand-footer-container' : ''}`}
          >
            <div className="footer">
              <div className="footer-arrow-up">
                <button
                  ref={arrowRef}
                  className="arrow-btn"
                  onClick={toggleChat}
                >
                  {isChatOpen ? <AnglesDown /> : <AnglesUp />}
                </button>
              </div>
              <div className="chat-section-main">
                {isChatOpen && (
                  <div ref={chatSectionRef} className="chat-section">
                    {tempFunc()}
                    {chatContent &&
                      //@ts-ignore
                      chatContent.length > 0 &&
                      //@ts-ignore
                      chatContent.map((data, index) => {
                        return (
                          <>
                            {data.role === 'assistant' ? (
                              <div className="ai-chat-message">
                                <div className="ai-chat-avatar-with-icon">
                                  {/* TODO : add logo here */}
                                  <div className="ai-chat-avatar">AI</div>
                                  <div className="ai-chat-icon">
                                    {/* <div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="#003366"
                                        className="size-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.25 3a.75.75 0 0 0-.75.75v7.5H4.56l1.97-1.97a.75.75 0 0 0-1.06-1.06l-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 0 0 1.06-1.06l-1.97-1.97h11.69A.75.75 0 0 0 17 12V3.75a.75.75 0 0 0-.75-.75Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div> */}
                                    <div
                                      onClick={() => handleCopy(data.content)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="#003366"
                                        className="size-7"
                                      >
                                        <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                                        <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                                <div className="ai-chat-text">
                                  <Markdown>{data.content}</Markdown>{' '}
                                  {isCopied && (
                                    <span className="text-green-500 ml-2">
                                      Copied!
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="user-chat-message">
                                <div className="">
                                  <div className="user-chat-avatar-with-icon my-auto">
                                    <div className="user-chat-icon">
                                      <div>
                                        <PenToSquare />
                                      </div>
                                    </div>
                                    <div className="user-chat-avatar-with-icon">
                                      {/* TODO: First later of user name */}
                                      <div className="user-chat-avatar">
                                        {user?.name.toUpperCase()[0]}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="user-chat-text">
                                  {data.content}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })}
                    {chatContent &&
                      //@ts-ignore
                      chatContent.length === 0 && (
                        <>
                          <NoDataFound displayText="No Any Douts Here" />
                        </>
                      )}
                  </div>
                )}
                {isCopied && (
                  <span className="text-white ml-2 w-full bg-green-500 text-center rounded-lg border z-20">
                    Copied!
                  </span>
                )}

                {/* TODO: Add gradient color for footer */}
                <div ref={ref} className="footer-input-and-send-btn">
                  <div className="footer-input-section">
                    <button className="plus-btn">
                      <PlusButton />
                    </button>
                    <input
                      type="text"
                      placeholder="Ask your doubts here..."
                      className="footer-input"
                      //@ts-ignore
                      ref={doutRef}
                    />
                  </div>
                  <div className="send-container">
                    <button className="send-btn" onClick={() => submitDout()}>
                      {displayLoadingAvatar ? (
                        <>
                          <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
                        </>
                      ) : (
                        <>
                          <ArrowUp />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LearningChatView;
