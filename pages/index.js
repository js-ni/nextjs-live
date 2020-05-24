import Link from 'next/link'
import {Box, Button, Grid, Image, Stack, Heading} from '@chakra-ui/core'

import UserCard from '../components/UserCard'

export default function Home({users}) {
  return (
    <>
      <Heading as="h1" size="lg">
        Miembros
      </Heading>
      <Grid
        gap={4}
        mt={4}
        templateColumns={[
          `repeat(1, 1fr)`,
          `repeat(2, 1fr)`,
          `repeat(3, 1fr)`,
          `repeat(5, 1fr)`,
        ]}
      >
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </Grid>
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
    unstable_revalidate: 300,
    props: {users},
  }
}
