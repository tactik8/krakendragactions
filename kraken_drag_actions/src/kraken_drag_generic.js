
// --------------------------------------------------------------------
// -------------------- Drag Generic -------------------------
// --------------------------------------------------------------------

export const krDragGeneric = {
    setDropzone: setListenerDropzoneDragGeneric,
    setDraggable: setListenerDraggableDragGeneric
}





function setListenerDropzoneDragGeneric(element, callbackFn) {


    element.classList.add('krDragGenericDropzone')

    element.addEventListener("dragover", (event) => {
        event.preventDefault()
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault()

        let draggedID = event.dataTransfer.getData('text')
        let dragged = document.getElementById(draggedID)

        if(!dragged){ return }
        if(!dragged.classList) {return}
        if (!dragged.classList.contains('krDragGenericDraggable')){ return }

        if (!event.currentTarget.classList ){return}
        if (!event.currentTarget.classList.contains('krDragGenericDropzone') ){return}

        if(event.target.closest('.krDragGenericDropzone') != event.currentTarget){return}

        console.log(event.currentTarget.id)
        //event.stopImmediatePropagation()



        dragged.style.position = 'initial'
      
        event.currentTarget.getElementsByClassName('krDropzoneGeneric')[0].appendChild(dragged)

        // Callback to callbackFn if provided with action record
        var actionRecord = getActionRecord('krDragGeneric')
        if (callbackFn){
            callbackFn(actionRecord)
        }

    });
}


function setListenerDraggableDragGeneric(element) {

    element.classList.add('krDragGenericDraggable')

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
        event.currentTarget.classList.add("draggingGeneric");
    });

    element.addEventListener("dragend", (event) => {
        // reset the transparency
        event.preventDefault()
        event.currentTarget.classList.remove("dragging");
        event.currentTarget.classList.remove("draggingGeneric");

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
