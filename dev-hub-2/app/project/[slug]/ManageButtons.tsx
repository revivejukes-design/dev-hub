 "use client";
export default function ManageButtons({id}:{id:string}) {
 async function remove(){
  if(!confirm("Delete this project post?"))return;
  const res=await fetch(`/api/posts?id=${encodeURIComponent(id)}`,{method:"DELETE"});
  if(res.ok)location.href="/";else alert("Could not delete this post.");
 }
 return <div className="actions"><button className="btn dark" onClick={remove}>Delete post</button></div>;
}
