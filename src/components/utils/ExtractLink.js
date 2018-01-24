const extractLinkFunc = data => {
  data = data.toString();
  const matchIndex = data.search(/\s*http(s)?:\/\//);
  const result = { data };
  if (matchIndex !== -1) {
    result.data = data.substr(0, matchIndex);
    result.link = data.substr(matchIndex).trim();
  }

  return result;
};

export { 
  extractLinkFunc
};
