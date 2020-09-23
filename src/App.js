import React, {useState} from 'react';
import './App.css';
import Post from './components/Post'
import NewPostForm from './components/NewPostForm'
// import data from '../server/sample.json';

const data = [
  {
    id: 1, 
    user: "Bean", 
    timestamp: "2020-07-15 07:25:28", 
    content: "@Jimbulator Bean ngr ux urynauydyw inwjh oyafoji qpmia alitype yhtleeft viuhziw opya #ailbk #ynv xhejaa #gqxojaera #ram qajix ceomy ndbyejv"
  },
  {
      id: 2,
      user: "Bobalooba",
      timestamp: "2020-07-15 06:35:15",
      content: "Bobalooba uave gf yjjmqaim #ihj oafzf xe uelbvr #qdoycgi puy #fvism @Jimbulator wyfxaa hggqvuaoy cfla fffvzvlldn creeiutyf tzpjsr jeejkqog mwajbjon fyb yzfacvan hi doq nisvnxcoro ewwb eeoqoe"
  },
  {
      id: 3,
      user: "Jimbulator",
      timestamp: "2020-07-15 05:45:02",
      content: "Jimbulator yuyfhffy #onutqwyxz utzveaw xnhfahrbi ftuq cshcu rtjioooohx zbpaaxjct @Bobalooba xewaxkf tte ujr nkucuoeoi auukeo #kvu taaygvxdi bfeiz qeakavo tjiausvuay qzf udmgkg buawojvy",
  }
]

const App = () => {
  const [posts, setPosts] = useState(data)
  // const [newPost, setNewPost] = useState('')

  // Sorting to show most recent first
  posts.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  console.log(posts);

  const addPost = (newPost) => {
        const newId = posts.length + 1
        const date = new Date();
        const currTimestamp = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 19).replace("T", " ");
        const newPostObject = ([
        {
            id: newId, 
            user: "Bean", 
            timestamp: currTimestamp, 
            content: newPost
        }])
      setPosts(posts.concat(newPostObject))
  }

  return (
    <div>
     <h1 id="heading"> RoboChat </h1>
      <NewPostForm updateFn={addPost}/>
      <Post posts={posts}/>
    </div>
  )
}

export default App;
