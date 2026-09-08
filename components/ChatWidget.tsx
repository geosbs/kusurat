import Script from "next/script";

export function ChatWidget() {
  return <Script src="/chat-widget.js?v=12" strategy="afterInteractive" />;
}
