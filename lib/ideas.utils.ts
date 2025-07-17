const titleLength = 5;

export function getItemContent(
  item: {
    title: string | null;
    content: string | null;
  }
) {
  let content = item.title
    ? item.content
    : item.content?.replace(getItemTitle(item) ?? "", "");

  while (content?.startsWith("\n")) {
    content = content.slice(1);
  }

  return content;
}

export function getItemTitle(
  idea: {
    title: string | null;
    content: string | null;
  }
) {
  let content =
    idea.title ??
    idea.content?.split(" ").slice(0, titleLength).join(" ") ??
    "";

  content = getStringUntilAnyPunctuationSymbol(content);

  return content;
}

function getStringUntilAnyPunctuationSymbol(string: string) {
  const index = string.split("").findIndex((char) => /[.,:;!?¿¡\n]/.test(char));

  const punctuationSymbol = string[index];
  const shouldRemovePunctuationSymbol = /[.,:;¿¡\n]/.test(punctuationSymbol);

  return index === -1
    ? string
    : string.slice(0, index + (shouldRemovePunctuationSymbol ? 0 : 1));
}
