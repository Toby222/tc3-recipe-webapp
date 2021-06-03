import React from "react";
/**
 * Hat tip to PumBaa80 http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
 * for the syntax highlighting function.
 **/

export function outputPretty(json: string | Record<string, unknown>) {
  if (typeof json === "string") {
    // prettify spacing
    const formattedJSON = JSON.stringify(JSON.parse(json), null, 2);
    // syntaxhighlight the pretty print version
    return syntaxHighlight(formattedJSON);
  } else {
    // let syntaxHighlight handle it
    return syntaxHighlight(json);
  }
}

export function syntaxHighlight(json: string | Record<string, unknown>) {
  if (typeof json !== "string") {
    json = JSON.stringify(json, null, 2);
  }

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json
    .match(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|([^\s]+)|([\s]+))/g
    )
    ?.map((match, idx) => {
      let cls: string;
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "jsonKey";
        } else {
          cls = "jsonString";
        }
      } else if (/true|false/.test(match)) {
        cls = "jsonBoolean";
      } else if (/null/.test(match)) {
        cls = "jsonNull";
      } else if (/[0-9]+/.test(match)) {
        cls = "jsonNumber";
      } else if (/\s+/.test(match)) {
        cls = "jsonWhitespace";
      } else {
        cls = "jsonText";
      }
      return (
        <span className={cls} key={idx}>
          {match}
        </span>
      );
    });
}
