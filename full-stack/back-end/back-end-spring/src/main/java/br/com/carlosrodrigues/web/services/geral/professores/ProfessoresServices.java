package br.com.carlosrodrigues.web.services.geral.professores;

import br.com.carlosrodrigues.core.exceptions.RecordNotFoundException;
import br.com.carlosrodrigues.core.models.geral.professores.Professores;
import br.com.carlosrodrigues.core.repositories.geral.professores.IProfessoresRepository;
import br.com.carlosrodrigues.web.dtos.geral.professores.ProfessoresDTO;
import br.com.carlosrodrigues.web.dtos.geral.professores.ProfessoresPageDTO;
import br.com.carlosrodrigues.web.mappers.geral.professores.IProfessoresMapper;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessoresServices {

    @Autowired
    private IProfessoresRepository professoresRepository;

    @Autowired
    private IProfessoresMapper professoresMapper;

    public ProfessoresPageDTO listarTodos(@PositiveOrZero int page, @Positive @Max(100) int tamanho, String nome) {
        Pageable pageable = PageRequest.of(page, tamanho);
        Page<Professores> pageProfessores;

        if (nome != null && !nome.isBlank()) {
            pageProfessores = professoresRepository.findByNomeContainingIgnoreCase(nome, pageable);
        } else {
            pageProfessores = professoresRepository.findAll(pageable);
        }

        List<ProfessoresDTO> professores = pageProfessores.stream()
                .map(professoresMapper::toDTO)
                .collect(Collectors.toList());

        return new ProfessoresPageDTO(professores, pageProfessores.getTotalElements(), pageProfessores.getTotalPages());
    }

    public Professores cadastrar(ProfessoresDTO professoresDTO) {
        var model = professoresMapper.toModel(professoresDTO);
        return professoresRepository.save(model);
    }

    public ProfessoresDTO buscarPorId(@NotNull @Positive Long id) {
        return professoresRepository.findById(id).map(professoresMapper::toDTO).
                orElseThrow(() -> new RecordNotFoundException(id));
    }

    public ProfessoresDTO editar(@NotNull @Valid ProfessoresDTO professoresDTO, @Positive @NotNull Long id) {
        return professoresRepository.findById(id).
                map(record -> {
                    Professores professores = professoresMapper.toModel(professoresDTO);
                    record.setNome(professores.getNome());
                    record.setEmail(professores.getEmail());
                    record.setCpf(professores.getCpf());
                    record.setContato(professores.getContato());
                    return professoresMapper.toDTO(professoresRepository.save(record));
                })
                .orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void excluir(@NotNull @Positive Long id) {
        professoresRepository.delete(professoresRepository.findById(id)
                .orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
