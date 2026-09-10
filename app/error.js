"use client";

export default function Error({ reset }) {
  return (
    <main className="routeError">
      <span>550 / SIGNAL INTERRUPTED</span>
      <h1>TRANSMISSION ERROR</h1>
      <p>The page could not be loaded.</p>
      <button className="btn btnSolid" type="button" onClick={() => reset()}>TRY AGAIN</button>
    </main>
  );
}
