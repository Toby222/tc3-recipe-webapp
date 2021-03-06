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

const JSON_REGEX = new RegExp(
  [
    String.raw`(?<key>"(?:\\u[a-zA-Z0-9]{4}|[^\\"])*"(?=\s*:))`,
    String.raw`(?<string>"(?:\\u[a-zA-Z0-9]{4}|[^\\"])*")`,
    String.raw`\b(?<bool>true|false)\b`,
    String.raw`\b(?<null>null)\b`,
    String.raw`(?<number>-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)`,
    String.raw`(?<whitespace>\s+)`,
    String.raw`(?<control>(?:[:,\{\}\[]|])+)`,
    String.raw`(?<comment>\/\/[^\n\r]*|\/\*(?:.|[\n\r])*?\*\/)`,
    String.raw`(?<invalid>.+)`,
  ].join("|"),
  "g"
);

type JSONMatch = Omit<RegExpMatchArray, "groups"> & {
  groups: {
    key?: string;
    string?: string;
    bool?: string;
    number?: string;
    control?: string;
    whitespace?: string;
    null?: string;
    comment?: string;
  };
};

export function syntaxHighlight(json: string | Record<string, unknown>) {
  if (typeof json !== "string") {
    json = JSON.stringify(json, null, 2);
  }

  const keys = {
    jsonBoolean: 0,
    jsonComment: 0,
    jsonControl: 0,
    jsonInvalid: 0,
    jsonKey: 0,
    jsonNull: 0,
    jsonNumber: 0,
    jsonString: 0,
    jsonWhitespace: 0,
  };

  const matches = Array.from(json.matchAll(JSON_REGEX));
  return matches.map((match) => {
    if (!match.groups) {
      return <>No groups?</>;
    }
    const jsonMatch = match as JSONMatch;
    let cls: keyof typeof keys;

    if (jsonMatch.groups.key !== undefined) {
      cls = "jsonKey";
    } else if (jsonMatch.groups.string !== undefined) {
      cls = "jsonString";
    } else if (jsonMatch.groups.bool !== undefined) {
      cls = "jsonBoolean";
    } else if (jsonMatch.groups.null !== undefined) {
      cls = "jsonNull";
    } else if (jsonMatch.groups.number !== undefined) {
      cls = "jsonNumber";
    } else if (jsonMatch.groups.whitespace !== undefined) {
      cls = "jsonWhitespace";
    } else if (jsonMatch.groups.control !== undefined) {
      cls = "jsonControl";
    } else if (jsonMatch.groups.comment !== undefined) {
      cls = "jsonComment";
    } else {
      cls = "jsonInvalid";
    }

    return (
      <span className={cls} key={cls + "-" + keys[cls]++}>
        {jsonMatch[0]}
      </span>
    );
  });
}
