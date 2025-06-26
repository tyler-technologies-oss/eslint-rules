# Tyler Tech Shared ESLint Rules

Shared ESLint rules and configurations that adhere to the standards and best practices of Tyler Technologies.

## Monorepo

This repository is structured as a monorepo containing multiple ESLint plugins, each tailored for different use cases and/or frameworks.

### Packages

The following packages are included in this monorepo:

- [`@tylertech-eslint/eslint-plugin`](./packages/eslint-plugin): An ESLint plugin with the Tyler Tech recommended rules and configurations for JavaScript and TypeScript files.
- [`@tylertech-eslint/eslint-plugin-angular`](./packages/eslint-plugin-angular): An ESLint plugin with the Tyler Tech recommended rules and configurations for Angular projects.

## Contributing

Contributions are welcome! If you have suggestions about the recommended rule sets, additional configurations you would like to make available, or if you want to add
support for a new framework, please feel free to open an issue or submit a pull request.

## Local Development

This repository uses [pnpm](https://pnpm.io/) for package management, Turborepo for task running and caching, and Changesets CLI for managing release versions and changelogs.

To set up the project locally, follow these steps:

1. Install [pnpm](https://pnpm.io/installation) if you haven't already.
2. Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or above is required).
3. Clone the repository:
   ```bash
   git clone https://github.com/tyler-technologies-oss/eslint-rules.git
   ```
4. Navigate to the project directory:
   ```bash
   cd eslint-rules
   ```
5. Install dependencies:
   ```bash
   pnpm install
   ```
6. To run the tests, use:
   ```bash
   pnpm test
   ```
7. To run the build, use:
   ```bash
   pnpm build
   ```

   > This project uses [Turbo](https://turbo.build/) for task running and caching, so you can run tasks across all packages efficiently.

## Adding New Packages

If you'd like to add a new package for a specific framework (like React or Vue), please follow these steps:

1. Follow the structure of the `/packages` folder.
2. The naming convention **must** be `@tylertech-eslint/eslint-plugin-*`.
3. Set up the package contents in the format that matches the existing packages, and ensure it adheres to the ESLint flat config format.

## License

This project is licensed under the Apache-2.0 License. See the [LICENSE](./LICENSE) file for details.
