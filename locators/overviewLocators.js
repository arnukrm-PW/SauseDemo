const overviewLocator = 
{
overviewTitle : ".title",
cancelButton:'[data-test="cancel"]',
finishButton:'[data-test="finish"]',

paymentInformation : "[data-test='payment-info-value']",
shippingInformation : "[data-test='shipping-info-value']",
priceTotal:"[data-test='subtotal-label']",
taxDetails:'[data-test="tax-label"]',
totalDetails:'[data-test="total-label"]',

cartProductName:".inventory_item_name",
cartProductDescription:".inventory_item_desc",
cartProductPrice:".inventory_item_price"

}
module.exports=overviewLocator