import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import Background from '../components/Background/Background';

interface ProductDetailProps {}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  availability: string;
  isMedicine: boolean;
  requiresPrescription: boolean;
}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { categoryId, subcategoryId, productId } = useParams<{
    categoryId: string;
    subcategoryId: string;
    productId: string;
  }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // In a real app, you would fetch the specific product based on ID
        // For now, we'll simulate a product fetch with mock data
        const response = await fetch(`http://localhost:3001/api/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
        
        // For development, we can fall back to mock data if the API doesn't exist yet
        // Remove this in production
        setProduct({
          id: parseInt(productId || '1'),
          name: `Product ${productId || '1'}`,
          description: 'This is a high-quality healthcare product designed to improve your quality of life. Made with premium materials for comfort and durability.',
          price: 129.99,
          image: '/image/Prodlist/Mobility/img_2.jpg',
          availability: 'In Stock',
          isMedicine: subcategoryId === '103', // Example: Consider respiratory devices as medicine
          requiresPrescription: subcategoryId === '103' // Example condition
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [categoryId, subcategoryId, productId]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPrescriptionFile(e.target.files[0]);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // In a real app, you might dispatch to a cart state/context
    // For simplicity, we'll navigate directly to checkout
    navigate('/checkout', {
      state: {
        price: product.price * quantity,
        productTitle: `${product.name} (x${quantity})`,
        isMedicine: product.isMedicine,
        requiresPrescription: product.requiresPrescription,
        prescriptionFile: prescriptionFile
      }
    });
  };

  if (loading) {
    return (
      <div className={styles.productDetail}>
        <div className="container">
          <div className={styles.loadingContainer}>
            <div className={styles.loader}></div>
            <p>Loading product details...</p>
          </div>
        </div>
        <Background />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={styles.productDetail}>
        <div className="container">
          <div className={styles.errorContainer}>
            <h2>Oops! Something went wrong</h2>
            <p>{error || 'Product not found'}</p>
            <button onClick={() => navigate(-1)} className={styles.button}>
              Go Back
            </button>
          </div>
        </div>
        <Background />
      </div>
    );
  }

  return (
    <div className={styles.productDetail}>
      <div className="container">
        <div className={styles.breadcrumbs}>
          <span onClick={() => navigate('/')}>Home</span> &gt; 
          <span onClick={() => navigate('/products')}>Products</span> &gt; 
          <span>Product Details</span>
          <Background />
        </div>
        <Background />
        <div className={styles.productContent}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <Background />
          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{product.name}</h1>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
            <div className={styles.availability}>
              <span className={
                product.availability === 'In Stock' 
                  ? styles.inStock 
                  : styles.outOfStock
              }>
                {product.availability}
              </span>
            </div>
            <Background />
            <div className={styles.description}>
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.actions}>
              <div className={styles.quantityControl}>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <Background />
              </div>

              {product.requiresPrescription && (
                <div className={styles.prescriptionUpload}>
                  <p className={styles.prescriptionNote}>
                    This product requires a valid prescription.
                  </p>
                  <label className={styles.fileUploadLabel}>
                    {prescriptionFile ? prescriptionFile.name : 'Upload Prescription'}
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handlePrescriptionUpload}
                      className={styles.fileInput}
                    />
                  </label>
                  {product.requiresPrescription && !prescriptionFile && (
                    <p className={styles.requiredField}>
                      * Prescription required for checkout
                    </p>
                  )}
                  <Background />
                </div>
              )}

              <button 
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={product.requiresPrescription && !prescriptionFile}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Background />
    </div>
  );
};

export default ProductDetail;