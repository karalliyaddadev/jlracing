"use client";

import { useState } from "react";

export default function ContactPage() {
  const [interest, setInterest] = useState<string[]>([]);

  const toggleInterest = (item: string) => {
    setInterest((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
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
          <div className="contact-info">
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
              <a href="#" aria-label="Facebook">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="contact-form">
            <h2 className="contact-form__title">Send Us a Message</h2>
            <p className="contact-form__desc">
              Fill the form below and our team will contact you soon.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label className="contact-form__label">Full Name*</label>
                  <input
                    type="text"
                    className="contact-form__input"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label className="contact-form__label">Email*</label>
                  <input
                    type="email"
                    className="contact-form__input"
                    placeholder="Enter Email Address"
                    required
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
                  />
                </div>
                <div className="contact-form__group">
                  <label className="contact-form__label">City</label>
                  <input
                    type="text"
                    className="contact-form__input"
                    placeholder="Enter your city"
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
                />
              </div>

              <button type="submit" className="contact-form__submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="contact-map">
        <h2 className="contact-map__title">Visit Our Showroom</h2>
        <p className="contact-map__subtitle">
          Find our location easily using the map below.
        </p>
        <div className="contact-map__embed">
          <iframe
            title="JL Racing Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.0!2d80.3621!3d7.4867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMjknMTIuMSJOIDgwwrAyMSc0My42IkU!5e0!3m2!1sen!2slk!4v1"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
