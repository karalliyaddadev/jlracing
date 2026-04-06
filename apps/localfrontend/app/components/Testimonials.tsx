interface Testimonial {
  id: number;
  name: string;
  image: string;
  text: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Oshan Wasala",
    image: "/testimonials/5.PNG",
    text: "The ultimate spot in Sri Lanka to fulfill your Japanese bike dreams. JL Racing offers excellent services and support. Truly professional and reliable. Highly recommended for all bike enthusiasts!",
  },
  {
    id: 2,
    name: "Munchuthan Kunasingam",
    image: "/testimonials/6.PNG",
    text: "JL Racing is the best place in Sri Lanka to purchase bikes. Their service is excellent, the process is smooth, and they make buying your dream bike an easy experience.",
  },
  {
    id: 3,
    name: "Hemal Rishitha",
    image: "/testimonials/1.PNG",
    text: "I wanted a Kawasaki Ninja H2R, and JL Racing made it happen! They managed the order flawlessly and handled the delivery with care. Truly professional and highly recommended for bike enthusiasts.",
  },
  {
    id: 4,
    name: "Johnny's Channel",
    image: "/testimonials/3.PNG",
    text: "I wanted a Honda Super Cub for relaxed city rides, and JL Racing had it in stock at the best price. Their service was excellent. I highly recommend it for leisure riders!",
  },
  {
    id: 5,
    name: "Janith Liyanage",
    image: "/testimonials/2.PNG",
    text: "I've been a JL Racing customer for years, and I keep coming back. Their bikes, service, and support are always excellent. Reliable, professional, and highly recommended time and time again!",
  },
  {
    id: 6,
    name: "Ranmal Godakumbura",
    image: "/testimonials/4.PNG",
    text: "I've purchased multiple bikes from JL Racing, and each experience has been flawless. Their stock, pricing, and service are unmatched. I keep choosing them because they truly deliver every time!",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__container">
        <div className="testimonials__header">
          <span className="testimonials__label">TESTIMONIALS</span>
          <h2 className="testimonials__title">What Our Customers Say</h2>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-card__quote">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.057 3.374-9.435 8-10.609v3c-2.869.818-5 3.42-5 6.609h3v8.391h-6zm-12 0v-7.391c0-5.057 3.374-9.435 8-10.609v3c-2.869.818-5 3.42-5 6.609h3v8.391h-6z" />
                </svg>
              </div>
              <p className="testimonial-card__text">{t.text}</p>
              <div className="testimonial-card__divider" />
              <div className="testimonial-card__author">
                <img
                  src={t.image}
                  alt={t.name}
                  className="testimonial-card__avatar"
                />
                <span className="testimonial-card__name">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
