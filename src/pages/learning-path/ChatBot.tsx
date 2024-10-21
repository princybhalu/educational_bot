import React, { FC, useEffect, useRef, useState } from 'react';
import '../style/chat-bot.css';
import BackButton from 'assets/icons/BackButton';
import PlusButton from 'assets/icons/PlusButton';
import AnglesUp from 'assets/icons/AnglesUpIcon';
import AnglesDown from 'assets/icons/AnglesDown';
import PenToSquare from 'assets/icons/PenToSquare';
import ArrowUp from 'assets/icons/ArrowUp';
import { log } from 'console';

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

const responseObj: ChatResponse = {
  Status: 'Success',
  data: {
    id: '67114411c35e27f7b74cfbc7',
    created_by: 'b036c655-b16d-4894-bc6a-9d609c783247',
    messages: [
      {
        role: 'user',
        content:
          "explain Understanding of Delay, Loss and Throughput in the packet-switching network. output as proper markdown.. User's psychological profile: Playing Minecraft provides relaxation and an escape, highlighting a preference for enjoyable leisure activities.. Shows confidence in tackling complex subjects with foundational understanding, suggesting a resilient mindset. Use this to alter response.",
      },
      {
        role: 'assistant',
        content:
          "# Understanding Delay, Loss, and Throughput in Packet-Switching Networks\n\nWhen diving into the intricacies of packet-switching networks, it's essential to grasp the fundamental concepts of *delay, **loss, and **throughput. These aspects significantly affect the performance and user experience in a network, much like managing resources and connectivity in a game of Minecraft.\n\n## Delay\n\nDelay* refers to the time it takes for a packet of data to travel from the source to the destination. In simpler terms, it's the lag you might experience when sending a message or streaming a video. There are several components to delay:\n\n1. *Transmission Delay: The time required to push all the packet's bits onto the wire. This is influenced by the packet's size and the transmission rate of the network.\n  \n2. **Propagation Delay: This is the time it takes for a packet to travel the distance between the sender and receiver.\n\n3. **Queuing Delay: This delay occurs when packets are waiting in a queue before they can be processed by a router. In busy networks, this can become significant.\n\n4. **Processing Delay: The time it takes a router to process the packet header and make routing decisions.\n\nOverall, minimizing delay can enhance your network experience, similar to reducing latency in a game, allowing smooth gameplay and communication.\n\n## Loss\n\nPacket loss* happens when packets of data fail to reach their destination. It's like losing blocks or resources in Minecraft due to a disconnect – frustrating and disruptive. Packet loss can occur for several reasons:\n\n- *Network Congestion: When too many users overload a network, it can lead to loss as routers drop packets to manage the flow.\n- **Faulty Hardware: Bad routers, interfaces, or cables can cause packets to be lost.\n- **Interference: In wireless networks, interference from other devices can lead to packet loss.\n\nWhen packet loss occurs, it impacts your network’s reliability, similar to how losing items in a game can affect your progress.\n\n## Throughput\n\nThroughput* measures the actual rate at which successful data is transmitted over a network. It is often expressed in bits per second (bps). Think of it as your effective mining speed in Minecraft; how quickly you can gather resources significantly affects your gameplay. Factors influencing throughput include:\n\n- *Bandwidth: The maximum rate at which data can be transmitted. Higher bandwidth allows more data to be sent at once.\n- **Network Overhead: Protocols and metadata can consume some of the bandwidth, affecting throughput.\n- **Conditions of the Network*: Network congestion and distance can both impact how effectively data can be transmitted.\n\n### Conclusion\n\nUnderstanding delay, loss, and throughput in packet-switching networks is crucial for optimizing performance. By drawing parallels to your experiences in gaming, it’s easier to appreciate how these technical factors influence the overall network experience. Just as in Minecraft, where each second counts in gathering resources and building, the same applies to data transmission in networks. Striving for lower delays, minimal loss, and higher throughput can create a better experience, whether in your favorite game or in your online activities.",
      },
      {
        role: 'user',
        content:
          "what is throughput. User's psychological profile: Playing Minecraft provides relaxation and an escape, highlighting a preference for enjoyable leisure activities.. Shows confidence in tackling complex subjects with foundational understanding, suggesting a resilient mindset. Use this to alter response.",
      },
      {
        role: 'assistant',
        content:
          "# Understanding Throughput\n\nThroughput is a critical concept in networking that reflects the actual rate at which data is successfully transmitted over a network. Essentially, it measures how much data can be sent from one point to another in a specific amount of time, typically expressed in bits per second (bps). \n\n## Why Throughput Matters\n\nThink of throughput like your mining efficiency in Minecraft. When you're in the game, the speed at which you can gather resources – whether coal, diamonds, or food – directly affects your ability to craft items and build structures. Similarly, in networking, higher throughput means more data can flow smoothly, enabling tasks like streaming videos, downloading files, or improving online gaming experiences without lag.\n\n### Factors Affecting Throughput\n\nSeveral factors can influence throughput:\n\n1. *Bandwidth: This is the maximum capacity of the network connection – sort of like the size of your mining inventory. A larger bandwidth allows more data to be transmitted at once.\n\n2. **Network Overhead: Just like in Minecraft, where you might have to manage your inventory space for tools and resources, network protocols and additional data can take up bandwidth, reducing throughput.\n\n3. **Packet Loss: Similar to losing items when you fall in lava, packet loss means some data may not reach its destination. This can force retransmissions, which effectively lowers throughput.\n\n4. **Latency: The time it takes for data to travel across the network can impact throughput. Lower latency means quicker access to data, allowing for smoother communication.\n\n5. **Network Conditions*: Just as your gameplay might be affected by server lag, the overall health of the network, including congestion and interference, can hinder throughput.\n\n### Conclusion\n\nUnderstanding throughput can help you appreciate how data flows in a network. Much like you strategize to gather resources efficiently in Minecraft, recognizing the limits and capabilities of your network connection can enhance your online activities. Whether you're gaming, browsing, or streaming, aiming for higher throughput will lead to a more fluid and enjoyable experience. Always remember: the better the throughput, the smoother your digital escapades will be!",
      },
      {
        role: 'user',
        content: 'what is throughput',
      },
      {
        role: 'assistant',
        content:
          "Throughput is a key concept that describes the rate at which data is successfully transferred over a network in a given time period, typically measured in bits per second (bps). You can think of it like the speed at which you gather resources in your Minecraft world.\n\n### Connecting Throughput to Your Experience\n\nImagine you're mining for diamonds in Minecraft. The effectiveness with which you mine reflects your throughput. If you can mine multiple blocks quickly and efficiently, you're maximizing your gameplay – much like how high throughput allows for smooth streaming, gaming, or downloading online.\n\n### Key Elements Influencing Throughput\n\n1. *Bandwidth: This is akin to the size of your mining inventory. Higher bandwidth means you can send or receive more data simultaneously, just as an expanded inventory lets you collect more diamonds without constantly going back to your base.\n\n2. **Network Overhead: Think of this like the tools or equipment you carry. Some of that space gets taken up by necessary items (like crafting tables or torches), limiting how much you can actually carry back to your base. In networking, protocols and signals can use up bandwidth, influencing overall throughput.\n\n3. **Packet Loss: Remember those moments in Minecraft where a block disappears, and you have to go back to mine it again? Packet loss occurs when some data doesn't reach its destination, similar to losing precious resources, which can slow down the overall process.\n\n4. **Latency: If you're trying to move quickly in the game but experience lag, it can definitely affect your performance. Latency is the delay before data starts transferring, and lower latency helps keep your experience smooth.\n\n5. **Network Conditions*: Just like a Minecraft server can get crowded during peak hours, leading to performance drops, network congestion and interference can reduce throughput efficiency.\n\n### Why It Matters\n\nUnderstanding throughput can enhance your digital experiences. When everything flows smoothly, you enjoy uninterrupted gaming, streaming, or browsing, much like the pleasure you find in Minecraft when you're fully immersed in building and exploring. Recognizing how throughput works can empower you to optimize your online interactions, creating a more enjoyable escape into your favorite activities.\n\nSo, think of throughput as your resource-gathering efficiency in the digital realm – the higher it is, the better your experience. Just as you enjoy strategizing in Minecraft, leveraging your understanding of throughput can help you navigate the complexities of the online world with resilience and confidence.",
      },
    ],
  },
};

const ChatBot: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const chatSectionRef = useRef<HTMLDivElement | null>(null);
  const arrowRef = useRef<HTMLButtonElement | null>(null);
  const [arrowButtonBottomHeight, setArrowButtonBottomHeight] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [num, setNum] = useState(0);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

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

  return (
    <>
      <div className="content-container">
        {/* Bake button */}
        <div className="back-to-chapter">
          <BackButton /> &nbsp; Back to Chapter
        </div>

        {/* Title Card */}
        <div className={`topic-card ${isChatOpen ? 'shrink-card' : ''}`}>
          <div className="topic-name">
            <h2>Topic Name</h2>
            {/* <div className="card-name">Card Name</div> */}
          </div>
          <div className="card-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
              amet nulla auctor, vestibulum magna sed, convallis ex.
            </p>
            <ul>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>
                Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`footer-container ${isChatOpen ? 'expand-footer-container' : ''}`}
      >
        <div className="footer">
          <div className="footer-arrow-up">
            <button ref={arrowRef} className="arrow-btn" onClick={toggleChat}>
              {isChatOpen ? <AnglesDown /> : <AnglesUp />}
            </button>
          </div>

          <div className="chat-section-main">
            {isChatOpen && (
              <div ref={chatSectionRef} className="chat-section">
                {tempFunc()}
                {responseObj.data.messages.map((data, index) => {
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
                          <div className="ai-chat-text">{data.content}</div>
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
                          <div className="user-chat-text">{data.content}</div>
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
            <div ref={ref} className="footer-input-and-send-btn">
              <div className="footer-input-section">
                <button className="plus-btn">
                  <PlusButton />
                </button>
                <input
                  type="text"
                  placeholder="Ask your doubts here..."
                  className="footer-input"
                />
                <button className="plus-btn">
                  <PlusButton />
                </button>
                <button className="plus-btn">
                  <PlusButton />
                </button>
              </div>
              <div className="send-container">
                <button className="send-btn">
                  <ArrowUp />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
