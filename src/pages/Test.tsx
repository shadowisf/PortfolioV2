import { Fragment } from "react/jsx-runtime";

export default function Test() {
  const task1 = () => {
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve("task1");
      }, 500);
    });
  };

  const task2 = () => {
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve("task2");
      }, 500);
    });
  };

  const task3 = () => {
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve("task3");
      }, 500);
    });
  };

  async function handlePromises() {
    const array = [];
    array.push(await task1());
    console.log(array);
    array.push(await task2());
    console.log(array);
    array.push(await task3());
    console.log(array);
  }

  handlePromises();

  return <Fragment></Fragment>;
}
