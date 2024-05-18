import NavBar from "./../components/nav/NavBar.jsx";

import { ChatEngine } from "react-chat-engine";
import { useSearchParams } from "react-router-dom";
import "./../chatStyle.css";

function Chat(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const user = searchParams.get("user");
  const password = searchParams.get("password");

  // const searchParams = new URLSearchParams(props);

  // const user = searchParams.get('user');
  // const password = searchParams.get('password');
  return (
    <div>
      <NavBar />

      <ChatEngine
        height="calc(100vh - 80px)"
        projectID="e5281aef-af2a-4606-b69f-ee90c5ad7ce3"
        userName={user}
        userSecret={password}
      />
    </div>
  );
}

export default Chat;

// <>
//   <NavBar></NavBar>
//   <div className="max-sm:px-3 flex justify-center">
//     <div className="flex flex-row w-full  h-full bg-backGround  p-5 gap-2 max-sm:flex-col">
//       <div className="flex flex-col max-sm:w-full  h-full overflow-y-scroll  bg-primary  p-3 rounded-xl   gap-10  flex-grow-2  max-sm:overflow-x max-sm:overflow-y-hidden">
//         <div className="text-2xl font-bold text-center text-white max-sm:hidden">
//           conversation
//         </div>
//         <div className="flex flex-col gap-3 max-sm:flex-row  overflow-auto box-border max-sm:items-center">
//           <PersonChatCard />

//           <PersonChatCard />
//         </div>
//       </div>

//       <div className=" flex flex-col min-h-screen w-90  flex-grow-2  w-full justify-between">
//         <div
//           style={{
//             borderBottom: "1px solid gray",
//           }}
//           className="h-20 py-2 px-6"
//         >
//           <div className="flex gap-2">
//             <img
//               className="w-20 h-20 rounded-full"
//               src="\src\assets\person.png"
//               alt=""
//             />
//             <div className="flex flex-col gap-2">
//               <div className="text-black text-xl font-bold">Name</div>
//               <div className="text-black text-opacity-40 line-clamp-1">
//                 now
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* the above div only for person bar or card */}

//         {/* this div for the messages */}

//         <div className="flex-1 flex flex-col gap-4 my-2 p-8 overflow-y-scroll">
//           <div>
//             {message.map((msg, index) => (
//               <ChatMessage
//                 key={index}
//                 messageSide={msg.messageSide}
//                 message={msg.message}
//               />
//             ))}
//           </div>
//         </div>

//         <div className=" relative  mx-12 max-sm:mx-4">
//           <div className="bottom-20 p-1  flex items-center gap-2 border rounded-md bg-white shadow-2xl">
//             <div>
//               <img
//                 className="w-6 h-6 p-1"
//                 src="\src\assets\attachment.svg"
//                 alt=""
//               />
//             </div>
//             <input

//               type="text"
//               className="border-none p-2 pl-10 placeholder-gray-800 text-gray-900 relative w-full rounded-md focus:outline-none"
//               placeholder="Enter text"
//             />

//             <span onClick={
//               {

//                 // here

//               }
//             } className="right-0 pr-3">

//               <img
//                 className="w-6 h-6 p-1"
//                 src="\src\assets\send.svg"
//                 alt=""
//               />
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </>

// const message = [
//   {
//     messageSide: "me",
//     message: "Hello, how are you?",
//   },
//   {
//     messageSide: "other",
//     message: "I'm good, thanks! How about you?",
//   },
//   {
//     messageSide: "me",
//     message: "I'm doing great, thanks for asking!",
//   },
//   {
//     messageSide: "other",
//     message: "That's good to hear!",
//   },
// ];

// const [messages, setMessages] = useState(message);

// Function to handle new comment submission
// const sendNewMessage = (text) => {
//   const newMessage = {
//     messageSide: "me",
//     message: text,
//   };
//   setMessages([...messages, newMessage]); // Add the new comment to the existing list
// };
