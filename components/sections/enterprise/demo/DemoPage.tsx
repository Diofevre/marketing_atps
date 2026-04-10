"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import TitleSection from "@/components/TitleSection";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUpVariants, fadeInUpDelayedVariants } from "@/lib/motion";
import { useDemoSession } from "./useDemoSession";
import DemoLanding from "./DemoLanding";
import DemoQueue from "./DemoQueue";
import DemoSystemCheck from "./DemoSystemCheck";
import DemoPermissions from "./DemoPermissions";
import DemoIdentity from "./DemoIdentity";
import DemoConsent from "./DemoConsent";
import DemoExam from "./DemoExam";
import DemoResults from "./DemoResults";
import { useState } from "react";

export default function DemoPage() {
  const t = useTranslations("enterpriseDemo");
  const session = useDemoSession();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    await session.startDemo();
    setLoading(false);
  };

  return (
    <div className="w-full px-4 pt-[100px] lg:pt-[140px] pb-16 lg:pb-[120px]">
      <Container className="flex flex-col items-center gap-10 lg:gap-[60px]">
        {/* Header — hidden during exam */}
        {session.step !== "exam" && (
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center gap-4 lg:gap-5 max-w-[700px]"
          >
            <TitleSection title={t("badge")} />
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] leading-tight lg:leading-[52px] text-[#1b0c25] font-medium">
              {t("title")}
            </h1>
            {session.step === "landing" && (
              <motion.p
                variants={fadeInUpDelayedVariants}
                className="text-base lg:text-[16px] leading-relaxed lg:leading-[26px] text-[#1b0c25]/60"
              >
                {t("description")}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Demo stages */}
        <div className="w-full max-w-[960px]">
          <AnimatePresence mode="wait">
            {session.step === "landing" && (
              <DemoLanding
                key="landing"
                email={session.email}
                error={session.error}
                loading={loading}
                onEmailChange={session.setEmail}
                onStart={handleStart}
              />
            )}

            {session.step === "queued" && (
              <DemoQueue
                key="queued"
                position={session.queuePosition}
                waitSeconds={session.queueWaitSeconds}
              />
            )}

            {session.step === "systemcheck" && (
              <DemoSystemCheck
                key="systemcheck"
                onComplete={session.goToPermissions}
              />
            )}

            {session.step === "permissions" && (
              <DemoPermissions
                key="permissions"
                hasCamera={session.hasCamera}
                hasMicrophone={session.hasMicrophone}
                hasScreen={session.hasScreen}
                cameraStream={session.cameraStream}
                onRequestCamera={session.requestCamera}
                onConfirmCameraReady={session.confirmCameraReady}
                onRequestScreen={session.requestScreen}
                onSkipScreen={session.skipScreen}
                onGoToIdentity={session.goToIdentityStep}
                onComplete={session.goToConsent}
              />
            )}

            {session.step === "identity" && (
              <DemoIdentity
                key="identity"
                cameraStream={session.cameraStream}
                identityPhoto={session.identityPhoto}
                identityMatched={session.identityMatched}
                onSetPhoto={session.setIdentityPhoto}
                onVerify={session.verifyIdentity}
                onComplete={session.goToConsent}
              />
            )}

            {session.step === "consent" && (
              <DemoConsent
                key="consent"
                onAccept={session.startExam}
              />
            )}

            {session.step === "exam" && (
              <DemoExam
                key="exam"
                questions={session.questions}
                currentQuestion={session.currentQuestion}
                answers={session.answers}
                timeRemaining={session.timeRemaining}
                answeredCount={session.answeredCount}
                events={session.events}
                cameraStream={session.cameraStream}
                onSelectAnswer={session.selectAnswer}
                onGoToQuestion={session.goToQuestion}
                onSubmit={session.submitExam}
              />
            )}

            {session.step === "results" && (
              <DemoResults
                key="results"
                score={session.score}
                totalQuestions={session.totalQuestions}
                timeRemaining={session.timeRemaining}
                events={session.events}
                onRestart={session.restart}
              />
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
}
