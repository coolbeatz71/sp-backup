export const formNamesValidator = (min: string, required: string) => [
  { min: 3, message: min },
  {
    required: true,
    message: required,
  },
];
