export default function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  return (
    <main>
      <section className="card">
        <h1>Bike Foreign Frontend</h1>
        <p>Built for international distribution, pricing and multilingual expansion.</p>
        <p>Connected API: {apiUrl}</p>
      </section>
    </main>
  );
}
