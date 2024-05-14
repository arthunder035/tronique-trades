"use client";
import React from "react";
import Sidebar from "@/components/Sidebar";
import Chatscreen from "@/components/Chatscreen";
import { AxiosResponse } from "axios";
import { RUNResponse, SQLResponse } from "@/helpers/types";
import ContextProvider from "@/context/ContextProvider";
import Navbar from "@/components/navbar"
import { Toaster } from "react-hot-toast";

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
<main className="flex flex-col sm:flex-row min-h-screen text-lg">
        <Navbar />
        <Sidebar />
        <Toaster
        toastOptions={{
          style: {
            fontSize: '14px',
            backgroundColor: '#d2d0d0',
            color: '#000',
            boxShadow: 'none',
            borderRadius: '50px',
            padding: '3px 5px',
          },
        }}
      />
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
