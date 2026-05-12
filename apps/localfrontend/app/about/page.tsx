"use client";

import Image from "next/image";
import FadeIn from "../components/FadeIn";

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <span className="about-hero__label">About J L Racing</span>
          <h1 className="about-hero__title">
            Bringing World-Class Bikes to
            <br />
            <em>Sri Lankan Riders</em>
          </h1>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <FadeIn className="about-hero__stats-bar">
        <div className="about-hero__stat">
          <span className="about-hero__stat-num">30+</span>
          <span className="about-hero__stat-label">Years of Experience</span>
        </div>
        <div className="about-hero__stat-divider" />
        <div className="about-hero__stat">
          <span className="about-hero__stat-num">1st</span>
          <span className="about-hero__stat-label">Choice of Riders</span>
        </div>
        <div className="about-hero__stat-divider" />
        <div className="about-hero__stat">
          <span className="about-hero__stat-num">1,000+</span>
          <span className="about-hero__stat-label">Bikes Imported</span>
        </div>
        <div className="about-hero__stat-divider" />
        <div className="about-hero__stat">
          <span className="about-hero__stat-num">500+</span>
          <span className="about-hero__stat-label">Happy Riders</span>
        </div>
      </FadeIn>

      {/* ── Story Section ── */}
      <section className="about-story">
        <div className="about-story__container">
          <FadeIn className="about-story__text" direction="left">
            <span className="about-section-label">
              Where Passion Meets Performance
            </span>
            <h2 className="about-story__heading">
              <em>For over 30 years</em>, we&apos;ve been bringing riders the
              bikes of their dreams
            </h2>
            <p>
              At JL Racing, we live and breathe motorcycles. For over three
              decades, we&apos;ve been importing the bikes riders dream about.
              Fast, sleek, and built to thrill.
            </p>
            <p>
              From high-performance Japanese sports bikes to dependable everyday
              rides, we make sure every machine meets our standards of quality,
              authenticity, and excitement.
            </p>
            <p>
              Whether you're browsing our showroom, pre-ordering a new model, or
              picking up genuine spare parts, we're here to fuel your passion
              for riding.
            </p>
          </FadeIn>
          <FadeIn className="about-story__image-wrap" direction="right">
            <Image
              src="/about/about-company.png"
              alt="JL Racing showroom"
              fill
              className="about-story__image"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          </FadeIn>
        </div>
      </section>

      {/* ── Founder Section ── */}
      <section className="about-founder">
        <div className="about-founder__container">
          <FadeIn className="about-founder__text" direction="left">
            <span className="about-section-label about-section-label--light">
              Driven by Passion
            </span>
            <h2 className="about-founder__heading">
              Meet Jin Liyanage: <em>A Lifelong Rider and Racing Enthusiast</em>
            </h2>
            <p>
              Mr. Jin Liyanage isn&apos;t just a businessman, he&apos;s a
              lifelong rider. His passion for motorcycles drives everything at
              JL Racing.
            </p>
            <p>
              With decades of experience in imports and sales, he ensures every
              bike we bring in is genuine, fully checked, and ready to thrill.
              Under his guidance, JL Racing has grown from a small family
              business into one of Sri Lanka&apos;s most trusted names for
              bikes, parts, and worldwide exports.
            </p>
          </FadeIn>
          <FadeIn className="about-founder__gallery" direction="right">
            <div className="about-founder__img-wrap">
              <Image
                src="/about/chairman%201.jpeg"
                alt="Jin Liyanage - Chairman"
                fill
                className="about-founder__img"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="about-founder__img-wrap">
              <Image
                src="/about/chairman%202.png"
                alt="Jin Liyanage - Founder"
                fill
                className="about-founder__img"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
            <div className="about-founder__img-wrap">
              <Image
                src="/about/chairman%203.jpg"
                alt="Jin Liyanage - JL Racing"
                fill
                className="about-founder__img"
                sizes="(max-width: 768px) 100vw, 30vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="about-vm">
        <div className="about-vm__container">
          <FadeIn className="about-vm__card">
            <h3 className="about-vm__title">Vision</h3>
            <p className="about-vm__text">
              To be Sri Lanka&apos;s most trusted bike importer and a hub for
              motorcycle enthusiasts, bringing world-class machines and
              experiences to every rider.
            </p>
            <span className="about-vm__tag">Leading Passion</span>
          </FadeIn>
          <FadeIn className="about-vm__card" delay={0.1}>
            <h3 className="about-vm__title">Mission</h3>
            <p className="about-vm__text">
              To bring riders the bikes they&apos;ve always dreamed of. Genuine,
              high-performance machines delivered with trust, excitement, and
              passion for the ride.
            </p>
            <span className="about-vm__tag">Ride Inspired</span>
          </FadeIn>
        </div>
      </section>

      {/* ── Milestones / Our Journey ── */}
      <section className="about-journey">
        <div
          className="about-journey__bg"
          style={{ backgroundImage: "url('/images/about-journey-bg.webp')" }}
        />
        <div className="about-journey__overlay" />
        <div className="about-journey__container">
          <span className="about-section-label">Our Journey</span>
          <h2 className="about-journey__heading">
            Milestones That Shaped <em>JL Racing</em>
          </h2>
          <div className="about-journey__grid">
            {[
              {
                year: "1995",
                title: "Liyanage and Sons Founded",
                desc: "What started as a small family business was fueled by a love for motorcycles and a vision to bring world-class bikes to Sri Lankan riders.",
                img: "/about/Milestone%20-%201995.png",
              },
              {
                year: "2000s",
                title: "Expanding Imports",
                desc: "Introduced high-performance Japanese motorcycles to the local market, making the bikes riders dreamed about finally accessible.",
                img: "/about/milestone%202000.jpg",
              },
              {
                year: "2018",
                title: "Rebranding as JL Racing",
                desc: "Modernized the brand and expanded services to include pre-orders, genuine spare parts, and a wider range of bikes.",
                img: "/about/Milestone%202018.jpg",
              },
              {
                year: "2019\u2013Present",
                title: "Growth & Local Leadership",
                desc: "Became one of Sri Lanka's most trusted names for bikes, parts, and accessories, driven by rider passion and customer trust.",
                img: "/about/Milestone%20-%202019.jpg",
              },
            ].map((m, i) => (
              <FadeIn key={m.year} className="about-milestone" delay={i * 0.07}>
                <div className="about-milestone__img-wrap">
                  <Image
                    src={m.img}
                    alt={m.title}
                    fill
                    className="about-milestone__img"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <span className="about-milestone__badge">{m.year}</span>
                </div>
                <div className="about-milestone__body">
                  <h3 className="about-milestone__title">{m.title}</h3>
                  <p className="about-milestone__desc">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta">
        <FadeIn className="about-cta__container">
          <h2 className="about-cta__heading">
            Ready to Find Your Perfect Ride?
          </h2>
          <p className="about-cta__sub">
            Browse our in-house stock or pre-order your dream motorcycle today.
          </p>
          <div className="about-cta__buttons">
            <a href="/bikes" className="about-cta__btn about-cta__btn--primary">
              View Listings
            </a>
            <a
              href="/pre-orders"
              className="about-cta__btn about-cta__btn--outline"
            >
              Pre-Order Now
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
