import WishlistProductCard from '@components/product/wishlist-product-card';
import type { FC } from 'react';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { Product } from '@framework/types';  // Assuming this is the correct type for the product

interface ProductWishlistProps {
  element?: any;
  className?: string;
}

const ProductWishlistGrid: FC<ProductWishlistProps> = ({
  element,
  className = '',
}) => {
  const limit = 35;
  const { data, isLoading, error } = useWishlistProductsQuery({
    limit: limit,
  });

  // Assuming data is an array of products
  const products = data ?? [];

  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col">
          {isLoading ? (
            // Display loading state if data is being fetched
            Array.from({ length: limit }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            // Display the wishlist products once data is available
            products.map((product: Product) => (
              <WishlistProductCard
                key={`product--key${product.id}`}
                product={product}
              />
            ))
          )}
        </div>
      )}

      {/* If element exists, render it */}
      {element && <div className="col-span-full">{element}</div>}
    </div>
  );
};

export default ProductWishlistGrid;
