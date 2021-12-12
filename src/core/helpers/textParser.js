
const FORMATS = {
  hashtags: {
    fits: word => word.startsWith('#'),
    transform: word => `<div class="js__hasgtag">${word}</div>`,
    transformBack: str => {
      let newStr = str;
      let matchAll = str.matchAll(/<div class="js__hasgtag">(.*?)<\/div>/gi);
      matchAll = Array.from(matchAll);
      matchAll.forEach((matched) => {
        newStr = newStr.replace(`<div class="js__hasgtag">${matched[1]}</div>`, matched[1]);
      });
      return newStr;
    }
  },
  mentions: {
    fits: word => word.startsWith('@'),
    transform: (word: string, dictionaries: any) => {
      if (word.startsWith('@{{') && word.includes('}}')) {
        let [data, elseWord] = word.split('}}');
        data = data.replace(/@{{/gi, '');
        elseWord = elseWord.replace('&nbsp;', ' ');
        const parsed = data.split('::');
        let content;
        if (dictionaries.mentions && parsed[1]) {
          content = (dictionaries.mentions.find(item => item.id === parsed[1]) || {}).display;
        }
        if (!content) {
          [content] = parsed;
          content = content.replace('_', ' ');
        }
        data = `@{{${data}}}`;
        return `<div class="js__mention" data-mention="${data}" data-id="${parsed[1]}">@${content}</div> ${elseWord}`;
      }
      return `<div class="_mention-suggestion_">${word}</div>`;;
    },
    transformBack: (str: string, dictionaries: any) => {
      let newStr = str;
      let matchAllMentions = str.matchAll(/<div class="js__mention" data-mention="(.*?)<\/div>/gi);
      matchAllMentions = Array.from(matchAllMentions);
      matchAllMentions.forEach((matched) => {
        const [data] = matched[1].split('"');
        let parsed = data.replace(/@{{/gi, '');
        parsed = parsed.replace(/}}/gi, '');
        parsed = parsed.split('::');
        let content;
        if (dictionaries.mentions && parsed[1]) {
          content = (dictionaries.mentions.find(item => item.id === parsed[1]) || {}).display;
        }
        if (!content) {
          [content] = parsed;
          content = content.replace('_', ' ');
        }
        const text = matched[1].split('>@')[1] || '';
        const replaced = !text.startsWith(content) ? '' : (data + text.replace(content, ''));
        newStr = newStr.replace(`<div class="js__mention" data-mention="${matched[1]}</div>`, replaced);
      });
      let matchAllSuggestions = str.matchAll(/<div class="_mention-suggestion_">(.*?)<\/div>/gi);
      matchAllSuggestions = Array.from(matchAllSuggestions);
      matchAllSuggestions.forEach((matched) => {
        newStr = newStr.replace(`<div class="_mention-suggestion_">${matched[1]}</div>`, matched[1]);
      });
      return newStr;
    }
  }
};

export const formatText = (text: any, formats: any[] = [], dictionaries: any = {}) => {
  let formatted = text || '';
  if (formats && formats.length) {
    let lines = formatted.split(/<br>/);
    lines = lines.map(line => {
      let words = line.split(/[\s\u00A0]+/);
      formats.forEach(format => {
        const FORMAT = FORMATS[format];
        if (!FORMAT) return;
        words = words.map(word => {
          if (FORMAT.fits(word)) {
            return FORMAT.transform(word, dictionaries);
          }
          return word;
        });
      });
      return words.join(' ');
    });
    formatted = lines.join('<br>');
  }
  return formatted;
};

export const reformatText = (text: any, formats: any[] = [], dictionaries: any = {}) => {
  let formatted = text || '';
  formatted = formatted.replace(/&nbsp;<div/gi, ' <div');
  if (formats && formats.length) {
    formats.forEach(format => {
      const FORMAT = FORMATS[format];
      if (!FORMAT) return;
      formatted = FORMAT.transformBack(formatted, dictionaries);
    });
  }
  return formatted;
};
