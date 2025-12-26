# Task Progress: Fix TypeScript Error in Permission Component

## Problem
- Line 124: Property 'name' does not exist on type 'Permission'
- Component is importing wrong Permission type from `@/types/pagination`
- Code expects Permission type from `@/types/role_permisison` which has proper structure

## Steps
- [ ] Analyze the conflicting type definitions
- [ ] Fix the import statement in the component
- [ ] Verify the fix resolves the TypeScript error
- [ ] Test the component functionality

## Solution
Update the import statement to use the correct Permission type from `@/types/role_permisison` which includes the `data` property with `SinglePermission[]` items that have `name` property.
