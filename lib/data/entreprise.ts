import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Users,
  BarChart3,
  BookOpen,
  Share2,
  Headphones,
  GraduationCap,
  Building2,
  Plane,
  Briefcase,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  name: string;
  description: string;
}

export interface ForWhoItem {
  icon: LucideIcon;
  label: string;
}

export const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    name: "Procteo — Surveillance d'examen",
    description:
      "Organisez des examens blancs sécurisés avec détection de triche, enregistrement de session et rapports détaillés pour chaque candidat.",
  },
  {
    icon: Users,
    name: "Gestion des étudiants",
    description:
      "Créez et gérez les comptes de toute votre promotion depuis un tableau de bord centralisé. Suivi individuel de chaque élève en temps réel.",
  },
  {
    icon: BarChart3,
    name: "Statistiques avancées",
    description:
      "Identifiez les matières problématiques au niveau de la classe, comparez les progressions et adaptez votre programme en conséquence.",
  },
  {
    icon: Share2,
    name: "Quiz live & sessions partagées",
    description:
      "Lancez des sessions de révision en groupe style Kahoot. Les étudiants rejoignent avec un simple code — aucun compte requis.",
  },
  {
    icon: BookOpen,
    name: "Bibliothèque & ressources",
    description:
      "Mettez à disposition de vos étudiants e-books, PDFs, annexes et procédures directement depuis la plateforme.",
  },
  {
    icon: Headphones,
    name: "Support prioritaire",
    description:
      "Un interlocuteur dédié pour votre école. Onboarding accompagné, formation de vos instructeurs et assistance réactive.",
  },
];

export const FOR_WHO: ForWhoItem[] = [
  { icon: Building2, label: "Écoles de pilotage" },
  { icon: GraduationCap, label: "Académies d'aviation" },
  { icon: Plane, label: "Centres de formation ATPL" },
  { icon: Users, label: "Instructeurs & formateurs" },
  { icon: Briefcase, label: "Compagnies aériennes" },
];
