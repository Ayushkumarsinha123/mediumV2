import { Avatar } from "./BlogCard"

interface AppBar {
  authorName : string
}
export const AppBar = ({authorName} : AppBar) => {
  return (
    <div className="flex justify-between border-b px-2 py-2">
      <div >mediumV2</div>
     <div >
       <Avatar name={authorName} size={8}/>
     </div>
    </div>
  )
}