package io.github.fernandoschimiidt.clientes.model.repository;

import io.github.fernandoschimiidt.clientes.model.entity.Servico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicoRepository extends JpaRepository<Servico,Integer> {
}
