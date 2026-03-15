'use client';

import { useEffect } from 'react';

export default function GalleryClient({ images }) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        const items = document.querySelectorAll('.gallery-item, .fade-in');
        items.forEach((el) => observer.observe(el));

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
            items.forEach((el) => observer.unobserve(el));
            observer.disconnect();
            if (hamburgerBtn) hamburgerBtn.removeEventListener('click', hamburgerToggle);
            mobileNavLinks.forEach((link) => link.removeEventListener('click', closeMenu));
            if (mobileDropdownToggle) mobileDropdownToggle.removeEventListener('click', mobileDropdownHandler);
            document.body.style.overflow = '';
        };
    }, []);

    const galleryHTML = images
        .map(
            (src, i) => `
      <div class="gallery-item" style="transition-delay: ${i * 0.08}s;">
        <img src="${src}" alt="Pottery piece ${i + 1}" loading="lazy">
        <div class="gallery-overlay">
        </div>
      </div>`
        )
        .join('');

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
        <h1>Our Full Gallery</h1>
        <p>Browse our complete collection of handcrafted pottery — from signature vases to seasonal specials.</p>
    </section>

    <!-- Dynamic Gallery Grid -->
    <div class="full-gallery-grid">
        ${galleryHTML}
    </div>

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
