# Skill: Add, Update, or Delete Formations

## Purpose

This skill guides AI agents through the complete workflow of adding, updating, or deleting formations in the Cap Competences catalogue. All formation data is stored in a single JSON file, and the site regenerates static pages automatically.

## Prerequisites

- Access to [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json)
- Familiarity with JSON structure (poles, formations, fields)
- Local dev environment running (`npm run dev`)
- Ability to run `npm run build` to verify changes

## Key Concepts

### JSON Structure

The catalogue is organized as:

```json
{
  "meta": { /* metadata about the catalogue */ },
  "cadre_methodologique_commun": { /* shared pedagogical framework */ },
  "poles": [
    {
      "id": "langues-etrangeres",
      "numero": 1,
      "titre": "Pôle Langues Étrangères",
      "accroche": "...",
      "objectifs": [...],
      "modalites_public": {...},
      "formations": [
        {
          "id": "fle",
          "titre": "French as a Foreign Language",
          "objectif": "...",
          "contenu": "...",
          "duree": "40h",
          "pre_requis": "...",
          "profils": ["Salarié", "Demandeur d'emploi", "Entreprise"]
        }
      ]
    }
  ]
}
```

### Field Mapping

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | string | **Yes** | URL slug (e.g., `excel`, `word`, `fle`). Must be unique. |
| `titre` | string | **Yes** | Formation title (displayed on catalogue & detail page) |
| `objectif` | string | **Yes** | Formation objective (displayed on detail page) |
| `contenu` | string | **Yes** | Formation content/curriculum (displayed on detail page) |
| `duree` | string | No | Duration (e.g., `40h`, `3 days`). Falls back to pole-level `duree` if omitted. |
| `pre_requis` | string | No | Prerequisites. Falls back to pole-level `pre_requis` if omitted. |
| `profils` | array | No | Target profiles: `["Salarié", "Demandeur d'emploi", "Indépendant", "Entreprise"]`. Omit if not applicable. |

## Workflow: Add a Formation

### Step 1: Identify the Pole

1. Open [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json)
2. Locate the pole where the formation belongs (find by `id` or `titre`)
3. Note the pole's `id` (e.g., `langues-etrangeres`, `bureautique`)

### Step 2: Create Formation Object

Prepare the formation data:

```json
{
  "id": "unique-slug",
  "titre": "Formation Title",
  "objectif": "What the learner will achieve",
  "contenu": "Detailed curriculum and learning outcomes",
  "duree": "40h",
  "pre_requis": "Any prerequisites (optional)",
  "profils": ["Salarié", "Demandeur d'emploi"]
}
```

**Best practices**:
- `id` should be URL-friendly (lowercase, hyphens, no spaces)
- `id` must be unique across all poles
- `titre` should be concise but descriptive
- `objectif` and `contenu` should be plain text (no HTML)
- If `duree` or `pre_requis` match the pole level, you can omit them (cascading)

### Step 3: Insert into Pole

1. Locate the pole's `formations` array
2. Add the new formation object at the end of the array (before the closing `]`)
3. Ensure proper JSON formatting (commas, quotes, braces)

### Step 4: Test Locally

```bash
npm run dev
```

1. Navigate to `http://localhost:3000/catalogue/`
2. Verify the formation appears in the list and can be filtered by profile
3. Click the formation card to navigate to `/formations/[id]/`
4. Verify the detail page displays correctly (title, objective, content, duration)
5. Check that links and styling render properly

### Step 5: Validate Build

```bash
npm run build
```

1. Check for build errors in the terminal
2. Verify `out/formations/[id]/index.html` was generated
3. **Important**: If the build fails, check JSON syntax (missing commas, unescaped quotes, etc.)

### Step 6: Commit & Deploy

```bash
git add lib/data/catalogue-formations.json
git commit -m "Add formation: [title]"
git push
```

Cloudflare Pages detects the push and auto-deploys. Verify the new formation appears on the live site within 1–2 minutes.

---

## Workflow: Update a Formation

### Step 1: Locate the Formation

1. Open [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json)
2. Search for the formation by `id` (Ctrl+F / Cmd+F)
3. Note its position in the pole's `formations` array

### Step 2: Edit Fields

Modify any field as needed:

```json
{
  "id": "excel",           // ⚠️ Do NOT change id (breaks URLs)
  "titre": "Updated Title",
  "objectif": "Updated objective",
  "contenu": "Updated content",
  "duree": "50h",          // Can change
  "pre_requis": "...",     // Can change
  "profils": [...]         // Can change
}
```

**Important**:
- **Do not change `id`** — it's the URL slug. Changing it breaks links and generates a new detail page.
- Preserve JSON syntax (quotes, commas, braces)

### Step 3: Test Locally

```bash
npm run dev
```

1. Navigate to `/catalogue/` and verify the formation appears with updated text
2. Visit `/formations/[id]/` and confirm all changes are visible
3. Check that the page renders correctly on mobile and desktop

### Step 4: Validate Build

```bash
npm run build
```

Ensure no errors and the existing `out/formations/[id]/index.html` is regenerated.

### Step 5: Commit & Deploy

```bash
git add lib/data/catalogue-formations.json
git commit -m "Update formation: [id] — [change description]"
git push
```

---

## Workflow: Delete a Formation

### Step 1: Locate the Formation

1. Open [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json)
2. Find the formation by `id` in the pole's `formations` array

### Step 2: Remove the Object

1. Delete the entire formation object (including the opening `{` and closing `}`)
2. If it's not the last item, ensure the previous item has a comma after its closing `}`
3. If it's the last item, remove the trailing comma from the previous item

**Example** (before):

```json
"formations": [
  { "id": "excel", ... },
  { "id": "word", ... },
  { "id": "fle", ... }    // ← to delete
]
```

**Example** (after):

```json
"formations": [
  { "id": "excel", ... },
  { "id": "word", ... }
]
```

### Step 3: Verify JSON Syntax

Use a JSON validator or try `npm run build` to catch syntax errors early.

### Step 4: Test Locally

```bash
npm run dev
```

1. Verify the formation no longer appears in `/catalogue/`
2. Attempting to visit `/formations/[old-id]/` should return a 404 (or the default 404 page)

### Step 5: Validate Build

```bash
npm run build
```

Verify the formation's detail page file is not generated in `out/formations/`.

### Step 6: Commit & Deploy

```bash
git add lib/data/catalogue-formations.json
git commit -m "Delete formation: [id] — [reason]"
git push
```

---

## Common Pitfalls

### JSON Syntax Errors

- **Missing commas**: Each object in an array needs a comma after it (except the last)
- **Unescaped quotes**: Inside strings, use `\"` for literal quotes
- **Trailing commas**: Objects/arrays must not have a trailing comma on the last element

**Fix**: Validate with a JSON linter or check the build output for syntax errors.

### Duplicate `id`

- Each formation's `id` must be globally unique
- If a formation with `id: "excel"` already exists, don't add another with the same `id`

**Fix**: Choose a unique `id` (e.g., `excel-2`, `excel-advanced`)

### Changing `id` After Publication

- **Never change** a formation's `id` — it's the URL slug
- Old URLs break, links point to 404 pages
- If you must rename, delete the old formation and create a new one with the new `id`

**Better approach**: Add a note in `titre` or `objectif` if the formation is retired (e.g., "*Formation archivée*")

### Build Failures

If `npm run build` fails:

1. Check the terminal error message (usually points to a JSON syntax issue)
2. Validate JSON at [jsonlint.com](https://www.jsonlint.com/)
3. Look for unescaped characters, missing braces, or misaligned commas
4. Roll back the change if unsure

### Formation Not Appearing After Deployment

1. Hard-refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Check Cloudflare Pages deployment status (should be "Success")
3. Verify the formation was added to the correct pole's `formations` array
4. Check that the `id` doesn't conflict with an existing one

---

## Cascading Fields (Advanced)

Some fields can be omitted and will cascade from the pole level:

- **`duree`**: If formation doesn't have `duree`, falls back to pole's `duree` or generic fallback
- **`pre_requis`**: Same cascading logic

This reduces repetition when many formations in a pole share the same duration or prerequisites.

**Example**:

```json
// Pole level
{
  "id": "bureautique",
  "duree_type": "Flexible",
  "pre_requis": "Connaître les bases de l'informatique",
  "formations": [
    { "id": "excel", "titre": "Excel", ... }  // inherits pole's pre_requis
  ]
}
```

---

## Quick Reference

| Action | Command | Key File |
|--------|---------|----------|
| Add formation | Edit JSON, add object to `formations[]` | [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json) |
| Update formation | Edit fields in existing object | [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json) |
| Delete formation | Remove object from `formations[]` | [`lib/data/catalogue-formations.json`](cap-competences-site/lib/data/catalogue-formations.json) |
| Test locally | `npm run dev` → visit `/catalogue/` & `/formations/[id]/` | N/A |
| Validate before deploy | `npm run build` | Terminal output |
| Deploy | `git push` (auto-deploys to Cloudflare Pages) | Git + GitHub |

---

## Related Skills

- [SKILL-deployment.md](SKILL-deployment.md) — Deploy changes to Cloudflare Pages
- [AGENTS.md](AGENTS.md) — Project overview & architecture
