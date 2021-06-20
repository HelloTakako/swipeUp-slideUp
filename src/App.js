import { useState, useRef } from "react";
import "./App.css";
import styled from "@emotion/styled";

function App() {
  const [testText, setTestText] = useState("not touched");
  const [touchStartPosition, setTouchStartPosition] = useState();

  const swipedContentsRef = useRef();

  const handleTouchMove = (e) => {
    // if the touch position is below the half of the screen
    if (touchStartPosition > window.innerHeight / 2) {
      swipedContentsRef.current.style.top = `${e.changedTouches[0].clientY}px`;
      if (e.changedTouches[0].clientY < window.innerHeight / 2) {
        swipedContentsRef.current.style.top = 0;
      }
    } else if (touchStartPosition < window.innerHeight / 2) {
      // if the touch position is above the half of the screen
      swipedContentsRef.current.style.top = `${e.changedTouches[0].clientY}px`;
      if (e.changedTouches[0].clientY < window.innerHeight / 2) {
        // the contents cover the screen
        swipedContentsRef.current.style.top = `calc(100vh - ${handleHeight})`;
      }
    }

    setTestText("moving");
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches[0].clientY > window.innerHeight / 2) {
      swipedContentsRef.current.style.top = `calc(100vh - ${handleHeight})`;
      if (e.changedTouches[0].clientY < window.innerHeight / 2) {
        swipedContentsRef.current.style.top = 0;
      }
    }
    setTestText("ended");
  };

  // TODO:
  // - check the difference of event objects' pageY, clientY, screenY
  // - search the default bottom navbar & URL bar of iOS
  // (it causes the difference between view on chrome devtools' responsive view & iOS simulator)

  return (
    <Wrapper>
      <p>{testText}</p>
      <SwipedContents ref={swipedContentsRef}>
        <Handle
          onTouchStart={(e) =>
            setTouchStartPosition(e.changedTouches[0].clientY)
          }
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        <SwipedText>
          Here are some examples of what you can achieve with the Extension API:
          Change the look of VS Code with a color or file icon theme - Theming
          Add custom components &amp; views in the UI - Extending the Workbench
          Create a Webview to display a custom webpage built with HTML/CSS/JS -
          Webview Guide Support a new programming language - Language Extensions
          Overview Support debugging a specific runtime - Debugger Extension
          Guide If you'd like to have a more comprehensive overview of the
          Extension API, refer to the Extension Capabilities Overview page.
          Extension Guides Overview also includes a list of code samples and
          guides that illustrate various Extension API usage.
        </SwipedText>
      </SwipedContents>
    </Wrapper>
  );
}

const handleHeight = "15vh";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #ddd;
`;

const SwipedContents = styled.div`
  position: fixed;
  cubic-bezier(0.680, -0.550, 0.265, 1.550); 
  transition: all 250ms cubic-bezier(0.860, 0.000, 0.070, 1.000);
  top: calc(100vh - ${handleHeight}); // only <Handle /> is visible
`;

const Handle = styled.div`
  background-color: #444;
  height: ${handleHeight};
  border-radius: 20px 20px 0 0;
  position: relative;

  // the line in the middle
  &:after {
    content: "";
    display: block;
    height: 5px;
    width: 60px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const SwipedText = styled.div`
  background-color: #444;
  color: #fff;
  padding: 5vw;
  height: calc(100vh - ${handleHeight});
  overflow: auto;
`;

export default App;
