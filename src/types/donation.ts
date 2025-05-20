export interface Donationinfo {
  name: string;
  team: string;
  money: number;
  time: string;
  remark?: string;
}

export interface Donationres {
  status: string;
  token: string;
}
