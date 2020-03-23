const Plugin = () => {
    // ------------------------------ PARSING LOGIC START ------------------------------ //
    String.prototype.withUTM = function () {
        return this + '?utm_source=mobile&amp;utm_medium=email';
    };
    const startParsing = () => {
        let globalState = {
            state: {
                "page": {
                    "topNav": null,
                    "topBanner": null,
                    "topTitle": null,
                    "sections": null
                },
                "common": {
                    'currentSelectedSectionIndex': null,
                    'prevSelectedSectionIndex': '0',
                    'cardsPerSection': 3
                },
                "form": {
                    "heading": {
                        "topNav": null,
                        "topBanner": null,
                        "topTitle": null,
                    },
                    "cards": null,
                    "banner": null,
                    "reserved": {
                        "heading": {},
                        "section": {
                            "banner": {},
                            "cards": null
                        }
                    },
                },
            },
            getState: function (additional) {
                if (additional && typeof additional !== 'string') {
                    return "error, not string"
                } else if (additional === true) {
                    console.log(this.state);
                }
                return this.state;
            },
            setState: function (parentProp, childProp, callback) {
                let newValue = callback();
                this.state[`${parentProp}`] = {
                    ...this.state[`${parentProp}`],
                    [`${childProp}`]: newValue
                }
            },
        };
        const setPageState = (prop, callback) => {
            if (typeof prop !== 'string') {
                return console.error(`Cannot handle ${typeof prop} as a property of state object, this parameter must be a string`);
            } else if (typeof callback !== "function") {
                return console.error(`Cannot handle ${typeof callback} as a callback, this parameter must be a function`);
            } else {
                return globalState.setState('page', prop, callback);
            }
        };
        // For parsing all variables from page and setting them to state
        // (!! starting by default on page load !!)
        (({}) => {
            // ----- PARSING HEADING NAVIGATION FROM PAGE ----- //
            setPageState('topNav', () => {
                let topNav = document.querySelector('#top_nav');
                let linksNodeList = topNav.querySelectorAll('a');
                return Array.prototype.map.call(linksNodeList, (el => el));
            });
            // ----- PARSING HEADING BANNER FROM PAGE ----- //
            setPageState('topBanner', () => {
                return document.querySelector('#top_banner img')
            });
            // ----- PARSING HEADING TITLE FROM PAGE ----- //
            setPageState('topTitle', () => {
                return document.querySelector('#top_heading');
            });
            // ----- PARSING SECTIONS SETS FROM PAGE ----- //
            setPageState('sections', () => {
                let sections = [];
                let starts = document.querySelectorAll('.section_start');
                starts.forEach((el) => {
                    let localObj = {
                        banner: el.querySelectorAll('a')[0],
                        cards: [],
                        bottomButton: null
                    };
                    let allSectionTrs = [];
                    for (let element = el, i = 0; !(element.className.includes('section_end')); element = element.nextElementSibling, i++) {
                        allSectionTrs.push(element);
                        if (element.nextElementSibling.className.includes('section_end')) {
                            localObj.bottomButton = element.querySelector('a');
                            allSectionTrs.push(element.nextElementSibling)

                        }
                        if (element.querySelector('.product')) {
                            element.querySelectorAll('.product').forEach(product => {
                                let card = {};
                                card.img = product.querySelector('img');
                                card.name = product.querySelector('span');
                                card.newPrice = product.querySelectorAll('span')[1];
                                card.oldPrice = product.querySelectorAll('span')[2];
                                card.links = product.querySelectorAll('a');
                                localObj.cards.push(card)
                            });
                        }
                    }
                    localObj.allSectionTrs = allSectionTrs;
                    sections.push(localObj)

                });

                return sections;
            });
        })(globalState);
        globalState.getState("_____STATE_____");
        window.globalState = globalState;
    };
    startParsing();
    // ------------------------------ PARSING LOGIC END  --------------------------------- //
    // ------------------------------ ELEMENTS CREATING START ------------------------------ //
    let renderFormComponent = (section, number, fromReserved = false) => {
        let form = (banner, cards) => {
            document.querySelector('#plugin form').innerHTML = '';
            return `
             <h2>Секция ${number}</h2>
             <div id="banner">
                 <div>
                    <label for="banner-link">Ссылка на баннер</label>
                    <input value=${banner.link} id="banner-link" type="text">
                 </div>
                 <div>
                    <label for="banner-src">Адрес картинки баннера</label>
                    <input value=${banner.src} id="banner-src"  type="text">
                 </div>
            </div>
             <hr>
             <h3>Товар 1</h3>
             <div id="card1" class="form-card">
                 <div>
                    <label for="card1-img">URL-адрес картинки</label>
                    <input value=${cards[0].img} id="card1-img" type="text">
                 </div>
                 <div>
                    <label for="card1-name">Название товара</label>
                    <textarea id="card1-name">${cards[0].name}</textarea>
                    </div>
                 <div>
                    <label for="card1-newPrice">Новая цена</label>
                    <input value=${cards[0].newPrice} id="card1-newPrice" type="text">
                 </div>
                 <div>
                    <label for="card1-oldPrice">Старая цена</label>
                    <input value=${cards[0].oldPrice} id="card1-oldPrice" type="text">
                 </div>
                 <div>
                    <label for="card1-href">Ссылка на товар</label>
                    <input value=${cards[0].link} id="card1-href" type="text">
                 </div>
             </div>
              <hr>
             <h3>Товар 2</h3>
             <div id="card2" class="form-card">
                 <div>
                    <label for="card2-img">URL-адрес картинки</label>
                    <input value=${cards[1].img} id="card2-img" type="text">
                 </div>
                 <div>
                    <label for="card2-name">Название товара</label>
                    <textarea id="card2-name">${cards[1].name}</textarea>
                 </div>
                  <div>
                    <label for="card2-newPrice">Новая цена</label>
                    <input value=${cards[1].newPrice} id="card2-newPrice" type="text">
                 </div>
                 <div>
                    <label for="card2-oldPrice">Старая цена</label>
                    <input value=${cards[1].oldPrice} id="card2-oldPrice" type="text">
                 </div>
                 <div>
                    <label for="card2-href">Ссылка на товар</label>
                    <input value=${cards[1].link} id="card2-href" type="text">
                 </div>
             </div>
                <hr>
              <h3>Товар 3</h3>
             <div id="card3" class="form-card">
                 <div>
                    <label for="card3-img">URL-адрес картинки</label>
                    <input value=${cards[2].img} id="card3-img" type="text">
                 </div>
                 <div>
                    <label for="card3-name">Название товара</label>
                    <textarea id="card3-name">${cards[2].name}</textarea>
                 </div>
                  <div>
                    <label for="card3-newPrice">Новая цена</label>
                    <input value=${cards[2].newPrice} id="card3-newPrice" type="text">
                 </div>
                 <div>
                    <label for="card3-oldPrice">Старая цена</label>
                    <input value=${cards[2].oldPrice} id="card3-oldPrice" type="text">
                 </div>
                 <div>
                    <label for="card3-href">Ссылка на товар</label>
                    <input value=${cards[2].link} id="card3-href" type="text">
                 </div>
             </div>
             <hr>
             <div class="innerButtons">
                <button id="paste" class="button" type="submit">Вставить</button>
                <button id="clear" class="button" type="button">Очистить</button>
                <button id="undo" class="button" type="button">Вернуть</button>
                <button id="delete" class="button" type="button">Удалить</button>
             </div>`
        };
        if (!(fromReserved === true)) {
            let {banner, cards} = section;
            let bannerValues = {
                link: banner.href,
                src: banner.querySelector('img').src,
            };
            let mappedCards = cards.map(card => {
                return {
                    ...card,
                    img: card.img.src,
                    name: card.name.innerText.trim(),
                    newPrice: card.newPrice.innerText.trim(),
                    oldPrice: card.oldPrice.innerText.trim(),
                    link: card.links[0].href
                }
            });
            document.querySelector('#plugin form').innerHTML = form(bannerValues, mappedCards);
        } else {
            let {banner, cards} = section.section;
            let mappedCards = cards.map(card => {
                return {
                    ...card,
                    img: card.img,
                    name: card.name,
                    newPrice: card.newPrice,
                    oldPrice: card.oldPrice,
                    link: card.href
                }
            });
            document.querySelector('#plugin form').innerHTML = form(banner, mappedCards)
        }
    };
    let renderHeadingForm = (obj, fromReserved = false) => {
        let form = (valuesObj) => {
            let {topNavNames, topNavLinks, topBanner, topTitle} = valuesObj;
            document.querySelector('#plugin form').innerHTML = '';
            return `
             <h2>Оглавление</h2>
             <div id="categories">
                 <div id="1_cat">
                    <label for="1_category-name">Категория 1</label>
                    <textarea id="1_category-name" >${topNavNames[0]}</textarea>
                    <label for="1_category-link">Ссылка на категорию 1</label>
                    <input value=${topNavLinks[0]} id="1_category-link"  type="text">
                 </div>
                 <div id="2_cat">
                    <label for="2_category-name">Категория 2</label>
                    <textarea id="2_category-name" >${topNavNames[1]}</textarea>
                    <label for="2_category-link">Ссылка на категорию 2</label>
                    <input value=${topNavLinks[1]} id="2_category-link"  type="text">
                 </div>
                 <div id="3_cat">
                    <label for="3_category-name">Категория 3</label>
                    <textarea id="3_category-name" >${topNavNames[2]}</textarea>
                    <label for="3_category-link">Ссылка на категорию 3</label>
                    <input value=${topNavLinks[2]} id="3_category-link"  type="text">
                 </div>
                 <div id="4_cat">
                    <label for="4_category-name">Категория 4</label>
                    <textarea id="4_category-name" >${topNavNames[3]}</textarea>
                    <label for="4_category-link">Ссылка на категорию 4</label>
                    <input value=${topNavLinks[3]} id="4_category-link"  type="text">
                 </div>
                  <div id="5_cat">
                    <label for="5_category-name">Категория 5</label>
                    <textarea id="5_category-name" >${topNavNames[4]}</textarea>
                    <label for="5_category-link">Ссылка на категорию 5</label>
                    <input value=${topNavLinks[4]} id="5_category-link"  type="text">
                 </div>
                 <div>
                    <label for="banner-src">Адрес картинки баннера</label>
                    <input value=${topBanner.src} id="banner-src"  type="text">
                 </div>
                 <div>
                    <label for="heading-title">Заголовок рассылки</label>
                    <textarea id="heading-title">${topTitle.text}</textarea>
                 </div>
            </div>
             <div class="innerButtons">
                <button id="paste" class="button" type="submit">Вставить</button>
                <button id="clear" class="button" type="button">Очистить</button>
                <button id="undo" class="button" type="button">Вернуть</button>
                <!--       MUST BE HIDDEN, DON'T TOUCH         -->
                <button id="delete" class="button hidden" type="button">Удалить</button>
             </div>`
        };
        if (!(fromReserved === true)) {
            let valuesObj = {
                topNavNames: [],
                topNavLinks: [],
                topBanner: {src: null},
                topTitle: {text: null}
            };
            let {topNavNames, topNavLinks, topBanner, topTitle} = valuesObj;
            topTitle.text = obj.topTitle.innerText;
            obj.topNav.forEach(a => {
                topNavNames.push(a.innerText);
                topNavLinks.push(a.href)
            });
            topBanner.src = obj.topBanner.src;

            document.querySelector('#plugin form').innerHTML = form(valuesObj);
        } else {
            let valuesObj = {
                topNavNames: obj.topNav.topNavNames,
                topNavLinks: obj.topNav.topNavLinks,
                topBanner: {src: obj.topBanner},
                topTitle: obj.topTitle
            };
            console.log(valuesObj);
            document.querySelector('#plugin form').innerHTML = form(valuesObj);
        }
    };
    const createElements = () => {
        // _________ FOR HANDLING SECTION-BUTTONS CLICKS _________ //
        (() => {
            let sectionButtons = document.querySelectorAll('.top-buttons .button');
            sectionButtons.forEach(el => {
                el.onclick = function () {
                    // !!! STRICT LINES ORDER !!!
                    // SETTING TO STATE PREVIOUS AND CURRENT BUTTONS
                    let current = globalState.getState().common.currentSelectedSectionIndex;
                    let prev = globalState.getState().common.prevSelectedSectionIndex;
                    globalState.setState('common', 'prevSelectedSectionIndex', () => {
                        prev = current;
                        return String(prev)
                    });
                    globalState.setState('common', 'currentSelectedSectionIndex', () => {
                        return String(this.id[0])
                    });
                    // ACTIVE BUTTON TOGGLING
                    this.classList.toggle('active');
                    if (document.getElementById(`${prev}_sect`)) {
                        document.getElementById(`${prev}_sect`).classList.toggle('active')
                    }
                    // CONTROL FORM RENDERING
                    if (el.id === "heading") {
                        renderHeadingForm(globalState.getState().page);
                        setFormHeading(true);
                        parseFormValues()
                    } else {
                        renderFormComponent(globalState.getState().page.sections[this.id[0]], parseInt(this.id[0]) + 1);
                        setFormCards(true);
                        setFormBanner(true);
                        parseFormValues()
                    }
                }
            });
        })();
    };
    createElements();
    // ------------------------------ ELEMENTS CREATING END -------------------------------- //
    // FOR ACTIVATE FORM CONTROLS
    const insertValuesToPage = (type) => {
        if (type === 'section') {
            let currentSectionIndex = globalState.getState().common.currentSelectedSectionIndex;
            let sectionObj = globalState.getState().page.sections[currentSectionIndex];
            let formValues = globalState.getState().form;
            sectionObj.cards.forEach((card, i) => {
                card.img.src = formValues.cards[i].img;
                card.name.innerText = formValues.cards[i].name;
                card.newPrice.innerText = formValues.cards[i].newPrice + ' грн';
                card.oldPrice.innerText = formValues.cards[i].oldPrice + ' грн';
                card.links.forEach(link => link.href = formValues.cards[i].href.withUTM())
            });
            let sectionLink = formValues.banner.link.withUTM();
            sectionObj.banner.href = sectionLink.withUTM();
            sectionObj.bottomButton.href = sectionLink.withUTM();
            sectionObj.banner.querySelector('img').src = formValues.banner.src;
        } else if (type === 'heading') {
            let {topNav, topBanner, topTitle} = globalState.getState().page;
            let formValues = globalState.getState().form.heading;
            topNav.forEach((el, i) => {
                el.innerText = formValues.topNav.topNavNames[i];
                el.href = formValues.topNav.topNavLinks[i].withUTM();
            });
            topBanner.src = formValues.topBanner;
            topTitle.querySelector('span').innerText = formValues.topTitle.text;
        }
    };
    const createKeyNamesFromId = (inputs, objToPopulate) => {
        inputs.forEach(input => {
            let keyNameFromId = `${input.id.split('-')[1]}`;
            objToPopulate[keyNameFromId] = input.value;
        });
    };
    let setFormBanner = (withReserve) => {
        // PARSE BANNER FORM INPUTS AND SET THEM TO STATE
        let bannerObj = {};
        let bannerInputs = document.querySelectorAll('#plugin #banner input');
        globalState.setState('form', 'banner', () => {
            createKeyNamesFromId(bannerInputs, bannerObj);
            if (withReserve === true) globalState.state.form.reserved.section.banner = bannerObj;
            return bannerObj;
        });
    };
    let setFormCards = (withReserve) => {
        // PARSE PRODUCT CARDS FORM INPUTS AND SET THEM TO STATE
        let values = [];
        let formCards = document.querySelectorAll('#plugin .form-card');
        formCards.forEach(el => {
            let inputs = el.querySelectorAll('input, textarea');
            globalState.setState('form', 'cards', () => {
                let card = {};
                createKeyNamesFromId(inputs, card);
                values.push(card);
                if (withReserve === true) globalState.state.form.reserved.section.cards = values;
                return values;
            });
        });
    };
    let setFormHeading = (withReserve) => {
        let headingObj = {
            topNav: {
                topNavNames: [],
                topNavLinks: []
            },
            topBanner: null,
            topTitle: {text: null}
        };
        let categoriesSets = document.querySelectorAll('#plugin_form div[id$="_cat"]');
        globalState.setState('form', 'heading', () => {
            categoriesSets.forEach(set => {
                set.querySelectorAll('input, textarea').forEach(field => {
                    if (field.id.includes('name')) headingObj.topNav.topNavNames.push(field.value);
                    else if (field.id.includes('link')) headingObj.topNav.topNavLinks.push(field.value)
                })
            });
            headingObj.topBanner = document.querySelector('#plugin_form #banner-src').value;
            headingObj.topTitle.text = document.querySelector('#plugin_form #heading-title').value;
            if (withReserve === true) globalState.state.form.reserved.heading = headingObj;
            return headingObj;
        })
    };
    let parseFormValues = () => {
        if (globalState.getState().common.currentSelectedSectionIndex === 'h') {
            setFormHeading(false);
        } else {
            setFormBanner(false);
            setFormCards(false);
        }
        document.querySelector('#plugin_form').onsubmit = (event) => {
            event.preventDefault();
            parseFormValues();
            if (globalState.getState().common.currentSelectedSectionIndex === "h") {
                setFormHeading(false);
                insertValuesToPage('heading');
            } else {
                setFormBanner(false);
                setFormCards(false);
                insertValuesToPage('section');
            }
        };
        document.querySelector('#plugin_form #undo').onclick = () => {
            if (globalState.getState().common.currentSelectedSectionIndex === "h") {
                let reserved = globalState.getState().form.reserved.heading;
                renderHeadingForm(reserved, true);
                parseFormValues()
            } else {
                let reserved = globalState.getState().form.reserved;
                let currentSection = Number(globalState.getState().common.currentSelectedSectionIndex) + 1;
                renderFormComponent(reserved, currentSection, true);
                parseFormValues();
            }
        };
        document.querySelector('#plugin_form #clear').onclick = () => {
            document.querySelectorAll('#plugin_form input, textarea')
                .forEach(field => field.value = null)
        };
        document.querySelector('#plugin_form #delete').onclick = () => {
            let sections = globalState.getState().page.sections;
            let selectedSection = globalState.getState().common.currentSelectedSectionIndex;
            sections[selectedSection].allSectionTrs.forEach(el => el.remove());
            document.querySelectorAll(".top-buttons .section-button").forEach(btn => {
                if (btn.id[0] === selectedSection) btn.remove();
            })
        };

    };
    document.querySelector('#copy_html').onclick = async function (event) {
        try {
            this.innerText = 'Копируем...';
            await navigator.clipboard.writeText(document.querySelector('#table_root').innerHTML);
            console.log('Page URL copied to clipboard');
            this.innerText = 'HTML успешно скопирован в буфер';
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }
};
Plugin();

