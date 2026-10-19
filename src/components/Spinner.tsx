import { MoonLoader } from "react-spinners";

// The site's loading mark: a moon, turning slowly, in the colour of the
// words around it -- the project page's while its media loads, and the home
// tiles' while a preview does (ProjectCard).
export function LoadingMark() {
  return <MoonLoader color="currentColor" speedMultiplier={0.5} />;
}

export default function Spinner() {
  return (
    <div className="spinner">
      <LoadingMark />
    </div>
  );
}
