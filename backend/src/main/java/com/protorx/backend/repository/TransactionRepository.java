package com.protorx.backend.repository;

import com.protorx.backend.entity.Transaction;
import jakarta.annotation.Nonnull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccountId(Long accountId);

    @Override
    @Nonnull
    @EntityGraph(attributePaths = {"account", "category"})
    List<Transaction> findAll();
}