/**
 * ATPL subject catalogue powering the per-subject SEO landing pages
 * (`/atpl-questions` hub + `/atpl-questions/[subject]`).
 *
 * WHY a TS data module instead of next-intl messages:
 * the per-subject copy is large, fully localized (en + fr both present here),
 * and only ever read inside Server Components (the pages are async RSC). Putting
 * it in the messages bundle would bloat the client-side next-intl payload for
 * zero benefit. UI chrome strings still go through next-intl (`atplQuestions`
 * namespace); only the subject *content* lives here. Each locale is complete,
 * so this is localized data, not a hardcoded single-language string.
 *
 * CONTENT POLICY: everything here is ORIGINAL. The EASA syllabus topic names
 * are factual references (learning-objective areas), not copyrighted question
 * text. No scraped question content is used — see project copyright notes.
 */

export type Locale = "en" | "fr";

export interface SubjectCopy {
  /** Subject name as a noun phrase, e.g. "Air Law". */
  name: string;
  /** One-line hook used in cards and meta description. */
  tagline: string;
  /** 2-3 sentence overview of what the subject covers. */
  overview: string;
  /** 5-7 key syllabus areas (factual EASA topic areas). */
  topics: string[];
  /** One sentence on why students find it hard / what to focus on. */
  challenge: string;
  /** 3 FAQ entries (question + answer) — feeds visible FAQ + FAQPage JSON-LD. */
  faq: { q: string; a: string }[];
}

export interface Subject {
  /** URL slug (English, stable across locales for canonical simplicity). */
  slug: string;
  /** EASA ECQB subject code, e.g. "010". */
  code: string;
  /** Approximate number of practice questions available (kept conservative). */
  approxQuestions: number;
  en: SubjectCopy;
  fr: SubjectCopy;
}

export const ATPL_SUBJECTS: Subject[] = [
  {
    slug: "air-law",
    code: "010",
    approxQuestions: 1400,
    en: {
      name: "Air Law",
      tagline: "ICAO annexes, airspace, rules of the air and licensing — the regulatory backbone of every ATPL.",
      overview:
        "Air Law covers the international and European rules that govern how aircraft operate: the ICAO Annexes, airspace classification, rules of the air, and the framework for licences and certificates. It is largely a memory subject, but the volume of cross-referenced regulation is what catches most students out.",
      topics: [
        "International law: conventions, ICAO and its Annexes",
        "Airworthiness of aircraft and certificates of registration",
        "Aircraft nationality and registration marks",
        "Personnel licensing (flight crew)",
        "Rules of the air and airspace classification (A–G)",
        "Air traffic services, separation and aerodromes",
        "Search and rescue, security and accident investigation",
      ],
      challenge:
        "The hardest part is sheer volume: success comes from spaced repetition on the exact wording of definitions and limits, not from understanding alone.",
      faq: [
        {
          q: "Is Air Law hard?",
          a: "It is rarely conceptually hard, but it is large and detail-heavy. The students who pass first time drill the definitions and numeric limits repeatedly rather than reading the regulation once.",
        },
        {
          q: "How many Air Law questions should I practise?",
          a: "Aim to see the full breadth of the topic areas above several times. Regular short sessions beat occasional long ones for a memory subject like Air Law.",
        },
        {
          q: "Are MyATPS Air Law questions aligned with the EASA syllabus?",
          a: "Yes — questions are organised by the official ECQB learning-objective structure (subject 010), so you practise exactly the areas your exam draws from.",
        },
      ],
    },
    fr: {
      name: "Droit aérien",
      tagline: "Annexes OACI, espaces aériens, règles de l'air et licences — la colonne vertébrale réglementaire de l'ATPL.",
      overview:
        "Le Droit aérien couvre les règles internationales et européennes qui régissent l'exploitation des aéronefs : les Annexes OACI, la classification des espaces aériens, les règles de l'air et le cadre des licences et certificats. C'est surtout une matière de mémorisation, mais le volume de réglementation à recouper en fait trébucher beaucoup.",
      topics: [
        "Droit international : conventions, OACI et ses Annexes",
        "Navigabilité des aéronefs et certificats d'immatriculation",
        "Marques de nationalité et d'immatriculation",
        "Licences du personnel navigant",
        "Règles de l'air et classification des espaces (A–G)",
        "Services de la circulation aérienne, séparation et aérodromes",
        "Recherche et sauvetage, sûreté et enquêtes accidents",
      ],
      challenge:
        "La difficulté, c'est le volume : la réussite vient de la répétition espacée sur le libellé exact des définitions et des limites, pas de la seule compréhension.",
      faq: [
        {
          q: "Le Droit aérien est-il difficile ?",
          a: "Rarement difficile sur le fond, mais vaste et pointilleux. Ceux qui réussissent du premier coup répètent définitions et valeurs chiffrées plutôt que de lire la réglementation une seule fois.",
        },
        {
          q: "Combien de questions de Droit aérien faut-il pratiquer ?",
          a: "Visez à parcourir plusieurs fois l'ensemble des thèmes ci-dessus. Des sessions courtes et régulières valent mieux que de longues sessions occasionnelles pour une matière de mémoire.",
        },
        {
          q: "Les questions Droit aérien MyATPS suivent-elles le syllabus EASA ?",
          a: "Oui — elles sont organisées selon la structure officielle des objectifs ECQB (matière 010), pour réviser exactement les domaines de votre examen.",
        },
      ],
    },
  },
  {
    slug: "airframe-systems",
    code: "021",
    approxQuestions: 2000,
    en: {
      name: "Airframe & Systems",
      tagline: "Structures, hydraulics, electrics, powerplant, ice and fire protection — how the aeroplane is built and run.",
      overview:
        "Aircraft General Knowledge — Airframe & Systems explains how a transport aircraft is constructed and how its systems work: structures, hydraulics, landing gear, electrics, pneumatics, and the powerplant. It rewards genuine understanding of how each system fails and how the design protects against it.",
      topics: [
        "Airframe structures, loads and materials",
        "Hydraulic systems and landing gear",
        "Electrical systems (AC/DC, generation, distribution)",
        "Pneumatics, pressurisation and air conditioning",
        "Powerplant: piston and gas turbine engines",
        "Fuel, ice & rain protection, fire protection",
        "Oxygen systems and emergency equipment",
      ],
      challenge:
        "Don't just memorise — understand each system's failure modes; many questions test what happens when a component fails, not just how it works normally.",
      faq: [
        {
          q: "What does ATPL subject 021 cover?",
          a: "It covers the aircraft's physical systems — structures, hydraulics, electrics, pneumatics, pressurisation, powerplant and protection systems. It is one of the larger subjects by question count.",
        },
        {
          q: "Is Airframe & Systems a memory subject?",
          a: "Partly, but it is best learned by understanding. If you understand why a system is designed a certain way, the failure and limitation questions become intuitive instead of pure recall.",
        },
        {
          q: "How many practice questions are there?",
          a: "It is among the largest banks because the syllabus is broad. Work through it system by system rather than at random.",
        },
      ],
    },
    fr: {
      name: "Cellule et systèmes",
      tagline: "Structures, hydraulique, électricité, motorisation, protection givre et feu — comment l'avion est construit et fonctionne.",
      overview:
        "Connaissance générale de l'aéronef — Cellule et systèmes explique comment un avion de transport est construit et comment fonctionnent ses systèmes : structures, hydraulique, train, électricité, pneumatique et motorisation. La matière récompense une vraie compréhension des modes de panne et des protections de conception.",
      topics: [
        "Structures, charges et matériaux de la cellule",
        "Systèmes hydrauliques et train d'atterrissage",
        "Systèmes électriques (CA/CC, génération, distribution)",
        "Pneumatique, pressurisation et conditionnement d'air",
        "Motorisation : moteurs à pistons et turbines à gaz",
        "Carburant, protection givre & pluie, protection feu",
        "Systèmes d'oxygène et équipements de secours",
      ],
      challenge:
        "Ne mémorisez pas seulement — comprenez les modes de panne de chaque système ; beaucoup de questions portent sur ce qui se passe en cas de défaillance, pas sur le fonctionnement normal.",
      faq: [
        {
          q: "Que couvre la matière ATPL 021 ?",
          a: "Les systèmes physiques de l'avion : structures, hydraulique, électricité, pneumatique, pressurisation, motorisation et systèmes de protection. C'est l'une des matières les plus volumineuses.",
        },
        {
          q: "Cellule et systèmes est-elle une matière de mémoire ?",
          a: "En partie, mais elle s'apprend surtout par la compréhension. Si vous comprenez pourquoi un système est conçu ainsi, les questions de panne et de limite deviennent intuitives.",
        },
        {
          q: "Combien de questions d'entraînement ?",
          a: "C'est l'une des plus grandes banques car le programme est large. Travaillez système par système plutôt qu'au hasard.",
        },
      ],
    },
  },
  {
    slug: "instrumentation",
    code: "022",
    approxQuestions: 1500,
    en: {
      name: "Instrumentation",
      tagline: "Pitot-static, gyros, EFIS, autoflight and warning systems — the instruments you fly by.",
      overview:
        "Instrumentation covers the sensors and displays that give the crew situational awareness: the pitot-static system, gyroscopic instruments, compasses, electronic flight instrument systems (EFIS), the autoflight system and warning systems. Understanding errors and failure indications is central.",
      topics: [
        "Pitot-static instruments (ASI, altimeter, VSI)",
        "Gyroscopic instruments and the magnetic compass",
        "Air data computers and EFIS displays",
        "Autoflight: autopilot, flight director, autothrottle",
        "Flight management systems (FMS)",
        "Warning and recording equipment (GPWS, TCAS, FDR/CVR)",
      ],
      challenge:
        "Instrument errors (e.g. altimeter and compass errors) are a reliable source of exam questions — learn the cause of each error, not just its name.",
      faq: [
        {
          q: "What is ATPL Instrumentation about?",
          a: "It is about how flight instruments and systems sense and display information — pitot-static, gyros, EFIS, autoflight, FMS and warning systems — including their errors and failure modes.",
        },
        {
          q: "Why do students lose marks in Instrumentation?",
          a: "Most lost marks come from instrument-error questions and autoflight logic. Practising these specifically is the fastest way to raise your score.",
        },
        {
          q: "Are the questions aligned with EASA subject 022?",
          a: "Yes, they follow the ECQB 022 learning-objective areas so your practice matches the real exam structure.",
        },
      ],
    },
    fr: {
      name: "Instrumentation",
      tagline: "Anémobarométrie, gyroscopes, EFIS, pilote automatique et alarmes — les instruments qui vous guident.",
      overview:
        "L'Instrumentation couvre les capteurs et afficheurs qui donnent à l'équipage sa conscience de la situation : système anémobarométrique, instruments gyroscopiques, compas, systèmes d'instruments électroniques (EFIS), automatismes de vol et systèmes d'alarme. La compréhension des erreurs et des indications de panne est essentielle.",
      topics: [
        "Instruments anémobarométriques (anémomètre, altimètre, variomètre)",
        "Instruments gyroscopiques et compas magnétique",
        "Centrales anémométriques et afficheurs EFIS",
        "Automatismes : pilote automatique, directeur de vol, autopoussée",
        "Systèmes de gestion du vol (FMS)",
        "Alarmes et enregistreurs (GPWS, TCAS, FDR/CVR)",
      ],
      challenge:
        "Les erreurs instrumentales (altimètre, compas…) sont une source fiable de questions — apprenez la cause de chaque erreur, pas seulement son nom.",
      faq: [
        {
          q: "De quoi parle l'Instrumentation ATPL ?",
          a: "De la manière dont les instruments et systèmes mesurent et affichent l'information — anémobarométrie, gyroscopes, EFIS, automatismes, FMS et alarmes — y compris leurs erreurs et pannes.",
        },
        {
          q: "Pourquoi perd-on des points en Instrumentation ?",
          a: "L'essentiel des points perdus vient des questions sur les erreurs instrumentales et la logique des automatismes. Les travailler en priorité fait remonter la note rapidement.",
        },
        {
          q: "Les questions suivent-elles la matière EASA 022 ?",
          a: "Oui, elles suivent les objectifs ECQB 022 pour coller à la structure réelle de l'examen.",
        },
      ],
    },
  },
  {
    slug: "mass-and-balance",
    code: "031",
    approxQuestions: 900,
    en: {
      name: "Mass & Balance",
      tagline: "Loading, centre of gravity, limits and load sheets — keeping the aircraft inside its envelope.",
      overview:
        "Mass & Balance is about loading the aircraft so that mass and centre of gravity stay within certified limits throughout the flight. It is a calculation subject: once you master the standard methods, the questions become fast and reliable marks.",
      topics: [
        "Definitions of mass and limitations",
        "Centre of gravity and the CG envelope",
        "Load and trim sheets",
        "Effect of loading on CG position",
        "Cargo loading and mass changes in flight",
        "Standard masses for passengers and baggage",
      ],
      challenge:
        "These are calculation questions — build a repeatable method and practise it until it is automatic; speed and accuracy matter more than theory here.",
      faq: [
        {
          q: "Is Mass & Balance calculation-heavy?",
          a: "Yes. It is one of the more numerical subjects. The good news is that the methods are repeatable, so consistent practice turns it into a high-scoring subject.",
        },
        {
          q: "What is the CG envelope?",
          a: "It is the range of centre-of-gravity positions, at a given mass, within which the aircraft is certified to be safely controllable. Many questions test whether a given loading stays inside it.",
        },
        {
          q: "How should I revise it?",
          a: "Practise full worked problems repeatedly rather than reading theory. MyATPS lets you drill subject-031 questions until the method is automatic.",
        },
      ],
    },
    fr: {
      name: "Masse et centrage",
      tagline: "Chargement, centre de gravité, limites et devis de masse — garder l'avion dans son domaine.",
      overview:
        "La Masse et centrage consiste à charger l'avion pour que la masse et le centre de gravité restent dans les limites certifiées tout au long du vol. C'est une matière de calcul : une fois les méthodes standard maîtrisées, les questions deviennent des points rapides et fiables.",
      topics: [
        "Définitions de masse et limitations",
        "Centre de gravité et domaine de centrage",
        "Devis de masse et de centrage",
        "Effet du chargement sur la position du CG",
        "Chargement du fret et variations de masse en vol",
        "Masses forfaitaires passagers et bagages",
      ],
      challenge:
        "Ce sont des questions de calcul — construisez une méthode répétable et entraînez-la jusqu'à l'automatisme ; vitesse et précision priment ici sur la théorie.",
      faq: [
        {
          q: "La Masse et centrage est-elle calculatoire ?",
          a: "Oui, c'est l'une des matières les plus numériques. Bonne nouvelle : les méthodes sont répétables, donc une pratique régulière en fait une matière à haut rendement.",
        },
        {
          q: "Qu'est-ce que le domaine de centrage ?",
          a: "C'est la plage de positions du centre de gravité, à une masse donnée, où l'avion est certifié contrôlable en sécurité. Beaucoup de questions vérifient si un chargement y reste.",
        },
        {
          q: "Comment réviser ?",
          a: "Refaites des problèmes complets plutôt que de lire la théorie. MyATPS permet d'enchaîner les questions de la matière 031 jusqu'à l'automatisme.",
        },
      ],
    },
  },
  {
    slug: "performance",
    code: "032",
    approxQuestions: 1300,
    en: {
      name: "Performance",
      tagline: "Take-off, climb, cruise and landing performance across aircraft classes — the numbers that keep flight legal and safe.",
      overview:
        "Performance covers how aircraft perform in each phase of flight — take-off, climb, cruise, descent and landing — and the regulatory margins that apply. It combines graph and table reading with an understanding of the factors (weight, altitude, temperature, wind) that change the numbers.",
      topics: [
        "General performance theory and definitions",
        "Take-off and landing performance",
        "Climb, cruise and descent performance",
        "Single- and multi-engine class performance",
        "Effect of mass, altitude, temperature and wind",
        "Performance graphs, charts and tables",
      ],
      challenge:
        "Graph and chart reading under time pressure is the real skill — practise extracting numbers accurately and quickly from the performance charts.",
      faq: [
        {
          q: "What makes Performance difficult?",
          a: "It mixes theory with fast, accurate chart reading. Many candidates know the theory but lose time and accuracy on the graphs, so targeted chart practice pays off.",
        },
        {
          q: "Which factors change performance figures?",
          a: "Mass, pressure altitude, temperature, wind and runway condition are the big ones. Questions frequently change one factor and ask for the effect.",
        },
        {
          q: "Does MyATPS follow EASA subject 032?",
          a: "Yes — questions are mapped to the ECQB 032 learning objectives so you cover every performance area the exam can test.",
        },
      ],
    },
    fr: {
      name: "Performances",
      tagline: "Décollage, montée, croisière et atterrissage selon les classes d'avions — les chiffres qui rendent le vol légal et sûr.",
      overview:
        "Les Performances couvrent le comportement de l'avion à chaque phase du vol — décollage, montée, croisière, descente et atterrissage — et les marges réglementaires associées. La matière combine lecture de graphiques et de tables avec la compréhension des facteurs (masse, altitude, température, vent) qui modifient les chiffres.",
      topics: [
        "Théorie générale et définitions de performance",
        "Performances au décollage et à l'atterrissage",
        "Performances en montée, croisière et descente",
        "Classes de performance mono- et multimoteur",
        "Effet de la masse, altitude, température et vent",
        "Graphiques, abaques et tables de performance",
      ],
      challenge:
        "La vraie compétence, c'est la lecture d'abaques sous contrainte de temps — entraînez-vous à extraire les chiffres vite et juste.",
      faq: [
        {
          q: "Qu'est-ce qui rend les Performances difficiles ?",
          a: "Le mélange théorie + lecture d'abaques rapide et précise. Beaucoup connaissent la théorie mais perdent du temps sur les graphiques ; s'entraîner dessus est rentable.",
        },
        {
          q: "Quels facteurs modifient les performances ?",
          a: "Masse, altitude-pression, température, vent et état de piste. Les questions changent souvent un facteur et demandent l'effet.",
        },
        {
          q: "MyATPS suit-il la matière EASA 032 ?",
          a: "Oui — les questions sont rattachées aux objectifs ECQB 032 pour couvrir tous les domaines testables.",
        },
      ],
    },
  },
  {
    slug: "flight-planning-monitoring",
    code: "033",
    approxQuestions: 1100,
    en: {
      name: "Flight Planning & Monitoring",
      tagline: "Fuel planning, flight logs, ATC plans and in-flight monitoring — getting from A to B with the right reserves.",
      overview:
        "Flight Planning & Monitoring brings together navigation, fuel and meteorology into a practical plan: route and fuel calculations, completing flight logs and ATC flight plans, and monitoring progress against the plan in flight. It is a synthesis subject that draws on several others.",
      topics: [
        "VFR and IFR flight planning",
        "Fuel planning and reserves",
        "Completion of a navigation/flight log",
        "ATS flight plan completion",
        "Point of equal time and point of safe return",
        "In-flight replanning and monitoring",
      ],
      challenge:
        "Because it synthesises navigation, performance and meteorology, gaps in those subjects show up here — shore them up before drilling planning questions.",
      faq: [
        {
          q: "What is Flight Planning & Monitoring?",
          a: "It is the practical subject of building and following a flight plan — route, fuel, reserves, logs and ATC plans — and monitoring the flight against it.",
        },
        {
          q: "What are PET and PSR?",
          a: "Point of Equal Time and Point of Safe Return are classic planning calculations. They appear regularly, so they are worth drilling until they are automatic.",
        },
        {
          q: "Does it depend on other subjects?",
          a: "Yes — it draws on General Navigation, Performance and Meteorology. Strengthening those makes Flight Planning much easier.",
        },
      ],
    },
    fr: {
      name: "Préparation et suivi du vol",
      tagline: "Calcul carburant, logs de navigation, plans ATC et suivi en vol — aller de A à B avec les bonnes réserves.",
      overview:
        "La Préparation et suivi du vol réunit navigation, carburant et météorologie en un plan concret : calculs de route et de carburant, remplissage des logs et plans de vol ATC, et suivi de la progression en vol. C'est une matière de synthèse qui s'appuie sur plusieurs autres.",
      topics: [
        "Préparation de vol VFR et IFR",
        "Calcul du carburant et des réserves",
        "Remplissage d'un log de navigation",
        "Remplissage du plan de vol ATS",
        "Point d'égale distance et point de non-retour",
        "Replanification et suivi en vol",
      ],
      challenge:
        "Comme elle synthétise navigation, performances et météo, vos lacunes dans ces matières ressortent ici — consolidez-les avant d'enchaîner les questions de planification.",
      faq: [
        {
          q: "Qu'est-ce que la Préparation et suivi du vol ?",
          a: "La matière concrète de construction et de suivi d'un plan de vol — route, carburant, réserves, logs et plans ATC — et son suivi en vol.",
        },
        {
          q: "Que sont le PED et le PNR ?",
          a: "Point d'Égale Distance et Point de Non-Retour : des calculs de planification classiques. Ils reviennent souvent, donc à automatiser.",
        },
        {
          q: "Dépend-elle d'autres matières ?",
          a: "Oui — Navigation générale, Performances et Météorologie. Les renforcer rend la planification bien plus facile.",
        },
      ],
    },
  },
  {
    slug: "human-performance",
    code: "040",
    approxQuestions: 1000,
    en: {
      name: "Human Performance & Limitations",
      tagline: "Physiology, psychology and human factors — the pilot as the most important system on board.",
      overview:
        "Human Performance & Limitations studies the human in the cockpit: basic aviation physiology, the effects of altitude and acceleration, health and hygiene, and the psychology of perception, decision-making and crew cooperation. It is mostly understanding-based and often a confidence-builder early in the course.",
      topics: [
        "Basic aviation physiology and the atmosphere",
        "Hypoxia, hyperventilation and pressure effects",
        "Vision, hearing and the vestibular system",
        "Health, hygiene and human limitations",
        "Information processing and human error",
        "Stress, fatigue and crew resource management (CRM)",
      ],
      challenge:
        "Beware wording traps: many questions hinge on a single precise term (e.g. types of hypoxia), so learn the definitions exactly.",
      faq: [
        {
          q: "Is Human Performance an easy subject?",
          a: "Many students find it among the more approachable subjects because it is understanding-based. The traps are in precise terminology, not in difficult calculations.",
        },
        {
          q: "What is CRM?",
          a: "Crew Resource Management — the effective use of all available resources, including people, to operate safely. It is a recurring theme in the psychology part of the subject.",
        },
        {
          q: "Does it follow EASA subject 040?",
          a: "Yes, the question bank maps to the ECQB 040 learning objectives covering both physiology and psychology.",
        },
      ],
    },
    fr: {
      name: "Performance humaine",
      tagline: "Physiologie, psychologie et facteurs humains — le pilote, système le plus important à bord.",
      overview:
        "La Performance humaine et ses limites étudie l'humain dans le cockpit : physiologie aéronautique de base, effets de l'altitude et des accélérations, santé et hygiène, et psychologie de la perception, de la décision et de la coopération. Surtout fondée sur la compréhension, elle met souvent en confiance en début de cursus.",
      topics: [
        "Physiologie aéronautique de base et atmosphère",
        "Hypoxie, hyperventilation et effets de pression",
        "Vision, audition et système vestibulaire",
        "Santé, hygiène et limites humaines",
        "Traitement de l'information et erreur humaine",
        "Stress, fatigue et gestion des ressources d'équipage (CRM)",
      ],
      challenge:
        "Attention aux pièges de formulation : beaucoup de questions reposent sur un terme précis (ex. types d'hypoxie) — apprenez les définitions exactement.",
      faq: [
        {
          q: "La Performance humaine est-elle une matière facile ?",
          a: "Beaucoup la trouvent parmi les plus abordables car fondée sur la compréhension. Les pièges sont dans la terminologie précise, pas dans des calculs difficiles.",
        },
        {
          q: "Qu'est-ce que le CRM ?",
          a: "Crew Resource Management — l'usage efficace de toutes les ressources disponibles, humaines incluses, pour opérer en sécurité. Un thème récurrent de la partie psychologie.",
        },
        {
          q: "Suit-elle la matière EASA 040 ?",
          a: "Oui, la banque suit les objectifs ECQB 040 couvrant physiologie et psychologie.",
        },
      ],
    },
  },
  {
    slug: "meteorology",
    code: "050",
    approxQuestions: 1800,
    en: {
      name: "Meteorology",
      tagline: "Atmosphere, pressure, winds, clouds, hazards and forecasts — reading the weather like a professional.",
      overview:
        "Meteorology covers the atmosphere and the weather that affects flight: pressure and temperature, wind, clouds and precipitation, air masses and fronts, flight hazards such as icing and thunderstorms, and the meteorological information and charts used in planning. It is broad and one of the larger subjects.",
      topics: [
        "The atmosphere, pressure and temperature",
        "Wind, global circulation and local winds",
        "Clouds, precipitation and visibility",
        "Air masses, fronts and pressure systems",
        "Flight hazards: icing, turbulence, thunderstorms, wind shear",
        "Meteorological information: METAR, TAF and charts",
      ],
      challenge:
        "It is broad and partly conceptual, partly memory — link the physical cause to the hazard rather than memorising symptoms in isolation.",
      faq: [
        {
          q: "Why is Meteorology considered a big subject?",
          a: "It spans physics of the atmosphere, weather systems, flight hazards and the practical reading of reports and charts. Its breadth is why it is one of the larger question banks.",
        },
        {
          q: "How do I learn METARs and TAFs?",
          a: "Decode real examples repeatedly until the format is second nature. MyATPS lets you drill report-decoding questions specifically.",
        },
        {
          q: "Is it aligned with EASA subject 050?",
          a: "Yes — questions follow the ECQB 050 learning-objective areas across theory, hazards and practical meteorology.",
        },
      ],
    },
    fr: {
      name: "Météorologie",
      tagline: "Atmosphère, pression, vents, nuages, dangers et prévisions — lire le temps comme un professionnel.",
      overview:
        "La Météorologie couvre l'atmosphère et le temps qui affecte le vol : pression et température, vent, nuages et précipitations, masses d'air et fronts, dangers comme le givrage et les orages, et l'information météo et les cartes utilisées en préparation. Vaste, c'est l'une des plus grandes matières.",
      topics: [
        "Atmosphère, pression et température",
        "Vent, circulation générale et vents locaux",
        "Nuages, précipitations et visibilité",
        "Masses d'air, fronts et systèmes de pression",
        "Dangers : givrage, turbulence, orages, cisaillement",
        "Information météo : METAR, TAF et cartes",
      ],
      challenge:
        "Vaste et mi-conceptuelle mi-mémoire — reliez la cause physique au danger plutôt que de mémoriser des symptômes isolés.",
      faq: [
        {
          q: "Pourquoi la Météo est-elle une grosse matière ?",
          a: "Elle couvre la physique de l'atmosphère, les systèmes météo, les dangers en vol et la lecture pratique des messages et cartes. Son étendue explique la taille de la banque.",
        },
        {
          q: "Comment apprendre les METAR et TAF ?",
          a: "Décodez des exemples réels jusqu'à ce que le format soit naturel. MyATPS permet d'enchaîner des questions de décodage.",
        },
        {
          q: "Suit-elle la matière EASA 050 ?",
          a: "Oui — les questions suivent les objectifs ECQB 050 (théorie, dangers et météo pratique).",
        },
      ],
    },
  },
  {
    slug: "general-navigation",
    code: "061",
    approxQuestions: 1600,
    en: {
      name: "General Navigation",
      tagline: "Charts, the triangle of velocities, time and magnetism — finding your way without radio aids.",
      overview:
        "General Navigation is the classical art of navigation: the Earth and its coordinates, chart projections, the triangle of velocities, magnetism and compasses, time, and dead reckoning. It is calculation-rich and rewards a confident, repeatable method with the navigation computer.",
      topics: [
        "The Earth, direction, distance and coordinates",
        "Chart projections and their properties",
        "The triangle of velocities and dead reckoning",
        "Magnetism and the magnetic compass",
        "Time and its relationship to longitude",
        "Use of the navigation computer (flight computer)",
      ],
      challenge:
        "Master the navigation computer early — fluency with it removes most of the time pressure in both General Navigation and Flight Planning.",
      faq: [
        {
          q: "Is General Navigation calculation-heavy?",
          a: "Yes, it is one of the most numerical subjects. Consistent practice with the navigation computer and the triangle of velocities is the key to a good score.",
        },
        {
          q: "What is the triangle of velocities?",
          a: "It is the vector relationship between heading/true airspeed, wind, and track/groundspeed. It underpins a large share of General Navigation questions.",
        },
        {
          q: "Does it match EASA subject 061?",
          a: "Yes — questions follow the ECQB 061 learning objectives, from charts and time to dead reckoning.",
        },
      ],
    },
    fr: {
      name: "Navigation générale",
      tagline: "Cartes, triangle des vitesses, temps et magnétisme — trouver sa route sans aides radio.",
      overview:
        "La Navigation générale est l'art classique de la navigation : la Terre et ses coordonnées, les projections cartographiques, le triangle des vitesses, le magnétisme et les compas, le temps et l'estime. Riche en calculs, elle récompense une méthode sûre et répétable au computer de navigation.",
      topics: [
        "La Terre, direction, distance et coordonnées",
        "Projections cartographiques et leurs propriétés",
        "Triangle des vitesses et navigation à l'estime",
        "Magnétisme et compas magnétique",
        "Le temps et sa relation avec la longitude",
        "Usage du computer de navigation",
      ],
      challenge:
        "Maîtrisez tôt le computer de navigation — l'aisance avec lui supprime l'essentiel de la pression de temps en Nav générale et en Préparation du vol.",
      faq: [
        {
          q: "La Navigation générale est-elle calculatoire ?",
          a: "Oui, l'une des matières les plus numériques. Une pratique régulière au computer et du triangle des vitesses est la clé d'une bonne note.",
        },
        {
          q: "Qu'est-ce que le triangle des vitesses ?",
          a: "La relation vectorielle entre cap/vitesse vraie, vent, et route/vitesse sol. Il sous-tend une grande part des questions.",
        },
        {
          q: "Correspond-elle à la matière EASA 061 ?",
          a: "Oui — les questions suivent les objectifs ECQB 061, des cartes au temps et à l'estime.",
        },
      ],
    },
  },
  {
    slug: "radio-navigation",
    code: "062",
    approxQuestions: 1400,
    en: {
      name: "Radio Navigation",
      tagline: "VOR, DME, ILS, GNSS and radar — navigating and approaching with radio and satellite aids.",
      overview:
        "Radio Navigation covers the radio and satellite systems used to navigate and to fly approaches: ground-based aids such as NDB, VOR, DME and ILS, area navigation and GNSS, and airborne and ground radar. Understanding each aid's principle, errors and coverage is the core skill.",
      topics: [
        "Radio propagation fundamentals",
        "NDB and the ADF",
        "VOR and DME",
        "Instrument Landing System (ILS) and MLS",
        "Area navigation (RNAV) and GNSS",
        "Ground and airborne radar",
      ],
      challenge:
        "Each aid has characteristic errors and a coverage pattern — learn them per-aid so comparison questions become straightforward.",
      faq: [
        {
          q: "What does Radio Navigation cover?",
          a: "It covers radio and satellite navigation aids — NDB, VOR, DME, ILS, RNAV and GNSS — plus radar, including the principle, errors and limitations of each.",
        },
        {
          q: "How is it different from General Navigation?",
          a: "General Navigation is navigation without radio aids (charts, dead reckoning); Radio Navigation is navigation using radio and satellite systems. Both are examined separately.",
        },
        {
          q: "Does it follow EASA subject 062?",
          a: "Yes — questions are organised by the ECQB 062 learning objectives, aid by aid.",
        },
      ],
    },
    fr: {
      name: "Radionavigation",
      tagline: "VOR, DME, ILS, GNSS et radar — naviguer et approcher avec les aides radio et satellite.",
      overview:
        "La Radionavigation couvre les systèmes radio et satellite utilisés pour naviguer et réaliser les approches : aides au sol comme NDB, VOR, DME et ILS, navigation de surface et GNSS, et radars sol et bord. Comprendre le principe, les erreurs et la couverture de chaque aide est la compétence centrale.",
      topics: [
        "Principes de propagation radio",
        "NDB et ADF",
        "VOR et DME",
        "Système d'atterrissage aux instruments (ILS) et MLS",
        "Navigation de surface (RNAV) et GNSS",
        "Radars sol et bord",
      ],
      challenge:
        "Chaque aide a des erreurs et une couverture caractéristiques — apprenez-les aide par aide pour que les questions de comparaison deviennent simples.",
      faq: [
        {
          q: "Que couvre la Radionavigation ?",
          a: "Les aides radio et satellite — NDB, VOR, DME, ILS, RNAV et GNSS — ainsi que le radar, avec principe, erreurs et limites de chacune.",
        },
        {
          q: "Quelle différence avec la Navigation générale ?",
          a: "La Nav générale se fait sans aides radio (cartes, estime) ; la Radionavigation utilise les systèmes radio et satellite. Les deux sont examinées séparément.",
        },
        {
          q: "Suit-elle la matière EASA 062 ?",
          a: "Oui — les questions sont organisées par objectifs ECQB 062, aide par aide.",
        },
      ],
    },
  },
  {
    slug: "operational-procedures",
    code: "070",
    approxQuestions: 1000,
    en: {
      name: "Operational Procedures",
      tagline: "Operations, hazards, emergencies and special operations — flying the line safely and legally.",
      overview:
        "Operational Procedures covers the rules and good practice of commercial operations: general requirements, special operational hazards and procedures (such as low-visibility or contaminated-runway operations), and emergency and abnormal procedures. It connects regulation to the realities of line flying.",
      topics: [
        "General operational requirements",
        "Special operational procedures and hazards",
        "Low-visibility and adverse-condition operations",
        "Transport of dangerous goods",
        "Security and emergency procedures",
        "Cabin safety and evacuation",
      ],
      challenge:
        "It overlaps with Air Law and Human Performance — relating each procedure to its underlying rule and reason helps it stick.",
      faq: [
        {
          q: "What is Operational Procedures about?",
          a: "It is about how commercial flights are operated safely and legally — general requirements, special hazards and procedures, dangerous goods, security and emergencies.",
        },
        {
          q: "Does it overlap with other subjects?",
          a: "Yes, with Air Law and Human Performance. Studying them together reinforces all three.",
        },
        {
          q: "Is it aligned with EASA subject 070?",
          a: "Yes — questions follow the ECQB 070 learning-objective areas.",
        },
      ],
    },
    fr: {
      name: "Procédures opérationnelles",
      tagline: "Exploitation, dangers, urgences et opérations spéciales — voler en ligne en sécurité et légalement.",
      overview:
        "Les Procédures opérationnelles couvrent les règles et bonnes pratiques de l'exploitation commerciale : exigences générales, dangers et procédures spéciales (faible visibilité, piste contaminée…), et procédures d'urgence et anormales. Elles relient la réglementation aux réalités du vol en ligne.",
      topics: [
        "Exigences opérationnelles générales",
        "Procédures et dangers opérationnels spéciaux",
        "Opérations par faible visibilité et conditions défavorables",
        "Transport de marchandises dangereuses",
        "Procédures de sûreté et d'urgence",
        "Sécurité cabine et évacuation",
      ],
      challenge:
        "Elles recoupent le Droit aérien et la Performance humaine — relier chaque procédure à sa règle et sa raison aide à les retenir.",
      faq: [
        {
          q: "De quoi parlent les Procédures opérationnelles ?",
          a: "De la manière d'exploiter des vols commerciaux en sécurité et légalement — exigences générales, dangers et procédures spéciales, marchandises dangereuses, sûreté et urgences.",
        },
        {
          q: "Recoupent-elles d'autres matières ?",
          a: "Oui, le Droit aérien et la Performance humaine. Les étudier ensemble renforce les trois.",
        },
        {
          q: "Suit-elle la matière EASA 070 ?",
          a: "Oui — les questions suivent les objectifs ECQB 070.",
        },
      ],
    },
  },
  {
    slug: "principles-of-flight",
    code: "081",
    approxQuestions: 1300,
    en: {
      name: "Principles of Flight",
      tagline: "Aerodynamics, lift, drag, stability and control — why and how an aeroplane flies.",
      overview:
        "Principles of Flight is the aerodynamics subject: how lift and drag are generated, the stall, stability and control, high-speed flight, and the basics of propellers and flight mechanics. Understanding the physics makes most questions logical rather than memory-based.",
      topics: [
        "Airflow, lift and drag",
        "The aerofoil and the stall",
        "Stability and control",
        "High-speed (transonic) aerodynamics",
        "Flight mechanics and the flight envelope",
        "Propeller fundamentals",
      ],
      challenge:
        "It is conceptual — invest in genuinely understanding the aerodynamics, because rote memory fails on the 'what happens if' questions.",
      faq: [
        {
          q: "Is Principles of Flight hard?",
          a: "It is conceptual rather than memory-heavy. Students who understand the underlying physics find the questions logical; those who memorise struggle with applied questions.",
        },
        {
          q: "What topics matter most?",
          a: "Lift and drag, the stall, and stability and control are central and recur throughout the exam.",
        },
        {
          q: "Does it follow EASA subject 081?",
          a: "Yes — the question bank maps to the ECQB 081 learning objectives.",
        },
      ],
    },
    fr: {
      name: "Principes du vol",
      tagline: "Aérodynamique, portance, traînée, stabilité et contrôle — pourquoi et comment un avion vole.",
      overview:
        "Les Principes du vol, c'est l'aérodynamique : génération de la portance et de la traînée, décrochage, stabilité et contrôle, vol à grande vitesse, et bases de l'hélice et de la mécanique du vol. Comprendre la physique rend la plupart des questions logiques plutôt que mémorielles.",
      topics: [
        "Écoulement, portance et traînée",
        "Le profil et le décrochage",
        "Stabilité et contrôle",
        "Aérodynamique à grande vitesse (transsonique)",
        "Mécanique du vol et domaine de vol",
        "Bases de l'hélice",
      ],
      challenge:
        "Matière conceptuelle — investissez dans une vraie compréhension de l'aérodynamique, car la mémoire pure échoue sur les questions « que se passe-t-il si ».",
      faq: [
        {
          q: "Les Principes du vol sont-ils difficiles ?",
          a: "Plutôt conceptuels que mémoriels. Ceux qui comprennent la physique trouvent les questions logiques ; ceux qui mémorisent peinent sur les questions appliquées.",
        },
        {
          q: "Quels thèmes comptent le plus ?",
          a: "Portance et traînée, décrochage, stabilité et contrôle sont centraux et reviennent tout au long de l'examen.",
        },
        {
          q: "Suit-elle la matière EASA 081 ?",
          a: "Oui — la banque suit les objectifs ECQB 081.",
        },
      ],
    },
  },
  {
    slug: "communications-vfr",
    code: "091",
    approxQuestions: 500,
    en: {
      name: "VFR Communications",
      tagline: "Radiotelephony for visual flight — phraseology, procedures and failure handling.",
      overview:
        "VFR Communications covers radiotelephony for visual flight rules: standard phraseology, the meaning of terms and abbreviations, communication procedures with ATC, and what to do in the event of communication failure or distress. It is concise and high-yield once the standard phraseology is learned.",
      topics: [
        "Definitions and radiotelephony fundamentals",
        "Standard words, phrases and the phonetic alphabet",
        "VFR communication procedures with ATC",
        "Relevant weather information and reports",
        "Communication failure procedures",
        "Distress and urgency procedures",
      ],
      challenge:
        "It is small but precise — exact phraseology matters, so practise the standard calls until they are automatic.",
      faq: [
        {
          q: "Is VFR Communications a small subject?",
          a: "Yes, it is one of the smaller subjects. With focused practice on standard phraseology it can be a quick, high-scoring exam.",
        },
        {
          q: "How is it different from IFR Communications?",
          a: "VFR Comms covers radiotelephony for visual flight; IFR Comms covers it for instrument flight, with procedures specific to IFR operations.",
        },
        {
          q: "Does it follow EASA subject 091?",
          a: "Yes — questions follow the ECQB 091 learning objectives.",
        },
      ],
    },
    fr: {
      name: "Communications VFR",
      tagline: "Radiotéléphonie pour le vol à vue — phraséologie, procédures et gestion des pannes.",
      overview:
        "Les Communications VFR couvrent la radiotéléphonie en vol à vue : phraséologie standard, sens des termes et abréviations, procédures de communication avec l'ATC, et conduite à tenir en cas de panne de communication ou de détresse. Concise et à fort rendement une fois la phraséologie acquise.",
      topics: [
        "Définitions et bases de la radiotéléphonie",
        "Mots, expressions standard et alphabet phonétique",
        "Procédures de communication VFR avec l'ATC",
        "Informations et messages météo pertinents",
        "Procédures de panne de communication",
        "Procédures de détresse et d'urgence",
      ],
      challenge:
        "Petite mais précise — la phraséologie exacte compte, alors entraînez les messages standard jusqu'à l'automatisme.",
      faq: [
        {
          q: "Les Communications VFR sont-elles une petite matière ?",
          a: "Oui, l'une des plus petites. Avec un entraînement ciblé sur la phraséologie, c'est un examen rapide et à haut rendement.",
        },
        {
          q: "Quelle différence avec les Communications IFR ?",
          a: "Les Comms VFR couvrent la radiotéléphonie en vol à vue ; les Comms IFR la couvrent en vol aux instruments, avec des procédures propres à l'IFR.",
        },
        {
          q: "Suit-elle la matière EASA 091 ?",
          a: "Oui — les questions suivent les objectifs ECQB 091.",
        },
      ],
    },
  },
  {
    slug: "communications-ifr",
    code: "092",
    approxQuestions: 500,
    en: {
      name: "IFR Communications",
      tagline: "Radiotelephony for instrument flight — clearances, procedures and contingencies.",
      overview:
        "IFR Communications covers radiotelephony for instrument flight rules: standard phraseology and procedures for IFR operations, reading back clearances, and handling communication failure, distress and urgency. Like VFR Comms it is concise and rewards precise, well-practised phraseology.",
      topics: [
        "Definitions and radiotelephony fundamentals",
        "Standard words, phrases and the phonetic alphabet",
        "IFR communication procedures and clearances",
        "Relevant weather information and reports",
        "Communication failure procedures",
        "Distress and urgency procedures",
      ],
      challenge:
        "Clearance read-backs must be exact — drill the standard IFR exchanges so the precise wording is automatic.",
      faq: [
        {
          q: "What does IFR Communications cover?",
          a: "Radiotelephony for instrument flight — phraseology, clearances and procedures, plus communication failure, distress and urgency handling.",
        },
        {
          q: "Is it a quick subject to pass?",
          a: "It is one of the smaller subjects, so with focused phraseology practice it can be passed efficiently.",
        },
        {
          q: "Does it follow EASA subject 092?",
          a: "Yes — questions follow the ECQB 092 learning objectives.",
        },
      ],
    },
    fr: {
      name: "Communications IFR",
      tagline: "Radiotéléphonie pour le vol aux instruments — clairances, procédures et situations dégradées.",
      overview:
        "Les Communications IFR couvrent la radiotéléphonie en vol aux instruments : phraséologie et procédures standard en IFR, collationnement des clairances, et gestion des pannes de communication, de la détresse et de l'urgence. Comme les Comms VFR, concise et récompensant une phraséologie précise et bien entraînée.",
      topics: [
        "Définitions et bases de la radiotéléphonie",
        "Mots, expressions standard et alphabet phonétique",
        "Procédures de communication IFR et clairances",
        "Informations et messages météo pertinents",
        "Procédures de panne de communication",
        "Procédures de détresse et d'urgence",
      ],
      challenge:
        "Les collationnements de clairance doivent être exacts — entraînez les échanges IFR standard pour que le libellé précis soit automatique.",
      faq: [
        {
          q: "Que couvrent les Communications IFR ?",
          a: "La radiotéléphonie en vol aux instruments — phraséologie, clairances et procédures, plus gestion des pannes, détresse et urgence.",
        },
        {
          q: "Est-ce une matière rapide à valider ?",
          a: "L'une des plus petites, donc avec un entraînement ciblé sur la phraséologie, elle se valide efficacement.",
        },
        {
          q: "Suit-elle la matière EASA 092 ?",
          a: "Oui — les questions suivent les objectifs ECQB 092.",
        },
      ],
    },
  },
];

export function getSubject(slug: string): Subject | undefined {
  return ATPL_SUBJECTS.find((s) => s.slug === slug);
}
