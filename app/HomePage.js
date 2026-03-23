'use client';

import { useEffect } from 'react';
{/* <img src="https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBhcnRpc2FufGVufDF8fHx8MTc3MzMwMTk3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Artisan hands shaping pottery" loading="lazy" onerror="this.style.display='none'"></img> */}
export default function HomePage() {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.section-header, .about-image, .about-text, .gallery-item, .achievement-card, .testimonial-card, .contact-info, .contact-form, .fade-in, .hands-on-image, .hands-on-text, .collection-card'
        );

        animatedElements.forEach((el) => observer.observe(el));

        // Carousel Logic
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const totalSlides = slides.length;

        function goToSlide(index) {
            slides.forEach((s) => s.classList.remove('active'));
            dots.forEach((d) => d.classList.remove('active'));
            currentSlide = index;
            if (slides[currentSlide]) slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % totalSlides);
        }

        const carouselInterval = setInterval(nextSlide, 4500);

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        });

        // Smooth scroll for anchors
        const anchorHandler = function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        };

        const anchors = document.querySelectorAll('a[href^="#"]');
        anchors.forEach((anchor) => {
            anchor.addEventListener('click', anchorHandler);
        });

        // Contact form handler
        const contactForm = document.querySelector('.contact-form form');
        const formHandler = (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();
            const text = `Hi, I'm ${name} (${phone}).\n\n${message}`;
            const whatsappUrl = `https://wa.me/919928654515?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        };

        if (contactForm) {
            contactForm.addEventListener('submit', formHandler);
        }

        // Parallax scroll
        const scrollHandler = () => {
            const scrolled = window.pageYOffset;
            const heroCarousel = document.querySelector('.hero-carousel');
            if (heroCarousel && scrolled < window.innerHeight) {
                heroCarousel.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        };

        window.addEventListener('scroll', scrollHandler);

        // Hamburger menu
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileNavMenu = document.getElementById('mobile-nav-menu');
        const hamburgerToggle = () => {
            hamburgerBtn.classList.toggle('open');
            mobileNavMenu.classList.toggle('open');
            document.body.style.overflow = mobileNavMenu.classList.contains('open') ? 'hidden' : '';
        };
        const mobileNavLinks = mobileNavMenu ? Array.from(mobileNavMenu.querySelectorAll('a')) : [];
        const closeMenu = () => {
            hamburgerBtn.classList.remove('open');
            mobileNavMenu.classList.remove('open');
            document.body.style.overflow = '';
        };
        if (hamburgerBtn) hamburgerBtn.addEventListener('click', hamburgerToggle);
        mobileNavLinks.forEach((link) => link.addEventListener('click', closeMenu));

        // Mobile collections dropdown
        const mobileDropdownToggle = mobileNavMenu ? mobileNavMenu.querySelector('.mobile-dropdown-toggle') : null;
        const mobileDropdown = mobileNavMenu ? mobileNavMenu.querySelector('.mobile-dropdown') : null;
        const mobileDropdownHandler = () => { if (mobileDropdown) mobileDropdown.classList.toggle('open'); };
        if (mobileDropdownToggle) mobileDropdownToggle.addEventListener('click', mobileDropdownHandler);

        return () => {
            clearInterval(carouselInterval);
            animatedElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
            anchors.forEach((anchor) => {
                anchor.removeEventListener('click', anchorHandler);
            });
            if (contactForm) {
                contactForm.removeEventListener('submit', formHandler);
            }
            window.removeEventListener('scroll', scrollHandler);
            if (hamburgerBtn) hamburgerBtn.removeEventListener('click', hamburgerToggle);
            mobileNavLinks.forEach((link) => link.removeEventListener('click', closeMenu));
            if (mobileDropdownToggle) mobileDropdownToggle.removeEventListener('click', mobileDropdownHandler);
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: `
    <!-- Navigation -->
    <nav>
       <a href="/" class="logo" style="text-decoration:none;"><img src="/logo.jpeg" alt="Tanzy's Blue Pottery"></a>        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li class="nav-dropdown">
                <a href="#collections">Collections <span class="dropdown-arrow"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="/collections/diwali">Diwali Collection</a></li>
                    <li><a href="/collections/pichwai">Pichwai Collection</a></li>
                    <li><a href="/collections/christmas">Christmas Collection</a></li>
                </ul>
            </li>
            <li><a href="/hands-on">Hands On</a></li>
            <li><a href="/achievements">Achievements</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <button class="hamburger-btn" id="hamburger-btn" aria-label="Open menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    </nav>

    <div class="mobile-nav-menu" id="mobile-nav-menu">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li class="mobile-dropdown">
                <button class="mobile-dropdown-toggle">Collections <span class="mobile-dropdown-arrow">▾</span></button>
                <ul class="mobile-dropdown-list">
                    <li><a href="/collections/diwali">Diwali</a></li>
                    <li><a href="/collections/pichwai">Pichwai</a></li>
                    <li><a href="/collections/christmas">Christmas</a></li>
                </ul>
            </li>
            <li><a href="/hands-on">Hands On</a></li>
            <li><a href="/achievements">Achievements</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>

    <!-- Hero Section with Carousel -->
    <section id="home" class="hero">
        <div class="hero-carousel">
            <div class="carousel-slide active">
                <img src="/images/hero/slide-1.jpg" alt="Handcrafted pottery collection" loading="eager">
            </div>
            <div class="carousel-slide">
                <img src="/images/hero/slide-2.jpg" alt="Artisan pottery workshop" loading="eager">
            </div>
            <div class="carousel-slide">
                <img src="/images/hero/slide-3.jpg" alt="Blue ceramic artisan vase" loading="eager">
            </div>
        </div>
        <div class="carousel-dots">
            <button class="carousel-dot active" aria-label="Slide 1"></button>
            <button class="carousel-dot" aria-label="Slide 2"></button>
            <button class="carousel-dot" aria-label="Slide 3"></button>
        </div>
        <div class="hero-content">
            <div class="hero-subtitle">Handcrafted with Love</div>
            <h1 class="hero-title">Heritage & Craft
            <p class="hero-description">Reviving Jaipur’s Blue Pottery, One Piece at a Time.
            Where Heritage Meets Handcrafted Beauty</p>

            <a href="#gallery" class="cta-button">Explore Collection</a>
        </div>
        <div class="scroll-indicator">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="section-header">
            <div class="section-subtitle">Our Story</div>
            <h2 class="section-title">Crafting Beauty from Earth</h2>
            <p class="section-description">At Tanzy's Blue Pottery, we believe in the transformative power of pottery. Each piece is a unique expression of artistry and tradition.</p>
        </div>
        <div class="about-content">
            <div class="about-image">
                <div class="about-image-wrapper">
                    <img src="/images/aboutImage.JPG" alt="Artisan hands shaping pottery" loading="lazy" onerror="this.style.display='none'">
                </div>
            </div>
            <div class="about-text">
                <h3>Rooted in tradition, shaped by hand, and made to be cherished.</h3>
                <p>Tanzy’s Blue Pottery is the brainchild of Tanya Bhasin & Reema Bhasin, founded with the vision to
revive this centuries-old craft. At TBP, every piece is meticulously handcrafted by skilled women
artisans of Jaipur. Each creation passes through 22–25 stages and 44–46 intricate processes
before it reaches completion — a true testament to precision.</p>
                <div style="margin-top: 2rem;">
                    <a href="/about" class="cta-button" style="font-size: 0.85rem; padding: 0.9rem 2rem; animation: none; opacity: 1;">Learn More About Us →</a>
                </div>
                <div class="about-features">
                    <div class="feature-item">
                        <div class="feature-icon">✦</div>
                        <div class="feature-text">
                            <h4>Handmade Quality</h4>
                            <p>Each piece is individually crafted with meticulous attention to detail</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">♥</div>
                        <div class="feature-text">
                            <h4>Unique Designs</h4>
                            <p>No two pieces are exactly alike, making yours truly one-of-a-kind</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">⚘</div>
                        <div class="feature-text">
                            <h4>Natural Materials</h4>
                            <p>We use sustainable, earth-friendly potterys and glazes</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">◉</div>
                        <div class="feature-text">
                            <h4>Lasting Beauty</h4>
                            <p>Built to last and become cherished heirlooms</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery">
        <div class="section-header">
            <div class="section-subtitle">Our Collections</div>
            <h2 class="section-title">Featured Creations</h2>
            <p class="section-description">Explore our curated selection of handcrafted pottery, each piece a testament to skill, patience, and artistic vision.</p>
        </div>
        <div class="gallery-grid">
            <a href="/gallery#atelier-collection" class="gallery-item" style="text-decoration:none;">
                <img src="/images/gallery/pottery-1.jpg" alt="The Atelier Collection" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">The Atelier Collection</h3>
                    <p class="gallery-description">Signature studio pieces crafted with artistic precision</p>
                </div>
            </a>
            <a href="/gallery#dining-edit" class="gallery-item" style="text-decoration:none;">
                <img src="/images/gallery/pottery-2.jpg" alt="Dining Edit" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Dining Edit</h3>
                    <p class="gallery-description">Elegant tableware for everyday luxury</p>
                </div>
            </a>
            <a href="/gallery#home-decor" class="gallery-item" style="text-decoration:none;">
                <img src="/images/gallery/pottery-3.jpg" alt="Home Decor" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Home Decor</h3>
                    <p class="gallery-description">Handcrafted accents to elevate your living spaces</p>
                </div>
            </a>
            <a href="/gallery#festive-collection" class="gallery-item" style="text-decoration:none;">
                <img src="/images/gallery/pottery-4.jpg" alt="Festive Collection" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Festive Collection</h3>
                    <p class="gallery-description">Celebrate every occasion with artisanal pottery</p>
                </div>
            </a>
            <a href="/gallery#utility-and-gifting" class="gallery-item" style="text-decoration:none;">
                <img src="/images/gallery/pottery-5.jpg" alt="Utility and Gifting" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Utility & Gifting</h3>
                    <p class="gallery-description">Functional art perfect for gifting and daily use</p>
                </div>
            </a>
            <a href="/gallery#pichwai-collection" class="gallery-item" style="text-decoration:none;">
                <img src="/images/gallery/pottery-6.jpg" alt="Pichwai Collection" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Pichwai Collection</h3>
                    <p class="gallery-description">Traditional Pichwai art reimagined in blue pottery</p>
                </div>
            </a>
        </div>
        <div class="view-all-wrapper">
            <a href="/gallery" class="view-all-btn">View All Gallery →</a>
        </div>
    </section>

    <!-- Collections Section -->
    <section id="collections" class="collections">
        <div class="section-header">
            <div class="section-subtitle">Seasonal Specials</div>
            <h2 class="section-title">Our Festive Collections</h2>
            <p class="section-description">Celebrate every occasion with our specially curated pottery collections, each inspired by the vibrant spirit of India's beloved festivals.</p>
        </div>
        <div class="collections-grid">
            <a href="/collections/diwali" class="collection-card" style="text-decoration:none;">
                <img src="/images/diwali-collection.png" alt="Diwali pottery collection" loading="lazy">
                <div class="collection-overlay">
                    <div class="collection-tag">Festival of Lights</div>
                    <h3 class="collection-name">Diwali Collection</h3>
                    <p class="collection-desc">Handcrafted diyas, lanterns, and decorative pieces in deep blue, perfect for illuminating your celebrations.</p>
                </div>
            </a>
            <a href="/collections/pichwai" class="collection-card" style="text-decoration:none;">
                <img src="/images/Pichwai-collection.png" alt="Pichwai pottery collection" loading="lazy">
                <div class="collection-overlay">
                    <div class="collection-tag">Festival of Colors</div>
                    <h3 class="collection-name">Pichwai Collection</h3>
                    <p class="collection-desc">Vibrant, color-splashed pottery that capture the joyous energy of Pichwai — bowls, plates, and serving ware bursting with life.</p>
                </div>
            </a>
            <a href="/collections/christmas" class="collection-card" style="text-decoration:none;">
                <img src="/images/christmas-collection.png" alt="Christmas pottery collection" loading="lazy">
                <div class="collection-overlay">
                    <div class="collection-tag">Winter Warmth</div>
                    <h3 class="collection-name">Christmas Collection</h3>
                    <p class="collection-desc">Cozy Pichwaiday mugs, ornament bowls, and festive plates in rich reds, greens, and cream — the perfect gifts for the season.</p>
                </div>
            </a>
        </div>
    </section>

    <!-- Achievements Section -->
    <section id="achievements" class="achievements">
        <div class="section-header">
            <div class="section-subtitle">Our Pride</div>
            <h2 class="section-title">Achievements & Milestones</h2>
            <p class="section-description">A glimpse into the recognition and milestones that mark our journey of craftsmanship and creativity.</p>
        </div>
        <div class="achievements-preview-grid">
            <div class="gallery-item achievement-card">
                <img src="/images/achievements/achievement0.png" alt="A token of appreciation at PAC by PDKF" loading="lazy">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">PAC Recognition</h3>
                    <p class="gallery-description">A token of appreciation at the Princess Artisan Collective (PAC) by the Princess Diya Kumari Foundation</p>
                </div>
            </div>
            <div class="gallery-item achievement-card">
                <img src="/images/achievements/achievement1.png" alt="With Honourable CM of Rajasthan" loading="lazy">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Honourable CM of Rajasthan</h3>
                    <p class="gallery-description">Presenting our most revered piece to Shri Bhajan Lal Sharma</p>
                </div>
            </div>
            <div class="gallery-item achievement-card">
                <img src="/images/achievements/achievement2.png" alt="With Col. Raghvendra Rathore" loading="lazy">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Col. Raghvendra Rathore</h3>
                    <p class="gallery-description">In conversation with Col. Raghvendra Rathore</p>
                </div>
            </div>
            <div class="gallery-item achievement-card">
                <img src="/images/achievements/achievement4.png" alt="Felicitated at IIDC" loading="lazy">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">IIDC Felicitation</h3>
                    <p class="gallery-description">Felicitated at the India Institute Design Conclave (IIDC)</p>
                </div>
            </div>
        </div>
        <div class="view-all-wrapper">
            <a href="/achievements" class="view-all-btn">View All Achievements →</a>
        </div>
    </section>

    <!-- Hands-On Section -->
    <section class="hands-on">
        <div class="section-header">
            <div class="section-subtitle">Get Your Hands Dirty</div>
            <h2 class="section-title">Hands-On Experience</h2>
            <p class="section-description">Step into our studio and discover the joy of creating with pottery. Our workshops welcome beginners and experienced potters alike.</p>
        </div>
        <div class="hands-on-content">
            <div class="hands-on-image">
                <img src="/images/hands-on-workshop.png" alt="Customers enjoying pottery workshop" loading="lazy">
            </div>
            <div class="hands-on-text">
                <h3>Create Your Own Masterpiece</h3>
                <p>There's something magical about shaping pottery with your own hands. Our guided pottery sessions let you experience the ancient art of pottery in a welcoming, creative environment.</p>
                <p>Whether you're looking for a unique date idea, a team-building activity, or simply a creative escape — we've got you covered. No experience needed!</p>
                <a href="/hands-on" class="hands-on-cta">View Workshop Gallery →</a>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div class="section-header">
            <div class="section-subtitle">Testimonials</div>
            <h2 class="section-title">What Our Customers Say</h2>
            <p class="section-description">Hear from those who have brought our pottery into their homes and lives.</p>
        </div>
        <div class="testimonials-container">
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Visiting the Tanzy's Blue Pottery home studio at Vaishali Nagar, Jaipur was a fantastic experience! The studio is filled with incredibly beautiful pieces, from delicate bowls and plates to stunning vases and decorative items.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">N</div>
                    <div class="author-info">
                        <h4>Nupur Sareen</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Their collection of blue pottery is exquisite and the designs are very earthy. Kudos to Tanya for putting in effort to revive this slowly dying art. Absolutely loved interacting with her and working with her.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">S</div>
                    <div class="author-info">
                        <h4>Shivani Kapoor</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">I recently had the pleasure of purchasing a blue pottery Rakhi from Tanzy Blue Pottery, and I must say, it was truly a one-of-a-kind product. A unique Rakhi experience!</p>
                <div class="testimonial-author">
                    <div class="author-avatar">R</div>
                    <div class="author-info">
                        <h4>Rashmi Gopinathan</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Their collection of blue pottery is stunning, with intricate designs and vibrant colors. The craftsmanship is exceptional, and each piece is unique. The staff is friendly and helpful, making the shopping experience enjoyable. Highly recommended!</p>
                <div class="testimonial-author">
                    <div class="author-avatar">A</div>
                    <div class="author-info">
                        <h4>Anmol Shekhawat</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Tanzy's blue pottery is a wonderful initiative to revive the ancient art of making blue pottery. Love the stuff they make. Beautiful designs and quality products are their mark of fabric.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">C</div>
                    <div class="author-info">
                        <h4>Charu Bhatia</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Amazing collection of Blue Pottery art pieces. Excellent amalgamation of traditional & contemporary art. Must have items for home.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">B</div>
                    <div class="author-info">
                        <h4>Brij Parmar</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Very unique and amazing pottery art, filled with handmade works. It is a must visit place if you wish to buy authentic blue pottery.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">R</div>
                    <div class="author-info">
                        <h4>Rupal Shekhawat</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Traditional & Innovative — a rare combination. Highly recommended for both the art connoisseur & one who simply wants to make the home look classy!</p>
                <div class="testimonial-author">
                    <div class="author-avatar">M</div>
                    <div class="author-info">
                        <h4>Murali Raghavan</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Amazing eye for detail. Very happy to see youngsters preserve and take forward the forgotten craft of Rajasthan.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">A</div>
                    <div class="author-info">
                        <h4>Anurag Surana</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-stars">★★★★★</div>
                <p class="testimonial-text">Really love the collection, the designs and quality is exceptional.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">P</div>
                    <div class="author-info">
                        <h4>Priyansh Kacholia</h4>
                        <p>Google Review</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="section-header">
            <div class="section-subtitle">Get in Touch</div>
            <h2 class="section-title">Let's Create Together</h2>
            <p class="section-description">Whether you're looking for a custom piece or have questions about our work, we'd love to hear from you.</p>
        </div>
        <div class="contact-content">
            <div class="contact-info">
                <h3>Visit Our Studio</h3>
                <p>Come see our artisans at work and experience the magic of pottery-making firsthand. We welcome visitors and offer workshops for all skill levels.</p>
                <div class="contact-details">
                    <div class="contact-item">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=Flat+Number+T-5+Park+Sundaram+Aditya+Vihar+Road,+Gandhi+Path+Rd,+Vaishali+Nagar,+Jaipur,+Rajasthan+302021" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:flex-start;gap:1rem;text-decoration:none;color:inherit;">
                            <div class="contact-icon"><img src="/images/location.svg" alt="Location" style="width:1em;height:1em;vertical-align:middle;"></div>
                            <div class="contact-item-text">
                                <h4>Location</h4>
                                <p>Flat No. T-5, Park Sundaram, Aditya Vihar Road, Gandhi Path Rd, Vaishali Nagar, Jaipur, Rajasthan 302021</p>
                            </div>
                        </a>
                    </div>
                    <div class="contact-item">
                        <a href="mailto:tanya.bhasin50@gmail.com" style="display:flex;align-items:flex-start;gap:1rem;text-decoration:none;color:inherit;">
                            <div class="contact-icon"><img src="/images/email.svg" alt="Email" style="width:1em;height:1em;vertical-align:middle;"></div>
                            <div class="contact-item-text">
                                <h4>Email</h4>
                                <p>tanya.bhasin50@gmail.com</p>
                            </div>
                        </a>
                    </div>
                    <div class="contact-item">
                        <a href="https://www.instagram.com/tanzy.bloo/" target="_blank" rel="noopener noreferrer" style="display:flex;align-items:flex-start;gap:1rem;text-decoration:none;color:inherit;">
                            <div class="contact-icon"><img src="/images/instagram.svg" alt="Instagram" style="width:1em;height:1em;vertical-align:middle;"></div>
                            <div class="contact-item-text">
                                <h4>Instagram</h4>
                                <p>@tanzy.bloo</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="contact-form">
                <form>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="phone" id="phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-brand">
                <h3>Tanzy's Blue Pottery</h3>
                <p>Crafting beautiful, functional pottery that brings artistry into everyday life. Each piece is a unique expression of our passion for pottery.</p>
                <div class="social-links">
                    <a href="https://www.instagram.com/tanzy.bloo/" class="social-link" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.svg" alt="Instagram" style="width:1em;height:1em;vertical-align:middle;"></a>
                </div>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/hands-on">Hands On</a></li>
                    <li><a href="/achievements">Achievements</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Collections</h4>
                <ul>
                    <li><a href="/collections/diwali">Diwali Collection</a></li>
                    <li><a href="/collections/pichwai">Pichwai Collection</a></li>
                    <li><a href="/collections/christmas">Christmas Collection</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Information</h4>
                <ul>
                    
                    <li><a href="/faq">FAQs</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Tanzy's Blue Pottery. All rights reserved. Handcrafted with love.</p>
        </div>
    </footer>

`
            }}
        />
    );
}
