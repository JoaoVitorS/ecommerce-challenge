```markdown
# 🌐 Ecommerce Challenge Stefanini 🚀

A full-stack e-commerce platform built with TypeScript, React, and Node.js.

Streamlining online shopping with a modern and efficient experience.

## About

The Ecommerce Challenge project is a full-stack web application designed to simulate an online shopping experience. Built using TypeScript, React, and Node.js, it aims to provide a robust and scalable platform for users to browse products, add them to a cart, and simulate complete a purchase. This project serves as a practical demonstration of modern web development techniques and best practices.

The primary goal of this project is to provide a functional and well-structured e-commerce platform that can be used as a learning resource or a starting point for more complex e-commerce solutions.

Key technologies used include TypeScript for type safety and improved code quality, React for building a dynamic and responsive user interface, and Node.js with Express for creating a RESTful API. The project leverages modern development tools and practices, such as ESLint for linting, Prettier for code formatting, and Git for version control. Its unique selling point lies in its comprehensive approach, covering all aspects of an e-commerce application, from product listing to order management.

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Prerequisites

- Node.js 18+ and npm
- Git
- Next

### Option 1: From Source

```bash
# Clone repository
git clone https://github.com/JoaoVitorS/ecommerce-challenge.git
cd ecommerce-challenge

cd /backend
# Install dependencies
npm install

# Start development server
npm run dev

cd /frontend
# Install dependencies
npm install

# Start development server
npm run dev
```


## 💻 Usage

### Basic Usage

```javascript
// Example usage of a product service
const productService = require('./src/services/productService');

// Get all products
productService.getAllProducts()
  .then(products => console.log(products))
  .catch(error => console.error(error));
```

### Advanced Examples

```javascript
// Example of adding a product to the cart
const cartService = require('./src/services/cartService');

cartService.addProductToCart(userId, productId, quantity)
  .then(cart => console.log('Product added to cart:', cart))
  .catch(error => console.error('Error adding product to cart:', error));
```

## ⚙️ Configuration

### Configuration File

```json
{
  "name": "ecommerce-config",
  "version": "1.0.0",
  "settings": {
    "theme": "light",
    "language": "en",
    "currency": "USD"
  }
}
```

## API Reference

### Products API

- `GET /api/products`: Get all products
  - Response:
    ```json
    [
      {
        "id": "1",
        "name": "Product 1",
        "description": "Description of product 1",
        "price": 29.99
      },
      {
        "id": "2",
        "name": "Product 2",
        "description": "Description of product 2",
        "price": 49.99
      }
    ]
    ```

- `GET /api/products/:id`: Get a specific product by ID
  - Response:
    ```json
    {
      "id": "1",
      "name": "Product 1",
      "description": "Description of product 1",
      "price": 29.99
    }
    ```

## 📁 Project Structure

```
ecommerce-challenge/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   ├── 📁 pages/              # Application pages
│   ├── 📁 services/           # API services
│   ├── 📁 utils/              # Utility functions
│   ├── 📁 styles/             # CSS/styling files
│   ├── 📁 models/             # Data models
│   ├── 📁 controllers/        # API controllers
│   ├── 📁 routes/             # API routes
│   └── 📄 index.tsx           # Application entry point
├── 📁 public/                 # Static assets
├── 📁 tests/                  # Test files
├── 📁 docs/                   # Documentation
├── 📄 .env.example           # Environment variables template
├── 📄 .gitignore             # Git ignore rules
├── 📄 package.json           # Project dependencies
├── 📄 README.md              # Project documentation
└── 📄 LICENSE                # License file
```
