"use server";
import axios from "axios";

export async function generateQuestions() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/forum/generate_questions`
  );
  return response.data;
}

// export async function generateSQL(question: string) {
//   const response = await axios.get(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/forum/generate_and_run_sql`,
//     {
//       params: { question },
//     }
//   );
//   return response.data;
// }

// export async function runSQL(sql: string) {
//   const response = await axios.post(
//     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/forum/generate_and_run_sql`,
//     { sql }, // Encapsulate the SQL string in an object
//     {
//       headers: {
//         "Content-Type": "application/json", // This line is technically optional as Axios sets it automatically for objects
//       },
//     }
//   );

//   console.log("run", response.data);

//   return response.data;
// }

export async function generateSQL(question: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades/generate_and_run_sql`,
    {
      params: { question },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("run", response.data);

  return response.data;
}

export async function runSQL(question: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades/generate_plotly_figure`,
    {
      params: { question },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("figure", response.data);

  return response.data;
}

export async function generateAndRunSQLForum(question: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades/generate_and_run_sql`,
    {
      params: { question },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("run", response.data);

  return response.data;
}

export async function generatePlotlyFigureForum(question: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/trades/generate_plotly_figure`,
    {
      params: { question },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log("figure", response.data);

  return response.data;
}
