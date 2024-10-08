export const spike = () => {
  let spiked = Array(document.querySelectorAll(".spiked") as NodeListOf<HTMLElement>);

  let computedFontSize = parseInt(window.getComputedStyle(document.querySelector("html")!).fontSize);

  spiked.forEach((nodeList) =>
    nodeList.forEach((item) => {
      let r = Math.ceil(item.offsetWidth / (1.5 * computedFontSize));
      let vOne: string[] = [];
      let vTwo: string[] = [];

      for (let i = 0; i < r + 1; i++) {
        vOne.push(i % 2 === 1 ? 1.5 * i + "rem 1.5rem, " : 1.5 * i + "rem 0, ");
      }

      for (let i = 1; i < r + 1; i++) {
        vTwo.push(i % 2 === 1 ? `calc(100% - 1.5*${i}rem) 100%, ` : `calc(100% - 1.5*${i}rem) calc(100% - 1.5rem),`);
      }

      let a = vOne.join("");
      let b = vTwo.join("");
      item.style.clipPath = `polygon(${a}100% 0,100% calc(100% - 1.5rem),${b}0 100%)`;
    })
  );
};
