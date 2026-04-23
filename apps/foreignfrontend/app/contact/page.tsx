"use client";

import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formCountry, setFormCountry] = useState("");
  const [formInquiry, setFormInquiry] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

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
          city: formCountry || undefined,
          interests: formInquiry || undefined,
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
      setFormCountry("");
      setFormInquiry("");
      setFormMessage("");
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
            {formSuccess && (
              <p className="cnt-form__success">
                Thank you! Your message has been sent. We&apos;ll get back to
                you soon.
              </p>
            )}
            {formError && (
              <p className="cnt-form__error">{formError}</p>
            )}
            <form className="cnt-form" onSubmit={handleSubmit}>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Full Name</label>
                <input
                  className="cnt-form__input"
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Email Address</label>
                <input
                  className="cnt-form__input"
                  type="email"
                  placeholder="We'll get back to you here"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Country</label>
                <div className="cnt-form__select-wrap">
                  <select
                    className="cnt-form__select"
                    value={formCountry}
                    onChange={(e) => setFormCountry(e.target.value)}
                  >
                    <option value="">Select your country</option>
                    <option>Afghanistan</option>
                    <option>Albania</option>
                    <option>Algeria</option>
                    <option>Andorra</option>
                    <option>Angola</option>
                    <option>Antigua and Barbuda</option>
                    <option>Argentina</option>
                    <option>Armenia</option>
                    <option>Australia</option>
                    <option>Austria</option>
                    <option>Azerbaijan</option>
                    <option>Bahamas</option>
                    <option>Bahrain</option>
                    <option>Bangladesh</option>
                    <option>Barbados</option>
                    <option>Belarus</option>
                    <option>Belgium</option>
                    <option>Belize</option>
                    <option>Benin</option>
                    <option>Bhutan</option>
                    <option>Bolivia</option>
                    <option>Bosnia and Herzegovina</option>
                    <option>Botswana</option>
                    <option>Brazil</option>
                    <option>Brunei</option>
                    <option>Bulgaria</option>
                    <option>Burkina Faso</option>
                    <option>Burundi</option>
                    <option>Cabo Verde</option>
                    <option>Cambodia</option>
                    <option>Cameroon</option>
                    <option>Canada</option>
                    <option>Central African Republic</option>
                    <option>Chad</option>
                    <option>Chile</option>
                    <option>China</option>
                    <option>Colombia</option>
                    <option>Comoros</option>
                    <option>Congo (Democratic Republic)</option>
                    <option>Congo (Republic)</option>
                    <option>Costa Rica</option>
                    <option>Croatia</option>
                    <option>Cuba</option>
                    <option>Cyprus</option>
                    <option>Czech Republic</option>
                    <option>Denmark</option>
                    <option>Djibouti</option>
                    <option>Dominica</option>
                    <option>Dominican Republic</option>
                    <option>Ecuador</option>
                    <option>Egypt</option>
                    <option>El Salvador</option>
                    <option>Equatorial Guinea</option>
                    <option>Eritrea</option>
                    <option>Estonia</option>
                    <option>Eswatini</option>
                    <option>Ethiopia</option>
                    <option>Fiji</option>
                    <option>Finland</option>
                    <option>France</option>
                    <option>Gabon</option>
                    <option>Gambia</option>
                    <option>Georgia</option>
                    <option>Germany</option>
                    <option>Ghana</option>
                    <option>Greece</option>
                    <option>Grenada</option>
                    <option>Guatemala</option>
                    <option>Guinea</option>
                    <option>Guinea-Bissau</option>
                    <option>Guyana</option>
                    <option>Haiti</option>
                    <option>Honduras</option>
                    <option>Hungary</option>
                    <option>Iceland</option>
                    <option>India</option>
                    <option>Indonesia</option>
                    <option>Iran</option>
                    <option>Iraq</option>
                    <option>Ireland</option>
                    <option>Israel</option>
                    <option>Italy</option>
                    <option>Jamaica</option>
                    <option>Japan</option>
                    <option>Jordan</option>
                    <option>Kazakhstan</option>
                    <option>Kenya</option>
                    <option>Kiribati</option>
                    <option>Kuwait</option>
                    <option>Kyrgyzstan</option>
                    <option>Laos</option>
                    <option>Latvia</option>
                    <option>Lebanon</option>
                    <option>Lesotho</option>
                    <option>Liberia</option>
                    <option>Libya</option>
                    <option>Liechtenstein</option>
                    <option>Lithuania</option>
                    <option>Luxembourg</option>
                    <option>Madagascar</option>
                    <option>Malawi</option>
                    <option>Malaysia</option>
                    <option>Maldives</option>
                    <option>Mali</option>
                    <option>Malta</option>
                    <option>Marshall Islands</option>
                    <option>Mauritania</option>
                    <option>Mauritius</option>
                    <option>Mexico</option>
                    <option>Micronesia</option>
                    <option>Moldova</option>
                    <option>Monaco</option>
                    <option>Mongolia</option>
                    <option>Montenegro</option>
                    <option>Morocco</option>
                    <option>Mozambique</option>
                    <option>Myanmar</option>
                    <option>Namibia</option>
                    <option>Nauru</option>
                    <option>Nepal</option>
                    <option>Netherlands</option>
                    <option>New Zealand</option>
                    <option>Nicaragua</option>
                    <option>Niger</option>
                    <option>Nigeria</option>
                    <option>North Korea</option>
                    <option>North Macedonia</option>
                    <option>Norway</option>
                    <option>Oman</option>
                    <option>Pakistan</option>
                    <option>Palau</option>
                    <option>Panama</option>
                    <option>Papua New Guinea</option>
                    <option>Paraguay</option>
                    <option>Peru</option>
                    <option>Philippines</option>
                    <option>Poland</option>
                    <option>Portugal</option>
                    <option>Qatar</option>
                    <option>Romania</option>
                    <option>Russia</option>
                    <option>Rwanda</option>
                    <option>Saint Kitts and Nevis</option>
                    <option>Saint Lucia</option>
                    <option>Saint Vincent and the Grenadines</option>
                    <option>Samoa</option>
                    <option>San Marino</option>
                    <option>Sao Tome and Principe</option>
                    <option>Saudi Arabia</option>
                    <option>Senegal</option>
                    <option>Serbia</option>
                    <option>Seychelles</option>
                    <option>Sierra Leone</option>
                    <option>Singapore</option>
                    <option>Slovakia</option>
                    <option>Slovenia</option>
                    <option>Solomon Islands</option>
                    <option>Somalia</option>
                    <option>South Africa</option>
                    <option>South Korea</option>
                    <option>South Sudan</option>
                    <option>Spain</option>
                    <option>Sri Lanka</option>
                    <option>Sudan</option>
                    <option>Suriname</option>
                    <option>Sweden</option>
                    <option>Switzerland</option>
                    <option>Syria</option>
                    <option>Taiwan</option>
                    <option>Tajikistan</option>
                    <option>Tanzania</option>
                    <option>Thailand</option>
                    <option>Timor-Leste</option>
                    <option>Togo</option>
                    <option>Tonga</option>
                    <option>Trinidad and Tobago</option>
                    <option>Tunisia</option>
                    <option>Turkey</option>
                    <option>Turkmenistan</option>
                    <option>Tuvalu</option>
                    <option>Uganda</option>
                    <option>Ukraine</option>
                    <option>United Arab Emirates</option>
                    <option>United Kingdom</option>
                    <option>United States</option>
                    <option>Uruguay</option>
                    <option>Uzbekistan</option>
                    <option>Vanuatu</option>
                    <option>Vatican City</option>
                    <option>Venezuela</option>
                    <option>Vietnam</option>
                    <option>Yemen</option>
                    <option>Zambia</option>
                    <option>Zimbabwe</option>
                  </select>
                </div>
              </div>
              <div className="cnt-form__field">
                <label className="cnt-form__label">Inquiry Type</label>
                <div className="cnt-form__select-wrap">
                  <select
                    className="cnt-form__select"
                    value={formInquiry}
                    onChange={(e) => setFormInquiry(e.target.value)}
                  >
                    <option value="" disabled>
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
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="cnt-form__submit"
                disabled={formSubmitting}
              >
                {formSubmitting ? "Sending…" : "Send Message"}
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
