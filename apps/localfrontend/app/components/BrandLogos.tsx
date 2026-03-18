import Image from "next/image";

const brands = [
  { name: "Kawasaki", src: "/trusted/kawasaki.png" },
  { name: "Yamaha", src: "/trusted/yamaha.png" },
  { name: "Honda", src: "/trusted/honda.png" },
  { name: "Suzuki", src: "/trusted/suzuki.png" },
  { name: "Ducati", src: "/trusted/ducati.png" },
  { name: "BMW", src: "/trusted/bmw.png" },
  { name: "KTM", src: "/trusted/ktm.png" },
  { name: "Triumph", src: "/trusted/triumph.png" },
];

export default function BrandLogos() {
  return (
    <section className="brands">
      <div className="brands__container">
        <span className="brands__label">TRUSTED BRANDS WE CARRY</span>
        <div className="brands__track">
          <div className="brands__scroll">
            {[...brands, ...brands].map((brand, i) => (
              <div key={i} className="brands__item">
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={120}
                  height={56}
                  className="brands__logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
