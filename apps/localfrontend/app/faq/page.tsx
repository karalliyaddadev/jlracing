"use client";

import { useState, useEffect } from "react";
import FadeIn from "../components/FadeIn";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

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

export default function FaqPage() {
  const [faqCategories, setFaqCategories] = useState<FaqCategory[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [activeFaqTab, setActiveFaqTab] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  return (
    <>
      {/* ── Hero ── */}
      <section className="faq-hero">
        <div className="faq-hero__overlay" />
        <div className="faq-hero__content">
          <span className="faq-hero__label">FAQ</span>
          <h1 className="faq-hero__title">
            Frequently Asked <em>Questions</em>
          </h1>
        </div>
      </section>

      {/* ── FAQ Body ── */}
      <section className="contact-faq">
        <div className="contact-faq__inner">
          <FadeIn className="contact-faq__header">
            <span className="contact-faq__label">FAQ</span>
            <h2 className="contact-faq__title">Everything You Need to Know</h2>
            <p className="contact-faq__subtitle">
              Quick answers to common questions about our bikes, spare parts,
              pre-orders, pricing, and delivery.
            </p>
          </FadeIn>

          {faqLoading ? (
            <div className="contact-faq__loading">Loading…</div>
          ) : faqCategories.length === 0 ? (
            <div className="contact-faq__loading">No FAQs available yet.</div>
          ) : (
            <>
              <div className="contact-faq__tabs">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    className={`contact-faq__tab${activeFaqTab === cat.id ? " contact-faq__tab--active" : ""}`}
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
                {currentCat?.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`contact-faq__item${openFaqIndex === idx ? " contact-faq__item--open" : ""}`}
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
    </>
  );
}
