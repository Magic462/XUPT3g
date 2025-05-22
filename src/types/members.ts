export interface Members {
  username: string;
  name: string;
  team: string;
  mienImg: string;
  signature: string;
  company: string;
  year: string;
  graduateImg: string;
  isGraduate: number;
}

export interface MembersResponse {
  data: Members[];
  total?: number;
}
