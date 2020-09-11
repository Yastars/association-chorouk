export class Game {
  id: number;
  title: string;
  preview: string;
  content: string;
  address: string;
  date: string;
  max_players: number;
  is_private: boolean;
  createdAt: string;
  arbitrator: number;
  publishedBy: number;
  team_a: number;
  team_b: number;

  status: string;
  is_registered: boolean;
  team_a_status: string;
  team_b_status: string;

  // Helpful DTO fields
  publishedByUsername: string;
  arbitratorByUsername: string;
  team_aByName: string;
  team_bByName: string;
}

export interface GamePage {
  count: number;
  next: string;
  previous: string;
  results: Game[];
}
