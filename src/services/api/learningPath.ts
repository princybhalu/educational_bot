import http from '../http';

export const GetAllSubjects = () => {
  // return {
  //   Status: 'Success',
  //   data: [
  //     {
  //       id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       subject_name: 'Computer Network',
  //       board: 'University',
  //       field: 'Information Technology',
  //       semester: '5',
  //       chapter_ids: [
  //         'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //         'c8c9f0ef-d55d-4f73-bf97-38de03c89d06',
  //         'd9dae0ff-d66e-4f74-bf98-39ef04d9e117',
  //         'e0ebf1ff-d77f-4f75-bf99-40ff05e0f228',
  //         'f9c82e50-cd6f-4535-bdf3-d67c4cf14b65',
  //       ],
  //     },
  //     {
  //       id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       subject_name: 'Computer Network',
  //       board: 'University',
  //       field: 'Information Technology',
  //       semester: '5',
  //       chapter_ids: [
  //         'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //         'c8c9f0ef-d55d-4f73-bf97-38de03c89d06',
  //         'd9dae0ff-d66e-4f74-bf98-39ef04d9e117',
  //         'e0ebf1ff-d77f-4f75-bf99-40ff05e0f228',
  //         'f9c82e50-cd6f-4535-bdf3-d67c4cf14b65',
  //       ],
  //     },
  //     {
  //       id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       subject_name: 'Computer Network',
  //       board: 'University',
  //       field: 'Information Technology',
  //       semester: '5',
  //       chapter_ids: [
  //         'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //         'c8c9f0ef-d55d-4f73-bf97-38de03c89d06',
  //         'd9dae0ff-d66e-4f74-bf98-39ef04d9e117',
  //         'e0ebf1ff-d77f-4f75-bf99-40ff05e0f228',
  //         'f9c82e50-cd6f-4535-bdf3-d67c4cf14b65',
  //       ],
  //     },
  //   ],
  // };
  return http.get({
    url: '/resources-directory-service/subjects',
    messageSettings: { hideSuccessMessage: true },
  });
};

export const GetChapterListBySubjectId = (subjectId: string) => {
  // return {
  //   Status: 'Success',
  //   data: [
  //     {
  //       id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //       subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       chapter_name: 'Unit-1: Introduction to Computer Networks and Internet',
  //       topic_ids: [
  //         {
  //           id: 'c403512e-453e-4fe0-bae7-6f4426f8a0eb',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Understanding of network and Internet',
  //         },
  //         {
  //           id: '4e5eec59-7871-496e-8d49-f902e4b49a2b',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network edge',
  //         },
  //         {
  //           id: '898b50fe-bb60-43b4-a7f9-f87234f8d4a1',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network core',
  //         },
  //         {
  //           id: 'b0195a4d-92e7-4c87-95a4-e045a75c7b89',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name:
  //             'Understanding of Delay, Loss and Throughput in the packet-switching network',
  //         },
  //         {
  //           id: '7b9ec345-1e54-4344-991e-5e6b23a58736',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Protocols layers and their service model',
  //         },
  //         {
  //           id: '5ec6da24-9a1d-40d5-8662-bf052534d6dc',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'History of the computer network',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c96',
  //       subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       chapter_name: 'Unit-1: Introduction to Computer Networks and Internet',
  //       topic_ids: [
  //         {
  //           id: 'c403512e-453e-4fe0-bae7-6f4426f8a0eb',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Understanding of network and Internet',
  //         },
  //         {
  //           id: '4e5eec59-7871-496e-8d49-f902e4b49a2b',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network edge',
  //         },
  //         {
  //           id: '898b50fe-bb60-43b4-a7f9-f87234f8d4a1',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network core',
  //         },
  //         {
  //           id: 'b0195a4d-92e7-4c87-95a4-e045a75c7b89',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name:
  //             'Understanding of Delay, Loss and Throughput in the packet-switching network',
  //         },
  //         {
  //           id: '7b9ec345-1e54-4344-991e-5e6b23a58736',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Protocols layers and their service model',
  //         },
  //         {
  //           id: '5ec6da24-9a1d-40d5-8662-bf052534d6dc',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'History of the computer network',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c97',
  //       subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       chapter_name: 'Unit-1: Introduction to Computer Networks and Internet',
  //       topic_ids: [
  //         {
  //           id: 'c403512e-453e-4fe0-bae7-6f4426f8a0eb',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Understanding of network and Internet',
  //         },
  //         {
  //           id: '4e5eec59-7871-496e-8d49-f902e4b49a2b',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network edge',
  //         },
  //         {
  //           id: '898b50fe-bb60-43b4-a7f9-f87234f8d4a1',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network core',
  //         },
  //         {
  //           id: 'b0195a4d-92e7-4c87-95a4-e045a75c7b89',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name:
  //             'Understanding of Delay, Loss and Throughput in the packet-switching network',
  //         },
  //         {
  //           id: '7b9ec345-1e54-4344-991e-5e6b23a58736',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Protocols layers and their service model',
  //         },
  //         {
  //           id: '5ec6da24-9a1d-40d5-8662-bf052534d6dc',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'History of the computer network',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c98',
  //       subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       chapter_name: 'Unit-1: Introduction to Computer Networks and Internet',
  //       topic_ids: [
  //         {
  //           id: 'c403512e-453e-4fe0-bae7-6f4426f8a0eb',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Understanding of network and Internet',
  //         },
  //         {
  //           id: '4e5eec59-7871-496e-8d49-f902e4b49a2b',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network edge',
  //         },
  //         {
  //           id: '898b50fe-bb60-43b4-a7f9-f87234f8d4a1',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network core',
  //         },
  //         {
  //           id: 'b0195a4d-92e7-4c87-95a4-e045a75c7b89',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name:
  //             'Understanding of Delay, Loss and Throughput in the packet-switching network',
  //         },
  //         {
  //           id: '7b9ec345-1e54-4344-991e-5e6b23a58736',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Protocols layers and their service model',
  //         },
  //         {
  //           id: '5ec6da24-9a1d-40d5-8662-bf052534d6dc',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'History of the computer network',
  //         },
  //       ],
  //     },
  //     {
  //       id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c99',
  //       subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //       chapter_name: 'Unit-1: Introduction to Computer Networks and Internet',
  //       topic_ids: [
  //         {
  //           id: 'c403512e-453e-4fe0-bae7-6f4426f8a0eb',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Understanding of network and Internet',
  //         },
  //         {
  //           id: '4e5eec59-7871-496e-8d49-f902e4b49a2b',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network edge',
  //         },
  //         {
  //           id: '898b50fe-bb60-43b4-a7f9-f87234f8d4a1',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'The network core',
  //         },
  //         {
  //           id: 'b0195a4d-92e7-4c87-95a4-e045a75c7b89',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name:
  //             'Understanding of Delay, Loss and Throughput in the packet-switching network',
  //         },
  //         {
  //           id: '7b9ec345-1e54-4344-991e-5e6b23a58736',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'Protocols layers and their service model',
  //         },
  //         {
  //           id: '5ec6da24-9a1d-40d5-8662-bf052534d6dc',
  //           subject_id: '3e60b4b4-5934-4f72-bf96-37cd02b78c95',
  //           chapter_id: 'b7b8e9df-c44c-4f72-bf96-37cd02b78c95',
  //           topic_name: 'History of the computer network',
  //         },
  //       ],
  //     },
  //   ],
  // };
  return http.get({
    url: '/resources-directory-service/subjects/' + subjectId,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const CreateProgrssApiCall = (body: any) => {
  // return "done";
  return http.post({
    url: '/user-service/progress/',
    data: body,
    messageSettings: { hideSuccessMessage: true, hideErrorMessage: true },
  });
};

export const GetProgressApiCall = (topicId: string) => {
  return http.get({
    url: '/user-service/progress/' + topicId,
    messageSettings: { hideSuccessMessage: true },
  });
};

export const ChatApiCall = (body: any, relevantId: string) => {
  console.log('api call');

  //   return {
  //     "Status": "Success",
  //     "data": {
  //         "_id": "67114411c35e27f7b74cfbc7",
  //         "created_by": "b036c655-b16d-4894-bc6a-9d609c783247",
  //         "messages": [
  //             {
  //                 "role": "user",
  //                 "content": "explain Understanding of Delay, Loss and Throughput in the packet-switching network. output as proper markdown.. User's psychological profile: Playing Minecraft provides relaxation and an escape, highlighting a preference for enjoyable leisure activities.. Shows confidence in tackling complex subjects with foundational understanding, suggesting a resilient mindset. Use this to alter response."
  //             },
  //             {
  //                 "role": "assistant",
  //                 "content": "# Understanding Delay, Loss, and Throughput in Packet-Switching Networks\n\nWhen diving into the intricacies of packet-switching networks, it's essential to grasp the fundamental concepts of **delay**, **loss**, and **throughput**. These aspects significantly affect the performance and user experience in a network, much like managing resources and connectivity in a game of Minecraft.\n\n## Delay\n\n**Delay** refers to the time it takes for a packet of data to travel from the source to the destination. In simpler terms, it's the lag you might experience when sending a message or streaming a video. There are several components to delay:\n\n1. **Transmission Delay**: The time required to push all the packet's bits onto the wire. This is influenced by the packet's size and the transmission rate of the network.\n  \n2. **Propagation Delay**: This is the time it takes for a packet to travel the distance between the sender and receiver.\n\n3. **Queuing Delay**: This delay occurs when packets are waiting in a queue before they can be processed by a router. In busy networks, this can become significant.\n\n4. **Processing Delay**: The time it takes a router to process the packet header and make routing decisions.\n\nOverall, minimizing delay can enhance your network experience, similar to reducing latency in a game, allowing smooth gameplay and communication.\n\n## Loss\n\n**Packet loss** happens when packets of data fail to reach their destination. It's like losing blocks or resources in Minecraft due to a disconnect – frustrating and disruptive. Packet loss can occur for several reasons:\n\n- **Network Congestion**: When too many users overload a network, it can lead to loss as routers drop packets to manage the flow.\n- **Faulty Hardware**: Bad routers, interfaces, or cables can cause packets to be lost.\n- **Interference**: In wireless networks, interference from other devices can lead to packet loss.\n\nWhen packet loss occurs, it impacts your network’s reliability, similar to how losing items in a game can affect your progress.\n\n## Throughput\n\n**Throughput** measures the actual rate at which successful data is transmitted over a network. It is often expressed in bits per second (bps). Think of it as your effective mining speed in Minecraft; how quickly you can gather resources significantly affects your gameplay. Factors influencing throughput include:\n\n- **Bandwidth**: The maximum rate at which data can be transmitted. Higher bandwidth allows more data to be sent at once.\n- **Network Overhead**: Protocols and metadata can consume some of the bandwidth, affecting throughput.\n- **Conditions of the Network**: Network congestion and distance can both impact how effectively data can be transmitted.\n\n### Conclusion\n\nUnderstanding delay, loss, and throughput in packet-switching networks is crucial for optimizing performance. By drawing parallels to your experiences in gaming, it’s easier to appreciate how these technical factors influence the overall network experience. Just as in Minecraft, where each second counts in gathering resources and building, the same applies to data transmission in networks. Striving for lower delays, minimal loss, and higher throughput can create a better experience, whether in your favorite game or in your online activities."
  //             },
  //             {
  //                 "role": "user",
  //                 "content": "what is throughput. User's psychological profile: Playing Minecraft provides relaxation and an escape, highlighting a preference for enjoyable leisure activities.. Shows confidence in tackling complex subjects with foundational understanding, suggesting a resilient mindset. Use this to alter response."
  //             },
  //             {
  //                 "role": "assistant",
  //                 "content": "# Understanding Throughput\n\nThroughput is a critical concept in networking that reflects the actual rate at which data is successfully transmitted over a network. Essentially, it measures how much data can be sent from one point to another in a specific amount of time, typically expressed in bits per second (bps). \n\n## Why Throughput Matters\n\nThink of throughput like your mining efficiency in Minecraft. When you're in the game, the speed at which you can gather resources – whether coal, diamonds, or food – directly affects your ability to craft items and build structures. Similarly, in networking, higher throughput means more data can flow smoothly, enabling tasks like streaming videos, downloading files, or improving online gaming experiences without lag.\n\n### Factors Affecting Throughput\n\nSeveral factors can influence throughput:\n\n1. **Bandwidth**: This is the maximum capacity of the network connection – sort of like the size of your mining inventory. A larger bandwidth allows more data to be transmitted at once.\n\n2. **Network Overhead**: Just like in Minecraft, where you might have to manage your inventory space for tools and resources, network protocols and additional data can take up bandwidth, reducing throughput.\n\n3. **Packet Loss**: Similar to losing items when you fall in lava, packet loss means some data may not reach its destination. This can force retransmissions, which effectively lowers throughput.\n\n4. **Latency**: The time it takes for data to travel across the network can impact throughput. Lower latency means quicker access to data, allowing for smoother communication.\n\n5. **Network Conditions**: Just as your gameplay might be affected by server lag, the overall health of the network, including congestion and interference, can hinder throughput.\n\n### Conclusion\n\nUnderstanding throughput can help you appreciate how data flows in a network. Much like you strategize to gather resources efficiently in Minecraft, recognizing the limits and capabilities of your network connection can enhance your online activities. Whether you're gaming, browsing, or streaming, aiming for higher throughput will lead to a more fluid and enjoyable experience. Always remember: the better the throughput, the smoother your digital escapades will be!"
  //             },
  //             {
  //                 "role": "user",
  //                 "content": "what is throughput"
  //             },
  //             {
  //                 "role": "assistant",
  //                 "content": "Throughput is a key concept that describes the rate at which data is successfully transferred over a network in a given time period, typically measured in bits per second (bps). You can think of it like the speed at which you gather resources in your Minecraft world.\n\n### Connecting Throughput to Your Experience\n\nImagine you're mining for diamonds in Minecraft. The effectiveness with which you mine reflects your throughput. If you can mine multiple blocks quickly and efficiently, you're maximizing your gameplay – much like how high throughput allows for smooth streaming, gaming, or downloading online.\n\n### Key Elements Influencing Throughput\n\n1. **Bandwidth**: This is akin to the size of your mining inventory. Higher bandwidth means you can send or receive more data simultaneously, just as an expanded inventory lets you collect more diamonds without constantly going back to your base.\n\n2. **Network Overhead**: Think of this like the tools or equipment you carry. Some of that space gets taken up by necessary items (like crafting tables or torches), limiting how much you can actually carry back to your base. In networking, protocols and signals can use up bandwidth, influencing overall throughput.\n\n3. **Packet Loss**: Remember those moments in Minecraft where a block disappears, and you have to go back to mine it again? Packet loss occurs when some data doesn't reach its destination, similar to losing precious resources, which can slow down the overall process.\n\n4. **Latency**: If you're trying to move quickly in the game but experience lag, it can definitely affect your performance. Latency is the delay before data starts transferring, and lower latency helps keep your experience smooth.\n\n5. **Network Conditions**: Just like a Minecraft server can get crowded during peak hours, leading to performance drops, network congestion and interference can reduce throughput efficiency.\n\n### Why It Matters\n\nUnderstanding throughput can enhance your digital experiences. When everything flows smoothly, you enjoy uninterrupted gaming, streaming, or browsing, much like the pleasure you find in Minecraft when you're fully immersed in building and exploring. Recognizing how throughput works can empower you to optimize your online interactions, creating a more enjoyable escape into your favorite activities.\n\nSo, think of throughput as your resource-gathering efficiency in the digital realm – the higher it is, the better your experience. Just as you enjoy strategizing in Minecraft, leveraging your understanding of throughput can help you navigate the complexities of the online world with resilience and confidence."
  //             }
  //         ]
  //     }
  // }

  return http.post({
    url: '/user-service/chat/' + relevantId,
    data: body,
    messageSettings: { hideSuccessMessage: true },
  });
};
