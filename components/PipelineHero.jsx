"use client";
import { useEffect, useRef, useState } from "react";
import "./pipehero.css";

const REQ = "b9bb555ab4913dfeaafb409555e8f543f5180fc6";
const MODEL = [
  { id: REQ, req: true },
  { id: "33cba4af76e34815045858012339962c7551c4a9", hit: true },
  { id: "0e8e74c1195c1003910cf1e134acb00cd9635add" },
  { id: "5022976ca7f1320a53d167978c0f2debf0522fce", hit: true },
  { id: "3e179fb7b8fc71128c9d78c3d86b16ed95373a1d" },
  { id: "9299b2aebee7fcd6f619932d56adea4c6c9e7a21" },
];
const DOCS = ["sources/01_github_rick_roll.webp", "sources/09_reddit_askreddit.webp", "sources/04_upjoke.webp"];

function Arrow() {
  return (
    <svg className="ph-arrow" viewBox="0 0 24 12" aria-hidden="true">
      <path d="M1 6h20M16 1.5 21 6l-5 4.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PipelineHero() {
  const root = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const replay = () => {
    setOn(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
  };

  return (
    <div ref={root} className={on ? "ph on" : "ph"}>
      <div className="ph-row">
        <div className="ph-step ph-req">
          <div className="ph-h">Request</div>
          <img src={`covers/${REQ}.jpg`} alt="" width="44" height="44" />
          <p>“Stop reproducing <i>Never Gonna Give You Up</i>.”</p>
        </div>
        <Arrow />
        <div className="ph-step ph-cur">
          <div className="ph-h">Curation</div>
          <p>Which training text is this song?</p>
          <div className="ph-search">
            {DOCS.map((d, i) => <img key={d} src={d} alt="" style={{ "--i": i }} />)}
          </div>
        </div>
        <Arrow />
        <div className="ph-step ph-fs">
          <div className="ph-h">Forget set</div>
          <div className="ph-stack">
            {DOCS.map((d, i) => <img key={d} src={d} alt="" style={{ "--i": i }} />)}
          </div>
        </div>
        <Arrow />
        <div className="ph-step ph-ul">
          <div className="ph-h">Unlearning</div>
          <p>SimNPO, UNDIAL or RMU</p>
          <div className="ph-bar"><span /></div>
        </div>
        <Arrow />
        <div className="ph-step ph-model">
          <div className="ph-h">Model</div>
          <div className="ph-grid">
            {MODEL.map((m, i) => (
              <span key={m.id} className={m.req ? "c req" : m.hit ? "c hit" : "c"} style={{ "--i": i }}>
                <img src={`covers/${m.id}.jpg`} alt="" />
              </span>
            ))}
          </div>
        </div>
        <div className="ph-skip">
          <span>Existing benchmarks skip this part</span>
        </div>
      </div>
      <div className="ph-foot">
        <span className="ph-key"><i className="k req" />requested song</span>
        <span className="ph-key"><i className="k gone" />can no longer be reproduced</span>
        <button type="button" onClick={replay}>Replay</button>
      </div>
    </div>
  );
}
