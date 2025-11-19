# Meteor Methods Navigation

Une extension VS Code qui permet de naviguer rapidement vers les définitions de collections et méthodes Meteor en utilisant le "Go to Definition" (F12).

## Fonctionnalités

- **Navigation vers les collections** : Cliquez sur le nom d'une collection (ex: `Booking`) pour aller à sa définition
- **Navigation vers les méthodes** : Cliquez sur une méthode (ex: `Booking.methods.create`) pour aller à sa définition
- **Support multi-langages** : Fonctionne avec JavaScript, TypeScript, JSX et TSX

## Comment utiliser

1. Placez votre curseur sur une collection ou une méthode Meteor
2. Appuyez sur `F12` ou faites un clic droit → "Go to Definition"
3. L'extension vous amènera directement à la définition

### Exemples

```javascript
// Cliquez sur "Booking" pour aller à la définition de la collection
Booking.methods.create({ ... });

// Cliquez sur "create" pour aller à la définition de la méthode
Booking.methods.create({ ... });
```

## Structure de projet attendue

L'extension cherche les fichiers dans la structure suivante :

```
project/
├── imports/
│   └── api/
│       └── [collection-name]/
│           ├── index.js          (définition de la collection)
│           └── server/
│               └── methods.js     (définition des méthodes)
```

## Installation

### Depuis le marketplace VS Code

1. Ouvrez VS Code
2. Allez dans Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Recherchez "Meteor Methods Navigation"
4. Cliquez sur Installer

### Depuis un fichier .vsix

1. Téléchargez le fichier `.vsix`
2. Dans VS Code, allez dans Extensions
3. Cliquez sur les trois points (...) → "Install from VSIX..."
4. Sélectionnez le fichier téléchargé

## Développement

```bash
# Installer les dépendances
npm install

# Créer le package .vsix
npm run package
```

## Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

