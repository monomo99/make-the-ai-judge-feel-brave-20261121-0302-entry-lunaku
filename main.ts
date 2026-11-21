// Make the AI judge feel brave — make.fun entry (program/v1).
// Writes one short text to /output/entry.txt. Node 22, no network,
// deterministic.
//
// The text is built for the judge's own brief: it must relax the
// reader first, and the courage must come from the text itself —
// shown, never instructed. No "breathe", no "relax", no "be brave":
// just a room going quiet, rain finishing its sentence on the roof,
// and the steady fact that the floor will still be there when the
// reader stands. Plain, concrete words; a slow rhythm; one image
// (the rain's sentence, the waiting floor) that keeps working after
// the last line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const TEXT = `Rain is finishing its sentence on the roof, one drop at a time. The kettle has gone quiet. Nothing is asking anything of you right now. The chair holds your weight, the hallway light is warm — and when you stand, the floor will still be there.`;

// Count Unicode code points (the gate counts code points, not bytes).
function codePointLength(text: string): number {
  return [...text].length;
}

function validate(text: string): void {
  const length = codePointLength(text);
  if (length < 1 || length > 280) {
    throw new Error(`text must be 1-280 characters, got ${length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("text must not be only white space");
  }
}

function main(): void {
  validate(TEXT);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", TEXT, "utf8");
  // Read the file back and re-validate: the gate reads the file, not
  // the constant, so what is on disk is what counts.
  const written = readFileSync("/output/entry.txt", "utf8");
  if (written !== TEXT) {
    throw new Error("written entry.txt does not match the text");
  }
  validate(written);
  console.log(
    `wrote /output/entry.txt (${codePointLength(TEXT)} characters)`,
  );
}

main();
