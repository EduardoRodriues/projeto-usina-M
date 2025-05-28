package br.com.carlosrodrigues.web.mappers.usuario.alunos;

import br.com.carlosrodrigues.core.models.empresa.alunos.Alunos;
import br.com.carlosrodrigues.web.dtos.usuario.alunos.AlunosDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IAlunosMapper {

    Alunos toModel(AlunosDTO alunosDTO);

    AlunosDTO toDTO(Alunos alunos);
}
