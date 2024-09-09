import { ListProduct } from '@/@types/product'
import { StatusProduct } from '@/@types/status-product'
import { faker } from '@faker-js/faker'

export function generateProducts(count: number): ListProduct[] {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    originalPrice: parseFloat(
      faker.commerce.price({ min: 100, max: 1000, dec: 2 }),
    ),
    finalPrice: parseFloat(faker.commerce.price({ min: 50, max: 900, dec: 2 })),
    discountPercentage: faker.number.int({ min: 0, max: 100 }),
    quantityInStock: faker.number.int({ min: 1, max: 500 }),
    manufactureDate: faker.date.past({ years: 2 }).toISOString(),
    validityInDays: faker.number.int({ min: 30, max: 365 }),
    unitOfMeasure: faker.helpers.arrayElement(['kg', 'g', 'L', 'mL', 'cm']),
    weight: faker.number.float({ min: 0.1, max: 10, precision: 0.01 }),
    dimensions_height: `${faker.number.int({ min: 10, max: 100 })} cm`,
    dimensions_width: `${faker.number.int({ min: 10, max: 100 })} cm`,
    dimensions_depth: `${faker.number.int({ min: 10, max: 100 })} cm`,
    manufacturer: faker.company.name(),
    batch: faker.string.alphanumeric({ length: 10 }).toUpperCase(),
    status: faker.helpers.enumValue(StatusProduct),
    companyId: faker.string.uuid(),
    categoryIds: Array.from({
      length: faker.number.int({ min: 1, max: 3 }),
    }).map(() => faker.string.uuid()),
  }))
}
