# MediCryptClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.
## Setup Requirements

### Prerequisites

1. **Node.js and npm**
   
   This project requires Node.js (v18.x or later recommended) and npm. To install:
   
   - **Windows/macOS**: Download and install from [Node.js official website](https://nodejs.org/)
   - **Linux**:
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```

2. **Angular CLI**
   
   Install the Angular CLI globally:
   
   ```bash
   npm install -g @angular/cli@19.2.0
   ```

### Project Setup

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd MediCryptClient
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify installation:
   ```bash
   ng version
   ```

Now you're ready to run the development server as described in the next section.

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

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
