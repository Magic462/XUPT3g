export interface Members {
  uid: number;
  username: string;
  name: string;
  team: string;
  mienImg: string;
  signature: string;
  company: string;
  year: number;
  graduateImg: string;
  isGraduate: number;
  gender: number;
  portrait: string;
  tel: string;
  classGrade?: string;
}

export interface MembersResponse {
  data: Members[];
  total?: number;
}
