import Link from "next/link";

const MILESTONES = [
  {
    icon: "/about/bike-gold.png",
    title: "Lifelong Rider & Racing Enthusiast",
    desc: "Passionate about motorcycles and motorsports since childhood.",
  },
  {
    icon: "/about/building-gold.png",
    title: "Family Business Leadership",
    desc: "Took over and managed the family business in Sri Lanka.",
  },
  {
    icon: "/about/chart-gold.png",
    title: "JL Racing Growth",
    desc: "Scaled JL Racing into Sri Lanka\u2019s most trusted high-performance motorcycle dealership.",
  },
  {
    icon: "/about/globe-gold.png",
    title: "Global Vision",
    desc: "Founded JLR International to provide smooth and genuine vehicle import services worldwide.",
  },
];

const VALUES = [
  {
    icon: "/about/verified.png",
    title: "Reliability",
    desc: "Dependable sourcing and delivery of verified vehicles, motorcycles, and machinery worldwide.",
  },
  {
    icon: "/about/invisible.png",
    title: "Transparency",
    desc: "Clear communication and documentation for every step of the import process.",
  },
  {
    icon: "/about/briefcase.png",
    title: "Professionalism",
    desc: "Expert team handling exports efficiently with international standards in mind.",
  },
  {
    icon: "/about/handshake.png",
    title: "Trust",
    desc: "Long-term client relationships built through consistent quality and support.",
  },
];

const AUCTION_LOGOS = [
  { src: "/about/TAA.png", alt: "TAA" },
  { src: "/about/ju.png", alt: "JU" },
  { src: "/about/uss.png", alt: "USS Tokyo" },
  { src: "/about/arai.png", alt: "ARAI Auctions" },
  { src: "/about/caa.png", alt: "CAA" },
  { src: "/about/aucnet.png", alt: "AUCNET" },
  { src: "/about/Honda.png", alt: "Honda Auto Auction" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="abt-hero">
        <div className="abt-hero__bg" />
        <div className="abt-hero__overlay" />
        <div className="abt-hero__content">
          <span className="abt-hero__label">About</span>
          <h1 className="abt-hero__heading">
            Connecting the world with <em>quality Japanese vehicles</em>
          </h1>
        </div>
      </section>

      {/* ── Our Company ── */}
      <section className="abt-company">
        <div className="abt-company__inner">
          {/* Top centered */}
          <div className="abt-company__top">
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">Our Company</span>
            </span>
            <h2 className="abt-company__heading">
              Connecting the world with trusted Japanese vehicles, motorcycles,
              and machinery
            </h2>
          </div>

          {/* Two-column body */}
          <div className="abt-company__body">
            {/* Left: text */}
            <div className="abt-company__text">
              <p>
                Founded in 2018 in Japan, JLR International was established with
                a clear vision: to connect the world with high-quality Japanese
                vehicles, motorcycles, and machinery. Built on a strong
                foundation of industry knowledge and global demand, we have
                grown into a trusted name in international exports. From the
                beginning, Sri Lanka has been one of our key markets,
                consistently supplying vehicles and motorbikes, earning a loyal
                customer base. Our reach now spans multiple continents and
                diverse markets worldwide.
              </p>
              <p>
                At JLR International, we specialize in exporting vehicles,
                motorcycles, and machinery, managing the entire process from
                sourcing and inspection to documentation and global shipping.
                Our commitment is to ensure reliability, transparency, and
                quality in every shipment.
              </p>
            </div>

            {/* Right: group image with caption */}
            <div className="abt-company__img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/group-img.jpg"
                alt="JLR International team"
                className="abt-company__img"
              />
              <div className="abt-company__img-caption">
                The same team behind JLR International also operates{" "}
                <strong>JL Racing Sri Lanka</strong>, a hub for motorsport
                enthusiasts and performance vehicles.{" "}
                <Link href="/" className="abt-company__caption-link">
                  <strong>Visit their website</strong>
                </Link>
                .
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Auctions ── */}
      <section className="abt-auctions">
        <div className="abt-auctions__inner">
          <span className="abt-auctions__pill">Auctions</span>
          <h2 className="abt-auctions__heading">
            Licensed access to top Japanese auction houses
          </h2>
          <div className="abt-auctions__grid">
            {AUCTION_LOGOS.map((logo) => (
              <div key={logo.alt} className="abt-auctions__logo-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="abt-auctions__logo-img"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chairman ── */}
      <section className="abt-chairman">
        <div className="abt-chairman__inner">
          {/* Top centered */}
          <div className="abt-chairman__top">
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">Chairman</span>
            </span>
            <h2 className="abt-chairman__heading">
              Meet our chairman, Jin Liyanage, a lifelong rider and entrepreneur
              who built Sri Lanka&apos;s top bike dealership and now leads JLR
              International globally.
            </h2>
          </div>

          {/* Two-column body */}
          <div className="abt-chairman__body">
            <div className="abt-chairman__text">
              <p>
                Our chairman, Jin Liyanage, is a lifelong rider and racing
                enthusiast with a deep passion for high-capacity motorcycles. He
                successfully managed his family business in Sri Lanka and,
                within less than a decade, scaled JL Racing into one of the
                country&apos;s most trusted bike dealerships, specializing in
                high-performance motorcycles. Building on this experience, he
                founded JLR International with the vision of providing clients
                worldwide a genuine, smooth, and reliable vehicle import
                service. His expertise, dedication, and commitment to quality
                continue to drive the company&apos;s global expansion.
              </p>
            </div>
            <div className="abt-chairman__img-wrap">
              {/* Chairman image placeholder — replace src when available */}
              <div className="abt-chairman__img-placeholder" />
            </div>
          </div>

          <p className="abt-chairman__milestone-title">
            <em>Key Milestones That Shaped His Journey and Vision</em>
          </p>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="abt-milestones">
        <div className="abt-milestones__grid">
          {MILESTONES.map((m) => (
            <div key={m.title} className="abt-ms-card">
              <div className="abt-ms-card__bg" />
              <div className="abt-ms-card__overlay" />
              <div className="abt-ms-card__body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.icon} alt={m.title} className="abt-ms-card__icon" />
                <div className="abt-ms-card__text">
                  <h3 className="abt-ms-card__title">{m.title}</h3>
                  <p className="abt-ms-card__desc">{m.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="abt-values">
        <div className="abt-values__inner">
          <div className="abt-values__top">
            <span className="abt-auctions__pill">Values</span>
            <h2 className="abt-values__heading">
              Reliability, transparency, professionalism, and long-term trust
              guide every interaction, ensuring our clients receive world-class
              Japanese products and service.
            </h2>
          </div>
          <div className="abt-values__grid">
            {VALUES.map((v) => (
              <div key={v.title} className="abt-val-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.icon}
                  alt={v.title}
                  className="abt-val-card__icon"
                />
                <h3 className="abt-val-card__title">{v.title}</h3>
                <p className="abt-val-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="int-cta">
        <div className="int-cta__bg" />
        <div className="int-cta__overlay" />
        <div className="int-cta__content">
          <span className="int-pill">
            <span className="int-pill__plain">Start Your</span>
            <span className="int-pill__gold">Order</span>
          </span>
          <h2 className="int-cta__heading">
            Choose a vehicle from our listings or contact us to{" "}
            <em>begin your export process.</em>
          </h2>
          <div className="int-cta__actions">
            <Link href="/listings" className="int-btn int-btn--primary">
              View All Listings
            </Link>
            <Link href="/contact" className="int-btn int-btn--outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
