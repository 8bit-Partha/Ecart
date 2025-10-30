import {
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type CartItemWithProduct,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  
  getCartItems(): Promise<CartItem[]>;
  getCartItemsWithProducts(): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;
  clearCart(): Promise<void>;
  
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.initializeProducts();
  }

  private initializeProducts() {
    const mockProducts: Omit<Product, "id">[] = [
      {
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-canceling headphones with 30-hour battery life and studio-quality sound",
        price: "149.99",
        image: "/assets/generated_images/Wireless_bluetooth_headphones_product_252e0004.png",
        category: "Electronics",
        stock: 100,
      },
      {
        name: "Leather Crossbody Bag",
        description: "Handcrafted Italian leather bag with adjustable strap and multiple compartments",
        price: "89.99",
        image: "/assets/generated_images/Leather_crossbody_bag_product_3a2cdf02.png",
        category: "Accessories",
        stock: 100,
      },
      {
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life",
        price: "199.99",
        image: "/assets/generated_images/Smart_fitness_watch_product_774a3e4f.png",
        category: "Electronics",
        stock: 100,
      },
      {
        name: "Insulated Water Bottle",
        description: "Vacuum-insulated stainless steel bottle keeps drinks cold for 24hrs, hot for 12hrs",
        price: "34.99",
        image: "/assets/generated_images/Insulated_water_bottle_product_57e8dbd8.png",
        category: "Fitness",
        stock: 100,
      },
      {
        name: "Aluminum Laptop Stand",
        description: "Ergonomic adjustable stand for laptops up to 17 inches with ventilation design",
        price: "59.99",
        image: "/assets/generated_images/Laptop_stand_product_05f84537.png",
        category: "Office",
        stock: 100,
      },
      {
        name: "Ceramic Coffee Mug Set",
        description: "Set of 4 minimalist ceramic mugs, dishwasher and microwave safe",
        price: "39.99",
        image: "/assets/generated_images/Ceramic_coffee_mug_set_c1b2c44b.png",
        category: "Home",
        stock: 100,
      },
      {
        name: "Portable Power Bank",
        description: "20,000mAh fast-charging power bank with dual USB ports and LED display",
        price: "44.99",
        image: "/assets/generated_images/Portable_charger_power_bank_9f94f1ab.png",
        category: "Electronics",
        stock: 100,
      },
      {
        name: "Premium Yoga Mat",
        description: "Non-slip eco-friendly yoga mat with alignment marks and carrying strap",
        price: "54.99",
        image: "/assets/generated_images/Premium_yoga_mat_product_83c8505a.png",
        category: "Fitness",
        stock: 100,
      },
    ];

    mockProducts.forEach((product) => {
      const id = randomUUID();
      this.products.set(id, { ...product, id } as Product);
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItems.values());
  }

  async getCartItemsWithProducts(): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values());
    const itemsWithProducts: CartItemWithProduct[] = [];

    for (const item of items) {
      const product = await this.getProduct(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }

    return itemsWithProducts;
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) => item.productId === insertItem.productId
    );

    if (existingItem) {
      existingItem.quantity += insertItem.quantity;
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = { ...insertItem, id };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(
    id: string,
    quantity: number
  ): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(): Promise<void> {
    this.cartItems.clear();
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    await this.clearCart();
    return order;
  }
}

export const storage = new MemStorage();
