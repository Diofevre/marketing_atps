import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AnimatedButton } from "@/components/ButtonDemo";
import { FadeInUp, StaggerContainer } from "@/lib/motion";
import DotLabel from "@/components/DotLabel";
import EnterpriseFeatures from "@/components/sections/EnterpriseFeatures";
import { FOR_WHO } from "@/lib/data/entreprise";

export const metadata: Metadata = {
  title: "MyATPS Entreprise — Solution ATPL pour écoles de pilotage",
  description:
    "Déployez MyATPS à l'échelle de votre école de pilotage. Gestion des étudiants, suivi de progression, surveillance d'examen et accès multi-comptes.",
  openGraph: {
    title: "MyATPS Entreprise — Plateforme ATPL pour écoles de pilotage",
    description:
      "La solution complète pour équiper votre école de pilotage avec les meilleurs outils de préparation ATPL.",
  },
};

export default function EntreprisePage() {
  return (
    <div className="pt-32 pb-20">
      <Container className="flex flex-col gap-20 lg:gap-24">

        {/* ── Hero ── */}
        <StaggerContainer className="flex flex-col gap-6 max-w-3xl">
          <FadeInUp>
            <DotLabel>Entreprise</DotLabel>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-[30px] lg:text-[40px] font-medium leading-[30px] lg:leading-[40px] text-[#1b0c25]">
              La plateforme ATPL pour les écoles de pilotage
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-[16px] leading-[28px] text-[#1b0c25]/50 max-w-xl">
              Déployez MyATPS à l&apos;échelle de votre école. Gestion des étudiants,
              surveillance d&apos;examen, statistiques de classe et sessions de révision
              collectives — tout ce dont vos instructeurs et élèves ont besoin.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <div className="flex flex-wrap gap-3 pt-2">
              <AnimatedButton href="/contact" variant="dark">
                Demander une démo
              </AnimatedButton>
              <AnimatedButton href="/contact" variant="light">
                Contacter l&apos;équipe commerciale
              </AnimatedButton>
            </div>
          </FadeInUp>
        </StaggerContainer>

        {/* ── Features ── */}
        <div className="flex flex-col gap-10">
          <FadeInUp>
            <DotLabel className="mb-3">Fonctionnalités</DotLabel>
            <p className="text-[30px] lg:text-[40px] font-medium leading-[30px] lg:leading-[40px] text-[#1b0c25] max-w-lg">
              Tout ce qu&apos;il faut pour gérer votre école
            </p>
          </FadeInUp>

          <EnterpriseFeatures />
        </div>

        {/* ── Pour qui ── */}
        <FadeInUp>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
            <div className="flex flex-col gap-3 lg:w-64 shrink-0">
              <DotLabel>Pour qui ?</DotLabel>
              <p className="text-[30px] lg:text-[36px] font-medium leading-[30px] lg:leading-[36px] text-[#1b0c25]">
                Conçu pour les pros de l&apos;aviation
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 flex-1">
              {FOR_WHO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 py-4 border-b border-[#1b0c25]/8"
                >
                  <item.icon size={18} className="text-[#1b0c25]/40 shrink-0" />
                  <p className="text-[15px] font-medium text-[#1b0c25]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* ── Tarification ── */}
        <FadeInUp>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 p-8 lg:p-12 rounded-2xl bg-white">
            <div className="flex flex-col gap-3 max-w-lg">
              <DotLabel>Tarification</DotLabel>
              <p className="text-[24px] lg:text-[30px] font-medium leading-tight text-[#1b0c25]">
                Un tarif adapté à la taille de votre école
              </p>
              <p className="text-[14px] leading-[24px] text-[#1b0c25]/50">
                Pas de grille tarifaire rigide. Nous construisons une offre sur mesure
                selon le nombre d&apos;étudiants, les modules souhaités et vos besoins
                spécifiques. Contactez-nous pour obtenir un devis.
              </p>
            </div>
            <AnimatedButton href="/contact" variant="dark">
              Obtenir un devis
            </AnimatedButton>
          </div>
        </FadeInUp>

      </Container>
    </div>
  );
}
