package br.com.carlosrodrigues.web.mappers;

import br.com.carlosrodrigues.core.models.Alunos;
import br.com.carlosrodrigues.web.dtos.AlunosDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IAlunosMapper {

    Alunos toModel(AlunosDTO alunosDTO);

    AlunosDTO toDTO(Alunos alunos);
}
