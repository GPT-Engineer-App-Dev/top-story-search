import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const fetchTopStories = async () => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const storyIds = await response.json();
  return Promise.all(storyIds.slice(0, 100).map(fetchStory));
};

const fetchStory = async (id) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
  return response.json();
};

const StoryItem = ({ story }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>
        <a href={story.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {story.title}
        </a>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>Upvotes: {story.score}</p>
      <a href={`https://news.ycombinator.com/item?id=${story.id}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:underline">
        Read more
      </a>
    </CardContent>
  </Card>
);

const SkeletonStory = () => (
  <Card className="mb-4">
    <CardHeader>
      <Skeleton className="h-4 w-[250px]" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-[100px]" />
    </CardContent>
  </Card>
);

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