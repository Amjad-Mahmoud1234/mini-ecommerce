ALTER TABLE "ProductVariant"
ADD CONSTRAINT "ProductVariant_stock_check"
CHECK ("stock" >= 0);

ALTER TABLE "CartItem"
ADD CONSTRAINT "CartItem_quantity_check"
CHECK ("quantity" > 0);