import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input"
import StoryItem from '@/components/StoryItem';
import SkeletonStory from '@/components/SkeletonStory';
import { fetchTopStories } from '@/api/hackerNewsApi';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: stories, isLoading } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories
  });

  const filteredStories = stories?.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Hacker News Top 100 Stories</h1>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {isLoading ? (
        Array(10).fill().map((_, index) => <SkeletonStory key={index} />)
      ) : (
        filteredStories?.map(story => <StoryItem key={story.id} story={story} />)
      )}
    </div>
  );
};

export default Index;