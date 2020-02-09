export const setLinkData = (link, linkData) => {
  const id = `${link.source}:::${link.target}`;
  let text = '';

  if (linkData[id]) {
    if (linkData[id].hoverData && linkData[id].hoverData.length > 0) {
      linkData[id].hoverData.forEach(metric => {
        // allows support for percentiles
        if (typeof metric.value === 'object' && metric.value !== null) {
          Object.keys(metric.value).forEach((key, i) => {
            const isLast = i + 1 === Object.keys(metric.value).length;
            const keyValue = isNaN(metric.value[key])
              ? metric.value[key]
              : metric.value[key].toFixed(2);
            text = `${text} ${key}: ${keyValue} ${isLast ? '' : '|'}`;
          });
        } else {
          const metricValue = isNaN(metric.value)
            ? metric.value
            : metric.value.toFixed(2);
          text = `${text}${metricValue} ${metric.name} `;
        }
      });
    } else if (linkData[id].externalSummary) {
      if (linkData[id].externalSummary.throughput)
        text += ` ${linkData[id].externalSummary.throughput} rpm`;
      if (linkData[id].externalSummary.responseTimeAverage)
        text += ` ${linkData[id].externalSummary.responseTimeAverage} ms`;
    }
  }

  return text;
};
