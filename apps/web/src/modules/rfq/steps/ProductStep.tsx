import type { ProductSelection } from "../types/rfq.types";
import { PRODUCT_CATEGORIES } from "../data/rfq.config";

interface ProductSelectionStepProps {
  products: ProductSelection[];
  updateProducts: (products: ProductSelection[]) => void;
}

interface ProductSpecificationsStepProps {
  products: ProductSelection[];
  updateProducts: (products: ProductSelection[]) => void;
}

export const ProductSelectionStep = ({
  products,
  updateProducts,
}: ProductSelectionStepProps) => {
  const handleToggleCategory = (category: string, checked: boolean) => {
    if (checked) {
      const next: ProductSelection[] = [
        ...products,
        {
          category,
          productId: category.toLowerCase(),
          productName: category,
          quantity: 1000,
          specifications: {},
        },
      ];
      updateProducts(next);
      return;
    }

    const filtered = products.filter(
      (product) => product.category !== category,
    );
    updateProducts(filtered);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">
        Select Products
      </h2>
      <div className="space-y-4">
        {PRODUCT_CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex items-center p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input
              type="checkbox"
              checked={products.some(
                (product) => product.category === category,
              )}
              onChange={(event) =>
                handleToggleCategory(category, event.target.checked)
              }
              className="w-5 h-5 text-blue-600"
            />
            <span className="ml-3 font-semibold text-neutral-900">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export const ProductSpecificationsStep = ({
  products,
  updateProducts,
}: ProductSpecificationsStepProps) => {
  const handleQuantityChange = (index: number, value: string) => {
    const next = [...products];
    next[index].quantity = Number.parseInt(value, 10) || 0;
    updateProducts(next);
  };

  const handleCustomizationChange = (index: number, value: string) => {
    const next = [...products];
    next[index].specifications.customization = value;
    updateProducts(next);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-neutral-900 mb-6">
        Specify Quantities
      </h2>
      <div className="space-y-6">
        {products.map((product, index) => (
          <div
            key={product.category}
            className="border border-neutral-200 rounded-lg p-6"
          >
            <h3 className="font-semibold text-lg text-neutral-900 mb-4">
              {product.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Quantity (units)
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={product.quantity}
                  onChange={(event) =>
                    handleQuantityChange(index, event.target.value)
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Customization Notes (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Custom wash, specific colors"
                  value={product.specifications.customization ?? ""}
                  onChange={(event) =>
                    handleCustomizationChange(index, event.target.value)
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
