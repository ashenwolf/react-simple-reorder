import React from "react";

import "./App.css";
import { Example1 } from "./examples/example1";
import { Example2 } from "./examples/example2";
import { Example3 } from "./examples/example3";

const App = () => {

  return (
    <div>
      <h2>Example 1</h2>
      <p>Simple drag-n-drop reorder.</p>
      <Example1 />
      <h2>Example 2</h2>
      <p>Nested block reorder (horizontal and vertical).</p>
      <Example2 />
      <h2>Example 3</h2>
      <p>Reordering custom components.</p>
      <Example3 />
    </div>
  )
}

export default App;
