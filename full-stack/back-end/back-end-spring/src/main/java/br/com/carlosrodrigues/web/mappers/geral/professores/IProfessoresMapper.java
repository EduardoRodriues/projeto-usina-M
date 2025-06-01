package br.com.carlosrodrigues.web.mappers.geral.professores;

import br.com.carlosrodrigues.core.models.geral.professores.Professores;
import br.com.carlosrodrigues.web.dtos.geral.professores.ProfessoresDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IProfessoresMapper {

    Professores toModel(ProfessoresDTO professoresDTO);

    ProfessoresDTO toDTO(Professores professores);
}
