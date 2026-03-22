package com.protorx.backend.service;

import com.protorx.backend.entity.Account;
import com.protorx.backend.entity.Transaction;
import com.protorx.backend.repository.AccountRepository;
import com.protorx.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public TransactionService(TransactionRepository transactionRepository, AccountRepository accountRepository) {
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    public List<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    @Transactional
    public Transaction createTransaction(Transaction transaction) {
        // 1. Verificam daca avem un cont asociat in cerere
        if (transaction.getAccount() != null && transaction.getAccount().getId() != null) {
            // Luam ID-ul contului din JSON-ul primit
            Long accountId = transaction.getAccount().getId();

            // 2. IMPORTANT: Incarcam contul COMPLET din baza de date
            Account account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new RuntimeException("Account not found with id: " + accountId));

            // 3. Facem calculul (Acum getBalance() nu mai este null!)
            BigDecimal exchangeRate = transaction.getExchangeRate() != null ? transaction.getExchangeRate() : BigDecimal.ONE;
            BigDecimal expenseInAccountCurrency = transaction.getAmount().multiply(exchangeRate);

            account.setBalance(account.getBalance().subtract(expenseInAccountCurrency));

            // 4. Actualizam referinta in tranzactie cu obiectul complet incarcat
            transaction.setAccount(account);
            accountRepository.save(account);
        }

        // 5. Salvam tranzactia finala
        return transactionRepository.save(transaction);
    }
}
