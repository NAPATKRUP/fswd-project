## Full-stack Web Developer Project
- Front-end created by `ReactJS`
- Back-end created by `NodeJs(Express, GraphQL, Mongoose)`
- Database using by `MongoDB Atlas`
- CSS using by `TailwaindCSS`

# Perfume House
It is an online store web application intended for selling perfumes.

## Project requirements
### 1. Implement Frontend from sitemap
- :heavy_check_mark: Home **`/`** *Display banner, latest promotion and products*
- :heavy_check_mark: Login **`/login`** *Login form*
- :heavy_check_mark: Register **`/register`** *Register form*
- :heavy_check_mark: Products **`/products`** *Display all product with pagination*
- :heavy_check_mark: Product detail **`/product/:productSlug`** *Display product detail by slug*
- :heavy_check_mark: Promotions **`/promotions`** *Display all promotion*
- :heavy_check_mark: Cart **`/cart`** *Display products in cart*
- :heavy_check_mark: Checkout **`/checkout`** *Checkout form*
- :heavy_check_mark: Payment **`/payment`** *Payment form*
- :heavy_check_mark: Customer info **`/customer`** *Display customer detail*
- :heavy_check_mark: Customer orders **`/customer/orders`** *Display customer orders*
- :heavy_check_mark: Customer order detail **`/customer/order/:orderId`** *Display order detail by order id*
- :heavy_check_mark: Admin dashboard **`/admin`** *Display admin dashboard*
- :heavy_check_mark: Admin products **`/admin/products`** *Display all product*
- :heavy_check_mark: Admin create product **`/admin/product/create`** *Create product from*
- :heavy_check_mark: Admin update product **`/admin/product/:productId`** *Update product form*
- :heavy_check_mark: Admin promotions **`/admin/promotions`** *Display all promotion*
- :heavy_check_mark: Admin create promotion **`/admin/promotion/create`** *Create promotion from*
- :heavy_check_mark: Admin update promotion **`/admin/promotion/:promotionId`** *Update promotion form*
- :heavy_check_mark: Admin orders **`/admin/orders`** *Display all orders*
- :heavy_check_mark: Admin order detail **`/admin/order/:orderId`** *Display order detail by order id*
### 2. Page detail and features
#### Pages
- :heavy_check_mark: Home
- :heavy_check_mark: Login
- :heavy_check_mark: Register
- :heavy_check_mark: Products
- :heavy_check_mark: Product detail
- :heavy_check_mark: Promotions
- :heavy_check_mark: Cart
- :heavy_check_mark: Checkout
- :heavy_check_mark: Payment
- :heavy_check_mark: Customer info
- :heavy_check_mark: Customer orders
- :heavy_check_mark: Customer order detail
- :heavy_check_mark: Admin dashboard
- :heavy_check_mark: Admin products
- :heavy_check_mark: Admin create product
- :heavy_check_mark: Admin update product
- :heavy_check_mark: Admin promotions
- :heavy_check_mark: Admin create promotion
- :heavy_check_mark: Admin update promotion
- :heavy_check_mark: Admin orders
- :heavy_check_mark: Admin order detail
#### Features
- :heavy_check_mark: Token base auth `Save token in cookie`
- :heavy_check_mark: Admin and Customer type implement User type `Set access permission and throw to error, no-permission, authentication required`
- :heavy_check_mark: Promotion type implement Product type
    1. GIVEAWAY `Buy condition and free amount`
    2. SALEFLAT `Buy condition price and discount with flat`
    3. SALEPERCENT `Buy condition price and discount with percent`
- :heavy_check_mark: Admin update order status
    1. SUCCESS `Payment state success and wait for shipping`
    2. SHIPPING `Shipping state`
    3. ARRIVED `Arrived state and can't change to more state`
    4. CANCEL `Cancel state to restock product and can't change to more state`
- :heavy_check_mark: Admin cancel order `Cancel order to restock product`
- :heavy_check_mark: Update product stock when Customer make order `Alert modal message to user`
### 3. Implement Frontend, Backend and Database support pages and features
- :heavy_check_mark:Home carousel of promotion `OwlCarousel`
- :heavy_check_mark:Products filter search by onchange `Debounce(300ms)`
- :heavy_check_mark:Products pagination of product 8 items per page `ReactPagination`
- :heavy_check_mark:Product card implement 2 button type `BuyNow, addToCart`
- :heavy_check_mark:Product card implement status of now promotion or stock with `tag`
- :heavy_check_mark:Upload image to S3 storage in aws `Product, Promotion`
- :heavy_check_mark:Product and Promotion description can read with HTML syntax use `CKEditor` for HTML editor
- :heavy_check_mark:Admin dashboard
    1. use `nivo.rocks/line` to show summary of totals daily sales
    2. show order status to total number `SUCCESS, SHIPPING`
    3. show list of `out of stock` product and can click to edit this product
- :heavy_check_mark:Implement modal to show status of process
- :heavy_check_mark:Responsive website with `grid system` use by tailwindcss or set by size of page `lg:, md:, sm:`
- :heavy_check_mark:Set up frontend project with `typescript`
### 4. Deploy Frontend, Backend and Database to server `DigitalOcean, MongoDB Atlas, AWS S3`
- :heavy_check_mark:Setup and deploy with DockerCompose

Team
======

|GitHub         |Facebook              |Responsibility              |
|-----------------|----------------------|----------------------|
|[Ice](https://github.com/Icyscools)|[Woramat Ngamkham](https://www.facebook.com/woramat.ngamkham)|Full stack developer|
|[Napat](https://github.com/NAPATKRUP)|[Napat Arayawattanapong](https://www.facebook.com/napat.arayawattanapong)|Full stack developer|
|[Gear](https://github.com/gearprn)|[Gear Purinut](https://www.facebook.com/gearprn)|Full stack developer|
|[Waiwai](https://github.com/vivi00008)|[Warit Kanbunjob](https://www.facebook.com/wai.waritkanbunjob)|Full stack developer|
