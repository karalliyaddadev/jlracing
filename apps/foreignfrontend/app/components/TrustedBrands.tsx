import Image from "next/image";

const BRANDS = [
  { name: "Toyota", src: "/trusted-brands/Toyota.png" },
  { name: "Honda", src: "/trusted-brands/Honda.png" },
  { name: "Nissan", src: "/trusted-brands/Nissan.png" },
  { name: "Mazda", src: "/trusted-brands/Mazda.png" },
  { name: "Mitsubishi", src: "/trusted-brands/Mitsubishi.png" },
  { name: "Subaru", src: "/trusted-brands/Subaru.png" },
  { name: "Suzuki", src: "/trusted-brands/Suzuki.png" },
  { name: "Lexus", src: "/trusted-brands/Lexus.png" },
  { name: "Infiniti", src: "/trusted-brands/Infinit.png" },
  { name: "Acura", src: "/trusted-brands/Acura.png" },
  { name: "Daihatsu", src: "/trusted-brands/Daihatsu.png" },
  { name: "Hino", src: "/trusted-brands/Hino.png" },
  { name: "Mitsuoka", src: "/trusted-brands/Mitsuoka.png" },
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
                    width={80}
                    height={60}
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
