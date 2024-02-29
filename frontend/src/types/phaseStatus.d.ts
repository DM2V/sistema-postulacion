import { User } from './user';

export type PhaseStatus = {
  id: string;
  user: string;
  status?: string;
  score?: number;
  scoreOpposition?: number;
  totalScore?: number;
  expand?: PhaseStatusExpandend;
};

export type PhaseStatusExpandend = {
  user: User;
}