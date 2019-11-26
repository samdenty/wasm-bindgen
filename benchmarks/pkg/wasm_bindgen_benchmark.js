import { Foo, jsthunk } from '../globals.js';
import * as __wbg_star0 from '../globals.js';

let wasm;

/**
* @param {number} n
*/
export function call_js_thunk_n_times(n) {
    wasm.call_js_thunk_n_times(n);
}

/**
* @param {number} n
* @param {number} a
* @param {number} b
*/
export function call_js_add_n_times(n, a, b) {
    wasm.call_js_add_n_times(n, a, b);
}

/**
*/
export function thunk() {
    wasm.thunk();
}

/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a, b) {
    const ret = wasm.add(a, b);
    return ret;
}

/**
* @param {number} n
* @returns {number}
*/
export function fibonacci(n) {
    const ret = wasm.fibonacci(n);
    return ret;
}

/**
* @returns {number}
*/
export function fibonacci_high() {
    const ret = wasm.fibonacci_high();
    return ret;
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {number} n
* @param {any} foo
*/
export function call_foo_bar_final_n_times(n, foo) {
    try {
        wasm.call_foo_bar_final_n_times(n, addBorrowedObject(foo));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {number} n
* @param {any} foo
*/
export function call_foo_bar_structural_n_times(n, foo) {
    try {
        wasm.call_foo_bar_structural_n_times(n, addBorrowedObject(foo));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {number} n
*/
export function call_doesnt_throw_n_times(n) {
    wasm.call_doesnt_throw_n_times(n);
}

/**
* @param {number} n
*/
export function call_doesnt_throw_with_catch_n_times(n) {
    wasm.call_doesnt_throw_with_catch_n_times(n);
}

/**
* @param {number} n
* @param {any} element
*/
export function call_first_child_final_n_times(n, element) {
    try {
        wasm.call_first_child_final_n_times(n, addBorrowedObject(element));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

/**
* @param {number} n
* @param {any} element
*/
export function call_first_child_structural_n_times(n, element) {
    try {
        wasm.call_first_child_structural_n_times(n, addBorrowedObject(element));
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

let WASM_VECTOR_LEN = 0;

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function passArrayJsValueToWasm(array) {
    const ptr = wasm.__wbindgen_malloc(array.length * 4);
    const mem = getUint32Memory();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
* @param {number} n
* @param {any[]} elements
*/
export function call_node_first_child_n_times(n, elements) {
    wasm.call_node_first_child_n_times(n, passArrayJsValueToWasm(elements), WASM_VECTOR_LEN);
}

/**
* @param {number} n
* @param {any[]} elements
*/
export function call_node_node_type_n_times(n, elements) {
    wasm.call_node_node_type_n_times(n, passArrayJsValueToWasm(elements), WASM_VECTOR_LEN);
}

/**
* @param {number} n
* @param {any[]} elements
*/
export function call_node_has_child_nodes_n_times(n, elements) {
    wasm.call_node_has_child_nodes_n_times(n, passArrayJsValueToWasm(elements), WASM_VECTOR_LEN);
}

/**
* @param {any} element
*/
export function count_node_types(element) {
    wasm.count_node_types(addHeapObject(element));
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {

    let len = arg.length;
    let ptr = wasm.__wbindgen_malloc(len);

    const mem = getUint8Memory();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = wasm.__wbindgen_realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory = null;
function getInt32Memory() {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}
/**
* @param {string} s
* @returns {string}
*/
export function str_roundtrip(s) {
    const retptr = 8;
    const ret = wasm.str_roundtrip(retptr, passStringToWasm(s), WASM_VECTOR_LEN);
    const memi32 = getInt32Memory();
    const v0 = getStringFromWasm(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
    wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
    return v0;
}

function getObject(idx) { return heap[idx]; }

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function GetOwnOrInheritedPropertyDescriptor(obj, id) {
    while (obj) {
        let desc = Object.getOwnPropertyDescriptor(obj, id);
        if (desc) return desc;
        obj = Object.getPrototypeOf(obj);
    }
    return {};
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_bar_be39433b107f574c = function(arg0) {
        Foo.prototype.bar.call(getObject(arg0));
    };
    imports.wbg.__wbg_bar_ecb09d67d012d94e = function(arg0) {
        getObject(arg0).bar();
    };
    imports.wbg.__wbg_jsthunk_06330a0180a79545 = function() {
        try {
            jsthunk();
        } catch (e) {
            handleError(e)
        }
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_firstChild_a71694b74dc435f3 = function(arg0) {
        const ret = GetOwnOrInheritedPropertyDescriptor(Element.prototype, 'firstChild').get.call(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_firstChild_708a5ee860a65e50 = function(arg0) {
        const ret = getObject(arg0).firstChild;
        return addHeapObject(ret);
    };
    imports.wbg.__widl_f_has_child_nodes_Node = function(arg0) {
        const ret = getObject(arg0).hasChildNodes();
        return ret;
    };
    imports.wbg.__widl_f_node_type_Node = function(arg0) {
        const ret = getObject(arg0).nodeType;
        return ret;
    };
    imports.wbg.__widl_f_first_child_Node = function(arg0) {
        const ret = getObject(arg0).firstChild;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__widl_f_next_sibling_Node = function(arg0) {
        const ret = getObject(arg0).nextSibling;
        return isLikeNone(ret) ? 0 : addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports['../globals.js'] = __wbg_star0;

    if ((typeof URL === 'function' && module instanceof URL) || typeof module === 'string' || (typeof Request === 'function' && module instanceof Request)) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                return response
                .then(r => {
                    if (r.headers.get('Content-Type') != 'application/wasm') {
                        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                        return r.arrayBuffer();
                    } else {
                        throw e;
                    }
                })
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

