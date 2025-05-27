export interface Article {
  aid: number;
  title: string;
  img: string;
  status: number;
  summary: string;
  time: string;
  view: number;
  content: string;
}

export interface AriticleRequast {
  title: string;
  content: string;
  img: string;
}

export interface AriticleResponse {
  data: unknown;
}
