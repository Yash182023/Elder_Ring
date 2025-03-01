// // pages/Services.tsx
// import { Link } from "react-router-dom";
// import styles from "./Services.module.scss";
// import Background from "../components/Background/Background";

// interface ServiceCategory {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
//   providers: number;
//   type: 'healthcare' | 'service';
// }

// const Services = () => {
//   const services: ServiceCategory[] = [
//     // Healthcare Providers
//     {
//       id: 1,
//       name: "Medical Doctors",
//       image: "/image/Services/MedDoc.jpg",
//       description: "Experienced physicians providing remote consultations and monitoring",
//       providers: 48,
//       type: 'healthcare'
//     },
//     {
//       id: 2,
//       name: "Nursing Care",
//       image: "/image/Services/Nurse.jpg",
//       description: "Professional nurses offering both in-home and remote care services",
//       providers: 35,
//       type: 'healthcare'
//     },
//     {
//       id: 3,
//       name: "Medical Specialists",
//       image: "/image/Services/Special.jpg",
//       description: "Specialized healthcare professionals for specific medical needs",
//       providers: 29,
//       type: 'healthcare'
//     },
//     // Service Providers
//     {
//       id: 4,
//       name: "Caregiving Services",
//       image: "/image/Services/Caregiver.jpg",
//       description: "Professional caregivers providing personal care and assistance",
//       providers: 52,
//       type: 'service'
//     },
//     {
//       id: 5,
//       name: "Physiotherapy",
//       image: "/image/Services/Physio.jpg",
//       description: "Expert physiotherapists offering rehabilitation services",
//       providers: 31,
//       type: 'service'
//     },
//     {
//       id: 6,
//       name: "Transportation",
//       image: "/image/Services/transport.jpg",
//       description: "Reliable transportation services for medical appointments",
//       providers: 25,
//       type: 'service'
//     },
//     {
//       id: 7,
//       name: "Meal Delivery",
//       image: "/image/Services/mela.jpg",
//       description: "Healthy meal preparation and delivery services",
//       providers: 18,
//       type: 'service'
//     },
//     {
//       id: 8,
//       name: "Housekeeping",
//       image: "/image/Services/housekeeper.jpg",
//       description: "Professional home maintenance and cleaning services",
//       providers: 40,
//       type: 'service'
//     }
//   ];

//   return (
//     <div className="container">
//       <div className={styles.services_page}>
//         <header className={styles.header}>
//           <h1>Our Services</h1>
//           <p>Connect with trusted healthcare and service providers in your area</p>
//         </header>

//         {/* Healthcare Providers Section */}
//         <section className={styles.service_section}>
//           <h2>Healthcare Providers</h2>
//           <div className={styles.services_grid}>
//             {services
//               .filter(service => service.type === 'healthcare')
//               .map((service) => (
//                 <Link 
//                   to={`/service/${service.id}`} 
//                   key={service.id}
//                   className={styles.service_card}
//                 >
//                   <div className={styles.image_container}>
//                     <img 
//                       src={service.image} 
//                       alt={`${service.name} service`}
//                     />
//                   </div>
//                   <div className={styles.service_info}>
//                     <h3>{service.name}</h3>
//                     <p>{service.description}</p>
//                     <span className={styles.provider_count}>
//                       {service.providers} Available Providers
//                     </span>
//                   </div>
//                 </Link>
//             ))}
//           </div>
//         </section>
//         <Background />

//         {/* Service Providers Section */}
//         <section className={styles.service_section}>
//           <h2>Service Providers</h2>
//           <div className={styles.services_grid}>
//             {services
//               .filter(service => service.type === 'service')
//               .map((service) => (
//                 <Link 
//                   to={`/service/${service.id}`} 
//                   key={service.id}
//                   className={styles.service_card}
//                 >
//                   <div className={styles.image_container}>
//                     <img 
//                       src={service.image} 
//                       alt={`${service.name} service`}
//                     />
//                   </div>
//                   <div className={styles.service_info}>
//                     <h3>{service.name}</h3>
//                     <p>{service.description}</p>
//                     <span className={styles.provider_count}>
//                       {service.providers} Available Providers
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

// export default Services;

// Claude's 2

// pages/Services.tsx
// import { Link } from "react-router-dom";
// import styles from "./Services.module.scss";
// import Background from "../components/Background/Background";

// interface ServiceCategory {
//   id: number;
//   name: string;
//   image: string;
//   description: string;
//   providers: number;
//   type: 'healthcare' | 'service';
// }

// const Services = () => {
//   const services: ServiceCategory[] = [
//     // Healthcare Providers
//     {
//       id: 1,
//       name: "Medical Doctors",
//       image: "/image/Services/MedDoc.jpg",
//       description: "Experienced physicians providing remote consultations and monitoring",
//       providers: 48,
//       type: 'healthcare'
//     },
//     {
//       id: 2,
//       name: "Nursing Care",
//       image: "/image/Services/Nurse.jpg",
//       description: "Professional nurses offering both in-home and remote care services",
//       providers: 35,
//       type: 'healthcare'
//     },
//     {
//       id: 3,
//       name: "Medical Specialists",
//       image: "/image/Services/Special.jpg",
//       description: "Specialized healthcare professionals for specific medical needs",
//       providers: 29,
//       type: 'healthcare'
//     },
//     // Service Providers
//     {
//       id: 4,
//       name: "Caregiving Services",
//       image: "/image/Services/Caregiver.jpg",
//       description: "Professional caregivers providing personal care and assistance",
//       providers: 52,
//       type: 'service'
//     },
//     {
//       id: 5,
//       name: "Physiotherapy",
//       image: "/image/Services/Physio.jpg",
//       description: "Expert physiotherapists offering rehabilitation services",
//       providers: 31,
//       type: 'service'
//     },
//     {
//       id: 6,
//       name: "Transportation",
//       image: "/image/Services/transport.jpg",
//       description: "Reliable transportation services for medical appointments",
//       providers: 25,
//       type: 'service'
//     },
//     {
//       id: 7,
//       name: "Meal Delivery",
//       image: "/image/Services/mela.jpg",
//       description: "Healthy meal preparation and delivery services",
//       providers: 18,
//       type: 'service'
//     },
//     {
//       id: 8,
//       name: "Housekeeping",
//       image: "/image/Services/housekeeper.jpg",
//       description: "Professional home maintenance and cleaning services",
//       providers: 40,
//       type: 'service'
//     }
//   ];

//   return (
//     <div className="container">
//       <div className={styles.services_page}>
//         <header className={styles.header}>
//           <h1>Our Services</h1>
//           <p>Connect with trusted healthcare and service providers in your area</p>
//         </header>

//         {/* Healthcare Providers Section */}
//         <section className={styles.service_section}>
//           <h2>Healthcare Providers</h2>
//           <div className={styles.services_grid}>
//             {services
//               .filter(service => service.type === 'healthcare')
//               .map((service) => (
//                 <div className={styles.service_card} key={service.id}>
//                   <div className={styles.image_container}>
//                     <img 
//                       src={service.image} 
//                       alt={`${service.name} service`}
//                     />
//                   </div>
//                   <div className={styles.service_info}>
//                     <h3>{service.name}</h3>
//                     <p>{service.description}</p>
//                     <div className={styles.service_meta}>
//                       <span className={styles.provider_count}>
//                         {service.providers} Available Providers
//                       </span>
//                       <Link 
//                         to={`/book-service/${service.id}`} 
//                         className={styles.book_button}
//                       >
//                         Book Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//             ))}
//           </div>
//         </section>
//         <Background />

//         {/* Service Providers Section */}
//         <section className={styles.service_section}>
//           <h2>Service Providers</h2>
//           <div className={styles.services_grid}>
//             {services
//               .filter(service => service.type === 'service')
//               .map((service) => (
//                 <div className={styles.service_card} key={service.id}>
//                   <div className={styles.image_container}>
//                     <img 
//                       src={service.image} 
//                       alt={`${service.name} service`}
//                     />
//                   </div>
//                   <div className={styles.service_info}>
//                     <h3>{service.name}</h3>
//                     <p>{service.description}</p>
//                     <div className={styles.service_meta}>
//                       <span className={styles.provider_count}>
//                         {service.providers} Available Providers
//                       </span>
//                       <Link 
//                         to={`/book-service/${service.id}`} 
//                         className={styles.book_button}
//                       >
//                         Book Now
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//             ))}
//           </div>
//         </section>
//         <Background />
//       </div>
//     </div>
//   );
// };

// export default Services;

// claude's 3rd code

import { Link } from "react-router-dom";
import styles from "./Services.module.scss";
import Background from "../components/Background/Background";

interface ServiceCategory {
  id: number;
  name: string;
  image: string;
  description: string;
  providers: number;
  type: 'healthcare' | 'service';
}

const Services = () => {
  const services: ServiceCategory[] = [
    // Healthcare Providers
    {
      id: 1,
      name: "Medical Doctors",
      image: "/image/Services/MedDoc.jpg",
      description: "Experienced physicians providing remote consultations and monitoring",
      providers: 48,
      type: 'healthcare'
    },
    {
      id: 2,
      name: "Nursing Care",
      image: "/image/Services/Nurse.jpg",
      description: "Professional nurses offering both in-home and remote care services",
      providers: 35,
      type: 'healthcare'
    },
    {
      id: 3,
      name: "Medical Specialists",
      image: "/image/Services/Special.jpg",
      description: "Specialized healthcare professionals for specific medical needs",
      providers: 29,
      type: 'healthcare'
    },
    // Service Providers
    {
      id: 4,
      name: "Caregiving Services",
      image: "/image/Services/Caregiver.jpg",
      description: "Professional caregivers providing personal care and assistance",
      providers: 52,
      type: 'service'
    },
    {
      id: 5,
      name: "Physiotherapy",
      image: "/image/Services/Physio.jpg",
      description: "Expert physiotherapists offering rehabilitation services",
      providers: 31,
      type: 'service'
    },
    {
      id: 6,
      name: "Transportation",
      image: "/image/Services/transport.jpg",
      description: "Reliable transportation services for medical appointments",
      providers: 25,
      type: 'service'
    },
    {
      id: 7,
      name: "Meal Delivery",
      image: "/image/Services/mela.jpg",
      description: "Healthy meal preparation and delivery services",
      providers: 18,
      type: 'service'
    },
    {
      id: 8,
      name: "Housekeeping",
      image: "/image/Services/housekeeper.jpg",
      description: "Professional home maintenance and cleaning services",
      providers: 40,
      type: 'service'
    }
  ];

  return (
    <div className="container">
      <div className={styles.services_page}>
        <header className={styles.header}>
          <h1>Our Services</h1>
          <p>Connect with trusted healthcare and service providers in your area</p>
        </header>

        {/* Healthcare Providers Section */}
        <section className={styles.service_section}>
          <h2>Healthcare Providers</h2>
          <div className={styles.services_grid}>
            {services
              .filter(service => service.type === 'healthcare')
              .map((service) => (
                <div className={styles.service_card} key={service.id}>
                  <div className={styles.image_container}>
                    <img 
                      src={service.image} 
                      alt={`${service.name} service`}
                    />
                  </div>
                  <div className={styles.service_info}>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <div className={styles.service_meta}>
                      <span className={styles.provider_count}>
                        {service.providers} Available Providers
                      </span>
                      <Link 
                        to={`/service/${service.id}`} 
                        className={styles.book_button}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </section>
        <Background />

        {/* Service Providers Section */}
        <section className={styles.service_section}>
          <h2>Service Providers</h2>
          <div className={styles.services_grid}>
            {services
              .filter(service => service.type === 'service')
              .map((service) => (
                <div className={styles.service_card} key={service.id}>
                  <div className={styles.image_container}>
                    <img 
                      src={service.image} 
                      alt={`${service.name} service`}
                    />
                  </div>
                  <div className={styles.service_info}>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <div className={styles.service_meta}>
                      <span className={styles.provider_count}>
                        {service.providers} Available Providers
                      </span>
                      <Link 
                        to={`/service/${service.id}`} 
                        className={styles.book_button}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </section>
        <Background />
      </div>
    </div>
  );
};

export default Services;