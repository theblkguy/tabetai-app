import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from '../BackButton';

function RecipeCardPage() {
  const { id } = useParams();
  const [cardUrl, setCardUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/recipes/${id}/card`)
      .then(async res => {
        if (!res.ok) throw new Error('Card not available');
        const blob = await res.blob();
        setCardUrl(URL.createObjectURL(blob));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!cardUrl) return <div>Card not available.</div>;

  return (
    <div className="flex flex-col items-center mt-8">
      <BackButton />
      <h2 className="text-2xl font-bold mb-4">Recipe Card</h2>
      <img
        src={cardUrl}
        alt="Recipe Card"
        className="w-full max-w-2xl object-cover rounded mb-2"
        style={{ minHeight: '500px', minWidth: '350px' }}
      />
    </div>
  );
}

export default RecipeCardPage;
