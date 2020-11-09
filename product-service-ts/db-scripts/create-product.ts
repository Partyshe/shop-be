export const createProductQuery = `WITH new_product AS (
  INSERT INTO product(
    description, title, price, image_url
  ) VALUES($1, $2, $3, $4) RETURNING id
)
INSERT INTO store(product_id, count)
(SELECT new_product.id, $5 as count from new_product)
RETURNING product_id`;