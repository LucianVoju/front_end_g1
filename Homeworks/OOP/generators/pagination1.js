function pagination1(c, m) {
    var current = Number(c),
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta,
        range = [];
      // rangeWithDots = [],
      //  l;

    for (let i = 1; i <= last; i++) {
        if ( i >= left && i <= right) {
            range.push(i);
        }
    }

   /* for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }
*/
    return range;
}