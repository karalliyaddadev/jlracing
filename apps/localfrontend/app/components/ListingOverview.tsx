import Link from "next/link";

interface ListingItem {
  id: number;
  image: string;
  category: string;
  title: string;
  price: string;
  isNew: boolean;
}

const LISTINGS: ListingItem[] = [
  {
    id: 1,
    image: "/images/listing-1.jpg",
    category: "Sport",
    title: "Kawasaki Ninja ZX-10R | 998cc | ABS | Quick Shifter",
    price: "Rs. 4,850,000.00",
    isNew: true,
  },
  {
    id: 2,
    image: "/images/listing-2.jpg",
    category: "Naked",
    title: "Yamaha MT-09 | 890cc | Crossplane Triple",
    price: "Rs. 3,250,000.00",
    isNew: true,
  },
  {
    id: 3,
    image: "/images/listing-3.jpg",
    category: "Sport",
    title: "Honda CBR 600RR | 599cc | Inline-4 | Track Ready",
    price: "Rs. 3,950,000.00",
    isNew: false,
  },
  {
    id: 4,
    image: "/images/listing-4.jpg",
    category: "Adventure",
    title: "BMW R 1250 GS | Adventure | Shaft Drive",
    price: "Rs. 6,500,000.00",
    isNew: true,
  },
];

export default function ListingOverview() {
  return (
    <section className="listing-overview">
      <div className="listing-overview__container">
        <div className="listing-overview__header">
          <div>
            <span className="listing-overview__label">NEW ARRIVALS</span>
            <h2 className="listing-overview__title">Latest In-House Stock</h2>
            <p className="listing-overview__subtitle">
              Newly landed motorcycles in our showroom. Be the first to get
              yours!
            </p>
          </div>
          <Link href="/listings" className="listing-overview__viewall">
            View All
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="listing-overview__grid">
          {LISTINGS.map((item) => (
            <Link href="/listings" key={item.id} className="product-card">
              {/* Ribbon */}
              {item.isNew && (
                <div className="product-card__ribbon">
                  <span>
                    New
                    <br />
                    Arrival
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="product-card__image">
                <div
                  className="product-card__image-bg"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>

              {/* Info */}
              <div className="product-card__info">
                {/* Category Badge */}
                <div className="product-card__category">
                  <span>{item.category}</span>
                </div>
                <h3 className="product-card__title">{item.title}</h3>
                <div className="product-card__footer">
                  <span className="product-card__price">{item.price}</span>
                  <button
                    className="product-card__cart"
                    aria-label="View details"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
