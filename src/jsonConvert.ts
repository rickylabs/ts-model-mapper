/**
 * Utility class to mimic C#'s JsonConvert behavior.
 */
export class JsonConvert {
  /**
   * Deserializes a JSON string into an array of objects of the specified type.
   * @param json The JSON string to deserialize.
   * @param type The constructor function for the desired object type.
   * @returns An array of objects of the specified type.
   */
  static deserializeObject<T>(json: string, type: new () => T): T[] {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => Object.assign(new type(), item));
    }
    throw new Error("Expected an array");
  }

  /**
   * Serializes an object to a JSON string.
   * @param obj The object to serialize.
   * @returns A JSON string representation of the object.
   */
  static serializeObject(obj: unknown): string {
    return JSON.stringify(obj);
  }
}
