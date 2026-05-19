/* Cookie Consent + Google Analytics */

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
      .cookie-banner{
        position:fixed;
        bottom:20px;
        left:20px;
        right:20px;
        max-width:900px;
        margin:auto;
        background:white;
        border-radius:20px;
        box-shadow:0 20px 60px rgba(0,0,0,.2);
        padding:20px;
        z-index:9999;
        font-family:Arial;
      }
      .cookie-title{font-weight:bold;font-size:18px;margin-bottom:10px;}
      .cookie-text{font-size:14px;color:#555;margin-bottom:15px;}
      .cookie-buttons{display:flex;gap:10px;}
      .btn{padding:10px 15px;border:none;border-radius:999px;cursor:pointer;font-weight:bold;}
      .accept{background:#e39a48;color:white;}
      .decline{background:#eee;}

      @media (max-width:600px){
        .cookie-buttons{flex-direction:column;}
        .btn{width:100%;}
      }
    `;
    document.head.appendChild(style);
  }

  function createBanner(){
    injectStyles();

    const banner=document.createElement("div");
    banner.className="cookie-banner";

    banner.innerHTML=`
      <div class="cookie-title">Cookie-Einstellungen</div>
      <div class="cookie-text">
        Wir nutzen Google Analytics zur Verbesserung der Website – nur mit Ihrer Zustimmung.
      </div>
      <div class="cookie-buttons">
        <button class="btn decline" data-choice="decline">Ablehnen</button>
        <button class="btn accept" data-choice="accept">Akzeptieren</button>
      </div>
    `;

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