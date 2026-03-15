'use client';

import { useEffect } from 'react';
{/* <img src="https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBhcnRpc2FufGVufDF8fHx8MTc3MzMwMTk3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Artisan hands shaping clay" loading="lazy" onerror="this.style.display='none'"></img> */}
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
            '.section-header, .about-image, .about-text, .gallery-item, .process-step, .testimonial-card, .contact-info, .contact-form, .fade-in, .hands-on-image, .hands-on-text, .collection-card'
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
        <a href="/" class="logo" style="text-decoration:none;">Tanzy's Blue Pottery</a>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li class="nav-dropdown">
                <a href="#collections">Collections <span class="dropdown-arrow"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="/collections/diwali">Diwali Collection</a></li>
                    <li><a href="/collections/holi">Holi Collection</a></li>
                    <li><a href="/collections/christmas">Christmas Collection</a></li>
                </ul>
            </li>
            <li><a href="/hands-on">Hands On</a></li>
            <li><a href="#process">Process</a></li>
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
                    <li><a href="/collections/holi">Holi</a></li>
                    <li><a href="/collections/christmas">Christmas</a></li>
                </ul>
            </li>
            <li><a href="/hands-on">Hands On</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </div>

    <!-- Hero Section with Carousel -->
    <section id="home" class="hero">
        <div class="hero-carousel">
            <div class="carousel-slide active">
                <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjBoYW5kbWFkZXxlbnwxfDB8fHwxNzczMzAxOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Handcrafted pottery collection" loading="eager">
            </div>
            <div class="carousel-slide">
                <img src="https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBhcnRpc2FufGVufDF8fHx8MTc3MzMwMTk3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Artisan pottery workshop" loading="eager">
            </div>
            <div class="carousel-slide">
                <img src="https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjBoYW5kbWFkZXxlbnwxfDB8fHwxNzczMzAxOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Blue ceramic artisan vase" loading="eager">
            </div>
        </div>
        <div class="carousel-dots">
            <button class="carousel-dot active" aria-label="Slide 1"></button>
            <button class="carousel-dot" aria-label="Slide 2"></button>
            <button class="carousel-dot" aria-label="Slide 3"></button>
        </div>
        <div class="hero-content">
            <div class="hero-subtitle">Handcrafted with Love</div>
            <h1 class="hero-title">Where Clay Meets <strong>Art</strong></h1>
            <p class="hero-description">Each piece tells a story, shaped by skilled hands and fired with passion. Discover the timeless beauty of artisanal pottery.</p>
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
            <p class="section-description">At Tanzy's Blue Pottery, we believe in the transformative power of clay. Each piece is a unique expression of artistry and tradition.</p>
        </div>
        <div class="about-content">
            <div class="about-image">
                <div class="about-image-wrapper">
                    <img src="/images/aboutImage.JPG" alt="Artisan hands shaping clay" loading="lazy" onerror="this.style.display='none'">
                </div>
            </div>
            <div class="about-text">
                <h3>Timeless Craftsmanship Meets Modern Design</h3>
                <p>Every creation begins with raw earth and endless possibility. Our artisans pour years of experience and boundless creativity into each piece, ensuring that what you bring home is not just pottery, but a work of art.</p>
                <p>We honor traditional techniques while embracing contemporary aesthetics, creating pieces that are both functional and beautiful. From the first touch of clay to the final glaze, we're committed to excellence at every stage.</p>
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
                            <p>We use sustainable, earth-friendly clays and glazes</p>
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
            <div class="gallery-item">
                <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjBoYW5kbWFkZXxlbnwxfDB8fHwxNzczMzAxOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Marbled ceramic vases" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Marbled Vases</h3>
                    <p class="gallery-description">Unique decorative pieces with organic patterns</p>
                </div>
            </div>
            <div class="gallery-item">
                <img src="https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjBoYW5kbWFkZXxlbnwxfDB8fHwxNzczMzAxOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Blue ceramic vase" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Artisan Vases</h3>
                    <p class="gallery-description">Handcrafted with distinctive blue glazes</p>
                </div>
            </div>
            <div class="gallery-item">
                <img src="https://images.unsplash.com/photo-1766499670904-edab815e8fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBhcnRpc2FufGVufDF8fHx8MTc3MzMwMTk3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Traditional pottery workshop" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Traditional Forms</h3>
                    <p class="gallery-description">Classic shapes with timeless appeal</p>
                </div>
            </div>
            <div class="gallery-item">
                <img src="https://images.unsplash.com/photo-1771830937946-2f0de3d5673b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwYm93bHMlMjBwbGF0ZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NzMzMDE5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Ceramic collection display" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Dining Collections</h3>
                    <p class="gallery-description">Elegant tableware for everyday luxury</p>
                </div>
            </div>
            <div class="gallery-item">
                <img src="https://images.unsplash.com/photo-1772455443246-46e9a461e5ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxjZXJhbWljJTIwYm93bHMlMjBwbGF0ZXMlMjBoYW5kbWFkZXxlbnwxfHx8fDE3NzMzMDE5ODB8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Assorted ceramic bowls" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Bowl Collection</h3>
                    <p class="gallery-description">Functional art for your kitchen</p>
                </div>
            </div>
            <div class="gallery-item">
                <img src="https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBhcnRpc2FufGVufDF8fHx8MTc3MzMwMTk3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Potter shaping clay" loading="lazy" onerror="this.style.display='none'">
                <div class="gallery-overlay">
                    <h3 class="gallery-title">Custom Creations</h3>
                    <p class="gallery-description">Made to order with your vision in mind</p>
                </div>
            </div>
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
                    <p class="collection-desc">Handcrafted diyas, lanterns, and decorative pieces in deep blue and gold, perfect for illuminating your celebrations.</p>
                </div>
            </a>
            <a href="/collections/holi" class="collection-card" style="text-decoration:none;">
                <img src="/images/holi-collection.png" alt="Holi pottery collection" loading="lazy">
                <div class="collection-overlay">
                    <div class="collection-tag">Festival of Colors</div>
                    <h3 class="collection-name">Holi Collection</h3>
                    <p class="collection-desc">Vibrant, color-splashed ceramics that capture the joyous energy of Holi — bowls, plates, and serving ware bursting with life.</p>
                </div>
            </a>
            <a href="/collections/christmas" class="collection-card" style="text-decoration:none;">
                <img src="/images/christmas-collection.png" alt="Christmas pottery collection" loading="lazy">
                <div class="collection-overlay">
                    <div class="collection-tag">Winter Warmth</div>
                    <h3 class="collection-name">Christmas Collection</h3>
                    <p class="collection-desc">Cozy holiday mugs, ornament bowls, and festive plates in rich reds, greens, and cream — the perfect gifts for the season.</p>
                </div>
            </a>
        </div>
    </section>

    <!-- Process Section -->
    <section id="process" class="process">
        <div class="section-header">
            <div class="section-subtitle">Our Process</div>
            <h2 class="section-title">From Clay to Creation</h2>
            <p class="section-description">Every piece goes through a meticulous journey, guided by skilled hands and refined by fire.</p>
        </div>
        <div class="process-steps">
            <div class="process-step">
                <div class="process-number">01</div>
                <h3>Shaping</h3>
                <p>We begin with raw clay, shaping it with precision on the potter's wheel or by hand, allowing the material to guide our creative vision.</p>
            </div>
            <div class="process-step">
                <div class="process-number">02</div>
                <h3>Drying</h3>
                <p>The piece is carefully dried to prevent cracking, a patient process that can't be rushed, ensuring structural integrity.</p>
            </div>
            <div class="process-step">
                <div class="process-number">03</div>
                <h3>Glazing</h3>
                <p>We apply unique glazes that will transform in the kiln, creating stunning colors and textures that make each piece distinctive.</p>
            </div>
            <div class="process-step">
                <div class="process-number">04</div>
                <h3>Firing</h3>
                <p>The final transformation happens in the kiln at high temperatures, where earth becomes art, and clay becomes timeless beauty.</p>
            </div>
        </div>
    </section>

    <!-- Hands-On Section -->
    <section class="hands-on">
        <div class="section-header">
            <div class="section-subtitle">Get Your Hands Dirty</div>
            <h2 class="section-title">Hands-On Experience</h2>
            <p class="section-description">Step into our studio and discover the joy of creating with clay. Our workshops welcome beginners and experienced potters alike.</p>
        </div>
        <div class="hands-on-content">
            <div class="hands-on-image">
                <img src="/images/hands-on-workshop.png" alt="Customers enjoying pottery workshop" loading="lazy">
            </div>
            <div class="hands-on-text">
                <h3>Create Your Own Masterpiece</h3>
                <p>There's something magical about shaping clay with your own hands. Our guided pottery sessions let you experience the ancient art of ceramics in a welcoming, creative environment.</p>
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
                <p class="testimonial-text">The quality and attention to detail is extraordinary. Every piece I've purchased has become a treasured part of my home. The craftsmanship is unparalleled.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">S</div>
                    <div class="author-info">
                        <h4>Sarah Mitchell</h4>
                        <p>Interior Designer</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <p class="testimonial-text">I ordered a custom set for my restaurant and the response from guests has been incredible. These pieces aren't just functional—they're conversation starters.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">M</div>
                    <div class="author-info">
                        <h4>Michael Chen</h4>
                        <p>Restaurant Owner</p>
                    </div>
                </div>
            </div>
            <div class="testimonial-card">
                <p class="testimonial-text">As an artist myself, I deeply appreciate the skill and artistry in every piece. The glazes are stunning, and each creation is truly unique.</p>
                <div class="testimonial-author">
                    <div class="author-avatar">E</div>
                    <div class="author-info">
                        <h4>Emma Rodriguez</h4>
                        <p>Art Collector</p>
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
                        <div class="contact-icon"><img src="/images/location.svg" alt="Location" style="width:1em;height:1em;vertical-align:middle;"></div>
                        <div class="contact-item-text">
                            <h4>Location</h4>
                            <p>Visit us at our studio</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon"><img src="/images/email.svg" alt="Email" style="width:1em;height:1em;vertical-align:middle;"></div>
                        <div class="contact-item-text">
                            <h4>Email</h4>
                            <p>hello@tanzysbl.com</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📞</div>
                        <div class="contact-item-text">
                            <h4>Phone</h4>
                            <p>Get in touch by phone</p>
                        </div>
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
                <p>Crafting beautiful, functional pottery that brings artistry into everyday life. Each piece is a unique expression of our passion for clay.</p>
                <div class="social-links">
                    <a href="#" class="social-link">f</a>
                    <a href="#" class="social-link">𝕏</a>
                    <a href="#" class="social-link">in</a>
                    <a href="#" class="social-link"><img src="/images/instagram.svg" alt="Instagram" style="width:1em;height:1em;vertical-align:middle;"></a>

                </div>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/hands-on">Hands On</a></li>
                    <li><a href="#process">Process</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Collections</h4>
                <ul>
                    <li><a href="/collections/diwali">Diwali Collection</a></li>
                    <li><a href="/collections/holi">Holi Collection</a></li>
                    <li><a href="/collections/christmas">Christmas Collection</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Information</h4>
                <ul>
                    <li><a href="#">Care Instructions</a></li>
                    <li><a href="#">FAQs</a></li>
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
