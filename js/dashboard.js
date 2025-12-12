// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // AI Assistant button interaction
    const aiAssistantBtn = document.querySelector('.ai-assistant-btn');
    if (aiAssistantBtn) {
        aiAssistantBtn.addEventListener('click', function() {
            alert('🤖 Assistant IA Profeel\n\nComment puis-je vous aider aujourd\'hui ?\n\n• Analyser les tendances de candidatures\n• Identifier les biais potentiels\n• Recommander des candidats\n• Optimiser vos offres d\'emploi\n• Générer des rapports\n\n(Fonctionnalité de démonstration)');
        });
    }

    // View profile buttons
    const viewProfileBtns = document.querySelectorAll('.view-profile-btn');
    viewProfileBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const candidateName = this.parentElement.querySelector('strong').textContent;
            alert(`📋 Profil de ${candidateName}\n\nVous seriez redirigé vers la page de profil détaillé du candidat.\n\n(Fonctionnalité de démonstration)`);
        });
    });

    // View all candidates buttons
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const jobTitle = this.closest('.job-card').querySelector('.job-title-section h3').textContent;
            alert(`📊 Tous les candidats pour : ${jobTitle}\n\nVous seriez redirigé vers la liste complète des candidatures.\n\n(Fonctionnalité de démonstration)`);
        });
    });

    // Quick action buttons
    const newJobBtn = document.querySelector('.action-btn.primary');
    if (newJobBtn) {
        newJobBtn.addEventListener('click', function() {
            alert('➕ Créer un nouveau poste\n\nVous seriez redirigé vers le formulaire de création d\'offre d\'emploi.\n\n(Fonctionnalité de démonstration)');
        });
    }

    const importBtn = document.querySelector('.action-btn.secondary');
    if (importBtn) {
        importBtn.addEventListener('click', function() {
            alert('📤 Importer des CVs\n\nVous pourriez importer des CVs en masse pour analyse.\n\n(Fonctionnalité de démonstration)');
        });
    }

    // View options toggle
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Job menu buttons
    const menuBtns = document.querySelectorAll('.job-menu-btn');
    menuBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('⋮ Options\n\n• Modifier l\'offre\n• Mettre en pause\n• Archiver\n• Exporter les données\n• Partager\n\n(Fonctionnalité de démonstration)');
        });
    });

    // Add animation on scroll for job cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Animate statistics on load
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        const finalValue = stat.textContent;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue);
        
        if (!isNaN(numericValue)) {
            let currentValue = 0;
            const increment = Math.ceil(numericValue / 30);
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                stat.textContent = currentValue + (isPercentage ? '%' : '');
            }, 30);
        }
    });

    // Filter interactions
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Filter changed:', this.parentElement.textContent.trim(), this.checked);
            // Here you would filter the job cards based on selected filters
        });
    });

    const filterRadios = document.querySelectorAll('.filter-group input[type="radio"]');
    filterRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Department filter:', this.parentElement.textContent.trim());
            // Here you would filter the job cards by department
        });
    });
});
