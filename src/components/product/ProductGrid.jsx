import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="text-center text-xl text-gray-400 py-12">
        No products found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductGrid;