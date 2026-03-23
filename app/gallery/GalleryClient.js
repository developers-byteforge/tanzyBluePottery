'use client';

import { useEffect } from 'react';
import { setupLightbox } from '../components/lightbox';

export default function GalleryClient({ categories }) {
    useEffect(() => {
        const cleanupLightbox = setupLightbox('.gallery-category-grid');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        const items = document.querySelectorAll('.gallery-item, .gallery-category-header, .fade-in');
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

        // Scroll to hash on load
        if (window.location.hash) {
            setTimeout(() => {
                const target = document.querySelector(window.location.hash);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }

        return () => {
            cleanupLightbox();
            items.forEach((el) => observer.unobserve(el));
            observer.disconnect();
            if (hamburgerBtn) hamburgerBtn.removeEventListener('click', hamburgerToggle);
            mobileNavLinks.forEach((link) => link.removeEventListener('click', closeMenu));
            if (mobileDropdownToggle) mobileDropdownToggle.removeEventListener('click', mobileDropdownHandler);
            document.body.style.overflow = '';
        };
    }, []);

    const categoriesHTML = categories
        .map((cat) => {
            if (cat.images.length === 0) return '';

            const imagesHTML = cat.images
                .map(
                    (src, i) => `
          <div class="gallery-item" style="transition-delay: ${i * 0.08}s;">
            <img src="${src}" alt="${cat.title} piece ${i + 1}" loading="lazy">
            <div class="gallery-overlay">
              <h3 class="gallery-title">${cat.title}</h3>
            </div>
          </div>`
                )
                .join('');

            return `
        <section id="${cat.key}" class="gallery-category">
            <div class="gallery-category-header">
                <h2>${cat.title}</h2>
                <p>${cat.description}</p>
            </div>
            <div class="gallery-category-grid">
                ${imagesHTML}
            </div>
        </section>`;
        })
        .join('');

    const hasAnyImages = categories.some((cat) => cat.images.length > 0);

    const emptyState = !hasAnyImages
        ? `<div class="gallery-empty">
            <p>Gallery images coming soon! Add images to the category folders inside <code>public/images/gallery/</code> and they will appear here automatically.</p>
            <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.7;">Folders: marbled-vases, artisan-vases, traditional-forms, dining-collections, bowl-collection, custom-creations</p>
           </div>`
        : '';

    // Quick-nav links for categories that have images
    const quickNavHTML = categories
        .filter((cat) => cat.images.length > 0)
        .map((cat) => `<a href="#${cat.key}" class="gallery-quick-link">${cat.title}</a>`)
        .join('');

    const quickNav = quickNavHTML
        ? `<div class="gallery-quick-nav">${quickNavHTML}</div>`
        : '';

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: `
    <!-- Navigation -->
    <nav class="sub-page-nav">
       <a href="/" class="logo" style="text-decoration:none;"><img src="/logo.jpeg" alt="Tanzy's Blue Pottery"></a>        <ul class="nav-links">
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
        <h1>Our Full Gallery</h1>
        <p>Browse our complete collection of handcrafted pottery, organized by category.</p>
    </section>

    ${quickNav}

    <!-- Category Sections -->
    ${categoriesHTML}
    ${emptyState}

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
                    <li><a href="/achievements">Achievements</a></li>
                    <li><a href="/#contact">Contact</a></li>
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
