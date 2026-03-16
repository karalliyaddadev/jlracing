export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  return (
    <main>
      <section className="card">
        <h1>Bike Local Frontend</h1>
        <p>Focused on local inventory, pricing and nearby distribution flows.</p>
        <p>Connected API: {apiUrl}</p>
      </section>
    </main>
  );
}
