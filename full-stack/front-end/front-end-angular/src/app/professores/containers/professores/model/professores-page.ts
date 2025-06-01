import { Professores } from "./professores";

export interface ProfessoresPage {
  professores: Professores[];
  totalElements: number;
  totalPages: number;
}
