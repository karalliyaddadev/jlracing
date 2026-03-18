import Link from "next/link";

const CATEGORIES = [
  {
    href: "/bikes",
    title: "BIKES",
    heading: "Available Bike Inventory",
    description:
      "Explore our current stock of imported bikes ready for sale today.",
    image: "/landing/japan.jpg",
    imageBg: "#1a1a2e",
  },
  {
    href: "/spare-parts",
    title: "SPARE PARTS",
    heading: "Genuine Spare Parts",
    description:
      "Order original spare parts for bikes with trusted quality guarantee.",
    image: null,
    imageBg: "#0d1117",
  },
  {
    href: "/pre-orders",
    title: "PRE ORDERS",
    heading: "Pre-Order Bikes",
    description:
      "Check available pre-order models and request imports from our latest listings.",
    image: "/landing/colombo.avif",
    imageBg: "#111827",
  },
];

export default function WhatWeHave() {
  return (
    <section className="wwh">
      <div className="wwh__header">
        <h2 className="wwh__title">What We Have</h2>
        <p className="wwh__subtitle">
          Everything you need — from brand-new bikes to genuine parts and
          exclusive pre-orders.
        </p>
      </div>

      <div className="wwh__grid">
        {CATEGORIES.map((cat) => (
          <div key={cat.href} className="wwh-card">
            {/* Text block */}
            <div className="wwh-card__body">
              <h3 className="wwh-card__title">{cat.title}</h3>
              <p className="wwh-card__desc">{cat.description}</p>
              <Link href={cat.href} className="wwh-card__link">
                Explore more&nbsp;&rarr;
              </Link>
            </div>

            {/* Image block */}
            <div
              className="wwh-card__image"
              style={{
                backgroundImage: cat.image ? `url(${cat.image})` : "none",
                backgroundColor: cat.imageBg,
              }}
            >
              {!cat.image && (
                <svg
                  className="wwh-card__placeholder-icon"
                  viewBox="0 0 80 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="15" cy="30" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
                  <circle cx="65" cy="30" r="9" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" />
                  <path
                    d="M24 30h16l8-18h16l8 18"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
