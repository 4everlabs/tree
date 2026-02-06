# 4ever Tree

[![JSR](https://jsr.io/badges/@4everlabs/tree)](https://jsr.io/@4everlabs/tree)
[![JSR Score](https://jsr.io/badges/@4everlabs/tree/score)](https://jsr.io/@4everlabs/tree)
[![JSR Weekly Downloads](https://jsr.io/badges/@4everlabs/tree/weekly-downloads)](https://jsr.io/@4everlabs/tree)

Official React components for rendering interactive family trees with relationship-aware connectors. Data fetching and persistence are intentionally left to the host app.

## Install (Bun + JSR)

```bash
bunx jsr add @4everlabs/tree
```

## Quick Start

```tsx
import { FamilyTree } from "@4everlabs/tree";
import type { FamilyMember, AddMemberPayload } from "@4everlabs/tree";

const rootMember: FamilyMember = {
  id: "root",
  name: "Alex Johnson",
  status: "linked",
  parents: [],
  siblings: [],
  children: [],
};

export function FamilyTreePage() {
  const handleAddMember = async (payload: AddMemberPayload) => {
    // Persist to your backend, then update your `rootMember` tree.
    console.log("Add member", payload);
  };

  return (
    <FamilyTree
      rootMember={rootMember}
      canEdit
      onAddMember={handleAddMember}
      searchProfiles={async (query) => {
        // Return your own search results
        return [];
      }}
      onNavigateProfile={(member, target) => {
        // Route using your app router
        console.log("Navigate", member, target);
      }}
      resolveAvatarUrl={(url) => url || ""}
      designPreset="contrast"
    />
  );
}
```

## Data Model

Tree structure is driven by nested arrays on `FamilyMember`:

- `parents`: Array of direct parents for the member.
- `siblings`: Array of direct siblings for the member.
- `children`: Array of direct children for the member.
- `spouse`: The member’s partner (single spouse supported in layout).

The `relation` field is used for labeling cards. Layout is derived from `parents`, `siblings`, `children`, and `spouse`.

## Relationship Line Rules

Connector placement is deterministic and consistent across presets:

- `spouse`: The partner line connects at **mid‑height** on each card’s **inner edge** (left/right), inset by `anchors.coupleInsetPx`.
- `parent → child` (couple): A **junction** is placed at the midpoint of the couple line. A vertical **trunk** drops from that junction to a horizontal **sibling bus** above the children. Each child connects **from the top center** of their card down to that bus.
- `parent → child` (single parent): The junction is the **bottom center** of the parent card. The same trunk + sibling bus + child drops apply.
- `siblings`: Siblings are connected through the **shared sibling bus** above them; each sibling drops to the bus at their **top center**.

To model grandparents or grandchildren, represent them as additional `parents` or `children` on the appropriate member; the connector rules remain the same.

## Add Member Workflow

When `canEdit` is true, the UI emits an `AddMemberPayload` with one of these shapes:

- `type: "existing"`: User selected from search results.
- `type: "manual"`: Manual entry (name, optional birthday).
- `type: "invite"`: Invite by email.

Your app is responsible for persistence and updating the tree data after a successful add.

## Customization

Use presets or overrides to control connector styling:

- `designPreset`: `default`, `compact`, `contrast`.
- `designOverrides`: Partial override of `FamilyTreeConnectorConfig`.

Example override:

```tsx
import { getFamilyTreeConfig } from "@4everlabs/tree";

const config = getFamilyTreeConfig("compact", {
  statusColors: {
    linked: "bg-emerald-500",
  },
  anchors: {
    verticalGapPx: 32,
  },
});
```

## Styling

This library ships Tailwind class names, including design tokens like `bg-stroke-default` and `text-copy-primary`. Ensure your design system defines these classes or replace them to match your UI.

## License

MIT
