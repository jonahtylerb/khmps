// Generated by Xata Codegen 0.30.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "kingdomHalls",
    columns: [{ name: "name", type: "string" }],
    revLinks: [{ column: "kingdomHall", table: "users" }],
  },
  {
    name: "users",
    columns: [
      { name: "name", type: "string" },
      { name: "email", type: "string" },
      { name: "kingdomHall", type: "link", link: { table: "kingdomHalls" } },
      { name: "adminCode", type: "string" },
      { name: "cong", type: "string" },
      { name: "phone", type: "string" },
      { name: "skills", type: "multiple" },
      { name: "password", type: "text" },
    ],
    revLinks: [
      { column: "assignedTo", table: "august" },
      { column: "assignedTo", table: "TaskCardList" },
      { column: "assignedTo", table: "orchestra-gliding-first" },
      { column: "assignedTo", table: "plasmas-waltzed-fetching" },
      { column: "assignedTo", table: "squish-rotate-matter" },
      { column: "assignedTo", table: "being-sweeter-cried" },
      { column: "assignedTo", table: "framework-shortened-lined" },
      { column: "assignedTo", table: "claiborne" },
      { column: "assignedTo", table: "gesture-monitored-lobster" },
      { column: "assignedTo", table: "pearl-river" },
      { column: "assignedTo", table: "shop-valid-bricks" },
      { column: "assignedTo", table: "sailing-reboot-heads" },
      { column: "assignedTo", table: "extract-pull-clients" },
      { column: "assignedTo", table: "respond-inflatable-scars" },
      { column: "assignedTo", table: "rugs-coasts-urgency" },
      { column: "assignedTo", table: "stump-committee-leaner" },
      { column: "assignedTo", table: "ap" },
      { column: "assignedTo", table: "lake-forest" },
      { column: "assignedTo", table: "congress" },
    ],
  },
  {
    name: "august",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "TaskCardList",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "orchestra-gliding-first",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "plasmas-waltzed-fetching",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "squish-rotate-matter",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "being-sweeter-cried",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "framework-shortened-lined",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "claiborne",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "gesture-monitored-lobster",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "pearl-river",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "shop-valid-bricks",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "sailing-reboot-heads",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "extract-pull-clients",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "respond-inflatable-scars",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "rugs-coasts-urgency",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "stump-committee-leaner",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "ap",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "lake-forest",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
  {
    name: "congress",
    columns: [
      { name: "title", type: "string" },
      { name: "assignedTo", type: "link", link: { table: "users" } },
      { name: "message", type: "string" },
      { name: "due", type: "string" },
      { name: "completed", type: "string" },
      { name: "sort", type: "int" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type KingdomHalls = InferredTypes["kingdomHalls"];
export type KingdomHallsRecord = KingdomHalls & XataRecord;

export type Users = InferredTypes["users"];
export type UsersRecord = Users & XataRecord;

export type August = InferredTypes["august"];
export type AugustRecord = August & XataRecord;

export type TaskCardList = InferredTypes["TaskCardList"];
export type TaskCardListRecord = TaskCardList & XataRecord;

export type OrchestraGlidingFirst = InferredTypes["orchestra-gliding-first"];
export type OrchestraGlidingFirstRecord = OrchestraGlidingFirst & XataRecord;

export type PlasmasWaltzedFetching = InferredTypes["plasmas-waltzed-fetching"];
export type PlasmasWaltzedFetchingRecord = PlasmasWaltzedFetching & XataRecord;

export type SquishRotateMatter = InferredTypes["squish-rotate-matter"];
export type SquishRotateMatterRecord = SquishRotateMatter & XataRecord;

export type BeingSweeterCried = InferredTypes["being-sweeter-cried"];
export type BeingSweeterCriedRecord = BeingSweeterCried & XataRecord;

export type FrameworkShortenedLined =
  InferredTypes["framework-shortened-lined"];
export type FrameworkShortenedLinedRecord = FrameworkShortenedLined &
  XataRecord;

export type Claiborne = InferredTypes["claiborne"];
export type ClaiborneRecord = Claiborne & XataRecord;

export type GestureMonitoredLobster =
  InferredTypes["gesture-monitored-lobster"];
export type GestureMonitoredLobsterRecord = GestureMonitoredLobster &
  XataRecord;

export type PearlRiver = InferredTypes["pearl-river"];
export type PearlRiverRecord = PearlRiver & XataRecord;

export type ShopValidBricks = InferredTypes["shop-valid-bricks"];
export type ShopValidBricksRecord = ShopValidBricks & XataRecord;

export type SailingRebootHeads = InferredTypes["sailing-reboot-heads"];
export type SailingRebootHeadsRecord = SailingRebootHeads & XataRecord;

export type ExtractPullClients = InferredTypes["extract-pull-clients"];
export type ExtractPullClientsRecord = ExtractPullClients & XataRecord;

export type RespondInflatableScars = InferredTypes["respond-inflatable-scars"];
export type RespondInflatableScarsRecord = RespondInflatableScars & XataRecord;

export type RugsCoastsUrgency = InferredTypes["rugs-coasts-urgency"];
export type RugsCoastsUrgencyRecord = RugsCoastsUrgency & XataRecord;

export type StumpCommitteeLeaner = InferredTypes["stump-committee-leaner"];
export type StumpCommitteeLeanerRecord = StumpCommitteeLeaner & XataRecord;

export type Ap = InferredTypes["ap"];
export type ApRecord = Ap & XataRecord;

export type LakeForest = InferredTypes["lake-forest"];
export type LakeForestRecord = LakeForest & XataRecord;

export type Congress = InferredTypes["congress"];
export type CongressRecord = Congress & XataRecord;

export type DatabaseSchema = {
  kingdomHalls: KingdomHallsRecord;
  users: UsersRecord;
  august: AugustRecord;
  TaskCardList: TaskCardListRecord;
  "orchestra-gliding-first": OrchestraGlidingFirstRecord;
  "plasmas-waltzed-fetching": PlasmasWaltzedFetchingRecord;
  "squish-rotate-matter": SquishRotateMatterRecord;
  "being-sweeter-cried": BeingSweeterCriedRecord;
  "framework-shortened-lined": FrameworkShortenedLinedRecord;
  claiborne: ClaiborneRecord;
  "gesture-monitored-lobster": GestureMonitoredLobsterRecord;
  "pearl-river": PearlRiverRecord;
  "shop-valid-bricks": ShopValidBricksRecord;
  "sailing-reboot-heads": SailingRebootHeadsRecord;
  "extract-pull-clients": ExtractPullClientsRecord;
  "respond-inflatable-scars": RespondInflatableScarsRecord;
  "rugs-coasts-urgency": RugsCoastsUrgencyRecord;
  "stump-committee-leaner": StumpCommitteeLeanerRecord;
  ap: ApRecord;
  "lake-forest": LakeForestRecord;
  congress: CongressRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Jonah-Brupbacher-s-workspace-92gsoo.us-east-1.xata.sh/db/MaintenanceManager",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
