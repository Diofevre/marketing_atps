"use client";

/**
 * Real ML detection in the browser for Procteo demo.
 *
 * Uses:
 * - TensorFlow.js + COCO-SSD for object detection (phone, book, person)
 * - Web Speech API for speech/whisper detection
 *
 * Events are emitted to the parent via onEvent callback.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { DetectionEvent } from "./useDemoSession";

const SUSPICIOUS_CLASSES: Record<string, { labelKey: string; severity: "medium" | "high" | "critical" }> = {
  "cell phone": { labelKey: "demoEvents.phoneDetected", severity: "critical" },
  book: { labelKey: "demoEvents.bookDetected", severity: "high" },
  laptop: { labelKey: "demoEvents.laptopDetected", severity: "high" },
  remote: { labelKey: "demoEvents.remoteDetected", severity: "medium" },
};

interface UseProcteoDetectionProps {
  videoElement: HTMLVideoElement | null;
  enabled: boolean;
  onEvent: (event: Omit<DetectionEvent, "id">) => void;
}

export function useProcteoDetection({ videoElement, enabled, onEvent }: UseProcteoDetectionProps) {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const cocoModelRef = useRef<any>(null);
  const detectionIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const speechRecRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const examStartRef = useRef(Date.now());
  const cooldownRef = useRef<Map<string, number>>(new Map());
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  const loadModels = useCallback(async () => {
    if (modelsLoaded || loading) return;
    setLoading(true);
    try {
      const tf = await import("@tensorflow/tfjs");
      await tf.ready();
      const cocoSsd = await import("@tensorflow-models/coco-ssd");
      const model = await cocoSsd.load({ base: "lite_mobilenet_v2" });
      cocoModelRef.current = model;
      canvasRef.current = document.createElement("canvas");
      setModelsLoaded(true);
    } catch (err) {
      console.error("Failed to load ML models:", err);
    } finally {
      setLoading(false);
    }
  }, [modelsLoaded, loading]);

  const detectObjects = useCallback(async () => {
    if (!cocoModelRef.current || !videoElement || !canvasRef.current) return;
    if (videoElement.readyState < 2) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 640;
    canvas.height = 480;
    ctx.drawImage(videoElement, 0, 0, 640, 480);

    try {
      const predictions = await cocoModelRef.current.detect(canvas, 20, 0.3);
      const elapsed = Date.now() - examStartRef.current;

      for (const pred of predictions) {
        const cls = pred.class as string;
        const suspicious = SUSPICIOUS_CLASSES[cls];
        if (!suspicious || pred.score < 0.4) continue;

        const lastFired = cooldownRef.current.get(cls) || 0;
        if (elapsed - lastFired < 10000) continue;
        cooldownRef.current.set(cls, elapsed);

        onEventRef.current({
          kind: `object.${cls.replace(" ", "_")}_detected`,
          labelKey: suspicious.labelKey,
          severity: suspicious.severity,
          elapsedMs: elapsed,
        });
      }

      const persons = predictions.filter((p: any) => p.class === "person" && p.score > 0.5);
      if (persons.length === 0) {
        const lastFired = cooldownRef.current.get("face.absent") || 0;
        if (elapsed - lastFired > 8000) {
          cooldownRef.current.set("face.absent", elapsed);
          onEventRef.current({
            kind: "face.absent",
            labelKey: "demoEvents.faceAbsent",
            severity: "high",
            elapsedMs: elapsed,
          });
        }
      } else if (persons.length > 1) {
        const lastFired = cooldownRef.current.get("person.multiple") || 0;
        if (elapsed - lastFired > 15000) {
          cooldownRef.current.set("person.multiple", elapsed);
          onEventRef.current({
            kind: "person.multiple_detected",
            labelKey: "demoEvents.multiplePersons",
            severity: "high",
            elapsedMs: elapsed,
          });
        }
      }
    } catch {
      // skip frame on error
    }
  }, [videoElement]);

  const startSpeechDetection = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "fr-FR";

    recognition.onresult = (event: any) => {
      const elapsed = Date.now() - examStartRef.current;
      const lastFired = cooldownRef.current.get("audio.speech") || 0;
      if (elapsed - lastFired < 5000) return;
      cooldownRef.current.set("audio.speech", elapsed);

      const result = event.results[event.results.length - 1];
      if (result[0]?.transcript?.length > 3) {
        onEventRef.current({
          kind: "audio.speech_detected",
          labelKey: "demoEvents.speechDetected",
          severity: "medium",
          elapsedMs: elapsed,
        });
      }
    };

    recognition.onend = () => {
      if (speechRecRef.current === recognition) {
        try { recognition.start(); } catch { /* ignore */ }
      }
    };

    recognition.onerror = () => {
      if (speechRecRef.current === recognition) {
        setTimeout(() => { try { recognition.start(); } catch { /* ignore */ } }, 1000);
      }
    };

    try { recognition.start(); speechRecRef.current = recognition; } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!enabled || !modelsLoaded || !videoElement) return;
    examStartRef.current = Date.now();
    cooldownRef.current.clear();
    detectionIntervalRef.current = setInterval(detectObjects, 3000);
    detectObjects();
    startSpeechDetection();

    return () => {
      if (detectionIntervalRef.current) clearInterval(detectionIntervalRef.current);
      if (speechRecRef.current) {
        const rec = speechRecRef.current;
        speechRecRef.current = null;
        try { rec.stop(); } catch { /* ignore */ }
      }
    };
  }, [enabled, modelsLoaded, videoElement, detectObjects, startSpeechDetection]);

  useEffect(() => {
    if (enabled && !modelsLoaded && !loading) loadModels();
  }, [enabled, modelsLoaded, loading, loadModels]);

  return { modelsLoaded, loading };
}
