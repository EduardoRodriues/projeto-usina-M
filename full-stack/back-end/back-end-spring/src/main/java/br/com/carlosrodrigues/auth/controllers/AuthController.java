package br.com.carlosrodrigues.auth.controllers;

import br.com.carlosrodrigues.auth.dtos.LoginRequestDTO;
import br.com.carlosrodrigues.auth.dtos.RegisterRequestDTO;
import br.com.carlosrodrigues.auth.dtos.ResponseDTO;
import br.com.carlosrodrigues.core.models.usuario.Usuario;
import br.com.carlosrodrigues.core.repositories.usuario.IUsuarioRepository;
import br.com.carlosrodrigues.infra.security.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@Validated
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private  IUsuarioRepository repository;

    @Autowired
    private  PasswordEncoder passwordEncoder;

    @Autowired
    private  TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO body){
        Usuario user = this.repository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(body.senha(), user.getSenha())) {
            String token = this.tokenService.gerarToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getNome(), token));
        }
        return ResponseEntity.badRequest().build();
    }


    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO body) {
        try {
            Optional<Usuario> user = repository.findByEmail(body.email());

            if (user.isEmpty()) {
                Usuario newUser = new Usuario();
                newUser.setSenha(passwordEncoder.encode(body.senha()));
                newUser.setEmail(body.email());
                newUser.setNome(body.nome());
                Usuario savedUser = repository.save(newUser);

                System.out.println("SALVO COM ID: " + savedUser.getId());

                String token = tokenService.gerarToken(newUser);
                return ResponseEntity.ok(new ResponseDTO(newUser.getNome(), token));
            }
            return ResponseEntity.badRequest().body("Usuário já existe.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao registrar usuário: " + e.getMessage());
        }
    }

}