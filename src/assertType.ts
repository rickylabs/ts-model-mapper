/**
 * Asserts the type of an array of objects based on a given model class.
 * @param data An array of objects to be type-asserted.
 * @param ModelClass The class constructor for the desired model type.
 * @returns An array of objects matching the model type.
 */
export function assertType<T extends object>(
  data: Record<string, unknown>[],
  ModelClass: new () => T
): T[] {
  const modelKeys = Object.keys(new ModelClass()) as (keyof T)[];

  const warns = [] as { message: string }[];

  const validation = data.reduce<T[]>((acc, item) => {
    const filteredItem = modelKeys.reduce((obj, key) => {
      if (key in item) {
        const validItem = item[key as keyof typeof item];
        return {
          ...obj,
          [key]: validItem,
        };
      } else {
        warns.push({
          message: `Unhandled field in input data: ${String(key)}`,
        });
        return obj;
      }
    }, {} as Partial<T>);

    acc.push(filteredItem as T);
    return acc;
  }, []);

  warns.forEach((w) => console.warn(w.message));

  return validation;
}
