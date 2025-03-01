// pages/Product.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Products.module.scss";
import Background from "../components/Background/Background";


interface SubCategory {
  id: number;
  name: string;
  image: string;
  itemCount: number;
}

interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  subcategories: SubCategory[];
}

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      id: 1,
      name: "Mobility",
      image: "/image/Prodlist/Mobility/img_1.jpg",
      description: "Solutions for independent movement and accessibility",
      subcategories: [
        {
          id: 101,
          name: "Wheelchairs",
          image: "/image/Prodlist/Mobility/img_2.jpg",
          itemCount: 25
        },
        {
          id: 102,
          name: "Walkers & Rollators",
          image: "/image/Prodlist/Mobility/img_3.jpg",
          itemCount: 30
        },
        {
          id: 103,
          name: "Mobility Scooters",
          image: "/image/Prodlist/Mobility/img_4.jpg",
          itemCount: 15
        },
        {
          id: 104,
          name: "Walking Aids",
          image: "/image/Prodlist/Mobility/img_5.jpg",
          itemCount: 40
        }
      ]
    },
    {
      id: 2,
      name: "Wellness",
      image: "/image/Prodlist/Wellness/img_2.jpg",
      description: "Products for health and wellness maintenance",
      subcategories: [
        {
          id: 101,
          name: "Adult Diapers",
          image: "/image/Prodlist/Wellness/img_2.jpg",
          itemCount: 25
        },
        {
          id: 102,
          name: "Underpads",
          image: "/image/Prodlist/Wellness/img_2.png",
          itemCount: 30
        },
        {
          id: 103,
          name: "Foot Care",
          image: "/image/Prodlist/Wellness/img_3.jpg",
          itemCount: 15
        },
        {
          id: 104,
          name: "Diet and Nutrition",
          image: "/image/Prodlist/Wellness/img_4.jpg",
          itemCount: 40
        }
      ]
    },
    {
      id: 3,
      name: "Safety Aids",
      image: "/image/Prodlist/Safetyaids/img_1.jpeg",
      description: "Equipment to ensure safety at home and away",
      subcategories: [
        {
          id: 101,
          name: "Elevated Toilet Seats",
          image: "/image/Prodlist/Safetyaids/img_2.jpg",
          itemCount: 25
        },
        {
          id: 102,
          name: "Anti-Slip Mats",
          image: "/image/Prodlist/Safetyaids/img_3.jpg",
          itemCount: 30
        },
        {
          id: 103,
          name: "Grab Bars",
          image: "/image/Prodlist/Safetyaids/img_4.jpg",
          itemCount: 15
        },
        {
          id: 104,
          name: "Commode and Shower Chairs",
          image: "/image/Prodlist/Safetyaids/img_5.jpg",
          itemCount: 40
        }
      ]
    },
    {
      id: 4,
      name: "Blockbuster Deals",
      image: "/images/deals-main.jpg",
      description: "Special offers and discounted items",
      subcategories: [
        {
          id: 101,
          name: "Wheelchairs",
          image: "/image/Prodlist/Mobility/img_2.jpg",
          itemCount: 25
        },
        {
          id: 102,
          name: "Walkers & Rollators",
          image: "/image/Prodlist/Mobility/img_3.jpg",
          itemCount: 30
        },
        {
          id: 103,
          name: "Mobility Scooters",
          image: "/image/Prodlist/Mobility/img_4.jpg",
          itemCount: 15
        },
        {
          id: 104,
          name: "Walking Aids",
          image: "/image/Prodlist/Mobility/img_5.jpg",
          itemCount: 40
        }
      ]
    },
    {
      id: 5,
      name: "Home & Living",
      image: "/image/Prodlist/Home/img_1.jpg",
      description: "Products for comfortable living at home",
      subcategories: [
        {
          id: 101,
          name: "Rare Books and Magazines",
          image: "/image/Prodlist/Home/img_2.jpg",
          itemCount: 25
        },
        {
          id: 102,
          name: "Electrical Appliances",
          image: "/image/Prodlist/Home/img_3.jpg",
          itemCount: 30
        },
        {
          id: 103,
          name: "Vintage Furniture",
          image: "/image/Prodlist/Home/img_4.jpg",
          itemCount: 15
        },
        {
          id: 104,
          name: "Kitchen & Dining",
          image: "/image/Prodlist/Home/img_5.jpg",
          itemCount: 40
        }
      ]
    },
    {
      id: 6,
      name: "Healthcare Devices",
      image: "/image/Prodlist/Devices/img_0.jpg",
      description: "Medical and health monitoring devices",
      subcategories: [
        {
          id: 101,
          name: "Respiratory Devices",
          image: "/image/Prodlist/Devices/img_1.jpg",
          itemCount: 25
        },
        {
          id: 102,
          name: "Nebulizers and Vaporizers",
          image: "/image/Prodlist/Devices/img_2.jpg",
          itemCount: 30
        },
        {
          id: 103,
          name: "Blood Pressure Monitors",
          image: "/image/Prodlist/Devices/img_3.jpg",
          itemCount: 15
        },
        {
          id: 104,
          name: "Labs and Diagnostic Kits",
          image: "/image/Prodlist/Devices/img_4.jpg",
          itemCount: 40
        }
      ]
    },
    {
      id: 7,
      name: "Shop By Brands",
      image: "/image/Prodlist/Devices/img_4.jpg",
      description: "Browse our collection by trusted brands",
      subcategories: [
        {
          id: 101,
          name: "Wheelchairs",
          image: "/image/Prodlist/Mobility/img_2.jpg",
          itemCount: 25
        },
        {
          id: 102,
          name: "Walkers & Rollators",
          image: "/image/Prodlist/Mobility/img_3.jpg",
          itemCount: 30
        },
        {
          id: 103,
          name: "Mobility Scooters",
          image: "/image/Prodlist/Mobility/img_4.jpg",
          itemCount: 15
        },
        {
          id: 104,
          name: "Walking Aids",
          image: "/image/Prodlist/Mobility/img_5.jpg",
          itemCount: 40
        }
      ]
    }
  ];

  return (
    <div className="container">
      <div className={styles.products_page}>
        <header className={styles.header}>
          <h1>Product Categories</h1>
          <p>Browse our comprehensive range of healthcare and mobility solutions</p>
        </header>

        <div className={styles.categories_menu}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.category_button} ${
                selectedCategory === category.name ? styles.active : ''
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className={styles.categories_grid}>
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`${styles.category_section} ${
                selectedCategory && selectedCategory !== category.name ? styles.hidden : ''
              }`}
            >
              <div className={styles.category_header}>
                <div className={styles.main_image}>
                  <img src={category.image} alt={category.name} />
                </div>
                <div className={styles.category_info}>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>
              </div>

              {category.subcategories.length > 0 && (
                <div className={styles.subcategories_grid}>
                  {category.subcategories.map((sub) => (
                      <Link 
                      to={`/products/${category.id}/${sub.id}/product/1`}  // Update this line
                      key={sub.id}
                      className={styles.subcategory_card}
                    >
                      <div className={styles.image_container}>
                        <img src={sub.image} alt={sub.name} />
                      </div>
                      <div className={styles.subcategory_info}>
                        <h3>{sub.name}</h3>
                        <span className={styles.item_count}>
                          {sub.itemCount} Items
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <Background />
      </div>
    </div>
  );
};

export default Product;