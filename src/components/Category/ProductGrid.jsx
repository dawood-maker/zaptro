import ProductCard from "./ProductCard";

const ProductGrid = ({ title, products }) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          {title === "all" ? "All Products" : title.toUpperCase()}
        </h2>
        <p className="text-gray-600">Showing {products.length} products</p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-xl text-gray-400">No products found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductGrid;
