'use client';

import { useEffect } from 'react';

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
      '.section-header, .about-image, .about-text, .gallery-item, .process-step, .testimonial-card, .contact-info, .contact-form, .fade-in'
    );

    animatedElements.forEach((el) => observer.observe(el));

    const anchorHandler = function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', anchorHandler);
    });

    const contactForm = document.querySelector('.contact-form form');
    const formHandler = (e) => {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    };

    if (contactForm) {
      contactForm.addEventListener('submit', formHandler);
    }

    const scrollHandler = () => {
      const scrolled = window.pageYOffset;
      const heroBackground = document.querySelector('.hero-bg');
      if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
      anchors.forEach((anchor) => {
        anchor.removeEventListener('click', anchorHandler);
      });
      if (contactForm) {
        contactForm.removeEventListener('submit', formHandler);
      }
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `
    <!-- Navigation -->
    <nav>
        <div class="logo">Tanzy's Bl...</div>
        <ul class="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#process">Process</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-bg">
            <img src="https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwxfHxwb3R0ZXJ5JTIwY2VyYW1pY3MlMjBoYW5kbWFkZXxlbnwxfDB8fHwxNzczMzAxOTcyfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="Pottery background" loading="lazy" onerror="this.style.display='none'">
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
            <p class="section-description">At Tanzy's Bl..., we believe in the transformative power of clay. Each piece is a unique expression of artistry and tradition.</p>
        </div>
        <div class="about-content">
            <div class="about-image">
                <div class="about-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBhcnRpc2FufGVufDF8fHx8MTc3MzMwMTk3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Artisan hands shaping clay" loading="lazy" onerror="this.style.display='none'">
                </div>
            </div>
            <div class="about-text">
                <h3>Timeless Craftsmanship Meets Modern Design</h3>
                <p>Every creation begins with raw earth and endless possibility. Our artisans pour years of experience and boundless creativity into each piece, ensuring that what you bring home is not just pottery, but a work of art.</p>
                <p>We honor traditional techniques while embracing contemporary aesthetics, creating pieces that are both functional and beautiful. From the first touch of clay to the final glaze, we're committed to excellence at every stage.</p>
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
                        <div class="contact-icon">📍</div>
                        <div class="contact-item-text">
                            <h4>Location</h4>
                            <p>Visit us at our studio</p>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📧</div>
                        <div class="contact-item-text">
                            <h4>Email</h4>
                            <p>hello@Tanzy's Bl....com</p>
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
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
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
                <h3>Tanzy's Bl...</h3>
                <p>Crafting beautiful, functional pottery that brings artistry into everyday life. Each piece is a unique expression of our passion for clay.</p>
                <div class="social-links">
                    <a href="#" class="social-link">f</a>
                    <a href="#" class="social-link">𝕏</a>
                    <a href="#" class="social-link">in</a>
                    <a href="#" class="social-link">📷</a>
                </div>
            </div>
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#process">Process</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Services</h4>
                <ul>
                    <li><a href="#">Custom Orders</a></li>
                    <li><a href="#">Workshops</a></li>
                    <li><a href="#">Private Events</a></li>
                    <li><a href="#">Corporate Gifts</a></li>
                    <li><a href="#">Shipping</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Information</h4>
                <ul>
                    <li><a href="#">Care Instructions</a></li>
                    <li><a href="#">Returns Policy</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                    <li><a href="#">FAQs</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Tanzy's Bl.... All rights reserved. Handcrafted with love.</p>
        </div>
    </footer>

`
      }}
    />
  );
}
