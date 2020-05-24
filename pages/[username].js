import Link from 'next/link'
import {Box, IconButton, Grid, Image, Stack} from '@chakra-ui/core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faArrowLeft,
  faCodeBranch,
  faStar,
} from '@fortawesome/free-solid-svg-icons'

export default function User({repositories, username}) {
  const user = repositories[0]?.owner

  return (
    <>
      <Stack isInline align="center" spacing={4}>
        <Link href="/">
          <IconButton
            icon={() => <FontAwesomeIcon fixedWidth icon={faArrowLeft} />}
            rounded="full"
          />
        </Link>

        <Image
          ml={2}
          rounded="full"
          shadow="md"
          size={10}
          src={user.avatar_url}
        />
        <Box fontWeight="semibold">{username}</Box>
      </Stack>

      <Grid
        gap={4}
        mt={4}
        templateColumns={[`repeat(1, 1fr)`, `repeat(2, 1fr)`, `repeat(3, 1fr)`]}
      >
        {repositories.map((repo) => (
          <Stack
            bg="white"
            key={repo.id}
            minH={40}
            p={4}
            rounded="md"
            shadow="md"
          >
            <Box fontWeight="medium">{repo.name}</Box>
            <Box flex={1} fontSize="sm">
              {repo.description}
            </Box>

            <Stack isInline spacing="auto">
              <Stack isInline align="center">
                <FontAwesomeIcon fixedWidth icon={faStar} />
                <Box ml={2}>{repo.stargazers_count}</Box>
              </Stack>
              <Stack isInline align="center">
                <FontAwesomeIcon fixedWidth icon={faCodeBranch} />
                <Box ml={2}>{repo.forks}</Box>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Grid>
    </>
  )
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://api.github.com/orgs/js-ni/public_members`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  )
  const users = await response.json()
  const paths = users.map((user) => ({params: {username: user.login}}))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({params: {username}}) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    }
  )
  const repositories = await response.json()

  return {
    props: {
      repositories,
      username,
    },
  }
}
