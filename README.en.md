# 🚀 Portfolio Blog

## ✍️ Charles Coudé

📌 An original version of the project description is available [here](./README.md).

---

## 📚 Description

This project is a **portfolio blog** developed with **React, TypeScript, and Vite**.  
It uses `react-router-dom` for navigation and includes configurations for **ESLint and TypeScript**.

---

## ⚙️ Installation

To install the project dependencies, run the following command:

```sh
npm install
```

**_OR_**

```sh
npm i
```

---

## ▶️ Usage

To start the **development server**, use the following command:

```sh
npm run dev
```

---

## 🏧 Build

To create a **production version**, use the following command:

```sh
npm run build
```

---

## 🛠️ Configuration

The project uses:

- 📌 A `tsconfig.node.json` file for **[TypeScript](https://www.typescriptlang.org/)** configuration.
- 📌 A `vite.config.ts` file for **[Vite](https://vite.dev/guide/)** configuration.

---

## 📂 Data Structure

### 📝 JSON Files

The project uses several JSON files to store data:

- 📌 `/public/json/exp/exps.json`: Contains **work experiences and projects**.
- 📌 `/public/json/exp/skills.json`: List of **available skills**.
- 📌 `/public/json/exp/tags.json`: **Tags** to categorize experiences.
- 📌 `/public/json/language/`: **Translation files** (`fr.json` and `en.json`).

### 🖼️ Images

Experience images are stored in the `/public/images/experiences/` folder with the following structure:

- ✅ Each experience can have **up to 3 images**.
- ✅ Format: `/images/experiences/{expId}/{1|2|3}.png`.
- ✅ Images are **loaded dynamically and cached**.

---

## 🌍 Deployment

The project is configured to be deployed on **Netlify**.  
The configuration is defined in the `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
```

### 🛠️ Deployment Steps on Netlify

1. 📝 **Create an account** on [Netlify](https://www.netlify.com/).
2. 🔗 **Connect your GitHub repository**.
3. ⚙️ **Configure the project**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. 🚀 **Deployment will be done automatically** on each push to the main branch.

---

## 📦 Dependencies

The project uses several dependencies:

### 📌 Main dependencies:

- ⚛️ `react`: `^18.2.0`
- 🔄 `react-dom`: `^18.2.0`
- 🚩 `react-router-dom`: `^6.22.1`

### 🛠️ Development dependencies:

- 📌 `@types/react`: `^18.2.55`
- 📌 `@types/react-dom`: `^18.2.19`
- 📌 `@typescript-eslint/eslint-plugin`: `^6.21.0`
- 📌 `@typescript-eslint/parser`: `^6.21.0`
- 📌 `@vitejs/plugin-react`: `^4.3.4`
- 📌 `typescript`: `^5.2.2`
- 📌 `vite`: `^5.1.0`
