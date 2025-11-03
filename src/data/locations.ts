export const departments: string[] = [
  'Brazzaville',
  'Pointe-Noire',
  'Bouenza',
  'Cuvette',
  'Cuvette-Ouest',
  'Lékoumou',
  'Likouala',
  'Niari',
  'Plateaux',
  'Pool',
  'Sangha',
];

export const citiesByDepartment: { [key: string]: string[] } = {
  'Brazzaville': ['Brazzaville'],
  'Pointe-Noire': ['Pointe-Noire'],
  'Bouenza': ['Madingou', 'Nkayi', 'Loudima'],
  'Cuvette': ['Owando', 'Oyo', 'Makoua'],
  'Cuvette-Ouest': ['Ewo', 'Kelle'],
  'Lékoumou': ['Sibiti', 'Komono'],
  'Likouala': ['Impfondo', 'Dongou', 'Bétou'],
  'Niari': ['Dolisie', 'Mossendjo', 'Louvakou'],
  'Plateaux': ['Djambala', 'Gamboma', 'Lekana'],
  'Pool': ['Kinkala', 'Mindouli', 'Boko'],
  'Sangha': ['Ouesso', 'Sembé', 'Souanké'],
};

export const quartiersByCity: { [key: string]: string[] } = {
  'Brazzaville': ['Poto-Poto', 'Moungali', 'Mfilou', 'Talangaï', 'Makélékélé', 'Bacongo', 'Autre'],
  'Pointe-Noire': ['Loandjili', 'Tié-Tié', 'Mongo-Poukou', 'Mpaka', 'Siafoumou', 'Autre'],
  'Dolisie': ['Tsila', 'Moutamba', 'Tchiniambi', 'Autre'],
  'Owando': ['Ongali', 'Loukoléla', 'Ntséoua', 'Autre'],
  'Sibiti': ['Komono', 'Zanaga', 'Mayéyé', 'Autre'],
  'Ouesso': ['Ngombé', 'Sembé', 'Mokeko', 'Autre'],
};
