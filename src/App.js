import React, { useImperativeHandle, useRef, useState } from "react";
import "./App.css";

const Input = React.forwardRef(({ value, onChange }, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      focusField() {
        inputRef.current.focus();
      },
    };
  });
  return <input ref={inputRef} type="text" value={value} onChange={onChange} />;
});

function List() {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setList((ls) => [...ls, input]);
    setInput("");
    inputRef.current.focusField();
  };

  return (
    <React.Fragment>
      <ul>
        {list.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </React.Fragment>
  );
}

function App() {
  return (
    <div className="App">
      <List />
    </div>
  );
}

export default App;
