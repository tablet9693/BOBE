/* «Te llamamos»: para quien prefiere que le llamen en vez de escribir por WhatsApp.
   Cualquier botón con data-llamamos="<sitio>" abre el formulario. Los datos llegan por correo a
   info@bobeconstrucciones.es a través de FormSubmit (formsubmit.co). Si el envío falla, se ofrece
   mandarlo por WhatsApp para no perder el contacto. Cada apertura y envío se cuenta en GoatCounter. */
(function () {
  var CORREO = "e12438b70aa916fd975dc5d51831f5c2"; // alias de FormSubmit para info@bobeconstrucciones.es (no se ve el correo en el código)
  var WHATSAPP = "34616331574";
  var TXT = {
    es: { titulo: "Te llamamos nosotros", intro: "Déjanos tu nombre y tu teléfono y te llamamos hoy para darte precio. Sin compromiso.",
      nombre: "Nombre", tel: "Teléfono", que: "¿Qué necesitas?", cuando: "¿Cuándo te viene mejor?",
      ops: ["Insonorizar una pared", "Tabique o dividir una habitación", "Falso techo", "Trasdosado o pared fría", "Otro trabajo"],
      horas: ["Cuando sea", "Por la mañana", "Por la tarde"],
      priv: "Acepto que BOBE Construcciones use estos datos solo para llamarme sobre este presupuesto.",
      enviar: "Llamadme", enviando: "Enviando…", ok: "¡Recibido! Te llamamos hoy o, como muy tarde, mañana por la mañana.",
      eNombre: "Escribe tu nombre.", eTel: "Escribe un teléfono de al menos 9 cifras.", ePriv: "Marca la casilla para que podamos llamarte.",
      fallo: "No se ha podido enviar. Mándanoslo por WhatsApp con un clic:", waBtn: "Enviar por WhatsApp", cerrar: "Cerrar",
      waMsg: function (d) { return "Hola, prefiero que me llaméis. Soy " + d.nombre + ", mi teléfono es " + d.telefono + ". Me interesa: " + d.que + " (" + d.cuando.toLowerCase() + ")."; } },
    en: { titulo: "We'll call you", intro: "Leave your name and phone number and we'll call you today with a price. No commitment.",
      nombre: "Name", tel: "Phone", que: "What do you need?", cuando: "Best time to call",
      ops: ["Soundproof a wall", "Partition / split a room", "False ceiling", "Wall lining / cold wall", "Other job"],
      horas: ["Any time", "Morning", "Afternoon"],
      priv: "I agree that BOBE Construcciones uses this data only to call me about this quote.",
      enviar: "Call me", enviando: "Sending…", ok: "Got it! We'll call you today or, at the latest, tomorrow morning.",
      eNombre: "Please enter your name.", eTel: "Please enter a phone number with at least 9 digits.", ePriv: "Please tick the box so we can call you.",
      fallo: "It couldn't be sent. Send it on WhatsApp with one tap:", waBtn: "Send on WhatsApp", cerrar: "Close",
      waMsg: function (d) { return "Hello, I'd prefer you to call me. I'm " + d.nombre + ", my phone is " + d.telefono + ". I'm interested in: " + d.que + " (" + d.cuando.toLowerCase() + ")."; } },
    de: { titulo: "Wir rufen Sie an", intro: "Hinterlassen Sie Namen und Telefonnummer, wir rufen Sie heute mit einem Preis an. Unverbindlich.",
      nombre: "Name", tel: "Telefon", que: "Was brauchen Sie?", cuando: "Wann passt es Ihnen?",
      ops: ["Wand schalldämmen", "Trennwand / Raum teilen", "Abgehängte Decke", "Vorsatzschale / kalte Wand", "Andere Arbeit"],
      horas: ["Egal wann", "Vormittags", "Nachmittags"],
      priv: "Ich bin einverstanden, dass BOBE Construcciones diese Daten nur verwendet, um mich zu diesem Angebot anzurufen.",
      enviar: "Rufen Sie mich an", enviando: "Wird gesendet…", ok: "Erhalten! Wir rufen Sie heute oder spätestens morgen Vormittag an.",
      eNombre: "Bitte geben Sie Ihren Namen ein.", eTel: "Bitte geben Sie eine Telefonnummer mit mindestens 9 Ziffern ein.", ePriv: "Bitte setzen Sie das Häkchen, damit wir Sie anrufen können.",
      fallo: "Das Senden hat nicht geklappt. Schicken Sie es mit einem Tipp per WhatsApp:", waBtn: "Per WhatsApp senden", cerrar: "Schließen",
      waMsg: function (d) { return "Hallo, bitte rufen Sie mich an. Ich bin " + d.nombre + ", meine Nummer ist " + d.telefono + ". Es geht um: " + d.que + " (" + d.cuando.toLowerCase() + ")."; } }
  };
  var lang = function () { var l = (document.documentElement.lang || "es").slice(0, 2); return TXT[l] ? l : "es"; };
  var contar = function (ruta, titulo) {
    try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: ruta, title: titulo, event: true }); } catch (e) {}
  };
  var pagina = function () { return location.pathname.replace(/\/$/, "") || "/"; };

  var css = document.createElement("style");
  css.textContent =
    ".ll-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;min-height:50px;padding:0 20px;border-radius:999px;" +
    "font-family:inherit;font-weight:700;font-size:1rem;line-height:1;cursor:pointer;border:2px solid currentColor;background:transparent;color:var(--ink,#14181B)}" +
    ".ll-btn:hover{background:rgba(0,0,0,.05)}.ll-btn.ll-claro{color:#fff}.ll-btn.ll-claro:hover{background:rgba(255,255,255,.12)}" +
    ".ll-btn svg{flex:none}.barra .ll-btn{min-height:52px;padding:0 14px;font-size:.92rem;background:#fff;white-space:nowrap;border-width:2px}" +
    ".barra:has(.ll-btn){grid-template-columns:1fr auto;gap:8px}.barra:has(.ll-btn):has(.tel-btn){grid-template-columns:1fr auto auto}" +
    ".final .ll-btn{width:100%}" +
    ".ll-fondo{position:fixed;inset:0;z-index:1000;background:rgba(20,24,27,.55);display:grid;place-items:center;padding:16px}" +
    ".ll-fondo[hidden]{display:none}.ll-caja{position:relative;background:#fff;color:var(--ink,#14181B);border-radius:22px;padding:26px 22px 20px;" +
    "width:min(440px,100%);max-height:calc(100vh - 32px);overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,.25);font-family:var(--f-body,inherit)}" +
    ".ll-caja h2{margin:0 0 6px;font:900 1.5rem/1.15 var(--f-display,inherit)}.ll-caja>p{margin:0 0 16px;color:var(--muted,#535C63)}" +
    ".ll-x{position:absolute;top:8px;right:10px;background:none;border:0;font-size:22px;line-height:1;cursor:pointer;color:var(--muted,#535C63);padding:8px}" +
    ".ll-f{display:grid;gap:12px}.ll-f label{display:grid;gap:6px;font-weight:700;font-size:.95rem}" +
    ".ll-f input,.ll-f select{font:inherit;padding:12px 14px;border:2px solid var(--line,#E2E6EA);border-radius:12px;background:#fff;color:inherit;width:100%;box-sizing:border-box}" +
    ".ll-f input:focus,.ll-f select:focus{outline:none;border-color:var(--wa,#1E8E4E)}" +
    ".ll-f .ll-check{display:flex;gap:10px;align-items:flex-start;font-weight:600;font-size:.88rem;color:var(--muted,#535C63)}" +
    ".ll-f .ll-check input{width:20px;height:20px;margin:2px 0 0;flex:none;accent-color:var(--wa,#1E8E4E)}" +
    ".ll-enviar{min-height:52px;border:0;border-radius:999px;background:var(--wa,#1E8E4E);color:#fff;font-family:inherit;font-weight:700;font-size:1.05rem;cursor:pointer}" +
    ".ll-enviar:disabled{opacity:.6}.ll-err{margin:0;background:#FDE2E2;color:#9B1C1C;border-radius:12px;padding:10px 14px;font-weight:700}" +
    ".ll-ok{margin:0;background:#DCF3E3;color:#17733F;border-radius:12px;padding:12px 14px;font-weight:700}" +
    ".ll-wa{display:inline-flex;margin-top:10px;min-height:46px;align-items:center;padding:0 18px;border-radius:999px;background:var(--wa,#1E8E4E);color:#fff;font-weight:700;text-decoration:none}" +
    ".ll-f[hidden],.ll-fin[hidden],.ll-err[hidden]{display:none}.ll-trampa{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}";
  document.head.appendChild(css);

  var fondo, form, desde = "";
  function construir() {
    var t = TXT[lang()];
    fondo = document.createElement("div");
    fondo.className = "ll-fondo"; fondo.hidden = true;
    fondo.setAttribute("role", "dialog"); fondo.setAttribute("aria-modal", "true"); fondo.setAttribute("aria-labelledby", "ll-titulo");
    var opciones = function (lista) { return lista.map(function (o) { return "<option>" + o + "</option>"; }).join(""); };
    fondo.innerHTML =
      '<div class="ll-caja"><button type="button" class="ll-x" aria-label="' + t.cerrar + '">×</button>' +
      '<h2 id="ll-titulo">' + t.titulo + "</h2><p>" + t.intro + "</p>" +
      '<form class="ll-f" novalidate>' +
      '<label>' + t.nombre + '<input name="nombre" autocomplete="name" required></label>' +
      '<label>' + t.tel + '<input name="telefono" type="tel" autocomplete="tel" inputmode="tel" required></label>' +
      '<label>' + t.que + '<select name="que">' + opciones(t.ops) + "</select></label>" +
      '<label>' + t.cuando + '<select name="cuando">' + opciones(t.horas) + "</select></label>" +
      '<div class="ll-trampa" aria-hidden="true"><label>No rellenar<input name="_honey" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="ll-check"><input type="checkbox" name="privacidad"><span>' + t.priv + "</span></label>" +
      '<p class="ll-err" hidden></p>' +
      '<button type="submit" class="ll-enviar">' + t.enviar + "</button></form>" +
      '<div class="ll-fin" hidden></div></div>';
    document.body.appendChild(fondo);
    form = fondo.querySelector("form");
    fondo.querySelector(".ll-x").onclick = cerrar;
    fondo.addEventListener("click", function (e) { if (e.target === fondo) cerrar(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !fondo.hidden) cerrar(); });
    form.addEventListener("submit", enviar);
  }
  function abrir(sitio, servicio) {
    if (!fondo) construir();
    desde = sitio || "";
    if (servicio) { var s = form.elements.que; for (var i = 0; i < s.options.length; i++) if (s.options[i].text.toLowerCase().indexOf(servicio) > -1) s.selectedIndex = i; }
    fondo.hidden = false;
    setTimeout(function () { form.elements.nombre.focus(); }, 50);
    contar("llamame-abrir/" + desde + pagina(), "Te llamamos · abrir · " + desde);
  }
  function cerrar() { fondo.hidden = true; }
  function error(txt) { var e = form.querySelector(".ll-err"); e.textContent = txt; e.hidden = !txt; }
  function enviar(ev) {
    ev.preventDefault();
    var t = TXT[lang()], f = form.elements;
    var d = { nombre: f.nombre.value.trim(), telefono: f.telefono.value.trim(), que: f.que.value, cuando: f.cuando.value };
    if (f._honey.value) return;
    if (d.nombre.length < 2) { error(t.eNombre); f.nombre.focus(); return; }
    if (d.telefono.replace(/\D/g, "").length < 9) { error(t.eTel); f.telefono.focus(); return; }
    if (!f.privacidad.checked) { error(t.ePriv); return; }
    error("");
    var b = form.querySelector(".ll-enviar"); b.disabled = true; b.textContent = t.enviando;
    var cuerpo = { "Nombre": d.nombre, "Teléfono": d.telefono, "Qué necesita": d.que, "Cuándo llamar": d.cuando,
      "Desde": desde + " · " + location.pathname, "Idioma": lang(),
      _subject: "📞 Te llamamos: " + d.nombre + " (" + d.que + ")", _template: "table", _captcha: "false" };
    fetch("https://formsubmit.co/ajax/" + CORREO, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(cuerpo) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok || String(j.success) !== "true") throw new Error(j.message || "error"); }); })
      .then(function () {
        contar("llamame-enviado/" + desde + pagina(), "Te llamamos · enviado · " + desde);
        terminar('<p class="ll-ok">' + t.ok + "</p>");
      })
      .catch(function () {
        contar("llamame-fallo/" + desde + pagina(), "Te llamamos · fallo de envío");
        var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(t.waMsg(d));
        terminar('<p class="ll-err">' + t.fallo + '</p><a class="ll-wa" href="' + url + '" target="_blank" rel="noopener">' + t.waBtn + "</a>");
      })
      .then(function () { b.disabled = false; b.textContent = t.enviar; });
  }
  function terminar(html) {
    form.hidden = true;
    var fin = fondo.querySelector(".ll-fin"); fin.innerHTML = html; fin.hidden = false;
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-llamamos]");
    if (!b) return;
    e.preventDefault();
    abrir(b.getAttribute("data-llamamos"), b.getAttribute("data-servicio"));
  });
})();
