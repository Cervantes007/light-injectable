import 'reflect-metadata';

const metadataKeys = {
  injectable: 'custom:injectable'
};

export function injectableInstance(instance) {
	Reflect.defineMetadata(metadataKeys.injectable, instance, instance.constructor);
}

export function inject() {
  return (target: any, property?: string) => {
    if (property) {
      const type = Reflect.getOwnMetadata("design:type", target, property);
      if (type) {
        const currentInstance = Reflect.getMetadata(metadataKeys.injectable, type);
        if (currentInstance) {
          target[property] = currentInstance;
        }
      }
    } else {
      return spellbook(target);
    }
  };
}

export function injectable() {
  return (target: any) => {
    const newConstructor = spellbook(target) || target;
    Reflect.defineMetadata(metadataKeys.injectable, new newConstructor(), newConstructor);
    return newConstructor;
  };
}

function spellbook(target) {
  const paramTypes: any[] = Reflect.getOwnMetadata("design:paramtypes", target);
  if (paramTypes) {
    const newArgs = paramTypes.map((param) => {
      const currentInstance = Reflect.getMetadata(metadataKeys.injectable, param);
      if (currentInstance) {
        return currentInstance;
      }
    });
    return target.bind(null, ...newArgs);
  }
	return Reflect.getMetadata(metadataKeys.injectable, target);
}
