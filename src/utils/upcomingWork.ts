// Projects on the way. They are listed -- greyed out, and not clickable -- so
// the work list shows what is coming, but they have no page, preview or video
// yet, which is why they live here and not in workMapping. Newest first.
//
// When one is ready, give it a data file in src/data/work, add it to
// workMapping, and remove it from here.
export type UpcomingWork = {
  name: string;
  type: string;
  year: string;
};

export const upcomingWork: UpcomingWork[] = [
  { name: "furchild", type: "professional experience", year: "2026" },
  {
    name: "college of integrative veterinary therapies",
    type: "professional experience",
    year: "2026",
  },
  {
    name: "animal diet formulator",
    type: "professional experience",
    year: "2026",
  },
];
