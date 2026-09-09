(function () {
  if (window.__geosChatLoaded) return;
  window.__geosChatLoaded = true;

  var HISTORY_LIMIT = 4;
  var MAX_CHARS = 800;
  var QUICK = ["Was kostet eine Entrümpelung?", "Wohnung räumen lassen", "Umzug & Haushaltsauflösung"];
  var FOLLOW = [
    {
      keys: ["preis", "kostet", "kosten", "fixpreis", "euro", "teuer", "angebot"],
      next: ["Ist die Besichtigung kostenlos?", "Was ist im Festpreis enthalten?"],
    },
    {
      keys: ["wohnung", "wohnungsraumung", "besenrein", "auszug", "mietwohnung"],
      next: ["Besenrein übergeben – wie geht das?", "Keller oder Dachboden miträumen?"],
    },
    {
      keys: ["umzug", "haushalt", "aufloesung", "nachlass", "verlassenschaft"],
      next: ["Was kostet eine Haushaltsauflösung?", "Entrümpelung vor dem Umzug?"],
    },
    {
      keys: ["keller", "dachboden", "speicher", "garage"],
      next: ["Sperrmüll oder Recyclinghof?", "Was kostet eine Kellerentrümpelung?"],
    },
    {
      keys: ["entruempel", "raeum", "moebel", "entsorg"],
      next: ["Was kostet eine Entrümpelung?", "Wie plane ich den Ablauf?"],
    },
    {
      keys: ["sofort", "partner", "besicht", "termin", "firma"],
      next: ["Was kostet eine Entrümpelung?", "Wie schnell gibt es einen Termin?"],
    },
  ];
  var DEFAULT_NEXT = [
    "Ist die Besichtigung kostenlos?",
    "Was kostet eine Entrümpelung?",
    "Wohnung räumen lassen",
    "Umzug & Haushaltsauflösung",
    "Wie plane ich den Ablauf?",
  ];
  var WELCOME =
    "Guten Tag. geosbau.at ist ein unabhängiger Ratgeber zu Entrümpelung, Räumung und Umzug. Womit darf ich Ihnen helfen?";

  function cssHref() {
    var scripts = document.getElementsByTagName("script");
    for (var i = 0; i < scripts.length; i += 1) {
      var src = scripts[i].src || "";
      if (src.indexOf("chat-widget.js") !== -1) {
        return src.replace("chat-widget.js", "chat-widget.css");
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

  function canonicalizeLinks(text) {
    return String(text || "")
      .replace(/\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/gi, "$1")
      .replace(
        /[\(\[\{<"'\u201e\u00ab]*\s*(?:https?:\/\/)?(?:www\.)?(sofortentrumpelung\.at|geosbau\.at)(\/[A-Za-z0-9\-_\/]*)?\s*[\)\]\}>"'\u201c\u00bb.,;:!?…]*/gi,
        function (_full, host, path) {
          var safePath = (path || "").replace(/[^A-Za-z0-9\-_\/]/g, "");
          return " https://" + String(host).toLowerCase() + safePath + " ";
        },
      )
      .replace(/[ \t]{2,}/g, " ");
  }

  function linkify(text) {
    return escapeHtml(canonicalizeLinks(text)).replace(
      /https:\/\/(?:sofortentrumpelung\.at|geosbau\.at)(?:\/[A-Za-z0-9\-_\/]*)?/gi,
      function (href) {
        return '<a href="' + href + '" target="_blank" rel="noopener">' + href + "</a>";
      },
    );
  }

  ready(function () {
    if (document.getElementById("geos-chat-root")) return;

    var root = document.createElement("div");
    root.id = "geos-chat-root";
    root.innerHTML =
      '<button type="button" id="geos-chat-trigger" aria-controls="geos-chat-box" aria-expanded="false" aria-label="Geosbau Assistent öffnen">' +
      '<img id="geos-chat-mascot" src="/mascot.png" alt="" width="118" height="163" />' +
      '<span id="geos-chat-oval">' +
      '<svg class="geos-chat-icon-open" width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="3.1" r="1.35" fill="#E3C56A"/><path d="M12 4.4v1.7" stroke="#E3C56A" stroke-width="1.8" stroke-linecap="round"/><rect x="3.1" y="10.2" width="2.3" height="4.4" rx="1.15" fill="#E3C56A"/><rect x="18.6" y="10.2" width="2.3" height="4.4" rx="1.15" fill="#E3C56A"/><rect x="5.1" y="6.4" width="13.8" height="12.2" rx="3.4" fill="#E3C56A"/><rect x="7.9" y="10.1" width="2.7" height="3.4" rx="1.25" fill="#0B1F33"/><rect x="13.4" y="10.1" width="2.7" height="3.4" rx="1.25" fill="#0B1F33"/><path d="M9.1 16h5.8" stroke="#0B1F33" stroke-width="1.7" stroke-linecap="round"/></svg>' +
      '<svg class="geos-chat-icon-close" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="#0B1F33" stroke-width="2.2" stroke-linecap="round"/></svg>' +
      "</span>" +
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
      "</section>" +
      '<button type="button" id="geos-chat-hint" aria-hidden="true">1 neue Nachricht</button>';

    document.body.appendChild(root);

    var trigger = document.getElementById("geos-chat-trigger");
    var box = document.getElementById("geos-chat-box");
    var closeBtn = document.getElementById("geos-chat-close");
    var messages = document.getElementById("geos-chat-messages");
    var typing = document.getElementById("geos-chat-typing");
    var form = document.getElementById("geos-chat-form");
    var input = document.getElementById("geos-chat-input");
    var quick = document.getElementById("geos-chat-quick");
    var hint = document.getElementById("geos-chat-hint");
    var history = [];
    var pending = false;
    var askedSet = {};

    function normalize(value) {
      return String(value || "")
        .toLowerCase()
        .replace(/ä/g, "ae")
        .replace(/ö/g, "oe")
        .replace(/ü/g, "ue")
        .replace(/ß/g, "ss");
    }

    function followUpsFor(asked) {
      var text = normalize(asked);
      var picked = [];
      var i;
      var j;
      var item;
      var candidate;
      for (i = 0; i < FOLLOW.length; i += 1) {
        item = FOLLOW[i];
        for (j = 0; j < item.keys.length; j += 1) {
          if (text.indexOf(item.keys[j]) !== -1) {
            for (var k = 0; k < item.next.length; k += 1) {
              candidate = item.next[k];
              if (!askedSet[normalize(candidate)] && picked.indexOf(candidate) === -1) {
                picked.push(candidate);
              }
            }
          }
        }
      }
      for (i = 0; i < DEFAULT_NEXT.length && picked.length < 2; i += 1) {
        candidate = DEFAULT_NEXT[i];
        if (!askedSet[normalize(candidate)] && picked.indexOf(candidate) === -1) {
          picked.push(candidate);
        }
      }
      return picked.slice(0, 2);
    }

    function renderQuick(labels) {
      quick.innerHTML = "";
      quick.classList.remove("is-hidden");
      (labels || []).forEach(function (label) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "geos-chat-quick is-new";
        button.textContent = label;
        button.addEventListener("click", function () {
          sendMessage(label);
        });
        quick.appendChild(button);
      });
    }

    renderQuick(QUICK);

    function addBubble(role, text) {
      var bubble = document.createElement("div");
      bubble.className = "geos-chat-bubble geos-chat-bubble--" + (role === "user" ? "user" : "bot");
      bubble.innerHTML = role === "user" ? escapeHtml(text) : linkify(text);
      messages.insertBefore(bubble, typing);
      messages.scrollTop = messages.scrollHeight;
    }

    function hideHint() {
      hint.classList.remove("is-visible");
      hint.setAttribute("aria-hidden", "true");
      trigger.classList.remove("has-nudge");
    }

    function setOpen(open) {
      box.classList.toggle("is-open", open);
      box.setAttribute("aria-hidden", open ? "false" : "true");
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      trigger.setAttribute("aria-label", open ? "Geosbau Assistent schließen" : "Geosbau Assistent öffnen");
      if (open) {
        hideHint();
        try {
          sessionStorage.setItem("geosChatOpened", "1");
        } catch (err) {}
        if (!messages.querySelector(".geos-chat-bubble")) addBubble("bot", WELCOME);
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
      askedSet[normalize(value)] = true;
      history.push({ role: "user", content: value });
      history = history.slice(-HISTORY_LIMIT);
      renderQuick(followUpsFor(value));
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
          renderQuick(followUpsFor(value));
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
    hint.addEventListener("click", function () {
      setOpen(true);
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

    var alreadyOpened = false;
    try {
      alreadyOpened = sessionStorage.getItem("geosChatOpened") === "1";
    } catch (err) {}
    if (!alreadyOpened) {
      window.setTimeout(function () {
        if (!box.classList.contains("is-open")) {
          hint.classList.add("is-visible");
          hint.setAttribute("aria-hidden", "false");
          trigger.classList.add("has-nudge");
        }
      }, 3500);
    }
  });
})();
