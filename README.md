# HostoMytho Server

## Install

- Copy and rename `.envExample` to `.env`, fill in the required values.
- Create a database user and grant it privileges on `[db_name]`, `[db_name]_development` and `[db_name]_test`.
- Run `npx sequelize db:migrate`
- Run `npx sequelize db:seed:all` to populate db with some default values

## Conventions

### Commits

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) convention.
It should be structured as follows:

```txt
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The commit's type can be one of the following:

- `feat` – a new feature is introduced with the changes
- `fix` – a bug fix has occurred
- `chore` – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- `refactor` – refactored code that neither fixes a bug nor adds a feature
- `docs` – updates to documentation such as a the README or other markdown files
- `style` – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- `test` – including new or correcting previous tests
- `ci` – continuous integration related
- `build` – changes that affect the build system or external dependencies
- `revert` – reverts a previous commit
