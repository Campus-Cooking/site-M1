/* eslint-disable import/order */
import NavBarSignin from '../components/NavBarSignin';
import LandingImg from '../components/LandingImg';
import FoodCategories from '../components/FoodCategories';
import RecipeGrid from '../components/RecipeGrid';
import './globals.css';
import ChefPromo from '@/components/ChefPromo';
import InstaBlog from '@/components/InstaBlog';
import RecipeGrid2 from '@/components/RecipeGrid2';
import EmailSubscribe from '@/components/EmailSubscribe';
import Footer from '@/components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRecipe from '@/components/AddRecipe';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignin />
      <LandingImg />
      <FoodCategories />
      <RecipeGrid />
      <ChefPromo />
      <InstaBlog />
      <RecipeGrid2 />
      <EmailSubscribe />
      <Footer />
      <AddRecipe />
    </div>
  );
}
