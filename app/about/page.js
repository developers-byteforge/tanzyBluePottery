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
                    <li><a href="/collections/pichwai">Pichwai Collection</a></li>
                    <li><a href="/collections/christmas">Christmas Collection</a></li>
                </ul>
            </li>
            <li><a href="/hands-on">Hands On</a></li>
            <li><a href="/achievements">Achievements</a></li>
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
                    <li><a href="/collections/pichwai">Pichwai</a></li>
                    <li><a href="/collections/christmas">Christmas</a></li>
                </ul>
            </li>
            <li><a href="/hands-on">Hands On</a></li>
            <li><a href="/achievements">Achievements</a></li>
            <li><a href="/#contact">Contact</a></li>
        </ul>
    </div>

    <!-- Page Hero -->
    <section class="sub-page-hero">
        <h1>About Us</h1>
        <p>Meet the passionate people behind Tanzy's Blue Pottery — a journey fueled by love for pottery, art, and tradition.</p>
    </section>

    <!-- Founders Section -->
    <div class="founder-section">
        <!-- Founder -->
        <div class="founder-card">
            <div class="founder-img">
                <img src="/images/founder.png" alt="Tanzy - Founder of Tanzy's Blue Pottery">
            </div>
            <div class="founder-info">
                <h3>Tanya Bhasin</h3>
                <p>Tanya Bhasin is the founder and driving force behind Tanzy’s Blue Pottery (TBP), a venture dedicated to reviving the traditional craft of Jaipur’s Blue Pottery. Her journey began while pursuing her Master’s degree, when a research project on dying art forms introduced her to the struggles faced by local artisans. Moved by their circumstances, she founded TBP with a mission to preserve this heritage craft while creating meaningful employment opportunities, especially for women artisans
</p>
            </div>
        </div>

        <!-- Co-Founder -->
        <div class="founder-card reverse">
            <div class="founder-img">
                <img src="/images/cofounder.png" alt="Arjun - Co-Founder of Tanzy's Blue Pottery">
            </div>
            <div class="founder-info">
                <h3>Reema Bhasin</h3>
                <p>Reema Bhasin is the Co-founder of Tanzy’s Blue Pottery (TBP), where she plays a key role in nurturing the brand’s vision of preserving Jaipur’s iconic blue pottery while supporting and empowering artisan communities. Without her unwavering support, the brand wouldn’t be where it is right now. She oversees the creative direction of every collection, ensuring that each piece is not only artistically beautiful but also functionally designed for everyday use. Reema is passionate about creating pottery that seamlessly fits into modern living spaces.
Together with Tanya, she has introduced workshops and hands-on experiences that allow customers to connect with the ancient art of pottery firsthand — turning passive appreciation into active creation.
</p>
            </div>
        </div>
    </div>

    <!-- Store Gallery -->
    <section class="store-gallery">
        <h2>Our Studio & Store</h2>
        <div class="store-images">
            <div class="store-img">
                <img src="/images/workingPlace1.jpeg" alt="Inside the Tanzy's Blue Pottery pottery studio">
            </div>
            <div class="store-img">
                <img src="/images/workingPlace2.jpeg" alt="Pottery workshop area">
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
                    <a href="https://www.instagram.com/tanzy.bloo/" class="social-link" target="_blank" rel="noopener noreferrer"><img src="/images/instagram.svg" alt="Instagram" style="width:1em;height:1em;vertical-align:middle;"></a>
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
                    <li><a href="/#collections">Pichwai Collection</a></li>
                    <li><a href="/#collections">Christmas Collection</a></li>
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
