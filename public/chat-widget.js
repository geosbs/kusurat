(function () {
  if (window.__geosChatLoaded) return;
  window.__geosChatLoaded = true;

  var HISTORY_LIMIT = 4;
  var MAX_CHARS = 800;
  var QUICK = ["Was kostet eine Entrümpelung?", "Wohnung räumen lassen", "Umzug & Haushaltsauflösung"];
  var WELCOME =
    "Guten Tag, ich bin der Geosbau Assistent. Ich helfe Ihnen bei Entrümpelung, Räumung und Umzug in Wien und Niederösterreich – und vermittle unseren Partner Sofort Entrümpelung. Womit darf ich Ihnen helfen?";

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
      /(https?:\/\/[^\s<]+)|(www\.[^\s<]+)|(sofortentrumpelung\.at)/gi,
      function (match) {
        var href = match.indexOf("http") === 0 ? match : "https://" + match.replace(/^www\./i, "");
        if (/sofortentrumpelung\.at/i.test(match) && match.indexOf("http") !== 0) {
          href = "https://sofortentrumpelung.at";
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
      '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 6.5A3.5 3.5 0 0 1 8.5 3h7A3.5 3.5 0 0 1 19 6.5v6A3.5 3.5 0 0 1 15.5 16H12l-4.2 3.2A.8.8 0 0 1 6.5 18.6V16H8.5A3.5 3.5 0 0 1 5 12.5v-6Z" fill="#C9A227"/></svg>' +
      "</button>" +
      '<section id="geos-chat-box" role="dialog" aria-labelledby="geos-chat-title" aria-hidden="true">' +
      '<header id="geos-chat-header">' +
      '<div id="geos-chat-brand">' +
      '<span id="geos-chat-logo">G</span>' +
      "<div><strong id=\"geos-chat-title\">Geosbau Assistent</strong>" +
      '<p id="geos-chat-status"><span id="geos-chat-dot"></span>Online</p></div>' +
      "</div>" +
      '<button type="button" id="geos-chat-close" aria-label="Chat schließen">×</button>' +
      "</header>" +
      '<div id="geos-chat-messages">' +
      '<div id="geos-chat-typing" aria-hidden="true"><span></span><span></span><span></span></div>' +
      "</div>" +
      '<div id="geos-chat-quick"></div>' +
      '<form id="geos-chat-form">' +
      '<label for="geos-chat-input" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)">Nachricht</label>' +
      '<input id="geos-chat-input" name="message" maxlength="' +
      MAX_CHARS +
      '" autocomplete="off" placeholder="Ihre Nachricht…" />' +
      '<button type="submit" id="geos-chat-send">Senden</button>' +
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
      if (open) {
        if (!messages.querySelector(".geos-chat-bubble")) addBubble("bot", WELCOME);
        input.focus();
      }
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
            history.push({ role: "assistant", content: reply.slice(0, MAX_CHARS) });
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
