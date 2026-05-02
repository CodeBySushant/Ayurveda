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

CREATE TABLE return_slips (
  id INT PRIMARY KEY AUTO_INCREMENT,

  slip_number VARCHAR(30) UNIQUE,
  form_date VARCHAR(20),

  /* Section 1: Returning Info Giving Institution */
  from_institution_name VARCHAR(150),
  from_province VARCHAR(50),
  from_ward VARCHAR(20),

  /* Section 2: Sent To Institution */
  to_institution_name VARCHAR(150),
  to_address VARCHAR(200),

  /* Section 3: Patient */
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  gender VARCHAR(20),
  age VARCHAR(20),
  patient_province VARCHAR(50),
  patient_ward VARCHAR(20),
  contact_visit_date VARCHAR(20),

  /* Section 4: Provider Info */
  provider_name VARCHAR(120),
  provider_designation VARCHAR(120),
  provider_date VARCHAR(20),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE return_services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  return_id INT NOT NULL,
  service_name VARCHAR(200),

  FOREIGN KEY (return_id)
  REFERENCES return_slips(id)
  ON DELETE CASCADE
);

CREATE TABLE patient_admissions (
  id INT PRIMARY KEY AUTO_INCREMENT,

  admission_number VARCHAR(30) UNIQUE,
  form_date VARCHAR(20),

  master_number VARCHAR(30),
  is_first_time BOOLEAN DEFAULT FALSE,
  police_case BOOLEAN DEFAULT FALSE,

  inpatient_no VARCHAR(50),

  guardian_name VARCHAR(120),
  guardian_contact VARCHAR(30),

  admission_source VARCHAR(80),
  ward_number VARCHAR(20),

  provisional_diagnosis TEXT,

  therapy_purba_karma BOOLEAN DEFAULT FALSE,
  therapy_pradhan_karma BOOLEAN DEFAULT FALSE,
  therapy_ksharsutra BOOLEAN DEFAULT FALSE,
  therapy_therapeutic BOOLEAN DEFAULT FALSE,
  therapy_other VARCHAR(150),

  remarks TEXT,

  first_name VARCHAR(100),
  last_name VARCHAR(100),
  caste VARCHAR(80),
  gender VARCHAR(30),
  age VARCHAR(20),
  contact_number VARCHAR(30),
  province VARCHAR(80),
  patient_ward VARCHAR(20),
  locality VARCHAR(120),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patient_admission_medicines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  admission_id INT NOT NULL,

  medicine_name VARCHAR(150),
  dosage VARCHAR(100),

  FOREIGN KEY (admission_id)
  REFERENCES patient_admissions(id)
  ON DELETE CASCADE
);

CREATE TABLE patient_admission_investigations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  admission_id INT NOT NULL,

  investigation_type VARCHAR(150),
  details VARCHAR(255),

  FOREIGN KEY (admission_id)
  REFERENCES patient_admissions(id)
  ON DELETE CASCADE
);

CREATE TABLE emergency_services (
  id INT PRIMARY KEY AUTO_INCREMENT,

  emergency_number VARCHAR(30) UNIQUE,

  form_date VARCHAR(20),
  registration_date VARCHAR(20),
  registration_time VARCHAR(20),

  first_name VARCHAR(100),
  family_name VARCHAR(100),

  caste VARCHAR(80),
  gender VARCHAR(30),

  age_group VARCHAR(80),
  age VARCHAR(20),

  district VARCHAR(100),
  ward_number VARCHAR(20),
  locality VARCHAR(120),

  guardian_name VARCHAR(120),
  guardian_contact VARCHAR(30),

  self_admission BOOLEAN DEFAULT FALSE,
  brought_dead BOOLEAN DEFAULT FALSE,

  referring_org VARCHAR(150),

  disease VARCHAR(150),

  under_observation BOOLEAN DEFAULT FALSE,

  discharge_date VARCHAR(20),
  discharge_time VARCHAR(20),

  outcome_status VARCHAR(80),
  patient_death BOOLEAN DEFAULT FALSE,

  cost_exemption VARCHAR(80),
  total_cost_exemption VARCHAR(50),
  exemption_group VARCHAR(80),

  gender_violence BOOLEAN DEFAULT FALSE,
  police_case BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE emergency_symptoms (
  id INT PRIMARY KEY AUTO_INCREMENT,
  emergency_id INT,
  item_name VARCHAR(255),
  FOREIGN KEY (emergency_id)
  REFERENCES emergency_services(id)
  ON DELETE CASCADE
);

CREATE TABLE emergency_complaints (
  id INT PRIMARY KEY AUTO_INCREMENT,
  emergency_id INT,
  item_name VARCHAR(255),
  FOREIGN KEY (emergency_id)
  REFERENCES emergency_services(id)
  ON DELETE CASCADE
);

CREATE TABLE emergency_investigations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  emergency_id INT,
  item_name VARCHAR(255),
  FOREIGN KEY (emergency_id)
  REFERENCES emergency_services(id)
  ON DELETE CASCADE
);

CREATE TABLE emergency_diagnosis (
  id INT PRIMARY KEY AUTO_INCREMENT,
  emergency_id INT,
  item_name VARCHAR(255),
  FOREIGN KEY (emergency_id)
  REFERENCES emergency_services(id)
  ON DELETE CASCADE
);

CREATE TABLE emergency_treatments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  emergency_id INT,
  item_name VARCHAR(255),
  FOREIGN KEY (emergency_id)
  REFERENCES emergency_services(id)
  ON DELETE CASCADE
);

CREATE TABLE emergency_medicines (
  id INT PRIMARY KEY AUTO_INCREMENT,
  emergency_id INT,
  item_name VARCHAR(255),
  FOREIGN KEY (emergency_id)
  REFERENCES emergency_services(id)
  ON DELETE CASCADE
);

CREATE TABLE akupanchar_services (
  id INT PRIMARY KEY AUTO_INCREMENT,

  service_number VARCHAR(30) UNIQUE,

  miti VARCHAR(20),
  mul_darta VARCHAR(50),

  raktachap VARCHAR(50),
  taul VARCHAR(50),
  fbs VARCHAR(50),

  prakriti VARCHAR(100),
  rog VARCHAR(150),
  parikshan VARCHAR(255),

  naam VARCHAR(120),
  thar VARCHAR(120),
  full_name VARCHAR(255),

  umer VARCHAR(30),
  linga VARCHAR(30),

  sampark_number VARCHAR(30),
  jaati VARCHAR(100),

  wada_number VARCHAR(30),
  tol VARCHAR(120),
  jilla VARCHAR(120),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE akupanchar_service_items (
  id INT PRIMARY KEY AUTO_INCREMENT,

  service_id INT,

  miti VARCHAR(20),
  sewa VARCHAR(150),
  jatilata TEXT,
  parikshan_sallah TEXT,
  kaifiyat TEXT,

  FOREIGN KEY (service_id)
  REFERENCES akupanchar_services(id)
  ON DELETE CASCADE
);