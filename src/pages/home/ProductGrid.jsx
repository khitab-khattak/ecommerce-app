import {Product} from './Product'
export function ProductGrid({products,loadCart})
{
    return(
        <div className="products-grid">
        {products.map((product) => {
          return (
          <Product key={product.id} products={product} loadCart = {loadCart}/>
          );
        })}
      </div>
    )
}