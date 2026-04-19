"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface VideoBannerData {
  id: number;
  videoUrl: string;
}

export default function VideoBanner() {
  const [activeVideo, setActiveVideo] = useState<VideoBannerData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${CMS_API_URL}/api/video-banner/active?site=LOCAL`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.videoUrl) setActiveVideo(data);
      })
      .catch(() => {
        /* fall back to static GIF */
      })
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section className="video-banner">
      <div className="video-banner__inner">
        {/* Background: CMS video or fallback GIF */}
        {!loaded ? null : activeVideo ? (
          <video
            key={activeVideo.videoUrl}
            className="video-banner__bg-gif"
            src={`${CMS_API_URL}${activeVideo.videoUrl}`}
            autoPlay
            muted
            loop
            playsInline
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        ) : (
          <Image
            src="/videos/home-gif.gif"
            alt="JL Racing in action"
            fill
            unoptimized
            priority
            className="video-banner__bg-gif"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        )}
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
