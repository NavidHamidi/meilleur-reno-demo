<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MeilleureReno — Rénovation d'intérieur à Paris</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --sand: #F5F0E8;
      --clay: #C8A882;
      --terracotta: #B5613A;
      --forest: #2C3E2D;
      --smoke: #7A7568;
      --cream: #FDFAF5;
      --dark: #1A1A18;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--dark);
      overflow-x: hidden;
    }

    /* ── NAV ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; justify-content: space-between; align-items: center;
      padding: 1.25rem 4rem;
      background: rgba(253,250,245,0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(200,168,130,0.25);
    }

    .nav-logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--forest);
      letter-spacing: -0.02em;
      text-decoration: none;
    }
    .nav-logo span { color: var(--terracotta); }

    .nav-actions { display: flex; gap: 0.75rem; align-items: center; }

    .btn-outline {
      padding: 0.6rem 1.4rem;
      border: 1.5px solid var(--forest);
      background: transparent;
      color: var(--forest);
      border-radius: 2rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .btn-outline:hover { background: var(--forest); color: var(--cream); }

    .btn-primary {
      padding: 0.6rem 1.6rem;
      background: var(--terracotta);
      color: white;
      border: none;
      border-radius: 2rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s ease;
      box-shadow: 0 4px 20px rgba(181,97,58,0.3);
    }
    .btn-primary:hover { background: #9e4f2e; box-shadow: 0 6px 24px rgba(181,97,58,0.45); transform: translateY(-1px); }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      overflow: hidden;
    }

    .hero-left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 8rem 4rem 4rem 4rem;
      position: relative;
      z-index: 2;
    }

    .hero-eyebrow {
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--terracotta);
      margin-bottom: 1.5rem;
      opacity: 0;
      animation: fadeUp 0.8s 0.1s ease forwards;
    }

    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.8rem, 5vw, 4.5rem);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.03em;
      color: var(--forest);
      margin-bottom: 1.5rem;
      opacity: 0;
      animation: fadeUp 0.8s 0.2s ease forwards;
    }
    .hero-title em {
      font-style: italic;
      color: var(--terracotta);
    }

    .hero-sub {
      font-size: 1.05rem;
      color: var(--smoke);
      line-height: 1.7;
      max-width: 400px;
      margin-bottom: 2.5rem;
      opacity: 0;
      animation: fadeUp 0.8s 0.35s ease forwards;
    }

    .hero-checklist {
      list-style: none;
      margin-bottom: 2.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      opacity: 0;
      animation: fadeUp 0.8s 0.45s ease forwards;
    }
    .hero-checklist li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: var(--dark);
    }
    .check-dot {
      width: 22px; height: 22px;
      background: var(--forest);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .check-dot svg { width: 12px; height: 12px; stroke: white; fill: none; stroke-width: 2.5; }

    .hero-cta {
      opacity: 0;
      animation: fadeUp 0.8s 0.55s ease forwards;
    }
    .hero-cta .btn-primary { font-size: 1rem; padding: 0.85rem 2.2rem; }

    .hero-right {
      position: relative;
      overflow: hidden;
    }

    .hero-right::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--sand) 0%, #E8DDD0 100%);
      z-index: 0;
    }

    .hero-img-wrap {
      position: absolute;
      inset: 60px 40px 40px 0;
      border-radius: 2rem 0 0 2rem;
      overflow: hidden;
      z-index: 1;
      box-shadow: -20px 20px 60px rgba(0,0,0,0.15);
      opacity: 0;
      animation: fadeRight 1s 0.4s ease forwards;
    }

    .hero-img-wrap img {
      width: 100%; height: 100%;
      object-fit: cover;
    }

    .hero-badge {
      position: absolute;
      bottom: 80px;
      left: -20px;
      z-index: 2;
      background: var(--cream);
      border-radius: 1rem;
      padding: 1rem 1.4rem;
      box-shadow: 0 10px 40px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      opacity: 0;
      animation: fadeUp 0.8s 0.8s ease forwards;
    }
    .hero-badge-num {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-weight: 900;
      color: var(--terracotta);
      line-height: 1;
    }
    .hero-badge-label {
      font-size: 0.75rem;
      color: var(--smoke);
      font-weight: 500;
    }

    /* ── STATS ── */
    .stats {
      background: var(--forest);
      padding: 3.5rem 4rem;
    }
    .stats-grid {
      max-width: 1100px; margin: 0 auto;
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 2rem; text-align: center;
    }
    .stat-num {
      font-family: 'Playfair Display', serif;
      font-size: 2.8rem; font-weight: 900;
      color: var(--clay); line-height: 1;
      margin-bottom: 0.4rem;
    }
    .stat-label {
      font-size: 0.85rem; color: rgba(253,250,245,0.7);
      font-weight: 400; letter-spacing: 0.05em;
    }

    /* ── SERVICES ── */
    .services {
      padding: 7rem 4rem;
      max-width: 1200px; margin: 0 auto;
    }
    .section-header {
      display: flex; justify-content: space-between; align-items: flex-end;
      margin-bottom: 4rem;
    }
    .section-label {
      font-size: 0.72rem; font-weight: 500; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--terracotta);
      margin-bottom: 0.8rem;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 3.5vw, 3rem);
      font-weight: 900; color: var(--forest);
      line-height: 1.1; letter-spacing: -0.02em;
    }
    .section-title em { font-style: italic; color: var(--terracotta); }
    .section-sub {
      font-size: 0.9rem; color: var(--smoke); max-width: 220px;
      text-align: right; line-height: 1.6;
    }

    .services-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }
    .service-card {
      background: var(--sand);
      border-radius: 1.5rem;
      padding: 2.5rem 2rem;
      position: relative; overflow: hidden;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: default;
    }
    .service-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.1);
    }
    .service-card.featured { background: var(--forest); }

    .service-icon {
      width: 48px; height: 48px;
      background: rgba(181,97,58,0.12);
      border-radius: 1rem;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }
    .service-card.featured .service-icon { background: rgba(255,255,255,0.1); }

    .service-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem; font-weight: 700;
      color: var(--forest); margin-bottom: 0.75rem;
    }
    .service-card.featured .service-title { color: var(--cream); }

    .service-desc {
      font-size: 0.875rem; color: var(--smoke);
      line-height: 1.7;
    }
    .service-card.featured .service-desc { color: rgba(253,250,245,0.7); }

    .service-tag {
      display: inline-block; margin-top: 1.25rem;
      padding: 0.3rem 0.9rem;
      background: rgba(181,97,58,0.12);
      color: var(--terracotta);
      border-radius: 2rem;
      font-size: 0.72rem; font-weight: 500; letter-spacing: 0.05em;
    }
    .service-card.featured .service-tag {
      background: rgba(200,168,130,0.2);
      color: var(--clay);
    }

    /* ── PROCESS ── */
    .process {
      background: var(--sand);
      padding: 7rem 4rem;
    }
    .process-inner { max-width: 1100px; margin: 0 auto; }
    .process-header { text-align: center; margin-bottom: 5rem; }

    .process-steps {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0; position: relative;
    }
    .process-steps::before {
      content: '';
      position: absolute;
      top: 3rem; left: 16.66%; right: 16.66%;
      height: 1.5px;
      background: linear-gradient(to right, var(--clay), var(--terracotta), var(--clay));
      z-index: 0;
    }
    .process-step { text-align: center; padding: 0 2rem; position: relative; z-index: 1; }

    .step-num-wrap {
      width: 60px; height: 60px;
      background: var(--forest);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 1.5rem;
      border: 4px solid var(--sand);
    }
    .step-num {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem; font-weight: 900;
      color: var(--clay);
    }
    .step-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.2rem; font-weight: 700;
      color: var(--forest); margin-bottom: 0.75rem;
    }
    .step-desc { font-size: 0.875rem; color: var(--smoke); line-height: 1.7; }

    /* ── TESTIMONIALS ── */
    .testimonials {
      padding: 7rem 4rem;
      max-width: 1200px; margin: 0 auto;
    }

    .testimonials-grid {
      display: grid; grid-template-columns: 1.5fr 1fr;
      gap: 1.5rem; margin-top: 4rem;
    }
    .testi-card {
      background: var(--sand);
      border-radius: 1.5rem;
      padding: 2.5rem;
      position: relative;
      transition: transform 0.3s ease;
    }
    .testi-card:hover { transform: translateY(-4px); }
    .testi-card.dark {
      background: var(--forest);
    }
    .testi-card.small {
      padding: 2rem;
    }

    .testi-stars { display: flex; gap: 4px; margin-bottom: 1.25rem; }
    .testi-stars span { color: var(--terracotta); font-size: 1rem; }

    .testi-quote {
      font-family: 'Playfair Display', serif;
      font-size: 1.05rem; font-style: italic;
      line-height: 1.7; color: var(--forest);
      margin-bottom: 1.5rem;
    }
    .testi-card.dark .testi-quote { color: var(--cream); }

    .testi-author { display: flex; align-items: center; gap: 0.75rem; }
    .testi-avatar {
      width: 44px; height: 44px;
      background: var(--terracotta);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 700; font-size: 0.8rem; color: white;
      flex-shrink: 0;
    }
    .testi-card.dark .testi-avatar { background: var(--clay); }
    .testi-name { font-weight: 500; font-size: 0.9rem; color: var(--forest); }
    .testi-card.dark .testi-name { color: var(--cream); }
    .testi-project { font-size: 0.78rem; color: var(--smoke); }
    .testi-card.dark .testi-project { color: rgba(253,250,245,0.55); }

    .testi-right-col { display: flex; flex-direction: column; gap: 1.5rem; }

    /* ── CTA ── */
    .cta-section {
      margin: 0 3rem 5rem;
      background: var(--terracotta);
      border-radius: 2.5rem;
      padding: 5rem 4rem;
      text-align: center;
      position: relative; overflow: hidden;
    }
    .cta-section::before {
      content: '';
      position: absolute;
      top: -60%; right: -10%;
      width: 500px; height: 500px;
      background: rgba(255,255,255,0.06);
      border-radius: 50%;
    }
    .cta-section::after {
      content: '';
      position: absolute;
      bottom: -40%; left: -5%;
      width: 350px; height: 350px;
      background: rgba(0,0,0,0.06);
      border-radius: 50%;
    }
    .cta-label {
      font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase;
      color: rgba(255,255,255,0.65); margin-bottom: 1rem;
    }
    .cta-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4vw, 3.2rem);
      font-weight: 900; color: white;
      line-height: 1.1; letter-spacing: -0.02em;
      margin-bottom: 1rem;
    }
    .cta-sub {
      font-size: 1rem; color: rgba(255,255,255,0.75);
      margin-bottom: 2.5rem; max-width: 480px; margin-left: auto; margin-right: auto;
      line-height: 1.7;
    }
    .btn-white {
      padding: 0.9rem 2.4rem;
      background: white; color: var(--terracotta);
      border: none; border-radius: 2rem;
      font-family: 'DM Sans', sans-serif;
      font-size: 1rem; font-weight: 600;
      cursor: pointer; text-decoration: none;
      transition: all 0.2s ease;
      display: inline-block;
      box-shadow: 0 8px 30px rgba(0,0,0,0.15);
    }
    .btn-white:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.2); }

    /* ── FOOTER ── */
    footer {
      background: var(--dark);
      padding: 4rem 4rem 2rem;
    }
    .footer-grid {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem; max-width: 1200px; margin: 0 auto 3rem;
    }
    .footer-logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem; font-weight: 700;
      color: var(--clay); margin-bottom: 1rem;
    }
    .footer-tagline {
      font-size: 0.85rem; color: rgba(255,255,255,0.45);
      line-height: 1.7; max-width: 240px;
    }
    .footer-col h4 {
      font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em;
      text-transform: uppercase; color: rgba(255,255,255,0.5);
      margin-bottom: 1.25rem;
    }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
    .footer-col ul li a {
      font-size: 0.875rem; color: rgba(255,255,255,0.65);
      text-decoration: none; transition: color 0.2s;
    }
    .footer-col ul li a:hover { color: var(--clay); }
    .footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 1.5rem;
      display: flex; justify-content: center;
      font-size: 0.78rem; color: rgba(255,255,255,0.3);
      max-width: 1200px; margin: 0 auto;
    }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeRight {
      from { opacity: 0; transform: translateX(30px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .reveal {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      nav { padding: 1rem 1.5rem; }
      .hero { grid-template-columns: 1fr; min-height: auto; }
      .hero-left { padding: 7rem 1.5rem 3rem; }
      .hero-right { height: 320px; }
      .hero-img-wrap { inset: 20px 20px 20px 20px; border-radius: 1.5rem; }
      .stats { padding: 2.5rem 1.5rem; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .services { padding: 4rem 1.5rem; }
      .services-grid { grid-template-columns: 1fr; }
      .section-header { flex-direction: column; align-items: flex-start; gap: 1rem; }
      .section-sub { text-align: left; max-width: none; }
      .process { padding: 4rem 1.5rem; }
      .process-steps { grid-template-columns: 1fr; gap: 2rem; }
      .process-steps::before { display: none; }
      .testimonials { padding: 4rem 1.5rem; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .cta-section { margin: 0 1rem 3rem; padding: 3.5rem 1.5rem; }
      footer { padding: 3rem 1.5rem 2rem; }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <a href="/" class="nav-logo">Meilleure<span>Reno</span></a>
    <div class="nav-actions">
      <a href="#" class="btn-outline">Espace client</a>
      <a href="/survey" class="btn-primary">Devis gratuit — 24h</a>
    </div>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-left">
      <p class="hero-eyebrow">Rénovation d'intérieur · Paris & Île-de-France</p>
      <h1 class="hero-title">
        Votre intérieur,<br />
        <em>magnifié</em><br />
        avec soin.
      </h1>
      <p class="hero-sub">
        L'alliance du savoir-faire artisanal et d'un accompagnement humain,
        pour chaque étape de vos travaux.
      </p>
      <ul class="hero-checklist">
        <li>
          <span class="check-dot">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          Travaux d'isolation efficaces — artisans RGE certifiés
        </li>
        <li>
          <span class="check-dot">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          Décoration d'intérieure sur mesure
        </li>
        <li>
          <span class="check-dot">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          Suivi de chantier de A à Z
        </li>
      </ul>
      <div class="hero-cta">
        <a href="/survey" class="btn-primary">Obtenir mes devis travaux →</a>
      </div>
    </div>

    <div class="hero-right">
      <div class="hero-img-wrap">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80" alt="Rénovation intérieure Paris" />
      </div>
      <div class="hero-badge">
        <div class="hero-badge-num">500+</div>
        <div class="hero-badge-label">Chantiers réalisés</div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="stats">
    <div class="stats-grid">
      <div class="reveal">
        <div class="stat-num">500+</div>
        <div class="stat-label">Chantiers réalisés</div>
      </div>
      <div class="reveal">
        <div class="stat-num">95%</div>
        <div class="stat-label">Satisfaction client</div>
      </div>
      <div class="reveal">
        <div class="stat-num">24h</div>
        <div class="stat-label">Délai de réponse</div>
      </div>
      <div class="reveal">
        <div class="stat-num">10+</div>
        <div class="stat-label">Années d'expérience</div>
      </div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="services">
    <div class="section-header reveal">
      <div>
        <p class="section-label">Ce que nous faisons</p>
        <h2 class="section-title">Nos services de<br /><em>rénovation</em></h2>
      </div>
      <p class="section-sub">De l'isolation à la décoration, un accompagnement complet.</p>
    </div>

    <div class="services-grid">
      <div class="service-card reveal">
        <div class="service-icon">🏠</div>
        <h3 class="service-title">Travaux d'isolation</h3>
        <p class="service-desc">
          Isolation des murs (ITE / ITI), toiture et combles. Optimisez votre confort thermique
          et réduisez jusqu'à 30 % vos factures énergétiques.
        </p>
        <span class="service-tag">Artisans RGE certifiés</span>
      </div>

      <div class="service-card featured reveal">
        <div class="service-icon">🎨</div>
        <h3 class="service-title">Décoration d'intérieur</h3>
        <p class="service-desc">
          Matériaux, finitions, harmonies de couleurs. L'artisan vous accompagne dans chaque choix
          pour un intérieur qui vous ressemble.
        </p>
        <span class="service-tag">Sur mesure</span>
      </div>

      <div class="service-card reveal">
        <div class="service-icon">📐</div>
        <h3 class="service-title">Architecture partenaire</h3>
        <p class="service-desc">
          Pour aller plus loin, découvrez nos architectes partenaires soigneusement sélectionnés
          pour la qualité de leurs réalisations.
        </p>
        <span class="service-tag">Partenaires triés sur le volet</span>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="process">
    <div class="process-inner">
      <div class="process-header reveal">
        <p class="section-label">Notre méthode</p>
        <h2 class="section-title">Simple, <em>transparent</em>,<br />de bout en bout</h2>
      </div>

      <div class="process-steps">
        <div class="process-step reveal">
          <div class="step-num-wrap"><span class="step-num">1</span></div>
          <h3 class="step-title">Audit gratuit</h3>
          <p class="step-desc">Remplissez notre questionnaire en ligne. Recevez une première estimation sous 24h, sans engagement.</p>
        </div>
        <div class="process-step reveal">
          <div class="step-num-wrap"><span class="step-num">2</span></div>
          <h3 class="step-title">Devis détaillés</h3>
          <p class="step-desc">Nos artisans partenaires vous proposent des devis clairs et transparents, adaptés à votre projet.</p>
        </div>
        <div class="process-step reveal">
          <div class="step-num-wrap"><span class="step-num">3</span></div>
          <h3 class="step-title">Suivi de chantier</h3>
          <p class="step-desc">Nous vous accompagnons jusqu'à la réception du chantier pour garantir votre satisfaction totale.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonials">
    <div class="reveal">
      <p class="section-label">Témoignages</p>
      <h2 class="section-title">Ils nous ont<br /><em>fait confiance</em></h2>
    </div>

    <div class="testimonials-grid">
      <!-- Large card -->
      <div class="testi-card dark reveal">
        <div class="testi-stars">
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <p class="testi-quote">
          "Excellent service du début à la fin. L'équipe MeilleureReno a su nous guider dans nos choix et les artisans étaient vraiment professionnels. Notre appartement haussmannien a été magnifiquement rénové."
        </p>
        <div class="testi-author">
          <div class="testi-avatar">JS</div>
          <div>
            <div class="testi-name">Justine S.</div>
            <div class="testi-project">Rénovation complète — Paris 16e</div>
          </div>
        </div>
      </div>

      <!-- Right col: 2 small cards -->
      <div class="testi-right-col">
        <div class="testi-card small reveal">
          <div class="testi-stars">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="testi-quote">
            "Je recommande vivement ! Devis transparents, suivi impeccable. Trouver un professionnel adapté fut très simple."
          </p>
          <div class="testi-author">
            <div class="testi-avatar">MC</div>
            <div>
              <div class="testi-name">Marc C.</div>
              <div class="testi-project">Isolation thermique — Paris 7e</div>
            </div>
          </div>
        </div>

        <div class="testi-card small reveal">
          <div class="testi-stars">
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p class="testi-quote">
            "Rénovation menée avec professionnalisme et rigueur. Service très satisfaisant."
          </p>
          <div class="testi-author">
            <div class="testi-avatar">JD</div>
            <div>
              <div class="testi-name">Jean D.</div>
              <div class="testi-project">Isolation thermique — Paris 7e</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <div class="cta-section reveal">
    <p class="cta-label">Prêt à commencer ?</p>
    <h2 class="cta-title">Donnez vie à votre<br />projet de rénovation</h2>
    <p class="cta-sub">Recevez vos devis travaux gratuits sous 24h et bénéficiez d'un accompagnement personnalisé à chaque étape.</p>
    <a href="/survey" class="btn-white">Obtenir mes devis gratuits →</a>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-logo">MeilleureReno</div>
        <p class="footer-tagline">Le partenaire de confiance pour tous vos projets de rénovation à Paris. Artisans qualifiés, devis transparents.</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="#">Rénovation appartement</a></li>
          <li><a href="#">Isolation thermique</a></li>
          <li><a href="#">Décoration intérieur</a></li>
          <li><a href="#">Architecture</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Zones</h4>
        <ul>
          <li><a href="#">Paris 7e</a></li>
          <li><a href="#">Paris 15e</a></li>
          <li><a href="#">Paris 16e</a></li>
          <li><a href="#">Île-de-France</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Entreprise</h4>
        <ul>
          <li><a href="#">À propos</a></li>
          <li><a href="#">Nos artisans</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">© 2026 MeilleureReno. Tous droits réservés.</div>
  </footer>

  <script>
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  </script>
</body>
</html>