export const uuid = (lngth) => new Array(lngth).join().replace(/(.|$)/g, function () {
    return ((Math.random() * 36) | 0)
      .toString(36)
      [Math.random() < 0.5 ? "toString" : "toUpperCase"]();
  });