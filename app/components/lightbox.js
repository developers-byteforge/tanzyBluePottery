'use client';

export function setupLightbox(containerSelector = '.gallery-category-grid, .full-gallery-grid') {
    let currentImages = [];
    let currentIndex = 0;
    let isZoomed = false;

    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="Close">&times;</button>
        <div class="lightbox-counter"></div>
        <button class="lightbox-prev" aria-label="Previous">&#8249;</button>
        <button class="lightbox-next" aria-label="Next">&#8250;</button>
        <div class="lightbox-img-wrap">
            <img class="lightbox-img" src="" alt="" draggable="false">
        </div>
        <div class="lightbox-zoom-hint">Click image to zoom</div>
    `;
    document.body.appendChild(overlay);

    const imgEl = overlay.querySelector('.lightbox-img');
    const imgWrap = overlay.querySelector('.lightbox-img-wrap');
    const counter = overlay.querySelector('.lightbox-counter');
    const prevBtn = overlay.querySelector('.lightbox-prev');
    const nextBtn = overlay.querySelector('.lightbox-next');
    const closeBtn = overlay.querySelector('.lightbox-close');
    const zoomHint = overlay.querySelector('.lightbox-zoom-hint');

    function open(images, index) {
        currentImages = images;
        currentIndex = index;
        show(currentIndex);
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => zoomHint.classList.add('fade-out'), 2000);
    }

    function close() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
        zoomHint.classList.remove('fade-out');
    }

    function show(index) {
        currentIndex = index;
        resetZoom();
        imgEl.src = currentImages[index];
        imgEl.alt = `Image ${index + 1} of ${currentImages.length}`;
        counter.textContent = `${index + 1} / ${currentImages.length}`;
        prevBtn.style.display = currentImages.length > 1 ? '' : 'none';
        nextBtn.style.display = currentImages.length > 1 ? '' : 'none';
    }

    function prev() {
        show((currentIndex - 1 + currentImages.length) % currentImages.length);
    }

    function next() {
        show((currentIndex + 1) % currentImages.length);
    }

    function toggleZoom(e) {
        if (isZoomed) {
            resetZoom();
        } else {
            isZoomed = true;
            imgEl.classList.add('zoomed');
            imgWrap.classList.add('zoomed');
            panToPoint(e);
        }
    }

    function resetZoom() {
        isZoomed = false;
        imgEl.classList.remove('zoomed');
        imgWrap.classList.remove('zoomed');
        imgEl.style.transformOrigin = '';
    }

    function panToPoint(e) {
        const rect = imgWrap.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        imgEl.style.transformOrigin = `${x}% ${y}%`;
    }

    function onImgMouseMove(e) {
        if (!isZoomed) return;
        panToPoint(e);
    }

    // Touch swipe support
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    function onTouchStart(e) {
        if (isZoomed) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }

    function onTouchEnd(e) {
        if (isZoomed) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const dt = Date.now() - touchStartTime;
        if (dt < 400 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            dx > 0 ? prev() : next();
        }
    }

    function onKeyDown(e) {
        if (!overlay.classList.contains('active')) return;
        switch (e.key) {
            case 'Escape': close(); break;
            case 'ArrowLeft': prev(); break;
            case 'ArrowRight': next(); break;
        }
    }

    function onOverlayClick(e) {
        if (e.target === overlay || e.target === imgWrap) close();
    }

    // Attach event listeners
    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
    imgEl.addEventListener('click', (e) => { e.stopPropagation(); toggleZoom(e); });
    imgWrap.addEventListener('mousemove', onImgMouseMove);
    overlay.addEventListener('click', onOverlayClick);
    overlay.addEventListener('touchstart', onTouchStart, { passive: true });
    overlay.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('keydown', onKeyDown);

    // Attach click handlers to gallery items
    const containers = document.querySelectorAll(containerSelector);
    const clickHandlers = [];

    containers.forEach((container) => {
        const items = container.querySelectorAll('.gallery-item');
        const images = Array.from(items).map((item) => item.querySelector('img').src);

        items.forEach((item, i) => {
            const handler = (e) => {
                e.preventDefault();
                open(images, i);
            };
            item.addEventListener('click', handler);
            item.style.cursor = 'pointer';
            clickHandlers.push({ el: item, handler });
        });
    });

    return function cleanup() {
        closeBtn.removeEventListener('click', close);
        imgEl.removeEventListener('click', toggleZoom);
        imgWrap.removeEventListener('mousemove', onImgMouseMove);
        overlay.removeEventListener('click', onOverlayClick);
        overlay.removeEventListener('touchstart', onTouchStart);
        overlay.removeEventListener('touchend', onTouchEnd);
        document.removeEventListener('keydown', onKeyDown);
        clickHandlers.forEach(({ el, handler }) => el.removeEventListener('click', handler));
        overlay.remove();
    };
}
