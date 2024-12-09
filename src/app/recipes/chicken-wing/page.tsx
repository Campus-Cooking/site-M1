import RecipePost from '@/components/RecipePost';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import './styles.css';

export default function RecipePage() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <RecipePost slug="chicken-wing" />
      </main>
      <Footer />
    </div>
  );
}
