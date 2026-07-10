# getUsersQuery · Scoring

> Ne couvre que le calcul du `score`. Le reste de la requête sera documenté plus tard.

## Principe

Le `score` est une note **sur 100** : somme de sous-scores, chacun **normalisé 0-1** puis multiplié par un **poids**. La somme des poids fait 100.

```
score = Σ (sous_score_normalisé × poids)
```

L'importance d'un critère vit uniquement dans son poids ; la normalisation ne le connaît pas.

## Poids

| Critère            | Variable             | Poids   | Basé sur                                     |
| ------------------ | -------------------- | ------- | -------------------------------------------- |
| Localisation       | `locationScore`      | 40      | `sub.distance` (km, paliers)                 |
| Tags communs       | `commonTagsScore`    | 20      | `sub.common_tags`, plafonné à 5              |
| Note (elo)         | `eloScore`           | 15      | `sub.elo` / 1000                             |
| Âge                | `ageScore`           | 10      | `sub.age_gap` (paliers)                      |
| Déjà liké          | `isLikedScore`       | 7       | `sub.he_liked` (0 ou 1)                      |
| Dernière connexion | `lastConnexionScore` | 5       | `sub.last_connexion` + `is_online` (paliers) |
| Nombre de photos   | `nbPicturesScore`    | 3       | `sub.pictures_count` / 5                     |
| **Total**          |                      | **100** |                                              |

## Conventions

- Modèle par **paliers** (`CASE`) pour distance, âge, dernière connexion : plus lisible et robuste.
- Le cas `NULL` (donnée manquante) est toujours testé en premier et vaut `0`.
- Le dernier palier ne vaut jamais `0` mais un résidu (`0.05`) pour rester classable.
- Divisions forcées en flottant (`/ 5.0`, `/ 1000.0`) pour éviter la division entière.

## À calibrer

- Seuil des tags (`5`) et bornes des paliers : à ajuster sur données réelles.
- Défaut elo à 300 : un nouveau compte démarre bas sur ce critère.
