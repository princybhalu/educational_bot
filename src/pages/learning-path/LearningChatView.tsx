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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { type, relevantId, topicName } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatedProgress, setIsCreatedProgress] = useState(false);
  const [mainContent, setMainContent] = useState(null);
  const [chatContent, setChatContent] = useState(null);
  const doutRef = useRef();

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
        }
      } else {
        //@ts-ignore
        setMainContent('No content');
      }
    } catch (err) {
      console.log(err);
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

  console.log({ chatContent });

  return (
    <>
      {isLoading && (
        <>
          <div>Loading..</div>
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
                <h2 className="font-semibold">{topicName}</h2>
                {/* <div className="card-name">chapter Name</div> */}
              </div>
              <div className="card-content">
                <Markdown>{mainContent}</Markdown>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className={`footer-container ${isChatOpen ? 'expand-footer-container' : ''}`}
          >
            <div className="footer">
              <div className="footer-arrow-up">
                <button className="arrow-btn" onClick={toggleChat}>
                  {isChatOpen ? <AnglesDown /> : <AnglesUp />}
                </button>
              </div>
              {isChatOpen && (
                <div className="chat-section">
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
                                <div className="ai-chat-avatar">AI</div>
                                <div className="ai-chat-icon">
                                  <div>
                                    <PenToSquare />
                                  </div>
                                  <div>
                                    <PenToSquare />
                                  </div>
                                </div>
                              </div>
                              <div className="ai-chat-text">
                                <Markdown>{data.content}</Markdown>{' '}
                              </div>
                            </div>
                          ) : (
                            <div className="user-chat-message">
                              <div className="user-chat-avatar-with-icon">
                                <div className="user-chat-icon">
                                  <div>
                                    <PenToSquare />
                                  </div>
                                </div>
                              </div>
                              <div className="user-chat-text">
                                {data.content}
                              </div>
                              <div className="user-chat-avatar-with-icon">
                                {/* TODO: First later of user name */}
                                <div className="user-chat-avatar">U</div>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
              )}

              {/* TODO: Add gradient color for footer */}
              <div className="footer-input-and-send-btn">
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
                  <button className="plus-btn">
                    <PlusButton />
                  </button>
                  <button className="plus-btn">
                    <PlusButton />
                  </button>
                </div>
                <div className="send-container">
                  <button className="send-btn" onClick={() => submitDout()}>
                    <ArrowUp />
                  </button>
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
