import NavBar from '@/components/NavBar';
import LoginPage from '@/components/AddRecipe';
import Footer from '@/components/Footer';
import './addrecipepage.css';
import AddRecipeForm from '@/components/AddRecipe';

export default function AddRecipe() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <AddRecipeForm />
      <Footer />
    </div>
  );
}
