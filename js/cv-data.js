// Base de données des CV de test
const cvDatabase = {
    sophie: {
        id: 'sophie',
        nom: 'Sophie Dubois',
        age: 42,
        email: 'sophie.dubois@email.fr',
        telephone: '06 12 34 56 78',
        avatar: '👨‍💼',
        
        formation: [
            {
                diplome: 'Master Lettres Modernes',
                etablissement: 'Université Paris-Sorbonne',
                annee: '2005',
                lieu: 'Paris, France'
            },
            {
                diplome: 'Bootcamp Développement Web Full-Stack',
                etablissement: 'Le Wagon',
                annee: '2023',
                lieu: 'Paris, France'
            }
        ],
        
        experience: [
            {
                poste: 'Professeure de Français',
                entreprise: 'Lycée Victor Hugo',
                duree: '15 ans',
                debut: '2005',
                fin: '2023',
                lieu: 'Paris, France',
                description: 'Enseignement du français, gestion de projets pédagogiques, tutorat'
            },
            {
                poste: 'Développeuse Web Junior',
                entreprise: 'Freelance',
                duree: '6 mois',
                debut: '2023',
                fin: 'Présent',
                lieu: 'Paris, France',
                description: 'Développement de sites web, création d\'applications React, intégration front-end'
            }
        ],
        
        competences: {
            techniques: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Git', 'Responsive Design'],
            soft: ['Pédagogie', 'Communication', 'Gestion de projet', 'Adaptabilité', 'Travail d\'équipe']
        },
        
        langues: [
            { langue: 'Français', niveau: 'Natif' },
            { langue: 'Anglais', niveau: 'B2' },
            { langue: 'Espagnol', niveau: 'B1' }
        ],
        
        projets: [
            {
                nom: 'Portfolio Personnel',
                description: 'Site web responsive présentant mes projets',
                technologies: ['React', 'CSS3', 'JavaScript']
            },
            {
                nom: 'Application de Gestion de Cours',
                description: 'Application pour organiser les cours et devoirs',
                technologies: ['React', 'Node.js', 'MongoDB']
            }
        ],
        
        informations_sensibles: {
            age_mentionne: true,
            reconversion: true,
            parcours_atypique: true,
            experience_courte_domaine: true
        }
    },
    
    karim: {
        id: 'karim',
        nom: 'Karim El Mansouri',
        age: 27,
        email: 'karim.elmansouri@email.com',
        telephone: '+212 6 12 34 56 78',
        avatar: '👨‍🎓',
        
        formation: [
            {
                diplome: 'Licence en Informatique',
                etablissement: 'Université Mohammed V',
                annee: '2019',
                lieu: 'Rabat, Maroc'
            },
            {
                diplome: 'Master en Génie Logiciel',
                etablissement: 'Université Mohammed V',
                annee: '2021',
                lieu: 'Rabat, Maroc'
            }
        ],
        
        experience: [
            {
                poste: 'Développeur Backend Junior',
                entreprise: 'TechStart Maroc',
                duree: '1 an',
                debut: '2021',
                fin: '2022',
                lieu: 'Casablanca, Maroc',
                description: 'Développement d\'APIs REST, gestion de bases de données, déploiement'
            },
            {
                poste: 'Développeur Python',
                entreprise: 'Digital Solutions',
                duree: '1 an',
                debut: '2022',
                fin: 'Présent',
                lieu: 'Casablanca, Maroc',
                description: 'Développement d\'applications web avec Django, optimisation de performances'
            }
        ],
        
        competences: {
            techniques: ['Python', 'Django', 'Flask', 'PostgreSQL', 'MySQL', 'REST API', 'Git', 'Docker', 'Linux'],
            soft: ['Résolution de problèmes', 'Autonomie', 'Rigueur', 'Apprentissage rapide', 'Travail en équipe']
        },
        
        langues: [
            { langue: 'Arabe', niveau: 'Natif' },
            { langue: 'Français', niveau: 'C2' },
            { langue: 'Anglais', niveau: 'C1' }
        ],
        
        projets: [
            {
                nom: 'Plateforme E-commerce',
                description: 'Site de vente en ligne avec paiement sécurisé',
                technologies: ['Django', 'PostgreSQL', 'Stripe API']
            },
            {
                nom: 'API de Gestion d\'Inventaire',
                description: 'API RESTful pour gestion de stock',
                technologies: ['Flask', 'MySQL', 'Docker']
            }
        ],
        
        informations_sensibles: {
            origine_etrangere: true,
            nom_consonance_etrangere: true,
            diplome_etranger: true,
            universite_non_reconnue_france: true
        }
    },
    
    marie: {
        id: 'marie',
        nom: 'Marie Chen',
        age: 35,
        email: 'marie.chen@email.fr',
        telephone: '06 98 76 54 32',
        avatar: '👩‍💻',
        
        formation: [
            {
                diplome: 'École Polytechnique',
                etablissement: 'École Polytechnique',
                annee: '2012',
                lieu: 'Palaiseau, France'
            },
            {
                diplome: 'Doctorat en Intelligence Artificielle',
                etablissement: 'Université Paris-Saclay',
                annee: '2016',
                lieu: 'Paris, France'
            }
        ],
        
        experience: [
            {
                poste: 'Chercheuse en IA',
                entreprise: 'INRIA',
                duree: '2 ans',
                debut: '2016',
                fin: '2018',
                lieu: 'Paris, France',
                description: 'Recherche en apprentissage automatique, publications scientifiques'
            },
            {
                poste: 'Data Scientist Senior',
                entreprise: 'BNP Paribas',
                duree: '3 ans',
                debut: '2018',
                fin: '2021',
                lieu: 'Paris, France',
                description: 'Modèles prédictifs, analyse de données financières, machine learning'
            },
            {
                poste: 'Lead Data Scientist',
                entreprise: 'Capgemini',
                duree: '2 ans',
                debut: '2021',
                fin: 'Présent',
                lieu: 'Paris, France (Télétravail)',
                description: 'Direction d\'équipe, architecture ML, conseil stratégique'
            }
        ],
        
        competences: {
            techniques: ['Python', 'R', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP', 'Computer Vision', 'SQL', 'Spark', 'MLOps'],
            soft: ['Leadership', 'Communication scientifique', 'Gestion d\'équipe', 'Innovation', 'Pensée analytique']
        },
        
        langues: [
            { langue: 'Français', niveau: 'Natif' },
            { langue: 'Anglais', niveau: 'C2' },
            { langue: 'Chinois', niveau: 'B1' }
        ],
        
        projets: [
            {
                nom: 'Système de Détection de Fraude',
                description: 'ML pour détecter les transactions frauduleuses',
                technologies: ['Python', 'TensorFlow', 'Apache Spark']
            },
            {
                nom: 'Chatbot Intelligent',
                description: 'Assistant virtuel avec NLP avancé',
                technologies: ['PyTorch', 'Transformers', 'BERT']
            }
        ],
        
        publications: [
            'Deep Learning for Financial Time Series Prediction (2019)',
            'Novel Approaches to Natural Language Understanding (2020)'
        ],
        
        informations_sensibles: {
            handicap_mentionne: true,
            preference_teletravail: true,
            surqualification: true,
            nom_origine_asiatique: true
        }
    },
    
    lucas: {
        id: 'lucas',
        nom: 'Lucas Moreau',
        age: 28,
        email: 'lucas.moreau@email.fr',
        telephone: '06 45 67 89 12',
        avatar: '👨‍🔧',
        
        formation: [
            {
                diplome: 'Bac Professionnel Systèmes Numériques',
                etablissement: 'Lycée Technique',
                annee: '2014',
                lieu: 'Lyon, France'
            },
            {
                diplome: 'Formations en ligne',
                etablissement: 'Udemy, OpenClassrooms, freeCodeCamp',
                annee: '2015-2020',
                lieu: 'En ligne'
            }
        ],
        
        experience: [
            {
                poste: 'Développeur Web Freelance',
                entreprise: 'Indépendant',
                duree: '4 ans',
                debut: '2019',
                fin: 'Présent',
                lieu: 'Lyon, France',
                description: 'Développement de sites web et applications pour PME, e-commerce, portfolios'
            }
        ],
        
        competences: {
            techniques: ['PHP', 'Laravel', 'WordPress', 'Vue.js', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'Docker'],
            soft: ['Autonomie', 'Gestion client', 'Respect des délais', 'Créativité', 'Débrouillardise']
        },
        
        langues: [
            { langue: 'Français', niveau: 'Natif' },
            { langue: 'Anglais', niveau: 'B2' }
        ],
        
        projets: [
            {
                nom: 'Plus de 50 sites web livrés',
                description: 'Sites vitrines, e-commerce, portfolios pour clients variés',
                technologies: ['Laravel', 'WordPress', 'Vue.js']
            },
            {
                nom: 'Plateforme de Réservation',
                description: 'Système de réservation en ligne pour restaurants',
                technologies: ['Laravel', 'Vue.js', 'MySQL']
            }
        ],
        
        clients: [
            'Restaurant Le Gourmet',
            'Boutique Mode & Style',
            'Cabinet d\'Avocats Dupont',
            'Agence Immobilière Lyon Centre',
            '+ 46 autres clients'
        ],
        
        avis_clients: {
            note_moyenne: 4.9,
            nombre_avis: 52,
            commentaires: [
                'Excellent travail, très professionnel',
                'Respecte les délais, à l\'écoute',
                'Je recommande vivement ses services'
            ]
        },
        
        informations_sensibles: {
            pas_diplome_superieur: true,
            parcours_atypique: true,
            autodidacte: true,
            freelance_instabilite_percue: true,
            pas_grande_entreprise: true
        }
    }
};

// Fonction pour obtenir un CV
function getCV(id) {
    return cvDatabase[id];
}

// Fonction pour obtenir tous les CV
function getAllCVs() {
    return Object.values(cvDatabase);
}
