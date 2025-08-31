import { MoonLoader } from "react-spinners";

export default function Spinner() {
  return (
    <div className="spinner">
      <MoonLoader color="currentColor" speedMultiplier={0.5} />
    </div>
  );
}
