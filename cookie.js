/* =========================================================
   HolzHandwerk Möck – Cookie Consent + Google Analytics
   Datei: cookie.js

   WICHTIG:
   1. Diese Datei in den GitHub-Hauptordner legen.
   2. In jede HTML-Seite direkt vor </body> einfügen:
      <script src="cookie.js"></script>
   3. GA_MEASUREMENT_ID unten durch die echte Google Analytics ID ersetzen.
      Beispiel: G-ABC123XYZ
   ========================================================= */

(function () {
  "use strict";

  const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // HIER echte Google Analytics ID eintragen
  const CONSENT_KEY = "hhm_cookie_consent_v1";

  function loadGoogleAnalytics() {
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
      console.warn("Google Analytics wurde nicht geladen: GA_MEASUREMENT_ID fehlt.");
      return;
    }

    if (window.__hhmGaLoaded) return;
    window.__hhmGaLoaded = true;

    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_MEASUREMENT_ID);
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true
    });
  }

  function getConsent() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      // Falls localStorage blockiert ist, läuft die Seite trotzdem weiter.
    }
  }

  function injectStyles() {
    if (document.getElementById("hhm-cookie-style")) return;

    const style = document.createElement("style");
    style.id = "hhm-cookie-style";
    style.textContent = `
      .hhm-cookie-banner{
        position:fixed;
        left:18px;
        right:18px;
        bottom:18px;
        z-index:99999;
        max-width:980px;
        margin:0 auto;
        background:rgba(255,255,255,.97);
        border:1px solid #d9e6df;
        border-radius:28px;
        box-shadow:0 24px 70px rgba(24,54,44,.22);
        overflow:hidden;
        font-family:Arial,Helvetica,sans-serif;
        color:#1e2a25;
      }
      .hhm-cookie-banner::before{
        content:"";
        display:block;
        height:7px;
        background:linear-gradient(90deg,#e39a48,#245442);
      }
      .hhm-cookie-inner{
        display:grid;
        grid-template-columns:1fr auto;
        gap:22px;
        align-items:center;
        padding:24px;
      }
      .hhm-cookie-kicker{
        color:#e39a48;
        font-size:12px;
        font-weight:900;
        letter-spacing:.09em;
        text-transform:uppercase;
        margin-bottom:7px;
      }
      .hhm-cookie-title{
        margin:0 0 8px;
        font-size:22px;
        line-height:1.15;
        color:#18362c;
        letter-spacing:-.03em;
      }
      .hhm-cookie-text{
        margin:0;
        color:#66736d;
        font-size:15px;
        line-height:1.45;
      }
      .hhm-cookie-text a{
        color:#18362c;
        font-weight:900;
        text-decoration:none;
      }
      .hhm-cookie-actions{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        justify-content:flex-end;
      }
      .hhm-cookie-btn{
        border:0;
        border-radius:999px;
        padding:12px 17px;
        font-weight:900;
        cursor:pointer;
        font-size:14px;
        min-height:44px;
      }
      .hhm-cookie-accept{
        background:linear-gradient(135deg,#e39a48,#b87333);
        color:white;
        box-shadow:0 12px 28px rgba(184,115,51,.28);
      }
      .hhm-cookie-decline{
        background:#edf4ef;
        color:#18362c;
      }
      .hhm-cookie-settings{
        background:#18362c;
        color:white;
      }
      .hhm-cookie-small{
        display:block;
        margin-top:8px;
        font-size:13px;
        color:#66736d;
      }
      @media(max-width:760px){
        .hhm-cookie-inner{
          grid-template-columns:1fr;
        }
        .hhm-cookie-actions{
          justify-content:flex-start;
        }
        .hhm-cookie-btn{
          width:100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function removeBanner() {
    const banner = document.getElementById("hhm-cookie-banner");
    if (banner) banner.remove();
  }

  function createBanner() {
    if (document.getElementById("hhm-cookie-banner")) return;

    injectStyles();

    const banner = document.createElement("div");
    banner.id = "hhm-cookie-banner";
    banner.className = "hhm-cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Cookie-Einstellungen");

    banner.innerHTML = `
      <div class="hhm-cookie-inner">
        <div>
          <div class="hhm-cookie-kicker">Cookie-Einstellungen</div>
          <h2 class="hhm-cookie-title">Dürfen wir die Nutzung der Website anonymisiert auswerten?</h2>
          <p class="hhm-cookie-text">
            Wir nutzen technisch notwendige Funktionen für die Website. Google Analytics laden wir nur nach Ihrer Zustimmung.
            Mehr dazu in der <a href="datenschutz.html">Datenschutzerklärung</a> und den <a href="cookies.html">Cookie-Einstellungen</a>.
          </p>
          <span class="hhm-cookie-small">Sie können Ihre Entscheidung später ändern, indem Sie die gespeicherten Website-Daten/Cookies im Browser löschen.</span>
        </div>
        <div class="hhm-cookie-actions">
          <button class="hhm-cookie-btn hhm-cookie-decline" type="button" data-cookie-choice="decline">Ablehnen</button>
          <button class="hhm-cookie-btn hhm-cookie-accept" type="button" data-cookie-choice="accept">Akzeptieren</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    banner.addEventListener("click", function (event) {
      const button = event.target.closest("[data-cookie-choice]");
      if (!button) return;

      const choice = button.getAttribute("data-cookie-choice");

      if (choice === "accept") {
        setConsent("accepted");
        removeBanner();
        loadGoogleAnalytics();
      }

      if (choice === "decline") {
        setConsent("declined");
        removeBanner();
      }
    });
  }

  function initCookieConsent() {
    const consent = getConsent();

    if (consent === "accepted") {
      loadGoogleAnalytics();
      return;
    }

    if (consent === "declined") {
      return;
    }

    createBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
