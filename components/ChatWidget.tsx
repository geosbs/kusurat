import Script from "next/script";

export function ChatWidget() {
  return <Script src="/chat-widget.js?v=4" strategy="afterInteractive" />;
}
