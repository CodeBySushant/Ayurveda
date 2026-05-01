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

CREATE TABLE additional_service_billing (
    id INT PRIMARY KEY AUTO_INCREMENT,

    bill_number VARCHAR(30) UNIQUE NOT NULL,

    master_number VARCHAR(50) NOT NULL,

    patient_name VARCHAR(100) NOT NULL,
    patient_surname VARCHAR(100),
    full_name VARCHAR(200),

    caste VARCHAR(50),
    gender VARCHAR(20),
    age VARCHAR(20),
    contact_number VARCHAR(20),

    discount_type VARCHAR(50),
    discount_percent DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,

    payment_mode VARCHAR(30) DEFAULT 'cash',
    reference_number VARCHAR(100),

    subtotal DECIMAL(12,2) DEFAULT 0,
    total_amount DECIMAL(12,2) DEFAULT 0,

    remarks TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE additional_service_billing_items (
    id INT PRIMARY KEY AUTO_INCREMENT,

    billing_id INT NOT NULL,

    service_type VARCHAR(100) NOT NULL,
    service_name VARCHAR(150) NOT NULL,

    quantity INT DEFAULT 1,

    rate DECIMAL(12,2) DEFAULT 0,
    amount DECIMAL(12,2) DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (billing_id)
    REFERENCES additional_service_billing(id)
    ON DELETE CASCADE
);

CREATE TABLE referral_slips (
  id INT PRIMARY KEY AUTO_INCREMENT,

  slip_number VARCHAR(30) UNIQUE,
  form_date VARCHAR(20),

  /* Source Institution */
  from_institution_name VARCHAR(150),
  from_address VARCHAR(200),
  from_contact VARCHAR(30),
  from_province VARCHAR(50),

  /* Patient */
  master_number VARCHAR(50),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  gender VARCHAR(20),
  age VARCHAR(20),
  district VARCHAR(100),
  ward_number VARCHAR(20),

  /* Vitals */
  blood_pressure VARCHAR(30),
  pulse VARCHAR(30),
  temperature VARCHAR(30),
  respiration VARCHAR(30),
  weight VARCHAR(30),
  height VARCHAR(30),
  height_unit VARCHAR(10),
  body_type VARCHAR(100),
  ayurveda_therapy VARCHAR(150),

  other_notes TEXT,

  /* Referred To */
  to_institution_name VARCHAR(150),
  to_address VARCHAR(200),
  contact_date VARCHAR(30),
  required_tests TEXT,
  referral_reason TEXT,

  /* Official */
  official_name VARCHAR(120),
  official_designation VARCHAR(120),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE referral_services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  referral_id INT NOT NULL,
  service_name VARCHAR(200),

  FOREIGN KEY (referral_id)
  REFERENCES referral_slips(id)
  ON DELETE CASCADE
);

CREATE TABLE referral_medicines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  referral_id INT NOT NULL,
  medicine_name VARCHAR(200),
  dosage VARCHAR(100),

  FOREIGN KEY (referral_id)
  REFERENCES referral_slips(id)
  ON DELETE CASCADE
);