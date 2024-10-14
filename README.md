# ts-model-mapper

A flexible, type-safe TypeScript utility for mapping dynamic data to strongly-typed models.

## Introduction

`ts-model-mapper` is a lightweight TypeScript library that provides a robust solution for converting dynamic data (such as API responses or database query results) into strongly-typed TypeScript models. It offers a balance between type safety and flexibility, allowing you to easily handle scenarios where the shape of input data might not perfectly match your defined models.

## Genesis

This library was born out of the need to bridge the gap between dynamic data sources (often returning `Record<string, unknown>` or similar loosely-typed structures) and strongly-typed TypeScript models. It was inspired by the functionality of C#'s `JsonConvert.DeserializeObject`, but adapted for TypeScript's type system and common use cases in modern web development.

The core `assertType` function was developed to provide a flexible, reusable solution that could be applied across various projects, reducing boilerplate code and enhancing type safety.

## Installation

```bash
npm install ts-model-mapper
```

or

```bash
yarn add ts-model-mapper
```

## Usage

### Basic Usage

```typescript
import { assertType } from 'ts-model-mapper';

// Define your model
class UserModel {
  id: number;
  name: string;
  isActive: boolean;
}

// Your dynamic data
const data = [
  { id: 1, name: "Alice", isActive: true, extraField: "This will be ignored" },
  { id: 2, name: "Bob", isActive: false }
];

// Map the data to your model
const users = assertType(data, UserModel);

console.log(users);
// Output: [
//   { id: 1, name: "Alice", isActive: true },
//   { id: 2, name: "Bob", isActive: false }
// ]
```

### Handling Warnings

The `assertType` function will log warnings for fields in the input data that are not present in your model:

```typescript
const data = [
  { id: 1, name: "Alice", isActive: true, extraField: "This will trigger a warning" }
];

const users = assertType(data, UserModel);
// Console warning: "Unhandled field in input data: extraField"
```

### Using with API Responses

```typescript
import axios from 'axios';
import { assertType } from 'ts-model-mapper';

class ProductModel {
  id: number;
  name: string;
  price: number;
}

async function getProducts() {
  const response = await axios.get('https://api.example.com/products');
  return assertType(response.data, ProductModel);
}

getProducts().then(products => {
  console.log(products); // Strongly-typed ProductModel[]
});
```

## API Reference

### assertType<T>(data: Record<string, unknown>[], ModelClass: new () => T): T[]

Maps an array of dynamic objects to an array of strongly-typed objects based on the provided model class.

- `data`: An array of objects with string keys and unknown values.
- `ModelClass`: A constructor function for the model class.
- Returns: An array of objects matching the structure of the model class.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.