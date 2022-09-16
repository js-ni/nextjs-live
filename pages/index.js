import UserCard from '@components/UserCard'
import ky from '@utils/ky'

export default function Home({users}) {
  return (
    <>
      <h1 className="font-bold text-3xl">Miembros</h1>
      <div className="gap-4 grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const users = await ky.get('orgs/js-ni/public_members').json()

  return {
    revalidate: 300,
    props: {
      users,
    },
  }
}
