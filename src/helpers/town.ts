export const getTownsFromList = (list: string[]): string[] =>
  list.reduce((list: string[], current: string): string[] => {
    const [first, second] = current.split('')
    let pushingItem = []
    if (!list.includes(first)) {
      pushingItem.push(first)
    }
    if (!list.includes(second)) {
      pushingItem.push(second)
    }
    return [...list, ...pushingItem]
  }, [])
