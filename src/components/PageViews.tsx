import { useEffect, useState } from 'react';

interface PageViewsProps {
  slug: string;
}

export default function PageViews({ slug }: PageViewsProps) {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get initial views
        const getResponse = await fetch(`/api/pageview/${slug}`);
        if (!getResponse.ok) {
          const errorData = await getResponse.json();
          console.error('Error getting views:', errorData);
          setError('Failed to get views');
          return;
        }
        const getData = await getResponse.json();
        setViews(getData.views);

        // Increment views
        const postResponse = await fetch(`/api/pageview/${slug}`, {
          method: 'POST',
        });
        if (!postResponse.ok) {
          const errorData = await postResponse.json();
          console.error('Error incrementing views:', errorData);
          return;
        }
        const postData = await postResponse.json();
        setViews(postData.views);
      } catch (error) {
        console.error('Error with page views:', error);
        setError('Failed to load views');
      }
    };

    fetchData();
  }, [slug]);

  if (error) {
    console.error('Page views error:', error);
    return null;
  }

  if (views === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      <span>{views} views</span>
    </div>
  );
}
