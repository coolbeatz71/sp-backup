export const phonePrefixes: string[] = ["250"];

export const formattedPhonePrefixes: { value: string, text: string}[] = phonePrefixes.map((prefix) => ({
  value: prefix,
  text: `+${prefix}`,
}));
