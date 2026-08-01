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
          <p>{p.children}</p> <small className="date">{p.date}</small>
        </span>
      </section>

      <svg
        style={p.verticalLine ? { display: "block" } : { display: "none" }}
        height="24"
        className="verticalLine"
      >
        <path
          d="M 18 0 L 18 1000"
          style={{
            stroke: "var(--faded-color)",
          }}
          strokeWidth="2"
        />
      </svg>
    </>
  );
}
