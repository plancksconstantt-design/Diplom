// ==========================================
// 1. Анимация появления при скролле (Reveal)
// ==========================================
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
}

// ==========================================
// 2. Навигация при скролле
// ==========================================
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ==========================================
// 3. Мобильное меню (только если элементы есть на странице)
// ==========================================
const burger = document.querySelector('.nav-burger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');

if (burger && mobileMenu && mobileClose) {
  burger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  mobileClose.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
  });

  document.querySelectorAll('.mobile-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ==========================================
// 4. Плавный скролл к якорям
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ==========================================
// 5. Параллакс для hero-изображения (только на главной)
// ==========================================
const heroBg = document.querySelector('.hero-bg img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${window.scrollY * 0.15}px) scale(1.05)`;
    }
  });
}

// ==========================================
// 6. Staggered reveal для карточек (только если они есть)
// ==========================================
const cards = document.querySelectorAll('.teacher-card, .practice-item, .tariff');
if (cards.length > 0) {
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card) => cardObserver.observe(card));
}

// ==========================================
// 7. Переключение форм Вход / Регистрация (только на странице auth)
// ==========================================
const authTabs = document.querySelectorAll('.auth-tab');
const authForms = document.querySelectorAll('.auth-form');

if (authTabs.length > 0 && authForms.length > 0) {
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // 1. Убираем класс active у всех вкладок и форм
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));

      // 2. Добавляем active нажатой вкладке
      tab.classList.add('active');

      // 3. Находим нужную форму по data-target и показываем её
      const targetId = tab.getAttribute('data-target');
      const targetForm = document.getElementById(targetId);
      if (targetForm) {
        targetForm.classList.add('active');
      }
    });
  });
}

// ==========================================
// 8. Обработка отправки формы (демо-режим)
// ==========================================
const authFormElements = document.querySelectorAll('.auth-form');
authFormElements.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // Останавливаем стандартную перезагрузку страницы
    
    const btn = form.querySelector('.auth-btn');
    if (!btn) return;
    
    const originalText = btn.innerText;
    
    // Имитация загрузки
    btn.innerText = 'Обработка...';
    btn.style.opacity = '0.7';
    
    setTimeout(() => {
      btn.innerText = 'Успешно! (Демо)';
      btn.style.background = 'var(--accent)';
      btn.style.color = 'var(--ink)';
      
      setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.style.opacity = '1';
        form.reset();
      }, 1500);
    }, 1000);
  });
});