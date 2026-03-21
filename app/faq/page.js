'use client';

import { useEffect } from 'react';

const FAQ_DATA = [
    {
        question: 'What is Blue Pottery made of?',
        answer: 'Unlike regular ceramics, Blue Pottery is non-clay based. It is made using a unique blend of quartz stone powder, glass, multani mitti, and natural gums — giving it that distinctive smooth finish.',
    },
    {
        question: 'Is Blue Pottery fragile?',
        answer: 'Yes, it is relatively delicate. Since it isn\'t made from clay — so, gentle handling is key.',
    },
    {
        question: 'Can it be used for food?',
        answer: 'Our pieces are best suited for dry or semi-dry food items.',
    },
    {
        question: 'Is it microwave or dishwasher safe?',
        answer: 'No, Blue Pottery should be kept away from microwaves, ovens, and dishwashers. Handwashing is always recommended.',
    },
    {
        question: 'Will the colours fade over time?',
        answer: 'Not if cared for properly. The vibrant blue comes from traditional pigments and stays intact with gentle use and proper care.',
    },
    {
        question: 'Is each piece exactly the same?',
        answer: 'No — and that\'s the beauty of it. Each piece is handcrafted, so slight variations in design, colour, or finish are natural and make every item unique.',
    },
    {
        question: 'Where is your Blue Pottery made?',
        answer: 'All our pieces are crafted by skilled artisans in Jaipur, keeping the traditional art form alive while supporting artisan communities.',
    },
    {
        question: 'Why are there slight imperfections?',
        answer: 'These are not flaws, but marks of a handmade process. They reflect the human touch behind every piece.',
    },
];

export default function FAQPage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        const items = document.querySelectorAll('.faq-item, .fade-in');
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

        // FAQ accordion
        const faqToggles = document.querySelectorAll('.faq-question');
        const faqToggleHandler = function () {
            const item = this.closest('.faq-item');
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach((el) => el.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        };
        faqToggles.forEach((toggle) => toggle.addEventListener('click', faqToggleHandler));

        return () => {
            items.forEach((el) => observer.unobserve(el));
            observer.disconnect();
            if (hamburgerBtn) hamburgerBtn.removeEventListener('click', hamburgerToggle);
            mobileNavLinks.forEach((link) => link.removeEventListener('click', closeMenu));
            if (mobileDropdownToggle) mobileDropdownToggle.removeEventListener('click', mobileDropdownHandler);
            faqToggles.forEach((toggle) => toggle.removeEventListener('click', faqToggleHandler));
            document.body.style.overflow = '';
        };
    }, []);

    const faqHTML = FAQ_DATA
        .map(
            ({ question, answer }, i) => `
        <div class="faq-item" style="transition-delay: ${i * 0.08}s;">
            <button class="faq-question">
                <span>${question}</span>
                <span class="faq-icon">+</span>
            </button>
            <div class="faq-answer">
                <p>${answer}</p>
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
                    <li><a href="/collections/holi">Holi</a></li>
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
        <h1>Frequently Asked Questions</h1>
        <p>Everything you need to know about Blue Pottery — its craft, care, and character.</p>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
        <div class="faq-container">
            ${faqHTML}
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
                    <li><a href="/achievements">Achievements</a></li>
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
