// Script pour la page results.html

document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les résultats d'analyse
    const resultsData = sessionStorage.getItem('analysisResults');
    
    if (!resultsData) {
        // Si pas de données, rediriger vers upload
        window.location.href = 'upload.html';
        return;
    }

    const results = JSON.parse(resultsData);
    displayResults(results);
});

function displayResults(results) {
    const { cv, classic, inclusive } = results;

    // Afficher le profil du candidat
    displayCandidateProfile(cv);

    // Afficher les scores
    displayScores(classic, inclusive);

    // Afficher les analyses détaillées
    displayAnalysis(classic, inclusive);

    // Afficher les différences clés
    displayKeyDifferences(results);

    // Afficher l'analyse approfondie
    displayDetailedAnalysis(cv, classic, inclusive);
}

function displayCandidateProfile(cv) {
    document.getElementById('profileAvatar').textContent = cv.avatar;
    document.getElementById('candidateName').textContent = cv.nom;
    
    // Déterminer le rôle
    const lastJob = cv.experience[cv.experience.length - 1];
    document.getElementById('candidateRole').textContent = lastJob.poste;

    // Afficher les tags de compétences
    const tagsContainer = document.getElementById('profileTags');
    cv.competences.techniques.slice(0, 5).forEach(skill => {
        const tag = document.createElement('span');
        tag.className = 'profile-tag';
        tag.textContent = skill;
        tagsContainer.appendChild(tag);
    });
}

function displayScores(classic, inclusive) {
    // Scores numériques
    animateScore('classicScore', classic.score);
    animateScore('inclusiveScore', inclusive.score);

    // Cercles de progression
    animateScoreRing('classicScoreRing', classic.score, 'classic');
    animateScoreRing('inclusiveScoreRing', inclusive.score, 'inclusive');

    // Verdicts
    const classicVerdict = document.getElementById('classicVerdict');
    const inclusiveVerdict = document.getElementById('inclusiveVerdict');

    classicVerdict.className = `verdict-badge ${classic.verdict}`;
    classicVerdict.querySelector('.verdict-text').textContent = classic.verdictText;
    
    if (classic.verdict === 'accepted') {
        classicVerdict.querySelector('.verdict-icon').textContent = '✅';
    } else if (classic.verdict === 'warning') {
        classicVerdict.querySelector('.verdict-icon').textContent = '⚠️';
    } else {
        classicVerdict.querySelector('.verdict-icon').textContent = '❌';
    }

    inclusiveVerdict.className = `verdict-badge ${inclusive.verdict}`;
    inclusiveVerdict.querySelector('.verdict-text').textContent = inclusive.verdictText;
    
    if (inclusive.score >= 80) {
        inclusiveVerdict.querySelector('.verdict-icon').textContent = '✅';
    } else if (inclusive.score >= 65) {
        inclusiveVerdict.querySelector('.verdict-icon').textContent = '👍';
    } else {
        inclusiveVerdict.querySelector('.verdict-icon').textContent = '⚠️';
    }
}

function animateScore(elementId, targetScore) {
    const element = document.getElementById(elementId);
    let currentScore = 0;
    const increment = targetScore / 50;
    
    const timer = setInterval(() => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            clearInterval(timer);
        }
        element.textContent = Math.round(currentScore);
    }, 20);
}

function animateScoreRing(elementId, score, type) {
    const ring = document.getElementById(elementId);
    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (score / 100) * circumference;
    
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        ring.style.strokeDashoffset = offset;
    }, 100);
}

function displayAnalysis(classic, inclusive) {
    // ATS Classique - Points négatifs
    const classicNegativesList = document.getElementById('classicNegatives');
    classicNegativesList.innerHTML = '';
    classic.negativeReasons.forEach(reason => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="reason-icon">❌</span>${reason}`;
        classicNegativesList.appendChild(li);
    });

    // ATS Classique - Points positifs (si existants)
    if (classic.positiveReasons.length > 0) {
        document.getElementById('classicPositivesSection').style.display = 'block';
        const classicPositivesList = document.getElementById('classicPositives');
        classicPositivesList.innerHTML = '';
        classic.positiveReasons.forEach(reason => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="reason-icon">✓</span>${reason}`;
            classicPositivesList.appendChild(li);
        });
    }

    // ATS Inclusif - Points positifs
    const inclusivePositivesList = document.getElementById('inclusivePositives');
    inclusivePositivesList.innerHTML = '';
    inclusive.positiveReasons.forEach(reason => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="reason-icon">✅</span>${reason}`;
        inclusivePositivesList.appendChild(li);
    });

    // ATS Inclusif - Axes d'amélioration
    const inclusiveImprovementsList = document.getElementById('inclusiveImprovements');
    inclusiveImprovementsList.innerHTML = '';
    inclusive.improvements.forEach(improvement => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="reason-icon">💡</span>${improvement}`;
        inclusiveImprovementsList.appendChild(li);
    });
}

function displayKeyDifferences(results) {
    const differences = generateKeyDifferences(results);
    const container = document.getElementById('differencesList');
    container.innerHTML = '';

    differences.forEach(diff => {
        const card = document.createElement('div');
        card.className = 'difference-card';
        card.innerHTML = `
            <div class="diff-icon">${diff.icon}</div>
            <h3>${diff.title}</h3>
            <div class="diff-comparison">
                <div class="diff-item classic">
                    <span class="diff-label">ATS Classique</span>
                    <p>${diff.classic}</p>
                </div>
                <div class="diff-arrow">→</div>
                <div class="diff-item inclusive">
                    <span class="diff-label">ATS Inclusif</span>
                    <p>${diff.inclusive}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function displayDetailedAnalysis(cv, classic, inclusive) {
    // Onglet Compétences
    displayCompetences(cv);
    
    // Onglet Expérience
    displayExperience(cv);
    
    // Onglet Formation
    displayFormation(cv);
    
    // Onglet Soft Skills
    displaySoftSkills(cv);
}

function displayCompetences(cv) {
    const container = document.getElementById('competencesContent');
    container.innerHTML = `
        <div class="competences-section">
            <h4>Compétences Techniques</h4>
            <div class="skills-grid">
                ${cv.competences.techniques.map(skill => `
                    <div class="skill-badge">${skill}</div>
                `).join('')}
            </div>
        </div>
    `;
}

function displayExperience(cv) {
    const container = document.getElementById('experienceContent');
    container.innerHTML = '<div class="timeline">';
    
    cv.experience.forEach((exp, index) => {
        container.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h4>${exp.poste}</h4>
                    <p class="company">${exp.entreprise}</p>
                    <p class="period">${exp.debut} - ${exp.fin} (${exp.duree})</p>
                    <p class="location">📍 ${exp.lieu}</p>
                    <p class="description">${exp.description}</p>
                </div>
            </div>
        `;
    });
    
    container.innerHTML += '</div>';
}

function displayFormation(cv) {
    const container = document.getElementById('formationContent');
    container.innerHTML = '';
    
    cv.formation.forEach(formation => {
        const div = document.createElement('div');
        div.className = 'formation-item';
        div.innerHTML = `
            <div class="formation-icon">🎓</div>
            <div class="formation-details">
                <h4>${formation.diplome}</h4>
                <p class="school">${formation.etablissement}</p>
                <p class="year">${formation.annee} • ${formation.lieu}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function displaySoftSkills(cv) {
    const container = document.getElementById('softSkillsContent');
    container.innerHTML = `
        <div class="soft-skills-grid">
            ${cv.competences.soft.map(skill => `
                <div class="soft-skill-card">
                    <div class="skill-icon">⭐</div>
                    <h4>${skill}</h4>
                </div>
            `).join('')}
        </div>
    `;
}

function switchTab(tabName) {
    // Retirer la classe active de tous les boutons et contenus
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Ajouter la classe active au bouton et contenu sélectionnés
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function downloadReport() {
    alert('Fonctionnalité de téléchargement PDF à implémenter');
}

function shareResults() {
    alert('Fonctionnalité de partage à implémenter');
}
