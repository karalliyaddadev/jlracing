import Image from "next/image";

const BRANDS = [
  { name: "Audi", src: "/trusted/audi.png" },
  { name: "BMW", src: "/trusted/bmw.webp" },
  { name: "Ducati", src: "/trusted/ducati.png" },
  { name: "Harley-Davidson", src: "/trusted/harley-davidson.png" },
  { name: "Honda", src: "/trusted/honda.png" },
  { name: "Kawasaki", src: "/trusted/kawasaki.png" },
  { name: "KTM", src: "/trusted/ktm.png" },
  { name: "Mazda", src: "/trusted/mazda.png" },
  { name: "Nissan", src: "/trusted/nissan.png" },
  { name: "Suzuki", src: "/trusted/suzuki.png" },
  { name: "Toyota", src: "/trusted/toyota.png" },
  { name: "Triumph", src: "/trusted/triumph.png" },
  { name: "Yamaha", src: "/trusted/yamaha.png" },
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
