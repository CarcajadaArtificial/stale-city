import { ComponentChildren } from "preact";

export default function (
  props: { children: ComponentChildren; inverted?: boolean },
) {
  return (
    <div style={{ background: "var(--gradient)" }}>
      <div
        style={{
          background: `linear-gradient(${
            props.inverted ? "0deg" : "180deg"
          }, #0000 10%, var(--clr-page) 100%)`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
