import { Fragment } from "react/jsx-runtime";

type TimelineProps = {
  children?: React.ReactNode;
  img?: React.ReactNode;
  verticalLine?: boolean;
};

export function TimelineRow({ children, img, verticalLine }: TimelineProps) {
  return (
    <Fragment>
      <section className="timelineRow">
        <span>{img}</span>
        <span className="timelineCaption">{children}</span>
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
            stroke: "var(--text-color)",
          }}
          strokeWidth="2"
        />
      </svg>
    </Fragment>
  );
}
