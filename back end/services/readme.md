## Etapes pour lancer les service

### 1ere utilisation
dans le dossier "service", lancer la commande
```bash
make install-deps
```

### En suite

Si on ajoute un nouveau service/docker dans le dossier "service", lancer la commande

```bash
make build
```
pour creer l'image

pour lancer en mode dev, avec hot reloading (sans redemarrer les dockers), lancer la commande

```bash
make up
```

pour lancer en mode prod, lancer la commande

```bash
make up-prod
```

> Remarque: sur WebStorm, les commandes sont deja configurer pour etre run en haut a gauche.