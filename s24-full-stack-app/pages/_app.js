import { StateContext } from "@/context/StateContext";
import { createGlobalStyle } from "styled-components"
import Colors from "../library/Colors";

export const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;

  ::-webkit-scrollbar {
    width: 1vw;
    height: 1vw;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${Colors.primary}; 
    border-radius: 1vw;
  }

  ::-webkit-scrollbar-track {
    background-color: ${Colors.accentDark};
    border-radius: 1vw;
  }
}
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <StateContext>
        <Component {...pageProps} />
      </StateContext>
    </>
  );
}
