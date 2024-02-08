import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
}
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
