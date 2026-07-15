/**
 * ⚠️ DEBUG TEMPORAIRE · À SUPPRIMER une fois la vérification terminée.
 *
 * Permet de forcer l'échec d'une query ou d'une mutation précise pour vérifier
 * visuellement, un cas à la fois, chaque état d'erreur géré dans l'app.
 *
 * Mode d'emploi :
 *   1. Passe UN seul flag à `true` ci-dessous.
 *   2. Va sur l'écran / déclenche l'action correspondante et vérifie l'affichage.
 *   3. Remets le flag à `false` et passe au suivant.
 *
 * NB : garde `verify` à `false` tant que tu vérifies les autres cas — le forcer
 * affiche l'écran d'erreur de boot et empêche d'atteindre les autres pages.
 */
export const DEBUG_ERRORS = {
	// --- Queries (affichage inline <ErrorState>) ---
	homeUsers: false, // /home : liste de suggestions
	previewUser: false, // /preview/:id : profil d'un autre user
	profile: false, // /profile : ton profil
	profileLikes: false, // /profile/likes
	profileViews: false, // /profile/views
	chatList: false, // /chat : liste des conversations
	chatConversation: false, // /chat/:id : une conversation
	completeTags: false, // /complete étape 1 : chargement des tags
	searchTags: false, // panneau de recherche : chargement des tags
	settingsTags: false, // settings > Tags : chargement des tags
	notifications: false, // cloche de notifications (dans le sheet)
	verify: false, // boot de l'app : écran "serveur injoignable" (bloque tout)

	// --- Mutations (toast ou message de formulaire) ---
	vote: false, // /home : like / dislike
	previewCreateVote: false, // /preview : like / dislike
	previewDeleteVote: false, // /preview : retrait du like
	block: false, // block d'un user
	report: false, // report d'un user
	logout: false, // déconnexion
	completeSubmit: false, // /complete : soumission finale du profil
	updateBio: false, // settings > Bio : sauvegarde
	updateTags: false, // settings > Tags : sauvegarde
	register: false, // /register : erreur non-403 (500 / réseau) → message générique

	// --- Services location (toast, hors query/mutation) ---
	locationByCoordinates: false, // bouton "Use my current location"
	locationSuggestions: false, // autocomplétion ville (à la saisie)
} as const

/**
 * Utilisable directement comme `queryFn` ou `mutationFn` :
 *   queryFn: DEBUG_ERRORS.x ? forcedError : realFn
 */
export function forcedError(): Promise<never> {
	return Promise.reject(new Error("FORCED_TEST_ERROR"))
}
