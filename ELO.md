# Elo / Fame rating

Score de popularité de chaque profil.

- Échelle interne : **0 à 1000**
- Valeur de départ : **300**
- Clamp dur à 0 et 1000 (jamais déborder)

## Actions

| Action           | Effet sur le profil ciblé         | Pondéré par                |
| ---------------- | --------------------------------- | -------------------------- |
| **Like reçu**    | gagne des points                  | l'elo de celui qui like    |
| **Dislike reçu** | perd des points                   | l'elo de celui qui dislike |
| **Match**        | gagne des points (jamais négatif) | les elos des deux          |

## Formule (like / dislike)

```
Δcible = K * (V / 1000) * m
  V = elo du votant     K = 20 (amplitude max)     D = 400 (sensibilité à l'écart)
  E_V = 1 / (1 + 10^((T - V) / D))   // crédibilité du votant face à la cible T
  Like    : m = +E_V               // monotone : un gros elo booste fort
  Dislike : m = -4 * E_V * (1-E_V)  // cloche : max entre pairs, ~0 si gros écart
```

- `V / 1000` : plus le votant a d'elo, plus sa voix pèse.
- **Like** monotone : une star qui like un petit le booste beaucoup ; un petit qui like une star ne fait presque rien.
- **Dislike** en cloche de proximité : l'effet est maximal entre profils d'elo proche et tend vers 0 quand l'écart grandit, dans les deux sens. Une star ne peut donc **pas détruire** un petit, ni un petit entamer une star.
- Résultat borné par `round()` puis clampé à `[0, 1000]`.

## Formule (match)

Lors d'un match (like mutuel), **les deux** profils gagnent des points, jamais négatif.

```
Δu = K_match * (1 / (1 + 10^((u - o) / D)))
  u = elo du user     o = elo de l'autre     K_match = 30     D = 400
```

- `1 / (1 + 10^((u - o) / D))` = facteur « surprise » (= `1 - E_u`, la proba de défaite Elo classique).
- **Elo proche** (`u ≈ o`) : chacun gagne `≈ K_match / 2` → gain normal.
- **Gros écart** : le profil au plus faible elo gagne `≈ K_match` (beaucoup), celui au plus fort `≈ 0` (rien).
- Toujours positif ; le total distribué (`Δu + Δo`) reste `≈ K_match`, réparti selon l'écart.
- Ce gain s'ajoute **par-dessus** le gain du like reçu (un match = like reçu + bonus de match).
- Résultat `round()` puis clampé à `[0, 1000]`.
