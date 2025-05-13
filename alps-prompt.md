# ALPS Profile Creation Prompt

Please create an ALPS profile based on the following requirements. This profile should represent a complete and consistent application state design.

* Format: JSON
* Language: English
* Content: 

As a project manager, I need a task tracking system.
Tasks have a title, description, due date, priority, and assigned user.
Users should be able to create tasks, update status, and mark them complete.
The system should display task lists filtered by status or assigned user.

## ‼️ Important: Guidelines for Design Consistency and Completeness ‼️

1. **All states must be connected**:
   - Avoid isolated states (states that cannot be reached or exited)
   - Every state should have at least one incoming and one outgoing transition (except for home/start and final states)
   - Ensure all transitions between states are logical and clear

2. **Consistent use of semantic descriptors**:
   - Use consistent naming conventions for the same concepts
   - Only use the `def` attribute when a corresponding Schema.org definition exists
   - For custom concepts, provide clear titles and use the `doc` attribute for details when needed

3. **Complete user flows**:
   - Provide complete state transition paths for each key user story
   - Ensure CRUD operations (Create, Read, Update, Delete) are fully represented
   - Include all necessary functionality for each user role

4. **State transition completeness**:
   - Clearly define the success path for each operation
   - Ensure transitions between key states to prevent disruption of important business processes
   - Consider alternative flows for critical failure cases when necessary

5. **Grouping related elements**:
   - Group related processes and user journeys using the `tag` attribute
   - Use tags like "user-management", "content-creation", "payment-process", etc.
   - Apply consistent tags to states and transitions belonging to the same functional area
   - This helps identify related functionality when converting to APIs or data models

## ‼️ Important: JSON Format Guidelines ‼️

1. Write each descriptor on a single line (mandatory).
2. Only indent and line-break descriptors if they contain other descriptors.
3. All nested descriptors must reference their parent with `href`.

```json
{"$schema": "https://alps-io.github.io/schemas/alps.json", "alps": {"version": "1.0", "descriptor": [
{"id": "name", "title": "Name", "def": "https://schema.org/name"},
{"id": "email", "title": "Email", "def": "https://schema.org/email"},
{"id": "User", "title": "User Profile", "descriptor": [
  {"href": "#name"},
  {"href": "#email"}
]},
{"id": "UserList", "title": "User List", "descriptor": [
  {"href": "#User"},
  {"href": "#goUser"},
  {"href": "#doCreateUser"}
]},
{"id": "goUser", "type": "safe", "title": "View User Details", "rt": "#User"},
{"id": "doCreateUser", "type": "unsafe", "title": "Create User", "rt": "#UserList"}
]}}
```

## XML Format Guidelines

- Use indentation to indicate hierarchy.
- Write each element on a single line.

```xml
<alps version="1.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="https://alps-io.github.io/schemas/alps.xsd">
</alps>
```

## Structuring Semantic Descriptors

Organize into the following three blocks. Each descriptor must either reference or contain other descriptors:

1. Semantic Definitions (Ontology)
   - Define basic elements (lowerCamelCase).
   - Always specify `def` as a full URL if there's a Schema.org definition.
   - Add a `title` to all descriptors.
   - Include `doc` only if necessary.
   - Each defined element must be referenced by at least one taxonomy state.

2. Containment Relationships (Taxonomy)
   - Descriptors representing states use UpperCamelCase.
   - Use `href` for referencing elements (direct definition via `id` is not allowed).
   - Each application state includes:
     * Elements displayed/used in the state (defined in the ontology).
     * Actions that can be performed (defined in choreography).
   - Use `doc` for additional details if needed.
   - Each taxonomy must either contain or transition to other taxonomies.

3. State Transitions (Choreography)
   - Define transition actions.
   - Select the appropriate `type` attribute.
   - Specify the transition destination (`rt`).
   - Use `href` to refer to necessary data items.
   - Each operation must be referenced by at least one taxonomy state.

## Output Requirements

- Include a clear title for every descriptor (concise one-line explanation)
- Use the doc attribute for detailed explanations when necessary
- Only reference Schema.org URLs with the def attribute when a corresponding definition exists
- Set appropriate type attributes (safe, unsafe, idempotent) for all state transitions
- Create reusable descriptors for common patterns
- Use consistent IDs and naming conventions for the same concepts
- Utilize the tag attribute to group related elements
- Use consistent tags for business domains or functional areas
