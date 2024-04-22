



// --------------------------------------------------------------------
// -------------------- Drag and copy ---------------------------------
// --------------------------------------------------------------------

/**
 * Creates a copy of an element when dragged and dropped over a specificed dropzone.
 *
 * How to use:
 *     can be initialized by calling setDropzone(element) and setDraggable(element)
 *     or
 *     by adding the class "krDragAndCopyDropzone" and "krDragAndCopyDraggable"
 *
 * If a callbackFn is provided, calls back with actionRecord:
     * actionRecord = {
            "@type": "action",
            "@id": String(crypto.randomUUID()),
            "object": draggedElement,
            "instrument": dropzoneElement,
            "result": resultElement
    }
 */



export const krDragCopy = {
    setDropzone: setListenerDropzoneDragAndCopy,
    setDraggable: setListenerDraggableDragAndCopy
}





function setListenerDropzoneDragAndCopy(element, callbackFn) {

    element.classList.add('krDragAndCopyDropzone')

    element.addEventListener("dragover", (event) => {
        event.preventDefault()
    });

    element.addEventListener("drop", (event) => {
        event.preventDefault()



        let draggedID = event.dataTransfer.getData('text')
        let dragged = document.getElementById(draggedID)

        if (dragged && dragged.classList && dragged.classList.contains('krDragAndCopyDraggable')) {
            event.preventDefault()
            event.stopPropagation()
            let draggedClone = dragged.cloneNode(true)
            draggedClone.id = String(crypto.randomUUID())
            draggedClone.classList.remove('krDragAndCopyDraggable')
            draggedClone.classList.remove("dragging");
            draggedClone.classList.remove("draggingCopy");
            draggedClone.style.position = 'absolute'


            event.currentTarget.appendChild(draggedClone)



            setPosition(draggedClone, event.clientX, event.clientY)

            // Callback to callbackFn if provided with action record
            var actionRecord = getActionRecord('krDragCopy')
            if (callbackFn){
                callbackFn(actionRecord)
            }

        }

    });
}


function setListenerDraggableDragAndCopy(element) {


    element.classList.add('krDragAndCopyDraggable')

    element.setAttribute('draggable', 'true')

    element.addEventListener("drag", (event) => {
        event.preventDefault()

    });

    element.addEventListener("dragstart", (event) => {
        // store a ref. on the dragged elem

        if (!event.target.id) { event.target.id = String(crypto.randomUUID()) }
        event.dataTransfer.setData('text', event.target.id)

        // make it half transparent
        event.target.classList.add("dragging");
        event.target.classList.add("draggingCopy");
    });

    element.addEventListener("dragend", (event) => {
        // reset the transparency
        event.preventDefault()
        event.target.classList.remove("dragging");
        event.target.classList.remove("draggingCopy");

    });

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


function init(){

    var elements = document.getElementsByClassName('krDragAndCopyDropzone')
    for(let element of elements){
        setListenerDropzoneDragAndCopy(element)
    }


    var elements = document.getElementsByClassName('krDragAndCopyDropzone')
    for(let element of elements){
        setListenerDraggableDragAndCopy(element)
    }
    
    
}



document.addEventListener("DOMContentLoaded", function() {
  init()
});

