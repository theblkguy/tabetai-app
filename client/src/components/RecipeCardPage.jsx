
import React, { useEffect, useState } from 'react';

function RecipeCardPage({ recipeId }) {
  const [cardUrl, setCardUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) return;
    fetch(`/api/recipes/${recipeId}/card`)
      .then(res => res.json())
      .then(data => {
        setCardUrl(data.url);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [recipeId]);

  if (loading) return <div>Loading...</div>;
  if (!cardUrl) return <div>Card not available.</div>;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <img src={cardUrl} alt="Recipe Card" style={{ maxWidth: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }} />
    </div>
  );
}

export default RecipeCardPage;
