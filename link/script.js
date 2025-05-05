// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('xyron-theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                  
                  
// Add this to your existing script section
function setupNavigation() {
// Navigation buttons
const navButtons = {
home: document.getElementById('navHome'),
referrals: document.getElementById('navReferrals'),
dashboard: document.getElementById('navDashboard'),
rewards: document.getElementById('navRewards'),
settings: document.getElementById('navSettings')
};

// Set active button based on current page
Object.values(navButtons).forEach(btn => btn.classList.remove('active'));
navButtons.dashboard.classList.add('active');

// Navigation handlers
function navigateTo(page) {
if (page === 'dashboard') return; // Already here

if (window.Telegram?.WebApp) {
  Telegram.WebApp.sendData(JSON.stringify({ 
    action: 'navigate', 
    page: page 
  }));
} else {
  window.location.href = `${page}.html`;
}
}

// Add event listeners
navButtons.home.addEventListener('click', () => navigateTo('home'));
navButtons.referrals.addEventListener('click', () => navigateTo('referrals'));
navButtons.rewards.addEventListener('click', () => navigateTo('rewards'));
navButtons.settings.addEventListener('click', () => navigateTo('settings'));
}

// Call this in your initialization
setupNavigation();

// Apply saved theme
body.classList.add(savedTheme + '-mode');

// Toggle theme
themeToggle.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('xyron-theme', 'dark');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('xyron-theme', 'light');
  }
});

// Create particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random properties
  const size = Math.random() * 5 + 1;
  const posX = Math.random() * window.innerWidth;
  const duration = Math.random() * 10 + 5;
  const delay = Math.random() * 5;
  
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${posX}px`;
  particle.style.bottom = '0';
  particle.style.animationDuration = `${duration}s`;
  particle.style.animationDelay = `${delay}s`;
  particle.style.opacity = Math.random() * 0.5 + 0.1;
  
  particlesContainer.appendChild(particle);
}

// Dynamic shadow on scroll
window.addEventListener('scroll', function() {
  const cards = document.querySelectorAll('.xyron-card');
  const scrollPosition = window.scrollY;
  
  cards.forEach(card => {
    const cardPosition = card.getBoundingClientRect().top;
    const shadowIntensity = Math.min(30, scrollPosition / 10);
    
    if (cardPosition < window.innerHeight * 0.75) {p
      card.style.boxShadow = `0 ${shadowIntensity}px ${shadowIntensity*1.5}px rgba(0,0,0,0.2)`;
    }
  });
});

// Telegram user info
if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  const user = Telegram.WebApp.initDataUnsafe?.user;
  if (user) {
    document.getElementById('user-name').textContent = 
      'Hi, ' + (user.first_name + (user.last_name ? ' ' + user.last_name : ''));
    if (user.photo_url) {
      document.getElementById('user-pic').src = user.photo_url;
    }
  }
}

// Simulate connection status change after 3 seconds
setTimeout(() => {
  const statusIndicator = document.querySelector('.xyron-status.disconnected');
  if (statusIndicator) {
    statusIndicator.classList.remove('disconnected', 'xyron-pulse');
    statusIndicator.classList.add('connected');
    statusIndicator.nextElementSibling.textContent = 'Node Connected';
    statusIndicator.parentElement.nextElementSibling.textContent = 'Your Xyron node is now active and earning airdrop rewards.';
    document.querySelector('.attention-badge').textContent = 'All Good';
    document.querySelector('.attention-badge').classList.remove('attention-badge');
    document.querySelector('.attention-badge').classList.add('xyron-badge');
  }
}, 3000);