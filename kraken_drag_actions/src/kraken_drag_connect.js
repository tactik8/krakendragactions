



    

// --------------------------------------------------------------------
// -------------------- Drag and Connect ------------------------------
// --------------------------------------------------------------------


export const krDragConnect = {
    setDropzone: setListenerDropzoneDragAndConnect,
    setDraggable: setListenerDraggableDragAndConnect
}




function setListenerDropzoneDragAndConnect(element, callbackFn) {

    element.classList.add('krDragAndConnectDropzone')

    element.addEventListener("dragover", (event) => {
        event.preventDefault()
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault()

        let draggedID = event.dataTransfer.getData('text')
        let dragged = document.getElementById(draggedID)

        let lineID = event.dataTransfer.getData('line')
        let line = document.getElementById(lineID)

        if (dragged && dragged.classList && dragged.classList.contains('krDragAndConnectDraggable')) {
            event.preventDefault()
            event.stopPropagation()

            let finalLine = document.createElement('kr-process-line')
            finalLine.element1 = dragged
            finalLine.element2 = event.target
            finalLine.reDraw()


            // Callback to callbackFn if provided with action record
            var actionRecord = getActionRecord('krDragMove')
            if (callbackFn){
                callbackFn(actionRecord)
            }
        }

    });
}


function setListenerDraggableDragAndConnect(element) {


    let line;

    element.classList.add('krDragAndConnectDraggable')
    element.setAttribute('draggable', 'true')


    element.addEventListener("drag", (event) => {
        event.preventDefault()


        //let line = document.getElementsByTagname('kr-process-line')[0]

        line.x2 = event.clientX
        line.y2 = event.clientY
        line.reDraw()

    });

    element.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem

        line = document.createElement('kr-process-line')
        line.element1 = event.target
        line.x2 = event.clientX
        line.y2 = event.clientY
        //event.target.appendChild(line)
        line.reDraw()


        if (!event.target.id) { event.target.id = String(crypto.randomUUID()) }
        event.dataTransfer.setData('text', event.target.id)
        if (!line.id) { line.id = String(crypto.randomUUID()) }
        event.dataTransfer.setData('line', line.id)


        // make it half transparent
        event.target.classList.add("dragging");
        event.target.classList.add("draggingConnect");
    });

    element.addEventListener("dragend", (event) => {
        // reset the transparency
        event.preventDefault()
        event.target.classList.remove("dragging");
        event.target.classList.remove("draggingConnect");
        line.line.remove()

    });

}


function getActionRecord(actionID, draggedElement, dropzoneElement, resultElement){

    let record = {
        "@type": "action",
        "@id": String(crypto.randomUUID()),
        "name": actionID,
        "object": draggedElement,
        "instrument": dropzoneElement,
        "result": resultElement
    }
    return record
}




function setPosition(element, x, y) {

    let snapX = 50
    let snapY = 50

    var elementRect = element.getBoundingClientRect();

    let adjX = Number(x) - ((elementRect.right - elementRect.left) / 2)
    let adjY = Number(y) - ((elementRect.bottom - elementRect.top) / 2)

    adjX =Math.ceil(adjX / snapX) * snapX; 

    adjY =Math.ceil(adjY / snapY) * snapY; 


    element.style.position = "absolute"
    element.style.left = String(adjX) + 'px'
    element.style.top = String(adjY) + 'px'


}
