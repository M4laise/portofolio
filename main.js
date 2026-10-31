(function () {
  "use strict";

  const grid = document.getElementById("grid");
  const $ = (id) => document.getElementById(id);

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- helpers ---------- */
  function el(tag, props, children) {
    const n = document.createElement(tag);
    Object.assign(n, props || {});
    (children || []).forEach((c) => n.append(c));
    return n;
  }

  function placeholder(label) {
    return el("div", { className: "ph" }, [el("span", { textContent: label || "NO SIGNAL" })]);
  }

  const VIDEO_EXT = /\.(mkv|mp4|webm|mov)(\?.*)?$/i;
  const isVideo = (m) => m.type === "video" || VIDEO_EXT.test(m.src);

  function mediaNode(m, { thumb } = {}) {
    if (isVideo(m)) {
      const v = el("video", {
        src: m.src,
        loop: true,
        playsInline: true,
        preload: thumb ? "metadata" : "auto"
      });
      v.muted = true; // browsers only autoplay muted videos
      v.setAttribute("aria-label", m.caption || "");
      if (thumb) {
        // cards and thumbnails show a still first frame
        v.addEventListener("loadedmetadata", () => { v.currentTime = 0.1; });
      } else {
        v.autoplay = true;
        v.play().catch(() => {});
      }
      v.onerror = () => v.replaceWith(placeholder(thumb ? "" : "NO SIGNAL"));
      return v;
    }
    const img = el("img", { src: m.src, alt: m.caption || "", loading: "lazy" });
    img.onerror = () => img.replaceWith(placeholder(thumb ? "" : "NO SIGNAL"));
    return img;
  }

  /* ---------- cards ---------- */
  PROJECTS.forEach((p) => {
    const cover = el("div", { className: "card-img" });
    cover.append(p.media && p.media[0] ? mediaNode(p.media[0], { thumb: true }) : placeholder());

    const card = el("button", { className: "card", type: "button" }, [
      cover,
      el("div", { className: "card-body" }, [
        el("h3", { textContent: p.title }),
        el("p", { textContent: p.summary })
      ])
    ]);
    card.addEventListener("click", () => openProject(p));
    grid.append(card);
  });

  /* ---------- modal ---------- */
  function openProject(p) {
    $("m-title").textContent = p.title;
    $("m-meta").textContent = [p.year, p.role].filter(Boolean).join("  |  ");

    // gallery
    const viewer = $("m-viewer");
    const thumbs = $("m-thumbs");
    const caption = $("m-caption");
    thumbs.replaceChildren();
    viewer.replaceChildren();
    caption.textContent = "";

    const media = p.media || [];
    viewer.style.display = media.length ? "" : "none";

    function show(i) {
      viewer.replaceChildren(mediaNode(media[i]));
      caption.textContent = media[i].caption || "";
      [...thumbs.children].forEach((t, j) => t.classList.toggle("active", i === j));
    }

    media.forEach((m, i) => {
      const t = el("button", { className: "thumb", type: "button", ariaLabel: m.caption || "Media " + (i + 1) });
      t.append(mediaNode(m, { thumb: true }));
      t.addEventListener("click", () => show(i));
      thumbs.append(t);
    });
    thumbs.style.display = media.length > 1 ? "" : "none";
    if (media.length) show(0);

    // details
    const body = $("m-body");
    body.replaceChildren();
    (p.details || []).forEach((d) => {
      if (d.p) body.append(el("p", { textContent: d.p }));
      if (d.h) body.append(el("h4", { textContent: d.h }));
      if (d.list) body.append(el("ul", {}, d.list.map((x) => el("li", { textContent: x }))));
    });

    // tags + links
    $("m-tags").replaceChildren(...(p.tags || []).map((t) => el("span", { textContent: t })));
    $("m-links").replaceChildren(
      ...(p.links || []).map((l) =>
      l.disabled
      ? el("span", { className: "btn btn-off", textContent: l.label, ariaDisabled: "true" })
      : el("a", { className: "btn", href: l.url, target: "_blank", rel: "noopener", textContent: l.label })
      )
    );

    $("modal").querySelector(".modal-box").scrollTop = 0;
    $("modal").showModal();
    history.replaceState(null, "", "#" + p.id);
  }

  function closeModal() {
    $("modal").close();
  }

  $("m-close").addEventListener("click", closeModal);
  $("modal").addEventListener("close", () => {
    // stop any playing video
    $("m-viewer").replaceChildren();
    history.replaceState(null, "", location.pathname + location.search);
  });
  // click on the backdrop closes
  $("modal").addEventListener("click", (e) => {
    if (e.target === $("modal")) closeModal();
  });

  const hash = location.hash.slice(1);
  const linked = PROJECTS.find((p) => p.id === hash);
  if (linked) openProject(linked);
})();
