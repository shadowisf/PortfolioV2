import { ApolloHospital } from "../data/work/ApolloHospital";
import { BellHospital } from "../data/work/BellHospital";
import { CircuitCentral } from "../data/work/CircuitCentral";
import { ClipDetective } from "../data/work/ClipDetective";
import { Examiq } from "../data/work/Examiq";
import { FeelTok } from "../data/work/FeelTok";
import { FunCulator } from "../data/work/FunCulator";
import { PlugIns } from "../data/work/PlugIns";
import { PortfolioV1 } from "../data/work/PortfolioV1";
import { PortfolioV2 } from "../data/work/PortfolioV2";
import { WorkEntry } from "./types/WorkEntry";

export const workMapping: {
  [key: number]: WorkEntry;
} = {
  // all
  /* 0: PlugIns,
  1: BellHospital,
  2: FunCulator,
  3: ApolloHospital,
  4: CircuitCentral,
  5: PortfolioV1,
  6: PortfolioV2,
  7: ClipDetective,
  8: FeelTok,
  9: WhealthyVessel,
  10: Examiq,
  11: LetThereBeFragrance, */

  // filtered
  0: PlugIns,
  1: BellHospital,
  2: FunCulator,
  3: ApolloHospital,
  4: CircuitCentral,
  5: PortfolioV1,
  6: PortfolioV2,
  7: ClipDetective,
  8: FeelTok,
  9: Examiq,
};
