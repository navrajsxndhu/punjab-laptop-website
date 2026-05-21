-- ============================================================
-- Punjab Laptop Sirsa — Seed Data
-- Run AFTER schema.sql
-- ============================================================

-- ============================================================
-- Admin User (password: admin123 — CHANGE IN PRODUCTION)
-- bcrypt hash for 'admin123'
-- ============================================================
INSERT INTO admin_users (email, password_hash, name, role) VALUES
('admin@punjablaptopsirsa.com', '$2a$12$XhPROICtQCYHFMjxjvNYauJXIPH9zwtEmCsmwMN.QiSBEWghC/DtK', 'Punjab Laptop Admin', 'superadmin');

-- ============================================================
-- Categories
-- ============================================================
INSERT INTO categories (name, slug, icon, description, sort_order) VALUES
('Gaming Laptops', 'gaming', '🎮', 'High-performance gaming laptops with dedicated graphics', 1),
('Office & Business', 'office', '💼', 'Professional laptops for business and productivity', 2),
('Student Laptops', 'student', '📚', 'Affordable and reliable laptops for students', 3),
('Ultrabooks', 'ultrabooks', '✨', 'Thin, light, and premium ultrabooks', 4),
('Refurbished', 'refurbished', '🔄', 'Quality refurbished laptops at great prices', 5),
('Accessories', 'accessories', '🎧', 'Laptop bags, chargers, mice, and more', 6);

-- ============================================================
-- Brands
-- ============================================================
INSERT INTO brands (name, slug, logo_url) VALUES
('Dell', 'dell', '/images/brands/dell.svg'),
('HP', 'hp', '/images/brands/hp.svg'),
('Lenovo', 'lenovo', '/images/brands/lenovo.svg'),
('ASUS', 'asus', '/images/brands/asus.svg'),
('Acer', 'acer', '/images/brands/acer.svg'),
('Apple', 'apple', '/images/brands/apple.svg'),
('MSI', 'msi', '/images/brands/msi.svg');

-- ============================================================
-- Products
-- ============================================================

-- Dell Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'Dell Inspiron 15 3520',
  'dell-inspiron-15-3520',
  (SELECT id FROM brands WHERE slug = 'dell'),
  (SELECT id FROM categories WHERE slug = 'student'),
  'Intel Core i5-1235U (12th Gen)',
  '8 GB DDR4',
  '512 GB SSD',
  '15.6" FHD (1920x1080)',
  'Intel UHD Graphics',
  'Windows 11 Home',
  42999.00,
  38999.00,
  ARRAY['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800'],
  'The Dell Inspiron 15 is the perfect everyday laptop for students. Powered by the latest 12th Gen Intel Core i5, it delivers smooth multitasking and reliable performance. The 15.6-inch Full HD display offers vibrant visuals for studying and entertainment.',
  true, true, '1 Year Dell Warranty', 'like-new',
  '{"battery": "41Whr, up to 7 hours", "weight": "1.65 kg", "ports": "2x USB 3.2, 1x USB-C, HDMI, SD Card, 3.5mm", "wifi": "Wi-Fi 6 (802.11ax)", "bluetooth": "5.2", "webcam": "HD 720p", "keyboard": "Full-size with numpad"}'::jsonb
),
(
  'Dell Latitude 5430',
  'dell-latitude-5430',
  (SELECT id FROM brands WHERE slug = 'dell'),
  (SELECT id FROM categories WHERE slug = 'office'),
  'Intel Core i7-1265U (12th Gen)',
  '16 GB DDR4',
  '512 GB SSD NVMe',
  '14" FHD IPS (1920x1080)',
  'Intel Iris Xe Graphics',
  'Windows 11 Pro',
  64999.00,
  59999.00,
  ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800', 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'],
  'Enterprise-grade Dell Latitude 5430 built for professionals. Features vPro technology, premium build quality, and all-day battery life. Perfect for business executives and remote workers.',
  true, true, '3 Year Dell ProSupport', 'excellent',
  '{"battery": "58Whr, up to 10 hours", "weight": "1.36 kg", "ports": "2x Thunderbolt 4, 2x USB 3.2, HDMI 2.0, RJ-45", "wifi": "Wi-Fi 6E", "bluetooth": "5.2", "webcam": "FHD 1080p IR", "keyboard": "Backlit with TrackPoint", "security": "Fingerprint Reader, IR Camera, TPM 2.0"}'::jsonb
);

-- HP Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'HP Pavilion Gaming 15',
  'hp-pavilion-gaming-15',
  (SELECT id FROM brands WHERE slug = 'hp'),
  (SELECT id FROM categories WHERE slug = 'gaming'),
  'AMD Ryzen 5 5600H',
  '8 GB DDR4',
  '512 GB SSD NVMe',
  '15.6" FHD IPS 144Hz',
  'NVIDIA GTX 1650 4GB',
  'Windows 11 Home',
  56999.00,
  49999.00,
  ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800', 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800'],
  'Unleash your gaming potential with the HP Pavilion Gaming 15. Equipped with a powerful AMD Ryzen 5 and NVIDIA GTX 1650 graphics, this laptop handles modern games with ease. The 144Hz display ensures buttery-smooth gameplay.',
  true, true, '1 Year HP Warranty', 'like-new',
  '{"battery": "52.5Whr, up to 6 hours", "weight": "1.98 kg", "ports": "1x USB-C, 2x USB-A, HDMI 2.0, RJ-45, 3.5mm", "wifi": "Wi-Fi 6", "bluetooth": "5.2", "webcam": "HD 720p", "keyboard": "Backlit green accent", "cooling": "Dual fan, enhanced thermals"}'::jsonb
),
(
  'HP 14s-fq1092au',
  'hp-14s-fq1092au',
  (SELECT id FROM brands WHERE slug = 'hp'),
  (SELECT id FROM categories WHERE slug = 'student'),
  'AMD Ryzen 3 5300U',
  '8 GB DDR4',
  '256 GB SSD',
  '14" FHD (1920x1080)',
  'AMD Radeon Graphics',
  'Windows 11 Home',
  32999.00,
  29499.00,
  ARRAY['https://images.unsplash.com/photo-1544099858-75feeb57f01b?w=800'],
  'Compact, lightweight, and affordable — the HP 14s is ideal for students on a budget. Powered by AMD Ryzen 3, it handles everyday tasks like browsing, documents, and video streaming effortlessly.',
  true, false, '1 Year HP Warranty', 'good',
  '{"battery": "41Whr, up to 8 hours", "weight": "1.46 kg", "ports": "1x USB-C, 2x USB-A, HDMI, 3.5mm", "wifi": "Wi-Fi 5", "bluetooth": "5.0", "webcam": "HD 720p"}'::jsonb
);

-- Lenovo Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'Lenovo IdeaPad Gaming 3',
  'lenovo-ideapad-gaming-3',
  (SELECT id FROM brands WHERE slug = 'lenovo'),
  (SELECT id FROM categories WHERE slug = 'gaming'),
  'Intel Core i5-12450H (12th Gen)',
  '16 GB DDR5',
  '512 GB SSD NVMe',
  '15.6" FHD IPS 120Hz',
  'NVIDIA RTX 3050 4GB',
  'Windows 11 Home',
  62999.00,
  55999.00,
  ARRAY['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800', 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800'],
  'The Lenovo IdeaPad Gaming 3 delivers serious gaming performance at an accessible price. With RTX 3050 graphics and 12th Gen Intel power, experience ray tracing and high-FPS gaming without breaking the bank.',
  true, true, '2 Year Lenovo Warranty', 'like-new',
  '{"battery": "45Whr, up to 5.5 hours", "weight": "2.32 kg", "ports": "1x USB-C, 3x USB-A, HDMI 2.0, RJ-45, 3.5mm", "wifi": "Wi-Fi 6", "bluetooth": "5.1", "webcam": "HD 720p", "keyboard": "4-zone RGB backlit", "cooling": "Dual fan with IdeaPad cooling"}'::jsonb
),
(
  'Lenovo ThinkPad E14 Gen 4',
  'lenovo-thinkpad-e14-gen4',
  (SELECT id FROM brands WHERE slug = 'lenovo'),
  (SELECT id FROM categories WHERE slug = 'office'),
  'Intel Core i5-1240P (12th Gen)',
  '16 GB DDR4',
  '512 GB SSD',
  '14" FHD IPS (1920x1080)',
  'Intel Iris Xe Graphics',
  'Windows 11 Pro',
  58999.00,
  52999.00,
  ARRAY['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'],
  'The legendary ThinkPad reliability meets modern performance. Built for professionals who demand the best keyboard, robust security, and all-day battery. MIL-STD 810H tested for durability.',
  true, false, '3 Year Lenovo Onsite', 'excellent',
  '{"battery": "57Whr, up to 12 hours", "weight": "1.59 kg", "ports": "1x Thunderbolt 4, 1x USB-C, 2x USB-A, HDMI 2.0", "wifi": "Wi-Fi 6E", "bluetooth": "5.1", "webcam": "FHD 1080p IR", "keyboard": "Backlit TrackPoint keyboard", "security": "Fingerprint, IR Camera, dTPM 2.0"}'::jsonb
);

-- ASUS Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'ASUS ROG Strix G15',
  'asus-rog-strix-g15',
  (SELECT id FROM brands WHERE slug = 'asus'),
  (SELECT id FROM categories WHERE slug = 'gaming'),
  'AMD Ryzen 7 6800H',
  '16 GB DDR5',
  '1 TB SSD NVMe',
  '15.6" FHD IPS 300Hz',
  'NVIDIA RTX 3060 6GB',
  'Windows 11 Home',
  89999.00,
  79999.00,
  ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800', 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800'],
  'Dominate every game with the ASUS ROG Strix G15. Featuring AMD Ryzen 7, RTX 3060, and a blazing 300Hz display, this machine is built for competitive gaming and content creation.',
  true, true, '2 Year ASUS Warranty', 'like-new',
  '{"battery": "90Whr, up to 8 hours", "weight": "2.3 kg", "ports": "1x USB-C 3.2, 3x USB-A, HDMI 2.0b, RJ-45, 3.5mm", "wifi": "Wi-Fi 6E", "bluetooth": "5.2", "keyboard": "Per-key RGB backlit", "cooling": "Liquid Metal, quad heatpipe", "audio": "Dolby Atmos, Smart Amp"}'::jsonb
),
(
  'ASUS VivoBook 15 OLED',
  'asus-vivobook-15-oled',
  (SELECT id FROM brands WHERE slug = 'asus'),
  (SELECT id FROM categories WHERE slug = 'ultrabooks'),
  'Intel Core i5-1335U (13th Gen)',
  '16 GB DDR4',
  '512 GB SSD',
  '15.6" OLED FHD (1920x1080)',
  'Intel Iris Xe Graphics',
  'Windows 11 Home',
  54999.00,
  48999.00,
  ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'],
  'Experience stunning OLED visuals with the ASUS VivoBook 15. The vibrant OLED display delivers cinema-grade colors with 100% DCI-P3 coverage. Perfect for creative professionals and multimedia enthusiasts.',
  true, false, '1 Year ASUS Warranty', 'like-new',
  '{"battery": "50Whr, up to 8 hours", "weight": "1.7 kg", "ports": "1x USB-C, 2x USB-A, HDMI, MicroSD, 3.5mm", "wifi": "Wi-Fi 6", "bluetooth": "5.0", "webcam": "HD 720p", "display_tech": "OLED, 100% DCI-P3, 600 nits HDR"}'::jsonb
);

-- Acer Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'Acer Aspire 5 A515-57',
  'acer-aspire-5-a515',
  (SELECT id FROM brands WHERE slug = 'acer'),
  (SELECT id FROM categories WHERE slug = 'student'),
  'Intel Core i5-1235U (12th Gen)',
  '8 GB DDR4',
  '512 GB SSD',
  '15.6" FHD IPS (1920x1080)',
  'Intel Iris Xe Graphics',
  'Windows 11 Home',
  44999.00,
  39999.00,
  ARRAY['https://images.unsplash.com/photo-1544099858-75feeb57f01b?w=800'],
  'The Acer Aspire 5 offers incredible value with premium features. Lightweight design, vibrant IPS display, and powerful 12th Gen Intel processor make it the top choice for students and professionals alike.',
  true, false, '1 Year Acer Warranty', 'excellent',
  '{"battery": "50Whr, up to 8 hours", "weight": "1.76 kg", "ports": "1x USB-C, 2x USB-A, HDMI, RJ-45, 3.5mm", "wifi": "Wi-Fi 6", "bluetooth": "5.1", "webcam": "HD 720p", "keyboard": "Backlit"}'::jsonb
),
(
  'Acer Nitro 5 AN515-58',
  'acer-nitro-5-an515',
  (SELECT id FROM brands WHERE slug = 'acer'),
  (SELECT id FROM categories WHERE slug = 'gaming'),
  'Intel Core i5-12500H (12th Gen)',
  '16 GB DDR4',
  '512 GB SSD NVMe',
  '15.6" FHD IPS 144Hz',
  'NVIDIA RTX 3050 Ti 4GB',
  'Windows 11 Home',
  67999.00,
  59999.00,
  ARRAY['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800'],
  'Bring the heat with the Acer Nitro 5. Powered by 12th Gen Intel and RTX 3050 Ti, it delivers excellent 1080p gaming. The 144Hz display and powerful cooling keep you in the game.',
  true, true, '2 Year Acer Warranty', 'like-new',
  '{"battery": "57.5Whr, up to 5 hours", "weight": "2.5 kg", "ports": "1x USB-C, 3x USB-A, HDMI 2.1, RJ-45, 3.5mm", "wifi": "Wi-Fi 6", "bluetooth": "5.2", "keyboard": "Red backlit 4-zone", "cooling": "Dual fan NitroSense cooling"}'::jsonb
);

-- Apple Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'MacBook Air M1',
  'macbook-air-m1',
  (SELECT id FROM brands WHERE slug = 'apple'),
  (SELECT id FROM categories WHERE slug = 'ultrabooks'),
  'Apple M1 (8-core CPU)',
  '8 GB Unified',
  '256 GB SSD',
  '13.3" Retina (2560x1600)',
  'Apple M1 7-core GPU',
  'macOS',
  72999.00,
  64999.00,
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800', 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800'],
  'The game-changing MacBook Air with Apple M1 chip. Incredibly thin, fanless design with all-day battery life. Experience blazing-fast performance, stunning Retina display, and the best-in-class trackpad.',
  true, true, '1 Year Apple Warranty', 'like-new',
  '{"battery": "49.9Whr, up to 18 hours", "weight": "1.29 kg", "ports": "2x Thunderbolt/USB 4, 3.5mm", "wifi": "Wi-Fi 6", "bluetooth": "5.0", "webcam": "FaceTime HD 720p", "keyboard": "Magic Keyboard with Touch ID", "audio": "Stereo speakers with Spatial Audio"}'::jsonb
);

-- MSI Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'MSI GF63 Thin',
  'msi-gf63-thin',
  (SELECT id FROM brands WHERE slug = 'msi'),
  (SELECT id FROM categories WHERE slug = 'gaming'),
  'Intel Core i5-11400H',
  '8 GB DDR4',
  '512 GB SSD NVMe',
  '15.6" FHD IPS 144Hz',
  'NVIDIA GTX 1650 Max-Q 4GB',
  'Windows 11 Home',
  49999.00,
  44999.00,
  ARRAY['https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=800'],
  'The MSI GF63 Thin packs serious gaming power in an ultra-thin chassis. At just 1.86 kg, its one of the lightest gaming laptops available. Perfect for gamers on the go.',
  true, false, '2 Year MSI Warranty', 'excellent',
  '{"battery": "51Whr, up to 5 hours", "weight": "1.86 kg", "ports": "1x USB-C, 3x USB-A, HDMI, RJ-45, 3.5mm", "wifi": "Wi-Fi 6", "bluetooth": "5.2", "keyboard": "Red backlit", "cooling": "Cooler Boost 5"}'::jsonb
);

-- Refurbished Products
INSERT INTO products (name, slug, brand_id, category_id, processor, ram, storage, display_size, graphics, os, price, sale_price, images, description, in_stock, featured, warranty, condition, specs) VALUES
(
  'Dell Latitude E7470 (Refurbished)',
  'dell-latitude-e7470-refurbished',
  (SELECT id FROM brands WHERE slug = 'dell'),
  (SELECT id FROM categories WHERE slug = 'refurbished'),
  'Intel Core i5-6300U (6th Gen)',
  '8 GB DDR4',
  '256 GB SSD',
  '14" FHD (1920x1080)',
  'Intel HD Graphics 520',
  'Windows 10 Pro',
  18999.00,
  16499.00,
  ARRAY['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800'],
  'Premium refurbished Dell Latitude E7470 — perfect for budget-conscious professionals. Enterprise build quality, ultrabook design, and reliable performance for everyday work. Thoroughly tested and certified.',
  true, false, '6 Months Shop Warranty', 'refurbished',
  '{"battery": "55Whr, up to 8 hours", "weight": "1.54 kg", "ports": "1x USB-C, 2x USB-A, HDMI, SD Card, 3.5mm", "wifi": "Wi-Fi 5", "bluetooth": "4.1", "webcam": "HD 720p", "keyboard": "Backlit"}'::jsonb
),
(
  'HP EliteBook 840 G5 (Refurbished)',
  'hp-elitebook-840-g5-refurbished',
  (SELECT id FROM brands WHERE slug = 'hp'),
  (SELECT id FROM categories WHERE slug = 'refurbished'),
  'Intel Core i5-8350U (8th Gen)',
  '16 GB DDR4',
  '256 GB SSD',
  '14" FHD IPS (1920x1080)',
  'Intel UHD Graphics 620',
  'Windows 10 Pro',
  22999.00,
  19999.00,
  ARRAY['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800'],
  'Top-of-the-line HP EliteBook 840 G5 in excellent refurbished condition. Military-grade durability, stunning display, and premium features at a fraction of the cost. Ideal for business professionals.',
  true, false, '6 Months Shop Warranty', 'refurbished',
  '{"battery": "50Whr, up to 10 hours", "weight": "1.48 kg", "ports": "1x USB-C, 2x USB-A, HDMI, DisplayPort, SD Card, SIM", "wifi": "Wi-Fi 5", "bluetooth": "4.2", "webcam": "HD 720p IR", "keyboard": "Backlit with trackpoint", "security": "Fingerprint, Smart Card"}'::jsonb
);

-- ============================================================
-- Offers
-- ============================================================
INSERT INTO offers (title, description, discount_type, discount_value, valid_from, valid_until, banner_image, active) VALUES
('Summer Sale 🔥', 'Get up to ₹10,000 off on selected gaming laptops. Limited time offer!', 'flat', 10000, NOW(), NOW() + INTERVAL '30 days', 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200', true),
('Student Special 📚', 'Extra 5% discount for students on all laptops. Show valid college ID.', 'percentage', 5, NOW(), NOW() + INTERVAL '90 days', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200', true),
('Refurbished Deals', 'Premium refurbished laptops starting at just ₹14,999. Warranty included!', 'special', NULL, NOW(), NOW() + INTERVAL '60 days', 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1200', true),
('MacBook Special', 'MacBook Air M1 now available at unbeatable prices. Limited stock!', 'flat', 8000, NOW(), NOW() + INTERVAL '15 days', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200', true);

-- ============================================================
-- Testimonials
-- ============================================================
INSERT INTO testimonials (name, rating, text, location, verified) VALUES
('Rajesh Kumar', 5, 'Bought a Dell Inspiron from Punjab Laptop and the experience was amazing. The laptop was in perfect condition and the price was the best in Sirsa. Highly recommended!', 'Sirsa, Haryana', true),
('Priya Sharma', 5, 'I was looking for a gaming laptop for my son and they had exactly what we needed. Great collection, fair prices, and excellent after-sales support. Will definitely come back!', 'Sirsa, Haryana', true),
('Vikram Singh', 4, 'Got a refurbished ThinkPad for my office work. Its been 6 months and it runs perfectly. Great value for money. Punjab Laptop is trustworthy.', 'Ellenabad, Haryana', true),
('Anita Gupta', 5, 'Best laptop shop in Sirsa! The owner is very helpful and knowledgeable. He helped me choose the perfect laptop for my college studies within my budget.', 'Sirsa, Haryana', true),
('Mohit Bansal', 5, 'Purchased a MacBook Air M1 and it was like brand new. Competitive pricing and genuine products. I follow them on Instagram — their collection is always updated!', 'Fatehabad, Haryana', true),
('Deepak Nandal', 4, 'Very professional shop with a wide range of laptops. Got an HP Pavilion Gaming laptop at a great price. The 47K Instagram followers speak for themselves!', 'Dabwali, Haryana', true);

-- ============================================================
-- Blog Posts
-- ============================================================
INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, author, tags, published, published_at) VALUES
(
  'Top 5 Best Laptops for Students in 2024 — Budget Guide',
  'best-laptops-for-students-2024',
  '<h2>Finding the Perfect Student Laptop</h2><p>Choosing the right laptop for college or school can be overwhelming. With so many options available, how do you pick the one that balances performance, portability, and price? Here at Punjab Laptop Sirsa, we have helped thousands of students find their ideal laptop.</p><h3>1. Dell Inspiron 15 3520</h3><p>Starting at ₹38,999 — the Dell Inspiron 15 is our top recommendation for students. With 12th Gen Intel Core i5, 8GB RAM, and 512GB SSD, it handles all academic tasks effortlessly.</p><h3>2. HP 14s</h3><p>At just ₹29,499, the HP 14s is the budget king. Compact, lightweight, and perfect for note-taking, browsing, and light coding.</p><h3>3. Acer Aspire 5</h3><p>The Acer Aspire 5 offers the best bang for your buck at ₹39,999 with premium features like a backlit keyboard and IPS display.</p><h3>4. Lenovo IdeaPad Slim 3</h3><p>Thin and light with AMD Ryzen power, the IdeaPad Slim 3 is perfect for students who are always on the move.</p><h3>5. ASUS VivoBook 15</h3><p>The ASUS VivoBook 15 offers an OLED display option that makes it stand out in the student laptop category.</p><h3>Visit Us</h3><p>Come visit Punjab Laptop Sirsa at Shop No. 52, New M.C. Market, Sirsa to see these laptops in person. We offer the best prices in Sirsa with warranty on every purchase!</p>',
  'A comprehensive guide to the best budget laptops for students in 2024. Find the perfect laptop for college under ₹45,000 at Punjab Laptop Sirsa.',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
  'Punjab Laptop Sirsa',
  ARRAY['students', 'budget', 'guide', 'laptops'],
  true, NOW() - INTERVAL '5 days'
),
(
  'Gaming Laptops Under ₹60,000 — Best Picks in Sirsa',
  'gaming-laptops-under-60000',
  '<h2>Gaming on a Budget</h2><p>You dont need to spend a fortune to enjoy modern games. These gaming laptops under ₹60,000 deliver excellent performance for popular titles like GTA V, Valorant, and Fortnite.</p><h3>HP Pavilion Gaming 15 — ₹49,999</h3><p>Our top pick for budget gaming. The AMD Ryzen 5 + GTX 1650 combo handles most games at medium-high settings with smooth framerates.</p><h3>Acer Nitro 5 — ₹59,999</h3><p>With RTX 3050 Ti graphics, the Nitro 5 brings ray tracing to the budget segment. The 144Hz display makes competitive games feel incredibly smooth.</p><h3>MSI GF63 Thin — ₹44,999</h3><p>The lightest gaming laptop in this price range. Perfect if you want gaming power without the bulk.</p><h3>Why Buy From Us?</h3><p>At Punjab Laptop Sirsa, we personally test every gaming laptop before selling. Our prices are the most competitive in Sirsa, and we provide genuine warranty on all products.</p>',
  'Discover the best gaming laptops under ₹60,000 available at Punjab Laptop Sirsa. GTX 1650, RTX 3050 options with warranty.',
  'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200',
  'Punjab Laptop Sirsa',
  ARRAY['gaming', 'budget', 'guide'],
  true, NOW() - INTERVAL '3 days'
),
(
  'New vs Refurbished Laptops — Which Should You Buy?',
  'new-vs-refurbished-laptops-guide',
  '<h2>Making the Smart Choice</h2><p>At Punjab Laptop Sirsa, we offer both new and refurbished laptops. Both have their advantages, and the right choice depends on your needs and budget.</p><h3>When to Buy New</h3><p>Choose a new laptop when you need the latest processor, want the longest warranty, or need specific features only available in current models.</p><h3>When to Buy Refurbished</h3><p>Refurbished laptops are perfect when budget is a priority. Our refurbished laptops go through a rigorous testing process — battery, display, keyboard, ports — everything is checked and certified.</p><h3>Our Refurbished Promise</h3><p>Every refurbished laptop from Punjab Laptop Sirsa comes with: minimum 6 months warranty, thorough testing certification, genuine software, and a money-back guarantee if not satisfied.</p>',
  'Learn the differences between new and refurbished laptops. Make an informed buying decision at Punjab Laptop Sirsa.',
  'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1200',
  'Punjab Laptop Sirsa',
  ARRAY['refurbished', 'guide', 'tips'],
  true, NOW() - INTERVAL '7 days'
);

-- ============================================================
-- Banners
-- ============================================================
INSERT INTO banners (title, subtitle, image_url, link, active, sort_order) VALUES
('Premium Laptops, Unbeatable Prices', 'Shop No. 52, New M.C. Market, Sirsa — Trusted by 47K+ followers', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400', '/products', true, 1),
('Summer Gaming Sale 🎮', 'Up to ₹10,000 off on selected gaming laptops', 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1400', '/offers', true, 2),
('MacBook Air M1 — Now Available', 'Experience Apple silicon at the best price in Sirsa', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1400', '/products/macbook-air-m1', true, 3);
