import sha1 from 'hash.js/lib/hash/sha/1'

// 5x5 grid; 0: sponsor; 1: community
const patterns = [0b0010001010100010101000100, 0b1010001010000010101010000,
  0b1000100100010100010010001, 0b0010010001010101000100100]

function sha1Hash (token) {
  var hashGen = sha1()
  hashGen.update(token)
  return hashGen.digest('hex')
}

function hex2Dec (s, i) {
  var c = s.charCodeAt(i)
  return c > 0x60 ? (c - 0x57) : (c - 0x30)
}

function swap (arr, a, b) {
  var _ = arr[a]
  arr[a] = arr[b]
  arr[b] = _
}

export default function generateBingo (sponsors, communities, token) {
  var hash = sha1Hash(token)

  var shuffledSponsors = [...sponsors]
  for (let i = 0; i < 16; i++) swap(shuffledSponsors, hex2Dec(hash, i), 15)

  var shuffledCommunities = [...communities]
  for (let i = 0; i < 8; i++) swap(shuffledCommunities, hex2Dec(hash, 16 + i) % 8, 7)

  // generate bingo card using predefined pattern
  var grid = new Array(25)
  var pattern = patterns[hex2Dec(hash, 24) % 4]
  for (let i = 0; i < 25; i++) {
    if ((pattern >> i) & 1) grid[i] = { 'type': 'community', 'element': shuffledCommunities.shift() }
  }

  // free space in the middle
  grid[12] = { 'type': 'free_space' }

  // fill the remaining with sponsors
  for (var i = 0; i < 25; i++) {
    if (!grid[i]) grid[i] = { 'type': 'sponsor', 'element': shuffledSponsors.shift() }
  }

  return grid
}
