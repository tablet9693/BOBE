/* Aviso de cookies de BOBE. Google Ads y Analytics arrancan con el consentimiento DENEGADO (modo de consentimiento v2)
   y solo se activan si el visitante pulsa «Aceptar». La elección se guarda en este navegador. */
(function () {
  var CLAVE = "bobe_cookies";
  var TXT = {
    es: { t: "Usamos cookies", p: "Usamos cookies propias y de Google para medir la web y saber qué anuncios funcionan. Puedes aceptarlas o rechazarlas.", si: "Aceptar", no: "Rechazar", mas: "Más información" },
    en: { t: "We use cookies", p: "We use our own and Google cookies to measure the website and see which ads work. You can accept or reject them.", si: "Accept", no: "Reject", mas: "More information" },
    de: { t: "Wir verwenden Cookies", p: "Wir verwenden eigene Cookies und Cookies von Google, um die Website zu messen und zu sehen, welche Anzeigen funktionieren. Sie können sie akzeptieren oder ablehnen.", si: "Akzeptieren", no: "Ablehnen", mas: "Mehr Informationen" }
  };
  var l = (document.documentElement.lang || "es").slice(0, 2); var t = TXT[l] || TXT.es;
  function leer() { try { return localStorage.getItem(CLAVE); } catch (e) { return null; } }
  function guardar(v) { try { localStorage.setItem(CLAVE, v); } catch (e) {} }
  function aplicar(v) {
    if (typeof window.gtag !== "function") return;
    var e = v === "si" ? "granted" : "denied";
    window.gtag("consent", "update", { ad_storage: e, analytics_storage: e, ad_user_data: e, ad_personalization: e });
  }
  function mostrar() {
    if (document.getElementById("bobe-cookies")) return;
    var css = document.createElement("style");
    css.textContent = "#bobe-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;background:#14181B;color:#E6EAEC;border-radius:6px;padding:20px 22px;box-shadow:0 20px 50px rgba(0,0,0,.35);font:15px/1.5 system-ui,-apple-system,'Segoe UI',sans-serif;border-left:6px solid #1F5BD8}" +
      "#bobe-cookies b{display:block;color:#fff;font-size:16px;margin-bottom:6px}#bobe-cookies p{margin:0 0 14px}#bobe-cookies a{color:#9DB8F2}" +
      "#bobe-cookies .bc{display:flex;gap:10px;flex-wrap:wrap}#bobe-cookies button{font:600 14px/1 inherit;padding:12px 20px;border-radius:4px;cursor:pointer;border:2px solid #fff;background:transparent;color:#fff}" +
      "#bobe-cookies button.si{background:#1F5BD8;border-color:#1F5BD8}@media(max-width:760px){#bobe-cookies{bottom:86px}}";
    document.head.appendChild(css);
    var d = document.createElement("div"); d.id = "bobe-cookies"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", t.t);
    d.innerHTML = "<b>" + t.t + "</b><p>" + t.p + ' <a href="/cookies/">' + t.mas + '</a></p><div class="bc"><button type="button" class="si">' + t.si + '</button><button type="button" class="no">' + t.no + "</button></div>";
    document.body.appendChild(d);
    d.querySelector(".si").onclick = function () { guardar("si"); aplicar("si"); d.remove(); };
    d.querySelector(".no").onclick = function () { guardar("no"); aplicar("no"); d.remove(); };
  }
  document.addEventListener("click", function (e) { var a = e.target.closest && e.target.closest("[data-cookies]"); if (a) { e.preventDefault(); mostrar(); } });
  if (!leer()) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mostrar); else mostrar(); }
})();
