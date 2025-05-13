# Prompt Considerations: Generating Node.js API from ALPS

Use the following checklist when generating Node.js Express applications from ALPS profiles:

---

### 1. **Semantic Mapping**
- Extract all descriptors of `type: undefined` as **properties** (fields) of entities.
- Use `def` values when possible for schema annotations (optional in code).

### 2. **Taxonomy as Resources**
- Each descriptor with `type: semantic` and nested `descriptor` array defines a **resource** (e.g., `User`, `Task`).
- Generate REST endpoints:
  - `GET /resources/:id`
  - `POST /resources`
  - `PUT /resources/:id`
  - `DELETE /resources/:id`

### 3. **Choreography as Actions**
- Transitions (`safe`, `unsafe`, `idempotent`) become hypermedia links:
  - `safe`  → `GET`
  - `unsafe` → `POST`
  - `idempotent` → `PUT`
- Link these actions under `_links` in each resource.

### 4. **Link Metadata**
- Include:
  - `href`: URL
  - `method`: HTTP method
  - `args`: Array of input fields (from related taxonomy descriptors)

### 5. **Root Resource**
- Define `/` endpoint returning top-level `_links` to each taxonomy (e.g., `/users`, `/tasks`).

### 6. **Data Stubs**
- Initialize in-memory arrays with a few records per resource.
- Ensure each action is demonstrable.

### 7. **Response Shape**
- Return HAL-like structures:
  ```json
  {
    "id": "123",
    "field": "value",
    "_links": {
      "self": { "href": "/users/123" },
      "update": { "href": "/users/123", "method": "PUT", "args": ["field"] }
    }
  }
  ```

---

Apply these principles each time the ALPS → Node.js conversion is requested.


