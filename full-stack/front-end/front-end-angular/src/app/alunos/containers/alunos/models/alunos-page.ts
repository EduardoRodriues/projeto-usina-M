import { Alunos } from './alunos';

export interface AlunosPage {
  alunos: Alunos[];
  totalElements: number;
  totalPages: number;
}
