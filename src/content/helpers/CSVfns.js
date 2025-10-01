// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi",
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      var strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}

// merging csv into one object to create a loop in mustache (Banner_N, Timer_N)
function processCampaignsFromCSV(csvRow, headers) {
  const campaigns = [];

  // up to 6 campaigns, we don't need more
  for (let i = 1; i <= 6; i++) {
    const srcCol = headers.indexOf(`Banner_${i}_src`);
    const hrefCol = headers.indexOf(`Banner_${i}_href`);

    const timerCol = headers.indexOf(`Timer_${i}`);
    const timerSrcCol = headers.indexOf(`Timer_${i}_src`);
    const timerFreebieCol = headers.indexOf(`Timer_${i}_freebie`);
    const timerBgCol = headers.indexOf(`Timer_${i}_bg`);
    const timerColorCol = headers.indexOf(`Timer_${i}_color`);

    if (srcCol !== -1 && csvRow[srcCol]) {
      const timerUrl =
        (timerCol !== -1 ? csvRow[timerCol] : "") ||
        (timerSrcCol !== -1 ? csvRow[timerSrcCol] : "");

      const freebie = timerFreebieCol !== -1 ? csvRow[timerFreebieCol] : "";

      const campaign = {
        src: csvRow[srcCol],
        href: csvRow[hrefCol] || "",
        timer_url: timerUrl,
        timer_bg: timerBgCol !== -1 ? csvRow[timerBgCol] : "#750000",
        timer_color: timerColorCol !== -1 ? csvRow[timerColorCol] : "#FFFFFF",
        hasTimer: !!timerUrl,
        freebie: freebie,
      };

      campaigns.push(campaign);
    }
  }

  // add .last property to the last campaign to remove spacing in the template
  if (campaigns.length > 0) {
    campaigns[campaigns.length - 1].last = true;
  }

  return { campaigns };
}

function csvRowToTemplateData(csvRow, headers) {
  const data = {};

  headers.forEach((header, index) => {
    if (csvRow[index] !== undefined && csvRow[index] !== "") {
      data[header] = csvRow[index];
    }
  });

  const { campaigns } = processCampaignsFromCSV(csvRow, headers);
  data.campaigns = campaigns;

  campaigns.forEach((campaign, index) => {
    const num = index + 1;
    data[`Banner_${num}_src`] = campaign.src;
    data[`Banner_${num}_href`] = campaign.href;
    data[`Timer_${num}_src`] = campaign.timer_url;
    data[`Timer_${num}_bg`] = campaign.timer_bg;
    data[`Timer_${num}_color`] = campaign.timer_color;
    data[`Timer_${num}_freebie`] = campaign.freebie;
  });

  return data;
}

function parseCSV2(str) {
  const arr = [];
  let quote = false; // 'true' means we're inside a quoted field

  // Iterate over each character, keep track of current row and column (of the returned array)
  for (let row = 0, col = 0, c = 0; c < str.length; c++) {
    let cc = str[c],
      nc = str[c + 1]; // Current character, next character
    arr[row] = arr[row] || []; // Create a new row if necessary
    arr[row][col] = arr[row][col] || ""; // Create a new column (start with empty string) if necessary

    // If the current character is a quotation mark, and we're inside a
    // quoted field, and the next character is also a quotation mark,
    // add a quotation mark to the current column and skip the next character
    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }

    // If it's just one quotation mark, begin/end quoted field
    if (cc == '"') {
      quote = !quote;
      continue;
    }

    // If it's a comma and we're not in a quoted field, move on to the next column
    if (cc == "," && !quote) {
      ++col;
      continue;
    }

    // If it's a newline (CRLF) and we're not in a quoted field, skip the next character
    // and move on to the next row and move to column 0 of that new row
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }

    // If it's a newline (LF or CR) and we're not in a quoted field,
    // move on to the next row and move to column 0 of that new row
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    // Otherwise, append the current character to the current column
    arr[row][col] += cc;
  }
  return arr;
}

function parseCSV(csv) {
  const [cols] = csv;
  const parsedCSV = {};
  for (let index = 1; index < csv.length; index++) {
    const arr = csv[index];
    const obj = {};

    for (let i = 0; i < arr.length; i++) {
      obj[cols[i].toLowerCase()] = arr[i];
    }

    parsedCSV[arr[0].toLowerCase()] = obj;
  }

  return parsedCSV;
}
