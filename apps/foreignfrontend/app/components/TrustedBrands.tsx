import Image from "next/image";

type Brand = {
  name: string;
  src: string;
  scale: number;
  offsetY?: number;
};

const BRANDS: Brand[] = [
  { name: "Audi", src: "/trusted/audi.png", scale: 0.9 },
  { name: "BMW", src: "/trusted/bmw.webp", scale: 1.25 },
  { name: "Ducati", src: "/trusted/ducati.png", scale: 0.8 },
  { name: "Harley-Davidson", src: "/trusted/harley-davidson.png", scale: 1.5 },
  { name: "Honda", src: "/trusted/honda.png", scale: 0.95 },
  { name: "Kawasaki", src: "/trusted/kawasaki.png", scale: 1 },
  { name: "KTM", src: "/trusted/ktm.png", scale: 0.95 },
  { name: "Mazda", src: "/trusted/mazda.png", scale: 1.1 },
  { name: "Nissan", src: "/trusted/nissan.png", scale: 0.82 },
  { name: "Suzuki", src: "/trusted/suzuki.png", scale: 1.15 },
  { name: "Toyota", src: "/trusted/toyota.png", scale: 0.95, offsetY: 16 },
  { name: "Triumph", src: "/trusted/triumph.png", scale: 1 },
  { name: "Yamaha", src: "/trusted/yamaha.png", scale: 1 },
];

export default function TrustedBrands() {
  return (
    <section className="int-brands">
      {/* Background image */}
      <div className="int-brands__bg" />

      <div className="int-brands__container">
        {/* Pill label */}
        <span className="int-pill">
          <span className="int-pill__plain">Trusted</span>
          <span className="int-pill__gold">Brands</span>
        </span>

        {/* Heading */}
        <h2 className="int-brands__heading">
          We source and export vehicles from{" "}
          <em>leading global manufacturers.</em>
        </h2>

        {/* Scrolling track */}
        <div className="int-brands__track">
          <div className="int-brands__scroll">
            {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
              <div key={i} className="int-brands__card">
                <div className="int-brands__logo-wrap">
                  <Image
                    src={brand.src}
                    alt={brand.name}
                    width={280}
                    height={260}
                    quality={100}
                    className="int-brands__logo"
                    style={{
                      transform: `translateY(${brand.offsetY ?? 0}px) scale(${brand.scale})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
