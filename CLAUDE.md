# Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build production-ready files (runs TypeScript build first)
- `npm run lint`: Run ESLint on all files
- `npm run preview`: Preview the production build locally

# Code Style Guidelines

## TypeScript
- Use TypeScript for type safety; strict mode is enabled
- Define interfaces for data structures
- Use ReactElement return type for components
- Explicit void return type for event handlers

## Naming Conventions
- Use PascalCase for components, interfaces
- Use camelCase for variables, functions, methods
- Use descriptive names for state variables

## React Patterns
- Prefer functional components with hooks
- Use explicit typing for useState
- Handle all possible states in conditional rendering
- Group related state variables

## Error Handling
- Use optional chaining (?.) for potentially undefined values
- Validate user input in forms
- Handle empty/error states in UI

## Imports
- Group imports by source: React first, then third-party, then local
- Export components as named exports