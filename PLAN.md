# Matcha · Checklist complète du sujet (v7.0)

Basé sur `other/subject.pdf`. Vérification point par point effectuée sur l'ensemble du repo (back Fastify, front React, compose.yaml, seed).
Légende : `[x]` fait et vérifié dans le code · `[x]` + ⚠️ fait avec réserve (détail en section VII) · `[ ]` non fait, partiel ou non vérifiable sans exécution.

> ⚠️ Les **bonus** ne sont évalués que si TOUTE la partie obligatoire est parfaite (entièrement implémentée, sans aucun dysfonctionnement).

---

## III · Instructions générales

- [ ] Aucune erreur, warning ou notice, côté serveur ET côté client (console web incluse) · des `console.error // TODO` et des textes TODO rendus à l'écran subsistent (cf. VII.7, VII.9) + à vérifier en exécution
- [x] Micro-framework autorisé : routeur (+ templating éventuel), mais **sans ORM, sans validateurs, sans gestionnaire de comptes utilisateurs** · Fastify 5, SQL brut via `pg`, validation par JSON Schema natif de Fastify (Ajv intégré au framework, à justifier en soutenance), auth maison bcrypt + sessions Redis
- [x] Bibliothèques UI libres · React 18 + Tailwind + shadcn/Radix
- [x] Base de données **relationnelle ou orientée graphe, gratuite** · PostgreSQL 16.1 (`compose.yaml`)
- [x] Requêtes écrites **manuellement** (pas d'ORM) · SQL brut paramétré dans `back/src/db/queries/**`
- [x] **Minimum 500 profils distincts** en base · 501 profils seedés (`back/src/admin/data/generateUsers.ts`, faker seedé)
- [x] Serveur web libre · serveur intégré Fastify + Vite ⚠️ config prod non durcie (cf. VII.18)
- [ ] Compatible avec au moins les **dernières versions de Firefox et Chrome** · à tester en exécution
- [ ] Mise en page structurée : au minimum **en-tête + section principale + pied de page** · `HeaderNavbar` + `Outlet` + `FooterNavbar` dans `MobileLayout.tsx`, mais le "footer" est une barre de navigation et les pages auth (login/register/reset/complete) n'ont ni header ni footer
- [x] Site **adapté aux mobiles** · design mobile-first ⚠️ aucun breakpoint desktop, rendu étiré sur grand écran (chantier desktop détaillé en VII.23)
- [ ] **Tous les formulaires validés** correctement, site entièrement sécurisé · validation OK partout, MAIS endpoints `/admin` destructifs non protégés (bloquant, cf. VII.1)

## IV.1 · Inscription et connexion

- [x] Inscription avec au minimum : e-mail, nom d'utilisateur, nom de famille, prénom, mot de passe sécurisé · `POST /register` + schéma complet (`app.schemas.ts`), contraintes mdp (8+, maj/min/chiffre/spécial)
- [x] Les **mots anglais couramment utilisés refusés** comme mots de passe · blacklist de 25 603 mots (`back/src/data/words.txt`) ⚠️ non appliquée au reset ni au changement de mdp (cf. VII.5)
- [x] Après inscription, **e-mail avec lien unique** pour vérifier le compte · token Redis TTL 24 h, `GET /activate` active puis redirige vers le front
- [x] Connexion via **nom d'utilisateur + mot de passe** · `POST /login`, `bcrypt.compare`, session Redis + cookie
- [x] Demande d'**e-mail de réinitialisation du mot de passe** en cas d'oubli · `POST /forgot` (token 15 min, anti-énumération) → `GET /reset` → `PATCH /reset-password`
- [x] **Déconnexion en un seul clic depuis n'importe quelle page** du site · `HeaderNavbar.tsx:44`, session Redis supprimée + WS fermé

## IV.2 · Profil utilisateur

- [x] Une fois connecté, compléter son profil avec :
  - [x] Genre · enum `Male/Female/Undefined`
  - [x] Préférences sexuelles · enum `Straight/Gay/Bi`
  - [x] Biographie · `bio VARCHAR(256)`
  - [x] Liste d'intérêts via **tags réutilisables** · tables `tags` (44 seedés) + `user_tags`, `GET /tags`
  - [x] Jusqu'à **5 photos, dont une désignée photo de profil** · table `pictures` avec `is_principal`, schémas bornés à 5
- [x] Modification de ces informations **à tout moment**, ainsi que du nom de famille, prénom et adresse e-mail · `PATCH /user` (changement d'email avec re-vérification par lien email)
- [x] Voir **qui a consulté** son profil · `GET /user/views` ⚠️ seule la dernière visite par visiteur est conservée (ON CONFLICT DO UPDATE)
- [x] Voir **qui l'a « liké »** · `GET /user/likes`
- [x] **« Note de popularité » publique** pour chaque utilisateur · ELO 0-1000 (défaut 300), critères documentés dans `ELO.md`, calcul dans `updateEloOnVoteMutation.ts` / `updateEloOnMatchMutation.ts`
- [x] **Localisation GPS jusqu'au quartier, avec consentement explicite** · `navigator.permissions` + bouton de consentement (`complete/Step4.tsx`), reverse geocoding Nominatim
- [x] Si refus du suivi GPS → **saisie manuelle obligatoire** de la localisation approximative · autocomplete de ville (Nominatim), requise à la complétion du profil
- [x] Possibilité de **modifier sa localisation** dans son profil à tout moment · `settings/LocationSlider.tsx` + `PATCH /user`

## IV.3 · Navigation (profils suggérés)

- [x] Accès facile à une **liste de profils suggérés** correspondant aux préférences · `GET /users` + deck de swipe (`home/index.tsx`)
- [x] Suggestions cohérentes avec l'orientation (`getUsersQuery.ts`, filtre dans les deux sens) :
  - [x] Ex : une femme hétérosexuelle ne voit que des profils masculins
  - [x] **Bisexualité gérée**
  - [x] Orientation non spécifiée → **bisexuel par défaut** · NULL/`Undefined` traités comme bi
- [x] Correspondances déterminées **intelligemment** · score pondéré multi-critères (documenté dans `getUsersQuery.md`) :
  - [x] **Proximité géographique** · poids 40 (Haversine)
  - [x] **Plus grand nombre de tags partagés** · poids 20
  - [x] **Note de popularité la plus élevée** · poids 15
- [x] **Priorité aux utilisateurs de la même zone géographique** · la localisation a le poids le plus élevé du score
- [x] Liste suggérée **triable** par âge, localisation, note de popularité et tags communs · `sortBy ∈ {age, distance, elo, tags}` + `order`
- [x] Liste suggérée **filtrable** par âge, localisation, note de popularité et tags communs · `minAge/maxAge/maxDistance/minElo/maxElo/tags`

## IV.4 · Recherche avancée

- [x] Recherche par **un ou plusieurs critères** ⚠️ pas de page de recherche dédiée : le même endpoint `GET /users` et le même panneau (`SearchSettingsPanel.tsx`) filtrent le deck de suggestions ; fonctionnellement complet mais à assumer en soutenance (ou créer une vue résultats distincte) :
  - [x] Tranche d'âge
  - [x] Plage de note de popularité
  - [x] Localisation (distance max)
  - [x] Un ou plusieurs tags d'intérêt (`tags int[]`)
- [x] Résultats **triables** par âge, localisation, note de popularité et tags
- [x] Résultats **filtrables** par âge, localisation, note de popularité et tags

## IV.5 · Consultation de profil

- [x] Consulter les profils des autres : **toutes les informations disponibles sauf e-mail et mot de passe** · `getUserQuery.ts` n'expose ni email ni mdp
- [x] Chaque consultation **enregistrée dans l'historique de visites** · `createView` sur chaque `GET /user/:userId` ⚠️ dédupliquée par visiteur
- Depuis un profil, pouvoir :
  - [x] **« Liker »** la photo de profil · like mutuel → **« connectés »** → chat créé (`createVote` + table `chats`)
  - [x] **Impossible de liker sans photo de profil** soi-même · guard ajouté dans `createVote` (`app.service.ts`) : `hasPrincipalPicture(userId)` → `ForbiddenException("PROFILE_PICTURE_REQUIRED")` si le votant n'a pas de photo principale
  - [x] **Retirer un like** donné : coupe les notifications ultérieures et **désactive le chat** · `deleteVote` supprime le chat si match + envoie une notification `unlike` ; la connexion étant rompue, plus aucune notification future (message) ne peut arriver. Nuance mineure : un like retiré **avant** tout match laisse une notification `like` obsolète chez la cible (cf. VII.4)
  - [x] Consulter la **note de popularité** de l'autre utilisateur · `elo` affiché (`EssentialsSection.tsx`)
  - [x] Voir si l'utilisateur est **en ligne**, sinon **date et heure de sa dernière connexion** · `is_online` + `last_connexion` via WS connect/close ⚠️ pas de heartbeat, statut peut rester bloqué ; affiché sur la SwipeableCard mais pas dans EssentialsSection (cf. VII.11, VII.15)
  - [x] **Signaler** un utilisateur comme « faux compte » · table `reports`, `POST /user/report`
  - [x] **Bloquer** un utilisateur · paire symétrique `user_blocks`, exclusion des suggestions, votes + chat supprimés ⚠️ notifications existantes du bloqué toujours listées (cf. VII.4)
- [x] Voir clairement si le profil consulté a été **« liké »** ou si on est **« connectés »**, avec possibilité de **unliker / se déconnecter** · `is_liked`, `he_liked`, `is_matched` + `DELETE /user/vote/:targetId`

## IV.6 · Chat

- [x] **Chat en temps réel** (délai max **10 secondes**) entre utilisateurs connectés · WebSocket natif (`ws.controller.ts`), validation de l'appartenance au chat ⚠️ `LIMIT 10` de `getUserChatConversationQuery.ts` inopérant : tous les messages sont chargés (cf. VII.14)
- [x] Voir depuis **n'importe quelle page** la réception d'un nouveau message · `useSocket.ts` → `MessageToast` global

## IV.7 · Notifications (temps réel, délai max 10 s)

- [x] Réception d'un « like »
- [x] Consultation de son profil
- [x] Réception d'un message
- [x] Un utilisateur « liké » « like » en retour (match)
- [x] Un utilisateur connecté « unlike »
- [x] Voir depuis **n'importe quelle page** les notifications non lues · badge cloche `HeaderNavbar.tsx` ⚠️ contrainte `UNIQUE (user_id, sender_id, type)` : les événements répétés écrasent la notification existante au lieu de s'empiler (choix à assumer)

## Sécurité (toute faille = note 0)

- [x] Mots de passe **jamais stockés en clair** dans la base · bcrypt cost 10 partout (inscription, reset, update)
- [x] Aucune **injection HTML / JavaScript** dans des variables non protégées (XSS) · React, aucun `dangerouslySetInnerHTML` ⚠️ `firstName` injecté sans échappement dans le HTML des emails (mineur)
- [x] **Upload de contenu non autorisé** impossible · mimetype + validation du contenu réel via `sharp().metadata()`, limites taille/nombre, S3 noms aléatoires + URLs signées 15 min
- [x] Protection contre les **injections SQL** · 100 % paramétré (`$1, $2...`), les interpolations dans `getUsersQuery.ts` sont des constantes statiques
- [x] **Validation de toutes les entrées de formulaire et de tous les uploads de fichiers** · JSON Schema + `additionalProperties: false` sur toutes les routes à entrée, validateur custom 18+
- [x] Identifiants, clés API, variables d'environnement stockés dans un **`.env` exclu de Git** · `.gitignore` ✓, `git ls-files` clean, aucun secret dans `compose.yaml`

## V · Bonus (uniquement si partie obligatoire parfaite)

- [ ] Stratégies **OmniAuth** pour l'authentification · rien
- [ ] **Galerie photo** personnelle : upload par glisser-déposer + édition d'image basique · upload simple + compression seulement, pas de drag-and-drop ni crop/rotate/filtres
- [ ] **Carte interactive des utilisateurs** · rien (autocomplete texte seulement)
- [ ] **Chat vidéo ou audio** · icônes Phone/Video décoratives sans handler (`chat/:id/index.tsx:176-178`) : implémenter ou retirer
- [ ] **Planification de rendez-vous / événements réels** · boutons "Discover"/"Dates" sans logique (`chat/index.tsx:58-62`) : implémenter ou retirer

## VI · Rendu et évaluation par les pairs

- [ ] Rendu dans le **dépôt Git**, seul le contenu du dépôt est évalué, noms de dossiers/fichiers corrects · à vérifier au rendu
- [ ] Aucune erreur, warning ou notice serveur ou client (console web) lors de l'évaluation · à vérifier en exécution
- [ ] **Tout ce qui n'est pas explicitement autorisé est strictement interdit** · à re-balayer avant soutenance

## VII · Points relevés à la review (hors sujet, à corriger)

### 🔴 Bloquants (risque note 0 ou perte de données)

- [ ] 1. Endpoints `/admin` sans authentification (`app.plugin.ts:30`, TODO déjà présent) : `PUT /admin` drop + recrée la base + `redis.flushall()`, `DELETE /admin` drop la base. À supprimer ou protéger avant soutenance
- [x] 2. Cron de nettoyage : le `first_name = 'haha'` n'existe que dans `back/dist` (build compilé obsolète) ; la source `back/src/db/queries/app/deleteInactiveUsersMutation.ts` ne supprime que les comptes non activés depuis plus de 24 h. À régénérer le build avant rendu
- [x] 3. Guard « pas de like sans photo de profil » ajouté sur `createVote` (cf. IV.5)
- [x] 4. Notifications non purgées au block : les notifications déjà reçues d'un utilisateur bloqué restent listées (`getUserNotificationsQuery` sans filtre `user_blocks`). Nuance liée : un unlike pré-match laisse une notification `like` obsolète (cf. IV.5). Non exigé strictement par le sujet (« notifications ultérieures » = futures) → **accepté en l'état**
- [x] 5. Blacklist de mots de passe désormais appliquée au **reset** (`updateUserPassword`, repository) et au **changement de mdp** (`updateUser`, service) → `ForbiddenException("WORD_IN_PASSWORD")`. Vérifié end-to-end : reset et `PATCH /user` renvoient 403 sur un mot de passe contenant un mot courant, un mot de passe valide passe
- [x] 5b. Bug préexistant révélé au test : le changement de mot de passe via `PATCH /user` crashait en **500** (`bcrypt.compare` sur `user.password` `undefined`, car `getUser` n'expose pas le password — IV.5). Corrigé via une méthode `getUserPassword(userId)` dédiée. Vérifié : changement valide → 200, mauvais mot de passe courant → 403 `INVALID_PASSWORD`. La fonctionnalité obligatoire « modifier son mot de passe » (IV.2) était donc cassée et est maintenant fonctionnelle

### 🟠 Front · finitions visibles

- [x] 6. Localisation codée en dur `"Paris"` supprimée : ligne redondante avec la localisation réelle (`locationLabel`) déjà affichée au-dessus sur la `SwipeableCard` (via `PhotosSection`). Prop `location` retirée d'`EssentialsSection` et des deux appels (`home`, `preview`)
- [x] 7. Textes `// TODO EXPLIQUER CONSEQUENCES` remplacés par une vraie description des conséquences dans les dialogs block/report (`WarningSection.tsx`)
- [x] 8. Loaders placeholder (`Load`, `load`, `Loading...`, `Connecting ...`) dans ~10 vues à remplacer par de vrais loaders/skeletons
- [ ] 9. Gestion d'erreurs API : pas d'error boundary (query en erreur = écran blanc), pas d'intercepteur axios (`front/src/lib/axios.ts` sans `interceptors.response.use`), toasts utilisés de façon incohérente · TODO `App.tsx:23-30` toujours présent (« Style des messages d'erreur de form »)
- [x] 10. Page 404 ajoutée (`views/mobile/notFound`) et câblée dans `App.tsx` (`path="*"`), remplaçant le redirect silencieux ; import `Navigate` retiré
- [ ] 22. **Recheck global des messages d'erreur** · à faire en un seul passage, groupé avec VII.8/VII.9 qui touchent les mêmes fichiers :
  - [ ] **Couverture** : chaque code back a un texte front dédié. Codes actuellement SANS mapping front (→ message générique) : `PROFILE_PICTURE_REQUIRED`, `LOCATION_REQUIRED`, `LOCATION_NOT_FOUND`, `ORIENTATION_LOCKED_FOR_UNDEFINED_GENDER`, `INVALID_PICTURE_URL(_2)`, codes WS `INVALID_SOCKET_MESSAGE(_TYPE)`
  - [ ] **Résidus « mode dev » à retirer** : `front/src/lib/debugError.ts` (`DEBUG_ERRORS`/`forcedError`) encore importé en prod (register, home, preview, complete, settings) ; bloc TODO `App.tsx:23-31` ; TODO `register/index.tsx:17` ; `console.warn` `scheduler.plugin.ts:14`
  - [ ] **Ton unique et fidèle à l'app** : aujourd'hui un registre ludique (« …the spice your password needs. ») et un registre neutre (« Something went wrong… ») coexistent → choisir un seul ton qui colle à l'app et l'appliquer partout
  - [ ] **Fallback unifié** : une seule formulation générique (`ErrorState` par défaut, `useSocket.ts`, `complete/index.tsx`, `complete/Step1.tsx` divergent aujourd'hui)
  - [ ] **Typo/langue cohérente** : UI en anglais mais ponctuation FR (« …skip it ! ») → uniformiser sur toute l'UI
  - [ ] (Reco) **Centraliser** : enum/const de codes partagé côté back (`WORD_IN_PASSWORD` dupliqué `app.repository.ts:47,291`) + une table unique code→texte côté front, au lieu des `if (message === "CODE")` inline dispersés
- [ ] 23. **Version desktop (layout dédié)** · **obligatoire** (décision projet). État actuel : 100 % mobile-first, `MobileLayout` monté en dur dans `App.tsx`, aucun `useMediaQuery`/breakpoint, largeur non bornée. Approche retenue : layout desktop dédié.
  - [ ] Hook `useIsDesktop` (media query) + switch de layout au point d'injection unique `App.tsx`
  - [ ] `DesktopLayout` + miroir `front/src/views/desktop/` (convention 1 vue = 1 dossier `index.tsx`)
  - [ ] Navigation : `HeaderNavbar`/`FooterNavbar` mobile → sidebar desktop
  - [ ] Deck de swipe (`home/*`) : carte centrée bornée + actions latérales (plus de plein écran)
  - [ ] Chat en master-detail 2 colonnes (`chat/index` = liste à gauche, `chat/:id` = conversation à droite)
  - [ ] Bornage largeur global + pages auth (login/register/reset) centrées et bornées
  - [ ] Réutiliser le design system existant (variables CSS + shadcn/ui, `tailwind.config.js`) : seule la mise en page est à repenser

### 🟡 Robustesse / durcissement

- [ ] 12. Pas de rate limiting (brute-force `/login`, spam d'emails via `/forgot`)
- [ ] 13. Énumération d'emails/usernames au register et `PATCH /user` (erreurs `EMAIL_ALREADY_TAKEN`…) · à assumer ou mitiger
- [ ] 14. Pas de pagination : `GET /users` (limit seul), `/user/views`, `/user/likes`, `/user/notifications`, `/user/chats` non bornés ; `LIMIT 10` de la conversation inopérant (cf. IV.6)
- [ ] 15. `is_online` peut rester bloqué à TRUE (pas de heartbeat WS, map clients en mémoire, restart serveur)
- [ ] 16. Update de localisation par WS ignoré si `location_source = 'manual'` et ne rafraîchit jamais `location_label`
- [ ] 17. Pas de headers de sécurité HTTP (type helmet)
- [ ] 18. Config prod : `compose.yaml` lance Vite en dev avec volumes source montés, pas de build/reverse-proxy

### ⚪ Nettoyage

- [ ] 19. Dépendances à retirer : `crypto@1.0.1` côté back (package npm factice, le code utilise le module natif), `socket.io-client` (WebSocket natif utilisé), `bootstrap` (non utilisé)
- [ ] 20. Dossier `scripts/` vide à supprimer ou remplir
- [ ] 21. Bloc TODO en français dans `App.tsx:22-30` et commentaires TODO restants à traiter
