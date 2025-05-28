package br.com.carlosrodrigues.auth.services;

import br.com.carlosrodrigues.auth.dtos.LoginRequestDTO;
import br.com.carlosrodrigues.auth.dtos.RegisterRequestDTO;
import br.com.carlosrodrigues.auth.dtos.ResponseDTO;
import br.com.carlosrodrigues.core.models.usuario.Usuario;
import br.com.carlosrodrigues.core.repositories.usuario.IUsuarioRepository;
import br.com.carlosrodrigues.infra.security.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private IUsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenService tokenService;

    public ResponseDTO login(LoginRequestDTO body) {
        Usuario user = repository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(body.senha(), user.getSenha())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        String token = tokenService.gerarToken(user);
        return new ResponseDTO(user.getNome(), token);
    }

    public ResponseDTO register(RegisterRequestDTO body) {
        if (repository.findByEmail(body.email()).isPresent()) {
            throw new RuntimeException("Usuário já existe");
        }

        Usuario newUser = new Usuario();
        newUser.setEmail(body.email());
        newUser.setNome(body.nome());
        newUser.setSenha(passwordEncoder.encode(body.senha()));
        repository.save(newUser);

        String token = tokenService.gerarToken(newUser);
        return new ResponseDTO(newUser.getNome(), token);
    }
}
