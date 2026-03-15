'use client';

import { useEffect } from 'react';

export default function AboutPage() {
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

        const animatedElements = document.querySelectorAll('.founder-card, .fade-in');
        animatedElements.forEach((el) => observer.observe(el));

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
            animatedElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
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
    <nav class="sub-page-nav">
        <a href="/" class="logo" style="text-decoration:none;">Tanzy's Blue Pottery</a>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li class="nav-dropdown">
                <a href="/#collections">Collections <span class="dropdown-arrow"></span></a>
                <ul class="dropdown-menu">
                    <li><a href="/collections/diwali">Diwali Collection</a></li>
                    <li><a href="/collections/holi">Holi Collection</a></li>
                    <li><a href="/collections/christmas">Christmas Collection</a></li>
                </ul>
            </li>
            <li><a href="/hands-on">Hands On</a></li>
            <li><a href="/#contact">Contact</a></li>
        </ul>
        <button class="hamburger-btn" id="hamburger-btn" aria-label="Open menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    </nav>

    <div class="mobile-nav-menu" id="mobile-nav-menu">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/#about">About</a></li>
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
            <li><a href="/#contact">Contact</a></li>
        </ul>
    </div>

    <!-- Page Hero -->
    <section class="sub-page-hero">
        <h1>About Us</h1>
        <p>Meet the passionate people behind Tanzy's Blue Pottery — a journey fueled by love for clay, art, and tradition.</p>
    </section>

    <!-- Founders Section -->
    <div class="founder-section">
        <!-- Founder -->
        <div class="founder-card">
            <div class="founder-img">
                <img src="/images/founder.png" alt="Tanzy - Founder of Tanzy's Blue Pottery">
            </div>
            <div class="founder-info">
                <h3>Tanzy Sharma</h3>
                <span class="founder-role">Founder & Lead Artisan</span>
                <p>With over 20 years of experience in the art of pottery, Tanzy founded Tanzy's Blue Pottery with a vision to bring traditional Indian blue pottery techniques to a modern audience. Her journey began in a small studio in Jaipur, where she spent years learning from master artisans.</p>
                <p>Tanzy's passion goes beyond creating beautiful pieces — she believes in preserving India's rich ceramic heritage while making it accessible and relevant for today's homes. Her signature style blends intricate Rajasthani patterns with contemporary minimalism.</p>
                <p>Under her leadership, Tanzy's Blue Pottery has grown from a one-woman studio to a collaborative space where tradition meets innovation, and every piece carries a story shaped by decades of dedication.</p>
            </div>
        </div>

        <!-- Co-Founder -->
        <div class="founder-card reverse">
            <div class="founder-img">
                <img src="/images/cofounder.png" alt="Arjun - Co-Founder of Tanzy's Blue Pottery">
            </div>
            <div class="founder-info">
                <h3>Arjun Mehta</h3>
                <span class="founder-role">Co-Founder & Creative Director</span>
                <p>Arjun joined Tanzy's Blue Pottery with a background in design and a deep appreciation for handmade craftsmanship. His eye for contemporary design and understanding of modern aesthetics complements Tanzy's traditional expertise perfectly.</p>
                <p>He oversees the creative direction of every collection, ensuring that each piece is not only artistically beautiful but also functionally designed for everyday use. Arjun is passionate about creating pottery that seamlessly fits into modern living spaces.</p>
                <p>Together with Tanzy, he has introduced workshops and hands-on experiences that allow customers to connect with the ancient art of pottery firsthand — turning passive appreciation into active creation.</p>
            </div>
        </div>
    </div>

    <!-- Store Gallery -->
    <section class="store-gallery">
        <h2>Our Studio & Store</h2>
        <div class="store-images">
            <div class="store-img">
                <img src="/images/store-interior.png" alt="Inside the Tanzy's Blue Pottery pottery studio">
            </div>
            <div class="store-img">
                <img src="https://images.unsplash.com/photo-1767476106330-4e5a0b4dcf94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTY4NzZ8MHwxfHNlYXJjaHwyfHxwb3R0ZXJ5JTIwd29ya3Nob3AlMjBhcnRpc2FufGVufDF8fHx8MTc3MzMwMTk3OXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Pottery workshop area">
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="footer-content">
            <div class="footer-brand">
                <h3>Tanzy's Blue Pottery</h3>
                <p>Crafting beautiful, functional pottery that brings artistry into everyday life.</p>
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
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/hands-on">Hands On</a></li>
                    <li><a href="/#contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Collections</h4>
                <ul>
                    <li><a href="/#collections">Diwali Collection</a></li>
                    <li><a href="/#collections">Holi Collection</a></li>
                    <li><a href="/#collections">Christmas Collection</a></li>
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
