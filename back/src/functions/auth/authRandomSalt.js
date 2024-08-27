const SaltString = [
  '2',
  '4',
  'z',
  'l',
  'm',
  'k',
  'o',
  'w',
  'x',
  's',
  'u',
  'e',
  '8',
  'c',
  '6',
  't',
  'f',
  '9',
  '3',
  'q',
  'g',
  'p',
  'r',
  'v',
  'n',
  '5',
  'd',
  '7',
  'a',
  'h',
  'f',
  'i',
  'b',
  '1',
  'y',
  '0',
]

export function Salting(did) {
  let Time = Number(new Date().getTime())
  let finalSalt = Number(did) + Time

  let returnSalt = ''
  let base = String(finalSalt).split('')
  let state = 0

  for (let i = 0; i < base.length; i++) {
    if (state != 0) {
      state = 0

      let temp = `${base[i - 1]}${base[i]}`

      if (Number(temp) >= SaltString.length) {
        temp = Number(temp) - SaltString.length
      }

      returnSalt += SaltString[temp]
    } else {
      let rando = Math.floor(Math.random())

      if (rando != 0) {
        state = 1
      } else {
        state = 0

        let temp = Math.floor(Math.random() * SaltString.length)

        returnSalt += SaltString[Number(temp)]
      }
    }
  }

  return returnSalt
}
