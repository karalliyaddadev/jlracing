"use client";

import { useEffect, useState } from "react";

const CMS_API_URL =
  process.env.NEXT_PUBLIC_CMS_API_URL || "http://localhost:5001";

interface VideoBannerData {
  id: number;
  videoUrl: string;
}

export default function IntlVideoBanner() {
  const [activeVideo, setActiveVideo] = useState<VideoBannerData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${CMS_API_URL}/api/video-banner/active?site=FOREIGN`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.videoUrl) setActiveVideo(data);
      })
      .catch(() => {
        /* no video uploaded yet */
      })
      .finally(() => setLoaded(true));
  }, []);

  return (
    <section className="int-video">
      {loaded && activeVideo ? (
        <video
          key={activeVideo.videoUrl}
          className="int-video__video"
          src={`${CMS_API_URL}${activeVideo.videoUrl}`}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="int-video__bg" />
      )}
    </section>
  );
}
