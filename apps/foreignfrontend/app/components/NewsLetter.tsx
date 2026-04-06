"use client";

import { useState } from "react";

export default function NewsLetter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="int-nl">
      <div className="int-nl__inner">
        <span className="int-pill">
          <span className="int-pill__plain">Subscribe</span>
          <span className="int-pill__gold">Now</span>
        </span>
        <h2 className="int-nl__heading">
          Get <em>latest vehicle updates</em>
          <br />
          and export opportunities
        </h2>
        <p className="int-nl__desc">
          Receive new listings, export updates, and exclusive offers directly to
          your inbox from our team.
        </p>
        <form className="int-nl__form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="int-nl__input"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <button type="submit" className="int-nl__btn" aria-label="Subscribe">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Button.png"
              alt="Subscribe"
              className="int-nl__btn-img"
            />
          </button>
        </form>
        <div className="int-nl__checks">
          <span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Updates
          </span>
          <span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Offers
          </span>
          <span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Listings
          </span>
        </div>
      </div>
    </section>
  );
}
