export function arrConcat(buffer, arr) {
    for (let i = 0; i < arr.length; i++) {
        Array.isArray(arr[i]) ? arrConcat(buffer, arr[i]) : buffer.push(arr[i]);
    }
    return buffer;
}

function formatSelectOptions(optionsArr) {
    let formattedOptions = [];
    for (let i = 0; i < optionsArr.length; i++) {
        formattedOptions.push(String(optionsArr[i]));
    }
    return formattedOptions;
}

export function formSelectOptions(thisArg, selectArrays, optionsNames) {
    for (let i = 0; i < selectArrays.length; i++) {
        selectArrays[i].length ? thisArg.options[optionsNames[i]] = formatSelectOptions(selectArrays[i]) : null;
    }
}