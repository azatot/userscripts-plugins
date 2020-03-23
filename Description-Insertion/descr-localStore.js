// створюємо в хеді документу тег стилів та даємо йому id для ідентифікації в подальшому
setTimeout(function() {
  (function createStylesTagInHead() {
    const styles = document.createElement("style");
    const mainHead = document.querySelector("head");

    mainHead.append(styles);

    styles.type = "text/css";
    styles.id = "dos_styles_sheet";
  })();

  // собсна весь хтмл я вставлю саме так, бо гємора буде хоть жопой жуй, якшо я буду верстати на ванільному JS, як даун
  (function allPluginHTML() {
    const _allHTML = `
    <input type="submit" id="dos_open_button" class="dos_buttons" value="Показать">
    <div id="dos_list_wrapper" class="dos_list_wrapper_unactive">
        <div id="dos_select_wrapper" class="dos_select_wrapper">
            <select id="dos_templates_options" class="dos_select_list">
                <option selected disabled>Категория</option>
            </select>
            <input value="╋" title="Добавить новый шаблон описания" type="submit" id="dos_add_new_option" class="dos_buttons dos_button_add">
        </div>
        <input type="submit" value="Вставить" id="dos_paste_button" class="dos_buttons">
        <input type="submit" value="Вернуть" id="dos_reset_button" class="dos_buttons dos_reset_button" title="Откатить состояние полей на момент загрузки страницы">
        
        <div id="dos_preview_block" class="dos_preview_block">
            <label for="dos_preview_area_ru">RU</label> 
            <textarea readonly placeholder="Только для чтения..." name="RU" id="dos_preview_area_ru" cols="30" rows="8" placeholder="Только для чтения" class="dos_text_area"></textarea>
            <label for="dos_preview_area_ua">UA</label> 
            <textarea readonly placeholder="Только для чтения..." name="UA" id="dos_preview_area_ua" cols="30" rows="8" placeholder="Только для чтения" class="dos_text_area"></textarea>
            <input type="submit" value="Удалить" id="dos_delete_button" class="dos_buttons">
        </div>
    </div>
    `;

    let _dos_wrapper = document.createElement("div");
    _dos_wrapper.id = "dos_wrapper";
    _dos_wrapper.className = "dos_wrapper";
    document.body.prepend(_dos_wrapper);
    _dos_wrapper.innerHTML = _allHTML;
  })();

  // пакуємо айдішнік стилів з хеду в константу
  const styles = document.querySelector("#dos_styles_sheet");

  let arr = [];

  let dos_target_area_ru = document.querySelectorAll("iframe")[0]
      .contentDocument.body,
    dos_target_area_ua = document.querySelectorAll("iframe")[1].contentDocument
      .body,
    teasers_ru = document.querySelector("#teaser-ru"),
    teasers_uk = document.querySelector("#teaser-uk"),
    // category = document.querySelector("select#selectCategoryId").selectedOptions,
    state;

  // модель створення стилів, та їх розміщення в тегу <style> усередині <head> сайта
  class CSS_Style {
    constructor(name, props) {
      this.innerHTML = `${name} { ${props} }`;
      return (styles.innerHTML += this.innerHTML);
    }
  }

  // собсна безпосереднє створення цих самих стилів та
  (function() {
    const dos_wrapper_allInsideClass = new CSS_Style(
      ".dos_wrapper  *",
      `
            outline: none;
            outline: 0;
        `
    );
    const dos_wrapperClass = new CSS_Style(
      ".dos_wrapper",
      `
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 0.5em;
    
    height: 49px;
    background-color: rgb(233, 233, 233);
    transition: 0.2s;
    z-index: 1;
    box-shadow: 0px 0px 12px 3px #4c4c4c4d;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
`
    );
    const dos_buttonsClass = new CSS_Style(
      ".dos_buttons",
      `
        display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    padding: 0.5em;
    min-width: 234px;
    box-sizing: border-box;
    background: #86868645;
    border: none;
    border-radius: 5px;
    z-index: 100;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 1em;
    transition: 0.18s;
`
    );
    const dos_buttons_hoverClass = new CSS_Style(
      ".dos_buttons:hover",
      `
            background-color: #444444;
            color: white;
        `
    );
    const dos_list_wrapperClassUnactive = new CSS_Style(
      ".dos_list_wrapper_unactive",
      `
    display: none;
`
    );
    const dos_list_wrapperClass = new CSS_Style(
      ".dos_list_wrapper",
      `
    display: flex;
    flex-direction: column;
    align-items: center;
`
    );

    const dos_select_listClass = new CSS_Style(
      ".dos_select_list",
      `
    display: flex;
    height: 48px;
    border: none;
    border-radius: 15px 0 0 15px;
    font-size: unset;
    padding-left: 0.3em;
    padding-right: 0.5em;
    width: 185px;
`
    );
    const dos_reset_buttonClass = new CSS_Style(
      ".dos_reset_button",
      `
        margin-top: 0.5em;
`
    );
    const dos_preview_blockClass = new CSS_Style(
      ".dos_preview_block",
      `
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 1em;
    `
    );
    const dos_text_areaClass = new CSS_Style(
      `.dos_text_area`,
      `width: 220px; height: 120px`
    );
    const dos_select_wrapperClass = new CSS_Style(
      `.dos_select_wrapper`,
      `
display: flex;
border-top: 1px solid;
flex-direction: row;
justify-content: center;
align-items: center;
margin: 1em 0 0 ;
padding: 1em 0;
width: -webkit-fill-available;
`
    );
    const dos_button_add = new CSS_Style(
      `.dos_button_add`,
      `
    display: flex;
    min-width: 20px;
    width: 25px;
    line-height: 0px;
    border-radius: 0 15px 15px 0;
    border: none;
    background: #c8d7ff;
    padding: 22px 25px 25px 25px;
`
    );
  })();

  // для збереження початкового стану (тексту html) внутрішнього документу
  (function getStateOfAreas() {
    state = {
      stateRU: String(dos_target_area_ru.innerHTML),
      stateUA: String(dos_target_area_ua.innerHTML)
    };
  })();

  // для установки  початкового стану (скидування)
  function setStateToAreas() {
    console.log(state.stateRU);
    dos_target_area_ru.innerHTML = state.stateRU;
    dos_target_area_ua.innerHTML = state.stateUA;
  }

  //  функція старту плагіна та його логіки (ініціалізація)
  function _dos_template_start() {
    // визначення усіх елементів плагіну
    const dos_wrapper = document.querySelector("#dos_wrapper"),
      dos_openButton = document.querySelector("#dos_open_button"),
      dos_list_wrapper = document.querySelector("#dos_list_wrapper"),
      dos_templates_options = document.querySelector("#dos_templates_options"),
      dos_paste_button = document.querySelector("#dos_paste_button"),
      dos_reset_button = document.querySelector("#dos_reset_button"),
      dos_preview_block = document.querySelector("#dos_preview_block"),
      dos_preview_area_ru = document.querySelector("#dos_preview_area_ru"),
      dos_preview_area_ua = document.querySelector("#dos_preview_area_ua"),
      dos_add_new_option = document.querySelector("#dos_add_new_option"),
      dos_delete_button = document.querySelector("#dos_delete_button"),
      textareas = dos_preview_block.querySelectorAll("textarea"),
      // та створення деяких елементів
      dos_saveButton = document.createElement(`input`),
      dos_cancelButton = document.createElement("input");

    dos_saveButton.value = "Сохранить";
    dos_saveButton.type = "submit";

    dos_cancelButton.value = "Отмена";
    dos_cancelButton.type = "submit";

    //модель створення опцій для списку select
    class Template {
      constructor(label, textRU, textUA) {
        this.ru = String(textRU);
        this.ua = String(textUA);

        this.option = document.createElement("option");
        this.option.label = label;
        this.option.value = label;
        arr.push(this);
        dos_templates_options.append(this.option);
        return (label = {
          ru: String(textRU),
          ua: String(textUA)
        });
      }
    }

    // показати весь плагін
    dos_openButton.onclick = function() {
      if (!dos_list_wrapper.classList.contains("dos_list_wrapper")) {
        this.value = "Спрятать";
        dos_list_wrapper.classList.toggle("dos_list_wrapper");
        dos_wrapper.style.height = "100%";
      } else {
        this.value = "Показать";
        dos_wrapper.style.height = "49px";
        dos_list_wrapper.classList.toggle("dos_list_wrapper");
      }
    };

    // вставити в поля для прев'ю
    dos_templates_options.onchange = function() {
      dos_preview_area_ru.textContent = arr[this.selectedIndex - 1].ru;
      dos_preview_area_ua.textContent = arr[this.selectedIndex - 1].ua;
      textareas.forEach(el => {
        el.readOnly = true;
      });
    };
    !(function checkLocalStorage() {
      for (var e = 0; e < localStorage.length; e++)
        new Template(
          localStorage.key(e),
          JSON.parse(localStorage.getItem(localStorage.key(e))).ru,
          JSON.parse(localStorage.getItem(localStorage.key(e))).ua
        );
    })();

    // чистка тизерів по кнопці та для вставки в основні поля
    dos_paste_button.onclick = function() {
      teasers_ru.value = "";
      teasers_uk.value = "";

      dos_target_area_ru = document.querySelectorAll("iframe")[0]
        .contentDocument.body;
      dos_target_area_ua = document.querySelectorAll("iframe")[1]
        .contentDocument.body;
      dos_target_area_ru.innerHTML = dos_preview_area_ru.textContent;
      dos_target_area_ua.innerHTML = dos_preview_area_ua.textContent;
    };

    // для переключення стану додавання (відміна чи ні)
    function toggleStateOfCreating(isActive, valueOfPlaceholder) {
      [dos_preview_area_ru, dos_preview_area_ua].forEach(el => {
        el.innerText = "";
        el.readOnly = isActive;
        el.placeholder = valueOfPlaceholder;
      });
      dos_add_new_option.disabled = !isActive;
      !isActive
        ? (dos_delete_button.style.display = "none")
        : (dos_delete_button.style.display = "flex");
    }
    var labelOfTemplate = "";
    // для створення шаблону через інтерфейс плагіну
    dos_add_new_option.onclick = function(event) {
      labelOfTemplate = prompt("Введите название категории/подкатегории: ");
      if (labelOfTemplate == undefined || labelOfTemplate == null) {
        dos_preview_area_ru.innerHTML = null;
        dos_preview_area_ua.innerHTML = null;
      } else {
        if (event) {
          dos_saveButton.className = "dos_buttons";
          dos_cancelButton.className = "dos_buttons";
          dos_cancelButton.style.marginTop = "10px";
          dos_list_wrapper.append(dos_saveButton);
          dos_list_wrapper.append(dos_cancelButton);

          toggleStateOfCreating(
            false,
            "Вставьте шаблон описание в формате HTML"
          );
        }
      }
    };

    // для відміни додавання шаблону
    dos_cancelButton.onclick = function() {
      toggleStateOfCreating(true, "Только для чтения...");
      [this, this.previousElementSibling].forEach(e =>
        e.classList.toggle("dos_list_wrapper_unactive")
      );
    };

    // зберігаємо шаблон в LocalStorage з ключом
    dos_saveButton.onclick = function() {
      [this, this.nextElementSibling].forEach(e =>
        e.classList.toggle("dos_list_wrapper_unactive")
      );
      toggleStateOfCreating(true, "Только для чтения...");
      localStorage.setItem(
        labelOfTemplate,
        JSON.stringify(
          new Template(
            `${labelOfTemplate}`,
            dos_preview_area_ru.value,
            dos_preview_area_ua.value
          )
        )
      );
      // checkLocalStorage();
    };
    // для видалення вибраного шаблону
    // Відновлено з мініфікованого коду
    dos_delete_button.onclick = () => {
      toggleStateOfCreating(true, "");
      var t = dos_templates_options.options;
      Array.prototype.forEach.call(t, e => {
        e.selected &&
          ("Категория" !== e.label
            ? (console.log(e.value),
              confirm(
                "Ты уверен, что хочешь удалить выбраный шаблон описания? Данные будут утрачены навсегда!"
              ) &&
                (toggleStateOfCreating(!0, "Только для чтения..."),
                e.parentElement.removeChild(e),
                localStorage.removeItem(e.label)))
            : ((dos_add_new_option.disabled = !1),
              toggleStateOfCreating(!0, "Только для чтения...")));
      });
    };

    // для повернення в поля початкового тексту
    dos_reset_button.onclick = setStateToAreas;

    // для автоматичного відкриття
    dos_openButton.click();
  }

  _dos_template_start();
}, 200);
