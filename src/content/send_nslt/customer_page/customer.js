const secondBtn = document.createElement("button");
secondBtn.className = "secondBtn";
secondBtn.textContent = "SECOND BTN";

document.body.append(secondBtn);

const thirtyBtn = document.createElement("button");
thirtyBtn.className = "thirtyBtn";
thirtyBtn.textContent = "THIRTY BTN";

document.body.append(thirtyBtn);

secondBtn.addEventListener("click", () => {
  console.log("secondBtn");
});

thirtyBtn.addEventListener("click", () => {
  const arrayRow = [];
  const customerContTable = document.querySelectorAll("center h3");

  const sortedTable = Array.from(customerContTable).find((text) => {
    return text.textContent.trim().toLowerCase().includes("newsmail history");
  });

  const findTable = sortedTable.nextElementSibling;

  const tableFooter = findTable.querySelectorAll("tfoot tr td");
  const tableBody = findTable.querySelectorAll('tbody [role="row"]');

  const [originalDate, originalTime] = tableBody[tableBody.length - 2].children[0].textContent.split(" ");
  const splitOriginalTIme = originalTime.split(":")[1];
  console.log("Original time", splitOriginalTIme);
  console.log("Original date", originalDate);

  // console.log(filteredTime.split(":")[2] <= 30);

  tableBody.forEach((item) => {
    const text = item.children[0].textContent.trim();
    // может быть "16.09.2025 14:35:29" или "14:35:29"

    let myDate, myTime;

    if (text.includes(" ")) {
      [myDate, myTime] = text.split(" ");
    } else {
      myTime = text;
    }

    const [hh, mm, ss] = myTime.split(":").map(Number);

    console.log(splitOriginalTIme);

    console.log(ss);
    // console.log(mytimeeeeeee.split(" "));

    // console.log(splitOriginalTIme > splitOriginalTIme - myTime.split(":")[1]);

    //!Просчитать еще разницу в 30 секунд и сравнивать!
    
    if (originalDate === myDate && Number(splitOriginalTIme) === mm || Number(splitOriginalTIme) === mm + 1) {
      arrayRow.push(item);
    }

    // mytime && mytime.split(":")[2] <= 30 ? console.log(item): console.log("Не совпадает");
  });

  console.log('Massiv,', arrayRow);

  const incrementTotal = tableBody[2].children[3].textContent;
  const totalFooter = tableFooter[1].textContent;

  // console.log(incrementTotal);
  // console.log(totalFooter);
  // console.log('Разница инкремента:', totalFooter - incrementTotal);
});







//! Worked functions, if need, 
//! paste this code after tableBody in "openTableForCustomer" functions

// const incrementTotal = tableBody[2].children[3].textContent;
// const totalFooter = tableFooter[1].textContent;

// if (customerContTable.length > 0 && totalFooter && incrementTotal) {
//   const resultEndForIncrement = totalFooter - incrementTotal;
//   if (index === 0 || index === 1 || index === 4) {
//     stateArr.push(resultEndForIncrement, Number(incrementTotal));
//   } else {
//     stateArr.push(Number(totalFooter));
//   }

//   clearInterval(waitResponse);
//   openWindow.close();
// }
