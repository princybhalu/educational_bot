// import React, { useState } from 'react';
// import {
//   SwipeableList,
//   SwipeableListItem,
//   SwipeAction,
//   TrailingActions,
//   Type as ListType
// } from 'react-swipeable-list';
// // import { Send, ArrowUp, X } from 'lucide-react';
// import 'react-swipeable-list/dist/styles.css';
// import { FaArrowUp } from "react-icons/fa6";
// import { ProfileScreenName } from '../../utils/enums';

// interface ProblemItem {
//   id: string;
//   text: string;
// }

// const ProblemsScreen: React.FC<{setScreenName : (a : string) =>  void}> = ({setScreenName}) => {

//   const [items, setItems] = useState<ProblemItem[]>([
//     { id: '1', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },
//     { id: '2', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },
//     { id: '3', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },
//     { id: '4', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },
//     { id: '5', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },
//     { id: '5', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },
//     { id: '5', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },
//     { id: '5', text: "Lorem ipsum is simply dummy text Lorem ipsum is simply dummy text" },

//   ]);
//   const [newProblem, setNewProblem] = useState('');

//   const handleDelete = (id: string) => {
//     setItems(items.filter(item => item.id !== id));
//   };

//   const handleAddProblem = () => {
//     if (newProblem.trim()) {
//       setItems([...items, { id: Date.now().toString(), text: newProblem.trim() }]);
//       setNewProblem('');
//     }
//   };

//   return (
//     <div className="flex flex-col">

//       {/* Main Content */}
//       <div className="flex-1 p-4 overflow-auto">
//         <h1 className="text-lg font-bold mb-4">
//           <span className="text-orange-500">Your Teacher </span> be like
//         </h1>

//         <div className="border border-[#003366] rounded-lg overflow-hidden bg-white mb-4">
//           <SwipeableList threshold={0.5} type={ListType.IOS}>
//             <div className="divide-y divide-[#003366]/30 overflow-auto ">
//               {items.map((item) => (
//                 <SwipeableListItem
//                   key={item.id}
//                   trailingActions={
//                     <TrailingActions>
//                       <SwipeAction destructive={true} onClick={() => handleDelete(item.id)}>
//                         <div className="h-full bg-red-500 flex items-center px-4">
//                           <span className="text-white">Delete</span>
//                         </div>
//                       </SwipeAction>
//                     </TrailingActions>
//                   }
//                 >
//                   <div className="flex items-center gap-3 p-3 bg-white">
//                     <svg
//                       className="w-3 h-3 flex-shrink-0 text-blue-900"
//                       viewBox="0 0 12 12"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M11 5.54286V6.00286C10.9994 7.08107 10.6502 8.1302 10.0047 8.99377C9.35908 9.85735 8.45164 10.4891 7.41768 10.7948C6.38371 11.1005 5.27863 11.0638 4.26723 10.6902C3.25584 10.3165 2.39233 9.62591 1.80548 8.72139C1.21863 7.81688 0.939896 6.74689 1.01084 5.67102C1.08178 4.59514 1.4986 3.57102 2.19914 2.7514C2.89968 1.93177 3.84639 1.36055 4.89809 1.12293C5.94979 0.885317 7.05013 0.99403 8.035 1.43286"
//                         stroke="currentColor"
//                         strokeWidth="0.9375"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M10.9998 2.00293L5.99976 7.00793L4.49976 5.50793"
//                         stroke="currentColor"
//                         strokeWidth="0.9375"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <span className="text-sm text-gray-700">{item.text}</span>
//                   </div>
//                 </SwipeableListItem>
//               ))}
//             </div>
//           </SwipeableList>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between gap-4 mb-4">
//           <button className="px-6 py-2 rounded-full border border-[#003366] text-[#003366]" onClick={() => {
//             // re
//             setScreenName(ProfileScreenName.TIMELINE);
//           }}>
//             Previous
//           </button>
//           <button className="px-6 py-2 rounded-full bg-[#003366] text-white" onClick={(e) => {
//              console.log(e)
//             // SCREEN CHANGES TO : CHECKING_GIVE_DESCRIPTION_OF_TEACHER
//             setScreenName(ProfileScreenName.CHECKING_GIVE_DESCRIPTION_OF_TEACHER)
//           }}>
//             Confirm
//           </button>
//         </div>
//       </div>

//       {/* Bottom Input Section */}
//       <div className="p-4 bg-white border-t border-gray-200">
//         <div className="relative">
//           <input
//             type="text"
//             value={newProblem}
//             onChange={(e) => setNewProblem(e.target.value)}
//             placeholder="Add More Problems that needs to be resolved..."
//             className="w-full pl-4 pr-24 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#003366]"
//           />
//           <button
//             onClick={handleAddProblem}
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#003366] rounded-full text-white"
//           >
//             <FaArrowUp className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemsScreen;

// import React, { useState } from 'react';
// import {
//   SwipeableList,
//   SwipeableListItem,
//   SwipeAction,
//   TrailingActions,
//   Type as ListType,
//   LeadingActions,
// } from 'react-swipeable-list';
// import 'react-swipeable-list/dist/styles.css';
// import { FaArrowUp } from 'react-icons/fa6';
// import { FaTrash } from 'react-icons/fa';
// import { ProfileScreenName } from '../../utils/enums';

// interface ProblemItem {
//   id: string;
//   text: string;
// }

// const ProblemsScreen: React.FC<{
//   setScreenName: (a: string) => void;
//   teacherDescription: ProblemItem[];
// }> = ({ setScreenName, teacherDescription }) => {
//   const [items, setItems] = useState<ProblemItem[]>(teacherDescription);
//   const [newProblem, setNewProblem] = useState('');

//   // Helper function to determine if the screen is mobile
//   const isMobile = () => window.innerWidth < 768;

//   const handleDelete = (id: string) => {
//     console.log("on click on delete")
//     setItems(items.filter((item) => item.id !== id));
//   };

//   // daily study planner issues

//   const handleAddProblem = () => {
//     if (newProblem.trim()) {
//       setItems([
//         ...items,
//         { id: Date.now().toString(), text: newProblem.trim() },
//       ]);
//       setNewProblem('');
//     }
//   };

//   const handleConfirm = ( e : any) => {

//     setScreenName(ProfileScreenName.CHECKING_GIVE_DESCRIPTION_OF_TEACHER);
//   };

//   const leadingActions = (index: number) => (
//     <LeadingActions>
//       <SwipeAction onClick={() => handleDelete(index + "")}>
//        Delete
//       </SwipeAction>
//     </LeadingActions>
//   );
// // show me
// // logs

//   return (
//     <div className="flex flex-col">
//       {/* Main Content */}
//       <div className="flex-1 p-4 overflow-hidden flex flex-col">
//         <h1 className="text-lg font-bold mb-4">
//           <span className="text-orange-500">Your Teacher </span> be like
//         </h1>

//         <div className="border h-[300px] border-[#003366] bg-white mb-4 flex-1 shadow-[inset_0_0_8px_rgba(0,51,102,0.15)]">
//           <div className=" overflow-y-auto">
//             <SwipeableList threshold={0.5} type={ListType.IOS}>
//               <div className="divide-y divide-[#003366]/30">
//                 {items.map((item ,  index) => (
//                   <SwipeableListItem
//                     key={item.id}
//                     leadingActions={leadingActions(index)}
//                     trailingActions={
//                       isMobile() ? (
//                         <TrailingActions>
//                           <SwipeAction
//                             destructive={true}
//                             onClick={() => handleDelete(item.id)}
//                           >
//                             <div className="h-full bg-red-500 flex items-center px-4">
//                               <span className="text-white">Delete</span>
//                             </div>
//                           </SwipeAction>
//                         </TrailingActions>
//                       ) : undefined
//                     }
//                   >
//                     <div className="flex items-center justify-between gap-3 p-3 bg-white group">
//                       <div className="flex items-center gap-3">
//                         <svg
//                           className="w-3 h-3 flex-shrink-0 text-blue-900"
//                           viewBox="0 0 12 12"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M11 5.54286V6.00286C10.9994 7.08107 10.6502 8.1302 10.0047 8.99377C9.35908 9.85735 8.45164 10.4891 7.41768 10.7948C6.38371 11.1005 5.27863 11.0638 4.26723 10.6902C3.25584 10.3165 2.39233 9.62591 1.80548 8.72139C1.21863 7.81688 0.939896 6.74689 1.01084 5.67102C1.08178 4.59514 1.4986 3.57102 2.19914 2.7514C2.89968 1.93177 3.84639 1.36055 4.89809 1.12293C5.94979 0.885317 7.05013 0.99403 8.035 1.43286"
//                             stroke="currentColor"
//                             strokeWidth="0.9375"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                           <path
//                             d="M10.9998 2.00293L5.99976 7.00793L4.49976 5.50793"
//                             stroke="currentColor"
//                             strokeWidth="0.9375"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                         <span className="text-sm text-gray-700">
//                           {item.text}
//                         </span>
//                       </div>
//                       {!isMobile() && (
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-red-500"
//                           aria-label="Delete item"
//                         >
//                           <FaTrash className="w-3.5 h-3.5" />
//                         </button>
//                       )}
//                     </div>
//                   </SwipeableListItem>
//                 ))}
//               </div>
//             </SwipeableList>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex justify-between gap-4 mb-4">
//           <button
//             className="px-6 py-2 rounded-full border border-[#003366] text-[#003366]"
//             onClick={() => setScreenName(ProfileScreenName.TIMELINE)}
//           >
//             Previous
//           </button>
//           <button
//             className="px-6 py-2 rounded-full bg-[#003366] text-white"
//             onClick={(e) => handleConfirm(e)}
//           >
//             Confirm
//           </button>
//         </div>
//       </div>

//       {/* Bottom Input Section */}
//       <div className="p-4 bg-white border-t border-gray-200">
//         <div className="relative">
//           <input
//             type="text"
//             value={newProblem}
//             onChange={(e) => setNewProblem(e.target.value)}
//             placeholder="Add More Problems that needs to be resolved..."
//             className="w-full pl-4 pr-24 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#003366]"
//           />
//           <button
//             onClick={handleAddProblem}
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#003366] rounded-full text-white"
//           >
//             <FaArrowUp className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemsScreen;
import React, { useState } from 'react';
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  LeadingActions,
  Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { FaArrowUp, FaTrash } from 'react-icons/fa';
import { ProfileScreenName } from '../../utils/enums';
import { AskQuetionApiCall } from '../../services/api/profiling';

interface ProblemItem {
  id: string;
  text: string;
}

const ProblemsScreen: React.FC<{
  setScreenName: (a: string) => void;
  teacherDescription: ProblemItem[];
}> = ({ setScreenName, teacherDescription }) => {
  const [items, setItems] = useState<ProblemItem[]>(teacherDescription);
  const [newProblem, setNewProblem] = useState('');

  const isMobile = () => window.innerWidth < 768;

  // Function to delete an item
  const handleDelete = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to add a new problem
  const handleAddProblem = () => {
    if (newProblem.trim()) {
      setItems((prevItems) => [
        ...prevItems,
        { id: Date.now().toString(), text: newProblem },
      ]);
      setNewProblem('');
    }
  };

  const handleConfirm = async () => {
    try {
      // const req = {
      //   answer :
      // }
      // const res  = await AskQuetionApiCall();
    } catch (err) {
      console.log(err);
    }
    setScreenName(ProfileScreenName.CHECKING_GIVE_DESCRIPTION_OF_TEACHER);
  };

  // Leading (left swipe) action for delete
  const leadingActions = (itemId: string) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleDelete(itemId)}>
        <div className="p-3 bg-red-600 text-white">Delete</div>
      </SwipeAction>
    </LeadingActions>
  );

  // Trailing (right swipe) action for delete
  const trailingActions = (itemId: string) => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => handleDelete(itemId)}>
        <div className="p-3 bg-red-600 text-white">Delete</div>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <h1 className="text-lg font-bold mb-4">
          <span className="text-orange-500">Your Teacher </span> be like
        </h1>

        <div className="border h-[300px] border-[#003366] bg-white mb-4 flex-1 shadow-[inset_0_0_8px_rgba(0,51,102,0.15)]">
          <div className="overflow-y-auto h-full">
            <SwipeableList type={ListType.IOS}>
              {items.map((item) => (
                <SwipeableListItem
                  key={item.id}
                  leadingActions={leadingActions(item.id)}
                  trailingActions={trailingActions(item.id)}
                >
                  <div className="flex items-center justify-between gap-3 p-3 bg-white group">
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-3 h-3 flex-shrink-0 text-blue-900"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 5.54286V6.00286C10.9994 7.08107 10.6502 8.1302 10.0047 8.99377C9.35908 9.85735 8.45164 10.4891 7.41768 10.7948C6.38371 11.1005 5.27863 11.0638 4.26723 10.6902C3.25584 10.3165 2.39233 9.62591 1.80548 8.72139C1.21863 7.81688 0.939896 6.74689 1.01084 5.67102C1.08178 4.59514 1.4986 3.57102 2.19914 2.7514C2.89968 1.93177 3.84639 1.36055 4.89809 1.12293C5.94979 0.885317 7.05013 0.99403 8.035 1.43286"
                          stroke="currentColor"
                          strokeWidth="0.9375"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.9998 2.00293L5.99976 7.00793L4.49976 5.50793"
                          stroke="currentColor"
                          strokeWidth="0.9375"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                    {!isMobile() && (
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-red-500"
                        aria-label="Delete item"
                      >
                        <FaTrash className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </SwipeableListItem>
              ))}
            </SwipeableList>
          </div>
        </div>

        <div className="flex justify-between gap-4 mb-4 mt-4">
          {/* <button
            className="px-6 py-2 rounded-full border border-[#003366] text-[#003366]"
            onClick={() => setScreenName('TIMELINE')}
          >
            Previous
          </button> */}
          <button
            className="px-6 py-2 rounded-full bg-[#003366] text-white"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={newProblem}
            onChange={(e) => setNewProblem(e.target.value)}
            placeholder="Add More Problems that needs to be resolved..."
            className="w-full pl-4 pr-24 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#003366]"
          />
          <button
            onClick={handleAddProblem}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#003366] rounded-full text-white"
          >
            <FaArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemsScreen;
