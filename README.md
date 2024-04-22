# kraken_drag_Actions
Library to facilitate drag and drops 

## How to use

```
import { krDragActions } from '...'


function callbackFn(event){
    console.log('The element has been dragged and copied', event)
}


// Set drop zone
let test1 = document.getElementById('test1')
krDragActions.dragCopy.setDropzone(test1, callbackFn)

// Set draggable
let test2 = document.getElementById('test2')
krDragActions.dragCopy.setDraggable(test2)


```

## Event record structure

```

event = {
        "@type": "action",
        "@id": String(crypto.randomUUID()),
        "object": draggedElement,
        "instrument": dropzoneElement,
        "result": resultElement
}

```
