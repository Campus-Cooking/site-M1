import RecipePost from '@/components/RecipePost';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';

// Add a new CSS module for this page
import './styles.css';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function RecipePage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-white">
      <NavBarSignedin />
      <main className="recipe-page-container">
        <div className="recipe-content-wrapper">
          <RecipePost slug={params.slug} />
        </div>
      </main>
      <Footer />
    </div>
  );
} 