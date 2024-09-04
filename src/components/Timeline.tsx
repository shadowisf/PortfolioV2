import { Fragment } from "react/jsx-runtime";

type TimelineProps = {
  children?: React.ReactNode;
  img?: React.ReactNode;
  verticalLine?: boolean;
  date: string;
};

export function TimelineRow({
  children,
  img,
  verticalLine,
  date,
}: TimelineProps) {
  return (
    <Fragment>
      <section className="timelineRow">
        <picture>{img}</picture>
        <span className="timelineCaption">
          <span>{children}</span> <span className="date">{date}</span>
        </span>
      </section>
      <svg
        style={verticalLine ? { display: "block" } : { display: "none" }}
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
    </Fragment>
  );
}
