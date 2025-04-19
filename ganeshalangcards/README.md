# Ganeshalangcards

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## 📜 Project History and Additional Features

## 🕘 History

This project is focused on providing an interactive flashcard application to help users learn languages. It offers various features such as customizable themes for different languages (e.g., Dutch and Spanish), filters for quiz selection, and redirection to improve user experience. It was built with the goal of creating a dynamic, user-friendly environment for language learners.

---

## 📁 Additional Files

In addition to the core files, this project includes language-specific themes and data files for **Dutch (NL)** and **Spanish (ES)**. These themes are stored in separate files to keep the project organized and easy to maintain.

- **Dutch Themes (NL)**: JSON files containing flashcards and quizzes tailored for Dutch learners.
- **Spanish Themes (ES)**: JSON files containing flashcards and quizzes tailored for Spanish learners.

---

## 🎯 Separation of Levels

The application content is structured by difficulty level:  
**Beginner**, **Intermediate**, and **Advanced**.  
This helps users gradually improve their language skills in a progressive way.

---

## 🔎 Filters and Redirection

Users can apply filters to personalize their quiz experience:

- **Language filter**: Choose the language to learn (e.g., NL, ES).
- **Theme filter**: Select a topic or context (e.g., restaurant, grammar).
- **Level filter**: Beginner, Intermediate, or Advanced.

➡️ After applying filters, the app redirects users to the appropriate quiz section automatically.

---

## 🌟 Key Features

- Dynamic flashcards and quizzes per language and level.
- Responsive design: Works great on smartphones and tablets.
- TTS (Text-to-Speech) support for pronunciation in multiple languages.
- Separation of themes and vocabulary per language in individual files.
- Filter-based navigation with automatic redirection.
- ✅ **User experience enhancement**: A `cursor: pointer` style is now applied to flashcards to indicate interactivity.


---

## 🔮 Future Updates

- Add support for more languages and additional vocabulary.
- Improve the quiz engine and add score tracking.
- Expand theme library with more cultural and practical topics.
- Improve UI/UX based on learner feedback.
