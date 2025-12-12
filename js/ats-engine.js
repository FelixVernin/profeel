// Moteur ATS - Logique d'analyse des CV

// ATS Classique - Basé sur des règles strictes et mots-clés
class ClassicATS {
    constructor() {
        this.keywords = {
            diplomes: ['bac+5', 'master', 'ingénieur', 'grande école', 'polytechnique', 'doctorat'],
            experience_mots: ['ans', 'années', 'expérience'],
            entreprises_reconnues: ['google', 'microsoft', 'apple', 'amazon', 'facebook', 'bnp', 'société générale']
        };
    }

    analyzeCV(cv) {
        let score = 50; // Score de base
        let negativeReasons = [];
        let positiveReasons = [];

        // Pénalités pour âge
        if (cv.age > 40) {
            score -= 15;
            negativeReasons.push(`Âge supérieur à 40 ans (${cv.age} ans) - risque perçu de sur-qualification`);
        } else if (cv.age < 25) {
            score -= 10;
            negativeReasons.push(`Âge inférieur à 25 ans - manque d'expérience supposé`);
        }

        // Vérification diplôme
        const hasPrestidiousDegree = cv.formation.some(f => 
            this.keywords.diplomes.some(k => f.diplome.toLowerCase().includes(k) || 
                                            f.etablissement.toLowerCase().includes(k))
        );
        
        if (!hasPrestidiousDegree) {
            score -= 20;
            negativeReasons.push('Absence de diplôme Bac+5 reconnu ou de grande école');
        } else {
            positiveReasons.push('Diplôme de niveau requis détecté');
        }

        // Diplôme étranger
        if (cv.informations_sensibles?.diplome_etranger) {
            score -= 15;
            negativeReasons.push('Diplôme étranger - non reconnu automatiquement dans la base de données');
        }

        // Reconversion professionnelle
        if (cv.informations_sensibles?.reconversion) {
            score -= 20;
            negativeReasons.push('Reconversion professionnelle - risque d\'instabilité perçu');
        }

        // Expérience courte dans le domaine
        if (cv.informations_sensibles?.experience_courte_domaine) {
            score -= 15;
            negativeReasons.push('Expérience insuffisante dans le domaine (< 2 ans minimum requis)');
        }

        // Parcours atypique
        if (cv.informations_sensibles?.parcours_atypique) {
            score -= 10;
            negativeReasons.push('Parcours non linéaire - ne correspond pas au profil standard');
        }

        // Autodidacte sans diplôme
        if (cv.informations_sensibles?.autodidacte) {
            score -= 25;
            negativeReasons.push('Formation autodidacte sans diplôme universitaire reconnu');
        }

        // Freelance
        if (cv.informations_sensibles?.freelance_instabilite_percue) {
            score -= 12;
            negativeReasons.push('Expérience principalement en freelance - instabilité perçue');
        }

        // Nom à consonance étrangère
        if (cv.informations_sensibles?.nom_consonance_etrangere) {
            score -= 8;
            negativeReasons.push('Nom à consonance étrangère - biais algorithmique non corrigé');
        }

        // Handicap mentionné
        if (cv.informations_sensibles?.handicap_mentionne) {
            score -= 10;
            negativeReasons.push('Mention de handicap - aménagements perçus comme contrainte');
        }

        // Surqualification
        if (cv.informations_sensibles?.surqualification) {
            score -= 15;
            negativeReasons.push('Sur-qualification - risque de départ anticipé');
        }

        // Pas de grande entreprise
        if (cv.informations_sensibles?.pas_grande_entreprise) {
            score -= 8;
            negativeReasons.push('Absence d\'expérience en grande entreprise reconnue');
        }

        // Bonus si grande école
        if (cv.formation.some(f => f.etablissement.toLowerCase().includes('polytechnique') || 
                                   f.etablissement.toLowerCase().includes('centrale'))) {
            score += 15;
            positiveReasons.push('Diplômé d\'une grande école prestigieuse');
        }

        // Limiter le score entre 0 et 100
        score = Math.max(0, Math.min(100, score));

        return {
            score: Math.round(score),
            verdict: score >= 70 ? 'accepted' : score >= 50 ? 'warning' : 'rejected',
            verdictText: score >= 70 ? 'Candidature acceptée' : score >= 50 ? 'À revoir' : 'Candidature rejetée',
            positiveReasons,
            negativeReasons,
            methodology: 'Analyse par mots-clés et critères stricts'
        };
    }
}

// ATS Inclusif - Basé sur l'IA et l'analyse sémantique
class InclusiveATS {
    analyzeCV(cv) {
        let score = 60; // Score de base plus élevé
        let positiveReasons = [];
        let improvements = [];

        // Analyse des compétences techniques
        const techSkills = cv.competences.techniques.length;
        if (techSkills >= 6) {
            score += 15;
            positiveReasons.push(`Solide palette de compétences techniques (${techSkills} technologies maîtrisées)`);
        } else if (techSkills >= 4) {
            score += 10;
            positiveReasons.push(`Bonnes compétences techniques de base`);
        }

        // Analyse de l'expérience - focus sur les compétences réelles
        const totalYears = cv.experience.reduce((sum, exp) => {
            const years = parseInt(exp.duree) || 0;
            return sum + years;
        }, 0);

        if (totalYears >= 3) {
            score += 10;
            positiveReasons.push(`Expérience professionnelle solide (${totalYears} ans)`);
        }

        // Projets réalisés
        if (cv.projets && cv.projets.length > 0) {
            score += 12;
            positiveReasons.push(`Portfolio de ${cv.projets.length} projets concrets démontrant les compétences pratiques`);
        }

        // Valorisation des soft skills
        if (cv.competences.soft.length >= 4) {
            score += 8;
            positiveReasons.push('Excellentes compétences interpersonnelles et soft skills');
        }

        // Langues
        const languesCount = cv.langues.filter(l => l.niveau !== 'A1' && l.niveau !== 'A2').length;
        if (languesCount >= 2) {
            score += 7;
            positiveReasons.push(`Maîtrise de ${languesCount} langues - atout pour collaboration internationale`);
        }

        // Valorisation des parcours atypiques
        if (cv.informations_sensibles?.reconversion) {
            score += 10;
            positiveReasons.push('Reconversion professionnelle - preuve de motivation, adaptabilité et courage');
        }

        if (cv.informations_sensibles?.autodidacte) {
            score += 12;
            positiveReasons.push('Formation autodidacte - capacité d\'apprentissage autonome exceptionnelle');
        }

        if (cv.informations_sensibles?.parcours_atypique) {
            score += 8;
            positiveReasons.push('Parcours atypique apportant diversité de perspectives et créativité');
        }

        // Valorisation de l'expérience freelance
        if (cv.informations_sensibles?.freelance_instabilite_percue) {
            score += 10;
            positiveReasons.push('Expérience freelance - autonomie, gestion de projet, relation client démontrées');
        }

        // Avis clients pour freelance
        if (cv.avis_clients && cv.avis_clients.note_moyenne >= 4.5) {
            score += 8;
            positiveReasons.push(`Excellente réputation client (${cv.avis_clients.note_moyenne}/5 sur ${cv.avis_clients.nombre_avis} avis)`);
        }

        // Publications scientifiques
        if (cv.publications && cv.publications.length > 0) {
            score += 10;
            positiveReasons.push(`Contributions scientifiques (${cv.publications.length} publications) - expertise reconnue`);
        }

        // Diplômes étrangers - valorisation
        if (cv.informations_sensibles?.diplome_etranger) {
            score += 5;
            positiveReasons.push('Formation internationale - ouverture culturelle et expérience diversifiée');
        }

        // Multilinguisme
        if (cv.langues.length >= 3) {
            score += 5;
            positiveReasons.push('Multilinguisme - atout majeur pour environnement international');
        }

        // Expérience en pédagogie (pour reconversion)
        const hasPedagogie = cv.competences.soft.some(s => s.toLowerCase().includes('pédagogie'));
        if (hasPedagogie) {
            score += 6;
            positiveReasons.push('Compétences pédagogiques - excellent pour travail d\'équipe et formation');
        }

        // Doctorat
        const hasPhD = cv.formation.some(f => f.diplome.toLowerCase().includes('doctorat'));
        if (hasPhD) {
            score += 12;
            positiveReasons.push('Doctorat - expertise de haut niveau et capacités de recherche avancées');
        }

        // Axes d'amélioration constructifs
        if (totalYears < 5) {
            improvements.push('Poursuivre le développement de l\'expérience professionnelle');
        }
        
        if (techSkills < 8) {
            improvements.push('Continuer à enrichir la palette de compétences techniques');
        }

        if (!cv.projets || cv.projets.length < 3) {
            improvements.push('Développer davantage le portfolio de projets personnels');
        }

        // Limiter le score
        score = Math.max(0, Math.min(100, score));

        return {
            score: Math.round(score),
            verdict: score >= 80 ? 'accepted' : score >= 65 ? 'recommended' : score >= 50 ? 'potential' : 'review',
            verdictText: score >= 80 ? 'Excellent candidat - recommandé' : 
                        score >= 65 ? 'Candidature recommandée' : 
                        score >= 50 ? 'Potentiel intéressant' : 
                        'À revoir avec attention',
            positiveReasons,
            improvements,
            methodology: 'Analyse sémantique par IA avec élimination des biais'
        };
    }
}

// Fonction pour comparer les deux analyses
function compareAnalyses(cv) {
    const classicATS = new ClassicATS();
    const inclusiveATS = new InclusiveATS();

    const classicResult = classicATS.analyzeCV(cv);
    const inclusiveResult = inclusiveATS.analyzeCV(cv);

    return {
        cv: cv,
        classic: classicResult,
        inclusive: inclusiveResult,
        scoreDifference: inclusiveResult.score - classicResult.score
    };
}

// Fonction pour générer les différences clés
function generateKeyDifferences(comparisonResult) {
    const differences = [];

    differences.push({
        icon: '🎯',
        title: 'Approche d\'analyse',
        classic: 'Filtrage par mots-clés rigides',
        inclusive: 'Compréhension sémantique contextuelle'
    });

    differences.push({
        icon: '⚖️',
        title: 'Traitement des biais',
        classic: 'Biais non corrigés (âge, origine, parcours)',
        inclusive: 'Élimination active des discriminations'
    });

    differences.push({
        icon: '📊',
        title: 'Différence de score',
        classic: `${comparisonResult.classic.score}/100`,
        inclusive: `${comparisonResult.inclusive.score}/100 (+${comparisonResult.scoreDifference} points)`
    });

    differences.push({
        icon: '💡',
        title: 'Valorisation',
        classic: 'Diplômes et grandes entreprises uniquement',
        inclusive: 'Compétences réelles, projets, soft skills'
    });

    return differences;
}
