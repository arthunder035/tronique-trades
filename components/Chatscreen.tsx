"use client";
import React, {
  useLayoutEffect,
  useState,
  KeyboardEvent,
  useCallback,
} from "react";
import { BiSend } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import MessageHistory from "./MessageHistory";
import Homescreen from "./Homescreen";
import {
  SQLResponse,
  TMessage,
  TQuestions,
  RUNResponse,
  SQLAndRunResponse,
} from "@/helpers/types";
import { AxiosResponse } from "axios";
import { MESSAGE_TYPES } from "@/helpers/enums";
import { useRoot } from "@/context/ContextProvider";
import "../styles/chatscreen.css";

type ChatscreenProps = {
  generateQuestions: () => Promise<AxiosResponse<any, any>>;
  generateSQL: (question: string) => Promise<any>;
  runSQL: (sql: string) => Promise<any>;
  generatePlotlyFigureForum: (question: string) => Promise<any>;
};

const Chatscreen: React.FC<ChatscreenProps> = ({
  generateQuestions,
  generateSQL,
  runSQL,
  generatePlotlyFigureForum,
}: Readonly<ChatscreenProps>) => {
  const [message, setMessage] = useState<string>("");

  const { showSideBar, messageHistory, handleChangeMessageHistory } = useRoot();

  const [disabled, setDisabled] = useState(message.length === 0);
  const [loading, setLoading] = useState(true);
  const [generatedQuestions, setGeneratedQuestions] = useState({});
  const [plotlyResult, setPlotlyResult] = useState<any>();

  useLayoutEffect(() => {
    let isMounted = true; // Flag to track component's mounting status

    async function fetchData() {
      let questions = await generateQuestions();
      if (isMounted) {
        // Only update state if component is still mounted
        console.log({ questions });
        setGeneratedQuestions(questions);
      }
    }
    setLoading(false);

    // fetchData();

    return () => {
      isMounted = false; // Set flag to false when the component unmounts
    };
  }, [generateQuestions]);

  const handleInputChange = (e: { target: { value: string } }) => {
    if (e.target.value.length > 0) {
      setMessage(e.target.value);
      setDisabled(false);
    } else {
      setMessage("");
      setDisabled(true);
    }
  };

  // const handleSend = useCallback(async () => {
  //   if (message.length === 0) return; // Guard clause to prevent sending empty messages

  //   try {
  //     const newMessageId = uuidv4();

  //     const msg = message.slice();
  //     setMessage("");
  //     setDisabled(true);
  //     let newMessage: TMessage = {
  //       ai: "",
  //       user: msg,
  //       messageId: newMessageId,
  //       type: MESSAGE_TYPES.user,
  //     };

  //     handleChangeMessageHistory(newMessage);

  //     const aiRes = await generateSQL(msg);

  //     if (
  //       aiRes?.text === "No SELECT statement could be found in the SQL code"
  //     ) {
  //       newMessage = {
  //         ai: aiRes?.text,
  //         user: "",
  //         messageId: uuidv4(),
  //         type: MESSAGE_TYPES.error,
  //       };
  //     } else if ("error" in aiRes) {
  //       newMessage = {
  //         ai: aiRes?.error as string,
  //         user: "",
  //         messageId: uuidv4(),
  //         type: MESSAGE_TYPES.error,
  //       };
  //     } else {
  //       newMessage = {
  //         ai: aiRes?.text,
  //         user: "",
  //         messageId: uuidv4(),
  //         type: MESSAGE_TYPES.sql,
  //       };
  //     }

  //     handleChangeMessageHistory(newMessage);
  //   } catch (error: any) {
  //     console.error("Failed to handle send:", error);
  //     // Handle the error state appropriately
  //   }
  // }, [message, handleChangeMessageHistory, generateSQL]);

  const handleSend = useCallback(async () => {
    if (message.length === 0) return; // Guard clause to prevent sending empty messages

    try {
      const newMessageId = uuidv4();

      const msg = message.slice();
      setMessage("");
      setDisabled(true);
      let newMessage: TMessage = {
        ai: "",
        user: msg,
        messageId: newMessageId,
        type: MESSAGE_TYPES.user,
      };

      handleChangeMessageHistory(newMessage);

      const aiRes = await generateSQL(msg);
      const { df } = aiRes;

      if ("error" in aiRes) {
        newMessage = {
          ai: aiRes?.error as string,
          user: "",
          messageId: uuidv4(),
          type: MESSAGE_TYPES.error,
        };
      } else {
        newMessage = {
          ai: df,
          user: "",
          messageId: uuidv4(),
          type: MESSAGE_TYPES.df,
        };
      }

      handleChangeMessageHistory(newMessage);

      const plotlyRes = await generatePlotlyFigureForum(msg);
      const plotData = JSON.parse(plotlyRes.fig);

      setPlotlyResult(plotData);
      console.log("Vis Result", plotlyRes);
    } catch (error: any) {
      console.error("Failed to handle send:", error);
      // Handle the error state appropriately
    }

    // router.push('/')
  }, [
    message,
    handleChangeMessageHistory,
    generateSQL,
    // generateAndRunSQLForum,
    // generatePlotlyFigureForum,
  ]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && !disabled) {
      handleSend();
      event.preventDefault(); // Prevent the default action to avoid submitting a form if it's part of one
    }
  };

  return (
    <div className={`chatscreen z-10 ${showSideBar ? "w-[80%]" : "w-[100%]"}`}>
      {messageHistory?.length === 1 ? (
        <Homescreen
          questions={generatedQuestions as TQuestions}
          generateSQL={generateSQL}
          loading={loading}
        />
      ) : (
        <MessageHistory runSQL={runSQL} plotlyResult={plotlyResult}/>
      )}

      <div
        className={`ml-[10vw] z-10 fixed bottom-0 py-0 pl-8 pr-3 sm:pl-10 sm:pr-4 sm:py-2 my-6 rounded-full sm:ml-[4vw] lg:ml-[8vw] bg-[#231E1E] 
        ${showSideBar ? "w-[45%] md:w-[55%] lg:w-[65%]" : "w-[80%] sm:w-[70%] md:w-[80%]"}`}
      >
        <div className={`flex items-center w-full ml-auto`}>
          <input
            type="text"
            className={`input m-2 w-full bg-transparent text-sm sm:text-base border-none outline-none ${
              message.trim() ? "text-white" : "text-[#848484]"
            }`}
            placeholder="Enter a prompt here"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />

          <button
            disabled={disabled}
            className={`flex items-center justify-center h-7 w-8 sm:h-9 sm:w-10 border rounded-full bg-white ${
              disabled ? "border-white bg-white" : "border-white bg-white"
            }`}
          >
            <BiSend size={20} onClick={handleSend} className="text-[#DE082D]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatscreen;
