import Layout from "@/components/Layout";
import { useFetchUser } from "@/lib/authContext";


export default function Home() {
  const {user, loading} = useFetchUser(); 


  return (
    <>
      <Layout user={user}>
          
      </Layout>
    </>
  )
}
