"use client";

import { useUser } from "@clerk/nextjs";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichtextEditor from "@/components/RichTextEditor";

function CreatePostPage() {
  const { isLoaded, user, isSignedIn } = useUser();

  if (!isLoaded)
    return <h1 className="text-cetner text-2xl my-2">Loading...</h1>;

  if (isSignedIn && !user.publicMetadata.isAdmin)
    return (
      <h1 className="text-center text-3xl my-2 font-semibold">
        You are not authorized to view this content
      </h1>
    );

  return (
    <div className="px-2">
      <h1 className="text-center text-3xl my-4">Create a post</h1>
      <form className="flex flex-col gap-5 lg:w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <Input type="text" placeholder="Title" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">Javascript</SelectItem>
              <SelectItem value="reactjs">React.Js</SelectItem>
              <SelectItem value="nextjs">Next.Js</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Input id="picture" type="file" className="w-1/2" />
          <Button>
            <Label htmlFor="picture" className="cursor-pointer">
              Upload Image
            </Label>
          </Button>
        </div>
        <div className="h-[300px]">
          <RichtextEditor />
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;
