import { Question } from './question';

export interface Applicant {
  id: number;
  name: string;
  position: string;
  applied: string;
  experience: number;
  availability: {};
  questions: Array<Question>;
  flag?: boolean;
}
