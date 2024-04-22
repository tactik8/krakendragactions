



// --------------------------------------------------------------------
// -------------------- Drag and move ---------------------------------
// --------------------------------------------------------------------

export const krDragMove = {
    setDropzone: setListenerDropzoneDragAndMove,
    setDraggable: setListenerDraggableDragAndMove
}


function setListenerDropzoneDragAndMove(element, callbackFn) {


    element.classList.add('krDragAndMoveDropzone')

    element.addEventListener("dragover", (event) => {
        event.preventDefault()
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault()

        let draggedID = event.dataTransfer.getData('text')
        let dragged = document.getElementById(draggedID)

        if(!dragged){ return }
        if(!dragged.classList) {return}
        if (!dragged.classList.contains('krDragAndMoveDraggable')){ return }

        if (!event.target.classList ){return}
        if (!event.target.classList.contains('krDragAndMoveDropzone') ){return}
        
        setPosition(dragged, event.clientX, event.clientY)

    
        // Callback to callbackFn if provided with action record
        var actionRecord = getActionRecord('krDragMove')
        if (callbackFn){
            callbackFn(actionRecord)
        }
    });
}


function setListenerDraggableDragAndMove(element) {

    element.classList.add('krDragAndMoveDraggable')

    element.setAttribute('draggable', 'true')

    element.addEventListener("drag", (event) => {
        event.preventDefault()
    });

    element.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem

        if (!event.currentTarget.id) { event.currentTarget.id = String(crypto.randomUUID()) }
        event.dataTransfer.setData('text', event.currentTarget.id)

        // make it half transparent
        event.currentTarget.classList.add("dragging");
        event.currentTarget.classList.add("draggingMove");
    });

    element.addEventListener("dragend", (event) => {
        // reset the transparency
        event.preventDefault()
        event.currentTarget.classList.remove("dragging");
        event.currentTarget.classList.remove("draggingMove");

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
