import 'bootstrap/dist/css/bootstrap.min.css';
import Recipes from '../../components/Recipes';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';
import '../globals.css';
import './recipepost.css';
import EmailSubscribe from '@/components/EmailSubscribe';

export default function recipes() {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <Recipes />
      <EmailSubscribe />
      <Footer />
    </div>
  );
}
