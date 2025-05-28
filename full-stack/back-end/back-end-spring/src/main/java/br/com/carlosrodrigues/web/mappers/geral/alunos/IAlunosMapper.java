package br.com.carlosrodrigues.web.mappers.geral.alunos;

import br.com.carlosrodrigues.core.models.geral.alunos.Alunos;
import br.com.carlosrodrigues.web.dtos.geral.alunos.AlunosDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IAlunosMapper {

    Alunos toModel(AlunosDTO alunosDTO);

    AlunosDTO toDTO(Alunos alunos);
}
