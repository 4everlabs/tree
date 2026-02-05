export type RelationType =
  | "parent"
  | "sibling"
  | "child"
  | "spouse"
  | "grandparent"
  | "grandchild";

export type FamilyMemberStatus = "linked" | "manual" | "invite_pending";

export interface FamilyMember {
  id: string;
  name: string;
  birthday?: string;
  avatarUrl?: string | null;
  relation?: RelationType;
  isUser?: boolean;
  status?: FamilyMemberStatus;
  inviteEmail?: string;
  pendingInviteId?: string;
  // Link to actual profile if connected
  profileId?: string;
  // Prefer slug for navigation when available
  profileSlug?: string | null;
  // Nested relationships for tree rendering
  parents?: FamilyMember[];
  siblings?: FamilyMember[];
  children?: FamilyMember[];
  spouse?: FamilyMember;
}

export interface AddMemberData {
  name: string;
  birthday?: string;
  relation: RelationType;
  parentId?: string;
  profileId?: string;
  avatarUrl?: string | null;
}

export interface ProfileSearchResult {
  profileId: string;
  ownerUserId?: string;
  displayName: string;
  slug?: string | null;
  avatarUrl?: string | null;
  visibility?: string | null;
}

export type AddMemberPayload =
  | {
      relation: RelationType;
      parentId?: string;
      type: "existing";
      name: string;
      profileId: string;
      avatarUrl?: string | null;
    }
  | {
      relation: RelationType;
      parentId?: string;
      type: "manual";
      name: string;
      birthday?: string;
    }
  | {
      relation: RelationType;
      parentId?: string;
      type: "invite";
      firstName: string;
      lastName?: string;
      email: string;
    };

export type FamilyRelationshipType = RelationType;

export function mapToFamilyRelationType(relation: RelationType): FamilyRelationshipType {
  return relation;
}

// Connector design config for lines/anchors.
export type FamilyTreePresetName = "default" | "compact" | "contrast";

export interface FamilyTreeStatusColors {
  linked: string;
  invite_pending: string;
  manual: string;
  default: string;
}

export interface FamilyTreeLineStyle {
  thickness: string;
  colorClass: string;
}

export interface FamilyTreeConnectorConfig {
  statusColors: FamilyTreeStatusColors;
  coupleLine: FamilyTreeLineStyle;
  trunk: FamilyTreeLineStyle;
  siblingBus: FamilyTreeLineStyle;
  drop: FamilyTreeLineStyle;
  anchors: {
    coupleInsetPx: number;
    verticalGapPx: number;
  };
}
