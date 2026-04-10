"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEMO_QUESTIONS, DEMO_DURATION_SECONDS } from "./demoQuestions";

const PROCTEO_API = "https://procteo-api.myatps.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type DemoStep =
  | "landing"
  | "queued"
  | "permissions"
  | "identity"
  | "exam"
  | "results";

export interface DetectionEvent {
  id: string;
  kind: string;
  labelKey: string;
  severity: "info" | "medium" | "high" | "critical";
  elapsedMs: number;
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
  cameraReady: boolean; // camera stream is active AND user has seen preview

  // Identity
  wantsIdentity: boolean;
  identityPhoto: string | null; // base64 data URL of uploaded ID
  identityMatched: boolean | null; // null = not checked, true/false = result

  // Exam
  currentQuestion: number;
  answers: Record<string, number | null>;
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
    cameraReady: false,
    wantsIdentity: false,
    identityPhoto: null,
    identityMatched: null,
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
  const verifyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const examStartRef = useRef(0);
  const examRunningRef = useRef(false);
  // Refs for cleanup — avoids stale closure in endSession
  const sessionIdRef = useRef<string | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  // Keep refs in sync with state
  useEffect(() => { sessionIdRef.current = state.sessionId; }, [state.sessionId]);
  useEffect(() => { cameraStreamRef.current = state.cameraStream; }, [state.cameraStream]);
  useEffect(() => { screenStreamRef.current = state.screenStream; }, [state.screenStream]);

  const setEmail = (email: string) => setState((s) => ({ ...s, email }));
  const setError = (error: string | null) => setState((s) => ({ ...s, error }));

  // ── API: Start demo ─────────────────────────────────────

  const startDemo = useCallback(async () => {
    if (!EMAIL_RE.test(state.email)) {
      setState((s) => ({ ...s, error: "Please enter a valid email" }));
      return;
    }
    setState((s) => ({ ...s, error: null }));

    try {
      const res = await fetch(`${PROCTEO_API}/demo/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email }),
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
        setState((s) => ({ ...s, step: "permissions", sessionId: data.session_id }));
      }
    } catch {
      setState((s) => ({ ...s, error: "Cannot reach Procteo. Try again later." }));
    }
  }, [state.email]);

  // ── Queue polling ───────────────────────────────────────

  const startQueuePolling = (sid: string) => {
    // Clear any previous polling interval
    if (pollRef.current) clearInterval(pollRef.current);

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
        // keep polling on network error
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
      // Stop old stream AFTER new one is ready (avoids race condition)
      cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = stream;
      setState((s) => ({
        ...s,
        hasCamera: true,
        hasMicrophone: true,
        cameraStream: stream,
        cameraReady: false, // will be set to true after user sees preview
      }));
      return true;
    } catch {
      setState((s) => ({ ...s, error: "Camera/microphone access denied" }));
      return false;
    }
  }, []);

  const confirmCameraReady = useCallback(() => {
    setState((s) => ({ ...s, cameraReady: true }));
  }, []);

  const requestScreen = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "monitor", // prefer full screen over tab/window
        },
      });

      // Check if user selected full screen (not just a tab)
      const track = stream.getVideoTracks()[0];
      const settings = track?.getSettings();
      // displaySurface: "monitor" = full screen, "window" = window, "browser" = tab
      const isFullScreen = settings?.displaySurface === "monitor";

      if (!isFullScreen) {
        // Warn but allow — demo is flexible, prod would reject
        console.warn("User shared a window/tab instead of full screen");
      }

      setState((s) => ({ ...s, hasScreen: true, screenStream: stream }));
      return true;
    } catch {
      return false;
    }
  }, []);

  const skipScreen = useCallback(() => {
    setState((s) => ({ ...s, hasScreen: false }));
  }, []);

  // ── Identity verification ───────────────────────────────

  const setWantsIdentity = useCallback((wants: boolean) => {
    setState((s) => ({ ...s, wantsIdentity: wants }));
  }, []);

  const setIdentityPhoto = useCallback((photo: string | null) => {
    setState((s) => ({ ...s, identityPhoto: photo }));
  }, []);

  const verifyIdentity = useCallback(() => {
    // Simulated — in production, this would call InsightFace via the API
    if (verifyTimeoutRef.current) clearTimeout(verifyTimeoutRef.current);
    setState((s) => ({ ...s, identityMatched: null })); // loading
    verifyTimeoutRef.current = setTimeout(() => {
      setState((s) => ({ ...s, identityMatched: true }));
    }, 2000);
  }, []);

  const goToIdentityStep = useCallback(() => {
    setState((s) => ({ ...s, step: "identity" }));
  }, []);

  // ── Start exam ──────────────────────────────────────────

  const startExam = useCallback(() => {
    if (examRunningRef.current) return; // prevent double start
    examRunningRef.current = true;
    examStartRef.current = Date.now();

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
          if (timerRef.current) clearInterval(timerRef.current);
          if (simRef.current) clearInterval(simRef.current);
          return { ...prev, timeRemaining: 0, step: "results" };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    // Simulated detection events
    simRef.current = setInterval(() => {
      const elapsed = Date.now() - examStartRef.current;
      const roll = Math.random();

      if (roll < 0.06) {
        addEvent("face.gaze.off_screen", "demoEvents.gazeOff", "medium", elapsed);
      } else if (roll < 0.10) {
        addEvent("face.head_pose.yaw", "demoEvents.headTurn", "medium", elapsed);
      } else if (roll < 0.12) {
        addEvent("face.absent", "demoEvents.faceAbsent", "high", elapsed);
      } else if (roll < 0.13) {
        addEvent("object.phone", "demoEvents.phoneDetected", "critical", elapsed);
      }
    }, 2500);
  }, []);

  const addEvent = (kind: string, labelKey: string, severity: DetectionEvent["severity"], elapsed: number) => {
    setState((s) => ({
      ...s,
      events: [
        ...s.events,
        {
          id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
          kind,
          labelKey,
          severity,
          elapsedMs: elapsed,
        },
      ],
    }));
  };

  // ── Exam actions ────────────────────────────────────────

  const selectAnswer = useCallback((questionId: string, optionIndex: number) => {
    setState((s) => ({ ...s, answers: { ...s.answers, [questionId]: optionIndex } }));
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

  const endSession = useCallback(() => {
    // Use refs to avoid stale closures
    cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
    screenStreamRef.current?.getTracks().forEach((t) => t.stop());

    if (sessionIdRef.current) {
      fetch(`${PROCTEO_API}/demo/end/${sessionIdRef.current}`, { method: "POST" }).catch(() => {});
    }
  }, []); // no deps — reads from refs

  const restart = useCallback(() => {
    endSession();
    if (timerRef.current) clearInterval(timerRef.current);
    if (pollRef.current) clearInterval(pollRef.current);
    if (simRef.current) clearInterval(simRef.current);
    if (verifyTimeoutRef.current) clearTimeout(verifyTimeoutRef.current);
    examRunningRef.current = false;
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
      cameraReady: false,
      wantsIdentity: false,
      identityPhoto: null,
      identityMatched: null,
      currentQuestion: 0,
      answers: {},
      timeRemaining: DEMO_DURATION_SECONDS,
      events: [],
      cameraStream: null,
      screenStream: null,
    });
  }, [endSession]);

  // Cleanup on unmount — free slot + stop streams
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
      if (simRef.current) clearInterval(simRef.current);
      if (verifyTimeoutRef.current) clearTimeout(verifyTimeoutRef.current);
      // endSession uses refs, safe to call here
      cameraStreamRef.current?.getTracks().forEach((t) => t.stop());
      screenStreamRef.current?.getTracks().forEach((t) => t.stop());
      if (sessionIdRef.current) {
        fetch(`${PROCTEO_API}/demo/end/${sessionIdRef.current}`, { method: "POST" }).catch(() => {});
      }
    };
  }, []);

  // ── Computed ─────────────────────────────────────────────

  const score = DEMO_QUESTIONS.reduce((acc, q) => {
    return acc + (state.answers[q.id] === q.correctIndex ? 1 : 0);
  }, 0);

  const answeredCount = Object.values(state.answers).filter((a) => a !== null && a !== undefined).length;

  return {
    ...state,
    score,
    answeredCount,
    totalQuestions: DEMO_QUESTIONS.length,
    questions: DEMO_QUESTIONS,
    setEmail,
    setError,
    startDemo,
    requestCamera,
    confirmCameraReady,
    requestScreen,
    skipScreen,
    setWantsIdentity,
    setIdentityPhoto,
    verifyIdentity,
    goToIdentityStep,
    startExam,
    selectAnswer,
    goToQuestion,
    submitExam,
    endSession,
    restart,
  };
}
