import Dashboard from "@/pages/Dashboard";
import { generateQuestions, generateSQL, runSQL, generatePlotlyFigureForum } from "@/actions/actions";
export default async function Home() {
  return (
    <Dashboard
      generateQuestions={generateQuestions}
      generateSQL={generateSQL}
      runSQL={runSQL}
      generatePlotlyFigureForum={generatePlotlyFigureForum}
    />
  );
}
