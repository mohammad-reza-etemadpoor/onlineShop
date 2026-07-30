import Navbar from "@components/Navbar";
import AllProducts from "@src/components/AllProducts";
import CategorySection from "@src/components/Categories";
import Footer from "@src/components/Footer";
import HeroSection from "@src/components/HeroSection";
import connectToDb from "@src/configs/db";
import ProductModel from "@src/models/Product";

// import "@/src/configs/seed.js";

export default async function Home() {
  // const [cartItems, setCartItems] =
  //   useState([]);

  await connectToDb();
  const products = JSON.parse(
    JSON.stringify(
      await ProductModel.find({}),
    ),
  );
  // console.log(products);
  return (
    <div className="bg-secondary w-full">
      <Navbar />
      <HeroSection />
      <CategorySection />
      {/* <ImageSwiper /> */}
      <AllProducts
        products={products}
        // cartItems={cartItems}
        // onSetCartItems={setCartItems}
      />
      <Footer />
    </div>
  );
}

// Navbar

// ↓

// Hero

// ↓

// Categories
//? گرید ۴ تایی عکس با متن دخترانه / پسرانه / نوزاد / مادر بچه ها
//? کلیک روی این ها رو به صفحه جدیدی نمی بره توی همون صفحه فقط قسمت تمام صفحات فیلترش رو عوض می‌کنه
// ↓

// All Products
//? تمام محصولات رو توی قالب کارت نشون میدم
//? یه گزینه فیلتر هم داره که بین گزینه های مختلف فیلتر می‌کنه بر اساس بر چسب ها و تگ هایی که روی محصول ها هست فیلتر می‌کنه

// ↓

// Why Choose Us
//متن شرو ور
// ↓

// Footer
// پیام رسان ها و ...

// 2,500 living cost
//
