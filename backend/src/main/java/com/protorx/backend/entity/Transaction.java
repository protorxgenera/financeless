package com.protorx.backend.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false, length = 3)
    private String currency;

    @Column(name = "exchange_rate", precision = 10, scale = 4)
    private BigDecimal exchangeRate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;

    @Column(length = 1000)
    private String details;

    public Transaction() {}

    public Transaction(LocalDate date, String name, Account account, Category category, BigDecimal amount, String currency, BigDecimal exchangeRate, TransactionStatus status, String details) {
        this.date = date;
        this.name = name;
        this.account = account;
        this.category = category;
        this.amount = amount;
        this.currency = currency;
        this.exchangeRate = exchangeRate;
        this.status = status;
        this.details = details;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public BigDecimal getExchangeRate() { return exchangeRate; }
    public void setExchangeRate(BigDecimal exchangeRate) { this.exchangeRate = exchangeRate; }

    public TransactionStatus getStatus() { return status; }
    public void setStatus(TransactionStatus status) { this.status = status; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}