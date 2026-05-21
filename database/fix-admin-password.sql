-- Fix admin password hash (bcrypt for admin123)
UPDATE admin_users
SET password_hash = '$2a$12$XhPROICtQCYHFMjxjvNYauJXIPH9zwtEmCsmwMN.QiSBEWghC/DtK'
WHERE email = 'admin@punjablaptopsirsa.com';
