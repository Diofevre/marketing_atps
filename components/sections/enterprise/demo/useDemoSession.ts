"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEMO_QUESTIONS, DEMO_DURATION_SECONDS } from "./demoQuestions";

const PROCTEO_API = "https://procteo-api.myatps.com";

export type DemoStep =
  | "landing"
  | "queued"
  | "permissions"
  | "exam"
  | "results";

export interface DetectionEvent {
  id: string;
  kind: string;
  labelKey: string;
  severity: "info" | "medium" | "high" | "critical";
  timestampMs: number;
}

export interface DemoSessionState {
  step: DemoStep;
  sessionId: string | null;
  email: string;
  error: string | null;

  // Queue
  queuePosition: number;
  queueWaitSeconds: number;

  // Permissions
  hasCamera: boolean;
  hasMicrophone: boolean;
  hasScreen: boolean;

  // Exam
  currentQuestion: number;
  answers: Record<string, number | null>; // questionId → selected option index
  timeRemaining: number;
  events: DetectionEvent[];

  // Streams
  cameraStream: MediaStream | null;
  screenStream: MediaStream | null;
}

export function useDemoSession() {
  const [state, setState] = useState<DemoSessionState>({
    step: "landing",
    sessionId: null,
    email: "",
    error: null,
    queuePosition: 0,
    queueWaitSeconds: 0,
    hasCamera: false,
    hasMicrophone: false,
    hasScreen: false,
    currentQuestion: 0,
    answers: {},
    timeRemaining: DEMO_DURATION_SECONDS,
    events: [],
    cameraStream: null,
    screenStream: null,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const simRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Setters ─────────────────────────────────────────────

  const setEmail = (email: string) => setState((s) => ({ ...s, email }));
  const setError = (error: string | null) => setState((s) => ({ ...s, error }));

  // ── API: Start demo ─────────────────────────────────────

  const startDemo = useCallback(async () => {
    if (!state.email || !state.email.includes("@")) {
      setState((s) => ({ ...s, error: "Please enter a valid email" }));
      return;
    }
    setState((s) => ({ ...s, error: null }));

    try {
      const res = await fetch(`${PROCTEO_API}/demo/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email, language: "fr" }),
      });

      if (res.status === 429) {
        setState((s) => ({ ...s, error: "Too many attempts. Try again later." }));
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setState((s) => ({ ...s, error: data.detail || "Service unavailable" }));
        return;
      }

      const data = await res.json();

      if (data.status === "queued") {
        setState((s) => ({
          ...s,
          step: "queued",
          sessionId: data.session_id,
          queuePosition: data.queue_position,
          queueWaitSeconds: data.estimated_wait_seconds,
        }));
        startQueuePolling(data.session_id);
      } else {
        setState((s) => ({
          ...s,
          step: "permissions",
          sessionId: data.session_id,
        }));
      }
    } catch {
      setState((s) => ({ ...s, error: "Cannot reach Procteo. Try again later." }));
    }
  }, [state.email]);

  // ── Queue polling ───────────────────────────────────────

  const startQueuePolling = (sid: string) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`${PROCTEO_API}/demo/status/${sid}`);
        if (!res.ok) return;
        const data = await res.json();

        if (data.status === "active") {
          if (pollRef.current) clearInterval(pollRef.current);
          setState((s) => ({ ...s, step: "permissions" }));
        } else if (data.status === "queued") {
          setState((s) => ({
            ...s,
            queuePosition: data.queue_position,
            queueWaitSeconds: data.estimated_wait_seconds,
          }));
        } else if (data.status === "expired") {
          if (pollRef.current) clearInterval(pollRef.current);
          setState((s) => ({ ...s, step: "landing", error: "Session expired" }));
        }
      } catch {
        // keep polling
      }
    }, 5000);
  };

  // ── Permissions ─────────────────────────────────────────

  const requestCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: true,
      });
      setState((s) => ({
        ...s,
        hasCamera: true,
        hasMicrophone: true,
        cameraStream: stream,
      }));
      return true;
    } catch {
      setState((s) => ({ ...s, error: "Camera/microphone access denied" }));
      return false;
    }
  }, []);

  const requestScreen = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setState((s) => ({ ...s, hasScreen: true, screenStream: stream }));
      return true;
    } catch {
      // Screen share is optional for demo
      return false;
    }
  }, []);

  const skipScreen = useCallback(() => {
    setState((s) => ({ ...s, hasScreen: false }));
  }, []);

  // ── Start exam ──────────────────────────────────────────

  const startExam = useCallback(() => {
    setState((s) => ({
      ...s,
      step: "exam",
      currentQuestion: 0,
      answers: {},
      timeRemaining: DEMO_DURATION_SECONDS,
      events: [],
    }));

    // Timer countdown
    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeRemaining <= 1) {
          // Auto-submit
          if (timerRef.current) clearInterval(timerRef.current);
          if (simRef.current) clearInterval(simRef.current);
          return { ...prev, timeRemaining: 0, step: "results" };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    // Simulated detection events
    simRef.current = setInterval(() => {
      const roll = Math.random();
      const now = DEMO_DURATION_SECONDS * 1000 - Date.now() % (DEMO_DURATION_SECONDS * 1000);

      if (roll < 0.06) {
        addEvent("face.gaze.off_screen", "demoEvents.gazeOff", "medium", now);
      } else if (roll < 0.10) {
        addEvent("face.head_pose.yaw", "demoEvents.headTurn", "medium", now);
      } else if (roll < 0.12) {
        addEvent("face.absent", "demoEvents.faceAbsent", "high", now);
      } else if (roll < 0.13) {
        addEvent("object.phone", "demoEvents.phoneDetected", "critical", now);
      }
    }, 2500);
  }, []);

  const addEvent = (kind: string, labelKey: string, severity: DetectionEvent["severity"], ts: number) => {
    setState((s) => ({
      ...s,
      events: [
        ...s.events,
        {
          id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
          kind,
          labelKey,
          severity,
          timestampMs: ts,
        },
      ],
    }));
  };

  // ── Exam actions ────────────────────────────────────────

  const selectAnswer = useCallback((questionId: string, optionIndex: number) => {
    setState((s) => ({
      ...s,
      answers: { ...s.answers, [questionId]: optionIndex },
    }));
  }, []);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < DEMO_QUESTIONS.length) {
      setState((s) => ({ ...s, currentQuestion: index }));
    }
  }, []);

  const submitExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (simRef.current) clearInterval(simRef.current);
    setState((s) => ({ ...s, step: "results" }));
  }, []);

  // ── End + cleanup ───────────────────────────────────────

  const endSession = useCallback(async () => {
    // Stop streams
    state.cameraStream?.getTracks().forEach((t) => t.stop());
    state.screenStream?.getTracks().forEach((t) => t.stop());

    // Notify API
    if (state.sessionId) {
      fetch(`${PROCTEO_API}/demo/end/${state.sessionId}`, { method: "POST" }).catch(() => {});
    }
  }, [state.sessionId, state.cameraStream, state.screenStream]);

  const restart = useCallback(() => {
    endSession();
    if (timerRef.current) clearInterval(timerRef.current);
    if (pollRef.current) clearInterval(pollRef.current);
    if (simRef.current) clearInterval(simRef.current);
    setState({
      step: "landing",
      sessionId: null,
      email: "",
      error: null,
      queuePosition: 0,
      queueWaitSeconds: 0,
      hasCamera: false,
      hasMicrophone: false,
      hasScreen: false,
      currentQuestion: 0,
      answers: {},
      timeRemaining: DEMO_DURATION_SECONDS,
      events: [],
      cameraStream: null,
      screenStream: null,
    });
  }, [endSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
      if (simRef.current) clearInterval(simRef.current);
    };
  }, []);

  // ── Computed values ─────────────────────────────────────

  const score = DEMO_QUESTIONS.reduce((acc, q) => {
    const answer = state.answers[q.id];
    return acc + (answer === q.correctIndex ? 1 : 0);
  }, 0);

  const answeredCount = Object.values(state.answers).filter((a) => a !== null && a !== undefined).length;

  return {
    ...state,
    score,
    answeredCount,
    totalQuestions: DEMO_QUESTIONS.length,
    questions: DEMO_QUESTIONS,

    // Actions
    setEmail,
    setError,
    startDemo,
    requestCamera,
    requestScreen,
    skipScreen,
    startExam,
    selectAnswer,
    goToQuestion,
    submitExam,
    endSession,
    restart,
  };
}
