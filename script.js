document.addEventListener('DOMContentLoaded', () => {
    // 1. نظام الكتابة المتحركة التلقائية (Typing Animation) بدقة فائقة
    const words = [
        "أمين اتحاد طلاب إدارة سيدي سالم التعليمية",
        "طالب قيادي، كاتب وروائي مصري متميز",
        "مؤلف رواية سديم كمت التاريخية والخيال العلمي",
        "مؤسس مبادرة العقل البشري مفتاح الأمم"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterElement = document.getElementById("typewriter");

    function typeEffect() {
        if (!typewriterElement) return;
        let currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 25 : 70;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 3200; // فترة توقف عند اكتمال النص
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }
        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 2. العدادات المتحركة عبر Intersection Observer
    const statNumbers = document.querySelectorAll('.stat-num');
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetNum = +entry.target.getAttribute('data-target');
                let currentCount = 0;
                const increment = targetNum / 60;

                const updateCounter = () => {
                    currentCount += increment;
                    if (currentCount < targetNum) {
                        entry.target.textContent = Math.ceil(currentCount);
                        setTimeout(updateCounter, 25);
                    } else {
                        entry.target.textContent = targetNum;
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(num => statsObserver.observe(num));

    // 3. نظام تخزين رسائل التواصل ومعالجتها محلياً بشكل متقدم عبر LocalStorage
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('senderName').value.trim();
            const email = document.getElementById('senderEmail').value.trim();
            const message = document.getElementById('senderMessage').value.trim();

            if (!name || !email || !message) {
                alert('يرجى ملء جميع الحقول المطلوبة قبل إرسال الرسالة.');
                return;
            }

            const messageData = { 
                id: Date.now(), 
                name, 
                email, 
                message, 
                date: new Date().toLocaleString('ar-EG') 
            };
            
            let messages = JSON.parse(localStorage.getItem('siteMessages')) || [];
            messages.push(messageData);
            localStorage.setItem('siteMessages', JSON.stringify(messages));

            alert('تم إرسال رسالتك بنجاح وحفظها في قاعدة بيانات النظام المحلية!');
            contactForm.reset();
        });
    }
});
