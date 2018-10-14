// Fix "error TS2304: Cannot find name 'XMLHttpRequest/Blob'"
// See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12044
declare interface XMLHttpRequest { }
declare interface Blob {}
