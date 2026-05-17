"use client";

import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
}

interface FaqCategory {
  id: number;
  title: string;
  order: number;
  isActive: boolean;
  items: FaqItem[];
}

export default function ContactPage() {
  const [interest, setInterest] = useState<string[]>([]);
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [activeFaqTab, setActiveFaqTab] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch(`${CMS_API_URL}/api/faq/active?site=LOCAL`)
      .then((r) => (r.ok ? r.json() : []))
      .then((data: FaqCategory[]) => {
        setFaqCategories(data);
        if (data.length > 0) setActiveFaqTab(data[0].id);
      })
      .catch(() => setFaqCategories([]))
      .finally(() => setFaqLoading(false));
  }, []);

  const currentCat = faqCategories.find((c) => c.id === activeFaqTab) ?? null;

  const toggleInterest = (item: string) => {
    setInterest((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/contact-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone || undefined,
          city: formCity || undefined,
          interests: interest.join(", "),
          message: formMessage || undefined,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(
          (json as { message?: string }).message || "Submission failed",
        );
      }
      setFormSuccess(true);
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormCity("");
      setFormMessage("");
      setInterest([]);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Hero Banner ── */}
      <section className="contact-hero">
        <div className="contact-hero__overlay" />
        <div className="contact-hero__content">
          <span className="contact-hero__label">Contact</span>
          <h1 className="contact-hero__title">
            Get in touch with <em>our team</em>
            <br />
            and find the machine you deserve.
          </h1>
        </div>
      </section>

      {/* ── Contact Body ── */}
      <section className="contact-body">
        <div className="contact-body__container">
          {/* ── Left: Info Panel ── */}
          <FadeIn className="contact-info" direction="left">
            <h2 className="contact-info__title">
              Let&apos;s Get Down to Business
            </h2>
            <p className="contact-info__desc">
              Got the unstoppable desire to ride the perfect bike? Tell us what
              you want, and we will help you find the machine you deserve.
            </p>

            <div className="contact-info__items">
              {/* Hotline */}
              <div className="contact-info__item">
                <svg
                  className="contact-info__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <div>
                  <strong>Hotline</strong>
                  <span>0372 228 220</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-info__item">
                <svg
                  className="contact-info__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <strong>WhatsApp</strong>
                  <span>+94 71 791 0091</span>
                </div>
              </div>

              {/* Visit Us */}
              <div className="contact-info__item">
                <svg
                  className="contact-info__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <strong>Visit Us</strong>
                  <span>No. 154, Puttalam Rd, Kurunegala</span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="contact-info__item">
                <svg
                  className="contact-info__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <div>
                  <strong>Business Hours</strong>
                  <span>Monday-Saturday: 08:30am- 06:00pm</span>
                </div>
              </div>

              {/* Email */}
              <div className="contact-info__item">
                <svg
                  className="contact-info__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div>
                  <strong>Email</strong>
                  <span>info@jlracingshop.com</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="contact-info__social">
              <a
                href="https://www.facebook.com/jlracingshop/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/jlracingshop/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@jlracing16"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </FadeIn>

          {/* ── Right: Contact Form ── */}
          <FadeIn className="contact-form" direction="right">
            <h2 className="contact-form__title">Send Us a Message</h2>
            <p className="contact-form__desc">
              Fill the form below and our team will contact you soon.
            </p>

            {formSuccess ? (
              <div className="contact-form__success">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
                <h3>Message Sent!</h3>
                <p>Thank you! Our team will get back to you shortly.</p>
                <button
                  className="contact-form__submit"
                  onClick={() => setFormSuccess(false)}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label className="contact-form__label">Full Name*</label>
                    <input
                      type="text"
                      className="contact-form__input"
                      placeholder="Enter Full Name"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">Email*</label>
                    <input
                      type="email"
                      className="contact-form__input"
                      placeholder="Enter Email Address"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="contact-form__row">
                  <div className="contact-form__group">
                    <label className="contact-form__label">Phone</label>
                    <input
                      type="tel"
                      className="contact-form__input"
                      placeholder="Enter mobile number"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                    />
                  </div>
                  <div className="contact-form__group">
                    <label className="contact-form__label">City</label>
                    <input
                      type="text"
                      className="contact-form__input"
                      placeholder="Enter your city"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                    />
                  </div>
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label">
                    What are you looking for?
                  </label>
                  <div className="contact-form__chips">
                    {["Bikes", "Spare Parts", "Pre Orders"].map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`contact-form__chip ${
                          interest.includes(item)
                            ? "contact-form__chip--active"
                            : ""
                        }`}
                        onClick={() => toggleInterest(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact-form__group">
                  <label className="contact-form__label">More Info</label>
                  <textarea
                    className="contact-form__textarea"
                    rows={5}
                    placeholder="Tell us more about your requirement"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                  />
                </div>

                {formError && (
                  <p className="contact-form__error">{formError}</p>
                )}

                <button
                  type="submit"
                  className="contact-form__submit"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? "Sending…" : "Submit"}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="contact-faq">
        <div className="contact-faq__inner">
          <FadeIn className="contact-faq__header">
            <span className="contact-faq__label">FAQ</span>
            <h2 className="contact-faq__title">Frequently Asked Questions</h2>
            <p className="contact-faq__subtitle">
              Find quick answers to the most common questions about our bikes,
              spare parts, pre-orders, pricing, and delivery.
            </p>
          </FadeIn>

          {faqLoading ? (
            <div className="contact-faq__loading">Loading…</div>
          ) : faqCategories.length === 0 ? null : (
            <>
              <div className="contact-faq__tabs">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`contact-faq__tab ${activeFaqTab === cat.id ? "contact-faq__tab--active" : ""}`}
                    onClick={() => {
                      setActiveFaqTab(cat.id);
                      setOpenFaqIndex(null);
                    }}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              <div className="contact-faq__list">
                {currentCat?.items.slice(0, 6).map((item, idx) => (
                  <div
                    key={item.id}
                    className={`contact-faq__item ${openFaqIndex === idx ? "contact-faq__item--open" : ""}`}
                  >
                    <button
                      className="contact-faq__question"
                      onClick={() =>
                        setOpenFaqIndex(openFaqIndex === idx ? null : idx)
                      }
                    >
                      <span>{item.question}</span>
                      <svg
                        className="contact-faq__chevron"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {openFaqIndex === idx && (
                      <div className="contact-faq__answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="contact-map">
        <FadeIn>
          <h2 className="contact-map__title">Visit Our Showroom</h2>
          <p className="contact-map__subtitle">
            No.154 Katugastota – Kurunegala – Puttalam Hwy, Kurunegala 60000
          </p>
        </FadeIn>
        <div className="contact-map__embed">
          <iframe
            title="JL Racing Location"
            src="https://maps.google.com/maps?q=JL+Racing+No+154+Katugastota+Kurunegala+Puttalam+Highway+Kurunegala+60000+Sri+Lanka&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <FadeIn className="contact-map__cta">
          <a
            href="https://www.google.com/maps/search/JL+Racing+No.154+Katugastota+Kurunegala+Puttalam+Highway+Kurunegala+60000+Sri+Lanka"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-map__visit-btn"
          >
            Visit Us on Google Maps
          </a>
        </FadeIn>
      </section>
    </>
  );
}
