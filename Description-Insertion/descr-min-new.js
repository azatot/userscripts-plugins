setTimeout(function() {
  !(function() {
    const e = document.createElement("style");
    document.querySelector("head").append(e),
      (e.type = "text/css"),
      (e.id = "dos_styles_sheet");
  })(),
    (function() {
      let e = document.createElement("div");
      (e.id = "dos_wrapper"),
        (e.className = "dos_wrapper"),
        document.body.prepend(e),
        (e.innerHTML =
          '\n        <div id="dos_over_wrapper">\n        <input type="submit" id="dos_open_button" class="dos_buttons" value="Показать">\n        <div id="dos_list_wrapper" class="dos_list_wrapper_unactive">\n        <div id="dos_select_wrapper" class="dos_select_wrapper">\n            <select id="dos_templates_options" class="dos_select_list">\n                <option selected disabled>Категория</option>\n            </select>\n            <input value="╋" title="Добавить новый шаблон описания" type="submit" id="dos_add_new_option" class="dos_buttons dos_button_add">\n        </div>\n        <input type="submit" value="Вставить" id="dos_paste_button" class="dos_buttons">\n        <input type="submit" value="Вернуть" id="dos_reset_button" class="dos_buttons dos_reset_button" title="Откатить состояние полей на момент загрузки страницы">\n        \n        <div id="dos_preview_block" class="dos_preview_block">\n            <label for="dos_preview_area_ru">RU</label> \n            <textarea readonly placeholder="Только для чтения..." name="RU" id="dos_preview_area_ru" cols="30" rows="8" placeholder="Только для чтения" class="dos_text_area"></textarea>\n            <label for="dos_preview_area_ua">UA</label> \n            <textarea readonly placeholder="Только для чтения..." name="UA" id="dos_preview_area_ua" cols="30" rows="8" placeholder="Только для чтения" class="dos_text_area"></textarea>\n            </div>\n        <input type="submit" value="Удалить" id="dos_delete_button" class="dos_buttons">\n    </div>\n    </div>\n    ');
    })();
  const e = document.querySelector("#dos_styles_sheet");
  let t,
    n = [],
    o = document.querySelectorAll("iframe")[0].contentDocument.body,
    s = document.querySelectorAll("iframe")[1].contentDocument.body,
    r = document.querySelector("#teaser-ru"),
    l = document.querySelector("#teaser-uk");
  class i {
    constructor(t, n) {
      return (
        (this.innerHTML = `${t} { ${n} }`), (e.innerHTML += this.innerHTML)
      );
    }
  }
  function a() {
    console.log(t.stateRU),
      (o.innerHTML = t.stateRU),
      (s.innerHTML = t.stateUA);
  }
  new i(
    "#dos_over-wrapper",
    "\n            display: flex;\n            position: absolute;\n            // width: ;\n        "
  ),
    new i(
      ".dos_wrapper  *",
      "\n            outline: none;\n            outline: 0;\n        "
    ),
    new i(
      ".dos_wrapper",
      "\n    position: fixed;\n    top: 0;\n    right: 0;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    align-items: center;\n    padding: 0.5em;\n    \n    height: 49px;\n    background-color: rgb(233, 233, 233);\n    transition: 0.2s;\n    z-index: 3;\n    box-shadow: 0px 0px 12px 3px #4c4c4c4d;\n    overflow: hidden;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n    font-size: 20px;\n"
    ),
    new i(
      ".dos_buttons",
      "\n        display: flex;\n    text-align: center;\n    align-items: center;\n    justify-content: center;\n    padding: 0.5em;\n    min-width: 234px;\n    box-sizing: border-box;\n    background: #86868645;\n    border: none;\n    border-radius: 5px;\n    z-index: 100;\n    cursor: pointer;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n    font-size: 1em;\n    transition: 0.18s;\n"
    ),
    new i(
      ".dos_buttons:hover",
      "\n            background-color: #444444;\n            color: white;\n        "
    ),
    new i(".dos_list_wrapper_unactive", "\n    display: none;\n"),
    new i(
      ".dos_list_wrapper",
      "\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n"
    ),
    new i(
      ".dos_select_list",
      "\n    display: flex;\n    height: 48px;\n    border: none;\n    border-radius: 15px 0 0 15px;\n    font-size: unset;\n    padding-left: 0.3em;\n    padding-right: 0.5em;\n    width: 185px;\n"
    ),
    new i(".dos_reset_button", "\n        margin-top: 0.5em;\n"),
    new i(
      ".dos_preview_block",
      "\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    margin-top: 1em;\n    margin-bottom: 1em;\n    "
    ),
    new i(".dos_text_area", "width: 220px; height: 80px"),
    new i(
      ".dos_select_wrapper",
      "\ndisplay: flex;\nborder-top: 1px solid;\nflex-direction: row;\njustify-content: center;\nalign-items: center;\nmargin: 1em 0 0 ;\npadding: 1em 0;\nwidth: -webkit-fill-available;\n"
    ),
    new i(
      ".dos_button_add",
      "\n    display: flex;\n    min-width: 20px;\n    width: 25px;\n    line-height: 0px;\n    border-radius: 0 15px 15px 0;\n    border: none;\n    background: #c8d7ff;\n    padding: 22px 25px 25px 25px;\n"
    ),
    (t = { stateRU: String(o.innerHTML), stateUA: String(s.innerHTML) }),
    (function() {
      const e = document.querySelector("#dos_wrapper"),
        t = document.querySelector("#dos_open_button"),
        i = document.querySelector("#dos_list_wrapper"),
        d = document.querySelector("#dos_templates_options"),
        c = document.querySelector("#dos_paste_button"),
        p = document.querySelector("#dos_reset_button"),
        u = document.querySelector("#dos_preview_block"),
        _ = document.querySelector("#dos_preview_area_ru"),
        m = document.querySelector("#dos_preview_area_ua"),
        y = document.querySelector("#dos_add_new_option"),
        b = document.querySelector("#dos_delete_button"),
        x =
          (document.querySelector("#dos_over_wrapper"),
          u.querySelectorAll("textarea")),
        g = document.createElement("input"),
        f = document.createElement("input");
      (g.value = "Сохранить"),
        (g.type = "submit"),
        (f.value = "Отмена"),
        (f.type = "submit");
      class w {
        constructor(e, t, o) {
          return (
            (this.ru = String(t)),
            (this.ua = String(o)),
            (this.option = document.createElement("option")),
            (this.option.label = e),
            (this.option.value = e),
            n.push(this),
            d.append(this.option),
            { ru: String(t), ua: String(o) }
          );
        }
      }
      function h(e, t) {
        [_, m].forEach(n => {
          (n.textContent = ""), (n.readOnly = e), (n.placeholder = t);
        }),
          (y.disabled = !e);
      }
      !(function() {
        for (var e = 0; e < localStorage.length; e++)
          new w(
            localStorage.key(e),
            JSON.parse(localStorage.getItem(localStorage.key(e))).ru,
            JSON.parse(localStorage.getItem(localStorage.key(e))).ua
          );
      })(),
        (t.onclick = function() {
          i.classList.contains("dos_list_wrapper")
            ? ((this.value = "Показать"),
              (e.style.height = "49px"),
              i.classList.toggle("dos_list_wrapper"))
            : ((this.value = "Спрятать"),
              i.classList.toggle("dos_list_wrapper"),
              (e.style.height = "100%"));
        }),
        (d.onchange = function() {
          x.forEach(e => {
            e.readOnly = !0;
          }),
            (_.textContent = n[this.selectedIndex - 1].ru),
            (m.textContent = n[this.selectedIndex - 1].ua);
        }),
        (c.onclick = function() {
          (r.value = ""),
            (l.value = ""),
            (o = document.querySelectorAll("iframe")[0].contentDocument.body),
            (s = document.querySelectorAll("iframe")[1].contentDocument.body),
            (o.innerHTML = _.textContent),
            (s.innerHTML = m.textContent);
        });
      var v = "";
      (y.onclick = function(e) {
        (b.style.display = "none"),
          "" == (v = prompt("Введите название категории/подкатегории: ")) ||
          null == v
            ? ((_.innerHTML = ""),
              (m.innerHTML = ""),
              (b.style.display = "flex"))
            : e &&
              ((g.className = "dos_buttons"),
              (f.className = "dos_buttons"),
              (f.style.marginTop = "10px"),
              i.append(g),
              i.append(f),
              h(!1, "Вставьте шаблон описание в формате HTML"));
      }),
        (f.onclick = function() {
          (b.style.display = "flex"),
            h(!0, "Только для чтения..."),
            [this, this.previousElementSibling].forEach(e =>
              e.classList.toggle("dos_list_wrapper_unactive")
            );
        }),
        (g.onclick = function() {
          (b.style.display = "flex"),
            [this, this.nextElementSibling].forEach(e =>
              e.classList.toggle("dos_list_wrapper_unactive")
            ),
            h(!0, "Только для чтения..."),
            localStorage.setItem(
              v,
              JSON.stringify(new w(`${v}`, _.value, m.value))
            );
        }),
        (p.onclick = a),
        t.click(),
        (b.onclick = function(e) {
          h(!1, "");
          var t = d.options;
          Array.prototype.forEach.call(t, e => {
            e.selected &&
              ("Категория" !== e.label
                ? (console.log(e.value),
                  confirm(
                    "Ты уверен, что хочешь удалить выбраный шаблон описания? Данные будут утрачены навсегда!"
                  ) &&
                    (h(!0, "Только для чтения..."),
                    e.parentElement.removeChild(e),
                    localStorage.removeItem(e.label)))
                : ((y.disabled = !1), h(!0, "Только для чтения...")));
          });
        });
    })();
}, 2000);
