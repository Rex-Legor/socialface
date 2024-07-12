# Social Face Challenge 

## Table of contents
- [Description](#description)
- [Requirements](#requirements)
- [Tech Stack](#tech-stack) 
- [How to run the project](#how-to-run-the-project) 
- [CI/CD Pipeline](#ci-cd-pipeline)
- [Typescript Rules](#typescript-rules)

## Description

This is a challenge project required by Unosquare for evaluating **Ricardo Legorreta** for the Senior Developer position.
The goal is to develop a simple *Social Network* application that should satisfy robust requirements, those are listed and checked here in the **Requirements** section.

> I want to take this opportunity to **thank** those who helped me to start
> this promotion process and the people involved as well.
>**Thanks to Luis Castro, Luis Naranjo and Juan Figueroa.**
> Thanks a lot and God bless you all!

## Requirements
Develop a Social Network application with the following pages:
 - [x] Login page.
 - [x] Signup page.
 - [x] Forgot password page.
 - [x] Feed page.
 - [x] Profile page.
 - [x] Settings page.
 - [x] Business page (for user permissions validation).

This application satisfies the following technical and functional requirements:

 - [x] **Performance:** this application implements lazy loading for fast loading the pages, it also implements pagination in the feed for gradually loading posts without affecting performance.
 - [x] **Form validation:** used reactive forms for validating all inputs when required.
 - [x] **Rely on RxJS:** used it a lot almost everywhere since **NgRx** was implemented.
 - [x] **Use Signals:** Implemented in almost all pages instead of regular component variables.
 - [x] **Handle errors:** in authentication pages when there are 401 or 500 errors the are messages displayed accordingly. In the feed and profile pages when there's an error fetching posts there's a component displayed with text and a reload button.
 - [x] **Handle success messages:** In pages using form there's a success message displayed accordingly.
 - [x] **Responsive design:** All pages are responsive and looking good in a lot of devices including small smartphones (i.e. iPhone SE), tablets, and small laptops.
 - [x] **Accessibility:** All pages satisfy the following points:
	 - Page looks good at 200% and 400% zoom.
	 - Page can be navigated using keyboard only.
	 - Page supports voice over, all HTML elements have a label description to be read.
	 - Focused elements have a border.
	 - Text alternatives for pictures.
	 - Semantic HTML, using the correct elements according to it's purpose: lists, buttons, inputs, links, headers in correct hierarchy, section, header, etc.
	 - Clear text that can be read easily.
	 - Descriptive links for voiceover.
	 - Descriptive sections for voice over.
 - [x] **Functional programming:** Implemented a few funcional components instead of class components: auth guard, actions, reducers.
 - [x] **CSS Naming convention:** **OOCSS (Object-Oriented CSS).
 - [x] **Security:** Implemented authentication via api and guard in some pages for allowing authorized users only.
 - [x] **Testing:** Implemented Unit, Integration and E2E Testing in a meaningful way.

## Tech Stack

 - [x] **Angular v15**+ (v17).
 - [x] **CSS pre-processor** (SCSS).
 - [x] **TypeScript**.
 - [x] **NgRx** (State management).
 - [x] **Jest** (for Unit and Integration Testing).
 - [x] **Cypress** (for E2E Testing).
 - [x] **Docker** (for CI/CD Integration).
 - [x] **Jenkins** (for CI/CD Integration).
 - [x] **Git**.
 - [x] **Angular i18n** (for localization).
 - [x] **Nodemon + JSON Server** (for local server).
 - [x] **Storybook** (for components development).
 - [x] **Typedoc** (generates codebase documentation)

## How to run the project
This repository has 2 main applications: the **SocialFace** app made with angular and a **Node API** server with mock data.
The mock server must be running at all times in order to provide api for the front end app and for **E2E testing**.

There's a list of all the commands available for the project:

 1. `npm run mock:server` This runs the backend api which provides mock data (needs to be running all the time).
 2. `npm start` This starts the angular app in development mode.
 3. `npm run start-es` This starts the angular app in development mode with the Spanish Mexico locale enabled.
 4. `npm run test` This runs unit and integration testing with jest.
 5. `npm run test:watch` This runs testing with jest in watch mode for development.
 6. `npm run storybook` This starts a storybook server used for building components in isolation.
 7.  `npm run i18n:extract` This extracts all text definitions for localization into a new file at `src/locales/messages.xlf`.
 8. `npm run e2e` This opens cypress app for running tests in a selected browser.
 9. `npm run cypress:run` This runs cypress e2e testing in the terminal. 
 10. `npm run docs` Generates project documentation for the codebase in HTML format (at the ./docs folder).

## CI CD Pipeline
For Continuous Integration and Continuous Deployment the easiest way was to implement GitHub Actions,
in order to configured it I followed the following tutorial: https://www.youtube.com/watch?v=SMuB3qYjDUw

The process consist on the following steps:

1. Add build:prod script to the package.json
2. Create a new main.yaml file with the build instructions (copied from the tutorial repo).
3. Create a new token in GitHub > (Profile) Settings > Developer Options.
4. Add the new token to the repository Settings > Actions > Create New Action.
5. Create a new 'prod' branch and delete everything.
6. Configure the new branch in the repository Settings > Pages in the 'Branch' section.
7. Deploy.


## Typescript Rules
Added Eslint for enforcing good code quality.

Here's a list of each added rule and an explanation on why was added:

- `airbnb`: configuration and plugins: Used as recommended for enforcing multiple Typescript rules but disabled some rules as I think they were not necessary.
- `unused-imports`: helps to remove unused imports (which is unused code).
- `simple-import-sort`: sorts all imports, helps keeping things organized.
- `typescript-eslint/quotes: [error, single]`: For using single quotes (I hate double quotes on Typescript code).
- `@typescript-eslint/comma-dangle: off`: Keeping Eslint away from touching trailing commas, VS Code is adding them properly.
- `unused-imports/no-unused-vars`: Not allowing to have unused vars as it is never a good idea to have unused code around.
 