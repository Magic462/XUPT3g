export interface Members {
  username: string;
  name: string;
  team: string;
  mienImg: string;
  signature: string;
  company: string;
  year: string;
  graduateImg: string;
}

export interface MembersResponse {
  data: Members[];
}
