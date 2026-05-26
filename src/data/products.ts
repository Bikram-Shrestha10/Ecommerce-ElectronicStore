export interface Specification {
  key: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  specifications: Specification[];
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 349.99,
    originalPrice: 399.99,
    category: "Audio",
    brand: "Sony",
    rating: 4.8,
    reviewsCount: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Experience industry-leading noise canceling technology with the dual noise sensor and Integrated Processor V1. Exceptional sound quality and crystalline hands-free call quality. Up to 30-hour battery life with quick charging capabilities.",
    inStock: true,
    isTrending: true,
    isFeatured: true,
    specifications: [
      { key: "Battery Life", value: "Up to 30 hours" },
      { key: "Charging Type", value: "USB-C Fast Charging" },
      { key: "Bluetooth Version", value: "5.2 Dual Connection" },
      { key: "Weight", value: "250g" },
      { key: "Voice Assistant", value: "Google Assistant / Alexa / Siri" }
    ],
    reviews: [
      {
        id: "rev-1-1",
        author: "Alok Shrestha",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-05-12",
        comment: "Absolutely incredible noise cancellation! Best purchase I've made in years for my daily commute."
      },
      {
        id: "rev-1-2",
        author: "Sita Rimal",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        date: "2026-04-29",
        comment: "Very comfortable padding, sound quality is crisp and deep bass is amazing. Battery holds very well."
      }
    ]
  },
  {
    id: "prod-2",
    name: "iPhone 15 Pro Max Titanium (256GB)",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Phones",
    brand: "Apple",
    rating: 4.9,
    reviewsCount: 218,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever. Experience unbelievable speeds and high-end console gaming capabilities.",
    inStock: true,
    isTrending: true,
    isFeatured: true,
    specifications: [
      { key: "Processor", value: "A17 Pro chip with 6-core GPU" },
      { key: "Display", value: "6.7-inch Super Retina XDR OLED 120Hz" },
      { key: "Camera", value: "48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto" },
      { key: "Storage", value: "256 GB" },
      { key: "Security", value: "Face ID" }
    ],
    reviews: [
      {
        id: "rev-2-1",
        author: "Bipin Gurung",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-05-20",
        comment: "The titanium finish is gorgeous and lightweight. The zoom camera is a game-changer!"
      }
    ]
  },
  {
    id: "prod-3",
    name: "MacBook Pro 14\" M3 Max Slate Black",
    price: 1999.00,
    originalPrice: 2199.00,
    category: "Laptops",
    brand: "Apple",
    rating: 4.9,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "The M3 Max chip brings absolute power to pro workflows, with a beautiful Liquid Retina XDR display, up to 22 hours of battery life, and high-performance hardware raytracing for 3D modeling and video editing.",
    inStock: true,
    isTrending: false,
    isFeatured: true,
    specifications: [
      { key: "Chipset", value: "Apple M3 Max Chip (14-Core CPU, 30-Core GPU)" },
      { key: "RAM", value: "36GB Unified Memory" },
      { key: "SSD Storage", value: "1TB Ultra Fast SSD" },
      { key: "Screen Type", value: "14.2-inch Liquid Retina XDR 120Hz" },
      { key: "Battery", value: "Up to 22 hours runtime" }
    ],
    reviews: [
      {
        id: "rev-3-1",
        author: "Prasanna Karkee",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-05-01",
        comment: "Flawless compilation times. I can run multiple heavy Docker containers and edit 4K video without a single stutter."
      }
    ]
  },
  {
    id: "prod-4",
    name: "Samsung Galaxy Watch Ultra Titanium 47mm",
    price: 549.99,
    originalPrice: 649.99,
    category: "Smartwatches",
    brand: "Samsung",
    rating: 4.7,
    reviewsCount: 64,
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80",
    description: "Go beyond limits with Galaxy Watch Ultra. Built with rugged titanium, multi-band GPS tracking, and a long-lasting battery that endures extreme sports and outdoor conditions.",
    inStock: true,
    isTrending: true,
    isFeatured: false,
    specifications: [
      { key: "Chassis Material", value: "Grade 4 Titanium" },
      { key: "Battery Life", value: "Up to 100 hours in Power Saving" },
      { key: "Water Resistance", value: "10 ATM & IP68 Dustproof" },
      { key: "sensors", value: "BioActive Sensor (HR/ECG/BP), Temperature Sensor" },
      { key: "Connectivity", value: "LTE + Bluetooth 5.3 + Wi-Fi" }
    ],
    reviews: []
  },
  {
    id: "prod-5",
    name: "Keychron Q1 Pro QMK Custom Mechanical Keyboard",
    price: 189.99,
    originalPrice: 209.99,
    category: "Accessories",
    brand: "Keychron",
    rating: 4.6,
    reviewsCount: 78,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "A solid CNC aluminum case custom mechanical keyboard with wireless bluetooth connection, double-gasket design, and hot-swappable switches supporting high-fidelity enthusiast acoustics.",
    inStock: true,
    isTrending: true,
    isFeatured: false,
    specifications: [
      { key: "Body Material", value: "CNC Machined Aluminum" },
      { key: "Switches", value: "Gateron G Pro Brown (Tactile / Hot-swappable)" },
      { key: "Keycaps", value: "Double-shot OSA PBT" },
      { key: "Backlight", value: "South-facing RGB (22 dynamic pre-sets)" },
      { key: "Layout", value: "75% Compact TKL" }
    ],
    reviews: [
      {
        id: "rev-5-1",
        author: "Samyak Bajracharya",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-05-18",
        comment: "The weight is super solid and typing sound is like raindrops! Pure mechanical keyboard bliss."
      }
    ]
  },
  {
    id: "prod-6",
    name: "Sony Bravia XR OLED 55\" Smart TV",
    price: 1399.00,
    originalPrice: 1599.00,
    category: "TVs",
    brand: "Sony",
    rating: 4.8,
    reviewsCount: 53,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    description: "Cognitive Processor XR brings lifelike depth and spectacular contrast to your living room. Perfect for console gaming with 4K/120Hz inputs and instant auto-low latency mode.",
    inStock: true,
    isTrending: false,
    isFeatured: false,
    specifications: [
      { key: "Display Panel", value: "OLED (Self-illuminating Pixels)" },
      { key: "Resolution", value: "4K UHD (3840 x 2160)" },
      { key: "Refresh Rate", value: "120Hz Native" },
      { key: "HDR Standards", value: "Dolby Vision, HDR10, HLG" },
      { key: "Platform", value: "Google Assistant & Apple AirPlay" }
    ],
    reviews: []
  },
  {
    id: "prod-7",
    name: "PlayStation 5 Console (Slim Digital Edition)",
    price: 449.99,
    originalPrice: 499.99,
    category: "Gaming",
    brand: "Sony",
    rating: 4.8,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    description: "Experience lightning-fast loading with an ultra-high-speed SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.",
    inStock: true,
    isTrending: true,
    isFeatured: true,
    specifications: [
      { key: "Console Storage", value: "1TB PCIe Gen 4 Custom SSD" },
      { key: "Processor", value: "AMD Zen 2 8-core custom @ 3.5GHz" },
      { key: "Graphics", value: "AMD RDNA 2 custom @ 2.23GHz (10.3 TFLOPS)" },
      { key: "Output", value: "Support for 4K 120Hz and 8K TVs" },
      { key: "Accessories", value: "Includes 1x DualSense Wireless Controller" }
    ],
    reviews: [
      {
        id: "rev-7-1",
        author: "Kiran Thapa",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-05-10",
        comment: "Unbelievably fast loading times compared to PS4. The controller feedback makes immersive games like Astro's Playroom feel so real."
      }
    ]
  },
  {
    id: "prod-8",
    name: "iPad Air M2 11\" Liquid Retina (128GB)",
    price: 599.00,
    originalPrice: 649.00,
    category: "Phones",
    brand: "Apple",
    rating: 4.7,
    reviewsCount: 92,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80",
    description: "The redesigned iPad Air with supercharged M2 chip performance. It features a spectacular liquid retina display, landscape stereo speakers, and compatibility with Apple Pencil Pro and Magic Keyboard.",
    inStock: true,
    isTrending: false,
    isFeatured: false,
    specifications: [
      { key: "Chipset", value: "Apple M2 Chip with 8-Core GPU" },
      { key: "Screen", value: "11-inch IPS LED Multi-Touch with True Tone" },
      { key: "Camera", value: "12MP Wide Camera, 12MP Landscape Ultra Wide Front" },
      { key: "Biometrics", value: "Touch ID integrated on top button" },
      { key: "WiFi", value: "WiFi 6E Extreme speed" }
    ],
    reviews: []
  },
  {
    id: "prod-9",
    name: "Canon EOS R5 Mirrorless Camera Body",
    price: 2999.00,
    originalPrice: 3299.00,
    category: "Accessories",
    brand: "Canon",
    rating: 4.9,
    reviewsCount: 45,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    description: "The perfect tool for pro video creators and photographers. Shoot crystal clear 45MP stills up to 20 fps, or capture cinema quality 8K DCI video up to 30 fps with high resolution details.",
    inStock: false,
    isTrending: false,
    isFeatured: false,
    specifications: [
      { key: "Sensor Type", value: "Full-frame CMOS Sensor" },
      { key: "Resolution", value: "45.0 Megapixels" },
      { key: "Video Format", value: "8K RAW, 4K 120p 10-bit color" },
      { key: "Image Stabilization", value: "In-body 5-axis sensor stability" },
      { key: "Slots", value: "1x CFexpress Type B, 1x SD UHS-II" }
    ],
    reviews: []
  },
  {
    id: "prod-10",
    name: "JBL Charge 5 Portable Waterproof Speaker",
    price: 149.99,
    originalPrice: 179.99,
    category: "Audio",
    brand: "JBL",
    rating: 4.7,
    reviewsCount: 185,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description: "Bring the party anywhere with powerful JBL Original Pro Sound. Includes long excursion driver, separate tweeter, and dual pumping passive bass radiators. Up to 20 hours playtime and powerbank built-in.",
    inStock: true,
    isTrending: true,
    isFeatured: false,
    specifications: [
      { key: "Protection Rating", value: "IP67 Waterproof and Dustproof" },
      { key: "Battery Life", value: "Up to 20 hours runtime" },
      { key: "Power Output", value: "30W RMS Woofer, 10W RMS Tweeter" },
      { key: "Power Bank Feature", value: "Yes (USB-A port for device charging)" },
      { key: "Weight", value: "960g" }
    ],
    reviews: [
      {
        id: "rev-10-1",
        author: "Rohan Adhikari",
        avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&q=80",
        rating: 4,
        date: "2026-05-22",
        comment: "Super punchy bass! Great for taking to active hiking trips and poolside parties, battery drops about 5% per hour."
      }
    ]
  },
  {
    id: "prod-11",
    name: "Logitech MX Master 3S Wireless Mouse",
    price: 99.99,
    originalPrice: 119.99,
    category: "Accessories",
    brand: "Logitech",
    rating: 4.8,
    reviewsCount: 236,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80",
    description: "Logitech's flagship ergonomic mouse engineered for maximum comfort, ultra-quiet clicks, and an 8,000 DPI track-on-glass sensor suitable for creative designers and software engineers.",
    inStock: true,
    isTrending: true,
    isFeatured: true,
    specifications: [
      { key: "Sensor Type", value: "Darkfield high precision (8K DPI)" },
      { key: "Scroller type", value: "MagSpeed electromagnetic scroll wheel (1000 lines/sec)" },
      { key: "Battery recharge", value: "USB-C, up to 70 days standard use" },
      { key: "Modes", value: "Bluetooth and 2.4GHz Bolt USB receiver" },
      { key: "Weight", value: "141g" }
    ],
    reviews: [
      {
        id: "rev-11-1",
        author: "Nisha Sen",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        rating: 5,
        date: "2026-05-15",
        comment: "Changed my wrist fatigue completely. The horizontal scroll is phenomenal for Excel sheets and video timelines!"
      }
    ]
  },
  {
    id: "prod-12",
    name: "Google Nest Hub Max Smart Display",
    price: 229.00,
    originalPrice: 249.00,
    category: "Accessories",
    brand: "Google",
    rating: 4.5,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80",
    description: "The center of your helpful home. Keep your family connected with Duo video calling, watch YouTube videos, listen to high-fidelity audio, and manage compatible connected smart devices within your ecosystem.",
    inStock: true,
    isTrending: false,
    isFeatured: false,
    specifications: [
      { key: "Display", value: "10-inch HD touchscreen" },
      { key: "Speaker Output", value: "Stereo speaker system (2x tweeters, 1x woofer)" },
      { key: "Camera", value: "6.5MP Camera with 127-degree wide-angle view" },
      { key: "Casting Feature", value: "Built-in Chromecast" },
      { key: "Smart Home Control", value: "Thread and Matter Compatible" }
    ],
    reviews: []
  }
];

export const CATEGORIES = [
  "All",
  "Phones",
  "Laptops",
  "Audio",
  "Smartwatches",
  "Gaming",
  "TVs",
  "Accessories"
];

export const BRANDS = [
  "All",
  "Apple",
  "Sony",
  "Samsung",
  "Keychron",
  "Canon",
  "JBL",
  "Logitech",
  "Google"
];
