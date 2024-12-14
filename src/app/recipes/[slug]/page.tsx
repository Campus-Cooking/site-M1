import RecipePost from '@/components/RecipePost';
import NavBarSignedin from '@/components/NavBarSignedin';
import Footer from '@/components/Footer';

import './style.css';

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
