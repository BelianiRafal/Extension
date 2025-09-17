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
  const customerContTable = document.querySelectorAll("center h3");

  const sortedTable = Array.from(customerContTable).find((text) => {
    return text.textContent.trim().toLowerCase().includes("newsmail history");
  });

  const findTable = sortedTable.nextElementSibling;

  const tableFooter = findTable.querySelectorAll("tfoot tr td");
  const tableBody = findTable.querySelectorAll('tbody [role="row"]');

  const originalTime = tableBody[1].children[0].textContent.split(" ")[0];
  console.log('Original', originalTime);

  // console.log(filteredTime.split(":")[2] <= 30);

  tableBody.forEach((item) => {

    const mytime = item.children[0].textContent.split(" ")[1];
    const myDate = item.children[0].textContent.split(" ")[0];

    console.log(originalTime === myDate);
    
    // mytime && mytime.split(":")[2] <= 30 ? console.log(item): console.log("Не совпадает");
  });

  const incrementTotal = tableBody[2].children[3].textContent;
  const totalFooter = tableFooter[1].textContent;

  // console.log(incrementTotal);
  // console.log(totalFooter);
  // console.log('Разница инкремента:', totalFooter - incrementTotal);
});





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



//!Доработать функцию сравнивания времени

// const originalTime = tableBody[1].children[0].textContent.split(" ")[0];
//       let found = false;

//       for (const item of tableBody) {
//         const filteredTime = item.children[0].textContent.split(" ")[1];
//         if (!filteredTime) continue;

//         console.log(filteredTime);

//         const filteredDate = item.children[0].textContent.split(" ")[0];

//         const splitedFilteredTime = filteredTime.split(":")[2];

//         if (filteredDate === originalTime && splitedFilteredTime <= 59 && customerContTable.length > 0) {
//           const incrementTotal = item.children[3].textContent;

//           if (totalFooter && incrementTotal) {
//             const resultEndForIncrement = totalFooter - incrementTotal;
//             if (index === 0 || index === 1 || index === 4) {
//               stateArr.push(resultEndForIncrement, Number(incrementTotal));
//             } else {
//               stateArr.push(Number(totalFooter));
//             }

//             found = true;
//           }
//           break;
//         }
//       }
//       if (found) {
//         clearInterval(waitResponse);
//         openWindow.close();
//         setTimeout(() => openTableForCustomer(openId, stateArr, index + 1), 500);
//       }

