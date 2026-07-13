# Elo / Fame rating

Score de popularité de chaque profil.

- Échelle interne : **0 à 1000**
- Valeur de départ : **300**
- Clamp dur à 0 et 1000 (jamais déborder)

## Actions

| Action | Effet sur le profil ciblé | Pondéré par |
|--------|---------------------------|-------------|
| **Like reçu** | gagne des points | l'elo de celui qui like |
| **Dislike reçu** | perd des points | l'elo de celui qui dislike |
| **Match** | gagne des points (jamais négatif) | les elos des deux |

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
