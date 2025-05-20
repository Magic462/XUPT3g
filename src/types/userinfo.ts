export interface Userinfo {
  portrait: string;
  gender: number;
  classGrade: string;
  year: number;
  tel: string;
  isGraduate: boolean;
  username: string;
  name: string;
  team: string;
  mienImg: string;
  signature: string;
  company: string;
}

export interface Userchangeinfo {
  username: string;
  gender?: number;
  classGrade?: string;
  tel?: string;
  name?: string;
  team?: string;
  signature?: string;
  company?: string;
  mienImg?: string;
  portrait?: string;
}

export interface Response {
  status: string;
  token: string;
}
