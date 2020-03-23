(() => {
  const urlsList = [
    // part 1
    [
      "https://www.google.com/search?q=",
      // `https://artmobile.ua/shop/search?search=`,
      // "https://afm.com.ua/search?query=",
      // "https://all-spares.ua/ru/search/?searchword=",
      // "https://technoplus-pro.com/catalog/search=",
      // "http://mokc.com.ua/search/?q=",
      // "https://m-service.com.ua/search.htm?catalog_part_search=parts&search=",
      // "https://radan-osp.com/products?keyword=",
      // "http://smobile.com.ua/all-products?keyword="
    ],
    // part 2
    [
      // "https://www.complektuha.com.ua/index.php?searchstring=",
      // "https://welcome-mobi.com.ua/shop/search?text=",
      // "https://g4m.com.ua/index.php?route=product/search&search=",
      // "https://mktel.ua/index.php?route=product/search&search=",
      // "https://mobiking.com.ua/search/#?search_text=",
      // "https://style-com.kiev.ua/search/?q=",
      // "http://mobile-market.com.ua/index.php?route=product/search&search=",
      // "https://www.mobilie.com.ua/search/?search="
    ]
  ];
  document.onkeydown = e => {
    if (e.shiftKey && e.keyCode == 49) getClipboardText(0);
    else if (e.shiftKey && e.keyCode == 50) getClipboardText(1);
    return;
  };

  const getClipboardText = async a => {
    let text = await navigator.clipboard.readText().catch(() => {
      console.error("В буфере пусто, ошибка: ", err);
    });
    if (a == 0 && text) openURLs(text, urlsList[0]);
    else if (a == 1 && text) openURLs(text, urlsList[1]);
  };

  const openURLs = (text, arr) => {
    arr.forEach(url => window.open(url + text, "_blank"));
  };
})();
