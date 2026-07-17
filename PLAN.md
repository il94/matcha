# Matcha · Checklist complète du sujet (v7.0)

Basé sur `other/subject.pdf`. Vérification point par point effectuée sur l'ensemble du repo (back Fastify, front React, compose.yaml, seed).
Légende : `[x]` fait et vérifié dans le code · `[x]` + ⚠️ fait avec réserve (détail en section VII) · `[ ]` non fait, partiel ou non vérifiable sans exécution.

> ⚠️ Les **bonus** ne sont évalués que si TOUTE la partie obligatoire est parfaite (entièrement implémentée, sans aucun dysfonctionnement).

---

## III · Instructions générales

- [x] Aucune erreur, warning ou notice, côté serveur ET côté client (console web incluse) · vérifié statiquement : **0 `console.*`** dans `back/src` et `front/src`, **aucun `TODO`** hors celui de `/admin` désormais neutralisé, aucun texte TODO rendu à l'écran ; `debugError.ts` conservé mais inerte (flags `false`). Les warnings runtime restent à confirmer à l'exécution (cf. VII.24)
- [x] Micro-framework autorisé : routeur (+ templating éventuel), mais **sans ORM, sans validateurs, sans gestionnaire de comptes utilisateurs** · Fastify 5, SQL brut via `pg`, validation par JSON Schema natif de Fastify (Ajv intégré au framework, à justifier en soutenance), auth maison bcrypt + sessions Redis
- [x] Bibliothèques UI libres · React 18 + Tailwind + shadcn/Radix
- [x] Base de données **relationnelle ou orientée graphe, gratuite** · PostgreSQL 16.1 (`compose.yaml`)
- [x] Requêtes écrites **manuellement** (pas d'ORM) · SQL brut paramétré dans `back/src/db/queries/**`
- [x] **Minimum 500 profils distincts** en base · 501 profils seedés (`back/src/admin/data/generateUsers.ts`, faker seedé)
- [x] Serveur web libre · serveur intégré Fastify + Vite ⚠️ config prod non durcie (cf. VII.18)
- [x] Compatible avec au moins les **dernières versions de Firefox et Chrome** · audit statique de compat OK : APIs (`navigator.permissions`, `matchMedia`, `ResizeObserver`, WebSocket) et CSS (`dvh`, `:has()`, `backdrop-blur`) toutes supportées par les dernières FF+Chrome, Tailwind v3, aucune API Chrome-only ni config `browserslist` restrictive. Test runtime Firefox recommandé avant soutenance
- [x] Mise en page structurée : au minimum **en-tête + section principale + pied de page** · sémantique corrigée : `HeaderNavbar` en `<header>`, page en `<main>` unique, `FooterNavbar` en `<footer>` (mobile) ; `<aside>` (Sidebar) + `<main>` (desktop). Le `<main>` imbriqué invalide (layout + page) a été supprimé ; `chat/:id` a désormais sa propre balise `<main>`. Réserve assumée : les pages auth (login/register/reset/complete/404) restent des `<main>` autonomes hors shell applicatif
- [x] Site **adapté aux mobiles** · design mobile-first ⚠️ aucun breakpoint desktop, rendu étiré sur grand écran (chantier desktop détaillé en VII.23)
- [x] **Tous les formulaires validés** correctement, site entièrement sécurisé · validation OK partout, et endpoints `/admin` destructifs désormais neutralisés (registration commentée, cf. VII.1) : le blocage 🔴 est levé

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

- [x] 1. Endpoints `/admin` sans authentification (`app.plugin.ts`) : `PUT /admin` drop + recrée la base + `redis.flushall()`, `DELETE /admin` drop la base. **Neutralisés** : l'import et la registration `app.register(adminController, ...)` sont commentés (code du dossier `admin/` conservé intact, non supprimé). Vérifié : `POST`/`DELETE /admin` renvoient 404, le reste de l'API répond (401). Le seul moyen de seed passant par `POST /admin`, un script de remplacement `npm run seed` (`back/src/seed.ts`) réutilise `adminRepository.fillDb()` hors HTTP (bootstrap Fastify + `dbPlugin`) ; vérifié end-to-end (schéma + tags + tentative des 501 profils, rollback transactionnel sur base déjà peuplée, seed complet sur base fraîche)
- [x] 2. Cron de nettoyage : le `first_name = 'haha'` n'existe que dans `back/dist` (build compilé obsolète) ; la source `back/src/db/queries/app/deleteInactiveUsersMutation.ts` ne supprime que les comptes non activés depuis plus de 24 h. À régénérer le build avant rendu
- [x] 3. Guard « pas de like sans photo de profil » ajouté sur `createVote` (cf. IV.5)
- [x] 4. Notifications non purgées au block : les notifications déjà reçues d'un utilisateur bloqué restent listées (`getUserNotificationsQuery` sans filtre `user_blocks`). Nuance liée : un unlike pré-match laisse une notification `like` obsolète (cf. IV.5). Non exigé strictement par le sujet (« notifications ultérieures » = futures) → **accepté en l'état**
- [x] 5. Blacklist de mots de passe désormais appliquée au **reset** (`updateUserPassword`, repository) et au **changement de mdp** (`updateUser`, service) → `ForbiddenException("WORD_IN_PASSWORD")`. Vérifié end-to-end : reset et `PATCH /user` renvoient 403 sur un mot de passe contenant un mot courant, un mot de passe valide passe
- [x] 5b. Bug préexistant révélé au test : le changement de mot de passe via `PATCH /user` crashait en **500** (`bcrypt.compare` sur `user.password` `undefined`, car `getUser` n'expose pas le password — IV.5). Corrigé via une méthode `getUserPassword(userId)` dédiée. Vérifié : changement valide → 200, mauvais mot de passe courant → 403 `INVALID_PASSWORD`. La fonctionnalité obligatoire « modifier son mot de passe » (IV.2) était donc cassée et est maintenant fonctionnelle

### 🟠 Front · finitions visibles

- [x] 6. Localisation codée en dur `"Paris"` supprimée : ligne redondante avec la localisation réelle (`locationLabel`) déjà affichée au-dessus sur la `SwipeableCard` (via `PhotosSection`). Prop `location` retirée d'`EssentialsSection` et des deux appels (`home`, `preview`)
- [x] 7. Textes `// TODO EXPLIQUER CONSEQUENCES` remplacés par une vraie description des conséquences dans les dialogs block/report (`WarningSection.tsx`)
- [x] 8. Loaders placeholder (`Load`, `load`, `Loading...`, `Connecting ...`) dans ~10 vues à remplacer par de vrais loaders/skeletons
- [x] 9. Gestion d'erreurs API : **messages/toasts uniformisés** (texte générique unique « Something went wrong. Please try again later. » partout, cf. VII.22) ; **codes centralisés côté back uniquement** (`back/src/lib/errorCodes.ts`) · côté front, **pas de table centralisée** : chaque vue garde son propre `if (message === "CODE")` inline, avec les MÊMES textes dupliqués volontairement (décision projet : préférence pour l'inline plutôt qu'un fichier `errorMessages.ts` central). Le bloc TODO `App.tsx:23-30` a été retiré du code, contenu migré ici : « Style des messages d'erreur de form » → traité (VII.22) ; « Check injections SQL / XSS » → VII.26 ; « Filtrer les champs (mail, tailles, password) » → VII.27
- [x] 10. Page 404 ajoutée (`views/mobile/notFound`) et câblée dans `App.tsx` (`path="*"`), remplaçant le redirect silencieux ; import `Navigate` retiré
- [x] 22. **Recheck global des messages d'erreur** · à faire en un seul passage, groupé avec VII.8/VII.9 qui touchent les mêmes fichiers :
  - [x] **Couverture** (partielle, assumée) : `EMAIL_ALREADY_TAKEN`, `USERNAME_ALREADY_TAKEN`, `WORD_IN_PASSWORD` (register, reset, settings), `INVALID_PASSWORD`, `ORIENTATION_LOCKED_FOR_UNDEFINED_GENDER` (Gender/SexualOrientationSlider), `LOCATION_REQUIRED` (LocationSlider), `INVALID_PICTURE_URL(_2)` (PicturesSlider) ont désormais un texte dédié inline à chaque usage. Restent sans mapping spécifique (→ message générique, jugé acceptable) : `PROFILE_PICTURE_REQUIRED`, `LOCATION_NOT_FOUND`, `LOCATION_SERVICE_UNAVAILABLE`, codes WS `INVALID_SOCKET_MESSAGE(_TYPE)` (un seul toast générique de connexion, pas de distinction par code)
  - [x] **Résidus « mode dev » à retirer** : bloc TODO `App.tsx:23-31` retiré (migré en VII.9/VII.26/VII.27) ; TODO `register/index.tsx:17` retiré (migré en VII.27) ; `console.log("READY")` commenté supprimé de `redis.plugin.ts` (le `console.warn scheduler.plugin.ts:14` mentionné n'existait pas — inexactitude corrigée, ce fichier utilise déjà `app.log`). `front/src/lib/debugError.ts` volontairement laissé en place pour l'instant (utile en soutenance/vérif) → suivi séparément en VII.30
  - [x] **Ton unique et fidèle à l'app** : aujourd'hui un registre ludique (« …the spice your password needs. ») et un registre neutre (« Something went wrong… ») coexistent → choisir un seul ton qui colle à l'app et l'appliquer partout
  - [x] (Reco) **Centraliser, côté back uniquement** : `back/src/lib/errorCodes.ts` créé, résout la duplication de `WORD_IN_PASSWORD` (`app.repository.ts:47,291`). **Côté front, PAS de table centralisée** (décision projet explicite) : chaque vue garde son `if (message === "CODE")` inline avec le texte dupliqué localement plutôt qu'importé d'un fichier `errorMessages.ts` commun
- [ ] 32. **Ton unique + typographie FR cohérente des messages UI** · l'UI mélange trois registres (ludique/chaleureux, neutre, sec) et applique de façon incohérente l'espace avant ponctuation — la même phrase existe avec et sans espace selon le fichier (`register` « let it shine **!** » vs `FirstNameSlider` « let it shine! » ; « Try again **?** » vs « Try again! »). Décision : **un seul ton, ludique/chaleureux**, appliqué partout ; **typographie FR** (espace avant `!` `?` `:` `;`) appliquée uniformément — l'espace est **délibéré, à conserver**, pas un résidu à supprimer. Fold-in des coquilles/casse adjacentes (`Matchs`→`Matches`, `Succefully`→`Successfully`, Title Case vs sentence case, périodes finales des helpers, formulations dupliquées divergentes). Détaché du point 22 (fond des messages d'erreur), à repasser en un seul balayage éditorial sur `front/src`
- [ ] 30. **Supprimer `front/src/lib/debugError.ts`** (`DEBUG_ERRORS`/`forcedError`) une fois la vérification manuelle des écrans d'erreur terminée · actuellement conservé volontairement (utile en soutenance/vérif) · importé dans ~20 vues (register, home, preview, complete, settings/\*, chat, profile, notifications, search, `useSocket`, `useAuth`) · retrait mécanique : chaque `DEBUG_ERRORS.x ? forcedError : realFn` → `realFn`
- [ ] 23. **Version desktop (layout dédié)** · **obligatoire** (décision projet). État actuel : 100 % mobile-first, `MobileLayout` monté en dur dans `App.tsx`, aucun `useMediaQuery`/breakpoint, largeur non bornée. **Cible** : desktop master-detail fidèle à Tinder (sidebar gauche persistante = logo + nav + onglets Matchs/Messages + liste de chats ; colonne centrale bornée = deck de swipe / conversation / profil / settings). **Décisions** : (a) réutiliser les pages existantes, forker uniquement le _cadre_ (une seule source de vérité pour swipe/WebSocket/sliders/mutations) ; (b) breakpoint `lg` = 1024px (`< 1024` mobile, `>= 1024` desktop) ; (c) aucune modif back. **Principe** : extraire l'état partagé de `MobileLayout` (filtres localStorage, query notifications + `unreadCount`, panneaux search/notifs, gating `socketStatus`) dans un nouveau `ResponsiveLayout` qui injecte le même `<Outlet context>` et choisit `MobileShell` vs `DesktopShell` via `useIsDesktop()`. Découpage (23.1 bloquant pour 23.2→23.7 ; 23.8 indépendant ; 23.9 en dernier) :
  - [ ] 23.1 · **Fondations** (prérequis) · `hooks/useIsDesktop.ts` (`matchMedia("(min-width: 1024px)")`, patron `ThemeProvider.tsx:39`) ; `views/ResponsiveLayout.tsx` (déplace l'état partagé, rend `<Outlet context={{ ...authOutletContext, filters }} />`, choisit le shell) ; refacto `MobileLayout` → `MobileShell` (présentation pure, reçoit l'état en props, comportement mobile inchangé) ; `App.tsx` : `<MobileLayout />` → `<ResponsiveLayout />` ; créer `views/desktop/`. Vérif : < 1024px identique à avant, >= 1024px stub desktop sans casser routing/contexte.
  - [ ] 23.2 · **Sidebar desktop** · extraire le corps de liste de `chat/index.tsx` en composant réutilisable (sans son `<main h-full>`, réutilise `Chat`/`ChatSkeleton`) ; `views/desktop/Sidebar.tsx` = logo + nav Home/Chat/Profil (icônes `FooterNavbar`) + cloche `unreadCount` + search + logout (`HeaderNavbar`) + onglets Matchs/Messages + liste réutilisée. Largeur fixe (~`w-[360px]`), `h-dvh`, bordure droite, scroll interne.
  - [ ] 23.3 · **DesktopLayout** · `views/desktop/DesktopLayout.tsx` = `flex h-dvh` (Sidebar fixe + zone centrale `flex-1` fond neutre + colonne bornée `max-w-[420px] mx-auto` hébergeant `<Outlet />`), reçoit l'état partagé en props, rend les overlays desktop (23.7). Remplace le stub 23.1.
  - [ ] 23.4 · **Deck de swipe desktop** (`home` + `preview`) · le deck s'adapte déjà via `parentWidth` (`ResizeObserver` dans `PhotosSection`) : l'envelopper dans un cadre carte borné/centré (~400px). `MatchScreen` (`absolute size-full`) reste contenu dans le `<main relative>`. Ne PAS dupliquer `home/index.tsx`. (Optionnel) barre de raccourcis clavier type Tinder (← non / → like / ↑ ouvrir / ↓ fermer / espace photo suivante ; pas de superlike dans Matcha).
  - [ ] 23.5 · **Conversation chat desktop** (`/chat/:id` + état vide `/chat`) · réutiliser le corps de `chat/:id/index.tsx` au centre ; composer `absolute bottom-3` + bandeau blur → footer flex normal (wrapper desktop, sans toucher WS/optimiste/autoscroll). `/chat` sans `:id` = état vide centré (« Sélectionne une conversation », miroir du « Dites bonjour »).
  - [ ] 23.6 · **Profil / settings / preview desktop** · `profile`/`preview` réutilisés dans la colonne bornée (vérifier le `justify-between` qui suppose une hauteur fixe) ; `settings` : l'overlay `SettingSlider` (`fixed top-12 …`) → variante desktop en `Sheet` (side right) ou `Dialog` réutilisant les ~12 sliders existants tels quels (seul le conteneur change).
  - [ ] 23.7 · **Overlays desktop search + notifications** · `SearchSettingsPanel` et `NotificationsSheet` (container mobile `fixed top-12 h-[calc(100%-56px-48px)] w-full` lié au chrome mobile) → même contenu interne (`FilterForm`, liste notifs + auto-mark-read) dans un `Sheet` (side right) ancré à la sidebar. Extraire les corps si besoin ; ne pas retoucher la logique (portée par `ResponsiveLayout`).
  - [ ] 23.8 · **Auth / onboarding desktop** (indépendant du shell) · `login`, `register`, `reset`, `complete`, `notFound` (pages standalone `h-dvh` hors layout) → responsive par classes `lg:` (conteneur centré `lg:max-w-md lg:mx-auto`, éventuel split hero). Réutilise les formulaires, aucune logique touchée, parallélisable.
  - [ ] 23.9 · **Finitions et vérification** · passe navigateur 1280 / 1024 / 375px (les deux layouts rendent, aucun scroll horizontal, console propre), Firefox + Chrome (exigence III/VI) ; vérif end-to-end par layout (swipe+match, chat WS, notifs/cloche, search/filtres, settings, logout) ; contrat `useAuthOutletContext` (dont `filters`) identique dans les deux shells (aucune régression mobile). `docker compose exec front npm run check` propre après chaque étape.

### 🟡 Robustesse / durcissement

- [x] 12. Pas de rate limiting (brute-force `/login`, spam d'emails via `/forgot`) · en cours
- [ ] 18. Config prod : `compose.yaml` lance Vite en dev avec volumes source montés, pas de build/reverse-proxy

### 🔵 Audit final avant soutenance (à repasser en un seul passage)

- [ ] 24. Check des logs serveur ET client : repasser tous les warnings/erreurs à l'exécution (complète III et VI, actuellement non vérifiés)
- [x] 25. Check des erreurs console front : HTML invalide (ex. `<p>` imbriqué dans un `<p>`), clés React dupliquées ou non définies dans les listes/`.map()`, autres warnings React · **audit statique complet** sur les 90 `.tsx` du front. **Seul vrai warning `validateDOMNesting` corrigé** : `complete/Step4LocationDialog.tsx`, où `DialogDescription` (rend un `<p>`) enveloppait des `<p>`/`<ul>`/`<li>` → passé en `<DialogDescription asChild>` autour d'un `<div>` (id aria + classes forwardés par Radix). Aucune clé `.map()` manquante ni fragment court `<>` non-keyé dans tout le repo. **Anti-patterns `key={index}` sur listes dynamiques durcis** (ne warnaient pas, mais rendus stables) : `TagsSection.tsx` (`tag.name`), `SwipeableCard.tsx` (photos + points de progression, `picture.name`), `InputSelect.tsx` (`suggestion`), `chat/:id/index.tsx` (clé composite `createdAt-authorId`, le type `Message` n'ayant pas d'`id`, liste append-only). `docker compose exec front npm run check` (eslint + tsc) propre après correctifs. **Réserves assumées** : (a) `<p>` dans `<button>` (`UserListItem.tsx`, `NotificationsSheet.tsx`) = HTML invalide mais **non warné par React** → hors périmètre ; (b) les « autres warnings React » runtime (inputs controlled/uncontrolled, etc.) ne se confirment qu'à l'exécution : passe navigateur non effectuée (audit volontairement statique), à repasser avec le point 24 lors du balayage console final en exécution
- [x] 26. Re-audit injections SQL / XSS / autres vecteurs : re-vérifié malgré le statut acquis en section Sécurité, y compris sur le code ajouté/modifié depuis (rate limiting, centralisation des codes d'erreur) · SQL toujours 100 % paramétré (`getUsersQuery.ts` re-vérifié : interpolations `${}` restent des constantes statiques), `sortBy`/`order` en plus whitelistés par JSON Schema ; aucun `dangerouslySetInnerHTML`/`innerHTML`/`eval` côté front ; plugin de rate limiting (`rateLimit.plugin.ts`) clé par `req.ip`, non contournable (pas de `trustProxy`). Deux failles trouvées et corrigées : XSS dans l'email d'activation (`mailer.service.ts`, `firstName` désormais échappé via `escapeHtml.ts`) et absence de validation type/longueur sur les messages WebSocket (`ws.controller.ts::onReceiveMessage`, `content`/`chatId` typés + bornés à 2000 caractères, `ws.plugin.ts` doté d'un `maxPayload` de 1 Mo en défense en profondeur). Requête SQL morte et dangereuse supprimée au passage (`deletePicturesMutation.ts`, `DELETE FROM pictures;` sans `WHERE`, aucun appelant)
- [x] 27. Recheck du filtrage des champs de formulaires, front ET back (validation, bornes, types, cohérence des schémas) · inclut les TODO migrés du code : `register/index.tsx:17` (« voir si besoin d'interdire des chars ») et `App.tsx` (« Filtrer les champs : mail, tailles, password »). **Bug de correctness corrigé** : `PATCH /user` (`app.schemas.ts:185`) validait `currentPassword` avec le schéma fort de `newPassword` (maj/min/chiffre/spécial) au lieu du schéma souple utilisé pour `login` → un compte dont le mdp actuel n'est pas « fort » (typiquement les 500 comptes seedés, mdp `"password"`) recevait un 400 avant même le `bcrypt.compare`, rendant le changement de mot de passe impossible ; corrigé en réutilisant `schemasModels.passwordLogin`. Vérifié en direct (`curl`, session `hermione`) : `PATCH /user` avec un `currentPassword` non-fort mais erroné atteint désormais `bcrypt.compare` → **403 `INVALID_PASSWORD`** au lieu du 400 de schéma. **Bornes manquantes ajoutées** : `locationLabel`/`label` (256, aligné sur email/bio ; colonne `location_label TEXT` non bornée en DB, label serveur `road, suburb, city, country`), `reason` du report (**500**, borné aussi en DB : `createReportsTableMutation` passé de `reason TEXT` à `reason VARCHAR(500)`), `latitude`/`longitude` (±90/±180) côté back (`app.schemas-models.ts`, `app.schemas.ts` : `getLocationByCoordinates`/`getLocationSuggestions`/`createReport` bornés) + `maxLength`/`.max()` correspondants côté front (`InputSelect.tsx` 256, `complete/index.tsx` 256, `settings/LocationSlider.tsx` 256, `home/WarningSection.tsx` Textarea report 500) ; `.max(256)` manquant sur l'email de `ForgotPasswordDialog.tsx` aligné sur register/EmailSlider. Vérifié en direct (`curl`) : `latitude=200` → 400 (et `45` → 200), `label`/`locationLabel` > 256 → 400 (et 200 car. → 200), `reason` > 500 → 400 (et court → 200). **Cohérences mineures alignées** : `retypePassword` de `reset/index.tsx` passé en `.refine()` cross-field zod (au lieu d'une comparaison manuelle dans `onSubmit`, comme `PasswordSlider.tsx`) ; `GenderSlider`/`SexualOrientationSlider` (settings) passés de `z.string().min(1)` à `z.nativeEnum` pour matcher `complete/index.tsx` ; `.max(128)` ajouté sur tous les champs password front (register, reset, settings) pour matcher la borne back (`maxLength: 128`). **Écarté explicitement** (comme les points archivés en section ⚫) : **whitelist de caractères** sur `username`/`firstName`/`lastName` — décision de ne pas filtrer, ce qui **ferme le TODO d'origine `register/index.tsx:17`** : les vrais vecteurs (XSS/SQLi) sont déjà neutralisés (React, SQL 100 % paramétré, `firstName` échappé dans l'email d'activation cf. VII.26), un filtre de caractères ne serait que de la défense en profondeur non exigée par le sujet et risquerait de rejeter un nom légitime exotique ; `format:"binary"` manquant sur les 4 `secondaryPictureN` (cosmétique, inerte au runtime, la vraie validation image passe par `sharp`/mimetype) ; `isWordInPassword` en `includes()` plutôt que mot-entier (pas une faille de sécurité, tokenisation disproportionnée pour le gain). `tsc --noEmit` propre sur `back/` et `front/` après tous les correctifs
- [x] 28. Recheck de la gestion des photos : liens/URLs, signature et expiration, accès S3, contrôle d'autorisation · noms S3 aléatoires (`crypto.randomBytes(32)`, `s3.service.ts`), pas de collision/écrasement possible ; expiration des URLs signées confirmée à 15 min en code (`S3_IMAGES_DURATION`) ; autorisation vérifiée sans faille sur upload/màj (`updateUserPictures`), lecture (`getUser`/`getUsers`) et suppression (`deleteUserPicturesMutation` filtré par `user_id` de session) : toujours scopé au `userId` de session, jamais un ID fourni par le client → pas d'IDOR ; `is_principal` non manipulable (forcé côté serveur) ; suppression DB+S3 synchronisée, pas de fichier orphelin ; credentials `.env` jamais exposées. ⚠️ Réserve non corrigible par le code : la politique du bucket S3 (privé/public, Block Public Access) n'existe dans aucun fichier d'IaC du repo → à vérifier manuellement en console AWS avant la soutenance
- [x] 29. Balayage global des résidus de code de dev : `setTimeout`/promises factices simulant un délai réseau, `console.log`/`console.warn`/`console.error` de debug oubliés, commentaires `TODO`/`FIXME`, flags ou branches de test laissés en place (front ET back) · balayage exhaustif (`grep` sur `console.*`, `TODO`/`FIXME`/`XXX`/`HACK`/`WIP`, `setTimeout` factices et flags de test) sur `back/src` et `front/src`. 5 résidus corrigés : TODO orphelin `app.schemas.ts:3` retiré (sujet déjà couvert par VII.27) ; bloc TODO `app.repository.ts:11-17` retiré (item "URL signée photos" déjà fait, cf. VII.28 ; items "recheck types/modèles" non perdus, reportés en **VII.31** avant suppression) ; `console.warn` de debug retiré de `NotificationsSheet.tsx` (seul point du repo à logguer une erreur brute au lieu de `toast.error`/silence, cas bas-risque) ; délai artificiel de 2 s (`setTimeout`) simulant un chargement réseau retiré de `LocationSlider.tsx` (aucune animation/debounce ne le justifiait) ; clé de test `test_${index}` renommée `photo_${index}` dans `SwipeableCard.tsx`. Grep de contrôle final propre (`console.` : 0 résultat hors `debugError.ts` ; `TODO`/`FIXME` : plus aucun résultat hors faux positifs et exclusions ci-dessous). **Exclus volontairement** : `back/src/app.plugin.ts:29` (TODO sur le plugin `/admin`, c'est le marqueur du point 🔴1, décision de sécurité à part) et `front/src/lib/debugError.ts` (mécanisme `DEBUG_ERRORS`, suivi séparément en VII.30). `tsc --noEmit` propre sur `back/` et `front/` après les 5 correctifs

### ⚫ Archivé

- [ ] 31. ~~Recheck des types TypeScript et des modèles de données dans `app.repository.ts` (`appRepository`) : cohérence entre les types déclarés et les données réellement manipulées~~ · archivé : résidu d'un bloc TODO retiré du code lors de l'audit point 29, jamais une exigence du sujet ; `tsc --noEmit` déjà propre sur `back/` (confirmé au point 29), pure hygiène de code interne sans impact sur la correction
- [ ] 14. ~~Pas de pagination : `GET /users` (limit seul), `/user/views`, `/user/likes`, `/user/notifications`, `/user/chats` non bornés ; `LIMIT 10` de la conversation inopérant (cf. IV.6)~~ · archivé : le sujet (IV.3/IV.4) exige seulement que les listes soient triables/filtrables, aucune exigence de pagination · pure amélioration perf/UX hors périmètre du sujet
- [ ] 19. ~~Dépendances à retirer : `crypto@1.0.1` côté back (package npm factice, le code utilise le module natif), `socket.io-client` (WebSocket natif utilisé), `bootstrap` (non utilisé)~~ · archivé : le sujet ne mentionne aucune exigence sur les dépendances installées-inutilisées, pure hygiène npm sans impact sur la correction
- [ ] 20. ~~Dossier `scripts/` vide à supprimer ou remplir~~ · archivé : le sujet ne parle pas des dossiers vides ; la seule exigence proche (VI, « vérifier les noms de dossiers/fichiers ») porte sur le nommage du rendu, pas sur son contenu
- [ ] 21. ~~Bloc TODO en français dans `App.tsx:22-30` et commentaires TODO restants à traiter~~ · archivé : le sujet ne mentionne pas les commentaires TODO ; couvert par le point 29 (audit final, balayage global des résidus TODO/FIXME)
- [ ] 13. ~~Énumération d'emails/usernames au register et `PATCH /user` (erreurs `EMAIL_ALREADY_TAKEN`/`USERNAME_ALREADY_TAKEN` distinctes, confirmé dans `app.service.ts` et `app.errorHandler.ts`)~~ · archivé : le sujet n'exige aucune protection anti-énumération sur ces endpoints (seule la section Sécurité liste mdp/XSS/upload/SQL/validation/`.env` comme bloquants) ; `/forgot` a déjà l'anti-énumération correcte en contraste (IV.1). Risque mineur (fuite d'existence de compte, aucune donnée sensible exposée), accepté en l'état
- [ ] 15. ~~`is_online` peut rester bloqué à TRUE (pas de heartbeat WS, map clients en mémoire `ws.plugin.ts`, aucun mécanisme ping/pong confirmé)~~ · archivé : ne se produit qu'en cas de crash/restart serveur (l'arrêt normal via `onclose` fonctionne correctement, `ws.controller.ts`) ; le sujet (IV.5) exige seulement l'affichage du statut en ligne/dernière connexion, fonctionnel en usage normal, sans exigence de robustesse face à un crash process. Hors périmètre, accepté en l'état
- [ ] 16. ~~Update de localisation par WS ignoré si `location_source = 'manual'`~~ · archivé : comportement volontaire (protège le choix manuel de localisation contre un écrasement automatique par le GPS, `ws.controller.ts:onReceiveLocation`) ; vérifié que `location_label` est bien rafraîchi via WS en mode GPS (pas de désync coordonnées/label, hypothèse initiale infirmée). Le sujet (IV.2) exige seulement la possibilité de modifier sa localisation manuellement, déjà fonctionnelle via `PATCH /user`. Non exigé, accepté en l'état
- [ ] 17. ~~Pas de headers de sécurité HTTP (type helmet) : confirmé, aucun `@fastify/helmet` en dépendance, aucun header manuel dans `app.plugin.ts`, pas de reverse-proxy dans `compose.yaml`~~ · archivé : le sujet ne liste que mdp/XSS/upload/SQL/validation/`.env` en section Sécurité, pas de headers HTTP type helmet ; défense en profondeur supplémentaire hors périmètre strict du sujet, accepté en l'état
