# Partners API Reference

This document is a standalone, shareable reference for all Partners public APIs in the NLGFC backend.

## Base URL
- Local: `http://localhost:8000/api`
- Production: `https://your-domain.com/api`

## Scope
This covers:
- Partners listing (current implementation)
- Single partner retrieval
- Current status of pagination/search support

---

## 1) List Partners
**Endpoint**
- `GET /api/partners`

**Query Parameters (Current Status)**
- `per_page`: **Not implemented** yet for partners endpoint
- `search`: **Not implemented** yet for partners endpoint

**Behavior**
- Returns all partners as a plain array (non-paginated).
- No filtering or search is applied.
- Returns fields from the partners table including:
  - `id`
  - `name`
  - `logo`
  - `created_at`
  - `updated_at`

**Example**
```bash
curl -X GET "http://localhost:8000/api/partners"
```

**Response Shape (current)**
```json
[
  {
    "id": 1,
    "name": "UNICEF",
    "logo": "partners/unicef-logo.png",
    "created_at": "2026-03-12T08:00:00.000000Z",
    "updated_at": "2026-03-12T08:00:00.000000Z"
  },
  {
    "id": 2,
    "name": "World Bank",
    "logo": "partners/world-bank-logo.png",
    "created_at": "2026-03-12T08:05:00.000000Z",
    "updated_at": "2026-03-12T08:05:00.000000Z"
  }
]
```

---

## 2) Get Single Partner
**Endpoint**
- `GET /api/partners/{id}`

**Example**
```bash
curl -X GET "http://localhost:8000/api/partners/1"
```

**Behavior**
- Returns a single partner by ID.

**Response Shape**
```json
{
  "id": 1,
  "name": "UNICEF",
  "logo": "partners/unicef-logo.png",
  "created_at": "2026-03-12T08:00:00.000000Z",
  "updated_at": "2026-03-12T08:00:00.000000Z"
}
```

---

## Error Codes (Partners module)
- `200 OK`: Successful retrieval
- `404 Not Found`: Partner ID does not exist

---

## Notes for Frontend Teams
- The list endpoint currently returns a raw array, not Laravel paginator metadata.
- If your client supports both array and paginated responses, this endpoint works with the array branch today.
- When pagination/search is introduced later, expected request params will likely be `per_page` and `search`, and response shape will move to paginated format (`data`, `current_page`, `per_page`, etc.).

---

## Quick Share Note
When sharing this doc with frontend teams, include:
- base URL for their environment
- at least one known partner `id`
- one known partner `name` to verify retrieval quickly
