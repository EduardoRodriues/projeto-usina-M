package br.com.carlosrodrigues.web.mappers;

import br.com.carlosrodrigues.core.models.Frequencia;
import br.com.carlosrodrigues.web.dtos.FrequenciaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IFrequenciaMapper {

    FrequenciaDTO toDTO(Frequencia frequencia);

    Frequencia toModel(FrequenciaDTO frequenciaDTO);
}
