
import { krDragCopy } from './src/kraken_drag_copy.js';
import { krDragMove } from './src/kraken_drag_move.js';
import { krDragMindmap } from './src/kraken_drag_mindmap.js';
import { krDragConnect } from './src/kraken_drag_connect.js';
import { krDragGeneric } from './src/kraken_drag_generic.js';

export const krDragActions = {
    dragMove: krDragMove,
    dragCopy: krDragCopy,
    dragMindmap: krDragMindmap,
    dragConnect: krDragConnect,
    dragGeneric: krDragGeneric
}