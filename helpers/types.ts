export type SQLResponse = {
  text: string;
  sql: string;
};

export type RUNResponse = {
  df: string;
  type: string;
};

export type TMessage = {
  ai: string;
  user: string;
  messageId: string;
  type: string;
};

export type TQuestions = {
  header: string;
  questions: Array<string>;
  type: string;
};

export type SQLAndRunResponse = {
  text: string;
  sql: string;
  df: string;
  type: string;
};

export type PlotlyFigure = {
  fig: string;
  plotly_figure: string;
  type: string;
};