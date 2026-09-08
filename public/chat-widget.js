(function () {
  if (window.__geosChatLoaded) return;
  window.__geosChatLoaded = true;

  var HISTORY_LIMIT = 4;
  var MAX_CHARS = 800;
  var QUICK = ["Was kostet eine Entrümpelung?", "Wohnung räumen lassen", "Umzug & Haushaltsauflösung"];
  var WELCOME =
    "Guten Tag. geosbau.at ist ein unabhängiger Ratgeber zu Entrümpelung, Räumung und Umzug. Für die praktische Durchführung empfehlen wir Sofort Entrümpelung. Womit darf ich helfen?";

  function cssHref() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i += 1) {
      var src = scripts[i].src || "";
      if (src.indexOf("chat-widget.js") !== -1) {
        return src.replace(/chat-widget\.js(?:\?.*)?$/, "chat-widget.css");
      }
    }
    return "/chat-widget.css";
  }

  if (!document.getElementById("geos-chat-css")) {
    var link = document.createElement("link");
    link.id = "geos-chat-css";
    link.rel = "stylesheet";
    link.href = cssHref();
    document.head.appendChild(link);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function linkify(text) {
    return escapeHtml(text).replace(
      /(https?:\/\/[^\s<]+)|(www\.[^\s<]+)|((?:sofortentrumpelung|geosbau)\.at(?:\/[^\s<]*)?)/gi,
      function (match) {
        var href = match.indexOf("http") === 0 ? match : "https://" + match.replace(/^www\./i, "");
        if (/sofortentrumpelung\.at/i.test(match) && match.indexOf("http") !== 0) {
          href = "https://" + match.replace(/^www\./i, "");
        }
        if (/geosbau\.at/i.test(match) && match.indexOf("http") !== 0) {
          href = "https://" + match.replace(/^www\./i, "");
        }
        return '<a href="' + href + '" target="_blank" rel="noopener">' + match + "</a>";
      },
    );
  }

  ready(function () {
    if (document.getElementById("geos-chat-root")) return;

    var root = document.createElement("div");
    root.id = "geos-chat-root";
    root.innerHTML =
      '<button type="button" id="geos-chat-trigger" aria-controls="geos-chat-box" aria-expanded="false" aria-label="Geosbau Assistent öffnen">' +
      '<svg class="geos-chat-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6.2 5.2A3.2 3.2 0 0 1 9.4 2h5.2A3.2 3.2 0 0 1 17.8 5.2v6.1A3.2 3.2 0 0 1 14.6 14.5H12l-3.8 2.9A.75.75 0 0 1 7 16.8v-2.3H9.4A3.2 3.2 0 0 1 6.2 11.3V5.2Z" fill="#E3C56A"/></svg>' +
      '<svg class="geos-chat-icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="#0B1F33" stroke-width="2.2" stroke-linecap="round"/></svg>' +
      "</button>" +
      '<section id="geos-chat-box" role="dialog" aria-labelledby="geos-chat-title" aria-hidden="true">' +
      '<header id="geos-chat-header">' +
      '<div id="geos-chat-brand">' +
      '<span id="geos-chat-logo">G</span>' +
      "<div><strong id=\"geos-chat-title\">Geosbau Assistent</strong>" +
      '<p id="geos-chat-status"><span id="geos-chat-dot"></span>Online</p></div>' +
      "</div>" +
      '<button type="button" id="geos-chat-close" aria-label="Chat schließen">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>' +
      "</button>" +
      "</header>" +
      '<div id="geos-chat-messages">' +
      '<div id="geos-chat-typing" aria-hidden="true"><span></span><span></span><span></span></div>' +
      "</div>" +
      '<div id="geos-chat-quick"></div>' +
      '<form id="geos-chat-form">' +
      '<label for="geos-chat-input" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Nachricht</label>' +
      '<input id="geos-chat-input" name="message" maxlength="' +
      MAX_CHARS +
      '" autocomplete="off" placeholder="Ihre Frage…" />' +
      '<button type="submit" id="geos-chat-send" aria-label="Senden">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4.5 12h13M12.5 6.5 19 12l-6.5 5.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      "</button>" +
      "</form>" +
      "</section>";

    document.body.appendChild(root);

    var trigger = document.getElementById("geos-chat-trigger");
    var box = document.getElementById("geos-chat-box");
    var closeBtn = document.getElementById("geos-chat-close");
    var messages = document.getElementById("geos-chat-messages");
    var typing = document.getElementById("geos-chat-typing");
    var form = document.getElementById("geos-chat-form");
    var input = document.getElementById("geos-chat-input");
    var quick = document.getElementById("geos-chat-quick");
    var history = [];
    var pending = false;

    QUICK.forEach(function (label) {
      var button = document.createElement("button");
      button.type = "button";
      button.className = "geos-chat-quick";
      button.textContent = label;
      button.addEventListener("click", function () {
        sendMessage(label);
      });
      quick.appendChild(button);
    });

    function addBubble(role, text) {
      var bubble = document.createElement("div");
      bubble.className = "geos-chat-bubble geos-chat-bubble--" + (role === "user" ? "user" : "bot");
      bubble.innerHTML = role === "user" ? escapeHtml(text) : linkify(text);
      messages.insertBefore(bubble, typing);
      messages.scrollTop = messages.scrollHeight;
    }

    function setOpen(open) {
      box.classList.toggle("is-open", open);
      box.setAttribute("aria-hidden", open ? "false" : "true");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      trigger.setAttribute("aria-label", open ? "Geosbau Assistent schließen" : "Geosbau Assistent öffnen");
      if (open && !messages.querySelector(".geos-chat-bubble")) addBubble("bot", WELCOME);
    }

    function setTyping(on) {
      typing.classList.toggle("is-visible", on);
      typing.setAttribute("aria-hidden", on ? "false" : "true");
      messages.scrollTop = messages.scrollHeight;
    }

    function sendMessage(text) {
      var value = String(text || "").trim();
      if (pending || !value || value.length > MAX_CHARS) return;
      pending = true;
      addBubble("user", value);
      history.push({ role: "user", content: value });
      history = history.slice(-HISTORY_LIMIT);
      quick.classList.add("is-hidden");
      setTyping(true);
      input.value = "";

      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ messages: history }),
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          var data = result.data || {};
          var reply = typeof data.reply === "string" ? data.reply : "";
          if (!result.ok || !reply) {
            reply = data.error || "Der Assistent ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.";
          }
          addBubble("bot", reply);
          if (result.ok && typeof data.reply === "string") {
            history.push({ role: "assistant", content: reply.slice(0, 280) });
            history = history.slice(-HISTORY_LIMIT);
          }
        })
        .catch(function () {
          addBubble("bot", "Der Assistent ist gerade nicht erreichbar. Bitte versuchen Sie es später erneut.");
        })
        .then(function () {
          setTyping(false);
          pending = false;
          messages.scrollTop = messages.scrollHeight;
        });
    }

    trigger.addEventListener("click", function () {
      setOpen(!box.classList.contains("is-open"));
    });
    closeBtn.addEventListener("click", function () {
      setOpen(false);
    });
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      sendMessage(input.value);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && box.classList.contains("is-open")) setOpen(false);
    });
  });
})();
