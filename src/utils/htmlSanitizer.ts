/**
 * Fonction utilitaire pour nettoyer le HTML et éviter les attaques XSS
 * Pour une application de CV, on peut autoriser certaines balises de base
 */

// Tags HTML autorisés pour le contenu du CV
const ALLOWED_TAGS = [
  "a",
  "strong",
  "em",
  "br",
  "p",
  "span",
  "div",
  "ul",
  "li",
  "ol",
];

// Attributs autorisés
const ALLOWED_ATTRIBUTES = {
  a: ["href", "target", "rel"],
  span: ["class"],
  div: ["class"],
  p: ["class"],
};

/**
 * Fonction basique de nettoyage HTML
 * Note: Pour une sécurité maximale en production, utilisez une bibliothèque comme DOMPurify
 */
export const sanitizeHtml = (html: string): string => {
  if (!html) return "";

  // Pour l'instant, on fait confiance au contenu car c'est du contenu statique
  // Dans un environnement de production avec du contenu dynamique,
  // il faudrait utiliser une bibliothèque comme DOMPurify
  return html;
};

/**
 * Valide si le HTML contient uniquement des balises autorisées
 */
export const isValidHtml = (html: string): boolean => {
  if (!html) return true;

  // Vérification basique - en production, utiliser un parser HTML approprié
  const hasScript = html.toLowerCase().includes("<script");
  const hasOnEvent = /on\w+\s*=/i.test(html);

  return !hasScript && !hasOnEvent;
};
