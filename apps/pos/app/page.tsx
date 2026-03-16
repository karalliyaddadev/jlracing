export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  return (
    <main>
      <section className="card">
        <h1>Bike POS Frontend</h1>
        <small>Sell bikes and monitor inventory in real time.</small>
        <ul>
          <li>Backend API: <code>{apiUrl}</code></li>
          <li>Endpoint check: <code>{apiUrl}/health</code></li>
          <li>Core resource: <code>{apiUrl}/bikes</code></li>
        </ul>
      </section>
    </main>
  );
}
