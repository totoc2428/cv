# 🚀 Portfolio Blog

## ✍️ Charles Coudé

📌 Une version en anglais de la description du projet existe [ici](./README.en.md).  
📌 An English version of the project is available [here](./README.en.md).

---

## 📚 Description

Ce projet est un **blog portfolio** développé avec **React, TypeScript et Vite**.  
Il utilise `react-router-dom` pour la navigation et inclut des configurations pour **ESLint et TypeScript**.

---

## ⚙️ Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```sh
npm install
```

**_OU_**

```sh
npm i
```

---

## ▶️ Utilisation

Pour démarrer le **serveur de développement**, utilisez la commande suivante :

```sh
npm run dev
```

---

## 🏧 Build

Pour créer une version **de production**, utilisez la commande suivante :

```sh
npm run build
```

---

## 🛠️ Configuration

Le projet utilise :

- 📌 Un fichier `tsconfig.node.json` pour la configuration de **[TypeScript](https://www.typescriptlang.org/)**.
- 📌 Un fichier `vite.config.ts` pour la configuration de **[Vite](https://vite.dev/guide/)**.

---

## 📂 Structure des données

### 📝 Fichiers JSON

Le projet utilise plusieurs fichiers JSON pour stocker les données :

- 📌 `/public/json/exp/exps.json` : Contient les **expériences professionnelles et projets**.
- 📌 `/public/json/exp/skills.json` : Liste des **compétences disponibles**.
- 📌 `/public/json/exp/tags.json` : **Tags** pour catégoriser les expériences.
- 📌 `/public/json/language/` : **Fichiers de traduction** (`fr.json` et `en.json`).

### 🖼️ Images

Les images des expériences sont stockées dans le dossier `/public/images/experiences/` avec la structure suivante :

- ✅ Chaque expérience peut avoir **jusqu'à 3 images**.
- ✅ Format : `/images/experiences/{expId}/{1|2|3}.png`.
- ✅ Les images sont **chargées dynamiquement et mises en cache**.

---

## 🌍 Déploiement

Le projet est configuré pour être déployé sur **Netlify**.  
La configuration est définie dans le fichier `netlify.toml` :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### 🛠️ Étapes de déploiement sur Netlify

1. 📝 **Créez un compte** sur [Netlify](https://www.netlify.com/).
2. 🔗 **Connectez votre dépôt GitHub**.
3. ⚙️ **Configurez le projet** :
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
4. 🚀 **Le déploiement se fera automatiquement** à chaque push sur la branche principale.

---

## 📦 Dépendances

Le projet utilise plusieurs dépendances :

### 📌 Dépendances principales :

- ⚛️ `react`: `^18.2.0`
- 🔄 `react-dom`: `^18.2.0`
- 🚩 `react-router-dom`: `^6.22.1`

### 🛠️ Dépendances de développement :

- 📌 `@types/react`: `^18.2.55`
- 📌 `@types/react-dom`: `^18.2.19`
- 📌 `@typescript-eslint/eslint-plugin`: `^6.21.0`
- 📌 `@typescript-eslint/parser`: `^6.21.0`
- 📌 `@vitejs/plugin-react`: `^4.3.4`
- 📌 `typescript`: `^5.2.2`
- 📌 `vite`: `^5.1.0`
