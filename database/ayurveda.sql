CREATE DATABASE Ayurveda;
USE Ayurveda;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, role)
VALUES (
'admin',
'$2b$10$/EATq2JNzPmPYFChVzqJvuUNkkn4DYq0M0DBttHvVXYEc4KDCivOe',
'admin'
);

-- CommonForms
CREATE TABLE master_register (
    id INT PRIMARY KEY AUTO_INCREMENT,

    -- Basic Registration
    master_number VARCHAR(50) NOT NULL UNIQUE,
    entry_date DATE NOT NULL,

    -- Visit Type
    visit_type ENUM('first','repeat') NOT NULL,

    -- Patient Name
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,

    -- Multiple Services Selected
    service_types JSON NOT NULL,

    -- Fee Details
    fee_amount DECIMAL(10,2) DEFAULT 0,
    is_free BOOLEAN DEFAULT FALSE,
    has_concession BOOLEAN DEFAULT FALSE,

    -- Referral / Notes
    referral_institution VARCHAR(255),
    remarks TEXT,

    -- Personal Details
    caste VARCHAR(50),
    gender ENUM('male','female','other') NOT NULL,
    age INT,
    contact_number VARCHAR(20),

    -- Address
    province VARCHAR(50),
    ward_number VARCHAR(20),
    locality VARCHAR(100),

    -- Birth Date
    birth_date DATE,

    -- System Fields
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL
);
SELECT * FROM master_register;

