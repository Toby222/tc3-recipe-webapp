import React from "react";

export class ToggleDarkModeButtonComponent extends React.Component {
  render() {
    return (
      <button
        id="toggleDarkModeButton"
        onClick={() => {
          const prefersDark = globalThis.document.body.classList.toggle("dark");
          globalThis.document.body.classList.toggle("light");

          globalThis.localStorage.setItem(
            "prefersDark",
            prefersDark.toString()
          );
        }}
      >
        Toggle Dark Mode
      </button>
    );
  }
}
