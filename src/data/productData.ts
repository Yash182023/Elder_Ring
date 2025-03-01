export interface ProductDataProps {
  id: number;
  title: string;
  description: string;
  price: number;
  images: {
    preview: string;
    model: string[];
    design: string;
  };
}

export const productData: ProductDataProps[] = [
  {
    id: 1,
    title: "WheelChair",
    description: "Vintage Retro? T-shirt",
    price: 24.99,
    images: {
      preview: "/image/Prodlist/Mobility/img_2.jpg",
      model: [
        "image/products/Product-01-Model-01.png",
        "image/products/Product-01-Model-02.png",
        "image/products/Product-01-Model-03.png",
      ],
      design: "image/products/Product-01-Design.png",
    },
  },
  {
    id: 2,
    title: "Mover_1",
    description: "Just Vibin' T-shirt",
    price: 24.99,
    images: {
      preview: "/image/Prodlist/Mobility/img_3.jpg",
      model: [
        "image/products/Product-02-Model-01.png",
        "image/products/Product-02-Model-02.png",
        "image/products/Product-02-Model-03.png",
      ],
      design: "image/products/Product-02-Design.png",
    },
  },
  {
    id: 3,
    title: "Mover_2",
    description: "Soft Bold T-shirt",
    price: 9.99,
    images: {
      preview: "/image/Prodlist/Mobility/img_4.jpg",
      model: [
        "image/products/Product-03-Model-01.png",
        "image/products/Product-03-Model-02.png",
        "image/products/Product-03-Model-03.png",
      ],
      design: "image/products/Product-03-Design.png",
    },
  },
  {
    id: 4,
    title: "Win Cold",
    description: "Psyco T-shirt",
    price: 9.99,
    images: {
      preview: "/image/Pharma/Cold.jpg",
      model: [
        "image/products/Product-04-Model-01.png",
        "image/products/Product-04-Model-02.png",
        "image/products/Product-04-Model-03.png",
      ],
      design: "image/products/Product-04-Design.png",
    },
  },
  {
    id: 5,
    title: "Elevated_seat",
    description: "Secrets T-shirt",
    price: 9.99,
    images: {
      preview: "/image/Prodlist/Safetyaids/img_2.jpg",
      model: [
        "image/products/Product-05-Model-01.png",
        "image/products/Product-05-Model-02.png",
        "image/products/Product-05-Model-03.png",
      ],
      design: "image/products/Product-05-Design.png",
    },
  },
  {
    id: 6,
    title: "AntiSlipmat",
    description: "Destiny The choice is yours T-shirt",
    price: 19.9,
    images: {
      preview: "/image/Prodlist/Safetyaids/img_3.jpg",
      model: [
        "image/products/Product-06-Model-01.png",
        "image/products/Product-06-Model-02.png",
        "image/products/Product-06-Model-03.png",
      ],
      design: "image/products/Product-06-Design.png",
    },
  },
  {
    id: 7,
    title: "GrabBar",
    description: "Destiny T-shirt",
    price: 19.99,
    images: {
      preview: "/image/Prodlist/Safetyaids/img_4.jpg",
      model: [
        "image/products/Product-07-Model-01.png",
        "image/products/Product-07-Model-02.png",
        "image/products/Product-07-Model-03.png",
      ],
      design: "image/products/Product-07-Design.png",
    },
  },
  {
    id: 8,
    title: "Diaper",
    description: "Destiny is waiting T-shirt",
    price: 19.99,
    images: {
      preview: "/image/Prodlist/Wellness/img_2.png",
      model: [
        "image/products/Product-08-Model-01.png",
        "image/products/Product-08-Model-02.png",
        "image/products/Product-08-Model-03.png",
      ],
      design: "image/products/Product-08-Design.png",
    },
  },
  {
    id: 9,
    title: "Wipe",
    description: "Instinct  The choice is yours T-shirt",
    price: 29.9,
    images: {
      preview: "/image/Prodlist/Wellness/img_2.jpg",
      model: [
        "image/products/Product-09-Model-01.png",
        "image/products/Product-09-Model-02.png",
        "image/products/Product-09-Model-03.png",
      ],
      design: "image/products/Product-09-Design.png",
    },
  },
  {
    id: 10,
    title: "BhgavadGita",
    description: "Warrior The choice is yours T-shirt",
    price: 29.9,
    images: {
      preview: "/image/Prodlist/Home/img_2.jpg",
      model: [
        "image/products/Product-10-Model-01.png",
        "image/products/Product-10-Model-02.png",
        "image/products/Product-10-Model-03.png",
      ],
      design: "image/products/Product-10-Design.png",
    },
  },
  {
    id: 11,
    title: "Oven",
    description: "Galaxy T-shirt",
    price: 19.9,
    images: {
      preview: "/image/Prodlist/Home/img_3.jpg",
      model: [
        "image/products/Product-11-Model-01.png",
        "image/products/Product-11-Model-02.png",
        "image/products/Product-11-Model-03.png",
      ],
      design: "image/products/Product-11-Design.png",
    },
  },
  {
    id: 12,
    title: "Paracetamol",
    description: "Intuition T-shirt",
    price: 19.9,
    images: {
      preview: "/image/Pharma/Pain.jpg",
      model: [
        "image/products/Product-12-Model-01.png",
        "image/products/Product-12-Model-02.png",
        "image/products/Product-12-Model-03.png",
      ],
      design: "image/products/Product-12-Design.png",
    },
  },
  {
    id: 13,
    title: "Furniture",
    description: "Intuition The choice is yours T-shirt",
    price: 24.99,
    images: {
      preview: "/image/Prodlist/Home/img_4.jpg",
      model: [
        "image/products/Product-13-Model-01.png",
        "image/products/Product-13-Model-02.png",
        "image/products/Product-13-Model-03.png",
      ],
      design: "image/products/Product-13-Design.png",
    },
  },
  {
    id: 14,
    title: "KitchenWare",
    description: "Beauty World T-shirt",
    price: 14.99,
    images: {
      preview: "/image/Prodlist/Home/img_5.jpg",
      model: [
        "image/products/Product-14-Model-01.png",
        "image/products/Product-14-Model-02.png",
        "image/products/Product-14-Model-03.png",
      ],
      design: "image/products/Product-14-Design.png",
    },
  },
  {
    id: 15,
    title: "BPmonitor",
    description: "Isolated T-shirt",
    price: 14.99,
    images: {
      preview: "/image/Prodlist/Devices/img_3.jpg",
      model: [
        "image/products/Product-15-Model-01.png",
        "image/products/Product-15-Model-02.png",
        "image/products/Product-15-Model-03.png",
      ],
      design: "image/products/Product-15-Design.png",
    },
  },
];
