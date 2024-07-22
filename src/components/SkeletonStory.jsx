import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

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

export default SkeletonStory;