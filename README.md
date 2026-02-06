# 4ever Tree

React components for rendering interactive family trees with relationship-aware connectors. Data fetching and persistence are intentionally left to the host app.

## Install

```bash
bun add @4everlabs/tree
```

```bash
npm install @4everlabs/tree
```

## Publish (JSR + Bun)

Configure `jsr.json` with `name`, `version`, `license`, and `exports`, then publish:

```bash
bunx jsr publish
```

If the CLI asks for a token, create one in the JSR web UI and pass it via `--token` or `JSR_TOKEN`.

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

## API

FamilyTree props:
- `rootMember`: Tree data rooted at the current profile.
- `title`: Heading text. Defaults to `Family Tree`.
- `canEdit`: Enables add-member UI.
- `onAddMember`: Called when the dialog submits.
- `searchProfiles`: Async search provider for the dialog.
- `onNavigateProfile`: Called when a card with a profile ID or slug is clicked.
- `resolveAvatarUrl`: Optional URL resolver for avatar images.
- `designPreset`: `default`, `compact`, or `contrast`.
- `designOverrides`: Override connector sizing and colors.

Exports:
- Components: `FamilyTree`, `FamilyNodeCard`, `AddMemberDialog`
- Presets: `familyTreePresets`, `getFamilyTreeConfig`
- Types: `FamilyMember`, `RelationType`, `AddMemberPayload`, `FamilyTreeConnectorConfig`, `FamilyTreePresetName`

## Presets

Available presets:
- `default`
- `compact`
- `contrast`

Override a preset:

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

## Notes

This package ships compiled output from `tsup` into `dist/`.

## License

MIT
