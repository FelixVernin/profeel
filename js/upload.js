// Script pour la page upload.html

// Gestion de l'upload de fichier
document.addEventListener('DOMContentLoaded', function() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');

    // Click to upload
    uploadBox.addEventListener('click', function() {
        fileInput.click();
    });

    // Drag and drop
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadBox.classList.add('drag-over');
    });

    uploadBox.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadBox.classList.remove('drag-over');
    });

    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadBox.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
});

function handleFileSelect(file) {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
        alert('Format de fichier non supporté. Veuillez uploader un PDF, DOC ou DOCX.');
        return;
    }

    if (file.size > maxSize) {
        alert('Le fichier est trop volumineux. Taille maximum: 5MB');
        return;
    }

    // Afficher le preview
    document.getElementById('uploadBox').style.display = 'none';
    document.getElementById('filePreview').style.display = 'block';
    document.getElementById('fileName').textContent = file.name;

    // Stocker le fichier pour analyse
    window.uploadedFile = file;
}

function removeFile() {
    document.getElementById('uploadBox').style.display = 'flex';
    document.getElementById('filePreview').style.display = 'none';
    document.getElementById('fileInput').value = '';
    window.uploadedFile = null;
}

function selectCV(cvId) {
    // Ajouter animation de sélection
    const cards = document.querySelectorAll('.cv-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    const selectedCard = document.querySelector(`[data-cv="${cvId}"]`);
    selectedCard.classList.add('selected');

    // Récupérer le CV
    const cv = getCV(cvId);
    
    // Analyser avec les deux ATS
    const comparison = compareAnalyses(cv);
    
    // Stocker les résultats
    sessionStorage.setItem('analysisResults', JSON.stringify(comparison));
    
    // Animation de chargement
    showLoadingAnimation();
    
    // Rediriger vers la page de résultats après 2 secondes
    setTimeout(() => {
        window.location.href = 'results.html';
    }, 2000);
}

function analyzeCustomCV() {
    if (!window.uploadedFile) {
        alert('Veuillez d\'abord uploader un CV');
        return;
    }

    // Pour cette démo, on va simuler l'analyse avec un CV aléatoire
    // Dans une vraie application, il faudrait extraire le contenu du PDF
    alert('Analyse de CV uploadé non implémentée dans cette démo. Veuillez sélectionner un profil de test.');
}

function showLoadingAnimation() {
    // Créer un overlay de chargement
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <h3>Analyse en cours...</h3>
            <p>Les deux ATS traitent le CV</p>
            <div class="loading-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <p class="progress-text">
                    <span class="progress-step">ATS Classique...</span>
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Animation de progression
    setTimeout(() => {
        document.querySelector('.progress-step').textContent = 'ATS Inclusif...';
        document.querySelector('.progress-fill').style.width = '100%';
    }, 1000);
}

// Animation au scroll pour les cartes
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const cvCards = document.querySelectorAll('.cv-card');
    cvCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});
