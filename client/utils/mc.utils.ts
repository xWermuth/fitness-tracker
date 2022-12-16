function mc(...classes: (string | undefined)[]) {
  return classes.reduce<string>((acc, curr) => {
    return acc + ' ' + curr || '';
  }, '');
}

export default mc;
