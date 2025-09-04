// import { createContext, useState } from "react";
// // import main from "../config/gemini";
// import main from "../config/openai"

// export const Context = createContext();

// const ContextProvider = (props) => {

//     const [input, setInput] = useState("");
//     // const [recentPrompt, setRecentPrompt] = useState("");
//     const [recentPrompt, setRecentPrompt] = useState("");

//     const [prevPrompts, setPrevPrompts] = useState([]);
//     const [showResult, setShowResult] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [resultData, setResultData] = useState("");

//     const delayPara = (index, nextWord) => {
//         setTimeout(function () {
//             setResultData(prev => prev + nextWord);
//         }, 75 * index)
//     }

//     const newChat = ()=>{
//         setLoading(false)
//         setShowResult(false)
//     }

//     // const onSent = async () => {
//     //     const userPrompt = input; // <--- Save input before clearing!
//     //     setResultData("");
//     //     setLoading(true);
//     //     setShowResult(true);
//     //     setRecentPrompt(userPrompt); // <--- Always set from saved value
//     //     const chunk = await main(userPrompt); // <--- Pass the prompt too
//     //     setResultData(chunk);
//     //     setLoading(false);
//     //     setInput("");
//     // }

//     const onSent = async (customPrompt) => {
//         const userPrompt = customPrompt || input; // <--- capture input first!


//         if (!userPrompt || userPrompt.trim() === ""){
//             return;
//         }


//         setRecentPrompt(userPrompt); // <-- SET IMMEDIATELY

//         if(! prevPrompts.includes(userPrompt)){
//             setPrevPrompts(prev => [...prev, userPrompt]);
//         }

//         // setPrevPrompts(prev => [...prev, userPrompt]) // this is added for saving the chats in sidebar

//         setResultData("");
//         setLoading(true);
//         setShowResult(true);

//         // let response = "";
//         // if (prompt !== undefined) {
//         //     response = await chunk(prompt);
//         //     setRecentPrompt(prompt)
//         // }
//         // else {
//         //     setPrevPrompts(prev => [...prev, input])
//         //     setRecentPrompt(input)
//         //     response = await chunk(input)
//         // }


//         const chunk = await main(userPrompt);
//         let responseArray = chunk.split("**");
//         let newResponse = "";
//         for (let i = 0; i < responseArray.length; i++) {
//             if (i === 0 || i % 2 !== 1) {
//                 newResponse += responseArray[i];
//             } else {
//                 newResponse += "<b>" + responseArray[i] + "</b>";
//             }
//         }

//         let newResponse2 = newResponse.split("*").join("</br>");
//         let newResponseArray = newResponse2.split(" ");
//         for (let i = 0; i < newResponseArray.length; i++) {
//             const nextWord = newResponseArray[i];
//             delayPara(i, nextWord + " ");
//         }




//         // const chunk = await main(userPrompt);
//         // let responseArray = chunk.split("**")
//         // let newResponse = "";
//         // for (let i = 0; i < responseArray.length; i++) {
//         //     if (i === 0 || i % 2 !== 1) {
//         //         newResponse += responseArray[i];
//         //     }
//         //     else {
//         //         newResponse += "<b>" + responseArray[i] + "</b>";
//         //     }
//         // }

//         // let newResponse2 = newResponse.split("*").join("</br>")
//         // let newResponseArray = newResponse2.split(" ");
//         // for (let i = 0; i < newResponseArray.length; i++) {
//         //     const nextWord = newResponseArray[i];
//         //     delayPara(i, nextWord + " ")
//         // }

//         setLoading(false);
//         setInput("");
//     }



//     const contextValue = {
//         prevPrompts,
//         setPrevPrompts,
//         onSent,
//         setRecentPrompt,
//         recentPrompt, // Chatgpt after one-hour found this problem and solved it.
//         showResult,
//         loading,
//         resultData,
//         input,
//         setInput, 
//         newChat
//     }
//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     )
// }

// export default ContextProvider;







import { createContext, useState } from "react";
import main from "../config/openai"; // <--- import your OpenAI function

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing animation effect
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 30 * index); // 30ms per word for smoother effect
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setInput("");
    setRecentPrompt("");
  };

  const onSent = async (customPrompt) => {
    const userPrompt = customPrompt || input;
    if (!userPrompt || userPrompt.trim() === "") return;

    setRecentPrompt(userPrompt);

    if (!prevPrompts.includes(userPrompt)) {
      setPrevPrompts((prev) => [...prev, userPrompt]);
    }

    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      const answer = await main(userPrompt);

      // Typing animation:
      setResultData(""); // clear first
      const words = answer.split(" ");
      words.forEach((word, idx) => {
        delayPara(idx, word + " ");
      });

      // If you do not want typing effect, just use:
      // setResultData(answer);

    } catch (err) {
      setResultData("Error: " + err.message);
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
