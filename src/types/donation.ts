export interface Donationinfo {
  id?: number;
  name: string;
  team: string;
  money: number;
  time: string;
  remark?: string;
}

export interface DonationinGetRes {
  donations: Donationinfo[];
  totalCount: number;
}

export interface DonationOperationRes {
  status: string;
  token: string;
}
