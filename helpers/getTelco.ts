export default (phoneNumber: string): string | undefined => {
  if (
    ["25078", "78", "078", "079", "25079", "79"].some((prefix) =>
      phoneNumber?.startsWith(prefix)
    )
  )
    return "MTN_Rwanda";
  if (
    ["25073", "25072", "73", "72", "073", "072"].some((prefix) =>
      phoneNumber?.startsWith(prefix)
    )
  )
    return "Airtel_Rwanda";
  return undefined;
};
