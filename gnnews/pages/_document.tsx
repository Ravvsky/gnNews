import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" className="z-[3] absolute"></div>
      </body>
    </Html>
  );
}
