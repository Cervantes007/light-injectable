"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const metadataKeys = {
    injectable: 'custom:injectable'
};
function inject() {
    return (target, property) => {
        if (property) {
            const type = Reflect.getOwnMetadata("design:type", target, property);
            if (type) {
                const currentInstance = Reflect.getMetadata(metadataKeys.injectable, type);
                if (currentInstance) {
                    target[property] = currentInstance;
                }
            }
        }
        else {
            return spellbook(target);
        }
    };
}
exports.inject = inject;
function injectable() {
    return (target) => {
        const newConstructor = spellbook(target) || target;
        Reflect.defineMetadata(metadataKeys.injectable, new newConstructor(), newConstructor);
        return newConstructor;
    };
}
exports.injectable = injectable;
function spellbook(target) {
    const paramTypes = Reflect.getOwnMetadata("design:paramtypes", target);
    if (paramTypes) {
        const newArgs = paramTypes.map((param) => {
            const currentInstance = Reflect.getMetadata(metadataKeys.injectable, param);
            if (currentInstance) {
                return currentInstance;
            }
        });
        return target.bind(null, ...newArgs);
    }
}
//# sourceMappingURL=index.js.map