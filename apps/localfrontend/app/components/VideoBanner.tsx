"use client";

import { useEffect, useState } from "react";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface VideoBannerData {
  id: number;
  videoUrl: string;
}

export default function VideoBanner() {
  const [activeVideo, setActiveVideo] = useState<VideoBannerData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    fetch(`${CMS_API_URL}/api/video-banner/active?site=LOCAL`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.videoUrl) {
          setActiveVideo(data);
        }
      })
      .catch(() => {
        // Silent fail - will show bg
      })
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section className="video-banner">
      {loaded && activeVideo && !videoError ? (
        <video
          key={activeVideo.id}
          className="video-banner__video"
          src={`${CMS_API_URL}${activeVideo.videoUrl}`}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
        />
      ) : (
        <div className="video-banner__bg" />
      )}
      <div className="video-banner__overlay" />
    </section>
  );
}
