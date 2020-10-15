package io.github.fernandoschimiidt.clientes.model.repository;

import io.github.fernandoschimiidt.clientes.model.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente,Integer> {
}
