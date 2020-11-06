package io.github.fernandoschimiidt.clientes.model.repository;

import io.github.fernandoschimiidt.clientes.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Integer> {

}
