export default(phoneNumber: string): string | undefined => {
  if (["25078", "78"].some((prefix) => phoneNumber?.startsWith(prefix))) return "MTN_Rwanda";
  if (["25073", "25072", "73", "72"].some((prefix) => phoneNumber?.startsWith(prefix)))
    return "Airtel_Rwanda";
  return undefined;
};
