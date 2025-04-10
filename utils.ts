import { createDefine } from "fresh";
export * from "./src/posts.ts";

// deno-lint-ignore no-empty-interface
export interface State {}

export const define = createDefine<State>();
