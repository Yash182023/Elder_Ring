// import { Link } from "react-router-dom";
// import styles from "./Pharma.module.scss";
// import Background from "../components/Background/Background";

// interface MedicineCategory {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
//   items: number;
//   type: 'prescription' | 'otc';
// }

// const Pharma = () => {
//   const medicines: MedicineCategory[] = [
//     // Prescription Medicines
//     {
//       id: 1,
//       name: "Antibiotics",
//       image: "/image/Pharma/antibiotic.jpg",
//       description: "Wide range of antibiotics for bacterial infections",
//       items: 85,
//       type: 'prescription'
//     },
//     {
//       id: 2,
//       name: "Cardiovascular",
//       image: "/image/Pharma/Cardi.jpg",
//       description: "Medications for heart and blood pressure management",
//       items: 120,
//       type: 'prescription'
//     },
//     {
//       id: 3,
//       name: "Diabetes Care",
//       image: "/image/Pharma/Diabetes.jpg",
//       description: "Complete range of diabetes management medicines",
//       items: 65,
//       type: 'prescription'
//     },
//     {
//       id: 4,
//       name: "Respiratory",
//       image: "/image/Pharma/Respira.png",
//       description: "Medicines for asthma and respiratory conditions",
//       items: 45,
//       type: 'prescription'
//     },
//     // OTC Medicines
//     {
//       id: 5,
//       name: "Pain Relief",
//       image: "/image/Pharma/Pain.jpg",
//       description: "Over-the-counter pain relievers and anti-inflammatory medicines",
//       items: 40,
//       type: 'otc'
//     },
//     {
//       id: 6,
//       name: "Cold & Flu",
//       image: "/image/Pharma/Cold.jpg",
//       description: "Remedies for cold, cough, and flu symptoms",
//       items: 55,
//       type: 'otc'
//     },
//     {
//       id: 7,
//       name: "Vitamins & Supplements",
//       image: "/image/Pharma/Vitamin_D.jpg",
//       description: "Essential vitamins and dietary supplements",
//       items: 150,
//       type: 'otc'
//     },
//     {
//       id: 8,
//       name: "First Aid",
//       image: "/image/Pharma/First_Aid.jpg",
//       description: "Essential first aid supplies and medications",
//       items: 75,
//       type: 'otc'
//     }
//   ];

//   return (
//     <div className="container">
//       <div className={styles.pharma_page}>
//         <header className={styles.header}>
//           <h1>Our Medicines</h1>
//           <p>Browse our comprehensive range of prescription and over-the-counter medicines</p>
//         </header>

//         {/* Prescription Medicines Section */}
//         <section className={styles.medicine_section}>
//           <h2>Prescription Medicines</h2>
//           <div className={styles.medicines_grid}>
//             {medicines
//               .filter(medicine => medicine.type === 'prescription')
//               .map((medicine) => (
//                 <Link 
//                   to={`/medicine/${medicine.id}`} 
//                   key={medicine.id}
//                   className={styles.medicine_card}
//                 >
//                   <div className={styles.image_container}>
//                     <img 
//                       src={medicine.image} 
//                       alt={`${medicine.name} category`}
//                     />
//                   </div>
//                   <div className={styles.medicine_info}>
//                     <h3>{medicine.name}</h3>
//                     <p>{medicine.description}</p>
//                     <span className={styles.item_count}>
//                       {medicine.items} Products Available
//                     </span>
//                   </div>
//                 </Link>
//             ))}
//           </div>
//         </section>
//         <Background />

//         {/* OTC Medicines Section */}
//         <section className={styles.medicine_section}>
//           <h2>Over-the-Counter Medicines</h2>
//           <div className={styles.medicines_grid}>
//             {medicines
//               .filter(medicine => medicine.type === 'otc')
//               .map((medicine) => (
//                 <Link 
//                   to={`/medicine/${medicine.id}`} 
//                   key={medicine.id}
//                   className={styles.medicine_card}
//                 >
//                   <div className={styles.image_container}>
//                     <img 
//                       src={medicine.image} 
//                       alt={`${medicine.name} category`}
//                     />
//                   </div>
//                   <div className={styles.medicine_info}>
//                     <h3>{medicine.name}</h3>
//                     <p>{medicine.description}</p>
//                     <span className={styles.item_count}>
//                       {medicine.items} Products Available
//                     </span>
//                   </div>
//                 </Link>
//             ))}
//           </div>
//         </section>
//         <Background />
//       </div>
//     </div>
//   );
// };

// export default Pharma;

//Claude's Edit 

import { Link } from "react-router-dom";
import styles from "./Pharma.module.scss";
import Background from "../components/Background/Background";

interface MedicineCategory {
  id: number;
  name: string;
  image: string;
  description: string;
  items: number;
  type: 'prescription' | 'otc';
}

const Pharma = () => {
  const medicines: MedicineCategory[] = [
    // Prescription Medicines
    {
      id: 1,
      name: "Antibiotics",
      image: "/image/Pharma/antibiotic.jpg",
      description: "Wide range of antibiotics for bacterial infections",
      items: 85,
      type: 'prescription'
    },
    {
      id: 2,
      name: "Cardiovascular",
      image: "/image/Pharma/Cardi.jpg",
      description: "Medications for heart and blood pressure management",
      items: 120,
      type: 'prescription'
    },
    {
      id: 3,
      name: "Diabetes Care",
      image: "/image/Pharma/Diabetes.jpg",
      description: "Complete range of diabetes management medicines",
      items: 65,
      type: 'prescription'
    },
    {
      id: 4,
      name: "Respiratory",
      image: "/image/Pharma/Respira.png",
      description: "Medicines for asthma and respiratory conditions",
      items: 45,
      type: 'prescription'
    },
    // OTC Medicines
    {
      id: 5,
      name: "Pain Relief",
      image: "/image/Pharma/Pain.jpg",
      description: "Over-the-counter pain relievers and anti-inflammatory medicines",
      items: 40,
      type: 'otc'
    },
    {
      id: 6,
      name: "Cold & Flu",
      image: "/image/Pharma/Cold.jpg",
      description: "Remedies for cold, cough, and flu symptoms",
      items: 55,
      type: 'otc'
    },
    {
      id: 7,
      name: "Vitamins & Supplements",
      image: "/image/Pharma/Vitamin_D.jpg",
      description: "Essential vitamins and dietary supplements",
      items: 150,
      type: 'otc'
    },
    {
      id: 8,
      name: "First Aid",
      image: "/image/Pharma/First_Aid.jpg",
      description: "Essential first aid supplies and medications",
      items: 75,
      type: 'otc'
    }
  ];

  return (
    <div className="container">
      <div className={styles.pharma_page}>
        <header className={styles.header}>
          <h1>Our Medicines</h1>
          <p>Browse our comprehensive range of prescription and over-the-counter medicines</p>
        </header>

        {/* Prescription Medicines Section */}
        <section className={styles.medicine_section}>
          <h2>Prescription Medicines</h2>
          <div className={styles.medicines_grid}>
            {medicines
              .filter(medicine => medicine.type === 'prescription')
              .map((medicine) => (
                <Link 
                  to={`/medicine/${medicine.id}`} 
                  key={medicine.id}
                  className={styles.medicine_card}
                >
                  <div className={styles.image_container}>
                    <img 
                      src={medicine.image} 
                      alt={`${medicine.name} category`}
                    />
                  </div>
                  <div className={styles.medicine_info}>
                    <h3>{medicine.name}</h3>
                    <p>{medicine.description}</p>
                    <span className={styles.item_count}>
                      {medicine.items} Products Available
                    </span>
                  </div>
                </Link>
            ))}
          </div>
        </section>
        <Background />

        {/* OTC Medicines Section */}
        <section className={styles.medicine_section}>
          <h2>Over-the-Counter Medicines</h2>
          <div className={styles.medicines_grid}>
            {medicines
              .filter(medicine => medicine.type === 'otc')
              .map((medicine) => (
                <Link 
                  to={`/medicine/${medicine.id}`} 
                  key={medicine.id}
                  className={styles.medicine_card}
                >
                  <div className={styles.image_container}>
                    <img 
                      src={medicine.image} 
                      alt={`${medicine.name} category`}
                    />
                  </div>
                  <div className={styles.medicine_info}>
                    <h3>{medicine.name}</h3>
                    <p>{medicine.description}</p>
                    <span className={styles.item_count}>
                      {medicine.items} Products Available
                    </span>
                  </div>
                </Link>
            ))}
          </div>
        </section>
        <Background />
      </div>
    </div>
  );
};

export default Pharma;