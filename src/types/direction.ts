export interface Direction {
  tid: number;
  brefInfo: string;
  delay?: number;
  isExist: boolean;
  name: string;
  trainPlan?: string;
}

export interface Directionres {
  status: string;
  token: string;
}
