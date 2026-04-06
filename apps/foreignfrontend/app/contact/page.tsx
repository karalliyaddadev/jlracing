"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";

const FAQ_CATEGORIES = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        q: "How do I start importing a vehicle?",
        a: "You can start by contacting our team or selecting a vehicle. We guide you through sourcing, pricing, payment, and shipping.",
      },
      {
        q: "Do I need prior experience to import vehicles?",
        a: "No, our team assists beginners and experienced importers, ensuring a smooth and guided process from start to delivery.",
      },
      {
        q: "Can I import to any country?",
        a: "Yes, we support global exports, but import regulations vary by country. We guide you based on your location.",
      },
      {
        q: "Do I need to register before placing an inquiry?",
        a: "No registration is required. You can directly contact us with your requirements through the inquiry form.",
      },
      {
        q: "Can I request a specific vehicle model?",
        a: "Yes, you can share your requirements, and we will source suitable vehicles from Japanese auctions.",
      },
    ],
  },
  {
    id: "auctions",
    title: "Auctions & Vehicles",
    items: [
      {
        q: "How do Japanese vehicle auctions work?",
        a: "Vehicles are listed with inspection reports and grades. We bid on your behalf to secure the best possible deal.",
      },
      {
        q: "Are all vehicles inspected before purchase?",
        a: "Yes, auction houses provide detailed inspection reports, including condition grades and remarks for transparency.",
      },
      {
        q: "Can I see vehicle details before bidding?",
        a: "Yes, we provide auction sheets, images, and condition details before you confirm any purchase.",
      },
      {
        q: "What types of vehicles do you export?",
        a: "We export cars, motorcycles, and heavy machinery based on your requirements and market availability.",
      },
      {
        q: "Are vehicles verified and authentic?",
        a: "Yes, all vehicles are sourced from licensed auctions, ensuring authenticity and accurate documentation.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Payments",
    items: [
      {
        q: "What payment methods do you accept?",
        a: "We accept TT (Telegraphic Transfer) and LC (Letter of Credit) for secure international transactions.",
      },
      {
        q: "What does the total price include?",
        a: "The total price includes auction cost, commission, shipping, and documentation fees, depending on the shipment type.",
      },
      {
        q: "Are there any hidden charges?",
        a: "No, we provide a transparent cost breakdown before confirming your purchase to avoid surprises.",
      },
      {
        q: "What is the difference between TT and LC?",
        a: "TT is a direct bank transfer, while LC is a bank-backed payment method offering additional security.",
      },
      {
        q: "When do I need to make payment?",
        a: "Payment is required after confirming the vehicle, based on agreed terms and payment method.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    items: [
      {
        q: "What is the difference between FOB and CIF?",
        a: "FOB covers delivery to the Japanese port, while CIF includes shipping and insurance to your destination port.",
      },
      {
        q: "What shipping methods do you offer?",
        a: "We offer RoRo and container shipping options depending on the vehicle type and customer preference.",
      },
      {
        q: "How long does delivery take?",
        a: "Shipping timelines vary by destination but typically range from a few weeks to over a month.",
      },
      {
        q: "Can I track my vehicle during shipping?",
        a: "Yes, we provide tracking updates so you can monitor your shipment throughout the journey.",
      },
      {
        q: "Is my vehicle insured during shipping?",
        a: "Yes, insurance is included in CIF shipments, while FOB shipments can be insured upon request.",
      },
    ],
  },
  {
    id: "documentation",
    title: "Documentation & Support",
    items: [
      {
        q: "What documents will I receive?",
        a: "You will receive export certificates, Bill of Lading, commercial invoice, and other required documents.",
      },
      {
        q: "Do you assist with customs clearance?",
        a: "Yes, we guide you through the customs clearance process in your country.",
      },
      {
        q: "What happens after my vehicle arrives?",
        a: "You will complete customs clearance and registration based on your country's regulations.",
      },
      {
        q: "Do you provide support after delivery?",
        a: "Yes, we assist with documentation issues and any post-shipment inquiries.",
      },
      {
        q: "Can you help with missing or delayed documents?",
        a: "Yes, our team ensures all documents are handled properly and supports you if any issues arise.",
      },
    ],
  },
];

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
  const [activeCat, setActiveCat] = useState<string>(FAQ_CATEGORIES[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const selectCat = (catId: string) => {
    setActiveCat(catId);
    setOpenIdx(null);
  };

  const toggleQ = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const currentCat = FAQ_CATEGORIES.find((c) => c.id === activeCat)!;

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
                  <p className="cnt-faq__cat-desc">{currentCat.title}</p>
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

              {/* Body: sidebar + panel */}
              <div className="cnt-faq__body">
                {/* Category sidebar */}
                <div className="cnt-faq__sidebar">
                  {FAQ_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      className={`cnt-faq__tab${activeCat === cat.id ? " cnt-faq__tab--active" : ""}`}
                      onClick={() => selectCat(cat.id)}
                    >
                      {cat.title}
                    </button>
                  ))}
                </div>

                {/* Questions panel */}
                <div className="cnt-faq__panel">
                  {currentCat.items.map((item, idx) => {
                    const isOpen = openIdx === idx;
                    return (
                      <div
                        key={idx}
                        className={`cnt-faq__item${isOpen ? " cnt-faq__item--open" : ""}`}
                      >
                        <button
                          className="cnt-faq__q"
                          onClick={() => toggleQ(idx)}
                        >
                          <span>{item.q}</span>
                          <span className="cnt-faq__chevron">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && <p className="cnt-faq__a">{item.a}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

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
