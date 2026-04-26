"use client";

import { useState } from "react";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

const LOGOS = [
  { name: "Yamaha", src: "/news-letter/yamaha.png" },
  { name: "Honda", src: "/news-letter/honda.png" },
  { name: "Kawasaki", src: "/news-letter/kawasaki.png" },
  { name: "Suzuki", src: "/news-letter/suzuki.png" },
  { name: "BMW", src: "/news-letter/bmw.png" },
  { name: "Ducati", src: "/news-letter/ducati.png" },
  { name: "Harley-Davidson", src: "/news-letter/harley-davidson.png" },
  { name: "Triumph", src: "/news-letter/triumph.png" },
];

export default function NewsLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch(`${CMS_API_URL}/api/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMessage(
          (data?.message as string) || "Something went wrong. Please try again."
        );
      } else {
        setStatus("success");
        setMessage("You're subscribed! Welcome aboard.");
        setEmail("");
      }
    } catch (err) {
      void err;
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const feedbackEl = message ? (
    <p
      className={
        status === "error"
          ? "nl__feedback nl__feedback--error"
          : "nl__feedback nl__feedback--success"
      }
    >
      {message}
    </p>
  ) : null;

  return (
    <section className="nl">
      {/* Desktop layout */}
      <div className="nl__desktop">
        <img src="/news-letter/left-girl.jpg" alt="" className="nl__left-img" />
        <div className="nl__content">
          <div className="nl__logos">
            {LOGOS.map((l) => (
              <img
                key={l.name}
                src={l.src}
                alt={l.name}
                className={`nl__logo${l.name === "Yamaha" ? " nl__logo--yamaha" : ""}`}
              />
            ))}
          </div>
          <h2 className="nl__heading">Stay Tuned</h2>
          <p className="nl__desc">
            Stay updated with our latest bike arrivals, exclusive pre-order
            opportunities, import updates, and special offers. Subscribe to our
            newsletter to get early notifications, member-only discounts, and
            the latest deals on available bikes.
          </p>
          <form className="nl__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="nl__input"
              placeholder="Enter Your Email Address Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="submit"
              className="nl__btn"
              aria-label="Subscribe"
              disabled={status === "loading" || status === "success"}
            >
              <img
                src="/news-letter/button.png"
                alt="Subscribe"
                className="nl__btn-img"
              />
            </button>
          </form>
          {feedbackEl}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="nl__mobile">
        <div className="nl__logos nl__logos--mobile">
          {LOGOS.map((l) => (
            <img
              key={l.name}
              src={l.src}
              alt={l.name}
              className={`nl__logo${l.name === "Yamaha" ? " nl__logo--yamaha" : ""}`}
            />
          ))}
        </div>
        <h2 className="nl__heading">Stay Tuned</h2>
        <p className="nl__desc">
          Stay updated with our latest bike arrivals, exclusive pre-order
          opportunities, import updates, and special offers.{" "}
          <span className="nl__highlight">Subscribe to our newsletter</span> to
          get early notifications, member-only discounts, and the latest deals
          on available bikes.
        </p>
        <form className="nl__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="nl__input"
            placeholder="Enter Your Email Address Here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "loading" || status === "success"}
          />
          <button
            type="submit"
            className="nl__btn"
            aria-label="Subscribe"
            disabled={status === "loading" || status === "success"}
          >
            <img
              src="/news-letter/button.png"
              alt="Subscribe"
              className="nl__btn-img"
            />
          </button>
        </form>
        {feedbackEl}
      </div>
    </section>
  );
}
