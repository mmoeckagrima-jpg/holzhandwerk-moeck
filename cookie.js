/* Premium Cookie Consent + Google Analytics */

(function () {
  "use strict";

  const GA_MEASUREMENT_ID = "G-8GSS2Y94FB";
  const CONSENT_KEY = "hhm_cookie_consent_v1";

  function loadGoogleAnalytics() {
    if (window.__hhmGaLoaded) return;
    window.__hhmGaLoaded = true;

    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function getConsent(){
    try{return localStorage.getItem(CONSENT_KEY);}catch(e){return null;}
  }

  function setConsent(v){
    try{localStorage.setItem(CONSENT_KEY,v);}catch(e){}
  }

  function injectStyles(){
    if(document.getElementById("cookie-style")) return;

    const style=document.createElement("style");
    style.id="cookie-style";
    style.innerHTML=`
      .cookie-backdrop{
        position:fixed;
        inset:0;
        z-index:9998;
        background:linear-gradient(180deg, rgba(15,23,19,.08), rgba(15,23,19,.20));
        pointer-events:none;
      }
      .cookie-banner{
        position:fixed;
        left:50%;
        bottom:24px;
        transform:translateX(-50%);
        width:min(720px, calc(100% - 32px));
        background:rgba(255,255,255,.98);
        border:1px solid rgba(42,74,50,.16);
        border-left:5px solid #2f5b3b;
        border-radius:18px;
        box-shadow:0 22px 70px rgba(20,31,24,.24);
        padding:20px 22px;
        z-index:9999;
        font-family:Arial, Helvetica, sans-serif;
        color:#1f2a22;
      }
      .cookie-top{
        display:flex;
        gap:14px;
        align-items:flex-start;
      }
      .cookie-icon{
        flex:0 0 40px;
        width:40px;
        height:40px;
        border-radius:999px;
        background:linear-gradient(135deg,#2f5b3b,#49724d);
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-weight:700;
        font-size:18px;
        box-shadow:0 8px 22px rgba(47,91,59,.28);
      }
      .cookie-content{flex:1;min-width:0;}
      .cookie-title{
        font-weight:800;
        font-size:17px;
        letter-spacing:.01em;
        margin:0 0 6px;
      }
      .cookie-text{
        font-size:14px;
        line-height:1.55;
        color:#4d5a50;
        margin:0;
      }
      .cookie-text a{
        color:#2f5b3b;
        text-decoration:underline;
        text-underline-offset:3px;
        font-weight:700;
      }
      .cookie-actions{
        display:flex;
        justify-content:flex-end;
        gap:10px;
        margin-top:16px;
        flex-wrap:wrap;
      }
      .cookie-btn{
        border:0;
        border-radius:999px;
        padding:11px 17px;
        cursor:pointer;
        font-weight:800;
        font-size:14px;
        transition:transform .18s ease, box-shadow .18s ease, background .18s ease;
      }
      .cookie-btn:hover{transform:translateY(-1px);}
      .cookie-accept{
        background:#c8792b;
        color:white;
        box-shadow:0 10px 24px rgba(200,121,43,.28);
      }
      .cookie-accept:hover{background:#b86f28;}
      .cookie-decline{
        background:#eef1ed;
        color:#2f3b32;
      }
      .cookie-decline:hover{background:#e1e6df;}
      @media (max-width:600px){
        .cookie-banner{
          bottom:14px;
          width:calc(100% - 24px);
          padding:18px;
          border-radius:16px;
        }
        .cookie-top{gap:12px;}
        .cookie-icon{width:36px;height:36px;flex-basis:36px;font-size:16px;}
        .cookie-title{font-size:16px;}
        .cookie-text{font-size:13.5px;}
        .cookie-actions{display:grid;grid-template-columns:1fr;gap:8px;}
        .cookie-btn{width:100%;}
      }
    `;
    document.head.appendChild(style);
  }

  function createBanner(){
    injectStyles();

    const backdrop=document.createElement("div");
    backdrop.className="cookie-backdrop";

    const banner=document.createElement("div");
    banner.className="cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Cookie-Einstellungen");

    banner.innerHTML=`
      <div class="cookie-top">
        <div class="cookie-icon" aria-hidden="true">✓</div>
        <div class="cookie-content">
          <div class="cookie-title">Privatsphäre & Website-Analyse</div>
          <p class="cookie-text">
            Diese Website nutzt Google Analytics nur mit Ihrer Zustimmung, um Aufrufe und Nutzung besser zu verstehen und den Internetauftritt weiter zu verbessern. Details finden Sie in der <a href="datenschutz.html">Datenschutzerklärung</a>.
          </p>
        </div>
      </div>
      <div class="cookie-actions">
        <button class="cookie-btn cookie-decline" data-choice="decline">Nur notwendige Cookies</button>
        <button class="cookie-btn cookie-accept" data-choice="accept">Analyse erlauben</button>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(banner);

    banner.addEventListener("click", function(e){
      const btn=e.target.closest("[data-choice]");
      if(!btn) return;

      const choice=btn.getAttribute("data-choice");

      if(choice==="accept"){
        setConsent("accepted");
        loadGoogleAnalytics();
      }else{
        setConsent("declined");
      }

      banner.remove();
      backdrop.remove();
    });
  }

  function init(){
    const consent=getConsent();

    if(consent==="accepted"){
      loadGoogleAnalytics();
      return;
    }

    if(!consent){
      createBanner();
    }
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",init);
  }else{
    init();
  }

})();
