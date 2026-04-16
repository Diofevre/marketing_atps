/**
 * 10 pre-defined aviation MCQ questions for the Procteo demo.
 * Hardcoded — no DB, no server action. i18n keys in messages/*.json.
 *
 * Questions cover basic ATPL/PPL knowledge that a prospect would
 * recognize as realistic exam content.
 */

export interface DemoQuestion {
  id: string;
  /** i18n key for the question text */
  questionKey: string;
  /** i18n keys for each option */
  optionKeys: string[];
  /** Index of the correct answer (0-based) */
  correctIndex: number;
}

export const DEMO_QUESTIONS: DemoQuestion[] = [
  {
    id: "q1",
    questionKey: "demoQuiz.q1.question",
    optionKeys: ["demoQuiz.q1.a", "demoQuiz.q1.b", "demoQuiz.q1.c", "demoQuiz.q1.d"],
    correctIndex: 1,
  },
  {
    id: "q2",
    questionKey: "demoQuiz.q2.question",
    optionKeys: ["demoQuiz.q2.a", "demoQuiz.q2.b", "demoQuiz.q2.c", "demoQuiz.q2.d"],
    correctIndex: 2,
  },
  {
    id: "q3",
    questionKey: "demoQuiz.q3.question",
    optionKeys: ["demoQuiz.q3.a", "demoQuiz.q3.b", "demoQuiz.q3.c", "demoQuiz.q3.d"],
    correctIndex: 0,
  },
  {
    id: "q4",
    questionKey: "demoQuiz.q4.question",
    optionKeys: ["demoQuiz.q4.a", "demoQuiz.q4.b", "demoQuiz.q4.c", "demoQuiz.q4.d"],
    correctIndex: 3,
  },
  {
    id: "q5",
    questionKey: "demoQuiz.q5.question",
    optionKeys: ["demoQuiz.q5.a", "demoQuiz.q5.b", "demoQuiz.q5.c", "demoQuiz.q5.d"],
    correctIndex: 1,
  },
  {
    id: "q6",
    questionKey: "demoQuiz.q6.question",
    optionKeys: ["demoQuiz.q6.a", "demoQuiz.q6.b", "demoQuiz.q6.c", "demoQuiz.q6.d"],
    correctIndex: 0,
  },
  {
    id: "q7",
    questionKey: "demoQuiz.q7.question",
    optionKeys: ["demoQuiz.q7.a", "demoQuiz.q7.b", "demoQuiz.q7.c", "demoQuiz.q7.d"],
    correctIndex: 2,
  },
  {
    id: "q8",
    questionKey: "demoQuiz.q8.question",
    optionKeys: ["demoQuiz.q8.a", "demoQuiz.q8.b", "demoQuiz.q8.c", "demoQuiz.q8.d"],
    correctIndex: 1,
  },
  {
    id: "q9",
    questionKey: "demoQuiz.q9.question",
    optionKeys: ["demoQuiz.q9.a", "demoQuiz.q9.b", "demoQuiz.q9.c", "demoQuiz.q9.d"],
    correctIndex: 3,
  },
  {
    id: "q10",
    questionKey: "demoQuiz.q10.question",
    optionKeys: ["demoQuiz.q10.a", "demoQuiz.q10.b", "demoQuiz.q10.c", "demoQuiz.q10.d"],
    correctIndex: 0,
  },
];

export const DEMO_DURATION_SECONDS = 300; // 5 minutes
export const DEMO_PASSING_SCORE = 7; // 7/10
