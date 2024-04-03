export interface searchmovies {
  id: string;
  titre: string;
  type: 'film' | 'serie' | 'episode';
  anneedesortie: number;
  fiche: 'complete' | 'courte';
}
