document.addEventListener('DOMContentLoaded', function () {
    var emailButton = document.getElementById('email-button');
    var overlay = document.getElementById('contact-form-overlay');
    var closeButton = document.getElementById('close-form');
    var closeOverlay = document.getElementById('close-overlay');
    var form = document.getElementById('contact-form');
    var successText = document.querySelector('.form-success');

    if (emailButton && overlay && closeButton && closeOverlay && form && successText) {
        emailButton.addEventListener('click', function () {
            overlay.classList.remove('hidden');
        });

        function hideOverlay() {
            overlay.classList.add('hidden');
            successText.classList.add('hidden');
            form.reset();
        }

        closeButton.addEventListener('click', hideOverlay);
        closeOverlay.addEventListener('click', hideOverlay);

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = encodeURIComponent(form.name.value.trim());
            var email = encodeURIComponent(form.email.value.trim());
            var message = encodeURIComponent(form.message.value.trim());
            var subject = encodeURIComponent('New contact from portfolio');
            var body = 'Name: ' + name + '%0D%0A' +
                       'Email: ' + email + '%0D%0A%0D%0A' +
                       'Message: ' + message;

            window.location.href = 'mailto:pendon0044@gmail.com?subject=' + subject + '&body=' + body;
        });
    }

    // Gallery horizontal scroll
    var galleryTrack = document.getElementById('gallery-track');
    var galleryPrev = document.getElementById('gallery-prev');
    var galleryNext = document.getElementById('gallery-next');

    if (galleryTrack && galleryPrev && galleryNext) {
        function getScrollAmount() {
            var firstImage = galleryTrack.querySelector('.gallery-image');
            if (!firstImage) return 424;

            var imageWidth = firstImage.offsetWidth;
            var gap = 12; // same as CSS gap
            return (imageWidth + gap) * 2; // move 2 pictures
        }

        galleryNext.addEventListener('click', function () {
            galleryTrack.scrollBy({
                left: getScrollAmount(),
                behavior: 'smooth'
            });
        });

        galleryPrev.addEventListener('click', function () {
            galleryTrack.scrollBy({
                left: -getScrollAmount(),
                behavior: 'smooth'
            });
        });
    }
});
//lightbox
    // Lightbox
    var lightbox = document.getElementById('lightbox');
    var lightboxImage = document.getElementById('lightbox-image');
    var lightboxClose = document.getElementById('lightbox-close');
    var lightboxPrev = document.getElementById('lightbox-prev');
    var lightboxNext = document.getElementById('lightbox-next');
    var lightboxCounter = document.getElementById('lightbox-counter');
    var galleryImages = document.querySelectorAll('.gallery-image');
    var currentLightboxIndex = 0;

    function showLightbox(index) {
        currentLightboxIndex = index;
        lightboxImage.src = galleryImages[index].src;
        lightboxCounter.textContent = (index + 1) + ' / ' + galleryImages.length;
        lightbox.classList.remove('hidden');
    }

    function hideLightbox() {
        lightbox.classList.add('hidden');
    }

    function showNextImage() {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
        showLightbox(currentLightboxIndex);
    }

    function showPrevImage() {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightbox(currentLightboxIndex);
    }

    galleryImages.forEach(function (img, index) {
        img.addEventListener('click', function () {
            showLightbox(index);
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', hideLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                hideLightbox();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (lightbox.classList.contains('hidden')) return;

        if (e.key === 'Escape') hideLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
    });