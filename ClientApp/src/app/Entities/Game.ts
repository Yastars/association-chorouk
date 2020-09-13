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

  isOpen: boolean;
  isRegistered: boolean;
  isTeamAfull: boolean;
  isTeamBfull: boolean;
  
  // Future
  isRegisteredA: boolean;
  isRegisteredB: boolean;

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
  games: Game[];
}
