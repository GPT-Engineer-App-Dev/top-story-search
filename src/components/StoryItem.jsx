import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

export default StoryItem;