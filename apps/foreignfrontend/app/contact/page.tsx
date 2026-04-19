"use client";

import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

/* ── Types ── */
interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order: number;
}

interface FaqCategory {
  id: number;
  title: string;
  order: number;
  items: FaqItem[];
}

const CONTACT_INFO = [
  {
    Icon: FaMapMarkerAlt,
    label: "Visit Us",
    value: "No.154 Katugastota - Kurunegala - Puttalam Hwy, Kurunegala 60000",
  },
  {
    Icon: FaPhone,
    label: "Hotline",
    value: "0372 228 220 | WhatsApp: 071 791 0091",
  },
  {
    Icon: FaEnvelope,
    label: "Talk to Us",
    value: "info@jlracingshop.com",
  },
  {
    Icon: FaClock,
    label: "Business Hours",
    value: "Mon–Sat: 8:30 AM–6 PM | Sun: Closed",
  },
];

export default function ContactPage() {
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);

  /* active category id (string for URL-compat, stored as number internally) */
  const [activeCatId, setActiveCatId] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${CMS_API_URL}/api/faq/active?site=FOREIGN`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: FaqCategory[]) => {
        setFaqCategories(data);
        if (data.length > 0) setActiveCatId(data[0].id);
      })
      .catch(() => {
        /* ignore — show nothing */
      })
      .finally(() => setFaqLoading(false));
  }, []);

  const selectCat = (catId: number) => {
    setActiveCatId(catId);
    setOpenIdx(null);
  };

  const toggleQ = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const currentCat = faqCategories.find((c) => c.id === activeCatId) ?? null;

  return (
    <>
      {/* ── Hero ── */}
      <section className="cnt-hero">
        <div className="cnt-hero__bg" />
        <div className="cnt-hero__overlay" />
        <div className="cnt-hero__content">
          <span className="cnt-hero__label">Contact</span>
          <h1 className="cnt-hero__heading">
            Get in touch with our <em>expert team</em>
          </h1>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="cnt-faq">
        <div className="cnt-faq__inner">
          <div className="cnt-faq__card">
            <div className="cnt-faq__card-bg" />
            <div className="cnt-faq__card-overlay" />
            <div className="cnt-faq__card-content">
              {/* Card header */}
              <div className="cnt-faq__card-top">
                <div className="cnt-faq__card-left">
                  <span className="abt-grad-pill">
                    <span className="abt-grad-pill__text">
                      <span className="abt-grad-text">FAQs</span>
                    </span>
                  </span>
                  <p className="cnt-faq__cat-desc">{currentCat?.title ?? ""}</p>
                </div>
              </div>
              <h2 className="cnt-faq__heading">
                Everything you need to know before importing vehicles
              </h2>
              <p className="cnt-faq__sub">
                Explore key information about our export services, including
                auctions, pricing, shipping, and documentation, designed to give
                you clarity and confidence at every step.
              </p>

              {faqLoading ? (
                <p className="cnt-faq__loading">Loading…</p>
              ) : faqCategories.length === 0 ? null : (
                /* Body: sidebar + panel */
                <div className="cnt-faq__body">
                  {/* Category sidebar */}
                  <div className="cnt-faq__sidebar">
                    {faqCategories.map((cat) => (
                      <button
                        key={cat.id}
                        className={`cnt-faq__tab${activeCatId === cat.id ? " cnt-faq__tab--active" : ""}`}
                        onClick={() => selectCat(cat.id)}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>

                  {/* Questions panel */}
                  <div className="cnt-faq__panel">
                    {currentCat?.items.map((item, idx) => {
                      const isOpen = openIdx === idx;
                      return (
                        <div
                          key={item.id}
                          className={`cnt-faq__item${isOpen ? " cnt-faq__item--open" : ""}`}
                        >
                          <button
                            className="cnt-faq__q"
                            onClick={() => toggleQ(idx)}
                          >
                            <span>{item.question}</span>
                            <span className="cnt-faq__chevron">
                              {isOpen ? "−" : "+"}
                            </span>
                          </button>
                          {isOpen && (
                            <p className="cnt-faq__a">{item.answer}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="cnt-faq__footer-note">
                Still have questions?{" "}
                <a href="#contact-form" className="cnt-faq__footer-link">
                  Send us an inquiry
                </a>{" "}
                and our team will get back to you.
              </p>
            </div>
            {/* /.cnt-faq__card-content */}
          </div>
          {/* /.cnt-faq__card */}
        </div>
        {/* /.cnt-faq__inner */}
      </section>

      {/* ── Contact Form ── */}
      <section className="cnt-section" id="contact-form">
        <div className="cnt-card">
          {/* Left: Form */}
          <div className="cnt-form-col">
            <span className="cnt-form__pill">Get In Touch</span>
            <h2 className="cnt-form__heading">
              Send your Inquiry, Our Team will Assist You.
            </h2>
            <p className="cnt-form__sub">
              Fill out the form with your requirements and our team will get
              back to you with the right guidance for your vehicle import needs.
            </p>
            <form className="cnt-form" onSubmit={(e) => e.preventDefault()}>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Full Name</label>
                <input
                  className="cnt-form__input"
                  type="text"
                  placeholder="Your Full Name"
                />
              </div>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Email Address</label>
                <input
                  className="cnt-form__input"
                  type="email"
                  placeholder="We'll get back to you here"
                />
              </div>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Country</label>
                <div className="cnt-form__select-wrap">
                  <select className="cnt-form__select">
                    <option value="">Enter your country</option>
                    <option>Sri Lanka</option>
                    <option>Australia</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Canada</option>
                    <option>New Zealand</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Inquiry Type</label>
                <div className="cnt-form__select-wrap">
                  <select className="cnt-form__select">
                    <option value="" disabled selected>
                      Select Inquiry Type
                    </option>
                    <option>Vehicle Import</option>
                    <option>Auction Inquiry</option>
                    <option>Shipping &amp; Pricing</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Message</label>
                <textarea
                  className="cnt-form__textarea"
                  rows={5}
                  placeholder="Tell Us How We Can Help"
                />
              </div>
              <button type="submit" className="cnt-form__submit">
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Map + Info */}
          <div className="cnt-map-col">
            <div className="cnt-map__frame-wrap">
              <iframe
                className="cnt-map__iframe"
                src="https://www.openstreetmap.org/export/embed.html?bbox=80.345%2C7.482%2C80.375%2C7.500&layer=mapnik&marker=7.4910%2C80.3600"
                allowFullScreen
                loading="lazy"
                title="JLR International Office Location"
              />
              <div className="cnt-map__overlay-card">
                <p className="cnt-map__overlay-title">Visit our Office</p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=No.154+Puttalam+Road%2C+Kurunegala+60000%2C+Sri+Lanka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cnt-map__direction-btn"
                >
                  Get a Direction →
                </a>
              </div>
            </div>
            <div className="cnt-info-grid">
              {CONTACT_INFO.map((info) => (
                <div key={info.label} className="cnt-info-item">
                  <info.Icon className="cnt-info-item__icon" />
                  <div>
                    <p className="cnt-info-item__label">{info.label}</p>
                    <p className="cnt-info-item__value">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
