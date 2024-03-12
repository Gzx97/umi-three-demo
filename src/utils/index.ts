/**
 * 递归树结构，修改树结构的属性的key
 * @param data 树结构数据
 * @param key 要修改的key
 * @param value 要修改的key的值
 * @param childrenName 子节点的key名称
 * @param joinPropName 要拼接的key的名称
 */
export function recursionTree(
  data: any[],
  key: string,
  value: string,
  childrenName = "children",
  joinPropName?: string
) {
  data.forEach((item) => {
    if (item[value]) {
      item[key] = item[value];
      delete item[value];
    }
    if (joinPropName) {
      item[key] = item[key] + "|" + item[joinPropName];
    }
    if (item[childrenName]) {
      recursionTree(item[childrenName], key, value, childrenName, joinPropName);
    }
  });
}

import type { Object3D } from "three";

/**
 * Finding object3D parent(include itself) circularly until callback return true.
 * If don't find the parent match the callback,it will return null.
 * @param  {Object3D} object3d
 * @param  {(obj:Object3D)=>boolean} callback
 * @returns {Object3D|null}
 */
export function findParent(
  object3d: Object3D,
  callback: (obj: Object3D) => boolean
): Object3D | null {
  let parent: Object3D | null = object3d;
  while (!callback(parent)) {
    parent = parent.parent;
    if (parent === null) {
      return null;
    }
  }
  return parent;
}

export function findChildren(
  object3D: Object3D,
  callback: (obj: Object3D) => boolean
): Object3D | null {
  const children: Object3D[] = [];
  object3D.traverse((obj) => children.push(obj));
  const result = children.find(callback);
  if (result !== undefined) {
    return result;
  } else {
    return null;
  }
}

export function checkNameIncludes(obj: Object3D, str: string): boolean {
  if (obj.name.includes(str)) {
    return true;
  } else {
    return false;
  }
}
