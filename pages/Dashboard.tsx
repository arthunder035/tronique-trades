"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Chatscreen from "@/components/Chatscreen";
// import Chatscreen from "@/components/changes";
import { AxiosResponse } from "axios";
import { RUNResponse, SQLResponse } from "@/helpers/types";
import ContextProvider from "@/context/ContextProvider";

type FunctionProps = {
  generateQuestions: () => Promise<AxiosResponse<any, any>>;
  generateSQL: (question: string) => Promise<any>;
  runSQL: (sql: string) => Promise<any>;
  generatePlotlyFigureForum: (question: string) => Promise<any>;
};

const Dashboard: React.FC<FunctionProps> = (props: FunctionProps) => {
  const { generateQuestions, generateSQL, runSQL, generatePlotlyFigureForum } = props;

  return (
    <ContextProvider>
      <main className="flex min-h-screen text-lg">
        <Sidebar />
        <Chatscreen
          generateQuestions={generateQuestions}
          generateSQL={generateSQL}
          runSQL={runSQL}
          generatePlotlyFigureForum={generatePlotlyFigureForum}
        />
      </main>
    </ContextProvider>
  );
};

export default Dashboard;
