// TODO: Build out ui radio boxes programmatically with code and a simple object
// TODO: build better/ more automated radio value grabbing and style setting logic
//          - rely less on static set values except where defined in an object

// grab all radio type inputs
const radioButtons = document.querySelectorAll('input');
// add event listeners to all radio inputs
radioButtons.forEach(elem =>
    elem.addEventListener("change",  event => inputEvent(event))
);

// select grid element to later manipulate
gridElement = document.querySelector("#grid");

function inputEvent(event){
    changeGridProperties();
}

function changeGridProperties(){
    changeColumns()
    changeRows()
    // get and set justify items
    let justifyValue = getRadioValue("formJustify")
    changeStyle(justifyValue, "justify-items")

    // get and set align items
    let alignValue = getRadioValue("formAlign")
    changeStyle(alignValue, "align-items")

    // get and set justify content
    let justifyContentValue = getRadioValue("formJustifyContent")
    changeStyle(justifyContentValue, "justify-content")

    // get and set align content
    let alignContentValue = getRadioValue("formAlignContent")
    changeStyle(alignContentValue, "align-content")
}

function changeColumns(){
    let columnsState = getCheckBoxValue("columnsEnable");
    if (columnsState) {
        // get column count
        let columnCountValue = getSimpleValue("columnsCount");
        // get column size type
        let columnSizeValue = getRadioValue("formColumnSize");
        // get column size value 
        let columnSizeNumberValue = getSimpleValue("columnSizeNumber")
        // set percent format 
        if  (columnSizeValue == "Percent"){
            columnSizeValue = `${columnSizeNumberValue}%`
        }
        // build and use column size and count values
        let columnsCountString = `repeat(${columnCountValue}, ${columnSizeValue})`
        changeStyle(columnsCountString, "grid-template-columns")
    } else {
        // set to default
        changeStyle("revert", "grid-template-columns")
    }
}

function changeRows(){
    let rowsState = getCheckBoxValue("rowsEnable");
    if (rowsState) {
        // get row count
        let rowCountValue = getSimpleValue("rowsCount");
        // get row size type
        let rowSizeValue = getRadioValue("formRowSize");
        // get row size value 
        let rowSizeNumberValue = getSimpleValue("rowSizeNumber")
        // set percent format 
        if  (rowSizeValue == "Percent"){
            rowSizeValue = `${rowSizeNumberValue}%`
        }
        // build and use row size and count values
        let rowsCountString = `repeat(${rowCountValue}, ${rowSizeValue})`
        changeStyle(rowsCountString, "grid-template-rows")
    } else {
        // set to default
        changeStyle("revert", "grid-template-rows")
    }
}

function changeStyle(value,style) {
    // console.log("change stye " + style +" to :" + value);
    gridElement.style[style] = value;
}

function getSimpleValue(className) {
    let element = document.querySelector("#" + className);
    let value = element.value;
    return value;
}

function getRadioValue(className) {
    let element = document.querySelector("#" + className);
    let name = element[0].name;
    let value = element.elements[name].value;
    return value;
}

function getCheckBoxValue(className) {
    let element = document.querySelector("#" + className);
    let value = element.checked;
    return value;
}
