import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import { ScrollToTop } from "./components/ScrollToTop";

/* Lazy-load non-critical routes for smaller initial bundle */
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ProductCatalog = lazy(() => import("./pages/ProductCatalog"));

/* Minimal loading state */
function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="h-8 w-8 border-2 border-accent-blue border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductCatalog />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-right" richColors />
    </BrowserRouter>
  );
}

export default App;
