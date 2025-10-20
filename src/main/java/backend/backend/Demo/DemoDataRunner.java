// package backend.backend.Demo;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.CommandLineRunner;
// import org.springframework.stereotype.Component;

// import backend.backend.models.Product;
// import backend.backend.repository.ProductRepository;

// import java.util.Arrays;

// @Component
// public class DemoDataRunner implements CommandLineRunner {

//     @Autowired
//     private ProductRepository productRepository;

//     @Override
//     public void run(String... args) throws Exception {
//         // Create some sample products if the database is empty
//         if (productRepository.count() == 0) {
//             Product p1 = new Product(
//                 null, 
//                 "Modern Wireless Headphones", 
//                 "https://placehold.co/400x400/3498db/ffffff?text=Headphones", 
//                 true, 
//                 99.99, 
//                 129.99, 
//                 23, 
//                 "Experience crystal clear audio with these noise-cancelling wireless headphones. Long-lasting battery and comfortable design for all-day use.", 
//                 "Black"
//             );
//             Product p2 = new Product(
//                 null, 
//                 "Ergonomic Mechanical Keyboard", 
//                 "https://placehold.co/400x400/2ecc71/ffffff?text=Keyboard", 
//                 true, 
//                 149.50, 
//                 160.00, 
//                 7, 
//                 "A high-performance mechanical keyboard with customizable RGB lighting and a durable aluminum frame. Perfect for gaming and professional work.", 
//                 "White"
//             );
//             Product p3 = new Product(
//                 null, 
//                 "4K Ultra HD Smart TV", 
//                 "https://placehold.co/400x400/e74c3c/ffffff?text=Smart+TV", 
//                 false, 
//                 499.00, 
//                 699.00, 
//                 28, 
//                 "Immerse yourself in stunning 4K resolution. This Smart TV comes with all your favorite streaming apps pre-installed.", 
//                 "Silver"
//             );
            
//             productRepository.saveAll(Arrays.asList(p1, p2, p3));
//         }
//     }
// }
