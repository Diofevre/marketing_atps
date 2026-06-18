/**
 * Sub-topic SEO pages for the largest ATPL subjects
 * (`/atpl-questions/[subject]/[topic]`).
 *
 * Only the broadest subjects get sub-topics — each page must carry genuinely
 * distinct content (no thin/duplicate pages, which Google penalises and which
 * would be doubly risky given the project's copyright context). Topic names
 * are factual EASA syllabus areas; all prose here is original.
 *
 * Same localized-TS-data rationale as lib/atpl-subjects.ts.
 */

import type { Locale } from "./atpl-subjects";

export interface SubtopicCopy {
  name: string;
  tagline: string;
  overview: string;
  topics: string[];
  challenge: string;
  faq: { q: string; a: string }[];
}

export interface Subtopic {
  slug: string;
  en: SubtopicCopy;
  fr: SubtopicCopy;
}

/** Keyed by parent subject slug. */
export const ATPL_SUBTOPICS: Record<string, Subtopic[]> = {
  meteorology: [
    {
      slug: "icing",
      en: {
        name: "Icing",
        tagline: "Airframe and engine icing — how it forms, why it's dangerous, and how it's tested.",
        overview:
          "Icing is one of the most exam-tested weather hazards: ice accreting on the airframe, engine and instruments degrades performance and control. Understanding the temperature and moisture conditions that produce each type of ice is the key to the questions.",
        topics: [
          "Conditions required for ice formation",
          "Types: rime, clear (glaze) and mixed ice",
          "Airframe, engine and instrument (pitot) icing",
          "Effect of icing on performance and handling",
        ],
        challenge:
          "Link the ice type to the cause: clear ice forms in large supercooled droplets, rime in small ones — questions almost always hinge on that distinction.",
        faq: [
          {
            q: "What conditions are needed for airframe icing?",
            a: "Visible moisture (cloud, rain) and an airframe temperature at or below 0°C. The severity depends on droplet size and liquid water content.",
          },
          {
            q: "What's the difference between rime and clear ice?",
            a: "Rime ice forms from small supercooled droplets that freeze on impact (rough, opaque); clear ice forms from large droplets that spread before freezing (smooth, heavy, harder to remove).",
          },
        ],
      },
      fr: {
        name: "Givrage",
        tagline: "Givrage cellule et moteur — formation, dangers, et comment c'est testé.",
        overview:
          "Le givrage est l'un des dangers météo les plus examinés : la glace qui s'accumule sur la cellule, le moteur et les instruments dégrade les performances et le contrôle. Comprendre les conditions de température et d'humidité qui produisent chaque type de glace est la clé des questions.",
        topics: [
          "Conditions nécessaires à la formation de glace",
          "Types : givre blanc, givre clair (transparent) et mixte",
          "Givrage cellule, moteur et instruments (pitot)",
          "Effet du givrage sur les performances et le pilotage",
        ],
        challenge:
          "Reliez le type de glace à sa cause : le givre clair se forme dans de grosses gouttelettes surfondues, le givre blanc dans de petites — les questions reposent presque toujours là-dessus.",
        faq: [
          {
            q: "Quelles conditions pour le givrage cellule ?",
            a: "De l'humidité visible (nuage, pluie) et une température de cellule inférieure ou égale à 0°C. La sévérité dépend de la taille des gouttelettes et de la teneur en eau liquide.",
          },
          {
            q: "Quelle différence entre givre blanc et givre clair ?",
            a: "Le givre blanc vient de petites gouttelettes surfondues qui gèlent à l'impact (rugueux, opaque) ; le givre clair vient de grosses gouttelettes qui s'étalent avant de geler (lisse, lourd, plus dur à éliminer).",
          },
        ],
      },
    },
    {
      slug: "thunderstorms",
      en: {
        name: "Thunderstorms",
        tagline: "Cumulonimbus, the storm life cycle, and the hazards that make storms a no-go.",
        overview:
          "Thunderstorms concentrate almost every flight hazard in one place: severe turbulence, hail, icing, lightning, wind shear and downbursts. The exam focuses on the conditions that create them and the three stages of their life cycle.",
        topics: [
          "Conditions for thunderstorm formation (instability, moisture, lift)",
          "Life cycle: cumulus, mature and dissipating stages",
          "Associated hazards: hail, turbulence, wind shear, downbursts",
          "Air-mass vs frontal and squall-line storms",
        ],
        challenge:
          "Know which hazards belong to the mature stage — that's where the updraughts, downdraughts and the worst turbulence coexist, and it's the stage examiners ask about most.",
        faq: [
          {
            q: "What three conditions are needed for a thunderstorm?",
            a: "Unstable air, sufficient moisture, and a lifting mechanism (heating, fronts or orography) to start the air rising.",
          },
          {
            q: "Which stage is most dangerous?",
            a: "The mature stage, when strong updraughts and downdraughts coexist, producing the worst turbulence, hail and wind shear.",
          },
        ],
      },
      fr: {
        name: "Orages",
        tagline: "Cumulonimbus, cycle de vie de l'orage, et les dangers qui le rendent infranchissable.",
        overview:
          "L'orage concentre presque tous les dangers du vol au même endroit : turbulence sévère, grêle, givrage, foudre, cisaillement et rabattants. L'examen porte sur les conditions de formation et les trois stades du cycle de vie.",
        topics: [
          "Conditions de formation (instabilité, humidité, soulèvement)",
          "Cycle de vie : stades cumulus, mature et dissipation",
          "Dangers associés : grêle, turbulence, cisaillement, rabattants",
          "Orages de masse d'air vs frontaux et lignes de grains",
        ],
        challenge:
          "Sachez quels dangers relèvent du stade mature — c'est là que coexistent ascendances, descendances et la pire turbulence, et c'est le stade le plus demandé.",
        faq: [
          {
            q: "Quelles trois conditions pour un orage ?",
            a: "De l'air instable, suffisamment d'humidité, et un mécanisme de soulèvement (réchauffement, fronts ou relief) pour amorcer l'ascendance.",
          },
          {
            q: "Quel stade est le plus dangereux ?",
            a: "Le stade mature, quand ascendances et descendances coexistent, produisant la pire turbulence, la grêle et le cisaillement.",
          },
        ],
      },
    },
    {
      slug: "metar-taf",
      en: {
        name: "METAR & TAF",
        tagline: "Decoding routine reports and forecasts — fast, accurate reading under exam pressure.",
        overview:
          "METARs (observations) and TAFs (forecasts) are the coded weather messages every pilot reads before and during flight. The exam tests whether you can decode them quickly and correctly, including the trend and change groups.",
        topics: [
          "METAR structure: wind, visibility, weather, cloud, temp/dew point, QNH",
          "TAF structure and validity periods",
          "Change groups: BECMG, TEMPO, PROB, FM",
          "Present-weather abbreviations and intensity",
        ],
        challenge:
          "Decode real reports repeatedly until the format is automatic — speed matters, and the change groups (TEMPO/BECMG/PROB) are where most marks are lost.",
        faq: [
          {
            q: "What's the difference between a METAR and a TAF?",
            a: "A METAR is an observation of actual current weather at an aerodrome; a TAF is a forecast for a defined validity period.",
          },
          {
            q: "What does TEMPO mean in a TAF?",
            a: "Temporary fluctuations expected to last less than an hour each and, in total, less than half the indicated period.",
          },
        ],
      },
      fr: {
        name: "METAR & TAF",
        tagline: "Décoder messages d'observation et prévisions — vite et juste, sous contrainte d'examen.",
        overview:
          "Les METAR (observations) et TAF (prévisions) sont les messages météo codés que tout pilote lit avant et pendant le vol. L'examen teste votre capacité à les décoder vite et correctement, y compris les groupes de tendance et d'évolution.",
        topics: [
          "Structure METAR : vent, visibilité, temps, nuages, temp/point de rosée, QNH",
          "Structure TAF et périodes de validité",
          "Groupes d'évolution : BECMG, TEMPO, PROB, FM",
          "Abréviations de temps présent et intensité",
        ],
        challenge:
          "Décodez des messages réels jusqu'à l'automatisme — la vitesse compte, et les groupes d'évolution (TEMPO/BECMG/PROB) sont là où l'on perd le plus de points.",
        faq: [
          {
            q: "Quelle différence entre METAR et TAF ?",
            a: "Un METAR est une observation du temps réel à un aérodrome ; un TAF est une prévision pour une période de validité définie.",
          },
          {
            q: "Que signifie TEMPO dans un TAF ?",
            a: "Des fluctuations temporaires censées durer moins d'une heure chacune et, au total, moins de la moitié de la période indiquée.",
          },
        ],
      },
    },
    {
      slug: "wind-and-pressure",
      en: {
        name: "Wind & Pressure",
        tagline: "Pressure systems, the geostrophic wind, and the local winds that matter at low level.",
        overview:
          "Wind is driven by pressure differences. This topic covers how pressure systems generate wind, the balance behind the geostrophic and gradient wind, and the local effects (sea breezes, mountain winds, friction) that change wind near the surface.",
        topics: [
          "Pressure gradient force and the Coriolis effect",
          "Geostrophic and gradient wind",
          "Surface friction and wind backing/veering",
          "Local winds: sea/land breeze, katabatic, föhn",
        ],
        challenge:
          "Get the hemisphere conventions right: wind backs and veers in opposite senses in the two hemispheres, and exam questions deliberately test this.",
        faq: [
          {
            q: "What is the geostrophic wind?",
            a: "A theoretical wind blowing parallel to straight isobars, where the pressure gradient force is balanced by the Coriolis effect — a good approximation above the friction layer.",
          },
          {
            q: "Why does surface wind differ from the wind aloft?",
            a: "Friction slows the surface wind and changes its direction (backing in the Northern Hemisphere), so it crosses the isobars towards low pressure.",
          },
        ],
      },
      fr: {
        name: "Vent & pression",
        tagline: "Systèmes de pression, vent géostrophique, et les vents locaux qui comptent à basse altitude.",
        overview:
          "Le vent est généré par les différences de pression. Ce thème couvre comment les systèmes de pression créent le vent, l'équilibre derrière le vent géostrophique et du gradient, et les effets locaux (brises, vents de montagne, friction) qui modifient le vent près du sol.",
        topics: [
          "Force du gradient de pression et effet de Coriolis",
          "Vent géostrophique et vent du gradient",
          "Friction de surface et bascule du vent",
          "Vents locaux : brise de mer/terre, catabatique, föhn",
        ],
        challenge:
          "Maîtrisez les conventions d'hémisphère : le vent bascule en sens opposés selon l'hémisphère, et les questions testent ça délibérément.",
        faq: [
          {
            q: "Qu'est-ce que le vent géostrophique ?",
            a: "Un vent théorique parallèle à des isobares rectilignes, où la force du gradient de pression équilibre l'effet de Coriolis — bonne approximation au-dessus de la couche de friction.",
          },
          {
            q: "Pourquoi le vent de surface diffère-t-il du vent en altitude ?",
            a: "La friction ralentit le vent de surface et change sa direction (bascule dans l'hémisphère nord), si bien qu'il traverse les isobares vers les basses pressions.",
          },
        ],
      },
    },
  ],

  "general-navigation": [
    {
      slug: "triangle-of-velocities",
      en: {
        name: "Triangle of Velocities",
        tagline: "Heading, track, wind and groundspeed — the vector core of dead reckoning.",
        overview:
          "The triangle of velocities relates the aircraft's heading and true airspeed, the wind, and the resulting track and groundspeed. It underpins a large share of General Navigation questions and the whole of practical dead reckoning.",
        topics: [
          "Air vector, wind vector and ground vector",
          "Heading vs track; drift angle",
          "Wind correction angle and groundspeed",
          "Solving the triangle with the navigation computer",
        ],
        challenge:
          "Be ruthless about heading vs track and the sign of drift — most errors here are not maths errors but mixing up the two vectors.",
        faq: [
          {
            q: "What does the triangle of velocities solve?",
            a: "Given any four of heading, true airspeed, wind, track and groundspeed, it lets you find the others — essential for planning and in-flight navigation.",
          },
          {
            q: "What is drift?",
            a: "The angle between heading (where the nose points) and track (the path over the ground), caused by the wind.",
          },
        ],
      },
      fr: {
        name: "Triangle des vitesses",
        tagline: "Cap, route, vent et vitesse sol — le cœur vectoriel de la navigation à l'estime.",
        overview:
          "Le triangle des vitesses relie le cap et la vitesse vraie de l'avion, le vent, et la route et la vitesse sol résultantes. Il sous-tend une grande part des questions de Navigation générale et toute l'estime pratique.",
        topics: [
          "Vecteur air, vecteur vent et vecteur sol",
          "Cap vs route ; angle de dérive",
          "Angle de correction de dérive et vitesse sol",
          "Résolution du triangle au computer de navigation",
        ],
        challenge:
          "Soyez intraitable sur cap vs route et le signe de la dérive — la plupart des erreurs ne sont pas de calcul mais une confusion entre les deux vecteurs.",
        faq: [
          {
            q: "Que résout le triangle des vitesses ?",
            a: "Connaissant quatre éléments parmi cap, vitesse vraie, vent, route et vitesse sol, il permet de trouver les autres — essentiel en préparation et en vol.",
          },
          {
            q: "Qu'est-ce que la dérive ?",
            a: "L'angle entre le cap (où pointe le nez) et la route (la trajectoire sol), causé par le vent.",
          },
        ],
      },
    },
    {
      slug: "chart-projections",
      en: {
        name: "Chart Projections",
        tagline: "Lambert, Mercator and polar charts — properties, scale and how lines plot.",
        overview:
          "Map projections trade off which properties they preserve. Navigation relies mainly on the Lambert conformal and Mercator charts, and the exam tests their properties: how great circles and rhumb lines appear, and how scale and convergence behave.",
        topics: [
          "Conformality and the idea of a projection",
          "Mercator: rhumb lines straight, scale expands with latitude",
          "Lambert conformal: great circles ~straight, used mid-latitudes",
          "Convergence and scale variation",
        ],
        challenge:
          "Memorise, per chart, how a great circle and a rhumb line each plot — that single fact answers a surprising number of questions.",
        faq: [
          {
            q: "How does a great circle appear on a Mercator chart?",
            a: "As a curve concave to the equator (convex to the nearer pole); the rhumb line, by contrast, is a straight line.",
          },
          {
            q: "Why is the Lambert chart used for navigation?",
            a: "Because at mid-latitudes a great circle plots almost as a straight line and scale is nearly constant, making it convenient for route plotting.",
          },
        ],
      },
      fr: {
        name: "Projections cartographiques",
        tagline: "Cartes Lambert, Mercator et polaires — propriétés, échelle et tracé des lignes.",
        overview:
          "Les projections font des compromis sur les propriétés conservées. La navigation s'appuie surtout sur les cartes conforme de Lambert et Mercator, et l'examen teste leurs propriétés : comment apparaissent orthodromie et loxodromie, et le comportement de l'échelle et de la convergence.",
        topics: [
          "Conformité et notion de projection",
          "Mercator : loxodromies droites, échelle augmente avec la latitude",
          "Conforme de Lambert : orthodromies ~droites, moyennes latitudes",
          "Convergence et variation d'échelle",
        ],
        challenge:
          "Mémorisez, par carte, comment se tracent une orthodromie et une loxodromie — ce seul fait répond à un nombre surprenant de questions.",
        faq: [
          {
            q: "Comment apparaît une orthodromie sur une carte de Mercator ?",
            a: "Comme une courbe concave vers l'équateur (convexe vers le pôle le plus proche) ; la loxodromie, elle, est une ligne droite.",
          },
          {
            q: "Pourquoi la carte de Lambert est-elle utilisée en navigation ?",
            a: "Parce qu'aux moyennes latitudes une orthodromie s'y trace presque en ligne droite et l'échelle est quasi constante, ce qui facilite le tracé de route.",
          },
        ],
      },
    },
    {
      slug: "magnetism-and-compass",
      en: {
        name: "Magnetism & Compass",
        tagline: "Variation, deviation and compass errors — turning, acceleration and dip.",
        overview:
          "The magnetic compass is simple but full of errors the exam loves. This topic covers variation and deviation, and the dynamic errors — turning and acceleration — that arise from magnetic dip near the poles.",
        topics: [
          "Variation and deviation; true/magnetic/compass heading",
          "Magnetic dip and its consequences",
          "Turning errors (UNOS) and acceleration errors (ANDS)",
          "Direct-reading compass limitations",
        ],
        challenge:
          "Learn the turning and acceleration error rules cold — they are pure recall, and they appear in nearly every General Navigation paper.",
        faq: [
          {
            q: "What is the difference between variation and deviation?",
            a: "Variation is the angle between true and magnetic north (a property of location); deviation is the compass error caused by the aircraft's own magnetism.",
          },
          {
            q: "What causes compass turning errors?",
            a: "Magnetic dip: the vertical component of the Earth's field tilts the compass card during turns, most noticeably through north and south.",
          },
        ],
      },
      fr: {
        name: "Magnétisme & compas",
        tagline: "Déclinaison, déviation et erreurs du compas — virage, accélération et inclinaison.",
        overview:
          "Le compas magnétique est simple mais plein d'erreurs que l'examen adore. Ce thème couvre déclinaison et déviation, et les erreurs dynamiques — virage et accélération — dues à l'inclinaison magnétique près des pôles.",
        topics: [
          "Déclinaison et déviation ; cap vrai/magnétique/compas",
          "Inclinaison magnétique et ses conséquences",
          "Erreurs de virage et erreurs d'accélération",
          "Limites du compas à lecture directe",
        ],
        challenge:
          "Apprenez par cœur les règles d'erreur de virage et d'accélération — c'est de la pure restitution, présente dans presque chaque épreuve.",
        faq: [
          {
            q: "Quelle différence entre déclinaison et déviation ?",
            a: "La déclinaison est l'angle entre nord vrai et nord magnétique (propriété du lieu) ; la déviation est l'erreur du compas due au magnétisme propre de l'avion.",
          },
          {
            q: "Qu'est-ce qui cause les erreurs de virage du compas ?",
            a: "L'inclinaison magnétique : la composante verticale du champ terrestre incline la rose pendant les virages, surtout au passage du nord et du sud.",
          },
        ],
      },
    },
    {
      slug: "navigation-computer",
      en: {
        name: "The Navigation Computer",
        tagline: "The flight computer (whiz wheel) — speed, distance, fuel and wind, fast.",
        overview:
          "The mechanical navigation computer solves the everyday navigation maths: speed-distance-time, fuel, conversions, true airspeed and the wind triangle. Fluency with it removes most of the time pressure in General Navigation and Flight Planning.",
        topics: [
          "Speed, distance and time on the circular slide rule",
          "Fuel and consumption calculations",
          "Conversions (units, temperature, altitude)",
          "True airspeed and the wind side",
        ],
        challenge:
          "Practise until the computer is automatic — in the exam, slow computer work is the most common reason candidates run out of time.",
        faq: [
          {
            q: "What is the navigation computer used for?",
            a: "Speed-distance-time, fuel, unit conversions, true airspeed and wind-triangle solutions — the routine maths of navigation.",
          },
          {
            q: "Do I still need it with modern avionics?",
            a: "For the EASA theory exams, yes — fluency with the manual computer is assumed and directly tested.",
          },
        ],
      },
      fr: {
        name: "Le computer de navigation",
        tagline: "Le computer de vol — vitesse, distance, carburant et vent, rapidement.",
        overview:
          "Le computer de navigation mécanique résout les calculs quotidiens : vitesse-distance-temps, carburant, conversions, vitesse vraie et triangle des vents. L'aisance avec lui supprime l'essentiel de la pression de temps en Nav générale et en Préparation du vol.",
        topics: [
          "Vitesse, distance et temps sur la règle circulaire",
          "Calculs de carburant et de consommation",
          "Conversions (unités, température, altitude)",
          "Vitesse vraie et face vent",
        ],
        challenge:
          "Entraînez-vous jusqu'à l'automatisme — à l'examen, un computer lent est la cause la plus fréquente de manque de temps.",
        faq: [
          {
            q: "À quoi sert le computer de navigation ?",
            a: "Vitesse-distance-temps, carburant, conversions d'unités, vitesse vraie et résolution du triangle des vents — les calculs courants de la navigation.",
          },
          {
            q: "En ai-je besoin avec l'avionique moderne ?",
            a: "Pour les examens théoriques EASA, oui — la maîtrise du computer manuel est supposée et directement testée.",
          },
        ],
      },
    },
  ],

  "airframe-systems": [
    {
      slug: "electrical-systems",
      en: {
        name: "Electrical Systems",
        tagline: "AC and DC generation, distribution and protection — power for the whole aircraft.",
        overview:
          "The electrical system generates, distributes and protects the power that runs avionics, lighting and many services. The exam tests generation (AC and DC), batteries, busbars and distribution, and the protective devices that isolate faults.",
        topics: [
          "DC and AC generation; the constant-speed drive",
          "Batteries and their characteristics",
          "Busbar systems and load shedding",
          "Circuit protection: fuses, circuit breakers",
        ],
        challenge:
          "Follow the path of the power and what happens when a generator fails — busbar and load-shedding logic is a favourite exam target.",
        faq: [
          {
            q: "Why do large aircraft use AC power?",
            a: "AC can be generated at constant frequency and transformed easily, and it suits high-power loads; DC is derived from it for batteries and specific systems.",
          },
          {
            q: "What is load shedding?",
            a: "Automatically disconnecting non-essential electrical loads when generating capacity is reduced, to protect essential services.",
          },
        ],
      },
      fr: {
        name: "Systèmes électriques",
        tagline: "Génération CA et CC, distribution et protection — l'énergie de tout l'avion.",
        overview:
          "Le système électrique génère, distribue et protège l'énergie qui alimente l'avionique, l'éclairage et de nombreux services. L'examen teste la génération (CA et CC), les batteries, les barres-bus et la distribution, et les dispositifs de protection qui isolent les pannes.",
        topics: [
          "Génération CC et CA ; entraînement à vitesse constante",
          "Batteries et leurs caractéristiques",
          "Systèmes de barres-bus et délestage",
          "Protection des circuits : fusibles, disjoncteurs",
        ],
        challenge:
          "Suivez le chemin de l'énergie et ce qui se passe quand un générateur tombe — la logique barres-bus et délestage est une cible d'examen favorite.",
        faq: [
          {
            q: "Pourquoi les gros avions utilisent-ils le courant alternatif ?",
            a: "Le CA se génère à fréquence constante et se transforme facilement, et il convient aux fortes puissances ; le CC en est dérivé pour les batteries et certains systèmes.",
          },
          {
            q: "Qu'est-ce que le délestage ?",
            a: "La déconnexion automatique des charges électriques non essentielles quand la capacité de génération baisse, pour protéger les services essentiels.",
          },
        ],
      },
    },
    {
      slug: "hydraulics-and-landing-gear",
      en: {
        name: "Hydraulics & Landing Gear",
        tagline: "Hydraulic power and the landing gear it drives — pressure, actuation and redundancy.",
        overview:
          "Hydraulic systems transmit large forces to operate flight controls, landing gear, brakes and more. This topic covers the components of a hydraulic system and how the landing gear, steering and braking are actuated and protected.",
        topics: [
          "Hydraulic fluid, pumps, accumulators and actuators",
          "System architecture and redundancy",
          "Landing gear retraction, extension and warnings",
          "Brakes, anti-skid and nosewheel steering",
        ],
        challenge:
          "Understand redundancy: questions frequently ask what still works after the loss of one hydraulic system, so learn the architecture, not just the parts.",
        faq: [
          {
            q: "What does a hydraulic accumulator do?",
            a: "It stores pressurised fluid to smooth pump pulsations, provide peak demand and give an emergency reserve (e.g. for braking).",
          },
          {
            q: "Why have multiple hydraulic systems?",
            a: "For redundancy: critical services are powered from more than one system so a single failure doesn't disable flight controls, gear or brakes.",
          },
        ],
      },
      fr: {
        name: "Hydraulique & train",
        tagline: "Puissance hydraulique et le train qu'elle actionne — pression, actionnement et redondance.",
        overview:
          "Les systèmes hydrauliques transmettent de grandes forces pour actionner commandes de vol, train, freins et plus. Ce thème couvre les composants d'un circuit hydraulique et la manière dont le train, l'orientation et le freinage sont actionnés et protégés.",
        topics: [
          "Fluide hydraulique, pompes, accumulateurs et vérins",
          "Architecture du système et redondance",
          "Rentrée/sortie du train et alarmes",
          "Freins, anti-skid et orientation de la roulette de nez",
        ],
        challenge:
          "Comprenez la redondance : les questions demandent souvent ce qui fonctionne encore après la perte d'un circuit hydraulique — apprenez l'architecture, pas seulement les pièces.",
        faq: [
          {
            q: "À quoi sert un accumulateur hydraulique ?",
            a: "Il stocke du fluide sous pression pour lisser les pulsations de pompe, fournir les pics de demande et constituer une réserve de secours (ex. freinage).",
          },
          {
            q: "Pourquoi plusieurs circuits hydrauliques ?",
            a: "Pour la redondance : les services critiques sont alimentés par plus d'un circuit, afin qu'une panne unique ne prive pas des commandes, du train ou des freins.",
          },
        ],
      },
    },
    {
      slug: "pressurisation",
      en: {
        name: "Pressurisation & Air Conditioning",
        tagline: "Cabin pressure, bleed air and the protections that keep occupants safe.",
        overview:
          "Pressurisation keeps the cabin at a comfortable, safe altitude while the aircraft cruises high. This topic covers how cabin pressure is controlled with bleed air and outflow valves, and the protective devices against over- and under-pressure.",
        topics: [
          "Cabin altitude, differential pressure and the schedule",
          "Bleed air, packs and outflow valves",
          "Safety/relief valves and protections",
          "Effects of decompression",
        ],
        challenge:
          "Keep differential pressure and cabin altitude distinct in your mind — many questions test the relationship between the two as the aircraft climbs.",
        faq: [
          {
            q: "What controls cabin pressure?",
            a: "The outflow valve regulates how much conditioned (bleed) air escapes, setting the cabin pressure according to the pressurisation schedule.",
          },
          {
            q: "What is differential pressure?",
            a: "The difference between cabin pressure and the lower outside pressure; the structure is certified to a maximum value.",
          },
        ],
      },
      fr: {
        name: "Pressurisation & conditionnement d'air",
        tagline: "Pression cabine, air prélevé et les protections qui gardent les occupants en sécurité.",
        overview:
          "La pressurisation maintient la cabine à une altitude confortable et sûre pendant que l'avion croise haut. Ce thème couvre le contrôle de la pression cabine par l'air prélevé et les vannes d'évacuation, et les protections contre sur- et sous-pression.",
        topics: [
          "Altitude cabine, pression différentielle et loi de pressurisation",
          "Air prélevé, packs et vannes d'évacuation (outflow)",
          "Soupapes de sécurité/décharge et protections",
          "Effets de la décompression",
        ],
        challenge:
          "Gardez bien distincts pression différentielle et altitude cabine — beaucoup de questions testent leur relation pendant la montée.",
        faq: [
          {
            q: "Qu'est-ce qui contrôle la pression cabine ?",
            a: "La vanne d'évacuation (outflow) régule la quantité d'air conditionné (prélevé) qui s'échappe, fixant la pression cabine selon la loi de pressurisation.",
          },
          {
            q: "Qu'est-ce que la pression différentielle ?",
            a: "La différence entre la pression cabine et la pression extérieure plus basse ; la structure est certifiée à une valeur maximale.",
          },
        ],
      },
    },
    {
      slug: "gas-turbine-engines",
      en: {
        name: "Gas Turbine Engines",
        tagline: "The jet engine cycle, sections and parameters — from intake to exhaust.",
        overview:
          "The gas turbine is the powerplant of transport aircraft. This topic covers the working cycle, the main engine sections, the thrust-affecting factors, and the parameters the crew monitor in normal and abnormal operation.",
        topics: [
          "The Brayton cycle: intake, compression, combustion, exhaust",
          "Compressor, combustion chamber and turbine",
          "Thrust and factors affecting it",
          "Engine parameters and limitations (EGT, N1/N2)",
        ],
        challenge:
          "Understand why each parameter matters (e.g. EGT as a health/limit indicator) rather than memorising values — applied questions reward understanding.",
        faq: [
          {
            q: "What are the four phases of the jet engine cycle?",
            a: "Intake, compression, combustion and exhaust — the continuous Brayton cycle that produces thrust.",
          },
          {
            q: "Why is EGT monitored?",
            a: "Exhaust gas temperature reflects engine condition and has limits; exceeding it risks turbine damage, so it is a key monitored parameter.",
          },
        ],
      },
      fr: {
        name: "Turbines à gaz",
        tagline: "Cycle du réacteur, sections et paramètres — de l'entrée d'air à l'échappement.",
        overview:
          "La turbine à gaz est la motorisation des avions de transport. Ce thème couvre le cycle de fonctionnement, les principales sections, les facteurs influant sur la poussée, et les paramètres surveillés par l'équipage en exploitation normale et anormale.",
        topics: [
          "Cycle de Brayton : admission, compression, combustion, échappement",
          "Compresseur, chambre de combustion et turbine",
          "Poussée et facteurs l'influençant",
          "Paramètres et limites moteur (EGT, N1/N2)",
        ],
        challenge:
          "Comprenez pourquoi chaque paramètre compte (ex. l'EGT comme indicateur de santé/limite) plutôt que de mémoriser des valeurs — les questions appliquées récompensent la compréhension.",
        faq: [
          {
            q: "Quelles sont les quatre phases du cycle d'un réacteur ?",
            a: "Admission, compression, combustion et échappement — le cycle continu de Brayton qui produit la poussée.",
          },
          {
            q: "Pourquoi surveille-t-on l'EGT ?",
            a: "La température des gaz d'échappement reflète l'état du moteur et a des limites ; les dépasser risque d'endommager la turbine, d'où sa surveillance.",
          },
        ],
      },
    },
  ],
};

export function getSubtopics(subjectSlug: string): Subtopic[] {
  return ATPL_SUBTOPICS[subjectSlug] ?? [];
}

export function getSubtopic(
  subjectSlug: string,
  topicSlug: string,
): Subtopic | undefined {
  return getSubtopics(subjectSlug).find((s) => s.slug === topicSlug);
}

/** All (subject, topic) pairs — used by generateStaticParams and the sitemap. */
export function allSubtopicPairs(): { subject: string; topic: string }[] {
  return Object.entries(ATPL_SUBTOPICS).flatMap(([subject, topics]) =>
    topics.map((t) => ({ subject, topic: t.slug })),
  );
}

export type { Locale };
