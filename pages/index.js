import UserCard from '../components/UserCard'

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
  const response = await fetch(
    `https://api.github.com/orgs/js-ni/public_members`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  )
  const users = await response.json()

  return {
    revalidate: 300,
    props: {
      users,
    },
  }
}
