const getFormatedTime = (date, locale, formatOptions) =>
  date.toLocaleTimeString([locale], formatOptions);


export { 
  getFormatedTime
};
