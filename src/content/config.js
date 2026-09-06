---
import { getCollection } from 'astro/content';
import BulkCounter from '../components/BulkCounter.jsx';

// 1. Fetch all markdown product files automatically from src/content/products/
const localProducts = await getCollection('products');

// 2. Dynamically gather all categories from the active files and add an "All" option
const uniqueCategories = ["All", ...new Set(localProducts.map(p => p.data.category))];
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Corporate Gifting B2B Catalog</title>
    <style>
      body { font-family: system-ui, sans-serif; padding: 40px; background: #f3f4f6; color: #1f2937; margin: 0; }
      main { max-width: 1000px; margin: 0 auto; }
      h1 { text-align: center; margin-bottom: 5px; }
      
      .filter-menu { display: flex; justify-content: center; gap: 10px; margin: 30px 0; flex-wrap: wrap; }
      .filter-btn { background: white; border: 1px solid #d1d5db; padding: 8px 16px; border-radius: 20px; cursor: pointer; font-weight: 500; transition: all 0.2s ease; }
      .filter-btn:hover { background: #f9fafb; border-color: #9ca3af; }
      .filter-btn.active { background: #4338ca; color: white; border-color: #4338ca; }

      .catalog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
      .product-card { background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); display: flex; flex-direction: column; overflow: hidden; transition: transform 0.2s ease; }
      .product-card:hover { transform: translateY(-4px); }
      .product-image { width: 100%; height: 200px; object-fit: cover; background-color: #e5e7eb; }
      
      .card-content { padding: 20px; display: flex; flex-direction: column; flex-grow: 1; justify-content: space-between; }
      .badge { background: #e0e7ff; color: #4338ca; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; align-self: flex-start; margin-bottom: 10px; }
      .product-card h3 { margin: 8px 0; font-size: 18px; }
      .meta { font-size: 14px; color: #4b5563; margin-bottom: 15px; }
      .meta p { margin: 4px 0; }
    </style>
  </head>
  <body>
    <main>
      <h1>🎁 Dynamic Corporate Catalog</h1>
      <p style="text-align: center; color: #6b7280;">This storefront renders live items straight from your content management panel files.</p>
      
      <!-- Interactive Filter Pills -->
      <div class="filter-menu">
        {uniqueCategories.map((cat, index) => (
          <button class={`filter-btn ${index === 0 ? 'active' : ''}`} data-target={cat}>
            {cat}
          </button>
        ))}
      </div>

      <!-- Live Catalog Grid -->
      <div class="catalog-grid">
        {localProducts.map((product) => (
          <div class="product-card" data-category={product.data.category}>
            <img src={product.data.image} alt={product.data.title} class="product-image" />
            
            <div class="card-content">
              <div>
                <span class="badge">{product.data.category}</span>
                <h3>{product.data.title}</h3>
                <div class="meta">
                  <p><strong>Base Price:</strong> ₹{product.data.price}</p>
                  <p><strong>Min. Order (MOQ):</strong> {product.data.moq} units</p>
                </div>
              </div>
              
              <!-- Connecting the live data attributes right into the React Counter -->
              <BulkCounter client:load initialQty={product.data.moq} basePrice={product.data.price} productName={product.data.title} />
            </div>
          </div>
        ))}
      </div>
    </main>

    <!-- Fast Script for Client-Side Filtering -->
    <script>
      const buttons = document.querySelectorAll('.filter-btn');
      const cards = document.querySelectorAll('.product-card') as NodeListOf<HTMLElement>;

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelector('.filter-btn.active')?.classList.remove('active');
          btn.classList.add('active');
          const target = btn.getAttribute('data-target');
          
          cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (target === 'All' || cardCategory === target) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    </script>
  </body>
</html>
