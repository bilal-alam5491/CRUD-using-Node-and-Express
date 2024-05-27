let array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

let id = 5;

function randomIdGenerator() {
  let randomID = Math.floor(Math.random() * 100 + 1);
  return randomID;
}

function idCheck() {
  array.forEach((element) => {
    if (element.id == id) {
      id = randomIdGenerator();

      console.log("found id");
      idCheck()
    } else {
      console.log("not found");
    }
  });
}
