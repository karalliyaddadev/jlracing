import Link from "next/link";
import FadeIn from "../components/FadeIn";

const MILESTONES = [
  {
    icon: "/about/bike-gold.png",
    bgImage: "/about/life-long-rider.jpg",
    title: "Lifelong Rider & Racing Enthusiast",
    desc: "Passionate about motorcycles and motorsports since childhood.",
  },
  {
    icon: "/about/building-gold.png",
    bgImage: "/about/family-business-leadership.png",
    title: "Family Business Leadership",
    desc: "Took over and managed the family business in Sri Lanka.",
  },
  {
    icon: "/about/chart-gold.png",
    bgImage: "/about/jl-racing-growth.jpg",
    title: "JL Racing Growth",
    desc: "Scaled JL Racing into Sri Lanka’s most trusted high-performance motorcycle dealership.",
  },
  {
    icon: "/about/globe-gold.png",
    bgImage: "/about/global-vision.jpg",
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
      {/* ── Hero — no animation (above the fold) ── */}
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
          <FadeIn className="abt-company__top">
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">
                <span className="abt-grad-text">Our Company</span>
              </span>
            </span>
            <h2 className="abt-company__heading">
              Connecting the world with trusted Japanese vehicles, motorcycles,
              and machinery
            </h2>
          </FadeIn>

          <div className="abt-company__body">
            <FadeIn className="abt-company__text" direction="left" delay={0.1}>
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
            </FadeIn>

            <FadeIn className="abt-company__img-wrap" direction="right" delay={0.2}>
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
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Auctions ── */}
      <section className="abt-auctions">
        <div className="abt-auctions__inner">
          <FadeIn className="abt-auctions__top">
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">
                <span className="abt-grad-text">Auctions</span>
              </span>
            </span>
            <h2 className="abt-auctions__heading">
              Licensed access to top Japanese auction houses
            </h2>
          </FadeIn>
          <div className="abt-auctions__grid">
            {AUCTION_LOGOS.map((logo, i) => (
              <FadeIn key={logo.alt} className="abt-auctions__logo-card" delay={i * 0.07}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="abt-auctions__logo-img"
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chairman ── */}
      <section className="abt-chairman">
        <div className="abt-chairman__inner">
          <FadeIn className="abt-chairman__top">
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">
                <span className="abt-grad-text">Chairman</span>
              </span>
            </span>
            <h2 className="abt-chairman__heading">
              Meet our chairman, Jin Liyanage, a lifelong rider and entrepreneur
              who built Sri Lanka&apos;s top bike dealership and now leads JLR
              International globally.
            </h2>
          </FadeIn>

          <div className="abt-chairman__body">
            <FadeIn className="abt-chairman__text" direction="left" delay={0.1}>
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
            </FadeIn>
            <FadeIn className="abt-chairman__photos" direction="right" delay={0.2}>
              <div className="abt-chairman__photo abt-chairman__photo--main">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/chairman%201.jpeg"
                  alt="Chairman Jin Liyanage"
                />
              </div>
              <div className="abt-chairman__photo-stack">
                <div className="abt-chairman__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/about/chairman%202.png"
                    alt="Chairman Jin Liyanage"
                  />
                </div>
                <div className="abt-chairman__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/about/chairman%203.jpg"
                    alt="Chairman Jin Liyanage"
                  />
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn>
            <p className="abt-chairman__milestone-title">
              Key Milestones That Shaped His Journey and Vision
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="abt-milestones">
        <div className="abt-milestones__grid">
          {MILESTONES.map((m, i) => (
            <FadeIn key={m.title} className="abt-ms-card" delay={i * 0.1}>
              <div
                className="abt-ms-card__bg"
                style={{ backgroundImage: `url('${m.bgImage}')` }}
              />
              <div className="abt-ms-card__overlay" />
              <div className="abt-ms-card__body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.icon} alt={m.title} className="abt-ms-card__icon" />
                <div className="abt-ms-card__text">
                  <h3 className="abt-ms-card__title">{m.title}</h3>
                  <p className="abt-ms-card__desc">{m.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="abt-values">
        <div className="abt-values__inner">
          <FadeIn className="abt-values__top">
            <span className="abt-grad-pill">
              <span className="abt-grad-pill__text">
                <span className="abt-grad-text">Values</span>
              </span>
            </span>
            <h2 className="abt-values__heading">
              Reliability, transparency, professionalism, and long-term trust
              guide every interaction, ensuring our clients receive world-class
              Japanese products and service.
            </h2>
          </FadeIn>
          <div className="abt-values__grid">
            {VALUES.map((v, i) => (
              <FadeIn key={v.title} className="abt-val-card" delay={i * 0.1}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.icon}
                  alt={v.title}
                  className="abt-val-card__icon"
                />
                <h3 className="abt-val-card__title">{v.title}</h3>
                <p className="abt-val-card__desc">{v.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="int-cta">
        <div className="int-cta__bg" />
        <div className="int-cta__overlay" />
        <FadeIn className="int-cta__content">
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
        </FadeIn>
      </section>
    </>
  );
}
