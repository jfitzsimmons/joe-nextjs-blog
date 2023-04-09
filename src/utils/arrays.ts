const orderBy = (arr: any[], props: string[], orders: unknown[]) =>
  [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      let lacc = acc
      if (lacc === 0) {
        const [p1, p2] =
          orders && orders[i] === 'desc'
            ? [b[prop], a[prop]]
            : [a[prop], b[prop]]
        // eslint-disable-next-line no-nested-ternary
        lacc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return lacc
    }, 0),
  )

export default orderBy
