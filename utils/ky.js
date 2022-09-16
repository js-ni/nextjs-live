import ky from 'ky'

export default ky.create({
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
  prefixUrl: 'https://api.github.com',
})
