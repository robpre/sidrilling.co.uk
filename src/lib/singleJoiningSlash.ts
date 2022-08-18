export const singleJoiningSlash = (a: string, b: string): string => {
  const aSlash = a.endsWith("/");
  const bSlash = b.startsWith("/");

  if (aSlash && bSlash) {
    return a + b.slice(1);
  }

  if (!aSlash && !bSlash) {
    return `${a}/${b}`;
  }

  return a + b;
};
