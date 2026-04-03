import { ApolloHospital } from "../data/work/ApolloHospital";
import { BellHospital } from "../data/work/BellHospital";
import { CircuitCentral } from "../data/work/CircuitCentral";
import { ClipDetective } from "../data/work/ClipDetective";
import { Examiq } from "../data/work/Examiq";
import { FeelTok } from "../data/work/FeelTok";
/* import { LectraAI } from "../data/work/LectraAI"; */
import { FunCulator } from "../data/work/FunCulator";
import { LetThereBeFragrance } from "../data/work/LetThereBeFragrance";
import { PlugIns } from "../data/work/PlugIns";
import { PortfolioV1 } from "../data/work/PortfolioV1";
import { PortfolioV2 } from "../data/work/PortfolioV2";
import { RayfitoutInternal } from "../data/work/RayfitoutInternal";
import { RayfitoutWeb } from "../data/work/RayfitoutWeb";
import { WhealthyVessel } from "../data/work/WhealthyVessel";
import { WorkEntry } from "./types/WorkEntry";

const projects = [
  FunCulator,
  BellHospital,
  PlugIns,
  ApolloHospital,
  CircuitCentral,
  PortfolioV1,
  PortfolioV2,
  ClipDetective,
  FeelTok,
  Examiq,
  WhealthyVessel,
  LetThereBeFragrance,
  RayfitoutWeb,
  RayfitoutInternal,
  /* LectraAI */
];

export const workMapping: { [key: number]: WorkEntry } = projects.reduce(
  (acc, project, index) => {
    acc[index] = project;
    return acc;
  },
  {} as { [key: number]: WorkEntry },
);
