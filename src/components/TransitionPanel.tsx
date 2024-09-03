export function PixelGrid() {
  function generateGrid(count: number) {
    return Array.from({ length: count }, (_, index) => (
      <span key={index} className="transitionItem"></span>
    ));
  }

  return <div className="transitionGrid">{generateGrid(1)}</div>;
}
