/**
 * Public entrypoint for the Family Tree UI package.
 * Re-exports core types, design presets, and React components.
 */

// Types
export type {
  FamilyMember,
  FamilyMemberStatus,
  AddMemberData,
  RelationType,
  FamilyRelationshipType,
  ProfileSearchResult,
  AddMemberPayload,
  FamilyTreeConnectorConfig,
  FamilyTreePresetName,
  FamilyTreeRenderNodeOptions,
} from "./types";
export { familyTreePresets, getFamilyTreeConfig } from "./design-presets";
export { mapToFamilyRelationType } from "./types";

// Components
export { FamilyTree } from "./components/family-tree";
export { FamilyNodeCard } from "./components/node-card";
export { AddMemberDialog } from "./components/add-member-dialog";
