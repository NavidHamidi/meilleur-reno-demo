export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  project: string;
  initials: string;
  image: string;
}

export const testimonial1: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Excellent service du début à la fin. L'équipe MeilleurReno a su nous guider dans nos choix et les artisans étaient vraiment professionnels. Notre appartement haussmannien a été magnifiquement rénové.",
    author: "Justine S.",
    project: "Rénovation complète - Paris 16e",
    initials: "JS",
    image: "/living-room.jpg",
  },
  {
    id: "t2",
    quote:
      "Je recommande vivement ! Le suivi était impeccable et les devis très transparents. Trouver rapidement un professionnel adapté au besoin est alors très simple et sécurisé grâce à leur accompagnement.",
    author: "Marc C.",
    project: "Isolation thermique - Paris 7e",
    initials: "MC",
    image: "/living-room.jpg",
  },
  {
    id: "t3",
    quote:
      "Service satisfaisant ! Notre rénovation a été menée avec professionnalisme et rigueur.",
    author: "Jean D..",
    project: "Isolation thermique - Paris 7e",
    initials: "JD",
    image: "/living-room.jpg",
  },
];

export const testimonial2: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Grâce à MeilleurReno, j'ai isolé mes combles et mes murs pour seulement 3 200 € après aides. Ma facture de gaz a baissé de 900 € dès la première année. Le dossier MaPrimeRénov' a été entièrement géré par leur équipe.",
    author: "Justine S.",
    project: "Isolation combles + murs – Paris 16e",
    initials: "JS",
    image: "/living-room.jpg",
  },
  {
    id: "t2",
    quote:
      "Je ne savais pas par où commencer. Leur simulateur m'a montré que j'avais droit à 65 % d'aides. Les artisans étaient sérieux et le chantier s'est déroulé en 4 jours. Je recommande vivement.",
    author: "Marc C.",
    project: "Isolation toiture – Paris 7e",
    initials: "MC",
    image: "/living-room.jpg",
  },
  {
    id: "t3",
    quote:
      "Appartement passé de l'étiquette E à C. En plus des économies d'énergie, la valeur de mon bien a augmenté. Un vrai investissement rentable.",
    author: "Jean D.",
    project: "Rénovation énergétique globale – Paris 15e",
    initials: "JD",
    image: "/living-room.jpg",
  },
];
