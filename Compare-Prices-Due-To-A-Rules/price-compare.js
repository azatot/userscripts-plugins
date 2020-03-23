document.body.onload = () => {
    const state = {
        parsedElements: [],
        parsedItems: [],
        convertedItems: [],
    
    }
    var trs = document.querySelectorAll("table > tbody > tr[id]");
    var dollarElems = Array.prototype.map.call(trs, el => {
        if (el.id) return state.parsedItems.push(
            {
                name: el.children[3].outerText,
                id: el.id,
                value: +(el.children[4].innerText).slice(1),
                grn: null,
                isOrig: el.children[3].outerText
                    .includes("оригинал")  
                    ? true 
                    : false
            }
        );
    })
    
    const compare = (el, increment) => {
        return {
            ...el,
            value: +(el.value + increment).toFixed(2),
            grn: Math.round(+(el.value + increment).toFixed(2) * 27)
        }
    }
    
    state.convertedItems = state.parsedItems.map(el => {
        if (el.value > 0 && el.value < 1) {
            if (!el.isOrig) return compare(el, 1.75)
            else return compare(el, 2.5)
        }
        else if (el.value >= 1 && el.value < 1.5) {
            if (!el.isOrig) return compare(el, 2.25)
            else return compare(el, 3.5)
        }
        else if (el.value >= 1.5 && el.value < 2.5) {
            if (!el.isOrig) return compare(el, 3)
            else return compare(el, 4.5)
        }
        else if (el.value >= 2.5) {
            if (!el.isOrig) return compare(el, 4)
            else return compare(el, 5)
        };
    }
    );
    for (let i = 0; i <= state.convertedItems.length; i++) {
        if(state.convertedItems[i].id == trs[i].id) {
            trs[i].children[4].innerHTML += `<span><br>Розн: $<b>${state.convertedItems[i].value}</b></span>`;
            trs[i].children[5].innerHTML += `<span><br>Розн: <b>${state.convertedItems[i].grn}<b></span>`;
        } else {
            console.error("ERROR")
        }
    }
}
