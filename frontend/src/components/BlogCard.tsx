interface BlogCardProp {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
}: BlogCardProp) => {
  return (
    <div className="border-b-2 border-slate-200 pt-1  pb-4">
      <div className="flex">
       <div className="flex justify-center flex-col"> <Avatar name={authorName} /></div>
        <div className="font-extralight pl-2">{authorName}</div>
        <div className="flex justify-center flex-col pl-2">
          <Circle/>
        </div>
       <div className="pl-2 font-thin text-slate-500">
         {publishDate}
       </div>
      </div>
      <div className="font-black pt-2 pb-1 text-xl ">
        {title}</div>
      <div>{content.slice(0, 100) + "..."}</div>
      <div className="font-thin text-sm text-slate-500 pt-2">{`${Math.ceil(content.length / 100)} minute(s) reads`}</div>
    </div>
  );
};

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-500">

  </div>
}

export function Avatar({ name, size = 6 }: { name: string , size? : number}) {
  return (
    <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-neutral-tertiary rounded-full bg-slate-200`}>
      <span className="font-medium text-body">{name[0]}</span>
    </div>
  );
}
