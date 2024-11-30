import NavBar from '@/components/NavBar';
import ContactForm from '@/components/ContactUs';
import Footer from '@/components/Footer';
import EmailSubscribe from '@/components/EmailSubscribe';
import RecipeGrid2 from '@/components/RecipeGrid2';
import './contactuspage.css';
import '../globals.css';

export default function login() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <ContactForm />
      <EmailSubscribe />
      <RecipeGrid2 />
      <Footer />
    </div>
  );
}
