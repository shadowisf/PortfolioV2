type TimelineProps = {
  children?: React.ReactNode;
  // switched off for now; each row keeps its old icon as a comment
  img?: React.ReactNode;
  date: string;
};

// "february 5, 2025 - february 27, 2025" -> "2025"
// "august 29, 2021 - september 3, 2022" -> "2021 - 2022"
// "july 27, 2026 - present"             -> "2026 - now"
function yearsOf(date: string) {
  const years = date.match(/\d{4}/g) ?? [];
  if (years.length === 0) return date;

  const first = years[0];
  const last = /present/i.test(date) ? "now" : years[years.length - 1];
  return first === last ? first : `${first} - ${last}`;
}

// One row of the about timeline, set as a table: the years in a narrow column
// on the left for scanning down, and on the right what happened, with the
// exact dates beneath it.
export function TimelineRow(p: TimelineProps) {
  return (
    <section className="timelineRow">
      <small className="years">{yearsOf(p.date)}</small>
      <span className="timelineCaption">
        {p.img}
        <p>{p.children}</p>
        <small className="date">{p.date}</small>
      </span>
    </section>
  );
}
