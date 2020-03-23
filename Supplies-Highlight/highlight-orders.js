(totalAmountPlusHighlight = (
  bgColorOne,
  bgColorTwo,
  bgColorThree,
  bgColorFour
) => {
  var count = 0,
    date = new Date(),
    day = date.getDate(),
    month = date.getMonth() + 1;
  document.querySelectorAll("table#tableProducts>tbody tr").forEach(el => {
    if (el.hasAttribute("class")) {
      count += +el.children[8].innerText;
      if (parseInt(el.children[5].innerText.split(".")[1]) > month) {
        // цвет даты на последующие месяца (пусто)
        el.children[5].parentElement.style.backgroundColor = bgColorOne;
      } else if (
        +el.children[5].innerText.split(".")[0] < day ||
        parseInt(el.children[5].innerText.split(".")[1]) < month
      ) {
        // цвет просроченой даты
        el.children[5].parentElement.style.backgroundColor = bgColorTwo;
      } else if (+el.children[5].innerText.split(".")[0] == day) {
        // цвет текущей даты
        el.children[5].parentElement.style.backgroundColor = bgColorThree;
      }
    } else if (el.children[8].innerText.includes("Кол-во")) {
      setTimeout(action => {
        el.children[8].innerText += ` (${count})`;
      }, 500);
    }
  });
  setTimeout(_ => {
    var comment = document.querySelectorAll(
      "#tableProducts tbody .comment .major"
    );
    Array.prototype.forEach.call(comment, el => {
      if (el.innerText.includes("*")) {
        // цвет тут
        el.parentElement.parentElement.style.backgroundColor = bgColorFour;
      }
    });
  }, 1000);

  setTimeout(_ => {
    var comment = document.querySelectorAll(
      "#tableProducts tbody .comment .major"
    );
    Array.prototype.forEach.call(comment, el => {
      if (el.innerText.includes("#")) {
        el.parentElement.parentElement.style.backgroundColor = "#f3f2b3";
      }
    });
  }, 1000);

  // для подсветки цены
  document.querySelectorAll(".price_for_1c input").forEach(el => {
    var price1c = el.value,
      sellPrice = el.parentElement.parentElement.children[9].children[0].innerText.split(
        "$"
      )[1],
      commentValue =
        el.parentElement.parentElement.children[16].children[0].innerText;

    if (commentValue.includes(",")) {
      commentValue = commentValue.replace(",", ".");
    }

    if (+price1c > +sellPrice || +commentValue > +sellPrice) {
      console.log(+commentValue + " and " + +sellPrice);
      el.parentElement.parentElement.children[9].style.backgroundColor =
        "#7d0000";
    }
  });
})(
  // цвет даты на последующие месяца (пусто)
  `white`,
  // цвет просроченой даты
  `red`,
  // цвет текущей даты
  `pink`,
  // цвет звездатых в рандоме
  `#636363`
);
