type TimelineProps = {
  children?: React.ReactNode;
  img?: React.ReactNode;
  verticalLine?: boolean;
  date: string;
};

export function TimelineRow(p: TimelineProps) {
  return (
    <>
      <section className="timelineRow">
        {p.img}
        <span className="timelineCaption">
          <span>{p.children}</span> <span className="date">{p.date}</span>
        </span>
      </section>
      <svg
        style={p.verticalLine ? { display: "block" } : { display: "none" }}
        width="40"
        height="50"
        className="verticalLine"
      >
        <path
          d="M 20 0 L 20 1000"
          style={{
            stroke: "var(--faded-color)",
          }}
          strokeWidth="2"
        />
      </svg>
    </>
  );
}
