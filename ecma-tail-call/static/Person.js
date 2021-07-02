const PersonSymbol = Symbol.for('Person');

class Person {
    static isPerson(o) {
        return o && o[PersonSymbol] ? true : false;
    }
    constructor() {
        this[PersonSymbol] = true;
    }
}