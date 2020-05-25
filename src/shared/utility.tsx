interface Object {
  [key: string]: any;
}

export const updateObject = (oldObject: Object, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
