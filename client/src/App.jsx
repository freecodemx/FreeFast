import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import ProductsPage from './pages/productsPage';
import AllProducts from './pages/allProducts';
import ProductFormPage from './pages/productFormPage';
import ProfilePage from './pages/profilePage';
import ProductDetailPage from './pages/productDetails';
import SectionsPage from './pages/sectionsPage';
import ProductsSectionPage from './pages/productsSectionPage';

import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { SectionProvider } from './context/SectionContext';
import {NotificationProvider} from './context/NotificationContext';

import ProtectedRoute from './ProtectedRoute.jsx';

import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
       <NotificationProvider>
      <SectionProvider>
      <ProductProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route element={<ProtectedRoute />}>
              {/*   Ruta del Comprador */}
                <Route path='/all/products' element={<AllProducts />}></Route>
                <Route path='/products' element={<ProductsPage />}></Route>
                <Route path='/product/detail/:id' element={<ProductDetailPage />}></Route>
                <Route path='/products/new' element={<ProductFormPage />}></Route>
                <Route path='/products/:id' element={<ProductFormPage />}></Route>
                <Route path='/sections'  element={<SectionsPage  />}></Route> 
                <Route path='/products/section/:id' element={<ProductsSectionPage />}></Route>  
                <Route path='/profile' element={<ProfilePage />}></Route>
              </Route>
            </Routes>
          </main> 
        </BrowserRouter>
      </ProductProvider>
      </SectionProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
