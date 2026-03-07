CREATE TABLE accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    balance DECIMAL(19, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    monthly_limit DECIMAL(19, 2)
);

CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    name VARCHAR(255) NOT NULL,
    account_id INTEGER NOT NULL,
    category_id INTEGER,
    amount DECIMAL(19, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    exchange_rate DECIMAL(10, 4),
    status VARCHAR(50) NOT NULL,
    details VARCHAR(1000),
    FOREIGN KEY (account_id) REFERENCES accounts(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);