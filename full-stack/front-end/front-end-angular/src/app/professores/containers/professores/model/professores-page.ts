import { Professores } from "./professores";

export interface ProfessoresPage {
  alunos: Professores[];
  totalElements: number;
  totalPages: number;
}
