# eslint-rules
Repository for Tyler recommended eslint rules


## Packages included in this project

Please follow the links below for the packages you care about.

- [`@tylertech-eslint/eslint-plugin`](./packages/eslint-plugin/) - An ESLint-specific plugin that contains rules which are recommended by the CorpDev team. It can be combined with any other ESLint plugins in the normal way.

- [`@tylertech-eslint/eslint-plugin-angular`](./packages/eslint-plugin-angular/) - An angular eslint specific plugin that contains rules for angular which are recommended by the CorpDev team.

- [`@tylertech-eslint/eslint-plugin-angular-template`](./packages/eslint-plugin-angular-template/) - An angular eslint template specific plugin that contains rules for angular templates which are recommended by the CorpDev team.

Both angular specific packages extend @angular-eslint, and more information can be found in their [repo](https://github.com/angular-eslint/angular-eslint)

<br>
<br>

# Example Uses
## @tylertech-eslint/eslint-plugin

> npm i @tylertech-eslint/eslint-plugin

**.eslintrc.json**
``` jsonc
{
    "overrides": {
         "files": [
        "*.ts"
      ],
    "extends": [
        "plugin:@tylertech-eslint/recommended"
      ]
    }
}
```

## @tylertech-eslint/eslint-plugin-angular

> npm i @tylertech-eslint/eslint-plugin-angular

**.eslintrc.json**
``` jsonc
{
    "overrides": {
         "files": [
        "*.ts"
      ],
    "extends": [
        "plugin:@tylertech-eslint/angular/recommended"
      ]
    }
}
```

## @tylertech-eslint/eslint-plugin-angular

> npm i @tylertech-eslint/eslint-plugin-angular-template

**.eslintrc.json**
``` jsonc
{
    "overrides": {
         "files": [
        "*.html"
      ],
    "extends": [
        "plugin:@tylertech-eslint/angular-template/recommended"
      ]
    }
}
```

## Overriding a single rule
If for some reason you want to disabled or change the ruling a recommended rule, this is possible by adding that into the **.eslintrc.json**
``` jsonc
{
    "overrides": {
        "rules": {
        // Standard ESLint Rule
        "arrow-spacing": "off",

        // Custom @tylertech-eslint rule
        "@tylertech-eslint/require-private-underscore": "warn"
        }
    }
}
```

## Notes on Supported ESLint Configuration File Types

**We strongly recommend you stick to using `.eslintrc.json`.**

This is not a constraint we force upon you, and you are more than welcome to use any of ESLint's supported file types for your ESLint config files, e.g. `.eslintrc.js`, `.eslintrc.yml` **however** please note that you will not receive any automated updates to your config from this toolset if you choose to use something other than `.eslintrc.json`. We will also only generate `.eslintrc.json` files from our code generators (which you could then convert yourself if you wanted to).

The reason for this is very simple - JSON is a format which is very easy to statically analyze and write transformations for and it is beyond the scope of this community-run project to provide multiple implementations of every possible migration for every possible ESLint configuration file type for every version we release.

<br>

## Notes on ESLint and Anguar Configuration Itself (Or any framework)

It's important to understand up front that **using Angular with ESLint is actually an advanced/complex use-case** because of the nature of the files involved:

- Angular projects use **TypeScript files** for source code
- Angular projects use a **custom/extended form of HTML** for templates (be they inline or external HTML files)

The thing is: **ESLint understands neither of these things out of the box.**

Fortunately, however, ESLint has clearly defined points of extensibility that we can leverage to make this all work.

> For detailed information about ESLint plugins, parsers etc please review the official ESLint documentation: https://eslint.org

**The key principle of our configuration required for Angular projects is that we need to run different blocks of configuration for different file types/extensions**. In other words, we don't want the same rules to apply on TypeScript files that we do on HTML/inline-templates.

Therefore, the critical part of our configuration is the `"overrides"` array:

```jsonc
{
  "overrides": [
    /**
     * -----------------------------------------------------
     * TYPESCRIPT FILES (COMPONENTS, SERVICES ETC) (.ts)
     * -----------------------------------------------------
     */
    {
      "files": ["*.ts"],
      "extends": ["plugin:@tylertech-eslint/angular/recommended"]

      // ... other config specific to TypeScript files
    },

    /**
     * -----------------------------------------------------
     * COMPONENT TEMPLATES
     * -----------------------------------------------------
     */
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@tylertech-eslint/angular-template/recommended"
      ]
      // ... config specific to Angular Component templates
      // ... other config specific to html files
    }
  ]
}
```

By setting up our config in this way, we have complete control over what rules etc apply to what file types and our separate concerns remain clearer and easier to maintain.

### Seriously, move (mostly) all configuration into `overrides`

Even though you may be more familiar with including ESLint rules, plugins etc at the top level of your config object, we strongly recommend only really having `overrides` (and a couple of other things like `ignorePatterns`, `root` etc) at the top level and including all plugins, rules etc within the relevant block in the overrides array.

Anything you apply at the top level will apply to ALL files, and as we've said above there is a really strict separation of concerns between source code and templates in Angular projects, so it is very rare that things apply to all files.

<br>

# Development
 Want to contribute? 
<br>
### *I'd like to add a rule to the standard eslint-plugin recommendation*
<br>

- Follow the structure of a existing [rule](/packages/eslint-plugin/src/rules/invalid-relative-Import-prefix.ts). To initially verify the rule is working, add a rule test.
<br>

### I'd like to add a new packages for a specific framework (React, Vue)
- follow the structure of the /packages folder. The naming convention **must** be `eslint-plugin-*`. From there update the package.json in the new folder with `@tylertech-eslint/eslint-plugin-*` and get crack'n!
