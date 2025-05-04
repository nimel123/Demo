import ProductCard from '@components/product/product-cards/product-card';
import { FC } from 'react';
import { useProductsQuery } from '@framework/product/get-all-products';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { Product } from '@framework/types';

interface ProductFeedProps {
  element?: any;
  className?: string;
}

const ProductBundleGrid: FC<ProductFeedProps> = ({
  element,
  className = '',
}) => {
  const limit = 35;
  const { data, isLoading, error } = useProductsQuery({
    limit: limit,
  });

  // Fallback for data to prevent undefined errors
  const pages = data?.pages ?? [];

  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-3 md:gap-4 2xl:gap-5">
          {isLoading && pages.length === 0 ? (
            Array.from({ length: 30 }).map((_, idx) => (
              <ProductCardLoader
                key={`product--key-${idx}`}
                uniqueKey={`product--key-${idx}`}
              />
            ))
          ) : (
            <>
              {pages.map((page, pageIndex) => (
                <div key={`page-${pageIndex}`} className="w-full">
                  {/* Display first 21 products */}
                  {page.data.slice(0, 21).map((product: Product) => (
                    <ProductCard key={`product--key${product.id}`} product={product} />
                  ))}

                  {/* Render more products if available */}
                  {page.data.length > 21 &&
                    page.data.slice(21).map((product: Product) => (
                      <ProductCard key={`product--key${product.id}`} product={product} />
                    ))}
                  
                  {element && <div className="col-span-full">{element}</div>}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductBundleGrid;
