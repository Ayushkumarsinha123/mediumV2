import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const {loading, blogs }  = useBlogs;

  if(loading) {
    return <div>
      loading...
    </div>
  }
  return (
    <div>
      <AppBar authorName={"ayush"}/>
    <div className="flex justify-center">
      <div className=" max-w-xl pt-2">
        <BlogCard 
        authorName={"ayush sinha"}
        title={"Find all Palindromic Partitions of a String"}
        content={"Time Complexity: O(n × 2n), for exploring all possible partitions (2n) and checking each substring for palindrome in O(n) time."}
        publishDate={"2nd feb 2024"} 
        />
        <BlogCard 
        authorName={"ayush sinha"}
        title={"Find all Palindromic Partitions of a String"}
        content={"Time Complexity: O(n × 2n), for exploring all possible partitions (2n) and checking each substring for palindrome in O(n) time."}
        publishDate={"2nd feb 2024"} 
        />
    </div>
    </div>
    </div>
    
  )
}


