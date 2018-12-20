import is from 'is-explicit'

/******************************************************************************/
// Main
/******************************************************************************/

function urlify (str) {

  if (is.string(this))
    str = this

  return str && str
    .toLowerCase()
    // spaces with dashes
    .replace(/\s/g, '-')

    // mutli dash to single dashes
    .replace(/-+/g, '-')

    // ignore any character that isn't a letter, dash or digit
    .split('')
    .filter(char => /[a-z]|\d|-/.test(char))
    .join('')
}

/******************************************************************************/
// Exports
/******************************************************************************/

export default urlify
