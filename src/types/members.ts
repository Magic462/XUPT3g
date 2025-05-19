export interface Members {
  username: string;
  name: string;
  team: string;
  mienImg: string;
  signature: string;
  company: string;
}

export interface MembersResponse {
  data: Members[];
}