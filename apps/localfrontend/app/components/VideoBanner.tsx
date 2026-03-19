import Image from "next/image";

export default function VideoBanner() {
  return (
    <section className="video-banner">
      <div className="video-banner__inner">
        <Image
          src="/videos/home-gif.gif"
          alt="JL Racing in action"
          fill
          unoptimized
          priority
          className="video-banner__bg-gif"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="video-banner__overlay" />

        {/* Stats row */}
        <div className="video-banner__stats">
          <div className="video-banner__stat">
            <span className="video-banner__stat-num">500+</span>
            <span className="video-banner__stat-label">Bikes Delivered</span>
          </div>
          <div className="video-banner__stat-divider" />
          <div className="video-banner__stat">
            <span className="video-banner__stat-num">10+</span>
            <span className="video-banner__stat-label">Years of Trust</span>
          </div>
          <div className="video-banner__stat-divider" />
          <div className="video-banner__stat">
            <span className="video-banner__stat-num">1000+</span>
            <span className="video-banner__stat-label">Happy Customers</span>
          </div>
          <div className="video-banner__stat-divider" />
          <div className="video-banner__stat">
            <span className="video-banner__stat-num">50+</span>
            <span className="video-banner__stat-label">Global Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
}
