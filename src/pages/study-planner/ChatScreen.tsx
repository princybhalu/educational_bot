import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Orbit from '../../components/avatar/Orbit';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createChatTrackerId,
  getChatByChatTrackerId,
} from '../../services/api/chat-apis';
import {
  AddTaskByQueryApiCall,
  RemoveTaskApiCall,
} from '../../services/api/study-planner';
import { ChatLogsType } from '../../types/chat-logs';
import {
  Calendar,
  Clock,
  ArrowRight,
  Book,
  FileText,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Timer,
  MoreVertical,
  Edit3,
  Trash2,
  CircleCheck,
  ArrowLeft,
} from 'lucide-react';
import { Task } from '../../types/study-planner';
import NoDataFound from '../../components/shared/NoDataFound';
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from '../../utils/helperFunc';

const messages = [
  "What's your main focus today? Share your goals or study topics, and I'll create a tailored schedule to help you achieve them!",
  "Facing study challenges? Let me know what's on your mind—be it time management, tough topics, or exam stress—and I'll craft the perfect study plan.",
  "Tell me exactly what you need to work on—like 'Prepare for the math test' or 'Complete history notes'—and I'll schedule it for you!",
  "Not sure how to prioritize? Just mention your subjects, deadlines, or study hours, and I'll build a smart study plan for you.",
  "Type in what you want to study, how long you have, or even just Help me plan! and I'll take care of the rest.",
  "Whether it's cramming for an exam or maintaining daily progress, let me know your study goals, and I'll optimize your schedule for success.",
  "Struggling to stay organized? Share your study needs or upcoming deadlines, and I'll generate a customized, efficient plan.",
];

const chatMsg = '';

// const statusConfig = {
//   upcoming: {
//     bg: 'bg-blue-500/10',
//     border: 'border-blue-500/20',
//     text: 'text-blue-500',
//     icon: Clock,
//     hover: 'hover:border-blue-500/50',
//   },
//   in_progress: {
//     bg: 'bg-yellow-500/10',
//     border: 'border-yellow-500/20',
//     text: 'text-yellow-500',
//     icon: Timer,
//     hover: 'hover:border-yellow-500/50',
//   },
//   completed: {
//     bg: 'bg-green-500/10',
//     border: 'border-green-500/20',
//     text: 'text-green-500',
//     icon: CheckCircle,
//     hover: 'hover:border-green-500/50',
//   },
//   overdue: {
//     bg: 'bg-red-500/10',
//     border: 'border-red-500/20',
//     text: 'text-red-500',
//     icon: AlertCircle,
//     hover: 'hover:border-red-500/50',
//   },
// };

// const typeConfig = {
//   study: {
//     icon: Book,
//     label: 'Study Session',
//   },
//   test: {
//     icon: FileText,
//     label: 'Test',
//   },
//   exam_preparation: {
//     icon: GraduationCap,
//     label: 'Exam Prep',
//   },
// };

// function TaskCard({ task, theme }: { task: any; theme: any }) {
//   // @ts-ignore
//   const status = statusConfig[task.status ?? 'upcoming'];
//   // @ts-ignore
//   const type = typeConfig[task.type];
//   const TypeIcon = type?.icon || Book;
//   const StatusIcon = status?.icon || Clock;

//   const formatTime = (dateTimeStr: string) => {
//     const date = new Date(dateTimeStr);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true,
//     });
//   };

//   return (
//     <div
//       className={`
//         mb-4 p-4 rounded-xl border transition-all duration-300
//         ${theme.surface} ${status.border} ${status.bg} ${status.hover}
//       `}
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className="flex items-center gap-2 mb-2">
//             <TypeIcon className={`w-5 h-5 ${status.text}`} />
//             <span className={`text-xs md:text-sm font-medium ${status.text}`}>
//               {type?.label || 'Task'}
//             </span>
//             <StatusIcon className={`w-4 h-4 ${status.text}`} />
//           </div>

//           <h3 className={`text-md md:text-lg font-semibold mb-2 ${theme.text}`}>
//             {task.title}
//           </h3>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
//             <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
//               <Calendar className="w-4 h-4" />
//               <span className="text-xs md:text-sm">
//                 {new Date(task.date).toLocaleDateString()}
//               </span>
//             </div>
//             <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
//               <Clock className="w-4 h-4" />
//               <span className="text-xs md:text-sm">
//                 {formatTime(task.start_time_utc)}{' '}
//                 <ArrowRight className="w-4 h-4 inline" />{' '}
//                 {formatTime(task.end_time_utc)}
//               </span>
//             </div>
//           </div>

//           <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
//             <span className="font-medium">{task.metaData?.subject}</span>
//             <span className="mx-2">•</span>
//             <span>Chapter {task.metaData?.chapter}</span>
//             <span className="mx-2">•</span>
//             <span>{task.metaData?.topic}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// Define message type

const statusConfig = {
  upcoming: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    text: 'text-blue-500',
    icon: Clock,
    hover: 'hover:border-blue-500/50',
  },
  in_progress: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    text: 'text-yellow-500',
    icon: Timer,
    hover: 'hover:border-yellow-500/50',
  },
  completed: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    text: 'text-green-500',
    icon: CheckCircle,
    hover: 'hover:border-green-500/50',
  },
  overdue: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-500',
    icon: AlertCircle,
    hover: 'hover:border-red-500/50',
  },
};

const typeConfig = {
  study: {
    icon: Book,
    label: 'Study Session',
    lightBg: 'bg-blue-50',
    darkBg: 'bg-blue-400/10', // Lighter blue with lower opacity
    lightBorder: 'border-blue-200',
    darkBorder: 'border-blue-500', // Brighter border for visibility
    lightHover: 'hover:border-blue-300',
    darkHover: 'hover:border-blue-400', // More visible hover effect
  },
  test: {
    icon: FileText,
    label: 'Test',
    lightBg: 'bg-rose-50',
    darkBg: 'bg-rose-400/10', // Lighter rose with lower opacity
    lightBorder: 'border-rose-200',
    darkBorder: 'border-rose-500', // Brighter border for visibility
    lightHover: 'hover:border-rose-300',
    darkHover: 'hover:border-rose-400', // More visible hover effect
  },
  exam_preparation: {
    icon: GraduationCap,
    label: 'Exam Prep',
    lightBg: 'bg-emerald-50',
    darkBg: 'bg-emerald-400/10', // Lighter emerald with lower opacity
    lightBorder: 'border-emerald-200',
    darkBorder: 'border-emerald-500', // Brighter border for visibility
    lightHover: 'hover:border-emerald-300',
    darkHover: 'hover:border-emerald-400', // More visible hover effect
  },
};

function TaskCard({ task, theme }: { task: Task; theme: any }) {
  // @ts-ignore
  const status = statusConfig[task?.status ?? 'upcoming'];
  // @ts-ignore
  const type = typeConfig[task?.type] || typeConfig.study; // Fallback to study type
  const TypeIcon = type?.icon || Book;
  const StatusIcon = status?.icon || Clock;
  const isDark = useSelector(
    (state: { theme: { isDarkMode: boolean } }) => state.theme.isDarkMode
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const editTask = (task: Task) => {
    saveToLocalStorage('get-edit-task', task);
    navigate('/study-planner/edit');
  };

  const getTypeStyles = () => {
    return {
      bg: isDark ? type.darkBg : type.lightBg,
      border: isDark ? type.darkBorder : type.lightBorder,
      hover: isDark ? type.darkHover : type.lightHover,
      shadow: isDark ? type.darkShadow : '',
    };
  };

  const typeStyles = getTypeStyles();

  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`
        mb-4 p-4 rounded-xl border transition-all duration-300
        ${typeStyles.bg} ${typeStyles.border} ${typeStyles.hover}
        ${isDark ? 'shadow-lg' : ''} ${typeStyles.shadow}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <TypeIcon className={`w-5 h-5 ${status.text}`} />
            <span className={`text-xs md:text-sm font-medium ${status.text}`}>
              {type?.label || 'Task'}
            </span>
            <StatusIcon className={`w-4 h-4 ${status.text}`} />
          </div>

          <h3 className={`text-md md:text-lg font-semibold mb-2 ${theme.text}`}>
            {task.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
            <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
              <Calendar className="w-4 h-4" />
              <span className="text-xs md:text-sm">
                {new Date(task.date).toLocaleDateString()}
              </span>
            </div>
            <div className={`flex items-center gap-2 ${theme.textSecondary}`}>
              <Clock className="w-4 h-4" />
              <span className="text-xs md:text-sm">
                {formatTime(task.start_time_utc)}{' '}
                <ArrowRight className="w-4 h-4 inline" />{' '}
                {formatTime(task.end_time_utc)}
              </span>
            </div>
          </div>

          <div className={`text-xs md:text-sm ${theme.textSecondary}`}>
            <span className="font-medium">{task.meta_data?.subject}</span>
            <span className="mx-2">•</span>
            <span>Chapter {task.meta_data?.chapter}</span>
            <span className="mx-2">•</span>
            <span>{task.meta_data?.topic}</span>
          </div>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`p-2 rounded-lg ${theme.button} ${theme.buttonHover} transition-colors duration-300`}
          >
            <MoreVertical className={`w-5 h-5 ${theme.text}`} />
          </button>

          {showDropdown && (
            <div
              className={`
                absolute right-0 mt-2 w-48 rounded-lg border ${theme.surface} 
                ${theme.border} backdrop-blur-md shadow-lg z-50
              `}
              style={{
                boxShadow: '0 10px 30px rgba(67,97,238,0.2)',
              }}
            >
              <div className="py-2">
                <button
                  onClick={() => editTask(task)}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2
                    ${theme.buttonHover} ${theme.text} transition-colors duration-300
                  `}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Task
                </button>
                {/* <button
                  onClick={() => {
                    setShowDropdown(false);
                    DeleteTaskStatus(task);
                  }}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2 text-red-500
                    hover:bg-red-500/10 transition-colors duration-300
                    w-full px-4 py-2 text-left flex items-center gap-2 text-green-500
                    hover:bg-green-500/10 transition-colors duration-300
                  `}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </button> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface Message {
  role: 'user' | 'assistant';
  message: string;
}

interface EnhancedChatHistoryProps {
  messages: Message[];
  ApiCallToQuery: (query: string) => void;
  aiResLoading: boolean;
  loadingChat: boolean;
}

const EnhancedChatHistory: React.FC<EnhancedChatHistoryProps> = ({
  messages,
  ApiCallToQuery,
  aiResLoading,
  loadingChat,
}) => {
  const isDarkMode = useSelector(
    (state: { theme: { isDarkMode: boolean } }) => state.theme.isDarkMode
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const baseStyles = {
    light: {
      bg: 'bg-white',
      surface: 'bg-white/90',
      surface1: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-700/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-white/90',
      buttonHover: 'hover:bg-[#4361ee]/10',
      tabBackground: 'bg-blue-100',
      tabText: 'text-gray-800',
      activeTabBackground: 'bg-white',
      activeTabText: 'text-black',
    },
    dark: {
      bg: 'bg-[#0a0d1e]',
      surface: 'bg-[rgba(16,20,46,0.9)]',
      surface1: 'bg-[rgba(16,20,46)]',
      text: 'text-white',
      textSecondary: 'text-white/70',
      border: 'border-[#4361ee]/20',
      hover: 'hover:border-[#4361ee]',
      button: 'bg-[rgba(16,20,46,1)]',
      buttonHover: 'hover:bg-[#4361ee]/15',
      tabBackground: 'bg-[#1a2456]',
      tabText: 'text-white/80',
      activeTabBackground: 'bg-white/10',
      activeTabText: 'text-white',
    },
  };

  const theme = isDarkMode ? baseStyles.dark : baseStyles.light;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessageContent = (content: any, role: string) => {
    try {
      console.log(role, ' : role', content, content.length);
      if (role === 'user') {
        return <div className="whitespace-pre-wrap break-words">{content}</div>;
      }
      return (
        <div className="space-y-4">
          {
            // @ts-ignore
            content.map((task: any, idx: number) => (
              <TaskCard key={idx} task={task} theme={theme} />
            ))
          }
        </div>
      );
    } catch (err) {
      console.log('er ', err);
      return <div className="whitespace-pre-wrap break-words">{content}</div>;
    }
  };

  return (
    <>
      <div className="flex-1 w-full overflow-y-auto p-4 space-y-4">
        {!loadingChat &&
          messages.length > 0 &&
          messages.map((item, index) => (
            <div
              key={index}
              className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'} gap-4`}
            >
              {item.role === 'assistant' && (
                <div className="flex-shrink-0 mt-1">
                  <Orbit size={40} opration={null} />
                </div>
              )}
              <div
                className={`
                max-w-[85%] rounded-xl p-4
                ${
                  item.role === 'user'
                    ? 'bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white'
                    : `${theme.surface} border ${theme.border} ${theme.text}`
                }
              `}
              >
                <div
                  className={
                    item.role === 'assistant'
                      ? 'prose prose-sm dark:prose-invert'
                      : ''
                  }
                >
                  {renderMessageContent(item.message, item.role)}
                </div>
              </div>
            </div>
          ))}
        {aiResLoading && (
          <>
            {/* add ai response skeleton */}
            <AIResponseSkeleton />
          </>
        )}
        {loadingChat && (
          <>
            {/* add loading chat skeleton */}
            <ChatLoadingSkeleton />
          </>
        )}
        {!loadingChat && messages.length === 0 && (
          <>
            <div className="h-full flex flex-col justify-center items-center">
              <NoDataFound displayText={'Not any chat fouund'} />
              <div className="mt-10">
                <button
                  className=""
                  onClick={() => navigate('/study-planner-chat/new')}
                >
                  {' '}
                  Start a conversation
                </button>
              </div>
            </div>
          </>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 w-full sticky bottom-0 bg-inherit">
        <div
          className={`flex items-center rounded-xl shadow-lg p-4 ${theme.surface} border ${theme.border}`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Message AI Assistant"
            className={`flex-1 bg-transparent border-none outline-none text-sm md:text-base ${theme.text} placeholder-${isDarkMode ? 'white/50' : 'gray-500'}`}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && inputRef.current?.value) {
                ApiCallToQuery(inputRef.current.value);
                inputRef.current.value = '';
              }
            }}
          />
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] text-white hover:shadow-lg hover:shadow-[#4361ee]/20 transition-all duration-300"
            onClick={() => {
              if (inputRef.current?.value) {
                ApiCallToQuery(inputRef.current.value);
                inputRef.current.value = '';
              }
            }}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

const MessageSkeleton = ({ isAI = true }: { isAI: boolean }) => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const getGlassBackground = (isAI: boolean) => {
    if (isDarkMode) {
      return isAI ? 'rgba(16,20,46,0.9)' : 'rgba(67,97,238,0.15)';
    }
    return isAI ? 'rgba(255,255,255,0.9)' : 'rgba(67,97,238,0.1)';
  };

  return (
    <div
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} gap-4 w-full`}
    >
      {isAI && (
        <div className="flex-shrink-0 mt-1 w-10 h-10 rounded-full relative overflow-hidden">
          <div
            className="absolute inset-0 animate-pulse"
            style={{
              background: `linear-gradient(90deg, ${isDarkMode ? '#4361ee' : '#4cc9f0'}, ${isDarkMode ? '#4cc9f0' : '#4361ee'})`,
              boxShadow: `0 0 20px ${isDarkMode ? 'rgba(67,97,238,0.4)' : 'rgba(76,201,240,0.4)'}`,
            }}
          />
        </div>
      )}
      <div
        className={`
          ${isAI ? 'w-2/3' : 'w-1/2'}
          rounded-xl p-4
          relative overflow-hidden
          backdrop-blur-lg
        `}
        style={{
          background: getGlassBackground(isAI),
          border: `1px solid ${isDarkMode ? 'rgba(67,97,238,0.2)' : 'rgba(76,201,240,0.2)'}`,
          boxShadow: `0 10px 30px ${isDarkMode ? 'rgba(67,97,238,0.2)' : 'rgba(76,201,240,0.2)'}`,
        }}
      >
        <div className="space-y-3">
          {[...(isAI ? [3 / 4, 1 / 2, 4 / 5, 2 / 3] : [1, 3 / 4])].map(
            (width, index) => (
              <div
                key={index}
                className="h-4 rounded relative overflow-hidden"
                style={{
                  width: `${width * 100}%`,
                  background: isDarkMode
                    ? 'rgba(255,255,255,0.1)'
                    : 'rgba(0,0,0,0.1)',
                }}
              >
                <div
                  className="absolute inset-0 animate-shimmer"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${isDarkMode ? 'rgba(67,97,238,0.2)' : 'rgba(76,201,240,0.2)'}, transparent)`,
                    transform: 'translateX(-100%)',
                  }}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const ChatLoadingSkeleton = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  return (
    <div
      className="space-y-6 p-4"
      style={{
        background: isDarkMode ? '#0a0d1e' : '#ffffff',
      }}
    >
      {[...Array(3)].map((_, index) => (
        <MessageSkeleton key={index} isAI={index % 2 === 0} />
      ))}
    </div>
  );
};

export const AIResponseSkeleton = () => <MessageSkeleton isAI={true} />;

export default function ChatScreen() {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const { chatId } = useParams();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const ChatScreenTextAreaBoxRef = useRef();
  const navigate = useNavigate();
  const [chatLogs, setChatLogs] = useState<ChatLogsType[] | null>(null);
  const [loadingChat, setLoadingChat] = useState(false);
  const [aiResLoading, setAiResLoading] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const ApiCallToChatTrackerId = async () => {
    try {
      if (ChatScreenTextAreaBoxRef.current) {
        saveToLocalStorage(
          'new-task-que',
          // @ts-ignore
          ChatScreenTextAreaBoxRef.current.value
        );
      }
      const res = await createChatTrackerId();

      navigate('/study-planner-chat/' + res.data.chat_tracker_id);
    } catch (err) {
      console.log(err);
    }
  };

  const ApiCallToQuery = async (msg: string) => {
    try {
      setAiResLoading(true);
      let tempData = {
        role: 'user',
        message: msg,
      };
      // @ts-ignore
      setChatLogs((prev: ChatLogsType[] | null) => {
        if (prev) {
          return [...prev, tempData];
        }
        return [tempData];
      });
      const res = await AddTaskByQueryApiCall({
        query: msg,
        chat_tracker_id: chatId,
      });
      const tempArray = res.data.map((task: any) => {
        return { ...task.tasks };
      });
      console.log(res.data);
      tempData = {
        role: 'assistant',
        message: tempArray,
      };
      // @ts-ignore
      setChatLogs((prev: ChatLogsType[] | null) => {
        if (prev) {
          return [...prev, tempData];
        }
        return [tempData];
      });
    } catch (err) {
      console.log(err);
    } finally {
      setAiResLoading(false);
    }
  };

  const ApiCallToGetChat = async () => {
    try {
      console.log('in chat call');
      setLoadingChat(true);
      const res = await getChatByChatTrackerId(chatId ?? '');
      console.log(res.data, ' :  res.data.messages');
      setChatLogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingChat(false);
    }
  };
  useEffect(() => {
    let interval: any;
    const chatMsgByLocal = getFromLocalStorage('new-task-que');
    console.log({ chatMsgByLocal, chatId, c: chatId && !chatMsgByLocal });
    if (chatId === 'new') {
      interval = setInterval(() => {
        setCurrentMessageIndex(
          (prevIndex) => (prevIndex + 1) % messages.length
        );
      }, 5000);
    } else if (chatId && !chatMsgByLocal) {
      ApiCallToGetChat();
    } else if (chatMsgByLocal) {
      const addUserPromat: ChatLogsType = {
        role: 'user',
        message: chatMsg,
      };
      setChatLogs([addUserPromat]);
      ApiCallToQuery(chatMsgByLocal).then();
      saveToLocalStorage('new-task-que', '');
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [chatId]);

  return (
    <>
      <div
        className={`
              flex flex-col items-center justify-center h-full
              transition-colors duration-300
              ${isDarkMode ? 'bg-[#0a0d1e]' : 'bg-gray-50'}
            `}
      >
        {/* Back Navigation Button */}
        <div
          className={`
        w-full p-4
        ${isDarkMode ? 'bg-[#0a0d1e]' : 'bg-gray-50'}
      `}
        >
          <button
            onClick={handleBack}
            className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            transition-all duration-300
            ${
              isDarkMode
                ? 'text-white/70 hover:bg-[rgba(16,20,46,1)]'
                : 'text-gray-600 hover:bg-white/90'
            }
          `}
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>

        {chatId === 'new' && (
          <>
            <div
              className={`
              flex flex-col items-center justify-center h-full w-full
              transition-colors duration-300
              ${isDarkMode ? 'bg-[#0a0d1e]' : 'bg-gray-50'}
            `}
            >
              <div className="mb-6">
                <Orbit opration={null} size={100} />
              </div>

              <h1 className="text-2xl md:text-4xl font-bold font-[Darker Grotesque] bg-gradient-to-r from-[#4361ee] to-[#4cc9f0] bg-clip-text text-transparent mb-6">
                What can I help with?
              </h1>

              <div
                key={currentMessageIndex}
                className={`
                w-[90%] md:w-1/2 text-center rounded-xl shadow-lg py-4 px-6 mb-6
                transition-all duration-300
                ${
                  isDarkMode
                    ? 'bg-[rgba(16,20,46,1)] border border-[rgba(67,97,238,0.2)] text-white/70'
                    : 'bg-white/90 border border-gray-200 text-gray-600'
                }
                hover:shadow-lg
                ${
                  isDarkMode
                    ? 'hover:shadow-[0_10px_30px_rgba(67,97,238,0.2)]'
                    : 'hover:shadow-[0_10px_30px_rgba(67,97,238,0.1)]'
                }
              `}
              >
                {messages[currentMessageIndex]}
              </div>

              <div
                className={`
                flex items-center w-[90%] md:w-1/2 rounded-xl shadow-lg p-4
                ${
                  isDarkMode
                    ? 'bg-[rgba(16,20,46,1)] border border-[rgba(67,97,238,0.2)]'
                    : 'bg-white/90 border border-gray-200'
                }
              `}
              >
                <input
                  //@ts-ignore
                  ref={ChatScreenTextAreaBoxRef}
                  type="text"
                  placeholder="Message AI Assistant"
                  className={`
                  flex-1 bg-transparent border-none outline-none text-sm md:text-base
                  ${
                    isDarkMode
                      ? 'text-white placeholder-white/50'
                      : 'text-gray-900 placeholder-gray-500'
                  }
                `}
                />
                <button
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-lg
                  transition-all duration-300
                  bg-gradient-to-r from-[#4361ee] to-[#4cc9f0]
                  text-white hover:shadow-lg
                  hover:shadow-[#4361ee]/20
                `}
                  aria-label="Send"
                  onClick={ApiCallToChatTrackerId}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        )}

        {chatId !== 'new' && (
          <>
            {chatLogs && (
              <EnhancedChatHistory
                messages={chatLogs}
                ApiCallToQuery={ApiCallToQuery}
                aiResLoading={aiResLoading}
                loadingChat={loadingChat}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
