export function clsnm(...classNames: any[]) {
  const len = classNames.length;

  if (len === 0) return "";

  let resultClassName = classNames[0];

  for (let i = 1; i < len; i++) {
    const className = classNames[i];

    if (className && className !== true) {
      resultClassName += ` ${className}`;
    }
  }

  return resultClassName;
}
