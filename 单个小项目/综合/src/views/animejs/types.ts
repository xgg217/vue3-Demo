import anime from "animejs";

export type TAnimeInstance = {
  [key: string]: anime.AnimeInstance | null;
};
