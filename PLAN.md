# Matcha · Checklist des points demandés (sujet v6)

Basé sur `other/subject-6.pdf`. Cases pré-cochées selon l'état actuel du repo pour servir de tracker de reprise.
Légende : `[x]` fait · `[ ]` à faire · `(partiel)` commencé mais incomplet · `(BONUS)` hors partie obligatoire.

> ⚠️ Les **bonus** ne comptent que si TOUTE la partie obligatoire est parfaite (sans aucun dysfonctionnement).

---

## 0. Instructions générales (contraintes techniques)

- [ ] Aucune erreur / warning / notice, côté serveur ET client (console web) · à vérifier
- [x] Micro-framework (routeur, sans ORM/validateur/gestionnaire de comptes intégré) · Fastify
- [x] Base relationnelle ou graphe, requêtes écrites manuellement · PostgreSQL, SQL brut
- [x] **≥ 500 profils distincts** en base · 504 profils générés (faker) via le seeder `/admin`
- [ ] Compatible dernières versions Firefox ET Chrome · à vérifier
- [x] Mise en page structurée : en-tête + section principale + pied de page · MobileLayout
- [x] Adapté mobile / petits écrans · design mobile-first
- [x] Validation de tous les formulaires · AJV (back) + zod (front)
- [x] Identifiants / clés / `.env` exclus de Git

## IV.1 · Inscription et connexion

- [x] Inscription : email, nom d'utilisateur, nom, prénom, mot de passe sécurisé
- [x] Refus des mots anglais courants comme mot de passe
- [x] Email de vérification avec lien unique après inscription
- [x] Connexion via nom d'utilisateur + mot de passe
- [x] Demande d'email de réinitialisation du mot de passe
- [x] Déconnexion en un clic depuis n'importe quelle page
- [ ] (BONUS) Stratégies OmniAuth pour l'authentification

## IV.2 · Profil utilisateur

- [x] Genre
- [x] Préférences sexuelles
- [x] Biographie
- [x] Liste d'intérêts via tags réutilisables · (partiel : tags partagés OK, mais sélection parmi 44 tags pré-seedés seulement, pas de création par l'utilisateur · à confirmer selon lecture du sujet v6)
- [x] Jusqu'à 5 photos dont une désignée comme photo de profil
- [x] Modifier ces infos à tout moment (+ nom, prénom, email)
- [x] Voir **qui a consulté** son profil · table `views` dédiée (liste + compteur)
- [x] Voir qui l'a « liké »
- [x] **Note de popularité** publique (partiel : colonne `elo` présente mais jamais calculée)
- [x] Géoloc GPS jusqu'au quartier **avec consentement explicite** (v6/RGPD) · GPS déclenché au clic uniquement, refresh silencieux si déjà consenti, IP retirée
- [x] Si refus du GPS → **saisie manuelle obligatoire** de la localisation (v6) · `LOCATION_REQUIRED` back + submit bloqué front
- [x] Pouvoir modifier sa localisation à tout moment
- [ ] (BONUS) Galerie photo perso : upload glisser-déposer + édition image (recadrer, pivoter, filtres) (v6)

## IV.3 · Navigation (profils suggérés)

- [x] Liste de profils suggérés correspondant aux préférences · filtre orientation + tri par `score` (getUsersQuery)
- [x] Gestion de l'orientation (hétéro voit le sexe voulu, bisexualité gérée, **bi par défaut**)
- [x] Matching intelligent : proximité géo + max tags partagés + note de popularité · score /100 (elo inerte tant que popularité non calculée, cf. ligne 42)
- [x] Priorité aux utilisateurs de la même zone géographique · `locationScore` poids 40 (le plus élevé)
- [x] Liste **triable** par âge, localisation, note de popularité, tags communs
- [x] Liste **filtrable** par âge, localisation, note de popularité, tags communs
- [ ] (BONUS) Carte interactive des utilisateurs (localisation GPS plus précise via JS)

## IV.4 · Recherche avancée

- [x] Critère : tranche d'âge
- [x] Critère : plage de note de popularité
- [x] Critère : localisation
- [x] Critère : un ou plusieurs tags d'intérêt
- [x] Résultats **triables et filtrables** (âge, localisation, popularité, tags)

## IV.5 · Consultation de profil

- [x] Consulter le profil des autres (toutes infos sauf email et mot de passe)
- [x] **Enregistrer la visite** dans l'historique du consultant · `createView` sur consultation de profil (upsert)
- [x] « Liker » la photo de profil (interdit si l'utilisateur n'a pas de photo de profil)
- [x] Like mutuel → « connectés » → chat possible
- [x] Retirer un like (stoppe les notifs et désactive le chat)
- [x] Consulter la note de popularité d'un autre utilisateur
- [x] Voir si en ligne, sinon date/heure de dernière connexion
- [x] Signaler un utilisateur comme « faux compte »
- [x] Bloquer un utilisateur (retiré des recherches, plus de notifs, plus de chat)
- [x] Voir clairement si liké / connecté, et pouvoir « unliker » ou se déconnecter

## IV.6 · Chat

- [x] Chat en temps réel entre utilisateurs connectés (délai max 10 s)
- [x] Voir depuis **n'importe quelle page** la réception d'un nouveau message
- [ ] (BONUS) Chat vidéo ou audio pour les utilisateurs connectés
- [ ] (BONUS) Planifier / organiser des rendez-vous ou événements réels entre matchés

## IV.7 · Notifications (temps réel, délai max 10 s)

- [ ] Réception d'un « like »
- [ ] Profil consulté
- [ ] Réception d'un message
- [ ] Un utilisateur « liké » « like » en retour
- [ ] Un utilisateur connecté « unlike »
- [ ] Voir depuis **n'importe quelle page** les notifications non lues

## Sécurité (toute faille = note 0)

- [x] Mots de passe jamais stockés en clair (bcrypt)
- [ ] Aucune injection HTML / JavaScript (variables non protégées) · à re-vérifier (XSS)
- [x] Upload de contenu non autorisé bloqué (validation mimetype/image)
- [x] Protection contre les injections SQL (requêtes paramétrées)
- [x] Validation de toutes les entrées de formulaire et des uploads
- [ ] Retirer/protéger l'endpoint `/admin` (drop/recreate DB non authentifié) · faille actuelle
- [ ] Ajouter les en-têtes de sécurité (helmet)
